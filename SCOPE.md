# SpareHand — Implementation Scope

Australian SME tool to stretch limited office headcount through repeatable admin automation.

## Feasible now (building in MVP)

| Area from brief | How we implement it | Quality bar |
| --- | --- | --- |
| Email & file classification | Inbox module: paste email / upload text → urgency, category, draft reply, next actions | Production-shaped UI + structured AI JSON |
| AI text summary & report drafts | Meetings + Documents modules: summarise, action items, AU-English draft reports | Streaming-ready API, editable outputs |
| OCR for receipts & paperwork | Documents module: image/PDF upload → vision LLM extraction (ABN, GST, totals, line items) | Works with OpenAI vision; manual edit always required |
| Meeting notes auto-summary | Meetings module | Same AI pipeline as inbox |
| CSV import / export (Excel-adjacent) | Rates + jobs history: CSV upload/download | Reliable; not live Excel COM sync |
| Zapier / no-code inbound | `POST /api/webhooks/inbound` with shared secret → creates a job item | Documented for Zapier Webhooks |
| Quote drafts from your rates | Quotes module + GST 10% | AU tax invoice-style draft PDF |
| Bring-your-own AI key (BYOK) | Settings: customer pastes OpenAI / compatible key in the browser | Platform does not pay every company's AI bill |
| Bilingual UI | `en-AU` default, `ko` supported | Dictionary + locale switcher |

## Deferred / not in this codebase (honest limits)

| Area from brief | Why not high-quality in a solo web MVP | Later path |
| --- | --- | --- |
| Desktop RPA scripts (UiPath-style) | Needs Windows UI automation agents, signed bots, fragile selectors — different product class | Separate worker service / Power Automate recipes |
| Building inside Zapier as a product | We are the destination app, not a Zapier clone | Publish official Zapier trigger/action when stable |
| Real-time Excel ↔ DB sync | Excel Online Graph + conflict resolution + auth is a multi-month integration | Start with CSV; then Microsoft Graph if customers demand it |
| Monday.com marketplace widgets | Requires Monday app framework, review, and hosting outside our app | Optional iframe/SDK spike after core PMF |
| Full ClickUp / Monday deep sync | OAuth apps, field mapping, rate limits, ongoing API churn | Thin “send action item to ClickUp” OAuth later |
| Live supplier price crawling | Legal + maintenance burden; competes with dedicated quote products | User-owned rate cards only |

## Product rule

Every AI output is a **draft**. Humans approve before sending to customers or lodging tax documents.
