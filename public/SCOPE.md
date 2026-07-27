# SpareHand — Implementation Scope

SME office tool to stretch limited headcount through repeatable admin automation.

## Feasible now (building in MVP)

| Area from brief | How we implement it | Quality bar |
| --- | --- | --- |
| Email & file classification | Inbox module: paste email / upload text → urgency, category, draft reply, next actions | Production-shaped UI + structured AI JSON |
| AI text summary & report drafts | Meetings + Documents modules: summarise, action items, bilingual drafts | Streaming-ready API, editable outputs |
| OCR for receipts & paperwork | Documents module: image/PDF upload → vision LLM extraction (vendor, tax, totals, line items) | Works with OpenAI vision; manual edit always required |
| Meeting notes auto-summary | Meetings module | Same AI pipeline as inbox |
| CSV import / export (Excel-adjacent) | Rates + jobs history: CSV upload/download | Reliable; not live Excel COM sync |
| Zapier / no-code inbound | `POST /api/webhooks/inbound` with shared secret → creates a job item | Documented for Zapier Webhooks |
| Quote drafts from your rates | Quotes module + tax on ex-tax prices (demo 10%) | Draft PDF for review |
| Bilingual UI | English default, Korean supported | Dictionary + locale switcher |

## Positioning

Public site = interactive **portfolio prototype** (no sign-up). Hired work = private **internal company system** including database design/setup — for any region/market.
