import type { QuoteResult } from "@/lib/ai/schemas";

export type QuoteStatus = "draft" | "sent" | "accepted" | "declined";

export type QuoteVersion = {
  at: string;
  status: QuoteStatus;
  snapshot: QuoteResult;
  note?: string;
};

export type SavedQuote = {
  id: string;
  status: QuoteStatus;
  clientId: string | null;
  clientName: string;
  tradeIds: string[];
  areaSqm: number;
  result: QuoteResult;
  totals: { ex: number; tax: number; inc: number };
  taxRate: number;
  currency: string;
  versions: QuoteVersion[];
  createdAt: string;
  updatedAt: string;
};

const KEY = "sparehand_quotes_v1";

export function loadQuotes(): SavedQuote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedQuote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveQuotes(quotes: SavedQuote[]) {
  localStorage.setItem(KEY, JSON.stringify(quotes));
}

export function upsertQuote(
  quotes: SavedQuote[],
  quote: SavedQuote,
): SavedQuote[] {
  const idx = quotes.findIndex((q) => q.id === quote.id);
  if (idx === -1) return [quote, ...quotes];
  const next = [...quotes];
  next[idx] = quote;
  return next;
}

export function deleteQuote(quotes: SavedQuote[], id: string): SavedQuote[] {
  return quotes.filter((q) => q.id !== id);
}

export function setQuoteStatus(
  quote: SavedQuote,
  status: QuoteStatus,
  note?: string,
): SavedQuote {
  const now = new Date().toISOString();
  return {
    ...quote,
    status,
    updatedAt: now,
    versions: [
      ...quote.versions,
      {
        at: now,
        status,
        snapshot: quote.result,
        note,
      },
    ],
  };
}
