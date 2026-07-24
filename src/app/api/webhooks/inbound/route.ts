import { NextResponse } from "next/server";

type InboundPayload = {
  subject?: string;
  from?: string;
  body?: string;
  source?: string;
};

/**
 * Zapier / Make compatible inbound webhook.
 * Header: x-sparehand-secret
 * Body JSON: { subject, from, body, source }
 */
export async function POST(request: Request) {
  const secret = process.env.SPAREHAND_WEBHOOK_SECRET ?? "dev-secret-change-me";
  const provided = request.headers.get("x-sparehand-secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as InboundPayload;
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

  // Stateless MVP acknowledgement — clients can persist via the app UI.
  return NextResponse.json({
    ok: true,
    item,
    hint: "Forward this payload into SpareHand Inbox triage, or persist via Supabase job_items when connected.",
  });
}
