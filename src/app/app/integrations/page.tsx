"use client";

import { useI18n } from "@/components/i18n-provider";
import { Panel, ResultCard } from "@/components/ui";

export default function IntegrationsPage() {
  const { t } = useI18n();

  return (
    <Panel
      title={t.integrations.title}
      hint={t.integrations.hint}
      help={t.help.integrations}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <ResultCard>
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            {t.integrations.zapierTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {t.integrations.zapierBody}
          </p>
          <div className="mt-4 rounded-xl bg-[var(--panel)] p-4 text-sm text-[var(--ink)]/90">
            <p className="font-medium">{t.integrations.itBoxTitle}</p>
            <p className="mt-2 text-[var(--muted)]">
              {t.integrations.webhookUrl}{" "}
              <code className="text-[var(--accent)]">/api/webhooks/inbound</code>
            </p>
            <p className="mt-1 text-[var(--muted)]">
              {t.integrations.webhookHeader} <code>x-sparehand-secret</code>
            </p>
          </div>
        </ResultCard>
        <ResultCard>
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            {t.integrations.deferredTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {t.integrations.deferredBody}
          </p>
        </ResultCard>
      </div>
    </Panel>
  );
}
