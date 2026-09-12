import { NextRequest, NextResponse } from 'next/server';
import { repairRequestSchema } from '@/lib/validation';
import { getApplianceLabel } from '@/lib/constants';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per minute per IP

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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Слишком много заявок. Пожалуйста, подождите минуту и попробуйте снова.' },
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

  const parsed = repairRequestSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstError?.message || 'Проверьте правильность заполнения формы.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Build the Telegram message from the single request form
  const data = parsed.data;
  const applianceLabel = getApplianceLabel(data.appliance);
  const message = [
      '🔧 <b>НОВАЯ ЗАЯВКА</b>',
      '',
      `👤 <b>Клиент:</b> ${escapeHtml(data.name)}`,
      `📱 <b>Телефон:</b> ${escapeHtml(data.phone)}`,
      `🔧 <b>Техника:</b> ${escapeHtml(applianceLabel)}`,
      `⚠️ <b>Проблема:</b> ${escapeHtml(data.problem)}`,
      `📍 <b>Адрес:</b> ${escapeHtml(data.address)}`,
      `🕐 <b>Удобное время:</b> ${escapeHtml(data.preferredTime)}`,
      data.comment && data.comment.trim().length > 0
        ? `💬 <b>Комментарий:</b> ${escapeHtml(data.comment)}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

  // If Telegram credentials are not configured, log the message and return success
  // (useful for development/staging — the form still works for testing)
  if (!botToken || !chatId) {
    console.log('[Telegram] Bot token or chat ID not configured. Message would be:');
    console.log(message.replace(/<[^>]*>/g, ''));
    return NextResponse.json(
      { success: true, warning: 'TELEGRAM_NOT_CONFIGURED' },
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('[Telegram] API error:', telegramResponse.status, errorData);
      return NextResponse.json(
        { error: 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.' },
        { status: 502, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('[Telegram] Network error:', error);
    return NextResponse.json(
      { error: 'Ошибка соединения. Попробуйте позже или позвоните нам.' },
      { status: 502, headers: corsHeaders }
    );
  }
}
