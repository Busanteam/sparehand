# SpareHand — next upgrade candidates

Prioritised for a hired / production build after this portfolio sample.

## Shipped in demo (browser-local)

| Item | Status |
|------|--------|
| 1. Auth + roles (admin / estimator / office) | Demo PIN login at `/login` — not production security |
| 2. Postgres / Supabase | Schema expanded in `supabase/schema.sql`; runtime still localStorage until hired DB connect |
| 3. Configurable tax & currency | Company settings on Settings (admin) |
| 4. Quote status workflow | draft → sent → accepted / declined + version trail |
| 5. Client CRM-lite | `/app/clients` + quote picker |
| 6. PDF branding | Business name, ABN, brand colour on PDF |
| 8. Smarter quote (partial) | Multi-trade rate selection + assumptions checklist |
| 9. Accounting export | Accepted quotes → CSV |

## Still hire-scope / next

1. **Real Auth + company workspace** — Supabase Auth / SSO, session cookies, RLS.
2. **Live Postgres sync** — replace browser `localStorage` with the schema above.
7. **Email ingest** — Gmail/Outlook or Zapier → Inbox triage queue (webhook stub exists).
8. **Smarter quote AI** — richer multi-trade prompting; rate suggestions.
9. **Xero / QuickBooks** — beyond CSV.
10. **Mobile field mode** — measure + photo → quote on phone.
11. **Audit log & approvals** — who changed rates / approved quotes.
12. **Observability** — error tracking, AI cost per company, usage dashboards.

## Keep as sample (do not overbuild in public demo)

- No public multi-tenant SaaS billing unless requested.
- No live supplier price scraping.
- AI outputs stay **drafts** with human approval.
- Demo PINs are for portfolio UX only.
