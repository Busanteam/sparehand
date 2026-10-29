import { NextResponse } from "next/server";
import { openAiOptionsFromRequest } from "@/lib/ai/client";
import { runDocumentExtract } from "@/lib/ai/pipelines";
import { rateLimit } from "@/lib/api/rate-limit";
import { documentBodySchema, zodErrorMessage } from "@/lib/api/schemas";

export async function POST(request: Request) {
  const limited = rateLimit(request, {
    prefix: "ai-document",
    limit: 10,
    windowMs: 60_000,
  });
  if (limited) return limited;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = documentBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: zodErrorMessage(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const { result, mode } = await runDocumentExtract({
      imageDataUrl: parsed.data.imageDataUrl,
      locale: parsed.data.locale ?? "en-AU",
      ai: openAiOptionsFromRequest(request),
    });
    return NextResponse.json({ result, mode });
  } catch (err) {
    console.error(
      "[api/ai/document]",
      err instanceof Error ? err.message : "error",
    );
    return NextResponse.json({ error: "document_failed" }, { status: 500 });
  }
}
