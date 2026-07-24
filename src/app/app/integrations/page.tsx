"use client";

import { useI18n } from "@/components/i18n-provider";
import { Panel, ResultCard } from "@/components/ui";

export default function IntegrationsPage() {
  const { t } = useI18n();

  return (
    <Panel title={t.integrations.title} hint={t.integrations.hint}>
      <div className="grid gap-4 lg:grid-cols-2">
        <ResultCard>
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            {t.integrations.zapierTitle}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{t.integrations.zapierBody}</p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-[var(--ink)] p-4 text-xs text-emerald-100">
{`POST /api/webhooks/inbound
Header: x-sparehand-secret: <SPAREHAND_WEBHOOK_SECRET>
{
  "subject": "Urgent leak in kitchen",
  "from": "client@example.com",
  "body": "Water under the sink since this morning...",
  "source": "zapier-gmail"
}`}
          </pre>
        </ResultCard>
        <ResultCard>
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            {t.integrations.deferredTitle}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{t.integrations.deferredBody}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>Desktop RPA script packs</li>
            <li>Live Excel ↔ database sync</li>
            <li>Monday.com marketplace widgets</li>
            <li>Deep ClickUp bi-directional sync</li>
          </ul>
        </ResultCard>
      </div>
    </Panel>
  );
}
