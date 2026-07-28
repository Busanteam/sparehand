"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import {
  EmptyState,
  Panel,
  PrimaryButton,
  ResultCard,
  StepLabel,
  TextArea,
} from "@/components/ui";
import type { QuoteResult, RateItem, Trade, TradeGroup } from "@/lib/ai/schemas";
import { groupDisplayName, tradeDisplayName } from "@/lib/catalog/defaults";
import { quotesToAccountingCsv } from "@/lib/export/accounting-csv";
import {
  formatMoney,
  gstComponentFromEx,
  roundMoney,
} from "@/lib/money/gst";
import {
  calcAreaSqm,
  disclaimerForLocale,
  formatQuotePlainText,
} from "@/lib/quotes/area";
import { aiFetchInit } from "@/lib/storage/ai-config";
import { loadClients, type ClientRecord } from "@/lib/storage/clients";
import {
  defaultCompanySettings,
  loadCompanySettings,
  taxPercentLabel,
  type CompanySettings,
} from "@/lib/storage/company";
import {
  loadQuotes,
  saveQuotes,
  setQuoteStatus,
  upsertQuote,
  type QuoteStatus,
  type SavedQuote,
} from "@/lib/storage/quotes";
import {
  loadRates,
  loadTradeGroups,
  loadTrades,
  pushHistory,
  ratesForTrade,
  tradesInGroup,
} from "@/lib/storage/local";

const STATUSES: QuoteStatus[] = ["draft", "sent", "accepted", "declined"];

export default function QuotesPage() {
  const { t, locale } = useI18n();
  const [job, setJob] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [lengthM, setLengthM] = useState("");
  const [widthM, setWidthM] = useState("");
  const [areaSqmInput, setAreaSqmInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [usedArea, setUsedArea] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [groups, setGroups] = useState<TradeGroup[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [rates, setRates] = useState<RateItem[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [company, setCompany] = useState<CompanySettings>(defaultCompanySettings);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [quoteStatus, setQuoteStatusLocal] = useState<QuoteStatus>("draft");
  const [groupId, setGroupId] = useState("");
  const [tradeId, setTradeId] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | QuoteStatus>("all");

  useEffect(() => {
    const loadedGroups = loadTradeGroups();
    const loadedTrades = loadTrades();
    const loadedRates = loadRates();
    setGroups(loadedGroups);
    setTrades(loadedTrades);
    setRates(loadedRates);
    setClients(loadClients());
    setCompany(loadCompanySettings());
    setSavedQuotes(loadQuotes());
    const firstGroup = loadedGroups[0]?.id ?? "";
    setGroupId(firstGroup);
    const firstTrade = tradesInGroup(loadedTrades, firstGroup)[0]?.id ?? "";
    setTradeId(firstTrade);
    if (firstTrade) {
      setSelectedIds(ratesForTrade(loadedRates, firstTrade).map((r) => r.id));
    }
  }, []);

  const money = (n: number) =>
    formatMoney(n, {
      currency: company.currency,
      locale: company.currencyLocale,
    });

  const taxLabel = t.quotes.taxLabel.replace(
    "{pct}",
    taxPercentLabel(company.taxRate),
  );

  const groupTrades = useMemo(
    () => (groupId ? tradesInGroup(trades, groupId) : []),
    [trades, groupId],
  );

  const tradeRates = useMemo(
    () => (tradeId ? ratesForTrade(rates, tradeId) : []),
    [rates, tradeId],
  );

  const selectedRates = useMemo(
    () => rates.filter((r) => selectedIds.includes(r.id)),
    [rates, selectedIds],
  );

  const selectedTradeIds = useMemo(
    () => [...new Set(selectedRates.map((r) => r.tradeId))],
    [selectedRates],
  );

  const previewArea = useMemo(
    () =>
      calcAreaSqm(
        Number(lengthM) || undefined,
        Number(widthM) || undefined,
        Number(areaSqmInput) || undefined,
      ),
    [lengthM, widthM, areaSqmInput],
  );

  const totals = useMemo(() => {
    if (!result) return null;
    const ex = result.lineItems.reduce(
      (sum, line) => sum + line.quantity * line.unitPriceExGst,
      0,
    );
    const tax = gstComponentFromEx(ex, company.taxRate);
    return { ex: roundMoney(ex), gst: tax, inc: roundMoney(ex + tax) };
  }, [result, company.taxRate]);

  const filteredQuotes = useMemo(
    () =>
      statusFilter === "all"
        ? savedQuotes
        : savedQuotes.filter((q) => q.status === statusFilter),
    [savedQuotes, statusFilter],
  );

  function toggleRate(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function selectAllRates() {
    setSelectedIds((prev) => [
      ...new Set([...prev, ...tradeRates.map((r) => r.id)]),
    ]);
  }

  function clearRateSelection() {
    setSelectedIds((prev) =>
      prev.filter((id) => !tradeRates.some((r) => r.id === id)),
    );
  }

  function onClientPick(id: string) {
    setClientId(id);
    const c = clients.find((x) => x.id === id);
    if (c) setClientName(c.name);
  }

  async function run() {
    if (selectedRates.length === 0) {
      setError(t.quotes.needRates);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const tradeLabels = selectedTradeIds
        .map((id) => {
          const tr = trades.find((x) => x.id === id);
          return tr ? tradeDisplayName(tr, locale) : null;
        })
        .filter(Boolean)
        .join(", ");
      const res = await fetch(
        "/api/ai/quote",
        aiFetchInit({
          method: "POST",
          body: JSON.stringify({
            job,
            clientName,
            rates: selectedRates,
            tradeName: tradeLabels || undefined,
            locale,
            lengthM: Number(lengthM) || undefined,
            widthM: Number(widthM) || undefined,
            areaSqm: Number(areaSqmInput) || undefined,
          }),
        }),
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setResult(data.result);
      setUsedArea(Number(data.areaSqm) || previewArea);
      setQuoteStatusLocal("draft");
      setActiveQuoteId(null);
      pushHistory({
        kind: "quote",
        title: data.result.jobTitle || "Quote",
        payload: {
          ...data.result,
          areaSqm: data.areaSqm,
          tradeIds: selectedTradeIds,
        },
      });
    } catch {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }

  function persistQuote(status: QuoteStatus = quoteStatus) {
    if (!result || !totals) return;
    const now = new Date().toISOString();
    const id = activeQuoteId ?? crypto.randomUUID();
    const existing = savedQuotes.find((q) => q.id === id);
    const base: SavedQuote = {
      id,
      status,
      clientId: clientId || null,
      clientName,
      tradeIds: selectedTradeIds,
      areaSqm: usedArea,
      result,
      totals: { ex: totals.ex, tax: totals.gst, inc: totals.inc },
      taxRate: company.taxRate,
      currency: company.currency,
      versions: existing?.versions ?? [],
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    const withVersion =
      !existing || existing.status !== status || existing.result !== result
        ? setQuoteStatus(base, status, "Saved from quote editor")
        : base;
    const next = upsertQuote(savedQuotes, withVersion);
    setSavedQuotes(next);
    saveQuotes(next);
    setActiveQuoteId(id);
    setQuoteStatusLocal(status);
  }

  function loadSaved(q: SavedQuote) {
    setActiveQuoteId(q.id);
    setResult(q.result);
    setUsedArea(q.areaSqm);
    setClientId(q.clientId ?? "");
    setClientName(q.clientName);
    setQuoteStatusLocal(q.status);
    setSelectedIds(
      rates
        .filter((r) =>
          q.result.lineItems.some(
            (line) => line.code && line.code === r.code,
          ),
        )
        .map((r) => r.id),
    );
    if (q.tradeIds[0]) {
      const tr = trades.find((x) => x.id === q.tradeIds[0]);
      if (tr) {
        setGroupId(tr.groupId);
        setTradeId(tr.id);
      }
    }
  }

  function changeStatus(status: QuoteStatus) {
    if (!activeQuoteId) {
      persistQuote(status);
      return;
    }
    const current = savedQuotes.find((q) => q.id === activeQuoteId);
    if (!current) return;
    const nextQuote = setQuoteStatus(current, status);
    const next = upsertQuote(savedQuotes, nextQuote);
    setSavedQuotes(next);
    saveQuotes(next);
    setQuoteStatusLocal(status);
    setResult(nextQuote.result);
  }

  function exportAcceptedCsv() {
    const rows = savedQuotes.filter((q) => q.status === "accepted");
    const csv = quotesToAccountingCsv(rows, {
      businessName: company.businessName,
      abn: company.abn,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sparehand-accepted-quotes.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadPdf() {
    if (!result) return;
    const { buildQuotePdf } = await import("@/lib/quotes/pdf");
    const doc = buildQuotePdf({
      businessName: company.businessName,
      abn: company.abn || undefined,
      clientName,
      quote: result,
      areaSqm: usedArea,
      locale,
      taxRate: company.taxRate,
      currency: company.currency,
      currencyLocale: company.currencyLocale,
      brandColor: company.pdfBrandColor,
      status: quoteStatus,
      labels: {
        subtotalExTax: t.quotes.subtotalExTax,
        taxLabel,
        totalIncTax: t.quotes.totalIncTax,
      },
    });
    doc.save(`sparehand-quote-${quoteStatus}.pdf`);
  }

  async function copyDraft() {
    if (!result || !totals) return;
    const text = formatQuotePlainText({
      clientName,
      areaSqm: usedArea,
      quote: result,
      locale,
      totals,
      formatAud: money,
      labels: {
        subtotalExTax: t.quotes.subtotalExTax,
        taxLabel,
        totalIncTax: t.quotes.totalIncTax,
      },
    });
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const statusLabel = (s: QuoteStatus) => t.quotes.statuses[s];

  return (
    <Panel title={t.quotes.title} hint={t.quotes.hint} help={t.help.quotes}>
      <div className="mb-5 rounded-xl border border-[var(--warn)]/35 bg-[color-mix(in_oklab,var(--warn)_12%,transparent)] px-4 py-3 text-sm text-[var(--ink)]">
        <p className="font-semibold text-[var(--warn)]">
          {t.quotes.disclaimerTitle}
        </p>
        <p className="mt-1 leading-relaxed text-[var(--muted)]">
          {t.quotes.disclaimerBody}
        </p>
      </div>

      <div className="mb-5 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">{t.quotes.savedTitle}</h2>
          <div className="flex flex-wrap gap-2">
            <select
              className="sh-select rounded-md border border-[var(--line)] bg-[var(--panel)] py-1.5 pl-2 text-xs"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | QuoteStatus)
              }
            >
              <option value="all">{t.quotes.filterAll}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {statusLabel(s)}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-md border border-[var(--line)] px-2 py-1 text-xs"
              onClick={exportAcceptedCsv}
            >
              {t.quotes.exportAccepted}
            </button>
          </div>
        </div>
        {filteredQuotes.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--muted)]">{t.quotes.savedEmpty}</p>
        ) : (
          <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto text-sm">
            {filteredQuotes.map((q) => (
              <li key={q.id}>
                <button
                  type="button"
                  className={`w-full rounded-lg border px-3 py-2 text-left ${
                    activeQuoteId === q.id
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--line)] hover:bg-[var(--hover-fill)]"
                  }`}
                  onClick={() => loadSaved(q)}
                >
                  <span className="font-medium">{q.result.jobTitle}</span>
                  <span className="mt-0.5 block text-xs text-[var(--muted)]">
                    {q.clientName || "—"} · {statusLabel(q.status)} ·{" "}
                    {money(q.totals.inc)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <StepLabel>{t.common.stepInput}</StepLabel>
          <label className="block text-sm font-medium">
            {t.quotes.pickClient}
            <select
              className="sh-select mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] py-2.5 pl-3 text-sm font-normal"
              value={clientId}
              onChange={(e) => onClientPick(e.target.value)}
            >
              <option value="">{t.quotes.clientManual}</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                  {c.siteAddress ? ` — ${c.siteAddress}` : ""}
                </option>
              ))}
            </select>
          </label>
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            placeholder={t.quotes.client}
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
              setClientId("");
            }}
          />

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">{t.quotes.multiTradeHint}</p>
            <label className="mt-3 block text-sm font-semibold">
              {t.quotes.groupLabel}
              <select
                className="sh-select mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] py-2.5 pl-3 text-sm font-normal text-[var(--ink)]"
                value={groupId}
                onChange={(e) => {
                  const nextGroup = e.target.value;
                  setGroupId(nextGroup);
                  const nextTrade =
                    tradesInGroup(trades, nextGroup)[0]?.id ?? "";
                  setTradeId(nextTrade);
                }}
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {groupDisplayName(g, locale)}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold">
              {t.quotes.tradeLabel}
              <select
                className="sh-select mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] py-2.5 pl-3 text-sm font-normal text-[var(--ink)]"
                value={tradeId}
                onChange={(e) => setTradeId(e.target.value)}
              >
                {groupTrades.map((tr) => (
                  <option key={tr.id} value={tr.id}>
                    {tradeDisplayName(tr, locale)}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                className="rounded-md border border-[var(--line)] px-2 py-1"
                onClick={selectAllRates}
              >
                {t.quotes.selectAllRates}
              </button>
              <button
                type="button"
                className="rounded-md border border-[var(--line)] px-2 py-1"
                onClick={clearRateSelection}
              >
                {t.quotes.clearRates}
              </button>
              <span className="self-center text-[var(--muted)]">
                {selectedRates.length} {t.quotes.ratesSelected}
                {selectedTradeIds.length > 1
                  ? ` · ${selectedTradeIds.length} ${t.quotes.tradesCount}`
                  : ""}
              </span>
            </div>

            <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
              {tradeRates.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">
                  {t.quotes.noRatesForTrade}
                </p>
              ) : (
                tradeRates.map((rate) => (
                  <label
                    key={rate.id}
                    className="flex cursor-pointer items-start gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={selectedIds.includes(rate.id)}
                      onChange={() => toggleRate(rate.id)}
                    />
                    <span>
                      <span className="font-medium">{rate.label}</span>
                      <span className="mt-0.5 block text-xs text-[var(--muted)]">
                        {rate.code} · {money(rate.unitPriceExGst)} / {rate.unit}
                      </span>
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-sm font-semibold">{t.quotes.areaTitle}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{t.quotes.areaHint}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <input
                className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
                placeholder={t.quotes.lengthM}
                value={lengthM}
                onChange={(e) => setLengthM(e.target.value)}
              />
              <input
                className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
                placeholder={t.quotes.widthM}
                value={widthM}
                onChange={(e) => setWidthM(e.target.value)}
              />
            </div>
            <input
              className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
              placeholder={t.quotes.areaSqmPlaceholder}
              value={areaSqmInput}
              onChange={(e) => setAreaSqmInput(e.target.value)}
            />
            {previewArea > 0 ? (
              <p className="mt-2 text-xs text-[var(--muted)]">
                {t.quotes.calculatedArea}: {previewArea} m²
              </p>
            ) : null}
          </div>

          <TextArea
            placeholder={t.quotes.placeholder}
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <PrimaryButton type="button" disabled={loading} onClick={run}>
            {loading ? t.common.loading : t.quotes.run}
          </PrimaryButton>
          {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
        </div>

        <div className="space-y-3">
          <StepLabel>{t.common.stepResult}</StepLabel>
          {!result ? (
            <EmptyState />
          ) : (
            <ResultCard>
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-xs font-medium text-[var(--muted)]">
                  {t.quotes.status}
                  <select
                    className="sh-select ml-2 rounded-md border border-[var(--line)] bg-[var(--panel)] py-1 pl-2 text-sm text-[var(--ink)]"
                    value={quoteStatus}
                    onChange={(e) =>
                      changeStatus(e.target.value as QuoteStatus)
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {statusLabel(s)}
                      </option>
                    ))}
                  </select>
                </label>
                <PrimaryButton type="button" onClick={() => persistQuote()}>
                  {t.quotes.saveQuote}
                </PrimaryButton>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl">
                {result.jobTitle}
              </h3>
              {usedArea > 0 ? (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {t.quotes.calculatedArea}: {usedArea} m²
                </p>
              ) : null}

              {result.assumptions.length > 0 ? (
                <div className="mt-4">
                  <p className="text-sm font-semibold">
                    {t.quotes.assumptions}
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                    {result.assumptions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <ul className="mt-4 space-y-2 text-sm">
                {result.lineItems.map((line) => (
                  <li
                    key={`${line.description}-${line.unitPriceExGst}-${line.quantity}`}
                    className="flex justify-between gap-3 border-b border-[var(--line)] pb-2"
                  >
                    <span>
                      {line.description}
                      <span className="mt-0.5 block text-xs text-[var(--muted)]">
                        {line.quantity} {line.unit} ×{" "}
                        {money(line.unitPriceExGst)}
                      </span>
                    </span>
                    <span className="shrink-0 font-medium">
                      {money(
                        roundMoney(line.quantity * line.unitPriceExGst),
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {totals ? (
                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    {t.quotes.subtotalExTax}: {money(totals.ex)}
                  </p>
                  <p>
                    {taxLabel}: {money(totals.gst)}
                  </p>
                  <p className="font-semibold">
                    {t.quotes.totalIncTax}: {money(totals.inc)}
                  </p>
                </div>
              ) : null}

              <p className="mt-4 text-sm text-[var(--muted)]">
                {result.notesForClient}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[var(--warn)]">
                {disclaimerForLocale(locale)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <PrimaryButton type="button" onClick={downloadPdf}>
                  {t.quotes.exportPdf}
                </PrimaryButton>
                <button
                  type="button"
                  className="rounded-lg border border-[var(--line)] px-4 py-2.5 text-sm"
                  onClick={copyDraft}
                >
                  {copied ? t.common.copied : t.quotes.copyDraft}
                </button>
              </div>
            </ResultCard>
          )}
        </div>
      </div>
    </Panel>
  );
}
