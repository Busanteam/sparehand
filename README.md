# SpareHand

Australian SME workspace that stretches limited office headcount: inbox triage, meeting notes, document OCR, and GST-aware quote drafts.

Default UI language is **Australian English (`en-AU`)**, with **Korean (`ko`)** available from the language switcher.

## What’s in this MVP

See [SCOPE.md](./SCOPE.md) for the full feasible vs deferred split.

**Shipped now**
- Inbox triage + draft replies
- Meeting note summaries + action items
- Receipt/document vision extraction (OCR-style via vision LLM)
- Rate card + quote drafts with 10% GST + PDF export
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
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Key | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Live AI. Without it, deterministic mock drafts still run so the UI is demoable. |
| `OPENAI_MODEL` | Defaults to `gpt-4.1-mini` |
| `SPAREHAND_WEBHOOK_SECRET` | Shared secret for inbound webhooks |
| `NEXT_PUBLIC_SUPABASE_*` | Optional — schema in `supabase/schema.sql` |

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm test
```

## Product rule

Every AI output is a **draft**. Humans approve before customers or tax lodgement see it.

## Portfolio angle

Built as a Cursor-assisted solo full-stack product for AU hiring narratives around SME labour cost, vertical AI workflows, and production-shaped TypeScript/Next.js delivery.
