import { NextResponse } from "next/server";
import { runQuoteDraft } from "@/lib/ai/pipelines";
import type { RateItem } from "@/lib/ai/schemas";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    job?: string;
    clientName?: string;
    rates?: RateItem[];
    locale?: string;
  };
  if (!body.job?.trim()) {
    return NextResponse.json({ error: "job required" }, { status: 400 });
  }
  const result = await runQuoteDraft({
    job: body.job,
    clientName: body.clientName ?? "",
    rates: body.rates ?? [],
    locale: body.locale ?? "en-AU",
  });
  return NextResponse.json({ result, mode: process.env.OPENAI_API_KEY ? "live" : "mock" });
}
