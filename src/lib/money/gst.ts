/** Australian GST helpers (standard 10%). */

export const GST_RATE = 0.1;

export function exGstToIncGst(exGst: number): number {
  return roundMoney(exGst * (1 + GST_RATE));
}

export function gstComponentFromEx(exGst: number): number {
  return roundMoney(exGst * GST_RATE);
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}
