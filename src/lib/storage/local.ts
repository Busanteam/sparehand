import type { RateItem, Trade, TradeGroup } from "@/lib/ai/schemas";
import {
  defaultRates,
  defaultTradeGroups,
  defaultTrades,
  legacyTradeGroupMap,
} from "@/lib/catalog/defaults";

const GROUPS_KEY = "sparehand_trade_groups_v1";
const TRADES_KEY = "sparehand_trades_v2";
const RATES_KEY = "sparehand_rates_v4";
const HISTORY_KEY = "sparehand_history_v1";

export { defaultRates, defaultTradeGroups, defaultTrades };

function normalizeTrade(raw: Partial<Trade> & { id: string; name: string }): Trade {
  const groupId =
    raw.groupId ||
    legacyTradeGroupMap[raw.id] ||
    defaultTradeGroups[0]?.id ||
    "g-property";
  return {
    id: raw.id,
    groupId,
    name: raw.name,
    nameKo: raw.nameKo,
  };
}

export function loadTradeGroups(): TradeGroup[] {
  if (typeof window === "undefined") return defaultTradeGroups;
  try {
    const raw = localStorage.getItem(GROUPS_KEY);
    if (!raw) return defaultTradeGroups;
    const parsed = JSON.parse(raw) as TradeGroup[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : defaultTradeGroups;
  } catch {
    return defaultTradeGroups;
  }
}

export function saveTradeGroups(groups: TradeGroup[]) {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
}

export function loadTrades(): Trade[] {
  if (typeof window === "undefined") return defaultTrades;
  try {
    const raw = localStorage.getItem(TRADES_KEY);
    if (!raw) return defaultTrades;
    const parsed = JSON.parse(raw) as Partial<Trade>[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultTrades;
    return parsed
      .filter((t): t is Partial<Trade> & { id: string; name: string } =>
        Boolean(t?.id && t?.name),
      )
      .map(normalizeTrade);
  } catch {
    return defaultTrades;
  }
}

export function saveTrades(trades: Trade[]) {
  localStorage.setItem(TRADES_KEY, JSON.stringify(trades));
}

export function loadRates(): RateItem[] {
  if (typeof window === "undefined") return defaultRates;
  try {
    const raw = localStorage.getItem(RATES_KEY);
    if (!raw) return defaultRates;
    const parsed = JSON.parse(raw) as RateItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultRates;
    return parsed.map((r) =>
      r.tradeId
        ? r
        : { ...r, tradeId: "t-hand", id: r.id || crypto.randomUUID() },
    );
  } catch {
    return defaultRates;
  }
}

export function saveRates(rates: RateItem[]) {
  localStorage.setItem(RATES_KEY, JSON.stringify(rates));
}

export function ratesForTrade(rates: RateItem[], tradeId: string): RateItem[] {
  return rates.filter((r) => r.tradeId === tradeId);
}

export function tradesInGroup(trades: Trade[], groupId: string): Trade[] {
  return trades.filter((t) => t.groupId === groupId);
}

export type HistoryKind = "inbox" | "meeting" | "document" | "quote";

export type HistoryItem = {
  id: string;
  kind: HistoryKind;
  title: string;
  createdAt: string;
  payload: unknown;
};

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function pushHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  const next: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = [next, ...loadHistory()].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
  return next;
}

export function ratesToCsv(rates: RateItem[], trades: Trade[]): string {
  const tradeName = (id: string) =>
    trades.find((t) => t.id === id)?.name ?? id;
  const header = "trade,code,label,unit,unitPriceExGst";
  const rows = rates.map(
    (r) =>
      `${csvEscape(tradeName(r.tradeId))},${csvEscape(r.code)},${csvEscape(r.label)},${csvEscape(r.unit)},${r.unitPriceExGst}`,
  );
  return [header, ...rows].join("\n");
}

export function csvToRates(csv: string, trades: Trade[]): RateItem[] {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length <= 1) return [];
  const rows = lines.slice(1);
  const fallbackTrade = trades[0]?.id ?? "t-hand";
  return rows.map((line, index) => {
    const parts = splitCsvLine(line);
    const hasTrade = parts.length >= 5;
    const tradeName = hasTrade ? parts[0] : "";
    const code = hasTrade ? parts[1] : parts[0];
    const label = hasTrade ? parts[2] : parts[1];
    const unit = hasTrade ? parts[3] : parts[2];
    const price = hasTrade ? parts[4] : parts[3];
    const matched =
      trades.find(
        (t) =>
          t.name.toLowerCase() === tradeName.toLowerCase() ||
          (t.nameKo && t.nameKo === tradeName),
      )?.id ?? fallbackTrade;
    return {
      id: `csv-${index}-${Date.now()}`,
      tradeId: matched,
      code: code || `ITEM-${index + 1}`,
      label: label || "Item",
      unit: unit || "each",
      unitPriceExGst: Number(price) || 0,
    };
  });
}

function csvEscape(value: string) {
  if (value.includes(",") || value.includes('"')) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}
