/** Tax and money formatting helpers (company-configurable). */

export const DEFAULT_TAX_RATE = 0.1;

export function exGstToIncGst(
  exGst: number,
  taxRate: number = DEFAULT_TAX_RATE,
): number {
  return roundMoney(exGst * (1 + taxRate));
}

export function gstComponentFromEx(
  exGst: number,
  taxRate: number = DEFAULT_TAX_RATE,
): number {
  return roundMoney(exGst * taxRate);
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export type MoneyFormatOptions = {
  currency?: string;
  locale?: string;
};

export function formatMoney(
  value: number,
  options: MoneyFormatOptions = {},
): string {
  const currency = options.currency ?? "AUD";
  const locale = options.locale ?? "en-AU";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/** @deprecated Prefer formatMoney with company settings. */
export function formatAud(value: number): string {
  return formatMoney(value, { currency: "AUD", locale: "en-AU" });
}

/** Keep GST_RATE alias for older call sites / tests. */
export const GST_RATE = DEFAULT_TAX_RATE;
