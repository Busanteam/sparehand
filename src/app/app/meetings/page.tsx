"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import {
  EmptyState,
  Panel,
  PrimaryButton,
  ResultCard,
  StepLabel,
  TextArea,
} from "@/components/ui";
import type { MeetingResult } from "@/lib/ai/schemas";
import { aiFetchInit } from "@/lib/storage/ai-config";
import { pushHistory } from "@/lib/storage/local";

export default function MeetingsPage() {
  const { t, locale } = useI18n();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeetingResult | null>(null);
  const [error, setError] = useState("");

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "/api/ai/meeting",
        aiFetchInit({
          method: "POST",
          body: JSON.stringify({ text, locale }),
        }),
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "failed");
      setResult(data.result);
      pushHistory({
        kind: "meeting",
        title: data.result.title || "Meeting",
        payload: data.result,
      });
    } catch {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Panel title={t.meetings.title} hint={t.meetings.hint} help={t.help.meetings}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <StepLabel>{t.common.stepInput}</StepLabel>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.meetings.placeholder}
          />
          <PrimaryButton disabled={!text.trim() || loading} onClick={run}>
            {loading ? t.common.loading : t.meetings.run}
          </PrimaryButton>
          {error ? <p className="text-sm text-[var(--warn)]">{error}</p> : null}
        </div>
        <div>
          <StepLabel>{t.common.stepResult}</StepLabel>
          <ResultCard>
            {!result ? (
              <EmptyState />
            ) : (
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg">{result.title}</p>
                  <p className="mt-2 text-[var(--muted)]">{result.summary}</p>
                </div>
                <div>
                  <p className="font-semibold">{t.meetings.decisions}</p>
                  <ul className="mt-1 list-disc pl-5 text-[var(--muted)]">
                    {result.decisions.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">{t.meetings.actionItems}</p>
                  <ul className="mt-1 space-y-2 text-[var(--muted)]">
                    {result.actionItems.map((item) => (
                      <li key={item.task} className="rounded-lg bg-[var(--panel)] px-3 py-2">
                        <p>{item.task}</p>
                        <p className="text-xs">
                          {[item.owner, item.due].filter(Boolean).join(" · ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </ResultCard>
        </div>
      </div>
    </Panel>
  );
}
