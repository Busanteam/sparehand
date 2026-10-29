import { NextResponse } from "next/server";

/** Lightweight liveness probe (no DB in this demo). */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "sparehand",
    ts: new Date().toISOString(),
  });
}
