import type { QuoteResult, RateItem } from "@/lib/ai/schemas";
import { roundMoney } from "@/lib/money/gst";

const AREA_UNIT_RE = /(m²|m2|sqm|sq\.?\s*m|square\s*metr)/i;

export function isAreaUnit(unit: string): boolean {
  return AREA_UNIT_RE.test(unit);
}

export function calcAreaSqm(lengthM?: number, widthM?: number, areaSqm?: number): number {
  if (areaSqm && areaSqm > 0) return roundMoney(areaSqm);
  if (lengthM && widthM && lengthM > 0 && widthM > 0) {
    return roundMoney(lengthM * widthM);
  }
  return 0;
}

/** Force m²-priced lines to use the measured area as quantity. */
export function applyAreaToQuote(
  quote: QuoteResult,
  areaSqm: number,
): QuoteResult {
  if (!(areaSqm > 0)) return quote;
  return {
    ...quote,
    assumptions: Array.from(
      new Set([
        ...quote.assumptions,
        `Work area used for m² pricing: ${areaSqm} m²`,
      ]),
    ),
    lineItems: quote.lineItems.map((line) =>
      isAreaUnit(line.unit)
        ? { ...line, quantity: areaSqm }
        : line,
    ),
  };
}

export function pickAreaRates(rates: RateItem[]): RateItem[] {
  return rates.filter((r) => isAreaUnit(r.unit));
}

export const DRAFT_DISCLAIMER_EN =
  "DRAFT ESTIMATE ONLY — This quote is a preliminary draft for discussion. Final costs may change after site measure, material selection, access conditions, variations and supplier pricing. It is not a binding contract or tax invoice until confirmed in writing.";

export const DRAFT_DISCLAIMER_KO =
  "견적 초안 고지 — 본 견적은 협의용 사전 초안입니다. 현장 실측, 자재 선택, 접근 조건, 변경 공사, 공급가에 따라 실제 비용이 달라질 수 있습니다. 서면 확정 전까지 계약서·세금계산서가 아닙니다.";

export function disclaimerForLocale(locale: string): string {
  return locale.startsWith("ko") ? DRAFT_DISCLAIMER_KO : DRAFT_DISCLAIMER_EN;
}

export function formatQuotePlainText(input: {
  clientName: string;
  areaSqm: number;
  quote: QuoteResult;
  locale: string;
  totals: { ex: number; gst: number; inc: number };
  formatAud: (n: number) => string;
}): string {
  const lines = [
    `SpareHand — ${input.locale.startsWith("ko") ? "견적 초안" : "Quote draft"}`,
    `${input.locale.startsWith("ko") ? "고객" : "Client"}: ${input.clientName || "—"}`,
    `${input.locale.startsWith("ko") ? "작업" : "Job"}: ${input.quote.jobTitle}`,
    input.areaSqm > 0
      ? `${input.locale.startsWith("ko") ? "면적" : "Area"}: ${input.areaSqm} m²`
      : null,
    "",
    ...(input.quote.lineItems.map(
      (line) =>
        `- ${line.description}: ${line.quantity} ${line.unit} × ${input.formatAud(line.unitPriceExGst)} = ${input.formatAud(roundMoney(line.quantity * line.unitPriceExGst))}`,
    )),
    "",
    `Subtotal (ex GST): ${input.formatAud(input.totals.ex)}`,
    `GST (10%): ${input.formatAud(input.totals.gst)}`,
    `Total (inc GST): ${input.formatAud(input.totals.inc)}`,
    "",
    input.quote.notesForClient,
    "",
    disclaimerForLocale(input.locale),
  ];
  return lines.filter((v) => v !== null).join("\n");
}
