# AI Automation Assessment — Working Context

Keep this tight and decision-focused. When a decision changes, update before writing code.

## What this is

A single-track AI Automation Assessment hosted on Vercel. Routes every respondent through 11 to 12 questions, classifies them into one of 19 result codes across 12 result page variants (RP01–RP12), and lands them on a personalised diagnosis and CTA. It is a product surface for the Bain Squared AI Automation practice, not a marketing widget.

Source-of-truth docs:
- `./AI Automation Assessment - Master Decision Tree Mapping` — scoring, branching, classification, tags
- `./AI Automation Assessment - Master Result Page Copy.md` — result page copy for all 12 variants
- `./PRD.md` — problem, goal, scope
- `./PROJECT_GUIDE.md` — build architecture

## Stack

- Next.js 14 (App Router), TypeScript strict
- Tailwind CSS, Radix UI primitives (RadioGroup)
- React Hook Form + Zod for form state and validation
- GAS webhook only (env var `GAS_WEBHOOK_URL_AI`) — no Vercel Postgres, no Resend
- Framer Motion for page transitions
- Vercel for hosting; auto deploys from `main`, preview URLs on every branch

## Code conventions

- TypeScript strict mode on. No `any`. No `// @ts-ignore`. If types fight, fix the types.
- Tailwind only. No inline styles, no CSS modules, no styled-components.
- All colors, spacing, typography, and shadows reference `tailwind.config.ts` tokens. No raw hex anywhere in component files.
- All copy lives in `src/content/`. Never inline copy in components.
- Pure functions for scoring, routing, and tag derivation in `src/lib/`. Side-effect-free.
- Server components by default. Client components only where state, motion, or browser APIs require it.
- One question schema (`src/content/questions.ts`) is the source of truth. Adding, removing, or reordering questions is a content change there, not a code change anywhere else.

## File structure

```
src/
  app/
    page.tsx                 (landing)
    scorecard/
      page.tsx               (assessment shell)
      result/page.tsx        (result page)
    api/
      submit/route.ts        (GAS webhook — no DB writes)
    styleguide/page.tsx      (every component, every state)
  components/
    ui/                      (Button, Card, Badge, Progress, Gauge, Bracket)
    scorecard/               (Question, ProgressHeader)
  content/
    questions.ts             (question schema + all 12 questions, source of truth)
    outcomes.ts              (RP01–RP12 outcome objects + BOOKING_URL)
    copy.ts                  (landing copy, result form copy, kicker copy)
  lib/
    scoring.ts               (calculateFullResult — pure, all classification logic)
    routing.ts               (getNextQuestionId, isLastQuestion, getQuestionProgress)
    tags.ts                  (stub — tags are built inside scoring.ts)
```

## Assessment architecture

- **Single track**: `ai_automation`. No routing question. Starts at `company_stage`.
- **12 questions** (11 base + Q7A conditional when `current_ai_use = barely_use_ai`).
- **Q4 multi-select**: `maxSelect=3`, `exclusiveOption="none_of_the_above"`.
- **Scoring**: signal groups (company fit, friction, opportunity, readiness) → commercial caps → result code → FullResult.
- **19 result codes** across 6 branches (ai_operating_system, customer_revenue_ops, finance_backoffice_ops, internal_ops_coordination, capability_gap, starter_exploration) × temperature (hot / warm / warm_low / cold).
- **12 result page variants** (RP01–RP12). HOT/WARM within the same branch get distinct variants. WARM and WARM_LOW share the same variant.
- **Kicker blocks**: `failure_kicker`, `timing_kicker`, `funding_kicker` — shown after diagnosis copy, before lead capture form.
- **Personal email blocking**: gmail, yahoo, hotmail, outlook, live, msn, icloud, me, mac, proton.me, protonmail, aol, mail, gmx, qq, 163, 126.
- **Booking button**: shown post-submit only for `show_strong_booking_after_submit` policy (hot users only).
- **sessionStorage key**: `ai_assessment_result`.
- **GAS webhook env var**: `GAS_WEBHOOK_URL_AI`.

## Brand voice rules (hard — treat as production-blocking)

- No em dashes as punctuation. Commas, full stops, or rephrase.
- No exclamation points anywhere in the UI.
- Banned words: `leverage` (verb), `synergy`, `unlock value`, `transform` (marketing verb), `robust`, `best-in-class`, `world-class`, `holistic`, `journey`, `seamlessly`, `empower`.
- No urgency manipulation. No countdown timers. No "limited spots."
- Operator-to-operator tone. The reader is a founder, CEO, COO, or SME owner.
- Funding language must always include qualification language: "Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position."
- Do not position Bain Squared as a fundraising consultant. The firm provides AI workflow design and implementation.

## Don't do this

- Don't add libraries without checking with Nic first.
- Don't gate the assessment behind email. Gate the result CTA only.
- Don't auto-redirect after submission. The user clicks to continue.
- Don't show a booking button before email submission.
- Don't show a booking button for warm, warm_low, or cold users on the result page.
- Don't show the user their backend tags, lead score, or internal temperature value.
- Don't email the user before they submit.
- Don't use `warm_low` as user-facing text — display as "Potential fit".
- Don't use stock illustrations or AI-generated imagery.
- Don't use the word "journey" anywhere in the UI.

## Open questions for Nic (resolve before launch)

- Booking URL: currently `https://cal.com/bain-squared/ai-automation` (placeholder).
- GAS webhook URL: env var `GAS_WEBHOOK_URL_AI`.
- Domain for deployment.
- Landing page copy refinement if needed.
