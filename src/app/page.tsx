"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/i18n/types";

export default function HomePage() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(15,106,79,0.12),transparent_40%),linear-gradient(200deg,rgba(20,32,26,0.06),transparent_45%)]" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-[family-name:var(--font-display)] text-2xl">{t.brand}</span>
        <select
          className="rounded-md border border-[var(--line)] bg-white/70 px-2 py-1 text-sm"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label={t.common.language}
        >
          <option value="en-AU">EN (AU)</option>
          <option value="ko">한국어</option>
        </select>
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
              className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
            >
              {t.ctaStart}
            </Link>
            <a
              href="/SCOPE.md"
              className="rounded-lg border border-[var(--line)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--ink)]"
            >
              {t.ctaScope}
            </a>
          </div>
        </div>

        <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6 shadow-[0_30px_80px_-40px_rgba(20,40,30,0.55)] backdrop-blur">
          <ol className="space-y-4 text-sm text-[var(--muted)]">
            <li>
              <strong className="text-[var(--ink)]">1. Inbox</strong> — classify and draft replies
            </li>
            <li>
              <strong className="text-[var(--ink)]">2. Meetings</strong> — summarise and assign actions
            </li>
            <li>
              <strong className="text-[var(--ink)]">3. Docs / OCR</strong> — capture receipts with GST fields
            </li>
            <li>
              <strong className="text-[var(--ink)]">4. Quotes</strong> — rate-card drafts, not live price scrapes
            </li>
          </ol>
          <p className="mt-6 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
            Desktop RPA, Monday widgets and live Excel sync are intentionally deferred — see SCOPE.md.
          </p>
        </div>
      </main>
    </div>
  );
}
