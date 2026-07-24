import type { Locale } from "./types";

export type HelpBlock = {
  title: string;
  steps: string[];
  tips?: string[];
};

export type Dictionary = {
  brand: string;
  tagline: string;
  heroBody: string;
  ctaStart: string;
  ctaScope: string;
  heroSteps: string[];
  heroNote: string;
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
  help: {
    openLabel: string;
    howToUse: string;
    tipsTitle: string;
    close: string;
    gotIt: string;
    dashboard: HelpBlock;
    inbox: HelpBlock;
    meetings: HelpBlock;
    documents: HelpBlock;
    quotes: HelpBlock;
    rates: HelpBlock;
    integrations: HelpBlock;
  };
  scope: {
    title: string;
    subtitle: string;
    backHome: string;
    openApp: string;
    includedTitle: string;
    includedLead: string;
    notIncludedTitle: string;
    notIncludedLead: string;
    included: { title: string; body: string }[];
    notIncluded: { title: string; body: string }[];
    promiseTitle: string;
    promiseBody: string;
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
    emptyHint: string;
    stepInput: string;
    stepResult: string;
  };
};

const enAU: Dictionary = {
  brand: "SpareHand",
  tagline: "Do more office work with the people you already have.",
  heroBody:
    "AI drafts for inbox triage, meeting notes, receipt capture and GST-aware quotes — built for Australian SMEs watching labour costs.",
  ctaStart: "Open workspace",
  ctaScope: "What this tool covers",
  heroSteps: [
    "Inbox — sort enquiries and draft replies",
    "Meetings — turn rough notes into clear actions",
    "Docs — pull totals and GST from receipts",
    "Quotes — build drafts from your own price list",
  ],
  heroNote: "Built for busy owners: SpareHand drafts, you approve before anything goes to a customer.",
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
    hint: "Simple connections that save admin time — without forcing a big IT project.",
    zapierTitle: "Connect email tools (Zapier / Make)",
    zapierBody:
      "If you already use Zapier or Make, you can send new emails into SpareHand automatically. Ask your IT person (or us) to point a webhook at this app with a shared secret.",
    deferredTitle: "Not required to get value today",
    deferredBody:
      "Heavy desktop robots, live Excel syncing, and deep Monday/ClickUp rebuilds are not part of this simple starter. Most owners start with Inbox, Meetings, Docs and Quotes.",
  },
  help: {
    openLabel: "How to use this page",
    howToUse: "How to use",
    tipsTitle: "Helpful tips",
    close: "Close",
    gotIt: "Got it",
    dashboard: {
      title: "Your workspace",
      steps: [
        "Choose the admin job you want help with today.",
        "Open that tool and follow the short steps on the page.",
        "Review every draft before you send it to a customer.",
      ],
      tips: [
        "Start with Inbox if enquiries pile up.",
        "Set your Rate card once so Quotes stay accurate.",
      ],
    },
    inbox: {
      title: "Inbox triage",
      steps: [
        "Copy a customer email or text message.",
        "Paste it into the box on the left.",
        "Press Triage with AI and wait a few seconds.",
        "Edit the draft reply, then send it from your normal email or SMS app.",
      ],
      tips: [
        "Include the suburb or job type if you have it — results are clearer.",
        "Urgent words like “leak” or “ASAP” help the priority ranking.",
      ],
    },
    meetings: {
      title: "Meeting notes",
      steps: [
        "Paste messy notes or a transcript after a meeting.",
        "Press Summarise.",
        "Check the summary, decisions and action list.",
        "Assign owners in your team chat or job board.",
      ],
      tips: ["Even short bullet points work — perfect notes are not required."],
    },
    documents: {
      title: "Receipts & paperwork",
      steps: [
        "Take a clear photo of a receipt or invoice.",
        "Upload the image on this page.",
        "Press Extract and review supplier, totals and GST.",
        "Fix any wrong numbers before bookkeeping.",
      ],
      tips: [
        "Good lighting and a flat page improve accuracy.",
        "This is a draft extract — always double-check GST.",
      ],
    },
    quotes: {
      title: "Quote drafts",
      steps: [
        "Add or check your prices in Rate card first.",
        "Enter the client name and describe the job in plain English.",
        "Press Draft quote and review each line.",
        "Download the PDF draft only after you are happy with the numbers.",
      ],
      tips: [
        "Prices come from your rate card — not live hardware store scraping.",
        "GST is calculated at 10% on top of ex-GST amounts.",
      ],
    },
    rates: {
      title: "Your price list",
      steps: [
        "Add labour and materials lines you use often.",
        "Enter unit prices excluding GST.",
        "Press Save locally so Quotes can use them.",
        "Optional: Import or Export CSV for spreadsheet backups.",
      ],
      tips: ["Keep codes short (e.g. LAB-HR) so quote drafts stay tidy."],
    },
    integrations: {
      title: "Connections",
      steps: [
        "Use the built-in tools first — no connection required.",
        "If you want email automation later, use Zapier/Make with the webhook details shown here.",
        "Keep the shared secret private — treat it like a password.",
      ],
      tips: [
        "Most small teams get value without any integration on day one.",
      ],
    },
  },
  scope: {
    title: "What SpareHand covers",
    subtitle:
      "Plain-English guide for business owners. No tech jargon — just what helps your team today, and what we intentionally leave out.",
    backHome: "Back to home",
    openApp: "Try the workspace",
    includedTitle: "Included now",
    includedLead: "These are ready to use and aimed at everyday admin bottlenecks.",
    notIncludedTitle: "Not included (on purpose)",
    notIncludedLead:
      "We keep the product simple so it stays reliable. These belong in a bigger IT project later if you need them.",
    included: [
      {
        title: "Sort customer messages",
        body: "Paste an enquiry and get urgency, category, a reply draft and next steps.",
      },
      {
        title: "Clean up meeting notes",
        body: "Turn rough notes into a short summary, decisions and action items.",
      },
      {
        title: "Read receipts & paperwork",
        body: "Upload a photo and pull out supplier, totals, GST and line items for review.",
      },
      {
        title: "Draft quotes with GST",
        body: "Describe a job and build a draft from your own price list, including 10% GST.",
      },
      {
        title: "Keep your own price list",
        body: "Manage rates in-app and back them up with a simple spreadsheet file (CSV).",
      },
      {
        title: "Optional email hook-up",
        body: "Connect tools like Zapier later so new emails can flow into SpareHand.",
      },
    ],
    notIncluded: [
      {
        title: "Desktop screen robots",
        body: "Software that clicks around Windows apps for you needs a separate specialist setup.",
      },
      {
        title: "Live Excel always-on sync",
        body: "We support simple file import/export instead of fragile real-time spreadsheet links.",
      },
      {
        title: "Rebuilding Monday or ClickUp",
        body: "Deep rebuilds inside other platforms are a custom project — not this starter tool.",
      },
      {
        title: "Auto-buying live supplier prices",
        body: "Your quote uses your rates, so margins stay under your control.",
      },
    ],
    promiseTitle: "Our simple rule",
    promiseBody:
      "Every AI result is a draft. A person always reviews before anything is sent to a customer or used for tax paperwork.",
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
    emptyHint: "Your draft will appear here after you run the tool.",
    stepInput: "1. Your input",
    stepResult: "2. Review the draft",
  },
};

const ko: Dictionary = {
  brand: "SpareHand",
  tagline: "지금 있는 인력으로 사무 생산성을 끌어올리세요.",
  heroBody:
    "문의 분류, 회의록, 영수증 OCR, GST 견적 초안까지 — 인건비 부담이 큰 호주 SME를 위한 AI 사무 보조 툴입니다.",
  ctaStart: "워크스페이스 열기",
  ctaScope: "이 툴이 도와주는 것",
  heroSteps: [
    "문의 — 고객 메시지 분류와 답장 초안",
    "회의 — 메모를 할 일로 정리",
    "문서 — 영수증에서 합계·GST 추출",
    "견적 — 내 단가표로 초안 작성",
  ],
  heroNote: "바쁜 사장님을 위해 설계했습니다. SpareHand가 초안을 만들고, 고객에게 보내기 전 확인은 사람이 합니다.",
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
    hint: "큰 IT 프로젝트 없이도 사무 시간을 줄일 수 있는 간단한 연결만 안내합니다.",
    zapierTitle: "이메일 도구 연결 (Zapier / Make)",
    zapierBody:
      "이미 Zapier나 Make를 쓰신다면, 새 이메일을 SpareHand로 자동 전달할 수 있습니다. IT 담당자(또는 저희)에게 웹훅 주소와 비밀키 설정을 요청하세요.",
    deferredTitle: "지금은 없어도 됩니다",
    deferredBody:
      "데스크톱 자동화 로봇, 엑셀 실시간 동기화, Monday/ClickUp 대규모 개편은 이 시작용 툴 범위가 아닙니다. 대부분 사장님은 문의·회의·문서·견적부터 시작하시면 됩니다.",
  },
  help: {
    openLabel: "이 페이지 사용법",
    howToUse: "사용 방법",
    tipsTitle: "참고 팁",
    close: "닫기",
    gotIt: "알겠어요",
    dashboard: {
      title: "워크스페이스",
      steps: [
        "오늘 도움이 필요한 사무 업무를 고릅니다.",
        "해당 도구를 열고 페이지의 짧은 안내를 따릅니다.",
        "고객에게 보내기 전에 초안을 꼭 검토합니다.",
      ],
      tips: [
        "문의가 밀렸다면 Inbox부터 시작하세요.",
        "견적을 쓰려면 단가표를 먼저 한 번 저장해 두세요.",
      ],
    },
    inbox: {
      title: "문의 분류",
      steps: [
        "고객 이메일이나 문자를 복사합니다.",
        "왼쪽 입력칸에 붙여넣습니다.",
        "‘AI로 분류’를 누르고 잠시 기다립니다.",
        "답장 초안을 수정한 뒤, 평소 쓰던 메일/문자 앱으로 보냅니다.",
      ],
      tips: [
        "지역이나 작업 종류가 있으면 결과가 더 정확해집니다.",
        "“누수”, “긴급” 같은 표현이 있으면 우선순위 판단에 도움이 됩니다.",
      ],
    },
    meetings: {
      title: "회의록",
      steps: [
        "회의 후 거친 메모나 전사본을 붙여넣습니다.",
        "‘요약하기’를 누릅니다.",
        "요약·결정사항·할 일 목록을 확인합니다.",
        "팀 채팅이나 작업 보드에 담당자를 배정합니다.",
      ],
      tips: ["완벽한 문장일 필요 없습니다. 짧은 불릿도 충분합니다."],
    },
    documents: {
      title: "영수증·서류",
      steps: [
        "영수증/청구서를 선명하게 촬영합니다.",
        "이 페이지에 이미지를 올립니다.",
        "‘추출’을 누르고 공급처·합계·GST를 확인합니다.",
        "장부 반영 전에 틀린 숫자를 고칩니다.",
      ],
      tips: [
        "밝은 조명과 평평한 촬영이 정확도를 높입니다.",
        "추출 결과는 초안입니다. GST는 반드시 재확인하세요.",
      ],
    },
    quotes: {
      title: "견적 초안",
      steps: [
        "먼저 단가표에서 가격을 확인/저장합니다.",
        "고객명과 작업 내용을 평범한 말로 적습니다.",
        "‘견적 초안’을 누르고 항목을 검토합니다.",
        "숫자 확인 후에만 PDF 초안을 다운로드합니다.",
      ],
      tips: [
        "가격은 내 단가표 기준입니다. 매장 실시간 시세를 긁어오지 않습니다.",
        "GST는 세전 금액의 10%로 계산됩니다.",
      ],
    },
    rates: {
      title: "단가표",
      steps: [
        "자주 쓰는 인건비·자재 항목을 추가합니다.",
        "GST 별도 단가를 입력합니다.",
        "‘로컬 저장’을 눌러 견적에서 쓰이게 합니다.",
        "필요하면 CSV로 가져오기/내보내기 합니다.",
      ],
      tips: ["코드는 짧게 (예: LAB-HR) 두면 견적 초안이 깔끔합니다."],
    },
    integrations: {
      title: "연동",
      steps: [
        "기본 도구부터 쓰세요 — 연동 없이도 바로 도움이 됩니다.",
        "나중에 이메일 자동화가 필요하면 이 페이지의 Zapier/Make 안내를 사용하세요.",
        "공유 비밀키는 비밀번호처럼 안전하게 보관하세요.",
      ],
      tips: ["대부분의 소규모 팀은 첫날 연동 없이도 충분합니다."],
    },
  },
  scope: {
    title: "SpareHand가 도와주는 것",
    subtitle:
      "개발 지식이 없어도 읽히는 안내입니다. 지금 바로 도움이 되는 것과, 일부러 빼 둔 것을 쉽게 정리했습니다.",
    backHome: "홈으로",
    openApp: "워크스페이스 써보기",
    includedTitle: "지금 포함",
    includedLead: "매일 반복되는 사무 병목을 줄이기 위해 바로 쓸 수 있습니다.",
    notIncludedTitle: "포함하지 않음 (의도적)",
    notIncludedLead:
      "제품을 단순하고 안정적으로 유지하기 위해 아래는 제외했습니다. 필요하면 나중에 별도 IT 프로젝트로 확장하면 됩니다.",
    included: [
      {
        title: "고객 메시지 정리",
        body: "문의를 붙여넣으면 긴급도, 유형, 답장 초안, 다음 할 일을 받습니다.",
      },
      {
        title: "회의 메모 정리",
        body: "거친 메모를 요약·결정사항·액션 아이템으로 바꿉니다.",
      },
      {
        title: "영수증·서류 읽기",
        body: "사진을 올리면 공급처, 합계, GST, 품목을 추출해 검토할 수 있습니다.",
      },
      {
        title: "GST 견적 초안",
        body: "작업 설명과 내 단가표로 10% GST 포함 견적 초안을 만듭니다.",
      },
      {
        title: "내 단가표 관리",
        body: "앱에서 단가를 관리하고, 필요하면 스프레드시트 파일(CSV)로 백업합니다.",
      },
      {
        title: "선택적 이메일 연결",
        body: "나중에 Zapier 등으로 새 메일을 SpareHand로 흘려보낼 수 있습니다.",
      },
    ],
    notIncluded: [
      {
        title: "데스크톱 화면 로봇",
        body: "윈도우 프로그램을 대신 클릭하는 자동화는 별도 전문 설정이 필요합니다.",
      },
      {
        title: "엑셀 실시간 자동 동기화",
        body: "깨지기 쉬운 실시간 연결 대신, 간단한 파일 가져오기/내보내기를 지원합니다.",
      },
      {
        title: "Monday·ClickUp 전체 재구축",
        body: "다른 플랫폼을 깊게 개조하는 작업은 맞춤 프로젝트입니다.",
      },
      {
        title: "매장 시세 자동 수집",
        body: "견적은 사장님 단가 기준이라 마진을 직접 통제할 수 있습니다.",
      },
    ],
    promiseTitle: "우리의 간단한 원칙",
    promiseBody:
      "AI 결과는 모두 초안입니다. 고객에게 보내거나 세무 서류로 쓰기 전에 사람이 반드시 확인합니다.",
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
    emptyHint: "도구를 실행하면 초안이 여기에 나타납니다.",
    stepInput: "1. 입력",
    stepResult: "2. 초안 검토",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  "en-AU": enAU,
  ko,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries["en-AU"];
}
