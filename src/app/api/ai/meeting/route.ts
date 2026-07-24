import { NextResponse } from "next/server";
import { runMeetingSummary } from "@/lib/ai/pipelines";

export async function POST(request: Request) {
  const body = (await request.json()) as { text?: string; locale?: string };
  if (!body.text?.trim()) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  const result = await runMeetingSummary({
    text: body.text,
    locale: body.locale ?? "en-AU",
  });
  return NextResponse.json({ result, mode: process.env.OPENAI_API_KEY ? "live" : "mock" });
}
