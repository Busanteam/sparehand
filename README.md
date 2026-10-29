# SpareHand

SME office workspace that stretches limited headcount: inbox triage, meeting notes, document OCR, and tax-aware quote drafts.

Default UI language is **English (`en-AU`)**, with **Korean (`ko`)** available from the language switcher.

**Live:** https://sparehand.vercel.app  
**Repo:** https://github.com/Busanteam/sparehand  
**Host:** Vercel team `busanteam-business` · project `sparehand`

## What’s in this MVP

See [SCOPE.md](./SCOPE.md) for the full feasible vs deferred split.  
Baseline checklist mapping: [BASELINE.md](./BASELINE.md).

**Shipped now**
- Demo staff PIN roles (admin / estimator / office)
- Inbox triage + draft replies
- Meeting note summaries + action items
- Receipt/document vision extraction (OCR-style via vision LLM)
- Rate card + quote drafts with configurable tax + PDF export
- Clients CRM-lite + quote status workflow + accepted-quote CSV
- CSV import/export for rates
- Email inbound webhook (`POST /api/webhooks/inbound`)
- Local history/rates/company settings (browser)
- Optional Supabase schema for later cloud sync

**Intentionally deferred**
- Desktop RPA bots
- Live Excel sync
- Monday.com widgets
- Deep ClickUp sync
- Live supplier price scraping
- Production Auth + Postgres sync

## Setup

```bash
npm install
cp .env.local.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel Production / Preview | Canonical + OG + sitemap (default `https://sparehand.vercel.app`) |
| `SPAREHAND_WEBHOOK_SECRET` | Vercel (server) | Shared secret for inbound webhook header |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | Optional server fallback | UI Settings BYOK is preferred for demos |
| `NEXT_PUBLIC_SUPABASE_*` | Unused in runtime demo | Reserved for hired DB builds |

Never put service-role keys or webhook secrets in `NEXT_PUBLIC_*`.

Optional: add an OpenAI-compatible key in **Settings** (BYOK). Without a key, modules run in mock mode.

### Scripts

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

### Deploy

```bash
npx vercel --prod --yes
```

GitHub `main` push does not auto-promote unless the Vercel project is Git-linked; CLI/`--prod` is the current production path. Rollback: redeploy a previous deployment in the Vercel dashboard.

## Positioning

Public site = interactive **portfolio prototype**. Hired work = private **internal company system**, including database design/setup for any market.
