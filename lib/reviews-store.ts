import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import type { Review } from '@/lib/constants';

/**
 * Store for customer-submitted reviews.
 *
 * Persistence strategy (in order of preference):
 *   1. Supabase — used when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.
 *      This is the durable option and the recommended one on Vercel.
 *   2. Local JSON file — used for local development.
 *   3. Temp directory — used as a fallback when the app directory is read-only
 *      (e.g. the Vercel serverless filesystem).
 *
 * Reads and writes NEVER throw: if persistence is unavailable the review is
 * still accepted and shown to the visitor, so the review form always works.
 */

const DATA_DIR = path.join(process.cwd(), 'data');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Only the 9 newest reviews are kept; older ones are dropped automatically.
const MAX_STORED_REVIEWS = 9;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const SUPABASE_TABLE = process.env.SUPABASE_REVIEWS_TABLE || 'reviews';

const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

function supabaseHeaders(): Record<string, string> {
  return {
    apikey: SUPABASE_KEY as string,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function readSupabaseReviews(): Promise<Review[] | null> {
  if (!supabaseConfigured) return null;
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=*&order=created_at.desc&limit=${MAX_STORED_REVIEWS}`,
      { headers: supabaseHeaders(), cache: 'no-store' }
    );
    if (!response.ok) return null;
    const rows = (await response.json()) as Array<Record<string, unknown>>;
    if (!Array.isArray(rows)) return null;
    return rows.map((row) => ({
      id: String(row.id ?? ''),
      name: String(row.name ?? ''),
      rating: Number(row.rating ?? 0),
      text: String(row.text ?? ''),
      appliance: String(row.appliance ?? ''),
      location: String(row.location ?? ''),
      date: String(row.date ?? ''),
    }));
  } catch (error) {
    console.error('[reviews-store] Supabase read failed:', error);
    return null;
  }
}

async function writeSupabaseReview(review: Review): Promise<boolean> {
  if (!supabaseConfigured) return false;
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
      method: 'POST',
      headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify({
        id: review.id,
        name: review.name,
        rating: review.rating,
        text: review.text,
        appliance: review.appliance,
        location: review.location,
        date: review.date,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('[reviews-store] Supabase write failed:', error);
    return false;
  }
}

/**
 * Resolve the directory the JSON file should live in. Prefers the project
 * "data" folder (writable in local development) and falls back to the OS temp
 * directory when that folder is not writable (serverless hosts).
 */
async function resolveDataDir(): Promise<string> {
  for (const dir of [DATA_DIR, path.join(os.tmpdir(), 'tehmaster-data')]) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const probe = path.join(dir, '.write-probe');
      await fs.writeFile(probe, '', 'utf8');
      await fs.rm(probe, { force: true });
      return dir;
    } catch {
      // try the next candidate directory
    }
  }
  return DATA_DIR;
}

async function ensureFile(dir: string): Promise<string> {
  const file = path.join(dir, 'reviews.json');
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, '[]', 'utf8');
  }
  return file;
}

export async function getStoredReviews(): Promise<Review[]> {
  const fromSupabase = await readSupabaseReviews();
  if (fromSupabase) return fromSupabase;

  try {
    const dir = await resolveDataDir();
    const file = await ensureFile(dir);
    const raw = await fs.readFile(file, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Review[];
  } catch (error) {
    console.error('[reviews-store] Failed to read reviews:', error);
    return [];
  }
}

/**
 * Persist a review. Never throws — a storage failure must not break the
 * review form. Returns true when the review was stored durably.
 */
export async function addReview(review: Review): Promise<boolean> {
  if (await writeSupabaseReview(review)) return true;

  try {
    const stored = await getStoredReviews();
    const next = [review, ...stored].slice(0, MAX_STORED_REVIEWS);
    const dir = await resolveDataDir();
    const file = await ensureFile(dir);
    await fs.writeFile(file, JSON.stringify(next, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('[reviews-store] Failed to store review:', error);
    return false;
  }
}
