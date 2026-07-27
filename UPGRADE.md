# SpareHand — next upgrade candidates

Prioritised for a hired / production build after this portfolio sample.

## P0 — trust & multi-user

1. **Auth + company workspace** — staff login, roles (admin / estimator / office), session security.
2. **Postgres / Supabase (or client DB)** — replace browser `localStorage`; backups, migrations, multi-device sync.
3. **Configurable tax & currency** — demo is 10% tax + AUD formatting; make rate/locale a company setting.

## P1 — quote ops depth

4. **Quote status workflow** — draft → sent → accepted / declined; version history.
5. **Client & job CRM-lite** — saved customers, sites, job history linked to quotes.
6. **PDF branding** — logo, ABN/business number fields, custom colours, bilingual PDF templates.

## P2 — AI & integrations

7. **Email ingest** — Gmail/Outlook or Zapier → Inbox triage queue (not paste-only).
8. **Smarter quote AI** — multi-trade quotes in one job; assumption checklist; rate suggestions.
9. **Accounting export** — Xero / QuickBooks invoice draft or CSV that accountants accept.

## P3 — polish & scale

10. **Mobile field mode** — measure + photo → quote on phone.
11. **Audit log & approvals** — who changed rates / approved quotes.
12. **Observability** — error tracking, AI cost per company, usage dashboards.

## Keep as sample (do not overbuild in public demo)

- No public multi-tenant SaaS billing unless requested.
- No live supplier price scraping.
- AI outputs stay **drafts** with human approval.
