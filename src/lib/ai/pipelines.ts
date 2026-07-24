import type OpenAI from "openai";
import { z } from "zod";
import {
  getOpenAI,
  hasOpenAI,
  resolveOpenAiOptions,
  type OpenAiOptions,
} from "./client";
import {
  mockDocument,
  mockInbox,
  mockMeeting,
  mockQuote,
} from "./mock";
import {
  documentResultSchema,
  inboxResultSchema,
  meetingResultSchema,
  quoteResultSchema,
  type RateItem,
} from "./schemas";

async function completeJson<T>(args: {
  system: string;
  user: string;
  schema: z.ZodType<T>;
  imageDataUrl?: string;
  ai?: OpenAiOptions;
}): Promise<T> {
  const client = getOpenAI(args.ai);
  const { model } = resolveOpenAiOptions(args.ai);
  if (!client) {
    throw new Error("NO_OPENAI");
  }

  const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    { type: "text", text: args.user },
  ];
  if (args.imageDataUrl) {
    userContent.push({
      type: "image_url",
      image_url: { url: args.imageDataUrl },
    });
  }

  const response = await client.chat.completions.create({
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `${args.system}\nAlways respond with valid JSON only.`,
      },
      { role: "user", content: userContent },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(raw) as unknown;
  return args.schema.parse(parsed);
}

function modeLabel(ai?: OpenAiOptions) {
  if (ai?.apiKey?.trim()) return "customer-key";
  if (process.env.OPENAI_API_KEY) return "platform-fallback";
  return "mock";
}

export async function runInboxTriage(input: {
  text: string;
  locale: string;
  ai?: OpenAiOptions;
}) {
  if (!hasOpenAI(input.ai)) return { result: mockInbox(input.text), mode: "mock" as const };
  try {
    const result = await completeJson({
      system: `You help Australian SME office staff triage customer enquiries.
Write draftReply in Australian English unless locale is ko, then Korean.
Return JSON keys: urgency (low|medium|high|critical), category, summary, draftReply, actions (string[]), customerName (optional).
Locale: ${input.locale}`,
      user: input.text,
      schema: inboxResultSchema,
      ai: input.ai,
    });
    return { result, mode: modeLabel(input.ai) };
  } catch {
    return { result: mockInbox(input.text), mode: "mock" as const };
  }
}

export async function runMeetingSummary(input: {
  text: string;
  locale: string;
  ai?: OpenAiOptions;
}) {
  if (!hasOpenAI(input.ai)) return { result: mockMeeting(input.text), mode: "mock" as const };
  try {
    const result = await completeJson({
      system: `Summarise SME meeting notes for Australian teams.
Return JSON: title, summary, decisions (string[]), actionItems ({task, owner?, due?}[]).
Locale for prose: ${input.locale}`,
      user: input.text,
      schema: meetingResultSchema,
      ai: input.ai,
    });
    return { result, mode: modeLabel(input.ai) };
  } catch {
    return { result: mockMeeting(input.text), mode: "mock" as const };
  }
}

export async function runDocumentExtract(input: {
  imageDataUrl: string;
  locale: string;
  ai?: OpenAiOptions;
}) {
  if (!hasOpenAI(input.ai)) return { result: mockDocument(), mode: "mock" as const };
  try {
    const result = await completeJson({
      system: `Extract structured data from Australian business receipts/invoices.
Amounts in AUD. GST is typically 10%.
Return JSON matching: documentType, vendor, date, abn, currency, subtotalExGst, gst, totalIncGst, lineItems[], notes.
Locale hints: ${input.locale}`,
      user: "Extract all readable commercial fields from this document image.",
      schema: documentResultSchema,
      imageDataUrl: input.imageDataUrl,
      ai: input.ai,
    });
    return { result, mode: modeLabel(input.ai) };
  } catch {
    return { result: mockDocument(), mode: "mock" as const };
  }
}

export async function runQuoteDraft(input: {
  job: string;
  clientName: string;
  rates: RateItem[];
  locale: string;
  ai?: OpenAiOptions;
}) {
  if (!hasOpenAI(input.ai)) {
    return { result: mockQuote(input.job, input.rates), mode: "mock" as const };
  }
  try {
    const result = await completeJson({
      system: `Create a draft trade/service quote for an Australian SME.
Use ONLY the provided rate card where possible. Do not invent supplier live prices.
GST is added later by the app from ex-GST unit prices.
Return JSON: jobTitle, assumptions[], lineItems[{code?, description, quantity, unit, unitPriceExGst}], notesForClient.
Locale: ${input.locale}
Client: ${input.clientName || "Client"}
Rate card JSON: ${JSON.stringify(input.rates)}`,
      user: input.job,
      schema: quoteResultSchema,
      ai: input.ai,
    });
    return { result, mode: modeLabel(input.ai) };
  } catch {
    return { result: mockQuote(input.job, input.rates), mode: "mock" as const };
  }
}
