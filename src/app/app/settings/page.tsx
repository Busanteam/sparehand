"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { Panel, PrimaryButton } from "@/components/ui";
import {
  clearAiConfig,
  defaultAiConfig,
  loadAiConfig,
  saveAiConfig,
  type AiConfig,
} from "@/lib/storage/ai-config";
import {
  defaultCompanySettings,
  loadCompanySettings,
  saveCompanySettings,
  type CompanySettings,
} from "@/lib/storage/company";
import { canManageCompany } from "@/lib/storage/workspace-auth";

export default function SettingsPage() {
  const { t } = useI18n();
  const { role } = useAuth();
  const [config, setConfig] = useState<AiConfig>(defaultAiConfig);
  const [company, setCompany] = useState<CompanySettings>(defaultCompanySettings);
  const [saved, setSaved] = useState(false);
  const [companySaved, setCompanySaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [taxPctInput, setTaxPctInput] = useState("10");
  const canCompany = role ? canManageCompany(role) : false;

  useEffect(() => {
    setConfig(loadAiConfig());
    const loaded = loadCompanySettings();
    setCompany(loaded);
    setTaxPctInput(String(Math.round(loaded.taxRate * 1000) / 10));
  }, []);

  function persist() {
    saveAiConfig(config);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  function persistCompany() {
    const ratePct = Number(taxPctInput);
    const taxRate = Number.isFinite(ratePct) ? ratePct / 100 : 0.1;
    const next = { ...company, taxRate };
    setCompany(next);
    saveCompanySettings(next);
    setCompanySaved(true);
    window.setTimeout(() => setCompanySaved(false), 1600);
  }

  function removeKey() {
    clearAiConfig();
    setConfig(defaultAiConfig);
    setSaved(false);
  }

  return (
    <Panel title={t.settings.title} hint={t.settings.hint} help={t.help.settings}>
      <div className="mx-auto max-w-2xl space-y-5">
        {canCompany ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl">
              {t.company.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t.company.hint}
            </p>
            <label className="mt-5 block text-sm font-medium">
              {t.company.businessName}
              <input
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
                value={company.businessName}
                onChange={(e) =>
                  setCompany((p) => ({ ...p, businessName: e.target.value }))
                }
              />
            </label>
            <label className="mt-4 block text-sm font-medium">
              {t.company.abn}
              <input
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
                value={company.abn}
                onChange={(e) =>
                  setCompany((p) => ({ ...p, abn: e.target.value }))
                }
              />
            </label>
            <label className="mt-4 block text-sm font-medium">
              {t.company.taxRate}
              <input
                type="number"
                step="0.1"
                min="0"
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
                value={taxPctInput}
                onChange={(e) => setTaxPctInput(e.target.value)}
              />
              <span className="mt-1 block text-xs text-[var(--muted)]">
                {t.company.taxRateHint}
              </span>
            </label>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                {t.company.currency}
                <input
                  className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
                  value={company.currency}
                  onChange={(e) =>
                    setCompany((p) => ({
                      ...p,
                      currency: e.target.value.toUpperCase(),
                    }))
                  }
                />
              </label>
              <label className="block text-sm font-medium">
                {t.company.currencyLocale}
                <input
                  className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
                  value={company.currencyLocale}
                  onChange={(e) =>
                    setCompany((p) => ({
                      ...p,
                      currencyLocale: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <label className="mt-4 block text-sm font-medium">
              {t.company.pdfBrandColor}
              <input
                type="color"
                className="mt-1.5 h-11 w-full cursor-pointer rounded-xl border border-[var(--line)] bg-[var(--panel)] px-2"
                value={company.pdfBrandColor}
                onChange={(e) =>
                  setCompany((p) => ({
                    ...p,
                    pdfBrandColor: e.target.value,
                  }))
                }
              />
            </label>
            <PrimaryButton type="button" className="mt-5" onClick={persistCompany}>
              {companySaved ? t.common.saved : t.company.save}
            </PrimaryButton>
          </div>
        ) : null}

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            {t.settings.brainTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {t.settings.brainBody}
          </p>

          <label className="mt-5 block text-sm font-medium">
            {t.settings.apiKey}
            <div className="mt-1.5 flex gap-2">
              <input
                type={showKey ? "text" : "password"}
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                placeholder="sk-..."
                value={config.apiKey}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, apiKey: e.target.value }))
                }
              />
              <button
                type="button"
                className="shrink-0 rounded-xl border border-[var(--line)] px-3 text-sm"
                onClick={() => setShowKey((v) => !v)}
              >
                {showKey ? t.settings.hideKey : t.settings.showKey}
              </button>
            </div>
          </label>

          <label className="mt-4 block text-sm font-medium">
            {t.settings.model}
            <input
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              value={config.model}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, model: e.target.value }))
              }
              placeholder="gpt-4.1-mini"
            />
          </label>

          <label className="mt-4 block text-sm font-medium">
            {t.settings.baseUrl}
            <input
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              value={config.baseUrl}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, baseUrl: e.target.value }))
              }
              placeholder={t.settings.baseUrlPlaceholder}
            />
          </label>

          <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
            {t.settings.privacyNote}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton type="button" onClick={persist}>
              {saved ? t.common.saved : t.settings.saveKey}
            </PrimaryButton>
            <button
              type="button"
              onClick={removeKey}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm"
            >
              {t.settings.clearKey}
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
