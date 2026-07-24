"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CircleHelp, X } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export type HelpContent = {
  title: string;
  steps: string[];
  tips?: string[];
};

export function HelpTip({ content }: { content: HelpContent }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--accent)] shadow-sm transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]"
        aria-label={t.help.openLabel}
        title={t.help.openLabel}
      >
        <CircleHelp size={18} strokeWidth={2.25} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(20,32,26,0.45)] backdrop-blur-[2px]"
            aria-label={t.help.close}
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(20,40,30,0.55)] sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  {t.help.howToUse}
                </p>
                <h2 id={titleId} className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                  {content.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[var(--line)] p-2 text-[var(--muted)] hover:bg-[var(--panel)]"
                aria-label={t.help.close}
              >
                <X size={16} />
              </button>
            </div>

            <ol className="space-y-3">
              {content.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-[var(--muted)]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-[var(--ink)]/90">{step}</span>
                </li>
              ))}
            </ol>

            {content.tips && content.tips.length > 0 ? (
              <div className="mt-5 rounded-xl bg-[var(--panel)] p-4">
                <p className="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase">
                  {t.help.tipsTitle}
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-[var(--muted)]">
                  {content.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white"
            >
              {t.help.gotIt}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
