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
    trades: string;
    rates: string;
    integrations: string;
    settings: string;
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
    copyDraft: string;
    areaTitle: string;
    areaHint: string;
    lengthM: string;
    widthM: string;
    areaSqm: string;
    areaSqmPlaceholder: string;
    calculatedArea: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    tradeLabel: string;
    tradeHint: string;
    groupLabel: string;
    groupHint: string;
    selectAllRates: string;
    clearRates: string;
    ratesSelected: string;
    noRatesForTrade: string;
    needRates: string;
    subtotalExTax: string;
    taxLabel: string;
    totalIncTax: string;
  };
  trades: {
    title: string;
    hint: string;
    add: string;
    addTitle: string;
    nameEn: string;
    nameKo: string;
    group: string;
    preview: string;
    remove: string;
    deleteConfirm: string;
    resetDefaults: string;
    resetConfirm: string;
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
    trade: string;
    filterTrade: string;
    allTrades: string;
    remove: string;
    resetDefaults: string;
    resetConfirm: string;
    manageTradesHint: string;
  };
  integrations: {
    title: string;
    hint: string;
    zapierTitle: string;
    zapierBody: string;
    deferredTitle: string;
    deferredBody: string;
  };
  settings: {
    title: string;
    hint: string;
    brainTitle: string;
    brainBody: string;
    apiKey: string;
    model: string;
    baseUrl: string;
    baseUrlPlaceholder: string;
    privacyNote: string;
    saveKey: string;
    clearKey: string;
    showKey: string;
    hideKey: string;
    bannerTitle: string;
    bannerBody: string;
    bannerCta: string;
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
    trades: HelpBlock;
    rates: HelpBlock;
    integrations: HelpBlock;
    settings: HelpBlock;
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
    hireTitle: string;
    hireLead: string;
    hirePoints: string[];
  };
  contact: {
    title: string;
    desc: string;
    directMail: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    topicLabel: string;
    topicPlaceholder: string;
    topicOtherLabel: string;
    topicOtherPlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    topics: {
      starter: string;
      standard: string;
      complex: string;
      hire: string;
      collab: string;
      other: string;
    };
  };
  common: {
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
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
    "A working sample of an internal office system: inbox triage, meeting notes, receipt capture and tax-aware quotes — the kind of tool a solo full-stack + AI developer can build for your company.",
  ctaStart: "Try the sample workspace",
  ctaScope: "What this sample covers",
  heroSteps: [
    "Inbox — sort enquiries and draft replies",
    "Meetings — turn rough notes into clear actions",
    "Docs — pull totals and tax from receipts",
    "Quotes — build drafts from your own price list",
  ],
  heroNote:
    "No sign-up: this public demo stores sample data in your browser. Hire me to turn it into a private internal system with a proper database for your team.",
  nav: {
    dashboard: "Dashboard",
    inbox: "Inbox triage",
    meetings: "Meeting notes",
    documents: "Docs & OCR",
    quotes: "Quotes",
    trades: "Trades",
    rates: "Rate card",
    integrations: "Integrations",
    settings: "AI key",
  },
  dashboard: {
    title: "Workspace",
    subtitle: "Pick a repetitive admin job. SpareHand drafts; you approve.",
    cards: {
      inbox: "Classify enquiries and draft replies",
      meetings: "Turn rough notes into actions",
      documents: "Extract receipts and paperwork",
      quotes: "Build quote drafts from your rates",
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
    hint: "Upload a receipt or paperwork image. AI extracts totals, tax and line items for review.",
    run: "Extract",
    drop: "Drop an image here or choose a file",
    vendor: "Supplier",
    total: "Total",
    gst: "Tax",
    lines: "Line items",
  },
  quotes: {
    title: "Quote drafts",
    hint: "Pick a category and specialty, tick the rate lines you need, set area if priced per m², then draft.",
    placeholder:
      "e.g. Repaint living room walls and ceiling for a 2-bedroom apartment…",
    run: "Draft quote",
    client: "Client name",
    exportPdf: "Download PDF draft",
    copyDraft: "Copy draft text",
    areaTitle: "Work area size",
    areaHint:
      "For interiors, enter length × width (metres) or total m². Items priced per m² use this area automatically.",
    lengthM: "Length (m)",
    widthM: "Width (m)",
    areaSqm: "Or total area (m²)",
    areaSqmPlaceholder: "Optional if length × width is filled",
    calculatedArea: "Area used",
    disclaimerTitle: "Draft only — final cost may change",
    disclaimerBody:
      "This estimate is a working draft for discussion. After site measure, material choices, access or variations, the real price can differ. Copy/PDF includes the same notice.",
    tradeLabel: "Trade / specialty",
    tradeHint: "Pick a category, then the specialty. Only that specialty’s rates are shown.",
    groupLabel: "Category",
    groupHint: "Related trades are grouped (e.g. Interior finishes).",
    selectAllRates: "Select all",
    clearRates: "Clear",
    ratesSelected: "selected",
    noRatesForTrade: "No rates for this trade yet — add some on the Rate card page.",
    needRates: "Select at least one rate line for this trade.",
    subtotalExTax: "Subtotal (ex tax)",
    taxLabel: "Tax (10%)",
    totalIncTax: "Total (inc tax)",
  },
  trades: {
    title: "Trades",
    hint: "Trades sit under categories. Add specialties your company quotes for.",
    add: "Add trade",
    addTitle: "New trade",
    nameEn: "Name (English)",
    nameKo: "Name (Korean, optional)",
    group: "Category",
    preview: "Shows as",
    remove: "Remove",
    deleteConfirm: "Remove this trade? Its rates will move to another trade.",
    resetDefaults: "Restore starter trades",
    resetConfirm: "Replace your trade list with the starter set?",
  },
  rates: {
    title: "Rate card",
    hint: "Rates are grouped by category → specialty. Filter, edit, or add lines.",
    add: "Add line",
    importCsv: "Import CSV",
    exportCsv: "Export CSV",
    code: "Code",
    label: "Description",
    unit: "Unit",
    unitPrice: "Unit price (ex tax)",
    trade: "Trade",
    filterTrade: "Filter",
    allTrades: "All trades",
    remove: "Remove",
    resetDefaults: "Restore starter rates",
    resetConfirm: "Replace your rate card with the multi-trade starter set?",
    manageTradesHint: "Need a new profession?",
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
  settings: {
    title: "Your AI key",
    hint: "SpareHand is the workspace. Your company brings the AI brain — so you keep control of cost and provider.",
    brainTitle: "Bring your own AI (BYOK)",
    brainBody:
      "Paste the API key from the AI provider your business already uses (OpenAI or an OpenAI-compatible endpoint). We do not charge AI usage per company — your key pays for your own usage.",
    apiKey: "API key",
    model: "Model name",
    baseUrl: "API base URL (optional)",
    baseUrlPlaceholder: "Leave blank for OpenAI, or paste OpenRouter/Azure-compatible URL",
    privacyNote:
      "Your key is stored only in this browser and sent with each AI request to generate drafts. It is not saved in our database.",
    saveKey: "Save in this browser",
    clearKey: "Remove key",
    showKey: "Show",
    hideKey: "Hide",
    bannerTitle: "Add your AI key to unlock live drafts",
    bannerBody:
      "Without a key, SpareHand still shows the workflow using sample drafts. Add your company key under AI key to use your real model.",
    bannerCta: "Open AI key settings",
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
        "Press Extract and review supplier, totals and tax.",
        "Fix any wrong numbers before bookkeeping.",
      ],
      tips: [
        "Good lighting and a flat page improve accuracy.",
        "This is a draft extract — always double-check tax figures.",
      ],
    },
    quotes: {
      title: "Quote drafts",
      steps: [
        "Choose a category (e.g. Interior finishes), then the specialty.",
        "Tick the rate lines you want on this quote.",
        "Set area if any lines are priced per m², then describe the job.",
        "Draft, review, then Copy or PDF (disclaimer included).",
      ],
      tips: [
        "Related trades are grouped — add more specialties under Trades.",
        "Only selected rates are sent to AI, so quotes stay focused.",
      ],
    },
    trades: {
      title: "Trades",
      steps: [
        "Review categories and specialties in the starter list.",
        "Add any specialty your company quotes for, under the right category.",
        "Save, then attach rate lines on Rate card.",
      ],
      tips: [
        "Korean name is optional — used when the app language is Korean.",
      ],
    },
    rates: {
      title: "Your price list",
      steps: [
        "Filter by trade to focus the list.",
        "Add labour and materials lines; set unit to m² for area work.",
        "Save locally so Quotes can use them.",
        "Optional: Import or Export CSV for spreadsheet backups.",
      ],
      tips: ["Keep codes short (e.g. PT-WALL) so quote drafts stay tidy."],
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
    settings: {
      title: "Your AI key",
      steps: [
        "Open your AI provider account (for example OpenAI) and create an API key.",
        "Paste the key here and choose the model your team uses.",
        "Optional: set a compatible base URL if you use OpenRouter or similar.",
        "Save, then try Inbox or Quotes — drafts will use your key.",
      ],
      tips: [
        "Each company pays its own AI bill — SpareHand is the shared workspace body.",
        "Clear the key on shared computers when you finish.",
      ],
    },
  },
  scope: {
    title: "What SpareHand covers",
    subtitle:
      "This public page is a short working sample. Hire me to build a private internal system for your company — including database design and setup.",
    backHome: "Back to home",
    openApp: "Try the sample",
    includedTitle: "Included in this sample",
    includedLead: "These flows already work in the demo and show the shape of a real internal tool.",
    notIncludedTitle: "Not in this public sample",
    notIncludedLead:
      "The live demo keeps data in the browser on purpose. A hired build can add the heavier pieces below.",
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
        body: "Upload a photo and pull out supplier, totals, tax and line items for review.",
      },
      {
        title: "Draft quotes with tax",
        body: "Describe a job and build a draft from your own price list, including demo tax at 10%.",
      },
      {
        title: "Keep your own price list",
        body: "Manage rates in-app and back them up with a simple spreadsheet file (CSV).",
      },
      {
        title: "Optional email hook-up",
        body: "Connect tools like Zapier later so new emails can flow into SpareHand.",
      },
      {
        title: "Use your own AI key",
        body: "Each business connects its own OpenAI (or compatible) key, so AI cost stays with the company that uses it.",
      },
    ],
    notIncluded: [
      {
        title: "Shared company database",
        body: "Not in the public demo — I can design and host Postgres / Supabase (or your preferred DB) for your team.",
      },
      {
        title: "Staff login & roles",
        body: "Sign-in, permissions and audit history belong in a private internal deployment.",
      },
      {
        title: "Desktop screen robots",
        body: "Software that clicks around Windows apps for you needs a separate specialist setup.",
      },
      {
        title: "Deep rebuilds of Monday / ClickUp",
        body: "Heavy platform rebuilds are a custom project on top of this sample.",
      },
    ],
    promiseTitle: "Our simple rule",
    promiseBody:
      "Every AI result is a draft. A person always reviews before anything is sent to a customer or used for tax paperwork.",
    hireTitle: "Internal systems & databases",
    hireLead:
      "SpareHand here is a portfolio prototype: no account required. If you hire me, I build a private internal system for your company and can design, size and set up the database to match how you work.",
    hirePoints: [
      "Private company workspace (not a public multi-tenant SaaS unless you ask for that)",
      "Database design: tables, relationships, backups and sensible growth room",
      "Staff access, roles and secure storage instead of browser-only sample data",
      "Extend the modules you see here — quotes, rates, inbox, docs — to your real process",
    ],
  },
  contact: {
    title: "Get in touch",
    desc: "Saw SpareHand and want a private internal system, a quote, or to discuss hiring? Pick a topic, then add a short brief — I’ll reply by email.",
    directMail: "Or email directly:",
    name: "Name or company",
    namePlaceholder: "Your name or company",
    email: "Email",
    emailPlaceholder: "you@company.com",
    topicLabel: "Inquiry type",
    topicPlaceholder: "Select a topic…",
    topicOtherLabel: "Describe your topic",
    topicOtherPlaceholder: "What is this about?",
    detailsLabel: "Project brief",
    detailsPlaceholder:
      "Company / trade, team size, must-have features, existing data, budget range, and preferred timing…",
    send: "Send message",
    sending: "Sending…",
    success: "Thanks — your message was sent. I’ll get back to you soon.",
    error: "Couldn’t send the form. Please email",
    topics: {
      starter: "Starter — small internal tool + DB",
      standard: "Standard — multi-user roles & quote/jobs",
      complex: "Complex — multi-site, integrations, reporting",
      hire: "Hiring / employment inquiry",
      collab: "Collaboration or consulting",
      other: "Other",
    },
  },
  common: {
    language: "Language",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
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
    "사내 사무 시스템의 동작 샘플입니다. 문의 분류, 회의록, 영수증 OCR, 세금 반영 견적까지 — 풀스택·AI 개발자를 고용하면 귀사 업무에 맞춰 이런 시스템을 구축할 수 있습니다.",
  ctaStart: "샘플 워크스페이스 열기",
  ctaScope: "이 샘플이 보여주는 것",
  heroSteps: [
    "문의 — 고객 메시지 분류와 답장 초안",
    "회의 — 메모를 할 일로 정리",
    "문서 — 영수증에서 합계·세금 추출",
    "견적 — 내 단가표로 초안 작성",
  ],
  heroNote:
    "회원가입 없이 바로 체험할 수 있습니다(샘플 데이터는 브라우저에 저장). 고용하시면 팀용 사내 시스템과 정식 DB 설계·구축까지 진행합니다.",
  nav: {
    dashboard: "대시보드",
    inbox: "문의 분류",
    meetings: "회의록",
    documents: "문서·OCR",
    quotes: "견적",
    trades: "직군",
    rates: "단가표",
    integrations: "연동",
    settings: "AI 키",
  },
  dashboard: {
    title: "워크스페이스",
    subtitle: "반복 사무를 고르세요. SpareHand가 초안을 만들고, 승인은 사람이 합니다.",
    cards: {
      inbox: "문의 분류와 답장 초안",
      meetings: "메모를 할 일로 정리",
      documents: "영수증·서류 추출",
      quotes: "단가표 기반 견적 초안",
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
    hint: "영수증·서류 이미지를 올리면 합계, 세금, 품목을 추출합니다. 반드시 검토하세요.",
    run: "추출",
    drop: "이미지를 놓거나 파일을 선택하세요",
    vendor: "공급처",
    total: "합계",
    gst: "세금",
    lines: "품목",
  },
  quotes: {
    title: "견적 초안",
    hint: "카테고리와 세부 직종을 고르고, 넣을 단가 항목을 선택한 뒤, 필요하면 면적을 넣고 초안을 만듭니다.",
    placeholder: "예: 투룸 아파트 거실 벽·천장 페인트…",
    run: "견적 초안",
    client: "고객명",
    exportPdf: "PDF 초안 다운로드",
    copyDraft: "초안 텍스트 복사",
    areaTitle: "작업 면적",
    areaHint:
      "인테리어는 가로×세로(미터) 또는 총 m²를 입력하세요. 단가가 m²인 항목은 이 면적으로 자동 계산됩니다.",
    lengthM: "가로 (m)",
    widthM: "세로 (m)",
    areaSqm: "또는 총 면적 (m²)",
    areaSqmPlaceholder: "가로×세로를 넣었다면 비워도 됩니다",
    calculatedArea: "적용 면적",
    disclaimerTitle: "초안입니다 — 실제 비용은 달라질 수 있음",
    disclaimerBody:
      "본 견적은 협의용 초안입니다. 현장 실측, 자재, 접근 조건, 변경에 따라 금액이 바뀔 수 있습니다. 복사/PDF에도 같은 고지가 포함됩니다.",
    tradeLabel: "세부 직종",
    tradeHint: "카테고리를 고른 뒤 세부 직종을 선택하세요. 해당 직종의 단가만 보입니다.",
    groupLabel: "직군 카테고리",
    groupHint: "관련 직종을 묶어 둡니다 (예: 실내 마감).",
    selectAllRates: "전체 선택",
    clearRates: "선택 해제",
    ratesSelected: "개 선택",
    noRatesForTrade: "이 직종에 단가가 없습니다. 단가표에서 추가하세요.",
    needRates: "이 직종에서 단가 항목을 하나 이상 선택하세요.",
    subtotalExTax: "소계 (세금 별도)",
    taxLabel: "세금 (10%)",
    totalIncTax: "합계 (세금 포함)",
  },
  trades: {
    title: "직군",
    hint: "직종은 카테고리 아래에 둡니다. 회사가 견적 내는 세부 직종을 추가하세요.",
    add: "직종 추가",
    addTitle: "새 직종",
    nameEn: "이름 (영어)",
    nameKo: "이름 (한국어, 선택)",
    group: "카테고리",
    preview: "표시 이름",
    remove: "삭제",
    deleteConfirm: "이 직종을 삭제할까요? 연결된 단가는 다른 직종으로 옮깁니다.",
    resetDefaults: "기본 직군 복원",
    resetConfirm: "직군 목록을 기본 세트로 바꿀까요?",
  },
  rates: {
    title: "단가표",
    hint: "단가는 카테고리 → 세부 직종 순으로 묶여 있습니다. 필터·수정·추가하세요.",
    add: "항목 추가",
    importCsv: "CSV 가져오기",
    exportCsv: "CSV 내보내기",
    code: "코드",
    label: "설명",
    unit: "단위",
    unitPrice: "단가 (세금 별도)",
    trade: "직군",
    filterTrade: "필터",
    allTrades: "전체 직군",
    remove: "삭제",
    resetDefaults: "기본 단가 복원",
    resetConfirm: "단가표를 여러 직군 기본 세트로 바꿀까요?",
    manageTradesHint: "새 직군이 필요하면",
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
  settings: {
    title: "AI 키 설정",
    hint: "SpareHand는 워크스페이스(몸체)입니다. AI 두뇌는 각 회사가 쓰는 키로 연결해, 비용과 제공사를 직접 통제합니다.",
    brainTitle: "내 AI 키 연결 (BYOK)",
    brainBody:
      "회사에서 이미 쓰는 AI 제공사(OpenAI 또는 OpenAI 호환)의 API 키를 붙여넣으세요. 회사마다 AI 사용료를 저희가 대신 결제하지 않습니다 — 각 회사 키가 본인 사용량만 청구합니다.",
    apiKey: "API 키",
    model: "모델 이름",
    baseUrl: "API Base URL (선택)",
    baseUrlPlaceholder: "OpenAI면 비워두세요. OpenRouter/Azure 호환 URL도 가능",
    privacyNote:
      "키는 이 브라우저에만 저장되며, 초안 생성 요청 때만 서버로 전달됩니다. 저희 데이터베이스에는 저장하지 않습니다.",
    saveKey: "이 브라우저에 저장",
    clearKey: "키 삭제",
    showKey: "보기",
    hideKey: "숨기기",
    bannerTitle: "실제 AI 초안을 쓰려면 키를 추가하세요",
    bannerBody:
      "키가 없으면 샘플 초안으로 흐름만 보여 줍니다. AI 키 메뉴에서 회사 키를 넣으면 실제 모델이 사용됩니다.",
    bannerCta: "AI 키 설정 열기",
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
        "‘추출’을 누르고 공급처·합계·세금을 확인합니다.",
        "장부 반영 전에 틀린 숫자를 고칩니다.",
      ],
      tips: [
        "밝은 조명과 평평한 촬영이 정확도를 높입니다.",
        "추출 결과는 초안입니다. 세금 항목은 반드시 재확인하세요.",
      ],
    },
    quotes: {
      title: "견적 초안",
      steps: [
        "카테고리(예: 실내 마감)를 고른 뒤 세부 직종을 선택합니다.",
        "이번 견적에 넣을 단가 항목을 체크합니다.",
        "m² 단가가 있으면 면적을 넣고 작업을 설명합니다.",
        "초안 확인 후 복사 또는 PDF (고지 포함).",
      ],
      tips: [
        "관련 직종은 카테고리로 묶여 있습니다 — ‘직군’에서 세부 직종을 추가하세요.",
        "선택한 단가만 AI에 전달되어 견적이 깔끔해집니다.",
      ],
    },
    trades: {
      title: "직군",
      steps: [
        "카테고리와 세부 직종 기본 목록을 확인합니다.",
        "견적 내는 세부 직종을 알맞은 카테고리 아래에 추가합니다.",
        "저장한 뒤 단가표에서 단가를 붙입니다.",
      ],
      tips: ["한국어 이름은 선택 사항이며, 앱 언어가 한국어일 때 사용됩니다."],
    },
    rates: {
      title: "단가표",
      steps: [
        "직군으로 필터해 목록을 좁힙니다.",
        "인건비·자재 항목을 추가하고, 면적 작업은 단위를 m²로 둡니다.",
        "저장해 견적에서 쓰이게 합니다.",
        "필요하면 CSV로 가져오기/내보내기 합니다.",
      ],
      tips: ["코드는 짧게 (예: PT-WALL) 두면 견적 초안이 깔끔합니다."],
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
    settings: {
      title: "AI 키",
      steps: [
        "AI 제공사(예: OpenAI)에서 API 키를 발급받습니다.",
        "여기에 키를 붙여넣고 팀에서 쓰는 모델을 입력합니다.",
        "OpenRouter 등을 쓰면 선택적으로 Base URL을 넣습니다.",
        "저장한 뒤 문의/견적 도구를 실행하면 회사 키로 초안이 만들어집니다.",
      ],
      tips: [
        "AI 비용은 각 회사가 부담합니다 — SpareHand는 공통 워크스페이스 몸체입니다.",
        "공용 PC에서는 작업 후 키를 삭제하세요.",
      ],
    },
  },
  scope: {
    title: "SpareHand가 보여주는 것",
    subtitle:
      "공개 페이지는 짧은 동작 샘플입니다. 고용하시면 귀사 전용 사내 시스템을 만들고, DB 설계·구축까지 함께 진행할 수 있습니다.",
    backHome: "홈으로",
    openApp: "샘플 써보기",
    includedTitle: "이 샘플에 포함",
    includedLead: "데모에서 이미 동작하며, 실제 사내 툴의 형태를 보여 줍니다.",
    notIncludedTitle: "공개 샘플에는 없음",
    notIncludedLead:
      "공개 데모는 의도적으로 브라우저에만 데이터를 둡니다. 고용 빌드에서는 아래를 추가할 수 있습니다.",
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
        body: "사진을 올리면 공급처, 합계, 세금, 품목을 추출해 검토할 수 있습니다.",
      },
      {
        title: "세금 포함 견적 초안",
        body: "작업 설명과 내 단가표로 세금(데모 10%) 포함 견적 초안을 만듭니다.",
      },
      {
        title: "내 단가표 관리",
        body: "앱에서 단가를 관리하고, 필요하면 스프레드시트 파일(CSV)로 백업합니다.",
      },
      {
        title: "선택적 이메일 연결",
        body: "나중에 Zapier 등으로 새 메일을 SpareHand로 흘려보낼 수 있습니다.",
      },
      {
        title: "내 AI 키 사용",
        body: "각 회사가 자체 OpenAI(또는 호환) 키를 연결해, AI 비용은 사용하는 회사가 부담합니다.",
      },
    ],
    notIncluded: [
      {
        title: "회사 공용 데이터베이스",
        body: "공개 데모에는 없습니다. Postgres / Supabase 등 팀용 DB 설계·호스팅을 구축해 드릴 수 있습니다.",
      },
      {
        title: "직원 로그인·권한",
        body: "로그인, 역할, 감사 기록은 비공개 사내 배포에서 넣습니다.",
      },
      {
        title: "데스크톱 화면 로봇",
        body: "윈도우 프로그램을 대신 클릭하는 자동화는 별도 전문 설정이 필요합니다.",
      },
      {
        title: "Monday·ClickUp 깊은 재구축",
        body: "다른 플랫폼을 깊게 개조하는 작업은 이 샘플 위의의 맞춤 프로젝트입니다.",
      },
    ],
    promiseTitle: "우리의 간단한 원칙",
    promiseBody:
      "AI 결과는 모두 초안입니다. 고객에게 보내거나 세무 서류로 쓰기 전에 사람이 반드시 확인합니다.",
    hireTitle: "사내 시스템 · DB 구축",
    hireLead:
      "지금 보시는 SpareHand는 포트폴리오용 프로토타입이며 회원가입이 필요 없습니다. 고용하시면 귀사 전용 사내 시스템을 만들고, 업무에 맞는 DB 설계·용량·구축까지 진행할 수 있습니다.",
    hirePoints: [
      "회사 내부용 워크스페이스 (요청 시에만 공개형 SaaS로 확장)",
      "DB 설계: 테이블·관계·백업·성장 여유까지",
      "직원 접근·권한·안전한 저장 (브라우저 샘플 데이터 대신)",
      "견적·단가·문의·문서 등 샘플 모듈을 실제 업무 흐름에 맞게 확장",
    ],
  },
  contact: {
    title: "문의하기",
    desc: "SpareHand를 보시고 사내 시스템 구축, 견적, 채용 문의가 있으시면 주제를 고른 뒤 간단한 의뢰 내용을 적어 주세요. 이메일로 답변드립니다.",
    directMail: "또는 직접 메일:",
    name: "이름 또는 회사명",
    namePlaceholder: "이름 / 회사명",
    email: "이메일",
    emailPlaceholder: "you@company.com",
    topicLabel: "문의 유형",
    topicPlaceholder: "주제를 선택하세요…",
    topicOtherLabel: "기타 주제 입력",
    topicOtherPlaceholder: "어떤 문의인지 적어 주세요",
    detailsLabel: "의뢰 내용",
    detailsPlaceholder:
      "업종, 사용 인원, 꼭 필요한 기능, 기존 데이터, 예산 범위, 희망 일정 등을 자유롭게 적어 주세요…",
    send: "메시지 보내기",
    sending: "전송 중…",
    success: "전송되었습니다. 확인 후 이메일로 연락드리겠습니다.",
    error: "전송에 실패했습니다. 아래 메일로 직접 보내 주세요:",
    topics: {
      starter: "스타터 — 소형 사내 툴 + DB",
      standard: "스탠다드 — 다인·역할·견적/작업",
      complex: "복잡 — 다지점·연동·리포트",
      hire: "채용 / 고용 문의",
      collab: "협업 · 컨설팅",
      other: "기타",
    },
  },
  common: {
    language: "언어",
    theme: "테마",
    themeLight: "라이트",
    themeDark: "다크",
    themeSystem: "시스템",
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
