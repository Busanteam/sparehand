"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton, ResultCard, TextArea } from "@/components/ui";
import type { QuoteResult } from "@/lib/ai/schemas";
import {
  formatAud,
  gstComponentFromEx,
  roundMoney,
} from "@/lib/money/gst";
import { buildQuotePdf } from "@/lib/quotes/pdf";
import { loadRates, pushHistory } from "@/lib/storage/local";

export default function QuotesPage() {
  const { t, locale } = useI18n();
  const [job, setJob] = useState("");
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState("");
  const [rates, setRates] = useState(loadRates());

  useEffect(() => {
    setRates(loadRates());
  }, []);

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
      const res = await fetch("/api/ai/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, clientName, rates, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setResult(data.result);
      pushHistory({
        kind: "quote",
        title: data.result.jobTitle || "Quote",
        payload: data.result,
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
    });
    doc.save(`sparehand-quote-draft.pdf`);
  }

  return (
    <Panel title={t.quotes.title} hint={t.quotes.hint}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            placeholder={t.quotes.client}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
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
              onClick={downloadPdf}
              className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm disabled:opacity-50"
            >
              {t.quotes.exportPdf}
            </button>
          </div>
          {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
        </div>
        <ResultCard>
          {!result || !totals ? (
            <p className="text-sm text-[var(--muted)]">{t.common.empty}</p>
          ) : (
            <div className="space-y-3 text-sm">
              <p className="font-[family-name:var(--font-display)] text-lg">{result.jobTitle}</p>
              <ul className="space-y-2 text-[var(--muted)]">
                {result.lineItems.map((line) => (
                  <li key={`${line.description}-${line.unitPriceExGst}`} className="flex justify-between gap-3">
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
                <p className="font-semibold">Total (inc GST): {formatAud(totals.inc)}</p>
              </div>
              <p className="text-[var(--muted)]">{result.notesForClient}</p>
            </div>
          )}
        </ResultCard>
      </div>
    </Panel>
  );
}
