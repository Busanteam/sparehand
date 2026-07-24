import { NextResponse } from "next/server";
import { runDocumentExtract } from "@/lib/ai/pipelines";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    imageDataUrl?: string;
    locale?: string;
  };
  if (!body.imageDataUrl?.startsWith("data:")) {
    return NextResponse.json({ error: "imageDataUrl required" }, { status: 400 });
  }
  const result = await runDocumentExtract({
    imageDataUrl: body.imageDataUrl,
    locale: body.locale ?? "en-AU",
  });
  return NextResponse.json({ result, mode: process.env.OPENAI_API_KEY ? "live" : "mock" });
}
