import type { RateItem } from "@/lib/ai/schemas";

const RATES_KEY = "sparehand_rates_v1";
const HISTORY_KEY = "sparehand_history_v1";

export const defaultRates: RateItem[] = [
  {
    id: "r1",
    code: "LAB-HR",
    label: "Skilled labour",
    unit: "hour",
    unitPriceExGst: 95,
  },
  {
    id: "r2",
    code: "CALL",
    label: "Call-out fee",
    unit: "job",
    unitPriceExGst: 85,
  },
  {
    id: "r3",
    code: "MAT-GEN",
    label: "General materials allowance",
    unit: "lot",
    unitPriceExGst: 120,
  },
];

export function loadRates(): RateItem[] {
  if (typeof window === "undefined") return defaultRates;
  try {
    const raw = localStorage.getItem(RATES_KEY);
    if (!raw) return defaultRates;
    return JSON.parse(raw) as RateItem[];
  } catch {
    return defaultRates;
  }
}

export function saveRates(rates: RateItem[]) {
  localStorage.setItem(RATES_KEY, JSON.stringify(rates));
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

export function ratesToCsv(rates: RateItem[]): string {
  const header = "code,label,unit,unitPriceExGst";
  const rows = rates.map(
    (r) =>
      `${csvEscape(r.code)},${csvEscape(r.label)},${csvEscape(r.unit)},${r.unitPriceExGst}`,
  );
  return [header, ...rows].join("\n");
}

export function csvToRates(csv: string): RateItem[] {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length <= 1) return [];
  const rows = lines.slice(1);
  return rows.map((line, index) => {
    const [code, label, unit, price] = splitCsvLine(line);
    return {
      id: `csv-${index}-${Date.now()}`,
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
