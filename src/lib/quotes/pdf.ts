import { jsPDF } from "jspdf";
import type { QuoteResult } from "@/lib/ai/schemas";
import {
  formatAud,
  gstComponentFromEx,
  roundMoney,
} from "@/lib/money/gst";
import { disclaimerForLocale } from "@/lib/quotes/area";

export function buildQuotePdf(input: {
  businessName: string;
  clientName: string;
  quote: QuoteResult;
  areaSqm?: number;
  locale?: string;
  labels?: {
    subtotalExTax: string;
    taxLabel: string;
    totalIncTax: string;
  };
}) {
  const doc = new jsPDF();
  const ex = input.quote.lineItems.reduce(
    (sum, line) => sum + line.quantity * line.unitPriceExGst,
    0,
  );
  const gst = gstComponentFromEx(ex);
  const inc = roundMoney(ex + gst);
  const locale = input.locale ?? "en-AU";
  const ko = locale.startsWith("ko");
  const labels = input.labels ?? {
    subtotalExTax: ko ? "소계 (세금 별도)" : "Subtotal (ex tax)",
    taxLabel: ko ? "세금 (10%)" : "Tax (10%)",
    totalIncTax: ko ? "합계 (세금 포함)" : "Total (inc tax)",
  };

  let y = 18;
  doc.setFontSize(16);
  doc.text(ko ? "SpareHand — 견적 초안" : "SpareHand — Quote DRAFT", 14, y);
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
  doc.text(`${ko ? "수신" : "To"}: ${input.clientName || (ko ? "고객" : "Client")}`, 14, y);
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
    const row = `${line.description} — ${line.quantity} ${line.unit} × ${formatAud(line.unitPriceExGst)} = ${formatAud(amount)}`;
    const wrapped = doc.splitTextToSize(row, 180);
    doc.text(wrapped, 14, y);
    y += wrapped.length * 5 + 2;
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  }

  y += 4;
  doc.text(`${labels.subtotalExTax}: ${formatAud(ex)}`, 14, y);
  y += 6;
  doc.text(`${labels.taxLabel}: ${formatAud(gst)}`, 14, y);
  y += 6;
  doc.text(`${labels.totalIncTax}: ${formatAud(inc)}`, 14, y);
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
