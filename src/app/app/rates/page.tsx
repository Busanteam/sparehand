"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton } from "@/components/ui";
import type { RateItem, Trade, TradeGroup } from "@/lib/ai/schemas";
import { groupDisplayName, tradeDisplayName } from "@/lib/catalog/defaults";
import { formatAud } from "@/lib/money/gst";
import {
  csvToRates,
  defaultRates,
  defaultTradeGroups,
  defaultTrades,
  loadRates,
  loadTradeGroups,
  loadTrades,
  ratesToCsv,
  saveRates,
} from "@/lib/storage/local";

export default function RatesPage() {
  const { t, locale } = useI18n();
  const [groups, setGroups] = useState<TradeGroup[]>(defaultTradeGroups);
  const [trades, setTrades] = useState<Trade[]>(defaultTrades);
  const [rates, setRates] = useState<RateItem[]>(defaultRates);
  const [tradeFilter, setTradeFilter] = useState<string>("all");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadedGroups = loadTradeGroups();
    const loadedTrades = loadTrades();
    setGroups(loadedGroups);
    setTrades(loadedTrades);
    setRates(loadRates());
    if (loadedTrades[0]) setTradeFilter(loadedTrades[0].id);
  }, []);

  const tradesByGroup = useMemo(() => {
    return groups
      .map((g) => ({
        group: g,
        trades: trades.filter((tr) => tr.groupId === g.id),
      }))
      .filter((row) => row.trades.length > 0);
  }, [groups, trades]);

  const visible = useMemo(
    () =>
      tradeFilter === "all"
        ? rates
        : rates.filter((r) => r.tradeId === tradeFilter),
    [rates, tradeFilter],
  );

  function update(id: string, patch: Partial<RateItem>) {
    setRates((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setSaved(false);
  }

  function addLine() {
    const tradeId =
      tradeFilter !== "all" ? tradeFilter : trades[0]?.id ?? "t-hand";
    setRates((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        tradeId,
        code: `NEW-${prev.length + 1}`,
        label: t.common.newItem,
        unit: "each",
        unitPriceExGst: 0,
      },
    ]);
    setSaved(false);
  }

  function removeLine(id: string) {
    setRates((prev) => prev.filter((r) => r.id !== id));
    setSaved(false);
  }

  function persist() {
    saveRates(rates);
    setSaved(true);
  }

  function exportCsv() {
    const blob = new Blob([ratesToCsv(rates, trades)], {
      type: "text/csv;charset=utf-8",
    });
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
      const next = csvToRates(String(reader.result || ""), trades);
      if (next.length) {
        setRates(next);
        setSaved(false);
      }
    };
    reader.readAsText(file);
  }

  function resetDefaults() {
    const ok = window.confirm(t.rates.resetConfirm);
    if (!ok) return;
    setRates(defaultRates);
    setSaved(false);
  }

  function TradeOptions() {
    return (
      <>
        {tradesByGroup.map(({ group, trades: list }) => (
          <optgroup key={group.id} label={groupDisplayName(group, locale)}>
            {list.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {tradeDisplayName(tr, locale)}
              </option>
            ))}
          </optgroup>
        ))}
      </>
    );
  }

  return (
    <Panel title={t.rates.title} hint={t.rates.hint} help={t.help.rates}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>{t.rates.filterTrade}</span>
          <select
            className="sh-select rounded-md border border-[var(--line)] bg-[var(--surface)] py-1.5 pl-3 text-[var(--ink)]"
            value={tradeFilter}
            onChange={(e) => setTradeFilter(e.target.value)}
          >
            <option value="all">{t.rates.allTrades}</option>
            <TradeOptions />
          </select>
        </label>
        <PrimaryButton type="button" onClick={addLine}>
          {t.rates.add}
        </PrimaryButton>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm"
        >
          {t.rates.exportCsv}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm"
        >
          {t.rates.importCsv}
        </button>
        <button
          type="button"
          onClick={persist}
          className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm"
        >
          {saved ? t.common.saved : t.common.save}
        </button>
        <button
          type="button"
          onClick={resetDefaults}
          className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm"
        >
          {t.rates.resetDefaults}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => importCsv(e.target.files?.[0] ?? null)}
        />
      </div>

      <p className="mb-3 text-xs text-[var(--muted)]">
        {t.rates.manageTradesHint}{" "}
        <Link
          href="/app/trades"
          className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
        >
          {t.nav.trades}
        </Link>
      </p>

      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--panel)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">{t.rates.trade}</th>
              <th className="px-4 py-3 font-medium">{t.rates.code}</th>
              <th className="px-4 py-3 font-medium">{t.rates.label}</th>
              <th className="px-4 py-3 font-medium">{t.rates.unit}</th>
              <th className="px-4 py-3 font-medium">{t.rates.unitPrice}</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {visible.map((rate) => (
              <tr key={rate.id} className="border-b border-[var(--line)] last:border-0">
                <td className="px-4 py-2">
                  <select
                    className="sh-select max-w-[14rem] rounded-md border border-[var(--line)] bg-[var(--panel)] py-1 pl-2 text-sm"
                    value={rate.tradeId}
                    onChange={(e) => update(rate.id, { tradeId: e.target.value })}
                  >
                    <TradeOptions />
                  </select>
                </td>
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
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    className="text-sm text-[var(--warn)]"
                    onClick={() => removeLine(rate.id)}
                  >
                    {t.rates.remove}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
