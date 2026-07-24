"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton, ResultCard, TextArea } from "@/components/ui";
import type { InboxResult } from "@/lib/ai/schemas";
import { pushHistory } from "@/lib/storage/local";

export default function InboxPage() {
  const { t, locale } = useI18n();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InboxResult | null>(null);
  const [mode, setMode] = useState<string>("");
  const [error, setError] = useState("");

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setResult(data.result);
      setMode(data.mode);
      pushHistory({
        kind: "inbox",
        title: data.result.summary?.slice(0, 60) || "Inbox triage",
        payload: data.result,
      });
    } catch {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Panel title={t.inbox.title} hint={t.inbox.hint}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.inbox.placeholder}
          />
          <PrimaryButton disabled={!text.trim() || loading} onClick={run}>
            {loading ? t.common.loading : t.inbox.run}
          </PrimaryButton>
          {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
        </div>
        <ResultCard>
          {!result ? (
            <p className="text-sm text-[var(--muted)]">{t.common.empty}</p>
          ) : (
            <div className="space-y-4 text-sm">
              {mode ? (
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Mode: {mode}</p>
              ) : null}
              <div>
                <p className="font-semibold">{t.inbox.urgency}</p>
                <p className="capitalize">{result.urgency}</p>
              </div>
              <div>
                <p className="font-semibold">{t.inbox.category}</p>
                <p>{result.category}</p>
              </div>
              <div>
                <p className="font-semibold">{t.inbox.draftReply}</p>
                <p className="mt-1 whitespace-pre-wrap text-[var(--muted)]">{result.draftReply}</p>
              </div>
              <div>
                <p className="font-semibold">{t.inbox.actions}</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-[var(--muted)]">
                  {result.actions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </ResultCard>
      </div>
    </Panel>
  );
}
