"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/types";

export default function HomePage() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="relative overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-[family-name:var(--font-display)] text-2xl">{t.brand}</span>
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <select
            className="sh-select rounded-md border border-[var(--line)] bg-[var(--surface)]/80 py-1.5 pl-3 text-sm text-[var(--ink)]"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            aria-label={t.common.language}
          >
            <option value="en-AU">EN (AU)</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            AU SME · labour leverage
          </p>
          <h1 className="max-w-xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            {t.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">{t.heroBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              {t.ctaStart}
            </Link>
            <Link
              href="/whats-included"
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)]/80 px-5 py-3 text-sm font-semibold text-[var(--ink)]"
            >
              {t.ctaScope}
            </Link>
          </div>
        </div>

        <div
          className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)]/85 p-6 backdrop-blur"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <ol className="space-y-4 text-sm text-[var(--muted)]">
            {t.heroSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                  {index + 1}
                </span>
                <span>
                  <strong className="text-[var(--ink)]">{step.split(" — ")[0]}</strong>
                  {step.includes(" — ") ? ` — ${step.split(" — ").slice(1).join(" — ")}` : null}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">
            {t.heroNote}
          </p>
        </div>
      </main>
    </div>
  );
}
