export type Track = "ai_automation";

export type ResultCode =
  | "AI_OPERATING_LEVERAGE_HOT"
  | "AI_OPERATING_LEVERAGE_WARM"
  | "AI_OPERATING_LEVERAGE_WARM_LOW"
  | "AI_CUSTOMER_REVENUE_HOT"
  | "AI_CUSTOMER_REVENUE_WARM"
  | "AI_CUSTOMER_REVENUE_WARM_LOW"
  | "AI_FINANCE_BACKOFFICE_HOT"
  | "AI_FINANCE_BACKOFFICE_WARM"
  | "AI_FINANCE_BACKOFFICE_WARM_LOW"
  | "AI_INTERNAL_WORKFLOW_HOT"
  | "AI_INTERNAL_WORKFLOW_WARM"
  | "AI_INTERNAL_WORKFLOW_WARM_LOW"
  | "AI_CAPABILITY_GAP_HOT"
  | "AI_CAPABILITY_GAP_WARM"
  | "AI_CAPABILITY_GAP_WARM_LOW"
  | "AI_STARTER_EXPLORATION_WARM"
  | "AI_TOO_EARLY_COLD"
  | "AI_LOW_FRICTION_COLD"
  | "AI_NO_CLEAR_NEED_COLD";

export type ReportKey =
  | "ai_operating_system_blueprint"
  | "ai_customer_revenue_automation"
  | "ai_finance_backoffice_automation"
  | "ai_workflow_automation_diagnostic"
  | "ai_capability_partner_roadmap"
  | "ai_automation_starter_guide";

export type ResultPageVariant =
  | "RP01" | "RP02" | "RP03" | "RP04" | "RP05" | "RP06"
  | "RP07" | "RP08" | "RP09" | "RP10" | "RP11" | "RP12";

export type ResultPageKicker = "failure_kicker" | "timing_kicker" | "funding_kicker";

export type ResultPageBookingPolicy =
  | "show_strong_booking_after_submit"
  | "hide_booking";

export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  track: "ai_automation";
  order: number;
  type: "single_select" | "multi_select";
  prompt: string;
  helper?: string;
  options: Option[];
  required: boolean;
  maxSelect?: number;
  exclusiveOption?: string; // option id that clears all others when toggled
}

export const QUESTIONS: Question[] = [

  // Q1. Company stage
  {
    id: "company_stage",
    track: "ai_automation",
    order: 1,
    type: "single_select",
    prompt: "What stage is your business at today?",
    required: true,
    options: [
      { id: "idea_or_pre_revenue",              label: "Idea stage or pre-revenue" },
      { id: "early_revenue_startup",             label: "Early revenue business" },
      { id: "funded_startup_seed_to_series_a",   label: "Funded startup, Seed to Series A" },
      { id: "growth_stage_company",              label: "Growing SME" },
      { id: "established_sme",                   label: "Established SME" },
      { id: "multi_entity_or_regional_business", label: "Multi-entity or regional business" },
    ],
  },

  // Q2. Employee count
  {
    id: "employee_count",
    track: "ai_automation",
    order: 2,
    type: "single_select",
    prompt: "How many people are currently in the company?",
    required: true,
    options: [
      { id: "1_to_4",        label: "1 to 4" },
      { id: "5_to_10",       label: "5 to 10" },
      { id: "11_to_20",      label: "11 to 20" },
      { id: "21_to_50",      label: "21 to 50" },
      { id: "51_to_200",     label: "51 to 200" },
      { id: "more_than_200", label: "More than 200" },
    ],
  },

  // Q3. Business type
  {
    id: "business_type",
    track: "ai_automation",
    order: 3,
    type: "single_select",
    prompt: "What type of business are you?",
    required: true,
    options: [
      { id: "accounting_finance_firm",           label: "Accounting, finance, tax, audit, or bookkeeping firm" },
      { id: "professional_services_firm",         label: "Professional services, consulting, agency, or advisory firm" },
      { id: "healthcare_education_training",      label: "Healthcare, education, training, or enrichment business" },
      { id: "retail_ecommerce_distribution",      label: "Retail, e-commerce, distribution, or trading business" },
      { id: "manufacturing_logistics_operations", label: "Manufacturing, logistics, operations, or field service business" },
      { id: "technology_saas_digital",            label: "Technology, SaaS, or digital product company" },
      { id: "content_marketing_media",            label: "Content, marketing, media, or creative business" },
      { id: "other_sme_service_business",         label: "Other SME or service business" },
    ],
  },

  // Q4. Team time spend — multi-select, max 3, none_of_the_above is exclusive
  {
    id: "team_time_spend",
    track: "ai_automation",
    order: 4,
    type: "multi_select",
    prompt: "Where does your team spend the most time?",
    helper: "Select up to 3.",
    required: true,
    maxSelect: 3,
    exclusiveOption: "none_of_the_above",
    options: [
      { id: "admin_data_entry_documents",               label: "Admin, data entry, or document preparation" },
      { id: "customer_replies_support_followups",       label: "Customer replies, support requests, or follow-ups" },
      { id: "sales_followups_proposals_crm",            label: "Sales follow-ups, proposals, or CRM updates" },
      { id: "finance_reporting_invoicing_tracking",     label: "Finance, reporting, invoicing, or internal tracking" },
      { id: "internal_coordination_handover_approvals", label: "Internal coordination, handovers, reminders, or approvals" },
      { id: "meeting_notes_summaries_documentation",    label: "Meeting notes, summaries, documentation, or knowledge capture" },
      { id: "research_content_marketing_campaigns",     label: "Research, content, marketing, or campaign work" },
      { id: "not_sure_team_feels_busy",                 label: "I am not sure, but the team always feels busy" },
      { id: "none_of_the_above",                        label: "None of the above" },
    ],
  },

  // Q5. Key-person dependency
  {
    id: "key_person_dependency",
    track: "ai_automation",
    order: 5,
    type: "single_select",
    prompt: "What happens when a key person is busy or on leave?",
    required: true,
    options: [
      { id: "work_slows_down_immediately",           label: "Work slows down immediately" },
      { id: "decisions_get_delayed",                 label: "Decisions get delayed" },
      { id: "customers_or_internal_teams_wait",      label: "Customers, leads, or internal teams wait longer than they should" },
      { id: "someone_can_cover_but_context_missing", label: "Someone else can cover, but context is often missing" },
      { id: "business_continues_smoothly",           label: "The business continues smoothly because processes are clear" },
    ],
  },

  // Q6. Information fragmentation
  {
    id: "information_fragmentation",
    track: "ai_automation",
    order: 6,
    type: "single_select",
    prompt: "Is your important information everywhere, in emails, WhatsApp, spreadsheets, or staff knowledge?",
    required: true,
    options: [
      { id: "yes_information_is_everywhere",     label: "Yes, important information is everywhere" },
      { id: "somewhat_can_find_but_takes_time",  label: "Somewhat. We can find it, but it takes time" },
      { id: "documented_but_not_connected",      label: "Most information is documented, but not connected into workflows" },
      { id: "mostly_organised_easy_to_retrieve", label: "No, our information is mostly organised and easy to retrieve" },
      { id: "not_sure",                          label: "I am not sure" },
    ],
  },

  // Q7. Current AI use
  {
    id: "current_ai_use",
    track: "ai_automation",
    order: 7,
    type: "single_select",
    prompt: "Which statement best describes your current use of AI?",
    required: true,
    options: [
      { id: "barely_use_ai",                      label: "We barely use AI" },
      { id: "staff_use_chatgpt_individually",      label: "Some staff use ChatGPT or similar tools individually" },
      { id: "use_ai_tools_but_no_company_system",  label: "We use AI tools, but there is no company-wide system" },
      { id: "some_workflows_automated_basic",      label: "We have automated some workflows, but they are still basic" },
      { id: "ai_embedded_in_core_processes",       label: "AI is already embedded into core business processes" },
    ],
  },

  // Q7A. Non-adoption reason — only shown when current_ai_use = barely_use_ai
  {
    id: "ai_non_adoption_reason",
    track: "ai_automation",
    order: 8,
    type: "single_select",
    prompt: "What is your biggest reason for not using AI?",
    required: true,
    options: [
      { id: "cost_or_budget_concern",              label: "Cost or budget concern" },
      { id: "do_not_know_where_to_start",          label: "We do not know where to start" },
      { id: "lack_internal_technical_capability",  label: "We do not have the internal technical capability" },
      { id: "team_too_busy_to_implement",          label: "The team is too busy to implement it" },
      { id: "not_sure_ai_will_work_for_us",        label: "We are not sure AI will actually work for our business" },
      { id: "security_data_privacy_concern",       label: "Security, data, or privacy concerns" },
      { id: "do_not_think_we_need_it_yet",         label: "We do not think we need it yet" },
    ],
  },

  // Q8. Grant awareness
  {
    id: "grant_awareness",
    track: "ai_automation",
    order: 9,
    type: "single_select",
    prompt: "Did you know Singapore SMEs may be able to access cost support for qualified AI deployments?",
    helper: "Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position. It may include grants, consulting support, cloud support, and tax deductions.",
    required: true,
    options: [
      { id: "yes_aware",             label: "Yes" },
      { id: "no_not_aware",          label: "No" },
      { id: "no_but_willing_to_try", label: "No, but I am willing to try" },
      { id: "not_relevant",          label: "Not relevant to us" },
      { id: "not_sure",              label: "I am not sure" },
    ],
  },

  // Q9. AI goal — 6-option canonical set (master section 4.10)
  {
    id: "ai_goal",
    track: "ai_automation",
    order: 10,
    type: "single_select",
    prompt: "What do you hope to achieve with AI?",
    required: true,
    options: [
      { id: "reduce_manual_work",          label: "Reduce manual work and repetitive admin" },
      { id: "improve_response_time",       label: "Improve response time for customers, leads, or internal teams" },
      { id: "make_information_retrievable", label: "Make information easier to find and reuse" },
      { id: "automate_finance_backoffice", label: "Automate finance, reporting, invoicing, or back-office workflows" },
      { id: "build_scalable_operating_system", label: "Build a scalable AI-enabled operating system" },
      { id: "exploring_not_sure",          label: "We are exploring and not sure yet" },
    ],
  },

  // Q10. Competitive advantage belief
  {
    id: "competitive_advantage_belief",
    track: "ai_automation",
    order: 11,
    type: "single_select",
    prompt: "Do you think you would have a competitive advantage if you implemented AI today?",
    required: true,
    options: [
      { id: "yes_meaningful_advantage",      label: "Yes, it would give us a meaningful advantage" },
      { id: "maybe_some_advantage",          label: "Maybe, but I am not sure how much" },
      { id: "not_sure_not_thought_about_it", label: "Not sure, I have not thought about it that way" },
      { id: "no_not_much_advantage",         label: "No, I do not think it would change much" },
      { id: "competitors_already_ahead",     label: "Our competitors are probably already ahead" },
    ],
  },

  // Q11. Urgency
  {
    id: "urgency",
    track: "ai_automation",
    order: 12,
    type: "single_select",
    prompt: "How urgent is this for you right now?",
    required: true,
    options: [
      { id: "need_to_fix_immediately", label: "We need to fix this immediately" },
      { id: "within_3_months",         label: "We want to solve this within the next 3 months" },
      { id: "within_6_months",         label: "We are exploring options for the next 6 months" },
      { id: "exploring_for_later",     label: "It is interesting, but not urgent" },
      { id: "not_urgent",              label: "We are not currently looking to act" },
    ],
  },
];

// Base question order — routing.ts inserts ai_non_adoption_reason conditionally after current_ai_use
export const BASE_QUESTION_ORDER = [
  "company_stage",
  "employee_count",
  "business_type",
  "team_time_spend",
  "key_person_dependency",
  "information_fragmentation",
  "current_ai_use",
  "grant_awareness",
  "ai_goal",
  "competitive_advantage_belief",
  "urgency",
] as const;

export const CONDITIONAL_ORDER_WITH_Q7A = [
  "company_stage",
  "employee_count",
  "business_type",
  "team_time_spend",
  "key_person_dependency",
  "information_fragmentation",
  "current_ai_use",
  "ai_non_adoption_reason",
  "grant_awareness",
  "ai_goal",
  "competitive_advantage_belief",
  "urgency",
] as const;
