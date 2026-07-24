"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { hasCustomerAiKey } from "@/lib/storage/ai-config";

export function AiKeyBanner() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    setHasKey(hasCustomerAiKey());
    setReady(true);
  }, []);

  if (!ready || hasKey) return null;

  return (
    <div className="mb-5 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--ink)]">
      <p className="font-medium">{t.settings.bannerTitle}</p>
      <p className="mt-1 text-[var(--muted)]">{t.settings.bannerBody}</p>
      <Link
        href="/app/settings"
        className="mt-2 inline-flex font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
      >
        {t.settings.bannerCta}
      </Link>
    </div>
  );
}
