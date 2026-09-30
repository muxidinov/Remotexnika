import { NextRequest, NextResponse } from 'next/server';
import { reviewSchema } from '@/lib/validation';
import { addReview, getStoredReviews } from '@/lib/reviews-store';
import type { Review } from '@/lib/constants';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 reviews per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

// GET /api/reviews — return the reviews left by visitors
export async function GET() {
  const reviews = await getStoredReviews();
  return NextResponse.json({ reviews }, { status: 200 });
}

// POST /api/reviews — save a new review (published on the site)
export async function POST(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (!checkRateLimit(getClientIp(req))) {
    return NextResponse.json(
      { error: 'Слишком много отзывов. Пожалуйста, подождите минуту.' },
      { status: 429, headers: corsHeaders }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Некорректный формат данных.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstError?.message || 'Проверьте правильность заполнения формы.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const data = parsed.data;
  const date = new Date().toISOString().slice(0, 10);

  const review: Review = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: data.name,
    rating: data.rating,
    text: data.text,
    appliance: data.appliance,
    location: data.location?.trim() || '',
    date,
  };

  // Storage is best-effort: the review is always accepted and returned so the
  // visitor sees it immediately, even if durable persistence is unavailable.
  const stored = await addReview(review);
  if (!stored) {
    console.warn('[reviews] Review accepted but not persisted durably.');
  }

  // Reviews are published on the site only — they are NOT sent to Telegram.
  return NextResponse.json(
    { success: true, persisted: stored, review },
    { status: 200, headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
