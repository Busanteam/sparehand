# SpareHand

SME office workspace that stretches limited headcount: inbox triage, meeting notes, document OCR, and tax-aware quote drafts.

Default UI language is **English (`en-AU`)**, with **Korean (`ko`)** available from the language switcher.

## What’s in this MVP

See [SCOPE.md](./SCOPE.md) for the full feasible vs deferred split.

**Shipped now**
- Inbox triage + draft replies
- Meeting note summaries + action items
- Receipt/document vision extraction (OCR-style via vision LLM)
- Rate card + quote drafts with tax (demo: 10%) + PDF export
- CSV import/export for rates
- Zapier/Make inbound webhook (`POST /api/webhooks/inbound`)
- Local history/rates persistence (browser)
- Optional Supabase schema for later cloud sync

**Intentionally deferred**
- Desktop RPA bots
- Live Excel sync
- Monday.com widgets
- Deep ClickUp sync
- Live supplier price scraping

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: add an OpenAI-compatible key in **Settings** (BYOK). Without a key, modules run in mock mode.

## Positioning

Public site = interactive **portfolio prototype** (no sign-up). Hired work = private **internal company system**, including database design/setup for any market.
