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
  Users,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { AiKeyBanner } from "@/components/ai-key-banner";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/types";
import { canAccessPath } from "@/lib/storage/workspace-auth";

const links = [
  { href: "/app", key: "dashboard", icon: LayoutDashboard },
  { href: "/app/clients", key: "clients", icon: Users },
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
  const { session, role, signOut } = useAuth();

  const visibleLinks = links.filter(
    (l) => !role || canAccessPath(role, l.href),
  );

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
          {session ? (
            <div className="mt-3 hidden text-xs text-[var(--muted)] lg:block">
              <p>
                {t.auth.signedInAs}{" "}
                <span className="text-[var(--ink)]">{session.name}</span>
              </p>
              <p className="mt-0.5 capitalize">{session.role}</p>
              <button
                type="button"
                className="mt-2 text-[var(--accent)]"
                onClick={() => {
                  signOut();
                  window.location.href = "/login";
                }}
              >
                {t.auth.signOut}
              </button>
            </div>
          ) : null}
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
          {visibleLinks.map(({ href, key, icon: Icon }) => {
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
