import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/api/rate-limit";
import { webhookBodySchema, zodErrorMessage } from "@/lib/api/schemas";

type InboundPayload = {
  subject?: string;
  from?: string;
  body?: string;
  source?: string;
};

const TS_SKEW_SEC = 5 * 60;

/**
 * Zapier / Make compatible inbound webhook.
 * Header: x-sparehand-secret
 * Optional header: x-sparehand-timestamp (unix seconds) — rejected if skew > 5m
 * Body JSON: { subject, from, body, source }
 */
export async function POST(request: Request) {
  const limited = rateLimit(request, {
    prefix: "webhook",
    limit: 60,
    windowMs: 60_000,
  });
  if (limited) return limited;

  const secret = process.env.SPAREHAND_WEBHOOK_SECRET ?? "dev-secret-change-me";
  const provided = request.headers.get("x-sparehand-secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const tsHeader = request.headers.get("x-sparehand-timestamp");
  if (tsHeader) {
    const ts = Number(tsHeader);
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(ts) || Math.abs(now - ts) > TS_SKEW_SEC) {
      return NextResponse.json({ error: "stale_or_invalid_timestamp" }, { status: 401 });
    }
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = webhookBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: zodErrorMessage(parsed.error) },
      { status: 400 },
    );
  }
  const payload = parsed.data as InboundPayload;
  if (!payload.body?.trim() && !payload.subject?.trim()) {
    return NextResponse.json({ error: "body or subject required" }, { status: 400 });
  }

  const item = {
    id: crypto.randomUUID(),
    kind: "webhook" as const,
    title: payload.subject || `Inbound from ${payload.from || payload.source || "integration"}`,
    createdAt: new Date().toISOString(),
    payload,
  };

  return NextResponse.json({
    ok: true,
    item,
    hint: "Forward this payload into SpareHand Inbox triage, or persist via Supabase job_items when connected.",
  });
}
