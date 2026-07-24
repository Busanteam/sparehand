"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { useTheme } from "@/components/theme-provider";
import type { Theme } from "@/lib/theme";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const { theme, setTheme, resolved } = useTheme();

  if (compact) {
    const next: Theme = resolved === "dark" ? "light" : "dark";
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition hover:bg-[var(--hover-fill)]"
        aria-label={resolved === "dark" ? t.common.themeLight : t.common.themeDark}
        title={resolved === "dark" ? t.common.themeLight : t.common.themeDark}
      >
        {resolved === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    );
  }

  return (
    <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
      <span className="sr-only">{t.common.theme}</span>
      <select
        className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2 py-1 text-[var(--ink)]"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        aria-label={t.common.theme}
      >
        <option value="system">{t.common.themeSystem}</option>
        <option value="light">{t.common.themeLight}</option>
        <option value="dark">{t.common.themeDark}</option>
      </select>
    </label>
  );
}
