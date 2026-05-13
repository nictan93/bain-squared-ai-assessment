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
  helper?: string; // shown below label in the option card
}

export interface Question {
  id: string;
  track: "ai_automation";
  order: number;
  type: "single_select" | "multi_select";
  prompt: string;
  helper?: string; // shown below the question prompt
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
      {
        id: "idea_or_pre_revenue",
        label: "Idea stage or pre-revenue",
        helper: "That is completely normal. You may still be shaping the offer, testing demand, or working toward your first paying customers.",
      },
      {
        id: "early_revenue_startup",
        label: "Early revenue business",
        helper: "You have started proving demand, but much of the business may still rely on founder effort, manual work, and informal processes.",
      },
      {
        id: "funded_startup_seed_to_series_a",
        label: "Funded startup, Seed to Series A",
        helper: "The business is moving faster, with more pressure to scale operations, improve execution, and show progress clearly.",
      },
      {
        id: "growth_stage_company",
        label: "Growing SME",
        helper: "You have an operating business with increasing activity, and growth may be starting to expose process gaps or capacity strain.",
      },
      {
        id: "established_sme",
        label: "Established SME",
        helper: "The business is stable and proven, but there may still be opportunities to reduce manual work and improve operating efficiency.",
      },
      {
        id: "multi_entity_or_regional_business",
        label: "Multi-entity or regional business",
        helper: "With more business units, markets, or entities involved, coordination and workflow complexity usually become harder to manage manually.",
      },
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
      {
        id: "1_to_4",
        label: "1 to 4",
        helper: "A very lean team where most people are likely wearing multiple hats and processes are still highly informal.",
      },
      {
        id: "5_to_10",
        label: "5 to 10",
        helper: "A small core team where repeated tasks, handovers, and day-to-day coordination may be starting to consume more time.",
      },
      {
        id: "11_to_20",
        label: "11 to 20",
        helper: "The team is growing, and this is often when businesses start needing clearer workflows, better documentation, and less reliance on memory.",
      },
      {
        id: "21_to_50",
        label: "21 to 50",
        helper: "At this size, different functions begin to depend on one another more heavily, making workflow efficiency and information flow increasingly important.",
      },
      {
        id: "51_to_200",
        label: "51 to 200",
        helper: "The business has meaningful operating complexity, where fragmented processes and manual work can create significant drag if left unchecked.",
      },
      {
        id: "more_than_200",
        label: "More than 200",
        helper: "You are operating at larger scale, where AI opportunities may exist, though the scope and implementation usually require a more tailored approach.",
      },
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
      {
        id: "accounting_finance_firm",
        label: "Accounting, finance, tax, audit, or bookkeeping firm",
        helper: "These businesses often handle large volumes of documents, client requests, repetitive reviews, and finance-related workflows that may be highly automatable.",
      },
      {
        id: "professional_services_firm",
        label: "Professional services, consulting, agency, or advisory firm",
        helper: "Client delivery, proposals, research, reporting, and follow-ups can create a surprising amount of repeatable coordination work.",
      },
      {
        id: "healthcare_education_training",
        label: "Healthcare, education, training, or enrichment business",
        helper: "These businesses often manage scheduling, inquiries, follow-ups, records, and recurring admin work across customers, students, or patients.",
      },
      {
        id: "retail_ecommerce_distribution",
        label: "Retail, e-commerce, distribution, or trading business",
        helper: "Product, order, customer, inventory, supplier, and sales workflows can become time-intensive as transaction volume rises.",
      },
      {
        id: "manufacturing_logistics_operations",
        label: "Manufacturing, logistics, operations, or field service business",
        helper: "Operational businesses often rely on approvals, dispatching, documentation, reporting, and handovers that can become bottlenecks at scale.",
      },
      {
        id: "technology_saas_digital",
        label: "Technology, SaaS, or digital product company",
        helper: "Even digital-first companies often carry manual work across customer support, sales ops, product feedback, reporting, and internal coordination.",
      },
      {
        id: "content_marketing_media",
        label: "Content, marketing, media, or creative business",
        helper: "Research, production workflows, campaign planning, approvals, revisions, and publishing routines can create repetitive workload behind the scenes.",
      },
      {
        id: "other_sme_service_business",
        label: "Other SME or service business",
        helper: "Many service businesses have repeatable tasks, information handoffs, and customer-facing workflows that can be improved with the right automation.",
      },
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
      {
        id: "admin_data_entry_documents",
        label: "Admin, data entry, or document preparation",
        helper: "Repetitive copy-pasting, form filling, document formatting, and manual admin can quietly consume a large amount of team capacity.",
      },
      {
        id: "customer_replies_support_followups",
        label: "Customer replies, support requests, or follow-ups",
        helper: "When similar questions and updates keep coming in, response quality and speed can start depending too much on team bandwidth.",
      },
      {
        id: "sales_followups_proposals_crm",
        label: "Sales follow-ups, proposals, or CRM updates",
        helper: "Valuable sales time may be getting pulled into chasing leads, preparing repetitive materials, or keeping pipeline records current.",
      },
      {
        id: "finance_reporting_invoicing_tracking",
        label: "Finance, reporting, invoicing, or internal tracking",
        helper: "These tasks are essential, but if too much of them are handled manually, the business may lose time and accuracy.",
      },
      {
        id: "internal_coordination_handover_approvals",
        label: "Internal coordination, handovers, reminders, or approvals",
        helper: "Work may be moving, but only because someone is constantly following up, nudging, or keeping track of what should happen next.",
      },
      {
        id: "meeting_notes_summaries_documentation",
        label: "Meeting notes, summaries, documentation, or knowledge capture",
        helper: "Important conversations may be happening, but the team still has to spend too much effort turning them into usable next steps or reference materials.",
      },
      {
        id: "research_content_marketing_campaigns",
        label: "Research, content, marketing, or campaign work",
        helper: "The work is valuable, but parts of the process may involve repeated searching, drafting, repurposing, or coordination that can be streamlined.",
      },
      {
        id: "not_sure_team_feels_busy",
        label: "I am not sure, but the team always feels busy",
        helper: "That is often a useful signal on its own. The friction may be spread across several workflows rather than sitting in one obvious place.",
      },
      {
        id: "none_of_the_above",
        label: "None of the above",
        helper: "That is fine. Your biggest time drain may sit in a more specific or less common workflow that needs a closer look.",
      },
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
      {
        id: "work_slows_down_immediately",
        label: "Work slows down immediately",
        helper: "That usually means too much process knowledge or execution sits with one person, making the business harder to scale reliably.",
      },
      {
        id: "decisions_get_delayed",
        label: "Decisions get delayed",
        helper: "When approvals or next steps depend on one individual, even routine work can stall unnecessarily.",
      },
      {
        id: "customers_or_internal_teams_wait",
        label: "Customers, leads, or internal teams wait longer than they should",
        helper: "This suggests the dependency is affecting service levels, response times, or commercial momentum, not just internal convenience.",
      },
      {
        id: "someone_can_cover_but_context_missing",
        label: "Someone else can cover, but context is often missing",
        helper: "The work continues, but gaps in documentation, handover, or system visibility make the process slower and more error-prone.",
      },
      {
        id: "business_continues_smoothly",
        label: "The business continues smoothly because processes are clear",
        helper: "That is a strong sign of operational maturity. The work is supported by clear systems, documentation, and ownership.",
      },
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
      {
        id: "yes_information_is_everywhere",
        label: "Yes, important information is everywhere",
        helper: "When context is scattered across tools and people, teams spend too much time searching, confirming, and recreating what already exists.",
      },
      {
        id: "somewhat_can_find_but_takes_time",
        label: "Somewhat. We can find it, but it takes time",
        helper: "The information exists, but retrieval still depends on manual searching, asking around, or knowing exactly where to look.",
      },
      {
        id: "documented_but_not_connected",
        label: "Most information is documented, but not connected into workflows",
        helper: "Documentation is a good start, but if it sits separately from daily work, teams may still struggle to act on it efficiently.",
      },
      {
        id: "mostly_organised_easy_to_retrieve",
        label: "No, our information is mostly organised and easy to retrieve",
        helper: "That is a solid foundation. Clear information flow makes automation and scaling much easier.",
      },
      {
        id: "not_sure",
        label: "I am not sure",
        helper: "That is understandable. Information problems often stay invisible until the business grows or someone important becomes unavailable.",
      },
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
      {
        id: "barely_use_ai",
        label: "We barely use AI",
        helper: "That is completely normal. You may still be observing the space, testing small ideas, or unsure where AI would be genuinely useful.",
      },
      {
        id: "staff_use_chatgpt_individually",
        label: "Some staff use ChatGPT or similar tools individually",
        helper: "AI is already entering the business informally, but usage may depend on individual habits rather than a clear company-wide approach.",
      },
      {
        id: "use_ai_tools_but_no_company_system",
        label: "We use AI tools, but there is no company-wide system",
        helper: "You have started experimenting with AI, though the tools may still sit separately from your workflows, data, and operating processes.",
      },
      {
        id: "some_workflows_automated_basic",
        label: "We have automated some workflows, but they are still basic",
        helper: "That is a meaningful step forward. You have moved beyond experimentation and started applying automation to real business tasks.",
      },
      {
        id: "ai_embedded_in_core_processes",
        label: "AI is already embedded into core business processes",
        helper: "You have a mature starting point. AI is not just a tool on the side, but part of how the business operates day to day.",
      },
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
      {
        id: "cost_or_budget_concern",
        label: "Cost or budget concern",
        helper: "You may see the potential, but worry that implementation, software, or ongoing support will be too expensive to justify.",
      },
      {
        id: "do_not_know_where_to_start",
        label: "We do not know where to start",
        helper: "The opportunity feels broad, but it is not yet clear which workflow to tackle first or what a sensible roadmap should look like.",
      },
      {
        id: "lack_internal_technical_capability",
        label: "We do not have the internal technical capability",
        helper: "You may lack the in-house people needed to design, deploy, maintain, or troubleshoot AI-enabled workflows.",
      },
      {
        id: "team_too_busy_to_implement",
        label: "The team is too busy to implement it",
        helper: "Ironically, the same manual workload that AI could reduce may also be stopping the team from stepping back to fix it.",
      },
      {
        id: "not_sure_ai_will_work_for_us",
        label: "We are not sure AI will actually work for our business",
        helper: "That is a fair concern. The question is not whether AI is popular, but whether it can solve a real problem in your specific operating model.",
      },
      {
        id: "security_data_privacy_concern",
        label: "Security, data, or privacy concerns",
        helper: "If your business handles sensitive information, it makes sense to be cautious about how AI tools access, process, and store data.",
      },
      {
        id: "do_not_think_we_need_it_yet",
        label: "We do not think we need it yet",
        helper: "Your current setup may still feel manageable, especially if manual work has not yet become a clear growth or efficiency problem.",
      },
    ],
  },

  // Q8. Funding practicality (replaces grant_awareness per master spec section 4.9)
  {
    id: "funding_practicality",
    track: "ai_automation",
    order: 9,
    type: "single_select",
    prompt: "Even where AI projects may qualify for cost support, businesses may still need to manage the upfront investment first. Which best describes your situation?",
    helper: "Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position. Some schemes may operate on a claim or reimbursement basis, so upfront cash flow can still matter.",
    required: true,
    options: [
      {
        id: "upfront_cost_matters",
        label: "We are open to AI, but the upfront cost would matter",
        helper: "Support may help, but we would still need the initial investment to feel manageable.",
      },
      {
        id: "need_cost_staged_or_structured",
        label: "We would be more willing to act if the cost can be staged or structured sensibly",
        helper: "The project may be attractive, but cash flow timing is a major part of the decision.",
      },
      {
        id: "open_to_support_if_available",
        label: "If support is available, we would be willing to explore it",
        helper: "We are open to assessing qualified schemes if they help make the project more viable.",
      },
      {
        id: "not_reliant_on_support",
        label: "We can consider AI without relying on grants or support",
        helper: "Funding support is useful, but it is not central to whether we would proceed.",
      },
      {
        id: "not_sure_how_support_works",
        label: "I am not sure how the support or claims process works",
        helper: "We may need a clearer view of eligibility, reimbursement timing, and what the business would still need to fund upfront.",
      },
    ],
  },

  // Q9. AI goal — 6-option canonical set (master spec section 4.10)
  {
    id: "ai_goal",
    track: "ai_automation",
    order: 10,
    type: "single_select",
    prompt: "What do you hope to achieve with AI?",
    required: true,
    options: [
      {
        id: "reduce_manual_work",
        label: "Reduce manual work and repetitive admin",
        helper: "The main priority is freeing up team time by reducing repetitive, low-value work that does not need constant human attention.",
      },
      {
        id: "improve_response_time",
        label: "Improve response time for customers, leads, or internal teams",
        helper: "You want the business to respond faster, follow up more consistently, and reduce delays that affect service or conversion.",
      },
      {
        id: "make_information_retrievable",
        label: "Make information easier to find and reuse",
        helper: "The goal is to stop losing time searching through documents, chats, and staff knowledge, and make useful information easier to act on.",
      },
      {
        id: "automate_finance_backoffice",
        label: "Automate finance, reporting, invoicing, or back-office workflows",
        helper: "You are looking to reduce friction in recurring operational processes that are often manual, time-sensitive, and easy to bottleneck.",
      },
      {
        id: "build_scalable_operating_system",
        label: "Build a scalable AI-enabled operating system",
        helper: "You are thinking beyond isolated tools and want AI to become part of a more efficient, connected way of running the business.",
      },
      {
        id: "exploring_not_sure",
        label: "We are exploring and not sure yet",
        helper: "That is a reasonable starting point. You may know AI could help, but still need clarity on the use case with the strongest business value.",
      },
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
      {
        id: "yes_meaningful_advantage",
        label: "Yes, it would give us a meaningful advantage",
        helper: "You believe AI could help the business operate faster, serve customers better, or deliver more without scaling headcount at the same rate.",
      },
      {
        id: "maybe_some_advantage",
        label: "Maybe, but I am not sure how much",
        helper: "You can see the potential upside, but the commercial impact still needs to be linked to specific workflows or business outcomes.",
      },
      {
        id: "not_sure_not_thought_about_it",
        label: "Not sure, I have not thought about it that way",
        helper: "You may be viewing AI mainly as a productivity tool so far, rather than as something that could reshape cost, speed, or differentiation.",
      },
      {
        id: "no_not_much_advantage",
        label: "No, I do not think it would change much",
        helper: "You may believe your edge comes from relationships, expertise, brand, or other factors that AI would not materially shift.",
      },
      {
        id: "competitors_already_ahead",
        label: "Our competitors are probably already ahead",
        helper: "You feel there may already be an adoption gap, and the concern is less about being first than about not falling further behind.",
      },
    ],
  },

  // Q11. Urgency (prompt and labels updated per master spec section 4.12)
  {
    id: "urgency",
    track: "ai_automation",
    order: 12,
    type: "single_select",
    prompt: "If there were a practical, cost efficient AI solution that clearly addressed this for your business, how quickly would you want to act on it?",
    required: true,
    options: [
      {
        id: "need_to_fix_immediately",
        label: "We would want to act immediately",
        helper: "The issue feels live, and you would be ready to explore a credible AI solution now.",
      },
      {
        id: "within_3_months",
        label: "We would likely act within the next 3 months",
        helper: "This is a near-term priority, even if you still need to review the scope, cost, and implementation approach internally.",
      },
      {
        id: "within_6_months",
        label: "We would consider acting within the next 6 months",
        helper: "The need is real, but you are still planning the right timing, use case, and budget before moving forward.",
      },
      {
        id: "exploring_for_later",
        label: "It matters, but we are not ready to act yet",
        helper: "You recognise the opportunity, but it is not high enough on the agenda to move forward soon.",
      },
      {
        id: "not_urgent",
        label: "I am not sure yet",
        helper: "You may still be deciding whether this is a problem worth solving now or an opportunity to keep monitoring.",
      },
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
  "funding_practicality",
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
  "funding_practicality",
  "ai_goal",
  "competitive_advantage_belief",
  "urgency",
] as const;
