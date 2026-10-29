import { z } from "zod";

export const localeSchema = z.string().max(16).optional();

export const inboxBodySchema = z.object({
  text: z.string().trim().min(1).max(20_000),
  locale: localeSchema,
});

export const meetingBodySchema = z.object({
  text: z.string().trim().min(1).max(40_000),
  locale: localeSchema,
});

export const documentBodySchema = z.object({
  imageDataUrl: z
    .string()
    .startsWith("data:")
    .max(5_500_000, "image too large"),
  locale: localeSchema,
});

export const rateItemSchema = z.object({
  id: z.string().max(80),
  tradeId: z.string().max(80),
  code: z.string().max(40),
  label: z.string().max(200),
  unit: z.string().max(40),
  unitPriceExGst: z.number().finite().min(0).max(1_000_000),
});

export const quoteBodySchema = z.object({
  job: z.string().trim().min(1).max(8_000),
  clientName: z.string().max(200).optional(),
  rates: z.array(rateItemSchema).min(1).max(80),
  tradeName: z.string().max(200).optional(),
  locale: localeSchema,
  lengthM: z.number().finite().min(0).max(10_000).optional(),
  widthM: z.number().finite().min(0).max(10_000).optional(),
  areaSqm: z.number().finite().min(0).max(100_000).optional(),
});

export const webhookBodySchema = z.object({
  subject: z.string().max(500).optional(),
  from: z.string().max(320).optional(),
  body: z.string().max(50_000).optional(),
  source: z.string().max(80).optional(),
});

export function zodErrorMessage(err: z.ZodError): string {
  return err.issues.map((i) => i.message).join("; ") || "invalid_body";
}
