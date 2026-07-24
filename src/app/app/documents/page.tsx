"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import {
  EmptyState,
  Panel,
  PrimaryButton,
  ResultCard,
  StepLabel,
} from "@/components/ui";
import type { DocumentResult } from "@/lib/ai/schemas";
import { formatAud } from "@/lib/money/gst";
import { pushHistory } from "@/lib/storage/local";

export default function DocumentsPage() {
  const { t, locale } = useI18n();
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DocumentResult | null>(null);
  const [error, setError] = useState("");

  function onFile(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: preview, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setResult(data.result);
      pushHistory({
        kind: "document",
        title: data.result.vendor || "Document extract",
        payload: data.result,
      });
    } catch {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Panel title={t.documents.title} hint={t.documents.hint} help={t.help.documents}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <StepLabel>{t.common.stepInput}</StepLabel>
          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--line)] bg-white px-4 text-center text-sm text-[var(--muted)] transition hover:border-[var(--accent)]/40">
            <span>{t.documents.drop}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Upload preview"
              className="max-h-56 rounded-xl border border-[var(--line)] object-contain"
            />
          ) : null}
          <PrimaryButton disabled={!preview || loading} onClick={run}>
            {loading ? t.common.loading : t.documents.run}
          </PrimaryButton>
          {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
        </div>
        <div>
          <StepLabel>{t.common.stepResult}</StepLabel>
          <ResultCard>
            {!result ? (
              <EmptyState />
            ) : (
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">{t.documents.vendor}: </span>
                  {result.vendor || "—"}
                </p>
                <p>
                  <span className="font-semibold">{t.documents.total}: </span>
                  {result.totalIncGst != null ? formatAud(result.totalIncGst) : "—"}
                </p>
                <p>
                  <span className="font-semibold">{t.documents.gst}: </span>
                  {result.gst != null ? formatAud(result.gst) : "—"}
                </p>
                <div>
                  <p className="font-semibold">{t.documents.lines}</p>
                  <ul className="mt-1 list-disc pl-5 text-[var(--muted)]">
                    {result.lineItems.map((line) => (
                      <li key={`${line.description}-${line.amountExGst}`}>
                        {line.description}
                        {line.amountExGst != null ? ` — ${formatAud(line.amountExGst)}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                {result.notes ? <p className="text-xs text-[var(--muted)]">{result.notes}</p> : null}
              </div>
            )}
          </ResultCard>
        </div>
      </div>
    </Panel>
  );
}
