import type {
  ResultCode,
  ReportKey,
  ResultPageVariant,
  ResultPageKicker,
  ResultPageBookingPolicy,
} from "@/content/questions";

// ── Public group types ────────────────────────────────────────────────────

export type LeadTemperature    = "hot" | "warm" | "cold";
export type LeadTemperatureUi  = "High fit" | "Potential fit" | "Education track";

export type CompanyFitGroup    = "strong_fit" | "moderate_fit" | "weak_fit" | "above_target_fit";
export type BusinessTypeGroup  = "accounting_finance" | "professional_services" | "commercial_ops" | "general_sme" | "other_business";
export type OperationalFrictionGroup = "strong_friction" | "moderate_friction" | "low_friction";
export type AiOpportunityGroup = "high_opportunity" | "moderate_opportunity" | "low_opportunity";
export type ReadinessGroup     = "high_readiness" | "moderate_readiness" | "low_readiness";
export type GrantInterestGroup = "grant_ready" | "grant_interested" | "grant_unaware_open" | "grant_not_relevant" | "grant_uncertain";
export type CompetitiveAdvantageGroup = "strong_advantage_belief" | "moderate_advantage_belief" | "uncertain_advantage" | "low_advantage_belief" | "competitors_ahead";
export type UseCaseGroup       = "ai_operating_system" | "customer_revenue_ops" | "finance_backoffice_ops" | "internal_ops_coordination" | "capability_gap" | "starter_exploration";

export interface FullResult {
  track: "ai_automation";
  resultCode: ResultCode;
  leadTemperature: LeadTemperature;
  leadTemperatureUi: LeadTemperatureUi;
  leadScore: number;
  companyFitGroup: CompanyFitGroup;
  businessTypeGroup: BusinessTypeGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  operationalFrictionScore: number;
  aiOpportunityGroup: AiOpportunityGroup;
  aiOpportunityScore: number;
  readinessGroup: ReadinessGroup;
  readinessScore: number;
  costObjectionFlag: boolean;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  useCaseGroup: UseCaseGroup;
  reportKey: ReportKey;
  resultPageVariant: ResultPageVariant;
  resultPageKickers: ResultPageKicker[];
  resultPageBookingPolicy: ResultPageBookingPolicy;
  emailBookingPolicy: "include_booking_link" | "hide_booking_link";
  reportBookingPromptPolicy: "strong_prompt" | "soft_prompt" | "no_prompt";
  crmTags: string[];
}

type Answers = Record<string, string | string[]>;

// ── Helpers ───────────────────────────────────────────────────────────────

const PAIN_AREA_IDS = new Set([
  "admin_data_entry_documents",
  "customer_replies_support_followups",
  "sales_followups_proposals_crm",
  "finance_reporting_invoicing_tracking",
  "internal_coordination_handover_approvals",
  "meeting_notes_summaries_documentation",
  "research_content_marketing_campaigns",
]);

function countPainAreas(teamTimeSpend: string[]): number {
  return teamTimeSpend.filter((id) => PAIN_AREA_IDS.has(id)).length;
}

function str(a: Answers, key: string): string {
  const v = a[key];
  return typeof v === "string" ? v : "";
}

function arr(a: Answers, key: string): string[] {
  const v = a[key];
  return Array.isArray(v) ? v : [];
}

// ── Section 4.1: Company Fit Group ────────────────────────────────────────

function deriveCompanyFitGroup(a: Answers): CompanyFitGroup {
  const emp   = str(a, "employee_count");
  const stage = str(a, "company_stage");

  if (emp === "51_to_200" || emp === "more_than_200") return "above_target_fit";
  if (emp === "5_to_10" || emp === "11_to_20" || emp === "21_to_50") return "strong_fit";
  if (emp === "1_to_4") {
    return stage === "idea_or_pre_revenue" ? "weak_fit" : "moderate_fit";
  }
  return "weak_fit";
}

// ── Section 4.2: Business Type Group ─────────────────────────────────────

function deriveBusinessTypeGroup(a: Answers): BusinessTypeGroup {
  switch (str(a, "business_type")) {
    case "accounting_finance_firm":            return "accounting_finance";
    case "professional_services_firm":         return "professional_services";
    case "retail_ecommerce_distribution":
    case "manufacturing_logistics_operations": return "commercial_ops";
    case "healthcare_education_training":
    case "technology_saas_digital":
    case "content_marketing_media":            return "general_sme";
    default:                                   return "other_business";
  }
}

// ── Section 4.3: Operational Friction ────────────────────────────────────

function deriveOperationalFriction(
  a: Answers,
  painAreaCount: number
): { score: number; group: OperationalFrictionGroup } {
  const timeSpend = arr(a, "team_time_spend");
  const kpd  = str(a, "key_person_dependency");
  const frag = str(a, "information_fragmentation");

  let teamScore = 0;
  if (painAreaCount >= 3)                                  teamScore = 5;
  else if (painAreaCount === 2)                            teamScore = 4;
  else if (painAreaCount === 1)                            teamScore = 2;
  else if (timeSpend.includes("not_sure_team_feels_busy")) teamScore = 1;

  const kpdScores: Record<string, number> = {
    work_slows_down_immediately:           5,
    decisions_get_delayed:                 4,
    customers_or_internal_teams_wait:      4,
    someone_can_cover_but_context_missing: 2,
    business_continues_smoothly:           0,
  };

  const fragScores: Record<string, number> = {
    yes_information_is_everywhere:     5,
    somewhat_can_find_but_takes_time:  3,
    documented_but_not_connected:      2,
    not_sure:                          1,
    mostly_organised_easy_to_retrieve: 0,
  };

  const keyPersonScore = kpdScores[kpd] ?? 0;
  const infoScore      = fragScores[frag] ?? 0;
  const score          = teamScore + keyPersonScore + infoScore;

  const highKpd = new Set(["work_slows_down_immediately", "decisions_get_delayed", "customers_or_internal_teams_wait"]);
  const isHighKpd = highKpd.has(kpd);

  let group: OperationalFrictionGroup;
  if (
    score >= 10 ||
    (painAreaCount >= 3 && isHighKpd) ||
    (frag === "yes_information_is_everywhere" && isHighKpd)
  ) {
    group = "strong_friction";
  } else if (score >= 5) {
    group = "moderate_friction";
  } else {
    group = "low_friction";
  }

  return { score, group };
}

// ── Section 4.4: AI Opportunity ───────────────────────────────────────────

function deriveAiOpportunity(
  a: Answers,
  frictionGroup: OperationalFrictionGroup
): { score: number; group: AiOpportunityGroup } {
  const aiUse      = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const goal       = str(a, "ai_goal");

  const aiUseScores: Record<string, number> = {
    barely_use_ai:                      4,
    staff_use_chatgpt_individually:     4,
    use_ai_tools_but_no_company_system: 4,
    some_workflows_automated_basic:     2,
    ai_embedded_in_core_processes:      0,
  };

  const nonAdoptionScores: Record<string, number> = {
    cost_or_budget_concern:             3,
    do_not_know_where_to_start:         4,
    lack_internal_technical_capability: 4,
    team_too_busy_to_implement:         4,
    not_sure_ai_will_work_for_us:       2,
    security_data_privacy_concern:      2,
    do_not_think_we_need_it_yet:        -4,
  };

  const goalScores: Record<string, number> = {
    reduce_manual_admin_work:               3,
    respond_to_customers_faster:            4,
    improve_sales_followup_conversion:      4,
    improve_reporting_visibility_decisions: 4,
    reduce_cost_without_hiring_more:        4,
    make_team_more_productive:              3,
    build_scalable_operating_system:        5,
    not_sure_yet:                           1,
  };

  const score =
    (aiUseScores[aiUse] ?? 0) +
    (aiUse === "barely_use_ai" ? (nonAdoptionScores[nonAdoption] ?? 0) : 0) +
    (goalScores[goal] ?? 0);

  let group: AiOpportunityGroup;
  if (
    (score >= 9 && frictionGroup !== "low_friction") ||
    (frictionGroup === "strong_friction" && goal !== "not_sure_yet")
  ) {
    group = "high_opportunity";
  } else if (score >= 5) {
    group = "moderate_opportunity";
  } else {
    group = "low_opportunity";
  }

  return { score, group };
}

// ── Section 4.5: Grant Interest Group ────────────────────────────────────

function deriveGrantInterestGroup(a: Answers): GrantInterestGroup {
  const map: Record<string, GrantInterestGroup> = {
    yes_aware:             "grant_ready",
    no_not_aware:          "grant_unaware_open",
    no_but_willing_to_try: "grant_interested",
    not_relevant:          "grant_not_relevant",
    not_sure:              "grant_uncertain",
  };
  return map[str(a, "grant_awareness")] ?? "grant_uncertain";
}

// ── Section 4.6: Competitive Advantage Group ──────────────────────────────

function deriveCompetitiveAdvantageGroup(a: Answers): CompetitiveAdvantageGroup {
  const map: Record<string, CompetitiveAdvantageGroup> = {
    yes_meaningful_advantage:      "strong_advantage_belief",
    maybe_some_advantage:          "moderate_advantage_belief",
    not_sure_not_thought_about_it: "uncertain_advantage",
    no_not_much_advantage:         "low_advantage_belief",
    competitors_already_ahead:     "competitors_ahead",
  };
  return map[str(a, "competitive_advantage_belief")] ?? "uncertain_advantage";
}

// ── Section 4.7: Readiness ────────────────────────────────────────────────

function deriveReadiness(
  a: Answers,
  grantInterestGroup: GrantInterestGroup,
  competitiveAdvantageGroup: CompetitiveAdvantageGroup
): { score: number; group: ReadinessGroup } {
  const urgency = str(a, "urgency");

  const urgencyScores: Record<string, number> = {
    need_to_fix_immediately: 5,
    within_3_months:         4,
    within_6_months:         2,
    exploring_for_later:     1,
    not_urgent:              0,
  };

  const grantScores: Record<GrantInterestGroup, number> = {
    grant_ready:        2,
    grant_interested:   3,
    grant_unaware_open: 2,
    grant_uncertain:    1,
    grant_not_relevant: 0,
  };

  const compScores: Record<CompetitiveAdvantageGroup, number> = {
    strong_advantage_belief:   4,
    moderate_advantage_belief: 2,
    competitors_ahead:         3,
    uncertain_advantage:       1,
    low_advantage_belief:      -2,
  };

  const score =
    (urgencyScores[urgency] ?? 0) +
    grantScores[grantInterestGroup] +
    compScores[competitiveAdvantageGroup];

  const nearUrgency = new Set(["need_to_fix_immediately", "within_3_months"]);
  const highCompAdv = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "competitors_ahead"]);

  let group: ReadinessGroup;
  if (score >= 8 || (nearUrgency.has(urgency) && highCompAdv.has(competitiveAdvantageGroup))) {
    group = "high_readiness";
  } else if (score >= 4) {
    group = "moderate_readiness";
  } else {
    group = "low_readiness";
  }

  return { score, group };
}

// ── Section 5: Use Case Group ─────────────────────────────────────────────

function deriveUseCaseGroup(
  a: Answers,
  painAreaCount: number,
  frictionGroup: OperationalFrictionGroup
): UseCaseGroup {
  const aiUse      = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const goal       = str(a, "ai_goal");
  const kpd        = str(a, "key_person_dependency");
  const frag       = str(a, "information_fragmentation");
  const bizType    = str(a, "business_type");
  const timeSpend  = arr(a, "team_time_spend");

  const nonAdoptionBlockers = new Set([
    "cost_or_budget_concern",
    "do_not_know_where_to_start",
    "lack_internal_technical_capability",
    "team_too_busy_to_implement",
    "not_sure_ai_will_work_for_us",
    "security_data_privacy_concern",
  ]);

  // 1. capability_gap (priority 1)
  if (
    (aiUse === "barely_use_ai" && nonAdoptionBlockers.has(nonAdoption) && frictionGroup !== "low_friction") ||
    (goal === "not_sure_yet" && frictionGroup !== "low_friction")
  ) return "capability_gap";

  // 2. ai_operating_system (priority 2)
  if (
    painAreaCount >= 3 ||
    goal === "build_scalable_operating_system" ||
    (
      (kpd === "work_slows_down_immediately" || kpd === "decisions_get_delayed") &&
      frag === "yes_information_is_everywhere"
    )
  ) return "ai_operating_system";

  // 3. customer_revenue_ops (priority 3)
  if (
    timeSpend.includes("customer_replies_support_followups") ||
    timeSpend.includes("sales_followups_proposals_crm") ||
    goal === "respond_to_customers_faster" ||
    goal === "improve_sales_followup_conversion"
  ) return "customer_revenue_ops";

  // 4. finance_backoffice_ops (priority 4)
  const financeGoals = new Set([
    "improve_reporting_visibility_decisions",
    "reduce_manual_admin_work",
    "reduce_cost_without_hiring_more",
    "make_team_more_productive",
    "not_sure_yet",
  ]);
  if (
    timeSpend.includes("finance_reporting_invoicing_tracking") ||
    goal === "improve_reporting_visibility_decisions" ||
    (bizType === "accounting_finance_firm" && financeGoals.has(goal))
  ) return "finance_backoffice_ops";

  // 5. internal_ops_coordination (priority 5)
  const opsTimeSpend = new Set([
    "admin_data_entry_documents",
    "internal_coordination_handover_approvals",
    "meeting_notes_summaries_documentation",
    "research_content_marketing_campaigns",
  ]);
  const opsGoals = new Set(["reduce_manual_admin_work", "reduce_cost_without_hiring_more", "make_team_more_productive"]);
  if (
    timeSpend.some((id) => opsTimeSpend.has(id)) ||
    kpd !== "business_continues_smoothly" ||
    frag !== "mostly_organised_easy_to_retrieve" ||
    opsGoals.has(goal)
  ) return "internal_ops_coordination";

  return "starter_exploration";
}

// ── Section 6: Lead Temperature ───────────────────────────────────────────

function classifyLeadTemperature(params: {
  a: Answers;
  painAreaCount: number;
  operationalFrictionGroup: OperationalFrictionGroup;
  aiOpportunityGroup: AiOpportunityGroup;
  readinessGroup: ReadinessGroup;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
}): LeadTemperature {
  const { a, painAreaCount, operationalFrictionGroup, aiOpportunityGroup, readinessGroup, grantInterestGroup, competitiveAdvantageGroup } = params;
  const urgency     = str(a, "urgency");
  const aiUse       = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const goal        = str(a, "ai_goal");
  const kpd         = str(a, "key_person_dependency");
  const frag        = str(a, "information_fragmentation");
  const timeSpend   = arr(a, "team_time_spend");

  // ── Forced cold rules ──────────────────────────────────────────────────
  if (
    timeSpend.includes("none_of_the_above") &&
    kpd === "business_continues_smoothly" &&
    frag === "mostly_organised_easy_to_retrieve" &&
    (urgency === "exploring_for_later" || urgency === "not_urgent")
  ) return "cold";

  if (nonAdoption === "do_not_think_we_need_it_yet" && urgency === "not_urgent") return "cold";

  if (
    aiUse === "ai_embedded_in_core_processes" &&
    operationalFrictionGroup === "low_friction" &&
    (urgency === "exploring_for_later" || urgency === "not_urgent")
  ) return "cold";

  // ── Hot rules ──────────────────────────────────────────────────────────
  const nearUrgency = new Set(["need_to_fix_immediately", "within_3_months"]);
  const midUrgency  = new Set(["need_to_fix_immediately", "within_3_months", "within_6_months"]);
  const highComp    = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "competitors_ahead"]);
  const grantHot    = new Set<GrantInterestGroup>(["grant_interested", "grant_ready", "grant_unaware_open"]);
  const hotGoals    = new Set(["reduce_cost_without_hiring_more", "make_team_more_productive", "build_scalable_operating_system"]);

  if (operationalFrictionGroup === "strong_friction" && aiOpportunityGroup === "high_opportunity" && nearUrgency.has(urgency)) return "hot";
  if (operationalFrictionGroup === "strong_friction" && aiOpportunityGroup === "high_opportunity" && readinessGroup === "high_readiness") return "hot";
  if (painAreaCount >= 3 && hotGoals.has(goal) && midUrgency.has(urgency)) return "hot";
  if (operationalFrictionGroup === "strong_friction" && highComp.has(competitiveAdvantageGroup) && midUrgency.has(urgency)) return "hot";
  if (operationalFrictionGroup === "strong_friction" && grantHot.has(grantInterestGroup) && nearUrgency.has(urgency)) return "hot";

  // ── Warm rules ─────────────────────────────────────────────────────────
  if (operationalFrictionGroup === "strong_friction") return "warm";
  if (operationalFrictionGroup === "moderate_friction" && (aiOpportunityGroup === "high_opportunity" || aiOpportunityGroup === "moderate_opportunity")) return "warm";

  const nonAdoptionWarm = new Set([
    "cost_or_budget_concern", "do_not_know_where_to_start", "lack_internal_technical_capability",
    "team_too_busy_to_implement", "not_sure_ai_will_work_for_us", "security_data_privacy_concern",
  ]);
  if (aiUse === "barely_use_ai" && nonAdoptionWarm.has(nonAdoption) && operationalFrictionGroup !== "low_friction") return "warm";

  const grantWarm = new Set<GrantInterestGroup>(["grant_interested", "grant_unaware_open"]);
  if (grantWarm.has(grantInterestGroup) && operationalFrictionGroup !== "low_friction") return "warm";

  const compWarm = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "moderate_advantage_belief", "competitors_ahead"]);
  if (compWarm.has(competitiveAdvantageGroup) && operationalFrictionGroup !== "low_friction") return "warm";

  return "cold";
}

// ── Section 7: Commercial Caps ────────────────────────────────────────────

function applyCommercialCaps(
  temperature: LeadTemperature,
  a: Answers,
  companyFitGroup: CompanyFitGroup,
  operationalFrictionGroup: OperationalFrictionGroup,
  operationalFrictionScore: number,
  competitiveAdvantageGroup: CompetitiveAdvantageGroup
): LeadTemperature {
  const urgency     = str(a, "urgency");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const highComp    = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "competitors_ahead"]);

  if (companyFitGroup === "above_target_fit" && temperature === "hot") return "warm";
  if (companyFitGroup === "weak_fit" && temperature === "hot" && operationalFrictionGroup !== "strong_friction") return "warm";

  if (urgency === "not_urgent" && temperature === "hot") {
    if (operationalFrictionScore >= 12 && highComp.has(competitiveAdvantageGroup)) return "hot";
    return "warm";
  }

  if (
    competitiveAdvantageGroup === "low_advantage_belief" &&
    (urgency === "exploring_for_later" || urgency === "not_urgent") &&
    temperature === "hot"
  ) return "warm";

  if (nonAdoption === "do_not_think_we_need_it_yet" && operationalFrictionGroup === "low_friction") return "cold";

  return temperature;
}

// ── Section 8: Result Code ────────────────────────────────────────────────

function assignResultCode(
  temperature: LeadTemperature,
  useCaseGroup: UseCaseGroup,
  companyFitGroup: CompanyFitGroup,
  operationalFrictionGroup: OperationalFrictionGroup
): ResultCode {
  if (temperature === "hot") {
    const hotMap: Record<UseCaseGroup, ResultCode> = {
      ai_operating_system:       "AI_OPERATING_LEVERAGE_HOT",
      customer_revenue_ops:      "AI_CUSTOMER_REVENUE_HOT",
      finance_backoffice_ops:    "AI_FINANCE_BACKOFFICE_HOT",
      internal_ops_coordination: "AI_INTERNAL_WORKFLOW_HOT",
      capability_gap:            "AI_CAPABILITY_GAP_HOT",
      starter_exploration:       "AI_CAPABILITY_GAP_HOT",
    };
    return hotMap[useCaseGroup];
  }
  if (temperature === "warm") {
    const warmMap: Record<UseCaseGroup, ResultCode> = {
      ai_operating_system:       "AI_OPERATING_LEVERAGE_WARM",
      customer_revenue_ops:      "AI_CUSTOMER_REVENUE_WARM",
      finance_backoffice_ops:    "AI_FINANCE_BACKOFFICE_WARM",
      internal_ops_coordination: "AI_INTERNAL_WORKFLOW_WARM",
      capability_gap:            "AI_CAPABILITY_GAP_WARM",
      starter_exploration:       "AI_STARTER_EXPLORATION_WARM",
    };
    return warmMap[useCaseGroup];
  }
  // cold — priority order per spec section 8.3
  if (companyFitGroup === "weak_fit")              return "AI_TOO_EARLY_COLD";
  if (operationalFrictionGroup === "low_friction") return "AI_LOW_FRICTION_COLD";
  return "AI_NO_CLEAR_NEED_COLD";
}

// ── Section 9: Result Page Variant ────────────────────────────────────────

const RESULT_CODE_TO_VARIANT: Record<ResultCode, ResultPageVariant> = {
  AI_OPERATING_LEVERAGE_HOT:   "RP01",
  AI_OPERATING_LEVERAGE_WARM:  "RP01",
  AI_CUSTOMER_REVENUE_HOT:     "RP02",
  AI_CUSTOMER_REVENUE_WARM:    "RP02",
  AI_FINANCE_BACKOFFICE_HOT:   "RP03",
  AI_FINANCE_BACKOFFICE_WARM:  "RP03",
  AI_INTERNAL_WORKFLOW_HOT:    "RP04",
  AI_INTERNAL_WORKFLOW_WARM:   "RP04",
  AI_CAPABILITY_GAP_HOT:       "RP05",
  AI_CAPABILITY_GAP_WARM:      "RP05",
  AI_STARTER_EXPLORATION_WARM: "RP06",
  AI_TOO_EARLY_COLD:           "RP06",
  AI_LOW_FRICTION_COLD:        "RP06",
  AI_NO_CLEAR_NEED_COLD:       "RP06",
};

// ── Section 10: Result Page Kickers ──────────────────────────────────────

function deriveResultPageKickers(
  temperature: LeadTemperature,
  a: Answers,
  costObjectionFlag: boolean,
  grantInterestGroup: GrantInterestGroup,
  competitiveAdvantageGroup: CompetitiveAdvantageGroup
): ResultPageKicker[] {
  const aiUse = str(a, "current_ai_use");

  const addFailure =
    temperature === "hot" ||
    temperature === "warm" ||
    aiUse === "staff_use_chatgpt_individually" ||
    aiUse === "use_ai_tools_but_no_company_system" ||
    aiUse === "some_workflows_automated_basic";

  const addFunding =
    costObjectionFlag ||
    grantInterestGroup === "grant_ready" ||
    grantInterestGroup === "grant_interested" ||
    grantInterestGroup === "grant_unaware_open" ||
    grantInterestGroup === "grant_uncertain";

  const addTiming =
    temperature === "hot" ||
    temperature === "warm" ||
    competitiveAdvantageGroup === "strong_advantage_belief" ||
    competitiveAdvantageGroup === "moderate_advantage_belief" ||
    competitiveAdvantageGroup === "competitors_ahead" ||
    competitiveAdvantageGroup === "uncertain_advantage";

  // Cold: at most 1 kicker
  if (temperature === "cold") {
    if (addTiming && competitiveAdvantageGroup !== "low_advantage_belief") return ["timing_kicker"];
    return [];
  }

  const kickers: ResultPageKicker[] = [];
  if (addFailure) kickers.push("failure_kicker");
  if (addTiming)  kickers.push("timing_kicker");
  if (addFunding) kickers.push("funding_kicker");
  return kickers;
}

// ── Section 11: Delivery Policies ────────────────────────────────────────

function deriveDeliveryPolicies(temperature: LeadTemperature): {
  leadTemperatureUi: LeadTemperatureUi;
  resultPageBookingPolicy: ResultPageBookingPolicy;
  emailBookingPolicy: "include_booking_link" | "hide_booking_link";
  reportBookingPromptPolicy: "strong_prompt" | "soft_prompt" | "no_prompt";
} {
  if (temperature === "hot") return {
    leadTemperatureUi: "High fit",
    resultPageBookingPolicy: "show_strong_booking_after_submit",
    emailBookingPolicy: "include_booking_link",
    reportBookingPromptPolicy: "strong_prompt",
  };
  if (temperature === "warm") return {
    leadTemperatureUi: "Potential fit",
    resultPageBookingPolicy: "show_soft_booking_after_submit",
    emailBookingPolicy: "include_booking_link",
    reportBookingPromptPolicy: "soft_prompt",
  };
  return {
    leadTemperatureUi: "Education track",
    resultPageBookingPolicy: "hide_booking",
    emailBookingPolicy: "hide_booking_link",
    reportBookingPromptPolicy: "no_prompt",
  };
}

// ── Section 12: Lead Score ────────────────────────────────────────────────

function calculateLeadScore(params: {
  temperature: LeadTemperature;
  a: Answers;
  companyFitGroup: CompanyFitGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  aiOpportunityGroup: AiOpportunityGroup;
  readinessGroup: ReadinessGroup;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  costObjectionFlag: boolean;
}): number {
  const { temperature, a, companyFitGroup, operationalFrictionGroup, aiOpportunityGroup, readinessGroup, grantInterestGroup, competitiveAdvantageGroup, costObjectionFlag } = params;

  const base: Record<LeadTemperature, number> = { hot: 75, warm: 45, cold: 10 };
  let score = base[temperature];

  const stage      = str(a, "company_stage");
  const emp        = str(a, "employee_count");
  const biz        = str(a, "business_type");
  const aiUse      = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const urgency    = str(a, "urgency");

  const stageModifiers: Record<string, number> = {
    funded_startup_seed_to_series_a:   3,
    growth_stage_company:              5,
    established_sme:                   5,
    multi_entity_or_regional_business: 2,
  };
  score += stageModifiers[stage] ?? 0;

  const empModifiers: Record<string, number> = {
    "1_to_4":        -5,
    "5_to_10":        10,
    "11_to_20":       12,
    "21_to_50":       15,
    "51_to_200":     -10,
    "more_than_200": -20,
  };
  score += empModifiers[emp] ?? 0;

  if (biz === "accounting_finance_firm")         score += 5;
  else if (biz === "professional_services_firm") score += 4;

  if (operationalFrictionGroup === "strong_friction")   score += 15;
  else if (operationalFrictionGroup === "moderate_friction") score += 7;

  if (aiOpportunityGroup === "high_opportunity")         score += 12;
  else if (aiOpportunityGroup === "moderate_opportunity") score += 6;

  if (readinessGroup === "high_readiness")         score += 15;
  else if (readinessGroup === "moderate_readiness") score += 7;

  if (aiUse === "use_ai_tools_but_no_company_system") score += 5;
  else if (aiUse === "ai_embedded_in_core_processes" && operationalFrictionGroup === "low_friction") score -= 5;

  const grantActive = new Set<GrantInterestGroup>(["grant_interested", "grant_ready", "grant_unaware_open"]);
  if (nonAdoption === "cost_or_budget_concern" && costObjectionFlag && grantActive.has(grantInterestGroup)) score += 5;
  else if (nonAdoption === "do_not_think_we_need_it_yet") score -= 20;

  if (grantInterestGroup === "grant_interested")        score += 8;
  else if (grantInterestGroup === "grant_unaware_open") score += 5;

  if (competitiveAdvantageGroup === "strong_advantage_belief")   score += 8;
  else if (competitiveAdvantageGroup === "competitors_ahead")    score += 7;
  else if (competitiveAdvantageGroup === "low_advantage_belief") score -= 6;

  if (urgency === "need_to_fix_immediately") score += 10;
  else if (urgency === "within_3_months")    score += 6;
  else if (urgency === "not_urgent")         score -= 10;

  if (companyFitGroup === "weak_fit")          score -= 8;
  else if (companyFitGroup === "above_target_fit") score -= 15;

  return Math.max(0, Math.min(100, score));
}

// ── Section 14: CRM Tags ──────────────────────────────────────────────────

function buildCrmTags(params: {
  temperature: LeadTemperature;
  resultCode: ResultCode;
  reportKey: ReportKey;
  companyFitGroup: CompanyFitGroup;
  businessTypeGroup: BusinessTypeGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  aiOpportunityGroup: AiOpportunityGroup;
  readinessGroup: ReadinessGroup;
  useCaseGroup: UseCaseGroup;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  costObjectionFlag: boolean;
  a: Answers;
}): string[] {
  const { temperature, resultCode, reportKey, companyFitGroup, businessTypeGroup, operationalFrictionGroup, aiOpportunityGroup, readinessGroup, useCaseGroup, grantInterestGroup, competitiveAdvantageGroup, costObjectionFlag, a } = params;

  const tags = [
    "assessment_ai_automation",
    `lead_temp_${temperature}`,
    `result_${resultCode}`,
    `report_${reportKey}`,
    `fit_${companyFitGroup}`,
    `business_type_${str(a, "business_type")}`,
    `business_type_group_${businessTypeGroup}`,
    `friction_${operationalFrictionGroup}`,
    `opportunity_${aiOpportunityGroup}`,
    `readiness_${readinessGroup}`,
    `usecase_${useCaseGroup}`,
    `grant_${grantInterestGroup}`,
    `competitive_${competitiveAdvantageGroup}`,
    `stage_${str(a, "company_stage")}`,
    `employees_${str(a, "employee_count")}`,
    `urgency_${str(a, "urgency")}`,
    `ai_use_${str(a, "current_ai_use")}`,
  ];

  if (costObjectionFlag) tags.push("cost_objection");

  const nonAdoption = str(a, "ai_non_adoption_reason");
  if (nonAdoption) tags.push(`non_adoption_${nonAdoption}`);

  return tags;
}

// ── Public entry point ────────────────────────────────────────────────────

export function calculateFullResult(
  _track: "ai_automation",
  a: Answers
): FullResult {
  const timeSpend     = arr(a, "team_time_spend");
  const painAreaCount = countPainAreas(timeSpend);

  const companyFitGroup   = deriveCompanyFitGroup(a);
  const businessTypeGroup = deriveBusinessTypeGroup(a);
  const { score: frictionScore, group: frictionGroup } = deriveOperationalFriction(a, painAreaCount);
  const { score: oppScore, group: oppGroup }           = deriveAiOpportunity(a, frictionGroup);
  const grantInterestGroup  = deriveGrantInterestGroup(a);
  const competitiveAdvGroup = deriveCompetitiveAdvantageGroup(a);
  const { score: readScore, group: readGroup }         = deriveReadiness(a, grantInterestGroup, competitiveAdvGroup);
  const useCaseGroup        = deriveUseCaseGroup(a, painAreaCount, frictionGroup);
  const costObjectionFlag   = str(a, "ai_non_adoption_reason") === "cost_or_budget_concern";

  let temperature = classifyLeadTemperature({
    a, painAreaCount,
    operationalFrictionGroup: frictionGroup,
    aiOpportunityGroup: oppGroup,
    readinessGroup: readGroup,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
  });

  temperature = applyCommercialCaps(temperature, a, companyFitGroup, frictionGroup, frictionScore, competitiveAdvGroup);

  const resultCode = assignResultCode(temperature, useCaseGroup, companyFitGroup, frictionGroup);

  const REPORT_KEY_MAP: Record<ResultCode, ReportKey> = {
    AI_OPERATING_LEVERAGE_HOT:   "ai_operating_system_blueprint",
    AI_OPERATING_LEVERAGE_WARM:  "ai_operating_system_blueprint",
    AI_CUSTOMER_REVENUE_HOT:     "ai_customer_revenue_automation",
    AI_CUSTOMER_REVENUE_WARM:    "ai_customer_revenue_automation",
    AI_FINANCE_BACKOFFICE_HOT:   "ai_finance_backoffice_automation",
    AI_FINANCE_BACKOFFICE_WARM:  "ai_finance_backoffice_automation",
    AI_INTERNAL_WORKFLOW_HOT:    "ai_workflow_automation_diagnostic",
    AI_INTERNAL_WORKFLOW_WARM:   "ai_workflow_automation_diagnostic",
    AI_CAPABILITY_GAP_HOT:       "ai_capability_partner_roadmap",
    AI_CAPABILITY_GAP_WARM:      "ai_capability_partner_roadmap",
    AI_STARTER_EXPLORATION_WARM: "ai_automation_starter_guide",
    AI_TOO_EARLY_COLD:           "ai_automation_starter_guide",
    AI_LOW_FRICTION_COLD:        "ai_automation_starter_guide",
    AI_NO_CLEAR_NEED_COLD:       "ai_automation_starter_guide",
  };
  const reportKey         = REPORT_KEY_MAP[resultCode];
  const resultPageVariant = RESULT_CODE_TO_VARIANT[resultCode];
  const resultPageKickers = deriveResultPageKickers(temperature, a, costObjectionFlag, grantInterestGroup, competitiveAdvGroup);
  const policies          = deriveDeliveryPolicies(temperature);
  const leadScore         = calculateLeadScore({
    temperature, a, companyFitGroup,
    operationalFrictionGroup: frictionGroup,
    aiOpportunityGroup: oppGroup,
    readinessGroup: readGroup,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    costObjectionFlag,
  });
  const crmTags = buildCrmTags({
    temperature, resultCode, reportKey, companyFitGroup, businessTypeGroup,
    operationalFrictionGroup: frictionGroup,
    aiOpportunityGroup: oppGroup,
    readinessGroup: readGroup,
    useCaseGroup, grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    costObjectionFlag, a,
  });

  return {
    track: "ai_automation",
    resultCode,
    leadTemperature: temperature,
    leadTemperatureUi: policies.leadTemperatureUi,
    leadScore,
    companyFitGroup,
    businessTypeGroup,
    operationalFrictionGroup: frictionGroup,
    operationalFrictionScore: frictionScore,
    aiOpportunityGroup: oppGroup,
    aiOpportunityScore: oppScore,
    readinessGroup: readGroup,
    readinessScore: readScore,
    costObjectionFlag,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    useCaseGroup,
    reportKey,
    resultPageVariant,
    resultPageKickers,
    resultPageBookingPolicy: policies.resultPageBookingPolicy,
    emailBookingPolicy: policies.emailBookingPolicy,
    reportBookingPromptPolicy: policies.reportBookingPromptPolicy,
    crmTags,
  };
}
