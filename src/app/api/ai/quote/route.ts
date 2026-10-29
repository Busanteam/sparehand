import { NextResponse } from "next/server";
import { openAiOptionsFromRequest } from "@/lib/ai/client";
import { runQuoteDraft } from "@/lib/ai/pipelines";
import { rateLimit } from "@/lib/api/rate-limit";
import { quoteBodySchema, zodErrorMessage } from "@/lib/api/schemas";
import { calcAreaSqm } from "@/lib/quotes/area";

export async function POST(request: Request) {
  const limited = rateLimit(request, {
    prefix: "ai-quote",
    limit: 20,
    windowMs: 60_000,
  });
  if (limited) return limited;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = quoteBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: zodErrorMessage(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const areaSqm = calcAreaSqm(
      parsed.data.lengthM,
      parsed.data.widthM,
      parsed.data.areaSqm,
    );
    const { result, mode } = await runQuoteDraft({
      job: parsed.data.job,
      clientName: parsed.data.clientName ?? "",
      rates: parsed.data.rates,
      tradeName: parsed.data.tradeName,
      locale: parsed.data.locale ?? "en-AU",
      areaSqm,
      ai: openAiOptionsFromRequest(request),
    });
    return NextResponse.json({ result, mode, areaSqm });
  } catch (err) {
    console.error("[api/ai/quote]", err instanceof Error ? err.message : "error");
    return NextResponse.json({ error: "quote_failed" }, { status: 500 });
  }
}
