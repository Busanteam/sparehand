"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Inbox,
  LayoutDashboard,
  NotebookPen,
  Plug,
  Receipt,
  Tags,
} from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/i18n/types";

const links = [
  { href: "/app", key: "dashboard", icon: LayoutDashboard },
  { href: "/app/inbox", key: "inbox", icon: Inbox },
  { href: "/app/meetings", key: "meetings", icon: NotebookPen },
  { href: "/app/documents", key: "documents", icon: FileText },
  { href: "/app/quotes", key: "quotes", icon: Receipt },
  { href: "/app/rates", key: "rates", icon: Tags },
  { href: "/app/integrations", key: "integrations", icon: Plug },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-[var(--line)] bg-[var(--panel)] lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-5 py-5 lg:block">
          <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            {t.brand}
          </Link>
          <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span className="sr-only">{t.common.language}</span>
            <select
              className="rounded-md border border-[var(--line)] bg-transparent px-2 py-1"
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
            >
              <option value="en-AU">EN (AU)</option>
              <option value="ko">한국어</option>
            </select>
          </label>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
          {links.map(({ href, key, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition ${
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-black/5 hover:text-[var(--ink)]"
                }`}
              >
                <Icon size={16} />
                {t.nav[key]}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="px-5 py-6 sm:px-8 sm:py-8">{children}</main>
    </div>
  );
}
