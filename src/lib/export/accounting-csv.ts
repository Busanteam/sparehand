import type { SavedQuote } from "@/lib/storage/quotes";
import { taxPercentLabel } from "@/lib/storage/company";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** Accountant-friendly line export for accepted (or filtered) quotes. */
export function quotesToAccountingCsv(
  quotes: SavedQuote[],
  options?: { businessName?: string; abn?: string },
): string {
  const header = [
    "date",
    "quoteId",
    "status",
    "client",
    "jobTitle",
    "lineDescription",
    "quantity",
    "unit",
    "unitPriceExTax",
    "lineExTax",
    "taxRatePct",
    "taxAmount",
    "lineIncTax",
    "currency",
    "businessName",
    "abn",
  ].join(",");

  const rows: string[] = [];
  for (const q of quotes) {
    for (const line of q.result.lineItems) {
      const lineEx = Math.round(line.quantity * line.unitPriceExGst * 100) / 100;
      const tax = Math.round(lineEx * q.taxRate * 100) / 100;
      rows.push(
        [
          q.updatedAt.slice(0, 10),
          q.id,
          q.status,
          csvEscape(q.clientName),
          csvEscape(q.result.jobTitle),
          csvEscape(line.description),
          String(line.quantity),
          csvEscape(line.unit),
          String(line.unitPriceExGst),
          String(lineEx),
          taxPercentLabel(q.taxRate),
          String(tax),
          String(Math.round((lineEx + tax) * 100) / 100),
          q.currency,
          csvEscape(options?.businessName ?? ""),
          csvEscape(options?.abn ?? ""),
        ].join(","),
      );
    }
  }
  return [header, ...rows].join("\n");
}
