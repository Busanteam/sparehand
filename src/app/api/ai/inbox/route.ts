import { NextResponse } from "next/server";
import { openAiOptionsFromRequest } from "@/lib/ai/client";
import { runInboxTriage } from "@/lib/ai/pipelines";

export async function POST(request: Request) {
  const body = (await request.json()) as { text?: string; locale?: string };
  if (!body.text?.trim()) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  const { result, mode } = await runInboxTriage({
    text: body.text,
    locale: body.locale ?? "en-AU",
    ai: openAiOptionsFromRequest(request),
  });
  return NextResponse.json({ result, mode });
}
