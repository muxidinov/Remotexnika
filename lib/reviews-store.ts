import { promises as fs } from 'fs';
import path from 'path';
import type { Review } from '@/lib/constants';

/**
 * Simple file-based store for customer-submitted reviews.
 *
 * The project has no database configured, so reviews left by visitors are
 * persisted to a JSON file next to the app. New reviews are prepended so the
 * newest ones appear first.
 */

const DATA_DIR = path.join(process.cwd(), 'data');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(REVIEWS_FILE);
  } catch {
    await fs.writeFile(REVIEWS_FILE, '[]', 'utf8');
  }
}

export async function getStoredReviews(): Promise<Review[]> {
  try {
    await ensureFile();
    const raw = await fs.readFile(REVIEWS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Review[];
  } catch (error) {
    console.error('[reviews-store] Failed to read reviews:', error);
    return [];
  }
}

// Only the 9 newest reviews are kept; older ones are dropped automatically.
const MAX_STORED_REVIEWS = 9;

export async function addReview(review: Review): Promise<Review> {
  const stored = await getStoredReviews();
  const next = [review, ...stored].slice(0, MAX_STORED_REVIEWS);
  await ensureFile();
  await fs.writeFile(REVIEWS_FILE, JSON.stringify(next, null, 2), 'utf8');
  return review;
}
