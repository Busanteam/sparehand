export type CompanySettings = {
  businessName: string;
  abn: string;
  /** Decimal tax rate, e.g. 0.1 for 10%. */
  taxRate: number;
  currency: string;
  currencyLocale: string;
  /** Hex colour for PDF accent, e.g. #0f766e */
  pdfBrandColor: string;
};

export const defaultCompanySettings: CompanySettings = {
  businessName: "SpareHand Demo Business",
  abn: "",
  taxRate: 0.1,
  currency: "AUD",
  currencyLocale: "en-AU",
  pdfBrandColor: "#0f766e",
};

const KEY = "sparehand_company_v1";

export function loadCompanySettings(): CompanySettings {
  if (typeof window === "undefined") return defaultCompanySettings;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultCompanySettings;
    const parsed = JSON.parse(raw) as Partial<CompanySettings>;
    return {
      ...defaultCompanySettings,
      ...parsed,
      taxRate:
        typeof parsed.taxRate === "number" && parsed.taxRate >= 0
          ? parsed.taxRate
          : defaultCompanySettings.taxRate,
    };
  } catch {
    return defaultCompanySettings;
  }
}

export function saveCompanySettings(settings: CompanySettings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

export function taxPercentLabel(taxRate: number): string {
  const pct = Math.round(taxRate * 1000) / 10;
  return Number.isInteger(pct) ? String(pct) : pct.toFixed(1);
}
