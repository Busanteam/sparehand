"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { PrimaryButton } from "@/components/ui";
import type { Locale } from "@/lib/i18n/types";
import { demoUsers } from "@/lib/storage/workspace-auth";

export default function LoginPage() {
  const { t, locale, setLocale } = useI18n();
  const { session, ready, signIn } = useAuth();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && session) router.replace("/");
  }, [ready, session, router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn(pin)) {
      setError(t.auth.badPin);
      return;
    }
    router.replace("/");
  }

  if (!ready || session) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-[var(--muted)]">
        {t.common.loading}
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)]">
      <header className="mx-auto flex w-full max-w-md items-center justify-end gap-2 px-6 pt-6">
        <ThemeToggle compact />
        <select
          className="sh-select rounded-md border border-[var(--line)] bg-[var(--surface)] py-1.5 pl-3 text-sm"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label={t.common.language}
        >
          <option value="en-AU">EN</option>
          <option value="ko">한국어</option>
        </select>
      </header>
      <div className="flex flex-1 items-center justify-center px-6 pb-10">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm"
        >
          <p className="text-sm font-semibold tracking-wide text-[var(--accent)]">
            {t.brand}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
            {t.auth.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{t.auth.hint}</p>
          <label className="mt-5 block text-sm font-medium">
            {t.auth.pin}
            <input
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              placeholder="1111"
            />
          </label>
          {error ? (
            <p className="mt-2 text-sm text-[var(--warn)]">{error}</p>
          ) : null}
          <PrimaryButton type="submit" className="mt-4 w-full">
            {t.auth.signIn}
          </PrimaryButton>
          <ul className="mt-5 space-y-1 text-xs text-[var(--muted)]">
            <li className="font-medium text-[var(--ink)]">{t.auth.demoUsers}</li>
            {demoUsers.map((u) => (
              <li key={u.id}>
                {u.name} · {u.role} · PIN {u.pin}
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}
