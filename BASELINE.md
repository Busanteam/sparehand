# SpareHand — Baseline v5 status (project copy)

Personal checklist lives only at `C:\Users\Admin\WorkSpace\CHECKLIST_5.md` (not committed).  
This file records **what SpareHand applied** against that baseline.

## Kickoff

```text
프로젝트: SpareHand (portfolio / SME office sample)
호스팅 / DB / 공개 URL: Vercel project busanteam-business/sparehand · no production DB · https://sparehand.vercel.app
검색 노출: 예 (마케팅 홈·스코프·privacy)
인증·관리자·업로드·웹훅·결제: 데모 PIN(클라이언트) · 이미지 업로드 · 웹훅 · Formspree 문의
BaaS 접근 모델: 없음 (schema.sql만 고용용 스캐폴드)
N/A 상황 섹션: 3(대부분·DB 풀/keepalive), 6(자체 DB 없음), 쿠키 세션 CSRF, CORS(동일 오리진), 결제
```

## Applied in code (this upgrade)

| Area | Done |
| --- | --- |
| Secrets gitignore + `.env.local.example` | yes |
| Security headers + CSP (static-friendly) + `poweredByHeader: false` | yes |
| Zod validation + rate limit on AI & webhook APIs | yes |
| OpenAI client timeout / limited retries | yes |
| Webhook secret + optional timestamp skew check | yes |
| Document upload type/size limits (client + API) | yes |
| `robots.txt` / `sitemap.xml` / canonical | yes |
| `/app` + `/login` `noindex` | yes |
| Privacy notice page + home footer link | yes |
| `/api/health` liveness | yes |
| README env + deploy notes | yes |

## Explicit N/A or hire-next

- Server-side session cookies / HttpOnly auth — demo PIN is browser-local only
- Supabase RLS live — schema only until hired DB
- DB keepalive cron — no production DB
- Analytics consent — no analytics scripts
- Dependabot — optional; run `npm audit` locally before releases

Do **not** commit `CHECKLIST_5.md` into this public repo.
