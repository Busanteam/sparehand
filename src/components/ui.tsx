"use client";

import { useI18n } from "@/components/i18n-provider";
import { HelpTip, type HelpContent } from "@/components/help-tip";

export function DraftBadge() {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
      {t.common.draftBadge}
    </span>
  );
}

export function Panel({
  title,
  hint,
  help,
  children,
}: {
  title: string;
  hint?: string;
  help?: HelpContent;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)]">
              {title}
            </h1>
            {help ? <HelpTip content={help} /> : null}
          </div>
          {hint ? <p className="mt-2 max-w-2xl text-[var(--muted)]">{hint}</p> : null}
        </div>
        <DraftBadge />
      </header>
      {children}
    </section>
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-contrast)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-40 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none ring-[var(--accent)]/30 placeholder:text-[var(--muted)] focus:ring-2 ${props.className ?? ""}`}
    />
  );
}

export function ResultCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
      style={{ boxShadow: "var(--shadow)" }}
    >
      {children}
    </div>
  );
}

export function EmptyState() {
  const { t } = useI18n();
  return (
    <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--panel)] px-4 py-8 text-center">
      <p className="text-sm font-medium text-[var(--ink)]">{t.common.empty}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{t.common.emptyHint}</p>
    </div>
  );
}

export function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-[var(--accent)] uppercase">
      {children}
    </p>
  );
}
