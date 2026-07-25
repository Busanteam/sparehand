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
import type { QuoteResult } from "@/lib/ai/schemas";
import {
  formatAud,
  gstComponentFromEx,
  roundMoney,
} from "@/lib/money/gst";
import {
  calcAreaSqm,
  disclaimerForLocale,
  formatQuotePlainText,
} from "@/lib/quotes/area";
import { buildQuotePdf } from "@/lib/quotes/pdf";
import { aiFetchInit } from "@/lib/storage/ai-config";
import { loadRates, pushHistory } from "@/lib/storage/local";

export default function QuotesPage() {
  const { t, locale } = useI18n();
  const [job, setJob] = useState("");
  const [clientName, setClientName] = useState("");
  const [lengthM, setLengthM] = useState("");
  const [widthM, setWidthM] = useState("");
  const [areaSqmInput, setAreaSqmInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [usedArea, setUsedArea] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [rates, setRates] = useState(loadRates());

  useEffect(() => {
    setRates(loadRates());
  }, []);

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
    const gst = gstComponentFromEx(ex);
    return { ex: roundMoney(ex), gst, inc: roundMoney(ex + gst) };
  }, [result]);

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "/api/ai/quote",
        aiFetchInit({
          method: "POST",
          body: JSON.stringify({
            job,
            clientName,
            rates,
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
      pushHistory({
        kind: "quote",
        title: data.result.jobTitle || "Quote",
        payload: { ...data.result, areaSqm: data.areaSqm },
      });
    } catch {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }

  function downloadPdf() {
    if (!result) return;
    const doc = buildQuotePdf({
      businessName: "SpareHand Demo Business",
      clientName,
      quote: result,
      areaSqm: usedArea,
      locale,
    });
    doc.save(`sparehand-quote-draft.pdf`);
  }

  async function copyDraft() {
    if (!result || !totals) return;
    const text = formatQuotePlainText({
      clientName,
      areaSqm: usedArea,
      quote: result,
      locale,
      totals,
      formatAud,
    });
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Panel title={t.quotes.title} hint={t.quotes.hint} help={t.help.quotes}>
      <div className="mb-5 rounded-xl border border-[var(--warn)]/35 bg-[color-mix(in_oklab,var(--warn)_12%,transparent)] px-4 py-3 text-sm text-[var(--ink)]">
        <p className="font-semibold text-[var(--warn)]">{t.quotes.disclaimerTitle}</p>
        <p className="mt-1 leading-relaxed text-[var(--muted)]">{t.quotes.disclaimerBody}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <StepLabel>{t.common.stepInput}</StepLabel>
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            placeholder={t.quotes.client}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-sm font-semibold">{t.quotes.areaTitle}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{t.quotes.areaHint}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="text-xs text-[var(--muted)]">
                {t.quotes.lengthM}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)]"
                  value={lengthM}
                  onChange={(e) => setLengthM(e.target.value)}
                />
              </label>
              <label className="text-xs text-[var(--muted)]">
                {t.quotes.widthM}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)]"
                  value={widthM}
                  onChange={(e) => setWidthM(e.target.value)}
                />
              </label>
            </div>
            <label className="mt-2 block text-xs text-[var(--muted)]">
              {t.quotes.areaSqm}
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)]"
                value={areaSqmInput}
                onChange={(e) => setAreaSqmInput(e.target.value)}
                placeholder={t.quotes.areaSqmPlaceholder}
              />
            </label>
            <p className="mt-2 text-sm font-medium text-[var(--accent)]">
              {t.quotes.calculatedArea}: {previewArea > 0 ? `${previewArea} m²` : "—"}
            </p>
          </div>

          <TextArea
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder={t.quotes.placeholder}
          />
          <div className="flex flex-wrap gap-2">
            <PrimaryButton disabled={!job.trim() || loading} onClick={run}>
              {loading ? t.common.loading : t.quotes.run}
            </PrimaryButton>
            <button
              type="button"
              disabled={!result}
              onClick={copyDraft}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm disabled:opacity-50"
            >
              {copied ? t.common.copied : t.quotes.copyDraft}
            </button>
            <button
              type="button"
              disabled={!result}
              onClick={downloadPdf}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm disabled:opacity-50"
            >
              {t.quotes.exportPdf}
            </button>
          </div>
          {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
        </div>
        <div>
          <StepLabel>{t.common.stepResult}</StepLabel>
          <ResultCard>
            {!result || !totals ? (
              <EmptyState />
            ) : (
              <div className="space-y-3 text-sm">
                <p className="font-[family-name:var(--font-display)] text-lg">
                  {result.jobTitle}
                </p>
                {usedArea > 0 ? (
                  <p className="text-[var(--accent)]">
                    {t.quotes.calculatedArea}: {usedArea} m²
                  </p>
                ) : null}
                <ul className="space-y-2 text-[var(--muted)]">
                  {result.lineItems.map((line) => (
                    <li
                      key={`${line.description}-${line.unitPriceExGst}-${line.quantity}`}
                      className="flex justify-between gap-3"
                    >
                      <span>
                        {line.description} × {line.quantity} {line.unit}
                      </span>
                      <span>
                        {formatAud(roundMoney(line.quantity * line.unitPriceExGst))}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[var(--line)] pt-3">
                  <p>Subtotal (ex GST): {formatAud(totals.ex)}</p>
                  <p>GST (10%): {formatAud(totals.gst)}</p>
                  <p className="font-semibold">
                    Total (inc GST): {formatAud(totals.inc)}
                  </p>
                </div>
                <p className="text-[var(--muted)]">{result.notesForClient}</p>
                <p className="rounded-lg bg-[var(--panel)] px-3 py-2 text-xs leading-relaxed text-[var(--warn)]">
                  {disclaimerForLocale(locale)}
                </p>
              </div>
            )}
          </ResultCard>
        </div>
      </div>
    </Panel>
  );
}
