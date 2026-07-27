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
import { applyAreaToQuote } from "@/lib/quotes/area";

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
      system: `You help SME office staff triage customer enquiries.
Write draftReply in clear professional English unless locale is ko, then Korean.
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
      system: `Summarise SME meeting notes for office teams.
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
      system: `Extract structured data from business receipts/invoices.
Prefer amounts in the document's currency. If tax looks like GST/VAT, capture it.
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
  areaSqm?: number;
  tradeName?: string;
  ai?: OpenAiOptions;
}) {
  const areaSqm = input.areaSqm && input.areaSqm > 0 ? input.areaSqm : 0;

  if (!hasOpenAI(input.ai)) {
    return {
      result: applyAreaToQuote(mockQuote(input.job, input.rates, areaSqm), areaSqm),
      mode: "mock" as const,
    };
  }
  try {
    const result = await completeJson({
      system: `Create a draft quote for an SME in the "${input.tradeName || "selected"}" trade.
Use ONLY the provided selected rate-card lines. Do not invent supplier live prices or extra lines not in the rate card unless clearly call-out/labour already listed.
Tax (GST-style) is added later by the app from ex-tax unit prices.
If areaSqm > 0, any rate card items priced per m² / m2 / sqm MUST use quantity = areaSqm.
Include fixed items (call-out, hourly labour) only when relevant to the job description.
Return JSON: jobTitle, assumptions[], lineItems[{code?, description, quantity, unit, unitPriceExGst}], notesForClient.
Always remind in notesForClient that this is a non-binding draft and final cost may change after site measure.
Locale: ${input.locale}
Client: ${input.clientName || "Client"}
Trade: ${input.tradeName || "n/a"}
Area m²: ${areaSqm || "not provided"}
Selected rate card JSON: ${JSON.stringify(input.rates)}`,
      user: input.job,
      schema: quoteResultSchema,
      ai: input.ai,
    });
    return {
      result: applyAreaToQuote(result, areaSqm),
      mode: modeLabel(input.ai),
    };
  } catch {
    return {
      result: applyAreaToQuote(mockQuote(input.job, input.rates, areaSqm), areaSqm),
      mode: "mock" as const,
    };
  }
}
