# AI Automation Assessment - Master Decision Tree Mapping

> **Status:** Master file.
>
> **Companion file:** `AI_Automation_Result_Page_Copy.md` (customer-facing copy and result page logic).

## Purpose

This file defines the canonical decision tree logic for Bain Squared's AI Automation Assessment.

The assessment is designed for founders, CEOs, COOs, and SME owners in Singapore and Southeast Asia who may need:

1. An AI-enabled operating layer across multiple workflows

1. Customer and revenue workflow automation

1. Finance and back-office workflow automation

1. Internal workflow and coordination automation

1. AI capability partner support (where the gap is starting point and execution rather than need)

1. Starter or education track guidance

The assessment must not position every respondent as needing an AI engagement. The purpose is to separate genuine workflow-level AI opportunities from tool curiosity and from premature interest.

The system produces a structured result object for every completed respondent. The decision-relevant fields are listed in section 15.

Bain Squared positioning:

```
We diagnose, design, implement, and operate agentic workflows that reduce manual work and improve operating leverage.
```

---

# 1. Core Architecture

The system evaluates answers in this order:

```
1. Capture company stage, employee count, and business type.
2. Ask Q4: where does your team spend the most time? This is the hard-trigger branch question.
3. Assign one use-case branch from Q4 using deterministic priority logic.
4. Ask Q5 to Q11. Q5 and Q6 may be framed differently per branch but the answer keys are the same.
5. Compute company_fit_group, business_type_group, operational_friction_group, ai_opportunity_group, readiness_group, grant_interest_group, and competitive_advantage_group.
6. Apply the deterministic classification matrix to assign lead_temperature.
7. Apply commercial caps and overrides.
8. Assign result code, report key, lead score, CTA policy, CRM tags, and payload.
9. Send the structured payload to the result page, email automation, CRM, and internal notification logic.
```

Maximum number of questions per respondent:

```
4 universal qualification questions (Q1 to Q4)
+
6 universal diagnostic and intent questions (Q5, Q6, Q7, Q8, Q9, Q10)
+
1 conditional non-adoption question (Q7A, only when current_ai_use = barely_use_ai)
+
1 universal urgency question (Q11)
=
11 to 12 questions total
```

This keeps the assessment short while still allowing rigorous routing.

## 1.1 Routing rule

```
Lead score must never select the main branch.
The branch is determined exclusively by the hard-trigger logic in section 5, with one allowed override from Q9 AI goal.
Lead score is for internal sales prioritisation only.
```

## 1.2 Funding claim control

The funding question may use a commercial shorthand, but all result page, email, and report copy must include qualification language.

Use this control wording wherever detail is given:

```
Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position.
```

Grant awareness must never create a Hot lead by itself. It can only upgrade temperature when operational pain and urgency already exist.

---

# 2. Customer-Facing Assessment Positioning

## Assessment title

```
Your business runs on manual work, are you ready to change that?
```

## Subtitle

```
Find out whether your business is ready to deploy AI to reduce manual work, 
automate workflows, and create operating efficiency.

Qualified Singapore SMEs may be able to access up to 70 percent 
government co-funding for qualified AI deployments.
```

# Assessment Intro Page Trust Bar

Column 1 (icon: shield / checkmark)
Heading: See where your team is losing time.
Body: The assessment maps the workflows where manual work, key-person dependency, and information fragmentation are quietly slowing the business down.

Column 2 (icon: bar chart)
Heading: Know which automation is actually worth it.
Body: Not every workflow needs AI. The assessment shows whether your friction is strong enough to justify a build, and which area to start with for the fastest impact.

Column 3 (icon: calendar / next step)
Heading: Leave with a clear next step.
Body: Your result tells you exactly what kind of AI support your business may need, whether that means a full operating system build, a single workflow fix, or a capability roadmap before you act.

---

## Core framing

```
Some businesses need a single workflow automated. Some need an AI-enabled operating layer across multiple workflows. Some need education before action.

The mistake is treating all three as the same.
```

## What the assessment diagnoses

| Diagnosis | Commercial meaning | Primary Bain Squared engagement ||---|---|---|---|| AI operating system opportunity | Friction across multiple workflows. The business needs a coordinated AI-enabled operating layer | Operating system blueprint and multi-workflow build || Customer and revenue automation | Customer replies, lead qualification, sales follow-up, proposals, or CRM updates are too manual | Customer and revenue workflow build || Finance and back-office automation | Finance, reporting, invoicing, document review, or recurring back-office work is creating manual load | Finance and back-office workflow build || Internal workflow automation | Internal coordination, approvals, handovers, reminders, or documentation is slowing the team down | Internal workflow build || Capability gap | Pain exists but the company does not know where to start, lacks technical capability, or is blocked by cost | Capability partner roadmap || Starter exploration | The business is early or processes are clear. Education is the right next step | Starter guide and nurture |

---

# 3. Shared Suite Policies

These policies apply to CFO Advisory, AI Automation, ESOP, and Intangible Value unless a file states a more restrictive rule.

## 3.1 Lead temperature and lead score base

| Internal `lead_temperature` | User-facing `lead_temperature_ui` | Base lead score ||---|---|---|---:|| `hot` | High fit | 70 || `warm` | Potential fit | 40 || `warm_low` | Potential fit | 30 || `cold` | Education track | 10 |

Implementation rule:

```
lead_temperature is internal sales classification.
lead_temperature_ui is the polite user-facing label.
warm_low is internal only and must never appear on the user interface.
```

Mapping:

```
hot       → High fit
warm      → Potential fit
warm_low  → Potential fit
cold      → Education track
```

## 3.2 Booking and CTA policy

| `lead_temperature` | Result page booking CTA | Report booking prompt | Email booking link ||---|---|---|---|---|| `hot` | Show only after valid business email submission | Strong prompt | Include || `warm` | Do not show on result page | Soft prompt allowed | Hide unless a nurture sequence is used || `warm_low` | Do not show on result page | Soft prompt allowed | Hide unless a nurture sequence is used || `cold` | Do not show on result page | No prompt | Hide |

No assessment may automatically redirect users to a booking page.

## 3.3 Business email validation

Every report request form must require a business email. The report must not be sent to personal email domains.

Blocked consumer domains:

```
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

```
A business email address helps us make sure your report is delivered correctly.
```

## 3.4 Sales notification rule

Notify sales when:

```
lead_temperature = hot
```

Also notify sales when:

```
lead_temperature = warm AND lead_score >= 70
```

Do not notify sales by default for `warm_low` or `cold`.

Above-target employee count rule:

```
If company_fit_group = above_target_fit, do not notify sales as Hot automatically. Notify only after manual review or after the user books a call.
```

## 3.5 Delivery policy

Every completed respondent receives the assigned report after a valid business email is submitted. The result page may summarise the diagnosis before submission, but report delivery must be triggered only after the business email passes validation.

```
delivery_policy = send_report_after_business_email_validation
calendar_redirect_policy = never_auto_redirect
```

---

# 4. Universal Questions

All respondents answer Q1 to Q4 before branching, and all respondents answer Q5 to Q11 after branching. Q5 and Q6 may carry branch-framed display labels but use the same answer keys. Q7A is conditional.

Do not ask for annual revenue, annual revenue range, or revenue amount anywhere in the assessment.

## 4.1 Q1 - Business stage

```
question_key = company_stage
type = single_select
required = true
```

Question text:

```
What stage is your business at today?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Idea stage or pre-revenue | Still building the product or finding the first customers. | `idea_or_pre_revenue` |
| Early revenue business | Generating sales, but operations are still mostly manual and founder-led. | `early_revenue_startup` |
| Funded startup, Seed to Series A | Scaling up quickly with institutional backing. | `funded_startup_seed_to_series_a` |
| Growing SME | Established business experiencing a period of expansion. | `growth_stage_company` |
| Established SME | A mature, stable business with predictable operations. | `established_sme` |
| Multi-entity or regional business | Complex operations spanning multiple jurisdictions or business units. | `multi_entity_or_regional_business` |

Purpose:

```
Broad business stage, fit, scoring, and CRM segmentation.
```

## 4.2 Q2 - Employee count

```
question_key = employee_count
type = single_select
required = true
```

Question text:

```
How many people are currently in the company?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| 1 to 4 | A very small, tight-knit team. | `1_to_4` |
| 5 to 10 | A core team handling multiple functions. | `5_to_10` |
| 11 to 20 | Growing team starting to need more formal processes. | `11_to_20` |
| 21 to 50 | Established organization with distinct departments. | `21_to_50` |
| 51 to 200 | Mid-sized enterprise with significant operational complexity. | `51_to_200` |
| More than 200 | Large enterprise scale. | `more_than_200` |

Target rule:

```
5 to 50 employees is the primary Bain Squared target range.
1 to 4 employees is moderate or weak fit unless pain is strong.
More than 50 employees is above-target and cannot be classified Hot by default.
```

## 4.3 Q3 - Business type

```
question_key = business_type
type = single_select
required = true
```

Question text:

```
What type of business are you?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Accounting, finance, tax, audit, or bookkeeping firm | Professional financial services. | `accounting_finance_firm` |
| Professional services, consulting, agency, or advisory firm | Knowledge work and client services. | `professional_services_firm` |
| Healthcare, education, training, or enrichment business | `healthcare_education_training` |  |
| Retail, e-commerce, distribution, or trading business | Moving physical or digital goods. | `retail_ecommerce_distribution` |
| Manufacturing, logistics, operations, or field service business | Heavy operational and physical workflows. | `manufacturing_logistics_operations` |
| Technology, SaaS, or digital product company | Building and selling software or digital platforms. | `technology_saas_digital` |
| Content, marketing, media, or creative business | Production and distribution of creative assets. | `content_marketing_media` |
| Other SME or service business | Any other service-oriented business model. | `other_sme_service_business` |

Purpose:

```
Vertical context, CRM segmentation, and report routing support.
```

Special routing note:

```
Accounting, finance, tax, audit, and bookkeeping firms should be treated as strong candidates for finance, document, workflow, and back-office automation when pain exists.
```

## 4.4 Q4 - Team time spend (hard-trigger branch question)

```
question_key = team_time_spend
type = multi_select
required = true
max_select = 3
```

Question text:

```
Where does your team spend the most time?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Admin, data entry, or document preparation | Heavy manual copy-pasting and paperwork. | `admin_data_entry_documents` |
| Customer replies, support requests, or follow-ups | Constantly managing the inbox and customer queries. | `customer_replies_support_followups` |
| Sales follow-ups, proposals, or CRM updates | Chasing leads and keeping the sales pipeline accurate. | `sales_followups_proposals_crm` |
| Finance, reporting, invoicing, or internal tracking | Managing the numbers, billing, and back-office records. | `finance_reporting_invoicing_tracking` |
| Internal coordination, handovers, reminders, or approvals | Chasing team members to keep projects moving. | `internal_coordination_handover_approvals` |
| Meeting notes, summaries, documentation, or knowledge capture | Trying to record and organize what was discussed. | `meeting_notes_summaries_documentation` |
| Research, content, marketing, or campaign work | Gathering information and producing marketing materials. | `research_content_marketing_campaigns` |
| I am not sure, but the team always feels busy | You can feel the friction, but cannot pinpoint the exact bottleneck. | `not_sure_team_feels_busy` |
| None of the above | Our workflows are outside these common categories. | `none_of_the_above` |

### Validation rules

```
If none_of_the_above is selected, no other option may be selected.
If not_sure_team_feels_busy is selected with other options, keep all selected options.
not_sure_team_feels_busy adds an uncertainty signal but does not override concrete pain areas.
```

### Pain area count

`pain_area_count` includes only the seven concrete workflow options:

```
admin_data_entry_documents
customer_replies_support_followups
sales_followups_proposals_crm
finance_reporting_invoicing_tracking
internal_coordination_handover_approvals
meeting_notes_summaries_documentation
research_content_marketing_campaigns
```

`pain_area_count` does not count:

```
not_sure_team_feels_busy
none_of_the_above
```

## 4.5 Q5 - Key person dependency

```
question_key = key_person_dependency
type = single_select
required = true
```

Question text:

```
What happens when a key person is busy or on leave?
```

| Display option | Helper text | Answer key | Friction signal |
| --- | --- | --- | --- |
| Work slows down immediately | The process is entirely dependent on that specific person's knowledge. | `work_slows_down_immediately` | strong |
| Decisions get delayed | Approvals and next steps halt until they return. | `decisions_get_delayed` | strong |
| Customers, leads, or internal teams wait longer than they should | The delay directly impacts the customer experience or sales pipeline. | `customers_or_internal_teams_wait` | strong |
| Someone else can cover, but context is often missing | The work continues, but inefficiently and with a higher risk of errors. | `someone_can_cover_but_context_missing` | moderate |
| The business continues smoothly because processes are clear | Strong systems are in place to handle absences. | `business_continues_smoothly` | low |

Purpose:

```
People fragility, key-person risk, and workflow ownership signal.
```

## 4.6 Q6 - Information fragmentation

```
question_key = information_fragmentation
type = single_select
required = true
```

Question text:

```
Is your important information everywhere, in emails, WhatsApp, spreadsheets, or staff knowledge?
```

| Display option | Helper text | Answer key | Friction signal |
| --- | --- | --- | --- |
| Yes, important information is everywhere | It is a constant struggle to find the right document or context. | `yes_information_is_everywhere` | strong |
| Somewhat. We can find it, but it takes time | Things are generally saved, but retrieval is slow and manual. | `somewhat_can_find_but_takes_time` | moderate |
| Most information is documented, but not connected into workflows | We have a wiki or drive, but it is passive and disconnected from daily tasks. | `documented_but_not_connected` | moderate |
| No, our information is mostly organised and easy to retrieve | We have a strong, disciplined approach to knowledge management. | `mostly_organised_easy_to_retrieve` | low |
| I am not sure | We have not formally audited how our information flows. | `not_sure` | moderate |

Purpose:

```
System fragility, knowledge fragmentation, and opportunity for knowledge or workflow agents.
```

## 4.7 Q7 - Current AI use

```
question_key = current_ai_use
type = single_select
required = true
```

Question text:

```
Which statement best describes your current use of AI?
```

| Display option | Helper text | Answer key | Readiness signal |
| --- | --- | --- | --- |
| We barely use AI | We are at the very beginning of exploring this technology. | `barely_use_ai` | low |
| Some staff use ChatGPT or similar tools individually | Ad-hoc usage exists, but there is no coordinated company strategy. | `staff_use_chatgpt_individually` | moderate |
| We use AI tools, but there is no company-wide system | We pay for some AI software, but workflows remain disconnected. | `use_ai_tools_but_no_company_system` | moderate |
| We have automated some workflows, but they are still basic | We have started building actual automated processes. | `some_workflows_automated_basic` | high |
| AI is already embedded into core business processes | We operate with a mature, AI-enabled foundation. | `ai_embedded_in_core_processes` | high |

### Conditional rule

If:

```
current_ai_use = barely_use_ai
```

Then show Q7A.

If any other answer is selected, skip Q7A and set:

```
ai_non_adoption_reason = null
```

## 4.8 Q7A - AI non-adoption reason (conditional)

```
question_key = ai_non_adoption_reason
type = single_select
required = true if current_ai_use = barely_use_ai
```

Question text:

```
What is your biggest reason for not using AI?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Cost or budget concern | We are worried about the implementation and running costs. | `cost_or_budget_concern` |
| We do not know where to start | The options are overwhelming and we lack a clear roadmap. | `do_not_know_where_to_start` |
| We do not have the internal technical capability | We lack the engineers or operations staff to build and maintain it. | `lack_internal_technical_capability` |
| The team is too busy to implement it | We are too bogged down in daily work to step back and automate. | `team_too_busy_to_implement` |
| We are not sure AI will actually work for our business | We are skeptical of the hype vs. reality for our specific industry. | `not_sure_ai_will_work_for_us` |
| Security, data, or privacy concerns | We handle sensitive information and cannot risk data leaks. | `security_data_privacy_concern` |
| We do not think we need it yet | Our current manual processes are sufficient for our scale. | `do_not_think_we_need_it_yet` |

Special rule:

```
ai_non_adoption_reason = cost_or_budget_concern sets cost_objection_flag = true.
This triggers funding language on the result page and in the assigned report.
```

## 4.9 Q8 - Grant awareness

```
question_key = grant_awareness
type = single_select
required = true
```

Question text:

```
Did you know Singapore SMEs may be able to access cost support for qualified AI deployments?
```

Required helper text directly below the question:

```
Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position. It may include grants, consulting support, cloud support, and tax deductions.
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Yes | We are familiar with the available government support schemes. | `yes_aware` |
| No | We were not aware funding might be available. | `no_not_aware` |
| No, but I am willing to try | We are open to exploring grants if they make the project viable. | `no_but_willing_to_try` |
| Not relevant to us | We do not qualify or prefer not to use government grants. | `not_relevant` |
| I am not sure | We need more information on eligibility. | `not_sure` |

Purpose:

```
Cost objection reducer, grant or support interest signal, and eligibility mapping trigger.
```

Critical rule:

```
Grant awareness must not create a Hot lead by itself. It can only upgrade temperature when operational pain and urgency already exist.
```

## 4.10 Q9 - AI goal

```
question_key = ai_goal
type = single_select
required = true
```

Question text:

```
What do you hope to achieve with AI?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Reduce manual work and repetitive admin | The primary goal is saving time and cutting operational drag. | `reduce_manual_work` |
| Improve response time for customers, leads, or internal teams | The focus is on speed, SLA adherence, and customer experience. | `improve_response_time` |
| Make information easier to find and reuse | The goal is better knowledge management and eliminating silos. | `make_information_retrievable` |
| Automate finance, reporting, invoicing, or back-office workflows | Targeting the specific friction in financial operations. | `automate_finance_backoffice` |
| Build a scalable AI-enabled operating system | A holistic transformation of how the business operates. | `build_scalable_operating_system` |
| We are exploring and not sure yet | Still figuring out the highest ROI use case. | `exploring_not_sure` |

Purpose:

```
Business outcome signal, branch override input, and CRM segmentation.
```

## 4.11 Q10 - Competitive advantage belief

```
question_key = competitive_advantage_belief
type = single_select
required = true
```

Question text:

```
Do you think you would have a competitive advantage if you implemented AI today?
```

| Display option | Helper text | Answer key |
| --- | --- | --- |
| Yes, it would give us a meaningful advantage | We believe early adoption will directly improve our market position. | `yes_meaningful_advantage` |
| Maybe, but I am not sure how much | It would help, but it might not be a game-changer. | `maybe_some_advantage` |
| Not sure, I have not thought about it that way | Viewing AI more as a tool than a strategic differentiator. | `not_sure_not_thought_about_it` |
| No, I do not think it would change much | Our competitive moat lies elsewhere. | `no_not_much_advantage` |
| Our competitors are probably already ahead | We feel we are playing catch-up in our industry. | `competitors_already_ahead` |

Purpose:

```
Strategic urgency, moat-building belief, and retainer-quality buyer signal.
```

## 4.12 Q11 - Urgency

```
question_key = urgency
type = single_select
required = true
```

Question text:

```
How urgent is this for you right now?
```

| Display option | Helper text | Answer key | Urgency group |
| --- | --- | --- | --- |
| We need to fix this immediately | The current setup is breaking and we need a solution now. | `need_to_fix_immediately` | high |
| We want to solve this within the next 3 months | A near-term priority for the upcoming quarter. | `within_3_months` | high |
| We are exploring options for the next 6 months | On the roadmap, but not an immediate fire drill. | `within_6_months` | moderate |
| It is interesting, but not urgent | Important to address eventually, but other things take priority. | `exploring_for_later` | low |
| We are not currently looking to act | Just gathering information for the future. | `not_urgent` | low |

Purpose:

```
Timing and sales readiness.
```

## 4.13 Result Page Lead Capture Fields

These fields are shown only after the result page is generated and the user wants to receive the report.

| Field | Required | Validation |
| --- | --- | --- |
| Business email | Yes | Must be a business email. Personal email domains are blocked per section 3.3 |
| Name | No | Free text |
| Company name | No | Free text |
| Newsletter opt-in | No | Boolean checkbox |

Do not ask for:

```
annual revenue
annual revenue range
revenue amount
```

---

# 5. Hard-Trigger Branch Selection

After Q4 is answered, assign exactly one `branch`. Branch selection is deterministic and uses Q4 only, with one allowed override from Q9 AI goal evaluated after Q11.

## 5.1 Initial branch from Q4

Priority order (first matching rule wins):

| Priority | Condition | `branch` ||---:|---|---|---|| 1 | `none_of_the_above` selected | `starter_exploration` || 2 | `pain_area_count >= 3` | `ai_operating_system` || 3 | `customer_replies_support_followups` or `sales_followups_proposals_crm` selected | `customer_revenue_ops` || 4 | `finance_reporting_invoicing_tracking` selected | `finance_backoffice_ops` || 5 | `admin_data_entry_documents` selected | `finance_backoffice_ops` || 6 | `business_type = accounting_finance_firm` AND any of `admin_data_entry_documents`, `finance_reporting_invoicing_tracking`, `meeting_notes_summaries_documentation`, or `internal_coordination_handover_approvals` selected | `finance_backoffice_ops` || 7 | `internal_coordination_handover_approvals`, `meeting_notes_summaries_documentation`, or `research_content_marketing_campaigns` selected | `internal_ops_coordination` || 8 | Only `not_sure_team_feels_busy` selected (no concrete pain) | `capability_gap` || 9 | No concrete pain and none of the above matched | `starter_exploration` |

## 5.2 AI goal override (post-Q11)

After Q11 is answered, apply this single allowed override:

```
If ai_goal = build_scalable_operating_system
AND operational_friction_group != low_friction
THEN branch = ai_operating_system
```

No other Q9 answer overrides Q4. Q4 reflects operational reality. Q9 reflects intent. Operational reality drives the diagnosis.

## 5.3 Capability gap guardrail

```
Capability gap must never override a concrete use-case branch.
The classification rules check ai_operating_system, customer_revenue_ops, finance_backoffice_ops, and internal_ops_coordination before capability_gap.
Capability gap is reached only via Q4 priority 8 (only not_sure_team_feels_busy selected) or via the readiness override in section 7.5.
```

---

# 6. Derived Groups

These derived groups are computed before classification. They are stored on the result object and used in CRM segmentation, lead scoring, kicker logic, and report personalisation.

## 6.1 Company fit group

| Condition | `company_fit_group` ||---|---|---|| `employee_count IN (5_to_10, 11_to_20, 21_to_50)` | `strong_fit` || `employee_count = 1_to_4` AND `company_stage != idea_or_pre_revenue` | `moderate_fit` || `employee_count IN (51_to_200, more_than_200)` | `above_target_fit` || `employee_count = 1_to_4` AND `company_stage = idea_or_pre_revenue` | `weak_fit` |

Priority (above-target evaluated first so larger companies do not become Hot just because they have operational complexity):

```
above_target_fit > strong_fit > moderate_fit > weak_fit
```

## 6.2 Business type group

Assign one `business_type_group`.

| `business_type` | `business_type_group` ||---|---|---|| `accounting_finance_firm` | `accounting_finance` || `professional_services_firm` | `professional_services` || `retail_ecommerce_distribution` | `commercial_ops` || `manufacturing_logistics_operations` | `commercial_ops` || `healthcare_education_training` | `general_sme` || `technology_saas_digital` | `general_sme` || `content_marketing_media` | `general_sme` || `other_sme_service_business` | `other_business` |

Special interpretation:

```
business_type = accounting_finance_firm should add a finance and back-office routing preference when the respondent also selects finance, reporting, invoicing, document, admin, or productivity-related workflows in Q4 or Q9.
```

## 6.3 Operational friction

`operational_friction_group` is derived from `operational_friction_score`, which is computed from Q4, Q5, and Q6.

### 6.3.1 Team time spend score

| Condition | Score |
| --- | --- |
| `pain_area_count >= 3` | 5 |
| `pain_area_count = 2` | 4 |
| `pain_area_count = 1` | 2 |
| `not_sure_team_feels_busy` selected and `pain_area_count = 0` | 1 |
| `none_of_the_above` selected | 0 |

### 6.3.2 Key person dependency score

| `key_person_dependency` | Score |
| --- | --- |
| `work_slows_down_immediately` | 5 |
| `decisions_get_delayed` | 4 |
| `customers_or_internal_teams_wait` | 4 |
| `someone_can_cover_but_context_missing` | 2 |
| `business_continues_smoothly` | 0 |

### 6.3.3 Information fragmentation score

| `information_fragmentation` | Score |
| --- | --- |
| `yes_information_is_everywhere` | 5 |
| `somewhat_can_find_but_takes_time` | 3 |
| `documented_but_not_connected` | 2 |
| `not_sure` | 1 |
| `mostly_organised_easy_to_retrieve` | 0 |

### 6.3.4 Total score

```
operational_friction_score =
  team_time_spend_score
  + key_person_dependency_score
  + information_fragmentation_score
```

### 6.3.5 Group assignment

| Condition | `operational_friction_group` ||---|---|---|| `operational_friction_score >= 10` OR (`pain_area_count >= 3` AND `key_person_dependency IN (work_slows_down_immediately, decisions_get_delayed, customers_or_internal_teams_wait)`) OR (`information_fragmentation = yes_information_is_everywhere` AND `key_person_dependency IN (work_slows_down_immediately, decisions_get_delayed, customers_or_internal_teams_wait)`) | `strong_friction` || Not strong AND `operational_friction_score >= 5` | `moderate_friction` || Otherwise | `low_friction` |

## 6.4 AI opportunity

`ai_opportunity_group` is derived from `ai_opportunity_score`, computed from Q7, Q7A, and Q9.

### 6.4.1 Current AI use score

| `current_ai_use` | Score |
| --- | --- |
| `barely_use_ai` | 4 |
| `staff_use_chatgpt_individually` | 4 |
| `use_ai_tools_but_no_company_system` | 4 |
| `some_workflows_automated_basic` | 2 |
| `ai_embedded_in_core_processes` | 0 |

### 6.4.2 Non-adoption reason score (only applied if Q7A is triggered)

| `ai_non_adoption_reason` | Score |
| --- | --- |
| `cost_or_budget_concern` | 3 |
| `do_not_know_where_to_start` | 4 |
| `lack_internal_technical_capability` | 4 |
| `team_too_busy_to_implement` | 4 |
| `not_sure_ai_will_work_for_us` | 2 |
| `security_data_privacy_concern` | 2 |
| `do_not_think_we_need_it_yet` | -4 |
| `null` | 0 |

### 6.4.3 AI goal score

| `ai_goal` | Score |
| --- | --- |
| `reduce_manual_work` | 3 |
| `improve_response_time` | 4 |
| `make_information_retrievable` | 3 |
| `automate_finance_backoffice` | 4 |
| `build_scalable_operating_system` | 5 |
| `exploring_not_sure` | 1 |

### 6.4.4 Total score

```
ai_opportunity_score =
  current_ai_use_score
  + non_adoption_reason_score
  + ai_goal_score
```

### 6.4.5 Group assignment

| Condition | `ai_opportunity_group` ||---|---|---|| (`ai_opportunity_score >= 9` AND `operational_friction_group != low_friction`) OR (`operational_friction_group = strong_friction` AND `ai_goal != exploring_not_sure`) | `high_opportunity` || Not high AND `ai_opportunity_score >= 5` | `moderate_opportunity` || Otherwise | `low_opportunity` |

## 6.5 Readiness

`readiness_group` is derived from `readiness_score`, computed from Q11, Q8 (via `grant_interest_group`), and Q10 (via `competitive_advantage_group`).

### 6.5.1 Urgency score

| `urgency` | Score |
| --- | --- |
| `need_to_fix_immediately` | 5 |
| `within_3_months` | 4 |
| `within_6_months` | 2 |
| `exploring_for_later` | 1 |
| `not_urgent` | 0 |

### 6.5.2 Grant readiness score

| `grant_interest_group` | Score |
| --- | --- |
| `grant_ready` | 2 |
| `grant_interested` | 3 |
| `grant_unaware_open` | 2 |
| `grant_uncertain` | 1 |
| `grant_not_relevant` | 0 |

### 6.5.3 Competitive advantage score

| `competitive_advantage_group` | Score |
| --- | --- |
| `strong_advantage_belief` | 4 |
| `moderate_advantage_belief` | 2 |
| `competitors_ahead` | 3 |
| `uncertain_advantage` | 1 |
| `low_advantage_belief` | -2 |

### 6.5.4 Total score

```
readiness_score =
  urgency_score
  + grant_readiness_score
  + competitive_advantage_score
```

### 6.5.5 Group assignment

| Condition | `readiness_group` ||---|---|---|| `readiness_score >= 8` OR (`urgency IN (need_to_fix_immediately, within_3_months)` AND `competitive_advantage_group IN (strong_advantage_belief, competitors_ahead)`) | `high_readiness` || Not high AND `readiness_score >= 4` | `moderate_readiness` || Otherwise | `low_readiness` |

### 6.5.6 Cross-readiness shortcut for classification

For the deterministic classification matrix in section 7, treat `current_ai_use` directly as a readiness signal where convenient:

| `current_ai_use` | Inferred readiness signal ||---|---|---|| `some_workflows_automated_basic`, `ai_embedded_in_core_processes` | `high_readiness` || `staff_use_chatgpt_individually`, `use_ai_tools_but_no_company_system` | `moderate_readiness` || `barely_use_ai` AND `ai_non_adoption_reason != do_not_think_we_need_it_yet` | `moderate_readiness` || `barely_use_ai` AND `ai_non_adoption_reason = do_not_think_we_need_it_yet` | `low_readiness` |

The full `readiness_group` derived from `readiness_score` remains canonical. The shortcut above is used only when the matrix in section 7 references readiness.

## 6.6 Grant interest group

| `grant_awareness` | `grant_interest_group` ||---|---|---|| `yes_aware` | `grant_ready` || `no_not_aware` | `grant_unaware_open` || `no_but_willing_to_try` | `grant_interested` || `not_relevant` | `grant_not_relevant` || `not_sure` | `grant_uncertain` |

Cost objection flag:

```
cost_objection_flag = true
IF ai_non_adoption_reason = cost_or_budget_concern
```

## 6.7 Competitive advantage group

| `competitive_advantage_belief` | `competitive_advantage_group` ||---|---|---|| `yes_meaningful_advantage` | `strong_advantage_belief` || `maybe_some_advantage` | `moderate_advantage_belief` || `not_sure_not_thought_about_it` | `uncertain_advantage` || `no_not_much_advantage` | `low_advantage_belief` || `competitors_already_ahead` | `competitors_ahead` |

## 6.8 Urgency group

| `urgency` | `urgency_group` ||---|---|---|| `need_to_fix_immediately`, `within_3_months` | `high` || `within_6_months` | `moderate` || `exploring_for_later`, `not_urgent` | `low` |

---

# 7. Lead Temperature Classification

Classify in this order:

```
1. Forced cold rules
2. Hot rules
3. Warm rules
4. Warm Low rules
5. Default cold
6. Commercial caps and overrides (section 8)
```

## 7.1 Forced cold rules

Classify as `lead_temperature = cold` if any of the following is true:

```
team_time_spend contains none_of_the_above
AND key_person_dependency = business_continues_smoothly
AND information_fragmentation = mostly_organised_easy_to_retrieve
AND urgency_group = low
```

Or:

```
ai_non_adoption_reason = do_not_think_we_need_it_yet
AND urgency = not_urgent
AND operational_friction_group = low_friction
```

Or:

```
current_ai_use = ai_embedded_in_core_processes
AND operational_friction_group = low_friction
AND urgency_group = low
```

## 7.2 Hot rules

Classify as `lead_temperature = hot` if all are true:

```
branch IN (ai_operating_system, customer_revenue_ops, finance_backoffice_ops, internal_ops_coordination, capability_gap)
operational_friction_group = strong_friction
urgency_group = high
company_fit_group IN (strong_fit, moderate_fit)
readiness_group IN (high_readiness, moderate_readiness)
```

Additional Hot conditions (any one is sufficient if all baseline gates above are met):

```
ai_opportunity_group = high_opportunity
```

```
pain_area_count >= 3
AND ai_goal IN (reduce_manual_work, improve_response_time, automate_finance_backoffice, build_scalable_operating_system)
```

```
operational_friction_group = strong_friction
AND competitive_advantage_group IN (strong_advantage_belief, competitors_ahead)
```

```
operational_friction_group = strong_friction
AND grant_interest_group IN (grant_interested, grant_ready, grant_unaware_open)
AND urgency IN (need_to_fix_immediately, within_3_months)
```

Above-target cap (applied in section 8.1):

```
company_fit_group = above_target_fit cannot become Hot by default. Treat as Warm unless Bain Squared manually wants to pursue enterprise delivery.
```

Weak-fit cap (applied in section 8.2):

```
company_fit_group = weak_fit cannot become Hot.
```

## 7.3 Warm rules

If not Hot or forced cold, classify as `lead_temperature = warm` if any of the following is true:

```
clear branch with strong_friction and urgency_group = moderate
clear branch with moderate_friction and urgency_group = high
above-target company with strong_friction and urgency_group = high
operational_friction_group = strong_friction (any urgency)
operational_friction_group = moderate_friction AND ai_opportunity_group IN (high_opportunity, moderate_opportunity)
current_ai_use = barely_use_ai AND ai_non_adoption_reason IN (cost_or_budget_concern, do_not_know_where_to_start, lack_internal_technical_capability, team_too_busy_to_implement, not_sure_ai_will_work_for_us, security_data_privacy_concern) AND operational_friction_group != low_friction
grant_interest_group IN (grant_interested, grant_unaware_open) AND operational_friction_group != low_friction AND urgency_group IN (high, moderate)
competitive_advantage_group IN (strong_advantage_belief, moderate_advantage_belief, competitors_ahead) AND operational_friction_group != low_friction AND urgency_group IN (high, moderate)
```

## 7.4 Warm Low rules

If not Hot, forced cold, or Warm, classify as `lead_temperature = warm_low` if any of the following is true:

```
clear branch with moderate_friction and urgency_group = low
clear branch with low-to-moderate friction and ai_opportunity_group IN (moderate_opportunity, high_opportunity)
company_fit_group = moderate_fit OR weak_fit AND a real use case is identified
competitive_advantage_group IN (strong_advantage_belief, moderate_advantage_belief, competitors_ahead) AND operational_friction_group != low_friction AND urgency_group = low
grant_interest_group IN (grant_interested, grant_unaware_open) AND operational_friction_group != low_friction AND urgency_group = low
```

Implementation guardrail:

```
warm_low must never appear on the user interface. The lead_temperature_ui field is "Potential fit" for warm and warm_low alike.
```

## 7.5 Default cold

If no rule above applies:

```
lead_temperature = cold
```

## 7.6 Capability gap readiness override

Apply after Hot, Warm, and Warm Low classification:

```
If branch IN (ai_operating_system, customer_revenue_ops, finance_backoffice_ops, internal_ops_coordination)
AND current_ai_use = barely_use_ai
AND ai_non_adoption_reason IN (do_not_know_where_to_start, lack_internal_technical_capability, team_too_busy_to_implement)
AND operational_friction_group != low_friction
AND lead_temperature IN (warm, warm_low)
THEN reassign branch = capability_gap
```

This guardrail allows users with real friction but no capability to start to be reframed as a capability gap engagement, without overriding any Hot use-case branch.

---

# 8. Commercial Caps and Overrides

Apply after section 7 classification.

## 8.1 Above-target employee count cap

If:

```
company_fit_group = above_target_fit
AND lead_temperature = hot
```

Then cap to:

```
lead_temperature = warm
```

Reason:

```
The 5 to 50 employee range is the primary Bain Squared target for this assessment. Companies above 50 employees should not be treated as Hot by default and should be capped to Warm unless manually reviewed.
```

Exception:

```
Keep as Hot only by manual review, not automatic scoring.
```

## 8.2 Weak company fit cap

If:

```
company_fit_group = weak_fit
AND lead_temperature = hot
AND operational_friction_group != strong_friction
```

Then cap to:

```
lead_temperature = warm
```

If both `weak_fit` and `low_friction`, cap further to:

```
lead_temperature = warm_low
```

## 8.3 Not urgent cap

If:

```
urgency = not_urgent
AND lead_temperature = hot
```

Then cap to:

```
lead_temperature = warm
```

Exception (keep Hot if both are true):

```
operational_friction_score >= 12
AND competitive_advantage_group IN (strong_advantage_belief, competitors_ahead)
```

## 8.4 Low advantage cap

If:

```
competitive_advantage_group = low_advantage_belief
AND urgency_group = low
AND lead_temperature = hot
```

Then cap to:

```
lead_temperature = warm
```

## 8.5 No need cold cap

If:

```
ai_non_adoption_reason = do_not_think_we_need_it_yet
AND operational_friction_group = low_friction
```

Then force:

```
lead_temperature = cold
```

## 8.6 Starter exploration cap

If `branch = starter_exploration`, the maximum lead_temperature is `warm`. Hot is not available on this branch. Default outcomes for this branch:

```
strong external upgrade signal (urgency_group = high AND competitive_advantage_group IN (strong_advantage_belief, competitors_ahead)) → warm
moderate signal → warm_low
weak signal → cold
```

---

# 9. Result Code Assignment

Assign result code after final `lead_temperature` and `branch` are determined.

## 9.1 Hot result codes

| Branch | Result code | Report key ||---|---|---|---|| `ai_operating_system` | `AI_OPERATING_LEVERAGE_HOT` | `ai_operating_system_blueprint` || `customer_revenue_ops` | `AI_CUSTOMER_REVENUE_HOT` | `ai_customer_revenue_automation` || `finance_backoffice_ops` | `AI_FINANCE_BACKOFFICE_HOT` | `ai_finance_backoffice_automation` || `internal_ops_coordination` | `AI_INTERNAL_WORKFLOW_HOT` | `ai_workflow_automation_diagnostic` || `capability_gap` | `AI_CAPABILITY_GAP_HOT` | `ai_capability_partner_roadmap` || `starter_exploration` | N/A (capped) | N/A |

## 9.2 Warm result codes

| Branch | Result code | Report key ||---|---|---|---|| `ai_operating_system` | `AI_OPERATING_LEVERAGE_WARM` | `ai_operating_system_blueprint` || `customer_revenue_ops` | `AI_CUSTOMER_REVENUE_WARM` | `ai_customer_revenue_automation` || `finance_backoffice_ops` | `AI_FINANCE_BACKOFFICE_WARM` | `ai_finance_backoffice_automation` || `internal_ops_coordination` | `AI_INTERNAL_WORKFLOW_WARM` | `ai_workflow_automation_diagnostic` || `capability_gap` | `AI_CAPABILITY_GAP_WARM` | `ai_capability_partner_roadmap` || `starter_exploration` | `AI_STARTER_EXPLORATION_WARM` | `ai_automation_starter_guide` |

## 9.3 Warm Low result codes

| Branch | Result code | Report key ||---|---|---|---|| `ai_operating_system` | `AI_OPERATING_LEVERAGE_WARM_LOW` | `ai_operating_system_blueprint` || `customer_revenue_ops` | `AI_CUSTOMER_REVENUE_WARM_LOW` | `ai_customer_revenue_automation` || `finance_backoffice_ops` | `AI_FINANCE_BACKOFFICE_WARM_LOW` | `ai_finance_backoffice_automation` || `internal_ops_coordination` | `AI_INTERNAL_WORKFLOW_WARM_LOW` | `ai_workflow_automation_diagnostic` || `capability_gap` | `AI_CAPABILITY_GAP_WARM_LOW` | `ai_capability_partner_roadmap` || `starter_exploration` | `AI_STARTER_EXPLORATION_WARM` | `ai_automation_starter_guide` |

Note: starter_exploration uses the same result code for warm and warm_low. The lead_temperature field carries the internal distinction.

## 9.4 Cold result codes

Use this priority order:

```
AI_TOO_EARLY_COLD
AI_LOW_FRICTION_COLD
AI_NO_CLEAR_NEED_COLD
```

| Conditions | Result code | Report key ||---|---|---|---|| `lead_temperature = cold` AND `company_fit_group = weak_fit` | `AI_TOO_EARLY_COLD` | `ai_automation_starter_guide` || `lead_temperature = cold` AND `operational_friction_group = low_friction` | `AI_LOW_FRICTION_COLD` | `ai_automation_starter_guide` || `lead_temperature = cold` AND none of the above | `AI_NO_CLEAR_NEED_COLD` | `ai_automation_starter_guide` |

---

# 10. Report Assignment

| `report_key` | Display title | Suggested PDF filename ||---|---|---|---|| `ai_operating_system_blueprint` | AI Operating System Blueprint | `Bain_Squared_AI_Operating_System_Blueprint.pdf` || `ai_customer_revenue_automation` | AI Customer and Revenue Automation Report | `Bain_Squared_AI_Customer_and_Revenue_Automation_Report.pdf` || `ai_finance_backoffice_automation` | AI Finance and Back Office Automation Report | `Bain_Squared_AI_Finance_and_Back_Office_Automation_Report.pdf` || `ai_workflow_automation_diagnostic` | AI Workflow Automation Diagnostic | `Bain_Squared_AI_Workflow_Automation_Diagnostic.pdf` || `ai_capability_partner_roadmap` | AI Capability Partner Roadmap | `Bain_Squared_AI_Capability_Partner_Roadmap.pdf` || `ai_automation_starter_guide` | AI Automation Starter Guide | `Bain_Squared_AI_Automation_Starter_Guide.pdf` |

---

# 11. Result Page Variant Mapping

The companion file defines twelve result page variants. Each branch has a Hot variant and a Warm variant; warm_low always shares the Warm variant. Cold cases route to the dedicated cold starter variant.

| Result code | `lead_temperature` | Result page variant ||---|---|---|---|| `AI_OPERATING_LEVERAGE_HOT` | `hot` | RP01 || `AI_OPERATING_LEVERAGE_WARM` | `warm` | RP02 || `AI_OPERATING_LEVERAGE_WARM_LOW` | `warm_low` | RP02 || `AI_CUSTOMER_REVENUE_HOT` | `hot` | RP03 || `AI_CUSTOMER_REVENUE_WARM` | `warm` | RP04 || `AI_CUSTOMER_REVENUE_WARM_LOW` | `warm_low` | RP04 || `AI_FINANCE_BACKOFFICE_HOT` | `hot` | RP05 || `AI_FINANCE_BACKOFFICE_WARM` | `warm` | RP06 || `AI_FINANCE_BACKOFFICE_WARM_LOW` | `warm_low` | RP06 || `AI_INTERNAL_WORKFLOW_HOT` | `hot` | RP07 || `AI_INTERNAL_WORKFLOW_WARM` | `warm` | RP08 || `AI_INTERNAL_WORKFLOW_WARM_LOW` | `warm_low` | RP08 || `AI_CAPABILITY_GAP_HOT` | `hot` | RP09 || `AI_CAPABILITY_GAP_WARM` | `warm` | RP10 || `AI_CAPABILITY_GAP_WARM_LOW` | `warm_low` | RP10 || `AI_STARTER_EXPLORATION_WARM` | `warm` or `warm_low` | RP11 || `AI_TOO_EARLY_COLD` | `cold` | RP12 || `AI_LOW_FRICTION_COLD` | `cold` | RP12 || `AI_NO_CLEAR_NEED_COLD` | `cold` | RP12 |

---

# 12. Lead Score Calculation

Lead score is for internal sales prioritisation only. It does not affect branch selection, result code, or report key.

## 12.1 Base score

| `lead_temperature` | Base score |
| --- | --- |
| `hot` | 70 |
| `warm` | 40 |
| `warm_low` | 30 |
| `cold` | 10 |

## 12.2 Modifiers

| Factor | Condition | Modifier ||---|---|---|---:|| Company stage | `funded_startup_seed_to_series_a` | +3 || Company stage | `growth_stage_company` | +5 || Company stage | `established_sme` | +5 || Company stage | `multi_entity_or_regional_business` | +2 || Employee count | `1_to_4` | -5 || Employee count | `5_to_10` | +10 || Employee count | `11_to_20` | +12 || Employee count | `21_to_50` | +15 || Employee count | `51_to_200` | -10 || Employee count | `more_than_200` | -20 || Business type | `accounting_finance_firm` | +5 || Business type | `professional_services_firm` | +4 || Operational friction | `strong_friction` | +15 || Operational friction | `moderate_friction` | +7 || AI opportunity | `high_opportunity` | +12 || AI opportunity | `moderate_opportunity` | +6 || Readiness | `high_readiness` | +15 || Readiness | `moderate_readiness` | +7 || Current AI use | `use_ai_tools_but_no_company_system` | +5 || Current AI use | `ai_embedded_in_core_processes` AND `operational_friction_group = low_friction` | -5 || Non-adoption reason | `cost_or_budget_concern` AND grant interest exists | +5 || Non-adoption reason | `do_not_think_we_need_it_yet` | -20 || Grant interest | `grant_interested` | +8 || Grant interest | `grant_unaware_open` | +5 || Competitive advantage | `strong_advantage_belief` | +8 || Competitive advantage | `competitors_ahead` | +7 || Competitive advantage | `low_advantage_belief` | -6 || Urgency | `need_to_fix_immediately` | +10 || Urgency | `within_3_months` | +6 || Urgency | `not_urgent` | -10 || Fit group | `weak_fit` | -8 || Fit group | `above_target_fit` | -15 |

## 12.3 Score cap

```
minimum = 0
maximum = 100
```

## 12.4 Lead score formula

```
function calculateLeadScore(result) {
  const base = getBaseScore(result.lead_temperature);
  const modifiers = sumModifiers(result);
  return Math.max(0, Math.min(100, base + modifiers));
}
```

`lead_score` must always be clamped to the closed interval [0] [100].

---

# 13. Sales Notification Rule

Notify sales when:

```
lead_temperature = hot
```

Also notify sales when:

```
lead_temperature = warm AND lead_score >= 70
```

Do not notify sales by default for `warm_low` or `cold`.

Above-target employee count rule:

```
If company_fit_group = above_target_fit, do not notify sales as Hot automatically. Notify only after manual review or after the user books a call.
```

---

# 14. CRM Tags

Every result must emit the minimum tag set. Pain tags and stage tags are added based on Q4 selections and other answers, and improve segmentation for later nurture sequences.

## 14.1 Minimum tags

```
assessment:ai_automation
branch:{branch}
temperature:{lead_temperature}
result_code:{result_code}
report:{report_key}
fit:{company_fit_group}
business_type:{business_type}
business_type_group:{business_type_group}
friction:{operational_friction_group}
opportunity:{ai_opportunity_group}
readiness:{readiness_group}
grant:{grant_interest_group}
advantage:{competitive_advantage_group}
urgency:{urgency_group}
ai_use:{current_ai_use}
```

## 14.2 Pain tags

| Signal | CRM tag ||---|---|---|| Q4 includes `customer_replies_support_followups` | `pain:customer_replies` || Q4 includes `sales_followups_proposals_crm` | `pain:sales_followup` || Q4 includes `finance_reporting_invoicing_tracking` | `pain:finance_reporting` || Q4 includes `admin_data_entry_documents` | `pain:admin_documents` || Q4 includes `internal_coordination_handover_approvals` | `pain:internal_coordination` || Q4 includes `meeting_notes_summaries_documentation` | `pain:meeting_notes` || Q4 includes `research_content_marketing_campaigns` | `pain:research_content` || `pain_area_count >= 3` | `pain:multi_workflow_friction` || `key_person_dependency IN (work_slows_down_immediately, decisions_get_delayed, customers_or_internal_teams_wait)` | `pain:key_person_risk` || `information_fragmentation = yes_information_is_everywhere` | `pain:information_fragmentation` || `cost_objection_flag = true` | `pain:cost_objection` || `ai_non_adoption_reason = do_not_know_where_to_start` | `pain:starting_point_block` || `ai_non_adoption_reason = lack_internal_technical_capability` | `pain:capability_block` || `ai_non_adoption_reason = team_too_busy_to_implement` | `pain:execution_bandwidth_block` || `ai_non_adoption_reason = not_sure_ai_will_work_for_us` | `pain:efficacy_doubt` || `ai_non_adoption_reason = security_data_privacy_concern` | `pain:security_concern` |

## 14.3 Stage and intent tags

```
stage:{company_stage}
employees:{employee_count}
goal:{ai_goal}
non_adoption:{ai_non_adoption_reason}
```

(Omit `non_adoption` if `ai_non_adoption_reason` is null.)

---

# 15. Structured Result Object

Every completed assessment must return this object.

```json
{
  "assessment": "ai_automation",
  "track": "ai_automation",
  "branch": "ai_operating_system | customer_revenue_ops | finance_backoffice_ops | internal_ops_coordination | capability_gap | starter_exploration",
  "result_code": "{result_code}",
  "lead_temperature": "hot | warm | warm_low | cold",
  "lead_temperature_ui": "High fit | Potential fit | Education track",
  "lead_score": "{number 0..100}",
  "company_fit_group": "strong_fit | moderate_fit | weak_fit | above_target_fit",
  "business_type_group": "accounting_finance | professional_services | commercial_ops | general_sme | other_business",
  "operational_friction_group": "strong_friction | moderate_friction | low_friction",
  "operational_friction_score": "{number}",
  "ai_opportunity_group": "high_opportunity | moderate_opportunity | low_opportunity",
  "ai_opportunity_score": "{number}",
  "readiness_group": "high_readiness | moderate_readiness | low_readiness",
  "readiness_score": "{number}",
  "urgency_group": "high | moderate | low",
  "cost_objection_flag": "true | false",
  "grant_interest_group": "grant_ready | grant_interested | grant_unaware_open | grant_not_relevant | grant_uncertain",
  "competitive_advantage_group": "strong_advantage_belief | moderate_advantage_belief | uncertain_advantage | low_advantage_belief | competitors_ahead",
  "report_key": "{report_key}",
  "report_title": "{report_title}",
  "result_page_variant": "RP01 | RP02 | RP03 | RP04 | RP05 | RP06 | RP07 | RP08 | RP09 | RP10 | RP11 | RP12",
  "result_page_kickers": ["failure_kicker | timing_kicker | funding_kicker"],
  "result_page_booking_policy": "show_strong_booking_after_submit | hide_booking",
  "report_booking_prompt_policy": "strong_prompt | soft_prompt | no_prompt",
  "email_booking_policy": "include_booking_link | hide_booking_link",
  "business_email_required": true,
  "personal_email_blocked": true,
  "crm_tags": ["{tag_1}", "{tag_2}"],
  "answers": {
    "company_stage": "{answer_key}",
    "employee_count": "{answer_key}",
    "business_type": "{answer_key}",
    "team_time_spend": ["{answer_key}"],
    "key_person_dependency": "{answer_key}",
    "information_fragmentation": "{answer_key}",
    "current_ai_use": "{answer_key}",
    "ai_non_adoption_reason": "{answer_key | null}",
    "grant_awareness": "{answer_key}",
    "ai_goal": "{answer_key}",
    "competitive_advantage_belief": "{answer_key}",
    "urgency": "{answer_key}"
  },
  "lead_form": {
    "business_email": "{business_email}",
    "name": "{name | null}",
    "company_name": "{company_name | null}",
    "newsletter_opt_in": "true | false"
  }
}
```

---

# 16. Implementation Pseudocode

```javascript
function evaluateAiAutomationAssessment(answers) {
  // 1. Pain area count and branch
  const painAreaCount = countPainAreas(answers.team_time_spend || []);
  let branch = assignBranchFromQ4(answers, painAreaCount);

  // 2. Derived groups
  const companyFitGroup = deriveCompanyFitGroup(answers);
  const businessTypeGroup = deriveBusinessTypeGroup(answers.business_type);
  const friction = deriveOperationalFriction(answers, painAreaCount);
  const costObjectionFlag = answers.ai_non_adoption_reason === "cost_or_budget_concern";
  const grantInterestGroup = deriveGrantInterestGroup(answers.grant_awareness);
  const competitiveAdvantageGroup = deriveCompetitiveAdvantageGroup(answers.competitive_advantage_belief);
  const opportunity = deriveAiOpportunity(answers, friction.group);
  const readiness = deriveReadiness(answers, grantInterestGroup, competitiveAdvantageGroup);
  const urgencyGroup = deriveUrgencyGroup(answers.urgency);

  // 3. AI goal override
  branch = applyAiGoalOverride(branch, answers.ai_goal, friction.group);

  // 4. Lead temperature classification
  let leadTemperature = classifyLeadTemperature({
    answers,
    branch,
    painAreaCount,
    companyFitGroup,
    operationalFrictionGroup: friction.group,
    operationalFrictionScore: friction.score,
    aiOpportunityGroup: opportunity.group,
    readinessGroup: readiness.group,
    grantInterestGroup,
    competitiveAdvantageGroup,
    urgencyGroup
  });

  // 5. Capability gap readiness override
  branch = applyCapabilityGapOverride(branch, answers, friction.group, leadTemperature);

  // 6. Commercial caps and overrides
  leadTemperature = applyCommercialCaps({
    leadTemperature,
    answers,
    branch,
    companyFitGroup,
    operationalFrictionGroup: friction.group,
    operationalFrictionScore: friction.score,
    competitiveAdvantageGroup,
    urgencyGroup
  });

  // 7. Result code, report, page variant, policies, kickers
  const resultCode = assignResultCode({ leadTemperature, branch, companyFitGroup, frictionGroup: friction.group });
  const report = getReportByResultCode(resultCode);
  const resultPageVariant = getResultPageVariant(resultCode);
  const policies = getDeliveryPolicies(leadTemperature);
  const resultPageKickers = getResultPageKickers({
    leadTemperature,
    answers,
    costObjectionFlag,
    grantInterestGroup,
    competitiveAdvantageGroup,
    currentAiUse: answers.current_ai_use
  });

  // 8. Lead score
  const leadScore = calculateLeadScore({
    leadTemperature,
    answers,
    companyFitGroup,
    businessTypeGroup,
    operationalFrictionGroup: friction.group,
    aiOpportunityGroup: opportunity.group,
    readinessGroup: readiness.group,
    grantInterestGroup,
    competitiveAdvantageGroup,
    costObjectionFlag
  });

  // 9. CRM tags
  const crmTags = buildCrmTags({
    branch,
    leadTemperature,
    resultCode,
    reportKey: report.report_key,
    companyFitGroup,
    businessType: answers.business_type,
    businessTypeGroup,
    frictionGroup: friction.group,
    opportunityGroup: opportunity.group,
    readinessGroup: readiness.group,
    grantInterestGroup,
    competitiveAdvantageGroup,
    urgencyGroup,
    answers
  });

  return {
    assessment: "ai_automation",
    track: "ai_automation",
    branch,
    result_code: resultCode,
    lead_temperature: leadTemperature,
    lead_temperature_ui: policies.lead_temperature_ui,
    lead_score: leadScore,
    company_fit_group: companyFitGroup,
    business_type_group: businessTypeGroup,
    operational_friction_group: friction.group,
    operational_friction_score: friction.score,
    ai_opportunity_group: opportunity.group,
    ai_opportunity_score: opportunity.score,
    readiness_group: readiness.group,
    readiness_score: readiness.score,
    urgency_group: urgencyGroup,
    cost_objection_flag: costObjectionFlag,
    grant_interest_group: grantInterestGroup,
    competitive_advantage_group: competitiveAdvantageGroup,
    report_key: report.report_key,
    report_title: report.report_title,
    result_page_variant: resultPageVariant,
    result_page_kickers: resultPageKickers,
    result_page_booking_policy: policies.result_page_booking_policy,
    report_booking_prompt_policy: policies.report_booking_prompt_policy,
    email_booking_policy: policies.email_booking_policy,
    business_email_required: true,
    personal_email_blocked: true,
    crm_tags: crmTags,
    answers
  };
}
```

---

# 17. Test Cases

| Case | Expected outcome ||---|---|---|| 21 to 50 employees, 2 time areas including customer/sales pain, urgent, believes AI gives advantage | `AI_CUSTOMER_REVENUE_HOT`, RP03 || 51 to 200 employees, 3+ time areas, scalable operating system goal, within 6 months | `AI_OPERATING_LEVERAGE_WARM`, RP02 (above-target cap) || 5 to 10 employees, finance/reporting pain, willing to explore grants, within 6 months | `AI_FINANCE_BACKOFFICE_WARM`, RP06; potential Hot if friction strong || Established SME, key person bottleneck and information everywhere, productivity goal, within 3 months | `AI_INTERNAL_WORKFLOW_HOT`, RP07 || Barely uses AI, cost concern, customer pain exists, willing to try grants, urgent | Hot via `customer_revenue_ops`, but if 7.6 override applies → `AI_CAPABILITY_GAP_HOT`, RP09 || Barely uses AI, does not think they need it, not urgent, low pain | `AI_LOW_FRICTION_COLD`, RP12 || Idea-stage, 1 to 4 employees, no pain, not urgent | `AI_TOO_EARLY_COLD`, RP12 || AI already embedded, no pain, not urgent | `AI_LOW_FRICTION_COLD`, RP12 || Competitors already ahead, strong friction, within 6 months | Hot if opportunity high; Warm otherwise || Grant curiosity only, no pain, not urgent | Cold, no sales notification || Only `not_sure_team_feels_busy` selected, established SME, urgent, strong advantage belief | `AI_CAPABILITY_GAP_HOT` if all gates met, otherwise `AI_CAPABILITY_GAP_WARM` || All seven concrete pain areas, accounting firm, urgent, build OS goal | `AI_OPERATING_LEVERAGE_HOT`, RP01 || 11 to 20 employees, moderate friction, low urgency, but strong advantage belief | `AI_OPERATING_LEVERAGE_WARM_LOW` or branch-specific WARM_LOW, RP02/04/06/08 |

---

# 18. Final Coding Notes

```
1. Do not expose lead_score to users.
2. Do not expose raw friction, opportunity, or readiness scores to users.
3. Do not show the booking button before the email form is submitted.
4. Do not show a booking button for warm, warm_low, or cold users on the result page.
5. Hot users see a booking button only after valid business email submission.
6. Cold emails must not contain discovery call language.
7. Funding language must always include eligibility qualification.
8. Grant curiosity alone must not create a Hot lead.
9. Competitive advantage belief alone must not create a Hot lead.
10. Cost objection should trigger funding kicker and capability roadmap logic where appropriate.
11. The report attachment is determined by report_key.
12. The result page variant is determined by result_code.
13. The result page should use kickers to educate and reinforce the diagnosis.
14. The assessment itself should stay short and direct.
15. warm_low must never appear on the user interface. Display it as Potential fit.
```

---

# 19. QA Checklist

```
[ ] No annual revenue or revenue range is requested anywhere.
[ ] Q1 captures broad business stage only.
[ ] Q2 captures employee count with 5 to 50 as the primary target range.
[ ] More than 50 employees is above-target and cannot become Hot automatically.
[ ] Business type is captured as a required assessment question.
[ ] Q4 with 3+ concrete pain areas routes to ai_operating_system unless none_of_the_above is selected.
[ ] ai_goal = build_scalable_operating_system upgrades to ai_operating_system when friction is not low.
[ ] Capability gap cannot override a concrete use-case branch via Q4 priority logic.
[ ] Capability gap may be assigned via the readiness override in section 7.6 only after warm or warm_low classification.
[ ] Warm Low exists internally and maps to user-facing "Potential fit".
[ ] Lead score base values are 70 / 40 / 30 / 10.
[ ] Warm and Warm Low do not show a booking CTA on the result page.
[ ] Cold users do not show a booking CTA on the result page.
[ ] Personal email domains are blocked at the form layer.
[ ] Sales notification fires for hot, and for warm with lead_score >= 70.
[ ] Sales notification does not auto-fire for above_target_fit Hot leads.
[ ] Funding language is qualified and never claims automatic entitlement.
[ ] Grant awareness alone never produces a Hot lead.
[ ] Competitive advantage alone never produces a Hot lead.
[ ] Every result code maps to exactly one result page variant.
[ ] Every result page variant maps to exactly one report key.
[ ] Q9 uses the six-option set (V4) and matches the answer keys defined in section 4.10.
[ ] The structured result object in section 15 contains all required fields.
```

