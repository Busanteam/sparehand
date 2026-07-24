import { z } from "zod";

export const inboxResultSchema = z.object({
  urgency: z.enum(["low", "medium", "high", "critical"]),
  category: z.string(),
  summary: z.string(),
  draftReply: z.string(),
  actions: z.array(z.string()),
  customerName: z.string().optional(),
});

export const meetingResultSchema = z.object({
  title: z.string(),
  summary: z.string(),
  decisions: z.array(z.string()),
  actionItems: z.array(
    z.object({
      task: z.string(),
      owner: z.string().optional(),
      due: z.string().optional(),
    }),
  ),
});

export const documentResultSchema = z.object({
  documentType: z.enum(["receipt", "invoice", "other"]),
  vendor: z.string().optional(),
  date: z.string().optional(),
  abn: z.string().optional(),
  currency: z.string().default("AUD"),
  subtotalExGst: z.number().optional(),
  gst: z.number().optional(),
  totalIncGst: z.number().optional(),
  lineItems: z.array(
    z.object({
      description: z.string(),
      quantity: z.number().optional(),
      unitPriceExGst: z.number().optional(),
      amountExGst: z.number().optional(),
    }),
  ),
  notes: z.string().optional(),
});

export const quoteResultSchema = z.object({
  jobTitle: z.string(),
  assumptions: z.array(z.string()),
  lineItems: z.array(
    z.object({
      code: z.string().optional(),
      description: z.string(),
      quantity: z.number(),
      unit: z.string(),
      unitPriceExGst: z.number(),
    }),
  ),
  notesForClient: z.string(),
});

export const rateItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  label: z.string(),
  unit: z.string(),
  unitPriceExGst: z.number(),
});

export type InboxResult = z.infer<typeof inboxResultSchema>;
export type MeetingResult = z.infer<typeof meetingResultSchema>;
export type DocumentResult = z.infer<typeof documentResultSchema>;
export type QuoteResult = z.infer<typeof quoteResultSchema>;
export type RateItem = z.infer<typeof rateItemSchema>;
