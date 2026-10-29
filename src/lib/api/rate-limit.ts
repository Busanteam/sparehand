import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientKey(request: Request, prefix: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `${prefix}:${ip}`;
}

/** Simple in-memory rate limit (resets on cold start — fine for demo / Fluid). */
export function rateLimit(
  request: Request,
  opts: { prefix: string; limit: number; windowMs: number },
): NextResponse | null {
  const key = clientKey(request, opts.prefix);
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return null;
  }
  if (current.count >= opts.limit) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: current.resetAt - now },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((current.resetAt - now) / 1000)),
        },
      },
    );
  }
  current.count += 1;
  return null;
}
