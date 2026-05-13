# AI Automation Assessment - Master Result Page Copy

> **Status:** Master file.
>
> **Companion file:** `AI_Automation_Decision_Tree_Mapping.md` (decision tree logic, result codes, scoring, and CRM tagging).

## Purpose

This file defines the result page copy for the Bain Squared AI Automation Assessment.

The copy is grouped by branch and by lead temperature. The decision tree classifies each respondent into a `result_code`, then the `result_code` maps to one of twelve result page variants below.

```text
Branch decides the content theme.
Lead temperature decides the page CTA behaviour and the diagnostic framing (urgent vs preparatory).
Result code is stored for tracking and scenario mapping.
```

The assessment supports five primary diagnostic branches (AI Operating System, Customer and Revenue Operations, Finance and Back Office Operations, Internal Operations and Coordination, Capability Gap), one starter exploration branch, and three cold education outcomes.

---

# 1. Global Rules

These rules apply across every result page variant.

## 1.1 Delivery and CTA

```text
1. Every completed respondent receives a report after a valid business email is submitted.
2. Hot users see a clear confirmation that the report has been sent, plus a strong booking prompt.
3. Hot users must not be automatically redirected to a booking page.
4. Warm and warm_low users receive the report. They must not see a booking CTA on the result page.
5. Cold users receive the report. They must not see a booking CTA on the result page.
6. The report must not be hidden behind a booking action.
```

## 1.2 Tone

```text
7. Tone is conversational, direct, calm, and founder-friendly.
8. Customer-facing copy must not use em dashes as sentence punctuation. Use periods, commas, colons, or semicolons.
9. Customer-facing copy must not shame or insult the user for low AI maturity, low operational sophistication, or weak understanding of AI.
10. Customer-facing copy must not use the phrase "low fit". Use "Education track" or similar respectful phrasing.
11. The page must not imply that every business needs Bain Squared.
12. The page must clearly distinguish workflow-level automation, operating-layer automation, and education.
13. The page must not over-explain methodology. Deeper education belongs in the report.
14. Hedged language is preferred ("may", "suggests", "appears to") over declarative claims.
```

## 1.3 Lead temperature labels

```text
15. The internal field lead_temperature uses hot, warm, warm_low, or cold.
16. The user-facing field lead_temperature_ui uses High fit, Potential fit, or Education track.
17. warm_low is internal only. On the user interface it must display as Potential fit.
```

Mapping:

| Internal `lead_temperature` | User-facing `lead_temperature_ui` |
|---|---|
| `hot` | High fit |
| `warm` | Potential fit |
| `warm_low` | Potential fit |
| `cold` | Education track |

## 1.4 Funding claim control

```text
18. Funding language must always include the qualification that support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position.
19. Do not state that every company is entitled to support.
20. Do not combine grants and tax deductions as guaranteed cash savings.
21. Specific scheme names (EDG, ECI, EIS, PSG) and indicative net cost figures may be used in the funding kicker, but only with the qualification language attached.
```

---

# 2. Shared Suite Policies

These policies apply to CFO Advisory, AI Automation, ESOP, and Intangible Value unless a file states a more restrictive rule.

## 2.1 Booking and CTA policy

| `lead_temperature` | Result page booking CTA | Report booking prompt | Email booking link |
|---|---|---|---|
| `hot` | Show only after valid business email submission | Strong prompt | Include |
| `warm` | Do not show on result page | Soft prompt allowed | Hide unless a nurture sequence is used |
| `warm_low` | Do not show on result page | Soft prompt allowed | Hide unless a nurture sequence is used |
| `cold` | Do not show on result page | No prompt | Hide |

No assessment may automatically redirect users to a booking page.

## 2.2 Business email validation

Every report request form must require a business email. The report must not be sent to personal email domains.

Blocked consumer domains:

```text
gmail.com
yahoo.com
hotmail.com
outlook.com
live.com
msn.com
icloud.com
me.com
mac.com
proton.me
protonmail.com
aol.com
mail.com
gmx.com
qq.com
163.com
126.com
```

Error copy:

```text
A business email address helps us make sure your report is delivered correctly.
```

## 2.3 Sales notification rule

Notify sales when:

```text
lead_temperature = hot
```

Also notify sales when:

```text
lead_temperature = warm AND lead_score >= 70
```

Do not notify sales by default for `warm_low` or `cold`.

## 2.4 Delivery policy

```text
delivery_policy = send_report_after_business_email_validation
calendar_redirect_policy = never_auto_redirect
```

The result page may summarise the diagnosis before submission, but report delivery must be triggered only after the business email passes validation.

---

# 3. Report Title Tokens

| `report_key` | Display title | Suggested PDF filename |
|---|---|---|
| `ai_operating_system_blueprint` | AI Operating System Blueprint | `Bain_Squared_AI_Operating_System_Blueprint.pdf` |
| `ai_customer_revenue_automation` | AI Customer and Revenue Automation Report | `Bain_Squared_AI_Customer_and_Revenue_Automation_Report.pdf` |
| `ai_finance_backoffice_automation` | AI Finance and Back Office Automation Report | `Bain_Squared_AI_Finance_and_Back_Office_Automation_Report.pdf` |
| `ai_workflow_automation_diagnostic` | AI Workflow Automation Diagnostic | `Bain_Squared_AI_Workflow_Automation_Diagnostic.pdf` |
| `ai_capability_partner_roadmap` | AI Capability Partner Roadmap | `Bain_Squared_AI_Capability_Partner_Roadmap.pdf` |
| `ai_automation_starter_guide` | AI Automation Starter Guide | `Bain_Squared_AI_Automation_Starter_Guide.pdf` |

## 3.1 Required front-end tokens

```text
{{report_title}}
{{booking_link}}
```

## 3.2 Optional front-end tokens

```text
{{company_name}}
{{lead_temperature_ui}}
{{result_code}}
{{branch}}
```

---

# 4. Universal Form Copy

Use this form copy on every result page where the email is collected to send the report.

```text
Business email *
your@company.com

For confidentiality and verified delivery, please use your company email address.

Name
Optional

Company name
Optional

I would like to receive newsletters from Bain Squared.
```

## 4.1 Privacy note

```text
Your email is used to send your report and track requested follow-up. We do not send marketing newsletters unless you opt in.
```

## 4.2 Submit button

```text
Send my report
```

---

# 5. Universal Post-Submission States (Fallback)

These are the default post-submission states by lead temperature. Each result page variant in section 8 has a more contextual After submit line that should be preferred. The states below are the fallback used when a per-variant After submit line is not specified.

## 5.1 Hot post-submission state

```text
Your report has been sent.

Please check your inbox. Based on your answers, we believe a short complimentary call may be helpful before your next workflow design, automation decision, or operations review.

The call is simply to help you understand the issues raised in your assessment, clarify what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, and there is no obligation to proceed further.

Button:
Book a discovery call
```

## 5.2 Warm and Warm Low post-submission state

```text
Your report has been sent.

Please check your inbox. Your report highlights the workflow and automation issues raised by your answers and explains what they may mean for your business.

We recommend reviewing it at your own pace. It should help you better understand where AI automation may add value as the business grows, hires, or scales.

No booking button.
```

## 5.3 Cold post-submission state

```text
Your results have been sent.

Please check your inbox and review the guide at your own pace.

Based on your answers, AI automation may not be an urgent business priority today, however the guide should still help you understand what to watch for as the business grows, hires, or expands.

No booking button.
```

---

# 6. Result Page Grouping Logic

| Result page group | Use when | Report key | `lead_temperature` | Booking CTA on page |
|---|---|---|---|---|
| Hot AI Operating System (RP01) | Multi-workflow friction across follow-ups, coordination, information, reporting, or admin, with high urgency | `ai_operating_system_blueprint` | `hot` | Yes, after submit |
| Warm AI Operating System (RP02) | Multi-workflow friction with lower urgency or earlier signal | `ai_operating_system_blueprint` | `warm` or `warm_low` | No |
| Hot Customer and Revenue (RP03) | Customer reply, sales follow-up, or proposal load with high urgency | `ai_customer_revenue_automation` | `hot` | Yes, after submit |
| Warm Customer and Revenue (RP04) | Customer or revenue workflow signal with lower urgency | `ai_customer_revenue_automation` | `warm` or `warm_low` | No |
| Hot Finance and Back Office (RP05) | Finance, reporting, invoicing, document, or admin load with high urgency | `ai_finance_backoffice_automation` | `hot` | Yes, after submit |
| Warm Finance and Back Office (RP06) | Finance or back-office signal with lower urgency | `ai_finance_backoffice_automation` | `warm` or `warm_low` | No |
| Hot Internal Workflow (RP07) | Internal coordination, handover, meeting note, or research load with high urgency | `ai_workflow_automation_diagnostic` | `hot` | Yes, after submit |
| Warm Internal Workflow (RP08) | Internal workflow signal with lower urgency | `ai_workflow_automation_diagnostic` | `warm` or `warm_low` | No |
| Hot Capability Gap (RP09) | Real pain exists, but the user does not know where to start, lacks capability, or is blocked by cost, with high urgency | `ai_capability_partner_roadmap` | `hot` | Yes, after submit |
| Warm Capability Gap (RP10) | Capability gap with lower urgency | `ai_capability_partner_roadmap` | `warm` or `warm_low` | No |
| Warm Starter (RP11) | Early exploration with some forward signal | `ai_automation_starter_guide` | `warm` or `warm_low` | No |
| Cold Starter (RP12) | Early-stage, low friction, low urgency, or no clear AI need | `ai_automation_starter_guide` | `cold` | No |

---

# 7. Kicker Blocks

Kickers are short educational blocks shown after the diagnostic copy and before the lead capture form. They reinforce the commercial message of the assessment without putting more pressure on the user.

For the AI Automation assessment, the kicker strategy is intentional: belief-mover statistics about AI pilot failure, Singapore agentic AI adoption, and SME funding support are not survey questions. They are kicker blocks delivered after the diagnosis. The result page is where the commercial punch lands.

Mapping per result page variant is in section 8. Display order, when more than one is present:

```text
1. failure_kicker
2. timing_kicker
3. funding_kicker
```

## 7.1 `failure_kicker`

Title:

```text
Why this needs to be done properly
```

Body:

```text
MIT NANDA's 2025 research, The GenAI Divide: State of AI in Business 2025, found that 95 percent of organisations were getting zero return from generative AI initiatives, with only a small minority of integrated pilots extracting measurable value. The issue is usually not the model. It is weak workflow integration, unclear ownership, poor exception handling, and technology deployed before the process is understood.

That is why Bain Squared starts with the workflow before deploying automation.
```

Source note for internal use:

```text
MIT NANDA, The GenAI Divide: State of AI in Business 2025. Verify source link before launch.
```

## 7.2 `timing_kicker`

Title:

```text
Why timing matters
```

Body:

```text
Deloitte's 2026 Singapore AI research reported that 72 percent of Singapore businesses plan to deploy agentic AI in several operational areas within two years, up from 15 percent today.

The shift is already underway. Companies that adopt AI workflow automation early tend to see compounding gains in response time, manual workload, and operating efficiency before competitors catch up.
```

Source note for internal use:

```text
Deloitte 2026 Singapore AI research. Verify source link before launch.
```

## 7.3 `funding_kicker`

Title:

```text
Your company may be eligible for funding support
```

Body:

```text
Qualified Singapore SMEs may be able to access up to 80 percent government co-funding for qualified AI deployments through schemes such as EDG, ECI, EIS, and PSG. Depending on eligibility, a S$50,000 engagement can net out to roughly S$10,000 to S$15,000 after grants and applicable tax deductions. Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position.

The first step is to map the workflow, estimate ROI, and check which support options may apply.
```

Source note for internal use:

```text
Relevant schemes may include ECI, PSG, EDG, and EIS. Verify current scheme rules before launch.
```

## 7.4 Conditional kicker rules

Funding kicker applies when:

```text
cost_objection_flag = true
OR grant_interest_group IN (grant_ready, grant_interested, grant_unaware_open, grant_uncertain)
```

Timing kicker applies when:

```text
lead_temperature IN (hot, warm)
OR competitive_advantage_group IN (strong_advantage_belief, moderate_advantage_belief, competitors_ahead, uncertain_advantage)
```

Failure kicker applies when:

```text
lead_temperature IN (hot, warm)
OR current_ai_use IN (staff_use_chatgpt_individually, use_ai_tools_but_no_company_system, some_workflows_automated_basic)
```

For cold users, display no more than one kicker. Use `timing_kicker` only if `competitive_advantage_group != low_advantage_belief`. Otherwise hide all kickers.

---

# 8. Result Page Copy Variants

Each variant below is the canonical copy for that result code group. Where a variant has multiple result codes mapped to it, the copy applies uniformly. The kicker selection is filtered further by the conditional rules in section 7.4.

## 8.1 RP01 - Hot AI Operating System

### Applies to

```text
AI_OPERATING_LEVERAGE_HOT
```

### Lead temperature

```text
Internal: hot
User-facing: High fit
```

### Report

```text
AI Operating System Blueprint
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your business may be ready to adopt Agentic AI automation.

Badge:
High Urgency 

Intro:
Your answers suggest that the issue is not just one slow task or one overloaded person. The business appears to have broader operational friction across follow-ups, coordination, information flow, reporting, or repeated manual work.

This does not mean the team is doing something wrong. It usually means the business has grown faster than the workflow has been redesigned.

Callout title:
The opportunity is big.

Callout body:
When multiple workflows are slow at the same time, the real problem is usually system design. AI automation can help, but only if the workflows are diagnosed properly, redesigned clearly, implemented into the tools your team already uses, and operated until adoption sticks.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your AI Operating System Blueprint, then speak with us directly.

Recommended next step body:
We will send the AI Operating System Blueprint to your inbox. Based on your answers, a short complimentary call will be very helpful for you. The call will be to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.

Form button:
Send my report

After submit:
Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next operations review, system rollout, hiring decision, or major workflow change. The blueprint is most useful when paired with a brief conversation about which workflow to start with.

Booking button:
Book a discovery call
```

### Kickers

```text
failure_kicker
timing_kicker
funding_kicker (conditional per section 7.4)
```

### Button behaviour

```text
Show booking button only after the report submission confirmation.
Open booking link in the same tab or a new tab.
Do not auto-redirect.
```

---

## 8.2 RP02 - Warm AI Operating System

### Applies to

```text
AI_OPERATING_LEVERAGE_WARM
AI_OPERATING_LEVERAGE_WARM_LOW
```

### Lead temperature

```text
Internal: warm or warm_low
User-facing: Potential fit
```

### Report

```text
AI Operating System Blueprint
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your business may benefit from an AI.

Badge:
Good Opportunity

Intro:
Your answers suggest there are early signs of operational friction across more than one workflow. Things may still be moving today, but the manual coordination is starting to add up.

This is a useful stage to understand how AI automation could support how work moves, how information is captured, and how much human chasing is needed to keep the business on track.

Callout title:
Build before it's too late.

Callout body:
AI automation tends to deliver more value when it is attached to a coherent operating layer rather than retrofitted under existing complexity. The earlier you map the workflows that should be automated, the easier it is to design a system that scales as the team grows.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your AI Operating System Blueprint.

Recommended next step body:
We will send the AI Operating System Blueprint to your inbox. The blueprint will help you understand which workflows usually anchor an AI operating layer, how they connect, and where to start when the timing is right.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review it before your next operations review, hiring round, or systems and tools planning conversation.

Booking button:
No booking button.
```

### Kickers

```text
failure_kicker
timing_kicker
```

### Button behaviour

```text
No booking CTA.
If a disabled button is not ideal for UX, hide the button and show the confirmation text only.
```

---

## 8.3 RP03 - Hot Customer and Revenue

### Applies to

```text
AI_CUSTOMER_REVENUE_HOT
```

### Lead temperature

```text
Internal: hot
User-facing: High fit
```

### Report

```text
AI Customer and Revenue Automation Report
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your current workflows is ready for AI automation.

Badge:
High Urgency 

Intro:
Your answers suggest that customer replies, lead qualification, sales follow-up, proposals, or CRM updates may be taking more manual effort than they should.

This is one of the clearest areas where AI automation can create visible business impact. The goal is not to replace your sales or customer support team. It is to make sure leads are followed up, customer questions are answered, and proposals are produced faster than the team can manage on its own.

Callout title:
Slow follow-up quietly costs revenue.

Callout body:
When customer and sales workflows depend too heavily on manual chasing, good opportunities can go cold before anyone notices. AI automation can help draft, route, qualify, remind, update, and escalate, so the team spends less time managing the process and more time talking to customers and closing work.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your Customer and Revenue Automation Report, then speak with us directly.

Recommended next step body:
We will send the AI Customer and Revenue Automation Report to your inbox. Based on your answers, a short complimentary call will be helpful for you. The call is simply to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.

Form button:
Send my report

After submit:
Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next sales push, pipeline review, or customer support reorganisation. The report is most useful when paired with a brief conversation about which part of the customer or revenue workflow should be automated first.

Booking button:
Book a discovery call
```

### Kickers

```text
failure_kicker
timing_kicker
```

### Button behaviour

```text
Show booking button only after the report submission confirmation.
Open booking link in the same tab or a new tab.
Do not auto-redirect.
```

---

## 8.4 RP04 - Warm Customer and Revenue

### Applies to

```text
AI_CUSTOMER_REVENUE_WARM
AI_CUSTOMER_REVENUE_WARM_LOW
```

### Lead temperature

```text
Internal: warm or warm_low
User-facing: Potential fit
```

### Report

```text
AI Customer and Revenue Automation Report
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your customer and revenue workflows may benefit from AI automation as they scale.

Badge:
Good Opportunity

Intro:
Your answers suggest that customer replies, sales follow-up, or proposal work is starting to take more manual effort than it should. Things may still be working, but the workload is creeping up.

This is the right stage to understand which parts of the customer and revenue workflow could be automated, and which parts are better handled by people.

Callout title:
Free up your team's time.

Callout body:
Most customer and revenue workflows have a routine layer (drafting, routing, qualifying, reminding, updating) and a judgement layer (closing, advising, resolving). AI automation works best when it takes the routine layer off the team's hands so the judgement layer gets more attention.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your Customer and Revenue Automation Report.

Recommended next step body:
We will send the AI Customer and Revenue Automation Report to your inbox. The report will help you understand which sales and customer workflows usually benefit from automation first, and what to look for when the time is right.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review it before your next sales planning, customer support staffing, or CRM review conversation.

Booking button:
No booking button.
```

### Kickers

```text
failure_kicker
timing_kicker
```

### Button behaviour

```text
No booking CTA.
If a disabled button is not ideal for UX, hide the button and show the confirmation text only.
```

---

## 8.5 RP05 - Hot Finance and Back Office

### Applies to

```text
AI_FINANCE_BACKOFFICE_HOT
```

### Lead temperature

```text
Internal: hot
User-facing: High fit
```

### Report

```text
AI Finance and Back Office Automation Report
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your operations team does too much manual work. 

Badge:
Urgent Review

Intro:
Your answers suggest that finance, reporting, invoicing, document review, trackers, or recurring back-office workflows may be creating a lot of manual load on the team.

This is exactly where AI automation tends to deliver fast, measurable wins. It is also where weak processes are most likely to delay management decisions and quietly add cost.

Callout title:
Manual back-office work delays good judgement.

Callout body:
The cost is not only the time spent preparing reports, checking invoices, updating trackers, or chasing inputs. It is also the decisions that get delayed, the errors that creep in, and the way the business becomes more dependent on individual memory. Cleaner back-office workflows give leaders better numbers, sooner.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your Finance and Back Office Automation Report, then speak with us directly.

Recommended next step body:
We will send the AI Finance and Back Office Automation Report to your inbox. Based on your answers, a short complimentary call may also be helpful. The call is simply to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.

Form button:
Send my report

After submit:
Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next month-end close, audit prep, reporting cycle, or finance team capacity decision. The report is most useful when paired with a brief conversation about which finance or admin workflow to automate first.

Booking button:
Book a discovery call
```

### Kickers

```text
failure_kicker
funding_kicker (conditional per section 7.4)
```

### Button behaviour

```text
Show booking button only after the report submission confirmation.
Open booking link in the same tab or a new tab.
Do not auto-redirect.
```

---

## 8.6 RP06 - Warm Finance and Back Office

### Applies to

```text
AI_FINANCE_BACKOFFICE_WARM
AI_FINANCE_BACKOFFICE_WARM_LOW
```

### Lead temperature

```text
Internal: warm or warm_low
User-facing: Potential fit
```

### Report

```text
AI Finance and Back Office Automation Report
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your operations may benefit from AI automation as it grows.

Badge:
Good Opportunity

Intro:
Your answers suggest that finance, reporting, invoicing, document review, or recurring back-office work is starting to take more manual effort than it should. The team can probably still handle it today, but the workload is creeping up.

This is the right stage to understand where automation usually creates the most value in finance and back-office workflows, before the manual load starts to delay decisions.

Callout title:
Manual work has a cost.

Callout body:
The cost is not always obvious in the short term. It is the slower management reporting, the small errors that get caught late, the time finance spends preparing rather than analysing, and the way knowledge ends up in one person's head. Cleaner workflows make finance easier to run and easier to trust.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your Finance and Back Office Automation Report.

Recommended next step body:
We will send the AI Finance and Back Office Automation Report to your inbox. The report will help you understand which finance and back-office workflows usually benefit from automation first, and how to think about the sequencing.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review it before your next month-end close, audit prep, finance team review, or systems decision.

Booking button:
No booking button.
```

### Kickers

```text
failure_kicker
funding_kicker (conditional per section 7.4)
```

### Button behaviour

```text
No booking CTA.
If a disabled button is not ideal for UX, hide the button and show the confirmation text only.
```

---

## 8.7 RP07 - Hot Internal Workflow

### Applies to

```text
AI_INTERNAL_WORKFLOW_HOT
```

### Lead temperature

```text
Internal: hot
User-facing: High fit
```

### Report

```text
AI Workflow Automation Diagnostic
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your team may be ready for AI workflow automation.

Badge:
Urgent Review

Intro:
Your answers suggest that internal coordination, approvals, handovers, reminders, admin work, or key-person dependency may be slowing the business down.

This does not always mean the team is underperforming. More often, it means the workflow is under-designed. Too much context lives in messages, meetings, spreadsheets, or individual memory, and the manual chasing fills the gap.

Callout title:
The bottleneck is the workflow layer.

Callout body:
AI automation can help monitor work, draft next steps, trigger reminders, summarise context, escalate exceptions, and reduce the manual follow-up needed to keep the company moving. The result is fewer dropped balls, less reliance on any single person, and a calmer operating rhythm.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your Workflow Automation Diagnostic, then speak with us directly.

Recommended next step body:
We will send the AI Workflow Automation Diagnostic to your inbox. Based on your answers, a short complimentary call may also be helpful for you to understand what you need. The call is simply to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.

Form button:
Send my report

After submit:
Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next leadership meeting, hiring round, or operations review. The diagnostic is most useful when paired with a brief conversation about where the workflow is getting stuck and what to redesign first.

Booking button:
Book a discovery call
```

### Kickers

```text
failure_kicker
timing_kicker
```

### Button behaviour

```text
Show booking button only after the report submission confirmation.
Open booking link in the same tab or a new tab.
Do not auto-redirect.
```

---

## 8.8 RP08 - Warm Internal Workflow

### Applies to

```text
AI_INTERNAL_WORKFLOW_WARM
AI_INTERNAL_WORKFLOW_WARM_LOW
```

### Lead temperature

```text
Internal: warm or warm_low
User-facing: Potential fit
```

### Report

```text
AI Workflow Automation Diagnostic
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your internal workflows may benefit from AI automation as the team grows.

Badge:
Good Opportunity

Intro:
Your answers suggest that internal coordination, approvals, handovers, reminders, or documentation are starting to take more manual effort than they should. Things may still be working today, but the workload is creeping into more of the team's day.

This is the right stage to understand which internal workflows usually benefit most from automation, and how to introduce it without creating new tools that nobody adopts.

Callout title:
Better workflows usually beat more headcount.

Callout body:
As the team grows, internal coordination tends to scale faster than the work itself. AI automation works well here when it removes the manual chasing, captures context, and gives the team a reliable place to look for what is happening next.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your Workflow Automation Diagnostic.

Recommended next step body:
We will send the AI Workflow Automation Diagnostic to your inbox. The diagnostic will help you understand where internal workflows usually break, what AI automation can take off the team's hands, and what to redesign first.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review it before your next leadership meeting, hiring round, or operations and tools review.

Booking button:
No booking button.
```

### Kickers

```text
failure_kicker
timing_kicker
```

### Button behaviour

```text
No booking CTA.
If a disabled button is not ideal for UX, hide the button and show the confirmation text only.
```

---

## 8.9 RP09 - Hot Capability Gap

### Applies to

```text
AI_CAPABILITY_GAP_HOT
```

### Lead temperature

```text
Internal: hot
User-facing: High fit
```

### Report

```text
AI Capability Partner Roadmap
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your business may be ready for AI with clear next steps.

Badge:
High Urgency 

Intro:
Your answers suggest that the main issue is not whether AI could help. The issue is where to start, how to design the workflow properly, how to integrate it into the business, and how to make sure the system actually works after launch.

This is where many AI projects quietly fail. Companies test tools, run pilots, or ask staff to use ChatGPT, but the workflow itself does not change. The business still depends on people manually chasing, checking, updating, and remembering what happens next.

Callout title:
Capabilities are built through workflows.

Callout body:
A useful AI system needs more than prompts. It needs diagnosis, process design, implementation, integration, exception handling, adoption support, and ongoing operation. That is why the right partner should not only build the automation, but help operate it until it becomes part of the business.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your AI Capability Partner Roadmap, then speak with us directly.

Recommended next step body:
We will send the AI Capability Partner Roadmap to your inbox. Based on your answers, a short complimentary call may also be helpful. The call is simply to help you understand the issues raised in your assessment, identify the right starting point, and share which support options may apply. It usually takes 15 to 30 minutes, with no obligation to proceed further.

Form button:
Send my report

After submit:
Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next AI tool decision, internal pilot, or capability hiring round. The roadmap is most useful when paired with a brief conversation about your specific starting point and which support options may apply.

Booking button:
Book a discovery call
```

### Kickers

```text
failure_kicker
funding_kicker (conditional per section 7.4)
```

### Button behaviour

```text
Show booking button only after the report submission confirmation.
Open booking link in the same tab or a new tab.
Do not auto-redirect.
```

---

## 8.10 RP10 - Warm Capability Gap

### Applies to

```text
AI_CAPABILITY_GAP_WARM
AI_CAPABILITY_GAP_WARM_LOW
```

### Lead temperature

```text
Internal: warm or warm_low
User-facing: Potential fit
```

### Report

```text
AI Capability Partner Roadmap
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your business may be exploring AI without clear goals.

Badge:
Urgent Review

Intro:
Your answers suggest that you can see how AI could help, but the harder question is where to start. Cost, capability, time, or simply not knowing the right first move can make it easier to delay than to act.

This is normal at this stage. The most useful next step is usually not another tool. It is a clearer view of which workflow would benefit first, what the build and adoption path looks like, and what cost support may apply.

Callout title:
The first step is choosing the first workflow.

Callout body:
Most AI projects that struggle did not pick the wrong technology. They picked the wrong starting workflow, or they tried to start everywhere at once. A clearer roadmap helps you avoid both, and lets you sequence the work in a way the team can actually adopt.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your AI Capability Partner Roadmap.

Recommended next step body:
We will send the AI Capability Partner Roadmap to your inbox. The roadmap will help you understand the typical starting points for capability-light businesses, what to prepare before bringing in a partner, and how to think about cost support that may apply.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review it before your next AI tool decision, internal pilot, or capability hiring round.

Booking button:
No booking button.
```

### Kickers

```text
failure_kicker
funding_kicker (conditional per section 7.4)
```

### Button behaviour

```text
No booking CTA.
If a disabled button is not ideal for UX, hide the button and show the confirmation text only.
```

---

## 8.11 RP11 - Warm Starter

### Applies to

```text
AI_STARTER_EXPLORATION_WARM
```

### Lead temperature

```text
Internal: warm or warm_low
User-facing: Potential fit
```

### Report

```text
AI Automation Starter Guide
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your business should understand what AI automation looks like before deciding what to do.

Badge:
Strategic Preparation

Intro:
Your answers suggest that AI automation may not be an urgent business need today, but the topic is worth understanding before competitors, customers, or operational complexity force the conversation.

This is a good stage to understand where AI automation usually creates value, what workflow signals to watch for, and when it becomes worth bringing in a capability partner.

Callout title:
Start with what works.

Callout body:
The clearest signs that a workflow is ready for AI automation are not always about technology. They tend to show up first as repeated manual work, follow-up that depends on individuals, and information that lives in too many places. Understanding the signals makes it easier to know when the timing is right.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your AI Automation Starter Guide.

Recommended next step body:
We will send the AI Automation Starter Guide to your inbox. The guide will help you understand the typical workflow signals to watch for, the common starting points, and what to prepare before bringing AI into the business.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review it at your own pace. It is most useful before your next operations review, hiring round, or systems planning conversation.

Booking button:
No booking button.
```

### Kickers

```text
timing_kicker (only when competitive_advantage_group != low_advantage_belief)
```

### Button behaviour

```text
No booking CTA.
No direct call prompt.
```

---

## 8.12 RP12 - Cold Starter

### Applies to

```text
AI_TOO_EARLY_COLD
AI_LOW_FRICTION_COLD
AI_NO_CLEAR_NEED_COLD
```

### Lead temperature

```text
Internal: cold
User-facing: Education track
```

### Report

```text
AI Automation Starter Guide
```

### Page copy

```text
Hero label:
YOUR RESULT

Title:
Your business may not need AI automation yet.

Badge:
Educational

Intro:
Based on your answers, AI automation may not be an urgent business priority today. That is perfectly fine. Many businesses do best by building the right operational foundations first, and revisiting AI when the workflow load is heavier or the timing is clearer.

The useful next step is to understand where AI automation usually creates value, so the timing of any future decision is made with a clearer view.

Callout title:
Learn where automation actually matters.

Callout body:
AI is most useful when it is attached to repeated workflows, clear business outcomes, and enough operational volume to make the build worthwhile. If the business is still early, already well-organised, or simply not ready to act, the most valuable thing today is a clearer picture of the signals that would make automation more relevant later.

Recommended next step overline:
Recommended next step

Recommended next step heading:
Get your AI Automation Starter Guide.

Recommended next step body:
We will send the AI Automation Starter Guide to your inbox so you can review the key signs, common use cases, and readiness questions at your own pace.

Form button:
Send my report

After submit:
Your report has been sent. Please check your inbox and review the guide when useful.

Booking button:
No booking button.
```

### Kickers

```text
None by default.
timing_kicker may be shown only if the user expressed exploratory AI interest (current_ai_use IN (staff_use_chatgpt_individually, use_ai_tools_but_no_company_system) AND competitive_advantage_group != low_advantage_belief).
```

### Button behaviour

```text
No booking CTA.
No booking link.
No direct call prompt.
```

---

# 9. Result Code to Result Page Variant Mapping

| `result_code` | `lead_temperature` | Result page variant |
|---|---|---|
| `AI_OPERATING_LEVERAGE_HOT` | `hot` | RP01 |
| `AI_OPERATING_LEVERAGE_WARM` | `warm` | RP02 |
| `AI_OPERATING_LEVERAGE_WARM_LOW` | `warm_low` | RP02 |
| `AI_CUSTOMER_REVENUE_HOT` | `hot` | RP03 |
| `AI_CUSTOMER_REVENUE_WARM` | `warm` | RP04 |
| `AI_CUSTOMER_REVENUE_WARM_LOW` | `warm_low` | RP04 |
| `AI_FINANCE_BACKOFFICE_HOT` | `hot` | RP05 |
| `AI_FINANCE_BACKOFFICE_WARM` | `warm` | RP06 |
| `AI_FINANCE_BACKOFFICE_WARM_LOW` | `warm_low` | RP06 |
| `AI_INTERNAL_WORKFLOW_HOT` | `hot` | RP07 |
| `AI_INTERNAL_WORKFLOW_WARM` | `warm` | RP08 |
| `AI_INTERNAL_WORKFLOW_WARM_LOW` | `warm_low` | RP08 |
| `AI_CAPABILITY_GAP_HOT` | `hot` | RP09 |
| `AI_CAPABILITY_GAP_WARM` | `warm` | RP10 |
| `AI_CAPABILITY_GAP_WARM_LOW` | `warm_low` | RP10 |
| `AI_STARTER_EXPLORATION_WARM` | `warm` or `warm_low` | RP11 |
| `AI_TOO_EARLY_COLD` | `cold` | RP12 |
| `AI_LOW_FRICTION_COLD` | `cold` | RP12 |
| `AI_NO_CLEAR_NEED_COLD` | `cold` | RP12 |

---

# 10. Implementation Mapping

```ts
function getResultPageVariant(resultCode, leadTemperature) {
  const map = {
    AI_OPERATING_LEVERAGE_HOT: "RP01",
    AI_OPERATING_LEVERAGE_WARM: "RP02",
    AI_OPERATING_LEVERAGE_WARM_LOW: "RP02",
    AI_CUSTOMER_REVENUE_HOT: "RP03",
    AI_CUSTOMER_REVENUE_WARM: "RP04",
    AI_CUSTOMER_REVENUE_WARM_LOW: "RP04",
    AI_FINANCE_BACKOFFICE_HOT: "RP05",
    AI_FINANCE_BACKOFFICE_WARM: "RP06",
    AI_FINANCE_BACKOFFICE_WARM_LOW: "RP06",
    AI_INTERNAL_WORKFLOW_HOT: "RP07",
    AI_INTERNAL_WORKFLOW_WARM: "RP08",
    AI_INTERNAL_WORKFLOW_WARM_LOW: "RP08",
    AI_CAPABILITY_GAP_HOT: "RP09",
    AI_CAPABILITY_GAP_WARM: "RP10",
    AI_CAPABILITY_GAP_WARM_LOW: "RP10",
    AI_STARTER_EXPLORATION_WARM: "RP11",
    AI_TOO_EARLY_COLD: "RP12",
    AI_LOW_FRICTION_COLD: "RP12",
    AI_NO_CLEAR_NEED_COLD: "RP12"
  };
  return map[resultCode] ?? "RP12";
}
```

---

# 11. UI Behaviour Rules

## 11.1 Hot page behaviour

```text
Show the result explanation.
Show the report sent confirmation.
Show the per-variant After submit copy.
Show the booking CTA only after report submission.
Do not auto-redirect.
Do not hide the report behind a booking action.
```

## 11.2 Warm and Warm Low page behaviour

```text
Show the result explanation.
Show the report sent confirmation.
Show the per-variant After submit copy.
Do not show a booking CTA.
Do not mention booking on the result page.
The PDF report may contain a soft call prompt.
```

## 11.3 Cold page behaviour

```text
Show the result explanation.
Show the report sent confirmation.
Show the per-variant After submit copy.
Do not show a booking CTA.
Do not mention booking on the result page.
Do not create urgency.
The PDF report should not include a direct call prompt.
```

## 11.4 Booking link rendering

Render the booking button only after form submission and only when:

```text
result_page_booking_policy = show_strong_booking_after_submit
```

Never render the booking button when:

```text
result_page_booking_policy = hide_booking
```

## 11.5 Kicker rendering

Render only the kickers listed in the variant copy and that pass the conditional rules in section 7.4.

Display order:

```text
1. failure_kicker
2. timing_kicker
3. funding_kicker
```

For cold users, render no more than one kicker per the rules in section 7.4.

## 11.6 Compliance note

Funding copy must always be qualified. Do not imply automatic entitlement. Do not state that every AI engagement will receive support. Do not present grants and tax deductions as guaranteed cash savings.

---

# 12. Copy QA Checklist

Before deploying the result page copy, confirm every item below.

```text
[ ] Every result code maps to exactly one page copy variant.
[ ] Every page copy variant maps to a valid report title.
[ ] Hot users see a booking CTA only after report submission.
[ ] Hot users are not auto-redirected to booking.
[ ] Warm and warm_low users do not see a booking CTA on the result page.
[ ] Cold users do not see a booking CTA, urgency language, or a direct call prompt.
[ ] warm_low is never shown to the user.
[ ] lead_temperature_ui is "High fit" for hot, "Potential fit" for warm and warm_low, and "Education track" for cold.
[ ] Every user receives a report after business email validation.
[ ] The report is not hidden behind a booking action.
[ ] Personal email domains are blocked at form validation.
[ ] The copy distinguishes single-workflow automation, operating-layer automation, capability gap, and education.
[ ] The copy does not imply every business needs Bain Squared.
[ ] The copy is direct without being insulting.
[ ] Customer-facing copy avoids em dashes as sentence punctuation.
[ ] Customer-facing copy avoids the phrase "low fit".
[ ] Cold users are educated, not shamed.
[ ] The result page feels like a diagnosis, not a sales trap.
[ ] Kickers are rendered after the diagnostic copy and before the form.
[ ] failure_kicker text matches the source-cited MIT NANDA stat.
[ ] timing_kicker text matches the source-cited Deloitte Singapore stat.
[ ] funding_kicker text includes scheme names with full qualification language.
[ ] funding_kicker is shown only when cost_objection_flag is true (which includes cashflow concerns) or the grant_interest_group signal is present.
[ ] The per-variant After submit copy is preferred over the universal fallback.
```

---

# 13. Final Copy Principle

The result page should help the founder, CEO, COO, or SME owner understand what kind of AI automation problem they actually have, or whether they have one at all.

Use this internal rule when reviewing copy:

```text
If the user has friction across multiple workflows, point them toward the AI Operating System Blueprint.
If the user has revenue or customer workflow load, point them toward the Customer and Revenue Automation Report.
If the user has finance or back-office load, point them toward the Finance and Back Office Automation Report.
If the user has internal coordination load, point them toward the Workflow Automation Diagnostic.
If the user has pain but cannot start, point them toward the Capability Partner Roadmap.
If the user has no clear need, point them toward the Starter Guide.
```

The hard-trigger architecture in the decision tree exists so that the user's own description of their problem in Q4 is what determines the diagnostic path. The result page copy must match that intent: every variant should sound like an honest reflection of what the user told us, not a reframing of their answers to fit a preferred sales narrative.

The Hot variants should feel diagnostic and decisive. The Warm variants should feel preparatory and honest. The Cold variant should feel respectful and educational. None of them should feel like a pitch.
