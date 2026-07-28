"use client";

import Link from "next/link";
import { CheckCircle2, CircleSlash2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { HelpTip } from "@/components/help-tip";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/types";

export default function WhatsIncludedPage() {
  const { t, locale, setLocale } = useI18n();
  const s = t.scope;

  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-6">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
          {t.brand}
        </Link>
        <div className="flex items-center gap-2">
          <HelpTip
            content={{
              title: s.title,
              steps: [s.hireLead, s.includedLead, s.promiseBody],
              tips: [s.hireTitle],
            }}
          />
          <ThemeToggle compact />
          <select
            className="sh-select rounded-md border border-[var(--line)] bg-[var(--surface)] py-1.5 pl-3 text-sm text-[var(--ink)]"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            aria-label={t.common.language}
          >
            <option value="en-AU">EN</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        <p className="text-sm font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          {s.eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {s.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--muted)]">{s.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-contrast)]"
          >
            {s.openApp}
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold"
          >
            {s.backHome}
          </Link>
        </div>

        <section className="mt-12 border-t border-[var(--line)] pt-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">{s.hireTitle}</h2>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">{s.hireLead}</p>
          <ul className="mt-5 max-w-3xl space-y-2 text-sm text-[var(--ink)]">
            {s.hirePoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">{s.includedTitle}</h2>
          <p className="mt-2 text-[var(--muted)]">{s.includedLead}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.included.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
                style={{ boxShadow: "var(--shadow)" }}
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
