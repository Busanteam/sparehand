import { jsPDF } from "jspdf";
import type { QuoteResult } from "@/lib/ai/schemas";
import {
  formatMoney,
  gstComponentFromEx,
  roundMoney,
} from "@/lib/money/gst";
import { disclaimerForLocale } from "@/lib/quotes/area";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return [15, 118, 110];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function buildQuotePdf(input: {
  businessName: string;
  abn?: string;
  clientName: string;
  quote: QuoteResult;
  areaSqm?: number;
  locale?: string;
  taxRate?: number;
  currency?: string;
  currencyLocale?: string;
  brandColor?: string;
  status?: string;
  labels?: {
    subtotalExTax: string;
    taxLabel: string;
    totalIncTax: string;
  };
}) {
  const doc = new jsPDF();
  const taxRate = input.taxRate ?? 0.1;
  const moneyOpts = {
    currency: input.currency ?? "AUD",
    locale: input.currencyLocale ?? "en-AU",
  };
  const money = (n: number) => formatMoney(n, moneyOpts);
  const ex = input.quote.lineItems.reduce(
    (sum, line) => sum + line.quantity * line.unitPriceExGst,
    0,
  );
  const gst = gstComponentFromEx(ex, taxRate);
  const inc = roundMoney(ex + gst);
  const locale = input.locale ?? "en-AU";
  const ko = locale.startsWith("ko");
  const labels = input.labels ?? {
    subtotalExTax: ko ? "소계 (세금 별도)" : "Subtotal (ex tax)",
    taxLabel: ko
      ? `세금 (${Math.round(taxRate * 100)}%)`
      : `Tax (${Math.round(taxRate * 100)}%)`,
    totalIncTax: ko ? "합계 (세금 포함)" : "Total (inc tax)",
  };
  const brand = hexToRgb(input.brandColor ?? "#0f766e");

  let y = 18;
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, 0, 210, 8, "F");
  doc.setFontSize(16);
  doc.setTextColor(brand[0], brand[1], brand[2]);
  const statusSuffix = input.status ? ` (${input.status})` : "";
  doc.text(
    ko
      ? `SpareHand — 견적 초안${statusSuffix}`
      : `SpareHand — Quote DRAFT${statusSuffix}`,
    14,
    y,
  );
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(150, 60, 20);
  const banner = doc.splitTextToSize(disclaimerForLocale(locale), 180);
  doc.text(banner, 14, y);
  y += banner.length * 4.2 + 6;
  doc.setTextColor(0);

  doc.setFontSize(11);
  doc.text(`${ko ? "발신" : "From"}: ${input.businessName}`, 14, y);
  y += 6;
  if (input.abn) {
    doc.text(`${ko ? "사업자번호" : "ABN / Biz no."}: ${input.abn}`, 14, y);
    y += 6;
  }
  doc.text(
    `${ko ? "수신" : "To"}: ${input.clientName || (ko ? "고객" : "Client")}`,
    14,
    y,
  );
  y += 6;
  doc.text(`${ko ? "작업" : "Job"}: ${input.quote.jobTitle}`, 14, y);
  y += 6;
  if (input.areaSqm && input.areaSqm > 0) {
    doc.text(`${ko ? "면적" : "Area"}: ${input.areaSqm} m²`, 14, y);
    y += 6;
  }
  y += 4;

  doc.setFontSize(10);
  doc.text(ko ? "품목 (세금 별도)" : "Line items (ex tax)", 14, y);
  y += 6;
  for (const line of input.quote.lineItems) {
    const amount = roundMoney(line.quantity * line.unitPriceExGst);
    const row = `${line.description} — ${line.quantity} ${line.unit} × ${money(line.unitPriceExGst)} = ${money(amount)}`;
    const wrapped = doc.splitTextToSize(row, 180);
    doc.text(wrapped, 14, y);
    y += wrapped.length * 5 + 2;
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  }

  y += 4;
  doc.text(`${labels.subtotalExTax}: ${money(ex)}`, 14, y);
  y += 6;
  doc.text(`${labels.taxLabel}: ${money(gst)}`, 14, y);
  y += 6;
  doc.setTextColor(brand[0], brand[1], brand[2]);
  doc.text(`${labels.totalIncTax}: ${money(inc)}`, 14, y);
  doc.setTextColor(0);
  y += 10;
  doc.text(ko ? "메모" : "Notes", 14, y);
  y += 6;
  const notes = doc.splitTextToSize(input.quote.notesForClient, 180);
  doc.text(notes, 14, y);
  y += notes.length * 5 + 8;
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  doc.setTextColor(150, 60, 20);
  const footer = doc.splitTextToSize(disclaimerForLocale(locale), 180);
  doc.text(footer, 14, y);

  return doc;
}
