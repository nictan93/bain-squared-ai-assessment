# AI Automation Assessment — Project Guide

A reference document for building and maintaining the assessment. Read alongside `CONTEXT.md` and the two master spec files.

---

## 1. What we built

A single-track AI Automation Assessment that:

1. Walks a founder or operator through 11 to 12 questions using a deterministic branching engine.
2. Classifies the respondent into one of 19 result codes across 12 result page variants (RP01–RP12).
3. Lands them on a personalised diagnosis with a report offer and, for hot users, a booking CTA after email submission.
4. Sends a structured payload to Google Sheets via a GAS webhook.

Three surfaces:

- **Landing page**: Positioning copy, trust bar, single CTA into the assessment.
- **Assessment**: Animated question flow with conditional routing and real progress tracking.
- **Result page**: Diagnosis, badge, callout, kicker blocks, email capture form, post-submit confirmation.

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS with custom design tokens |
| Component primitives | Radix UI (RadioGroup) |
| Forms | React Hook Form + Zod |
| Lead delivery | GAS webhook (`GAS_WEBHOOK_URL_AI`) |
| Motion | Framer Motion (page transitions) |
| Hosting | Vercel (auto deploys from `main`) |

No Vercel Postgres. No Resend. No database. Leads go directly to Google Sheets.

---

## 3. Assessment engine

### Questions

12 questions defined in `src/content/questions.ts`. This is the single source of truth. Each question has:
- `id`, `type`, `prompt`, optional `helper` (shown below prompt)
- `options[]`: each option has `id`, `label`, optional `helper` (shown below label in the option card)
- For Q4: `maxSelect=3`, `exclusiveOption="none_of_the_above"`
- For Q7A: conditional — only shown when `current_ai_use = barely_use_ai`

### Routing

`src/lib/routing.ts` controls which question is shown next using `BASE_QUESTION_ORDER` and `CONDITIONAL_ORDER_WITH_Q7A`. No other routing logic lives here.

### Scoring

`src/lib/scoring.ts` contains all classification logic. Entry point: `calculateFullResult("ai_automation", answers)`.

Execution order:
1. Count pain areas from Q4.
2. Assign initial branch from Q4 (hard-trigger priority logic, section 5.1).
3. Derive all signal groups: company fit, business type, operational friction, AI opportunity, grant interest, competitive advantage, readiness, urgency.
4. Apply AI goal override (section 5.2).
5. Classify lead temperature (sections 7.1–7.5).
6. Apply capability gap readiness override (section 7.6).
7. Apply commercial caps (section 8).
8. Assign result code, report key, result page variant.
9. Derive kickers, delivery policies, lead score, CRM tags.

Returns a `FullResult` object with all fields.

### Branches

| Branch | Q4 trigger |
|---|---|
| `ai_operating_system` | 3+ concrete pain areas, or `ai_goal = build_scalable_operating_system` with friction |
| `customer_revenue_ops` | customer replies or sales follow-up selected |
| `finance_backoffice_ops` | finance/reporting or admin/data entry selected |
| `internal_ops_coordination` | internal coordination, meeting notes, or research selected |
| `capability_gap` | only `not_sure_team_feels_busy` selected (no concrete pain) |
| `starter_exploration` | `none_of_the_above` selected or no pain identified |

### Result codes and page variants

19 result codes map to 12 result page variants. See master spec section 11 and `src/content/outcomes.ts`.

- Hot variants: RP01 (OS), RP03 (Customer), RP05 (Finance), RP07 (Internal), RP09 (Capability)
- Warm variants: RP02 (OS), RP04 (Customer), RP06 (Finance), RP08 (Internal), RP10 (Capability)
- Starter warm: RP11
- Cold: RP12

WARM and WARM_LOW share the same variant. WARM_LOW is internal only and must never appear in the UI.

---

## 4. Result page

`src/app/scorecard/result/page.tsx` reads the `FullResult` from sessionStorage key `ai_assessment_result`.

Layout order:
1. Result card: label, headline, badge, intro.
2. Callout card: title + body.
3. Kicker blocks (up to 3, filtered by conditions in master spec section 7.4).
4. CTA card: pre-submit form OR post-submit confirmation.

Booking button: only shown post-submit when `resultPageBookingPolicy = show_strong_booking_after_submit` (hot users only).

---

## 5. Lead delivery

`src/app/api/submit/route.ts` recomputes `FullResult` server-side from submitted answers, then fires the GAS webhook at `GAS_WEBHOOK_URL_AI`. The webhook payload includes all classification fields, CRM tags, and the full answers object.

No database writes. No email sending from this project.

---

## 6. Environment variables

| Variable | Purpose |
|---|---|
| `GAS_WEBHOOK_URL_AI` | Google Apps Script webhook endpoint |

---

## 7. Deployment

Vercel project linked to this repo. Auto deploys on push to `main`. Preview URLs on every branch. Domain TBC (confirm with Nic before DNS work).
