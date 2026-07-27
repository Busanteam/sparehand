"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  Inbox,
  KeyRound,
  LayoutDashboard,
  NotebookPen,
  Plug,
  Receipt,
  Tags,
} from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { AiKeyBanner } from "@/components/ai-key-banner";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/types";

const links = [
  { href: "/app", key: "dashboard", icon: LayoutDashboard },
  { href: "/app/inbox", key: "inbox", icon: Inbox },
  { href: "/app/meetings", key: "meetings", icon: NotebookPen },
  { href: "/app/documents", key: "documents", icon: FileText },
  { href: "/app/quotes", key: "quotes", icon: Receipt },
  { href: "/app/trades", key: "trades", icon: Briefcase },
  { href: "/app/rates", key: "rates", icon: Tags },
  { href: "/app/integrations", key: "integrations", icon: Plug },
  { href: "/app/settings", key: "settings", icon: KeyRound },
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
          <div className="flex items-center gap-2 lg:mt-4">
            <ThemeToggle compact />
            <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <span className="sr-only">{t.common.language}</span>
              <select
                className="sh-select rounded-md border border-[var(--line)] bg-[var(--surface)] py-1.5 pl-3 text-[var(--ink)]"
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
              >
                <option value="en-AU">EN</option>
                <option value="ko">한국어</option>
              </select>
            </label>
          </div>
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
                    : "text-[var(--muted)] hover:bg-[var(--hover-fill)] hover:text-[var(--ink)]"
                }`}
              >
                <Icon size={16} />
                {t.nav[key]}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="px-5 py-6 sm:px-8 sm:py-8">
        {pathname !== "/app/settings" ? <AiKeyBanner /> : null}
        {children}
      </main>
    </div>
  );
}
