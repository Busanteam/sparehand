import { jsPDF } from "jspdf";
import type { QuoteResult } from "@/lib/ai/schemas";
import {
  formatAud,
  gstComponentFromEx,
  roundMoney,
} from "@/lib/money/gst";

export function buildQuotePdf(input: {
  businessName: string;
  clientName: string;
  quote: QuoteResult;
}) {
  const doc = new jsPDF();
  const ex = input.quote.lineItems.reduce(
    (sum, line) => sum + line.quantity * line.unitPriceExGst,
    0,
  );
  const gst = gstComponentFromEx(ex);
  const inc = roundMoney(ex + gst);

  let y = 20;
  doc.setFontSize(18);
  doc.text("SpareHand — Quote draft", 14, y);
  y += 10;
  doc.setFontSize(11);
  doc.text(`From: ${input.businessName}`, 14, y);
  y += 6;
  doc.text(`To: ${input.clientName || "Client"}`, 14, y);
  y += 6;
  doc.text(`Job: ${input.quote.jobTitle}`, 14, y);
  y += 10;

  doc.setFontSize(10);
  doc.text("Line items (ex GST)", 14, y);
  y += 6;
  for (const line of input.quote.lineItems) {
    const amount = roundMoney(line.quantity * line.unitPriceExGst);
    const row = `${line.description} — ${line.quantity} ${line.unit} × ${formatAud(line.unitPriceExGst)} = ${formatAud(amount)}`;
    const wrapped = doc.splitTextToSize(row, 180);
    doc.text(wrapped, 14, y);
    y += wrapped.length * 5 + 2;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  y += 4;
  doc.text(`Subtotal (ex GST): ${formatAud(ex)}`, 14, y);
  y += 6;
  doc.text(`GST (10%): ${formatAud(gst)}`, 14, y);
  y += 6;
  doc.text(`Total (inc GST): ${formatAud(inc)}`, 14, y);
  y += 10;
  doc.text("Notes", 14, y);
  y += 6;
  const notes = doc.splitTextToSize(input.quote.notesForClient, 180);
  doc.text(notes, 14, y);
  y += notes.length * 5 + 8;
  doc.setTextColor(120);
  doc.text("DRAFT ONLY — review before sending to a customer.", 14, y);

  return doc;
}
