# AI Automation Assessment — PRD

## Problem

Singapore SME founders, CEOs, COOs, and operators know AI can reduce manual work. What they lack is a structured way to assess whether their business is genuinely ready to automate, which workflows are the right starting point, and what kind of support they may need. Without that, they either delay indefinitely, buy tools that sit unused, or commission engagements that start in the wrong place. The current Bain Squared site explains the AI Automation practice but gives the visitor no way to self-assess. They read the page and leave.

The assessment exists to convert that traffic into segmented, qualified pipeline for AI automation engagements, and to do it in a way that reads like a Bain Squared diagnosis, not a Typeform.

## Goal

Generate qualified leads for AI automation engagements, classified by branch (operating system, customer and revenue, finance and back office, internal workflow, capability gap, starter), temperature (hot, warm, warm_low, cold), and funding signal, with enough context for sales to prioritise and make first contact without a generic discovery call.

## Non-goals

Not a calculator that outputs a guaranteed ROI. Not a tool that gates the assessment behind email. Not a portal with accounts, saved progress, or retake history. Not an admin dashboard. Lead data is sent to Google Sheets via a GAS webhook. There is no Vercel Postgres or Resend in this project.

## Users

The assessment is built for founders, CEOs, COOs, and SME owners in Singapore and Southeast Asia who:

1. Carry visible manual workload across one or more workflows and are asking whether AI can help.
2. Are exploring AI but have not yet identified where to start or how to fund it.
3. Have begun using AI tools but lack a company-wide system tied to their actual workflows.
4. Are experiencing friction from key-person dependency, information fragmentation, or coordination overhead.

If the respondent is already fully automated, pre-revenue with no processes, or simply not interested, the assessment routes them to the education track and does not pitch an engagement.

## Core flow

1. User lands on the assessment page.
2. Reads the positioning copy, clicks Start.
3. Answers 11 or 12 questions (Q7A is conditional on Q7 answer).
4. Sees their result page with diagnosis, badge, callout, and kicker blocks immediately — no gate.
5. Submits business email to receive the assigned report and, for hot users, a booking CTA.
6. GAS webhook receives the full structured payload including result code, CRM tags, and all answers.

## Success metrics (v1 targets)

- Completion rate (started → completed): 60% or above
- Email capture rate (completed → submitted): 70% or above
- Booked call rate for hot users (submitted → call booked): 20% or above
- Time to complete: under 4 minutes median
- Hot and warm lead share: 40% or above of submissions

Adjust after the first 30 days of real traffic.

## Out of scope (v1)

A/B testing question copy. Partial progress saved across sessions. Blocking the same email from retaking. Admin dashboards. Anything requiring authentication. Vercel Postgres or Resend email templates.

## Tech stack

See `CONTEXT.md`. Next.js 14 on Vercel, TypeScript, Tailwind, React Hook Form, Zod, Framer Motion, Radix UI. GAS webhook for lead capture. No additional libraries without sign-off from Nic.

## Brand and tone

See `../_shared/Bain_Squared_context.md` and voice rules in `CONTEXT.md`. The reader is a founder, CEO, COO, or SME owner who has seen worse than the assessment they are about to take. Copy should be direct, calm, and diagnostic. No exclamation points. No em dashes. No urgency manipulation. Funding language must always include qualification language. The result page should feel like an honest diagnosis, not a pitch.
