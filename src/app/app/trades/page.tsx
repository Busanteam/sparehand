"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton } from "@/components/ui";
import type { Trade, TradeGroup } from "@/lib/ai/schemas";
import { groupDisplayName, tradeDisplayName } from "@/lib/catalog/defaults";
import {
  defaultTradeGroups,
  defaultTrades,
  loadRates,
  loadTradeGroups,
  loadTrades,
  saveRates,
  saveTradeGroups,
  saveTrades,
} from "@/lib/storage/local";

export default function TradesPage() {
  const { t, locale } = useI18n();
  const [groups, setGroups] = useState<TradeGroup[]>(defaultTradeGroups);
  const [trades, setTrades] = useState<Trade[]>(defaultTrades);
  const [saved, setSaved] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNameKo, setNewNameKo] = useState("");
  const [newGroupId, setNewGroupId] = useState(defaultTradeGroups[0]?.id ?? "");

  useEffect(() => {
    const loadedGroups = loadTradeGroups();
    setGroups(loadedGroups);
    setTrades(loadTrades());
    setNewGroupId(loadedGroups[0]?.id ?? "");
  }, []);

  function update(id: string, patch: Partial<Trade>) {
    setTrades((prev) => prev.map((tr) => (tr.id === id ? { ...tr, ...patch } : tr)));
    setSaved(false);
  }

  function addTrade() {
    const name = newName.trim();
    if (!name || !newGroupId) return;
    setTrades((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        groupId: newGroupId,
        name,
        nameKo: newNameKo.trim() || undefined,
      },
    ]);
    setNewName("");
    setNewNameKo("");
    setSaved(false);
  }

  function removeTrade(id: string) {
    if (trades.length <= 1) return;
    const ok = window.confirm(t.trades.deleteConfirm);
    if (!ok) return;
    setTrades((prev) => prev.filter((tr) => tr.id !== id));
    const remaining = trades.filter((tr) => tr.id !== id);
    const fallback = remaining[0]?.id;
    if (fallback) {
      const rates = loadRates().map((r) =>
        r.tradeId === id ? { ...r, tradeId: fallback } : r,
      );
      saveRates(rates);
    }
    setSaved(false);
  }

  function persist() {
    saveTradeGroups(groups);
    saveTrades(trades);
    setSaved(true);
  }

  function resetDefaults() {
    const ok = window.confirm(t.trades.resetConfirm);
    if (!ok) return;
    setGroups(defaultTradeGroups);
    setTrades(defaultTrades);
    setNewGroupId(defaultTradeGroups[0]?.id ?? "");
    setSaved(false);
  }

  return (
    <Panel title={t.trades.title} hint={t.trades.hint} help={t.help.trades}>
      <div className="mb-4 flex flex-wrap gap-2">
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
          {t.trades.resetDefaults}
        </button>
      </div>

      <div className="mb-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
        <p className="text-sm font-semibold">{t.trades.addTitle}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            className="sh-select min-w-[10rem] rounded-xl border border-[var(--line)] bg-[var(--panel)] py-2 pl-3 text-sm"
            value={newGroupId}
            onChange={(e) => setNewGroupId(e.target.value)}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {groupDisplayName(g, locale)}
              </option>
            ))}
          </select>
          <input
            className="min-w-[10rem] flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
            placeholder={t.trades.nameEn}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="min-w-[10rem] flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
            placeholder={t.trades.nameKo}
            value={newNameKo}
            onChange={(e) => setNewNameKo(e.target.value)}
          />
          <PrimaryButton type="button" onClick={addTrade} disabled={!newName.trim()}>
            {t.trades.add}
          </PrimaryButton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--panel)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">{t.trades.group}</th>
              <th className="px-4 py-3 font-medium">{t.trades.nameEn}</th>
              <th className="px-4 py-3 font-medium">{t.trades.nameKo}</th>
              <th className="px-4 py-3 font-medium">{t.trades.preview}</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-[var(--line)] last:border-0">
                <td className="px-4 py-2">
                  <select
                    className="sh-select max-w-[12rem] rounded-md border border-[var(--line)] bg-[var(--panel)] py-1 pl-2 text-sm"
                    value={trade.groupId}
                    onChange={(e) => update(trade.id, { groupId: e.target.value })}
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {groupDisplayName(g, locale)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full min-w-36 rounded border border-transparent bg-transparent px-1 py-1 hover:border-[var(--line)]"
                    value={trade.name}
                    onChange={(e) => update(trade.id, { name: e.target.value })}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full min-w-36 rounded border border-transparent bg-transparent px-1 py-1 hover:border-[var(--line)]"
                    value={trade.nameKo ?? ""}
                    onChange={(e) =>
                      update(trade.id, { nameKo: e.target.value || undefined })
                    }
                  />
                </td>
                <td className="px-4 py-2 text-[var(--muted)]">
                  {tradeDisplayName(trade, locale)}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    className="text-sm text-[var(--warn)] disabled:opacity-40"
                    disabled={trades.length <= 1}
                    onClick={() => removeTrade(trade.id)}
                  >
                    {t.trades.remove}
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
