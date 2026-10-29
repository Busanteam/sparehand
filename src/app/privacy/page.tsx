"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/types";

export default function PrivacyPage() {
  const { t, locale, setLocale } = useI18n();
  const ko = locale.startsWith("ko");

  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
          {t.brand}
        </Link>
        <div className="flex items-center gap-2">
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
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16 prose-sparehand">
        <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
          {ko ? "개인정보 안내" : "Privacy notice"}
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          {ko
            ? "SpareHand 공개 샘플(포트폴리오)에서 수집·처리하는 정보에 대한 짧은 안내입니다."
            : "Short notice for information handled by this SpareHand portfolio sample."}
        </p>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-[var(--ink)]">
          <h2 className="text-lg font-semibold">
            {ko ? "문의 양식" : "Contact form"}
          </h2>
          <p className="text-[var(--muted)]">
            {ko
              ? "이름/회사명, 이메일, 문의 주제와 내용을 Formspree를 통해 전달하며, 회신 목적(busanteam_business@naver.com)으로만 사용합니다. 마케팅 자동 발송에 쓰지 않습니다."
              : "Name/company, email, topic and message are sent via Formspree for reply only (busanteam_business@naver.com). We do not use them for automated marketing."}
          </p>

          <h2 className="mt-6 text-lg font-semibold">
            {ko ? "브라우저에 남는 데이터" : "Browser-local data"}
          </h2>
          <p className="text-[var(--muted)]">
            {ko
              ? "데모 PIN 세션, 단가·견적·고객, AI 키(BYOK) 등은 이 기기 브라우저(localStorage)에만 저장됩니다. 저희 서버 DB에 로그인 계정을 만들지 않습니다."
              : "Demo PIN session, rates, quotes, clients and your BYOK AI key stay in this browser’s localStorage. We do not create server accounts for the public demo."}
          </p>

          <h2 className="mt-6 text-lg font-semibold">
            {ko ? "AI 초안" : "AI drafts"}
          </h2>
          <p className="text-[var(--muted)]">
            {ko
              ? "AI 키를 넣으면 초안 생성 요청이 선택한 AI 제공사로 전달됩니다. 결과는 초안이며 사람이 검토한 뒤에만 사용하세요."
              : "If you add an AI key, draft requests go to your chosen provider. Outputs are drafts — review before sending to customers."}
          </p>

          <h2 className="mt-6 text-lg font-semibold">
            {ko ? "문의" : "Contact"}
          </h2>
          <p className="text-[var(--muted)]">
            {ko ? "개인정보 관련 문의:" : "Privacy questions:"}{" "}
            <a
              className="text-[var(--accent)] underline"
              href="mailto:busanteam_business@naver.com"
            >
              busanteam_business@naver.com
            </a>
          </p>
        </section>

        <p className="mt-10">
          <Link href="/" className="text-sm text-[var(--accent)]">
            ← {ko ? "홈으로" : "Back home"}
          </Link>
        </p>
      </main>
    </div>
  );
}
