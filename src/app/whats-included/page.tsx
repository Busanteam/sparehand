"use client";

import Link from "next/link";
import { CheckCircle2, CircleSlash2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { HelpTip } from "@/components/help-tip";
import type { Locale } from "@/lib/i18n/types";

export default function WhatsIncludedPage() {
  const { t, locale, setLocale } = useI18n();
  const s = t.scope;

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-6">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
          {t.brand}
        </Link>
        <div className="flex items-center gap-2">
          <HelpTip
            content={{
              title: s.title,
              steps: [
                s.includedLead,
                s.notIncludedLead,
                s.promiseBody,
              ],
              tips: [s.promiseTitle],
            }}
          />
          <select
            className="rounded-md border border-[var(--line)] bg-white px-2 py-1 text-sm"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            aria-label={t.common.language}
          >
            <option value="en-AU">EN (AU)</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        <p className="text-sm font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          For business owners
        </p>
        <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {s.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--muted)]">{s.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
          >
            {s.openApp}
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold"
          >
            {s.backHome}
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">{s.includedTitle}</h2>
          <p className="mt-2 text-[var(--muted)]">{s.includedLead}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.included.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_10px_40px_-28px_rgba(20,40,30,0.4)]"
              >
                <div className="mb-3 flex items-center gap-2 text-[var(--accent)]">
                  <CheckCircle2 size={18} />
                  <h3 className="font-semibold text-[var(--ink)]">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">{s.notIncludedTitle}</h2>
          <p className="mt-2 text-[var(--muted)]">{s.notIncludedLead}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.notIncluded.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-[var(--warn)]">
                  <CircleSlash2 size={18} />
                  <h3 className="font-semibold text-[var(--ink)]">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--accent)]">
            {s.promiseTitle}
          </h2>
          <p className="mt-2 text-[var(--ink)]/90">{s.promiseBody}</p>
        </section>
      </main>
    </div>
  );
}
