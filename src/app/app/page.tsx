"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { Panel } from "@/components/ui";

const cards = [
  { href: "/app/inbox", key: "inbox" as const },
  { href: "/app/meetings", key: "meetings" as const },
  { href: "/app/documents", key: "documents" as const },
  { href: "/app/quotes", key: "quotes" as const },
];

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <Panel title={t.dashboard.title} hint={t.dashboard.subtitle} help={t.help.dashboard}>
      <div className="mb-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--ink)]/90">
        {t.heroNote}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)]/40"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl">
              {t.nav[card.key]}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{t.dashboard.cards[card.key]}</p>
          </Link>
        ))}
      </div>
    </Panel>
  );
}
