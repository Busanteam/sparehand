import type { Locale } from "./types";

export type Dictionary = {
  brand: string;
  tagline: string;
  heroBody: string;
  ctaStart: string;
  ctaScope: string;
  nav: {
    dashboard: string;
    inbox: string;
    meetings: string;
    documents: string;
    quotes: string;
    rates: string;
    integrations: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    cards: {
      inbox: string;
      meetings: string;
      documents: string;
      quotes: string;
    };
  };
  inbox: {
    title: string;
    hint: string;
    placeholder: string;
    run: string;
    urgency: string;
    category: string;
    draftReply: string;
    actions: string;
  };
  meetings: {
    title: string;
    hint: string;
    placeholder: string;
    run: string;
    summary: string;
    decisions: string;
    actionItems: string;
  };
  documents: {
    title: string;
    hint: string;
    run: string;
    drop: string;
    vendor: string;
    total: string;
    gst: string;
    lines: string;
  };
  quotes: {
    title: string;
    hint: string;
    placeholder: string;
    run: string;
    client: string;
    exportPdf: string;
  };
  rates: {
    title: string;
    hint: string;
    add: string;
    importCsv: string;
    exportCsv: string;
    code: string;
    label: string;
    unit: string;
    unitPrice: string;
  };
  integrations: {
    title: string;
    hint: string;
    zapierTitle: string;
    zapierBody: string;
    deferredTitle: string;
    deferredBody: string;
  };
  common: {
    language: string;
    loading: string;
    copy: string;
    copied: string;
    save: string;
    saved: string;
    error: string;
    draftBadge: string;
    empty: string;
  };
};

const enAU: Dictionary = {
  brand: "SpareHand",
  tagline: "Do more office work with the people you already have.",
  heroBody:
    "AI drafts for inbox triage, meeting notes, receipt capture and GST-aware quotes — built for Australian SMEs watching labour costs.",
  ctaStart: "Open workspace",
  ctaScope: "See what’s in / out of scope",
  nav: {
    dashboard: "Dashboard",
    inbox: "Inbox triage",
    meetings: "Meeting notes",
    documents: "Docs & OCR",
    quotes: "Quotes",
    rates: "Rate card",
    integrations: "Integrations",
  },
  dashboard: {
    title: "Workspace",
    subtitle: "Pick a repetitive admin job. SpareHand drafts; you approve.",
    cards: {
      inbox: "Classify enquiries and draft replies",
      meetings: "Turn rough notes into actions",
      documents: "Extract receipts and paperwork",
      quotes: "Build GST drafts from your rates",
    },
  },
  inbox: {
    title: "Inbox triage",
    hint: "Paste a customer email or SMS. You get urgency, category, a draft reply, and next steps.",
    placeholder: "Paste the enquiry here…",
    run: "Triage with AI",
    urgency: "Urgency",
    category: "Category",
    draftReply: "Draft reply",
    actions: "Suggested actions",
  },
  meetings: {
    title: "Meeting notes",
    hint: "Paste rough notes or a transcript. Get a summary, decisions, and owners.",
    placeholder: "Paste meeting notes…",
    run: "Summarise",
    summary: "Summary",
    decisions: "Decisions",
    actionItems: "Action items",
  },
  documents: {
    title: "Documents & OCR",
    hint: "Upload a receipt or paperwork image. AI extracts totals, GST and line items for review.",
    run: "Extract",
    drop: "Drop an image here or choose a file",
    vendor: "Supplier",
    total: "Total",
    gst: "GST",
    lines: "Line items",
  },
  quotes: {
    title: "Quote drafts",
    hint: "Describe the job. We draft line items from your rate card with 10% GST.",
    placeholder: "e.g. Replace kitchen tap, supply and fit, north Brisbane…",
    run: "Draft quote",
    client: "Client name",
    exportPdf: "Download PDF draft",
  },
  rates: {
    title: "Rate card",
    hint: "Your labour and materials prices. Quotes never scrape live supplier sites — you own the numbers.",
    add: "Add line",
    importCsv: "Import CSV",
    exportCsv: "Export CSV",
    code: "Code",
    label: "Description",
    unit: "Unit",
    unitPrice: "Unit price (ex GST)",
  },
  integrations: {
    title: "Integrations",
    hint: "High-quality hooks we can ship now vs platforms that need a separate product effort.",
    zapierTitle: "Zapier / Make webhook",
    zapierBody:
      "POST JSON to /api/webhooks/inbound with header x-sparehand-secret. Creates an inbox item from email tools.",
    deferredTitle: "Deferred",
    deferredBody:
      "Desktop RPA, live Excel sync, Monday widgets and deep ClickUp sync stay out of MVP — see SCOPE.md.",
  },
  common: {
    language: "Language",
    loading: "Working…",
    copy: "Copy",
    copied: "Copied",
    save: "Save locally",
    saved: "Saved",
    error: "Something went wrong. Check your API key or try again.",
    draftBadge: "Draft — review before sending",
    empty: "No result yet",
  },
};

const ko: Dictionary = {
  brand: "SpareHand",
  tagline: "지금 있는 인력으로 사무 생산성을 끌어올리세요.",
  heroBody:
    "문의 분류, 회의록, 영수증 OCR, GST 견적 초안까지 — 인건비 부담이 큰 호주 SME를 위한 AI 사무 보조 툴입니다.",
  ctaStart: "워크스페이스 열기",
  ctaScope: "구현 범위 보기",
  nav: {
    dashboard: "대시보드",
    inbox: "문의 분류",
    meetings: "회의록",
    documents: "문서·OCR",
    quotes: "견적",
    rates: "단가표",
    integrations: "연동",
  },
  dashboard: {
    title: "워크스페이스",
    subtitle: "반복 사무를 고르세요. SpareHand가 초안을 만들고, 승인은 사람이 합니다.",
    cards: {
      inbox: "문의 분류와 답장 초안",
      meetings: "메모를 할 일로 정리",
      documents: "영수증·서류 추출",
      quotes: "단가표 기반 GST 견적",
    },
  },
  inbox: {
    title: "문의 분류",
    hint: "고객 이메일·문자를 붙여넣으면 긴급도, 유형, 답장 초안, 다음 액션을 만듭니다.",
    placeholder: "문의 내용을 붙여넣으세요…",
    run: "AI로 분류",
    urgency: "긴급도",
    category: "유형",
    draftReply: "답장 초안",
    actions: "추천 액션",
  },
  meetings: {
    title: "회의록",
    hint: "거친 메모나 전사본을 넣으면 요약, 결정사항, 담당자가 정리됩니다.",
    placeholder: "회의 메모를 붙여넣으세요…",
    run: "요약하기",
    summary: "요약",
    decisions: "결정사항",
    actionItems: "액션 아이템",
  },
  documents: {
    title: "문서·OCR",
    hint: "영수증·서류 이미지를 올리면 합계, GST, 품목을 추출합니다. 반드시 검토하세요.",
    run: "추출",
    drop: "이미지를 놓거나 파일을 선택하세요",
    vendor: "공급처",
    total: "합계",
    gst: "GST",
    lines: "품목",
  },
  quotes: {
    title: "견적 초안",
    hint: "작업을 설명하면 단가표 기준으로 항목과 10% GST 초안을 만듭니다.",
    placeholder: "예: 주방 수전 교체, 자재·시공 포함, 북부 브리즈번…",
    run: "견적 초안",
    client: "고객명",
    exportPdf: "PDF 초안 다운로드",
  },
  rates: {
    title: "단가표",
    hint: "인건비·자재 단가는 직접 관리합니다. 실시간 시세 크롤링은 하지 않습니다.",
    add: "항목 추가",
    importCsv: "CSV 가져오기",
    exportCsv: "CSV 내보내기",
    code: "코드",
    label: "설명",
    unit: "단위",
    unitPrice: "단가 (GST 별도)",
  },
  integrations: {
    title: "연동",
    hint: "지금 품질 있게 제공할 수 있는 훅과, 별도 제품이 필요한 영역을 구분해 두었습니다.",
    zapierTitle: "Zapier / Make 웹훅",
    zapierBody:
      "x-sparehand-secret 헤더와 함께 /api/webhooks/inbound 로 JSON을 POST하면 문의 항목이 생성됩니다.",
    deferredTitle: "보류",
    deferredBody:
      "데스크톱 RPA, 엑셀 실시간 동기화, Monday 위젯, ClickUp 깊은 연동은 MVP 밖입니다 — SCOPE.md 참고.",
  },
  common: {
    language: "언어",
    loading: "처리 중…",
    copy: "복사",
    copied: "복사됨",
    save: "로컬 저장",
    saved: "저장됨",
    error: "오류가 발생했습니다. API 키를 확인하거나 다시 시도하세요.",
    draftBadge: "초안 — 발송 전 반드시 검토",
    empty: "아직 결과 없음",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  "en-AU": enAU,
  ko,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries["en-AU"];
}
