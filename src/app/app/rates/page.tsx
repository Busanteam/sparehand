"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton } from "@/components/ui";
import type { RateItem } from "@/lib/ai/schemas";
import { formatAud } from "@/lib/money/gst";
import {
  csvToRates,
  defaultRates,
  loadRates,
  ratesToCsv,
  saveRates,
} from "@/lib/storage/local";

export default function RatesPage() {
  const { t } = useI18n();
  const [rates, setRates] = useState<RateItem[]>(defaultRates);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRates(loadRates());
  }, []);

  function update(id: string, patch: Partial<RateItem>) {
    setRates((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setSaved(false);
  }

  function addLine() {
    setRates((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        code: `NEW-${prev.length + 1}`,
        label: "New item",
        unit: "each",
        unitPriceExGst: 0,
      },
    ]);
    setSaved(false);
  }

  function persist() {
    saveRates(rates);
    setSaved(true);
  }

  function exportCsv() {
    const blob = new Blob([ratesToCsv(rates)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sparehand-rates.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importCsv(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const next = csvToRates(String(reader.result || ""));
      if (next.length) {
        setRates(next);
        setSaved(false);
      }
    };
    reader.readAsText(file);
  }

  return (
    <Panel title={t.rates.title} hint={t.rates.hint} help={t.help.rates}>
      <div className="mb-4 flex flex-wrap gap-2">
        <PrimaryButton type="button" onClick={addLine}>
          {t.rates.add}
        </PrimaryButton>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm"
        >
          {t.rates.exportCsv}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm"
        >
          {t.rates.importCsv}
        </button>
        <button
          type="button"
          onClick={persist}
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm"
        >
          {saved ? t.common.saved : t.common.save}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => importCsv(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--panel)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">{t.rates.code}</th>
              <th className="px-4 py-3 font-medium">{t.rates.label}</th>
              <th className="px-4 py-3 font-medium">{t.rates.unit}</th>
              <th className="px-4 py-3 font-medium">{t.rates.unitPrice}</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id} className="border-b border-[var(--line)] last:border-0">
                <td className="px-4 py-2">
                  <input
                    className="w-28 rounded border border-transparent bg-transparent px-1 py-1 hover:border-[var(--line)]"
                    value={rate.code}
                    onChange={(e) => update(rate.id, { code: e.target.value })}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full min-w-40 rounded border border-transparent bg-transparent px-1 py-1 hover:border-[var(--line)]"
                    value={rate.label}
                    onChange={(e) => update(rate.id, { label: e.target.value })}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-24 rounded border border-transparent bg-transparent px-1 py-1 hover:border-[var(--line)]"
                    value={rate.unit}
                    onChange={(e) => update(rate.id, { unit: e.target.value })}
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-28 rounded border border-transparent bg-transparent px-1 py-1 hover:border-[var(--line)]"
                      value={rate.unitPriceExGst}
                      onChange={(e) =>
                        update(rate.id, { unitPriceExGst: Number(e.target.value) })
                      }
                    />
                    <span className="text-xs text-[var(--muted)]">
                      {formatAud(rate.unitPriceExGst)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
