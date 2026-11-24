import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { contactFormSchema } from '@/lib/schemas';

// Best-effort, per-instance limit: 5 messages per address every 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > LIMIT;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true, stored: false }, { status: 200 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages in a short time. Please wait a few minutes and try again.' },
      { status: 429 }
    );
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? 'form');
      fieldErrors[field] ??= issue.message;
    }
    return NextResponse.json({ error: 'Please check the highlighted fields.', fieldErrors }, { status: 400 });
  }

  try {
    const db = await connectDB();
    const inserted = await db.collection('contacts').insertOne({
      ...result.data,
      userAgent: request.headers.get('user-agent') ?? undefined,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, stored: true, id: inserted.insertedId.toString() }, { status: 200 });
  } catch (error) {
    console.error('Failed to store contact submission:', error);
    return NextResponse.json({ error: 'Could not save your message right now.' }, { status: 503 });
  }
}
