import type {
  ResultCode,
  ReportKey,
  ResultPageVariant,
  ResultPageKicker,
  ResultPageBookingPolicy,
} from "@/content/questions";

// ── Public group types ────────────────────────────────────────────────────

export type LeadTemperature    = "hot" | "warm" | "warm_low" | "cold";
export type LeadTemperatureUi  = "High fit" | "Potential fit" | "Education track";

export type CompanyFitGroup    = "strong_fit" | "moderate_fit" | "weak_fit" | "above_target_fit";
export type BusinessTypeGroup  = "accounting_finance" | "professional_services" | "commercial_ops" | "general_sme" | "other_business";
export type OperationalFrictionGroup = "strong_friction" | "moderate_friction" | "low_friction";
export type AiOpportunityGroup = "high_opportunity" | "moderate_opportunity" | "low_opportunity";
export type ReadinessGroup     = "high_readiness" | "moderate_readiness" | "low_readiness";
export type GrantInterestGroup = "grant_ready" | "grant_interested" | "grant_unaware_open" | "grant_not_relevant" | "grant_uncertain";
export type CompetitiveAdvantageGroup = "strong_advantage_belief" | "moderate_advantage_belief" | "uncertain_advantage" | "low_advantage_belief" | "competitors_ahead";
export type Branch             = "ai_operating_system" | "customer_revenue_ops" | "finance_backoffice_ops" | "internal_ops_coordination" | "capability_gap" | "starter_exploration";
export type UrgencyGroup       = "high" | "moderate" | "low";

export interface FullResult {
  track: "ai_automation";
  branch: Branch;
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
  urgencyGroup: UrgencyGroup;
  costObjectionFlag: boolean;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
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

// ── Section 6.1: Company Fit Group ───────────────────────────────────────

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

// ── Section 6.2: Business Type Group ─────────────────────────────────────

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

// ── Section 6.3: Operational Friction ────────────────────────────────────

function deriveOperationalFriction(
  a: Answers,
  painAreaCount: number
): { score: number; group: OperationalFrictionGroup } {
  const timeSpend = arr(a, "team_time_spend");
  const kpd  = str(a, "key_person_dependency");
  const frag = str(a, "information_fragmentation");

  // 6.3.1 Team time spend score
  let teamScore = 0;
  if (painAreaCount >= 3)                                  teamScore = 5;
  else if (painAreaCount === 2)                            teamScore = 4;
  else if (painAreaCount === 1)                            teamScore = 2;
  else if (timeSpend.includes("not_sure_team_feels_busy")) teamScore = 1;

  // 6.3.2 Key person dependency score
  const kpdScores: Record<string, number> = {
    work_slows_down_immediately:           5,
    decisions_get_delayed:                 4,
    customers_or_internal_teams_wait:      4,
    someone_can_cover_but_context_missing: 2,
    business_continues_smoothly:           0,
  };

  // 6.3.3 Information fragmentation score
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

  // 6.3.5 Group assignment
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

// ── Section 6.4: AI Opportunity ───────────────────────────────────────────

function deriveAiOpportunity(
  a: Answers,
  frictionGroup: OperationalFrictionGroup
): { score: number; group: AiOpportunityGroup } {
  const aiUse       = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const goal        = str(a, "ai_goal");

  // 6.4.1 Current AI use score
  const aiUseScores: Record<string, number> = {
    barely_use_ai:                      4,
    staff_use_chatgpt_individually:     4,
    use_ai_tools_but_no_company_system: 4,
    some_workflows_automated_basic:     2,
    ai_embedded_in_core_processes:      0,
  };

  // 6.4.2 Non-adoption reason score (only when Q7A triggered)
  const nonAdoptionScores: Record<string, number> = {
    cost_or_budget_concern:             3,
    do_not_know_where_to_start:         4,
    lack_internal_technical_capability: 4,
    team_too_busy_to_implement:         4,
    not_sure_ai_will_work_for_us:       2,
    security_data_privacy_concern:      2,
    do_not_think_we_need_it_yet:        -4,
  };

  // 6.4.3 AI goal score (canonical 6-option set)
  const goalScores: Record<string, number> = {
    reduce_manual_work:            3,
    improve_response_time:         4,
    make_information_retrievable:  3,
    automate_finance_backoffice:   4,
    build_scalable_operating_system: 5,
    exploring_not_sure:            1,
  };

  const score =
    (aiUseScores[aiUse] ?? 0) +
    (aiUse === "barely_use_ai" ? (nonAdoptionScores[nonAdoption] ?? 0) : 0) +
    (goalScores[goal] ?? 0);

  // 6.4.5 Group assignment
  let group: AiOpportunityGroup;
  if (
    (score >= 9 && frictionGroup !== "low_friction") ||
    (frictionGroup === "strong_friction" && goal !== "exploring_not_sure")
  ) {
    group = "high_opportunity";
  } else if (score >= 5) {
    group = "moderate_opportunity";
  } else {
    group = "low_opportunity";
  }

  return { score, group };
}

// ── Section 6.5: Readiness ────────────────────────────────────────────────

function deriveReadiness(
  a: Answers,
  grantInterestGroup: GrantInterestGroup,
  competitiveAdvantageGroup: CompetitiveAdvantageGroup
): { score: number; group: ReadinessGroup } {
  const urgency = str(a, "urgency");

  // 6.5.1 Urgency score
  const urgencyScores: Record<string, number> = {
    need_to_fix_immediately: 5,
    within_3_months:         4,
    within_6_months:         2,
    exploring_for_later:     1,
    not_urgent:              0,
  };

  // 6.5.2 Grant readiness score
  const grantScores: Record<GrantInterestGroup, number> = {
    grant_ready:        2,
    grant_interested:   3,
    grant_unaware_open: 2,
    grant_uncertain:    1,
    grant_not_relevant: 0,
  };

  // 6.5.3 Competitive advantage score
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

  // 6.5.5 Group assignment
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

// ── Section 6.6: Grant Interest Group ────────────────────────────────────

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

// ── Section 6.7: Competitive Advantage Group ──────────────────────────────

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

// ── Section 6.8: Urgency Group ────────────────────────────────────────────

function deriveUrgencyGroup(a: Answers): UrgencyGroup {
  const urgency = str(a, "urgency");
  if (urgency === "need_to_fix_immediately" || urgency === "within_3_months") return "high";
  if (urgency === "within_6_months") return "moderate";
  return "low";
}

// ── Section 5.1: Branch from Q4 (hard-trigger priority logic) ────────────

function assignBranchFromQ4(a: Answers, painAreaCount: number): Branch {
  const timeSpend = arr(a, "team_time_spend");
  const bizType   = str(a, "business_type");

  // Priority 1: none_of_the_above → starter_exploration
  if (timeSpend.includes("none_of_the_above")) return "starter_exploration";

  // Priority 2: pain_area_count >= 3 → ai_operating_system
  if (painAreaCount >= 3) return "ai_operating_system";

  // Priority 3: customer or sales time → customer_revenue_ops
  if (
    timeSpend.includes("customer_replies_support_followups") ||
    timeSpend.includes("sales_followups_proposals_crm")
  ) return "customer_revenue_ops";

  // Priority 4: finance/reporting → finance_backoffice_ops
  if (timeSpend.includes("finance_reporting_invoicing_tracking")) return "finance_backoffice_ops";

  // Priority 5: admin/data entry → finance_backoffice_ops
  if (timeSpend.includes("admin_data_entry_documents")) return "finance_backoffice_ops";

  // Priority 6: accounting firm + finance-adjacent workflows → finance_backoffice_ops
  if (
    bizType === "accounting_finance_firm" &&
    (
      timeSpend.includes("admin_data_entry_documents") ||
      timeSpend.includes("finance_reporting_invoicing_tracking") ||
      timeSpend.includes("meeting_notes_summaries_documentation") ||
      timeSpend.includes("internal_coordination_handover_approvals")
    )
  ) return "finance_backoffice_ops";

  // Priority 7: internal/meeting/research → internal_ops_coordination
  if (
    timeSpend.includes("internal_coordination_handover_approvals") ||
    timeSpend.includes("meeting_notes_summaries_documentation") ||
    timeSpend.includes("research_content_marketing_campaigns")
  ) return "internal_ops_coordination";

  // Priority 8: only not_sure_team_feels_busy (no concrete pain) → capability_gap
  if (timeSpend.includes("not_sure_team_feels_busy") && painAreaCount === 0) return "capability_gap";

  // Priority 9: no concrete pain → starter_exploration
  return "starter_exploration";
}

// ── Section 5.2: AI goal override (applied after groups are derived) ───────

function applyAiGoalOverride(branch: Branch, a: Answers, frictionGroup: OperationalFrictionGroup): Branch {
  if (
    str(a, "ai_goal") === "build_scalable_operating_system" &&
    frictionGroup !== "low_friction"
  ) {
    return "ai_operating_system";
  }
  return branch;
}

// ── Section 7.1–7.5: Lead Temperature Classification ─────────────────────

const CONCRETE_BRANCHES = new Set<Branch>([
  "ai_operating_system",
  "customer_revenue_ops",
  "finance_backoffice_ops",
  "internal_ops_coordination",
  "capability_gap",
]);

function classifyLeadTemperature(params: {
  a: Answers;
  branch: Branch;
  painAreaCount: number;
  companyFitGroup: CompanyFitGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  operationalFrictionScore: number;
  aiOpportunityGroup: AiOpportunityGroup;
  readinessGroup: ReadinessGroup;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  urgencyGroup: UrgencyGroup;
}): LeadTemperature {
  const {
    a, branch, painAreaCount, companyFitGroup,
    operationalFrictionGroup, operationalFrictionScore,
    aiOpportunityGroup, readinessGroup,
    grantInterestGroup, competitiveAdvantageGroup, urgencyGroup,
  } = params;

  const urgency     = str(a, "urgency");
  const aiUse       = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const goal        = str(a, "ai_goal");
  const kpd         = str(a, "key_person_dependency");
  const frag        = str(a, "information_fragmentation");
  const timeSpend   = arr(a, "team_time_spend");

  // ── 7.1 Forced cold rules ───────────────────────────────────────────────
  if (
    timeSpend.includes("none_of_the_above") &&
    kpd === "business_continues_smoothly" &&
    frag === "mostly_organised_easy_to_retrieve" &&
    urgencyGroup === "low"
  ) return "cold";

  if (
    nonAdoption === "do_not_think_we_need_it_yet" &&
    urgency === "not_urgent" &&
    operationalFrictionGroup === "low_friction"
  ) return "cold";

  if (
    aiUse === "ai_embedded_in_core_processes" &&
    operationalFrictionGroup === "low_friction" &&
    urgencyGroup === "low"
  ) return "cold";

  // ── 7.2 Hot rules ───────────────────────────────────────────────────────
  // Baseline gate: all five must be true before any additional condition is checked.
  const baselineGate =
    CONCRETE_BRANCHES.has(branch) &&
    operationalFrictionGroup === "strong_friction" &&
    urgencyGroup === "high" &&
    (companyFitGroup === "strong_fit" || companyFitGroup === "moderate_fit") &&
    (readinessGroup === "high_readiness" || readinessGroup === "moderate_readiness");

  if (baselineGate) {
    const hotGoals = new Set(["reduce_manual_work", "improve_response_time", "automate_finance_backoffice", "build_scalable_operating_system"]);
    const highComp = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "competitors_ahead"]);
    const grantHot = new Set<GrantInterestGroup>(["grant_interested", "grant_ready", "grant_unaware_open"]);

    // Additional condition 1: high AI opportunity
    if (aiOpportunityGroup === "high_opportunity") return "hot";
    // Additional condition 2: multi-workflow + goal match
    if (painAreaCount >= 3 && hotGoals.has(goal)) return "hot";
    // Additional condition 3: strong friction + competitive advantage
    if (highComp.has(competitiveAdvantageGroup)) return "hot";
    // Additional condition 4: strong friction + grant + near urgency
    if (grantHot.has(grantInterestGroup) && (urgency === "need_to_fix_immediately" || urgency === "within_3_months")) return "hot";
  }

  // ── 7.3 Warm rules ─────────────────────────────────────────────────────
  const isClearBranch = CONCRETE_BRANCHES.has(branch);
  const grantWarm  = new Set<GrantInterestGroup>(["grant_interested", "grant_unaware_open"]);
  const compWarm   = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "moderate_advantage_belief", "competitors_ahead"]);
  const nonAdoptionWarm = new Set([
    "cost_or_budget_concern", "do_not_know_where_to_start",
    "lack_internal_technical_capability", "team_too_busy_to_implement",
    "not_sure_ai_will_work_for_us", "security_data_privacy_concern",
  ]);

  if (isClearBranch && operationalFrictionGroup === "strong_friction" && urgencyGroup === "moderate") return "warm";
  if (isClearBranch && operationalFrictionGroup === "moderate_friction" && urgencyGroup === "high") return "warm";
  if (companyFitGroup === "above_target_fit" && operationalFrictionGroup === "strong_friction" && urgencyGroup === "high") return "warm";
  if (operationalFrictionGroup === "strong_friction") return "warm"; // any remaining strong friction
  if (operationalFrictionGroup === "moderate_friction" && (aiOpportunityGroup === "high_opportunity" || aiOpportunityGroup === "moderate_opportunity")) return "warm";
  if (aiUse === "barely_use_ai" && nonAdoptionWarm.has(nonAdoption) && operationalFrictionGroup !== "low_friction") return "warm";
  if (grantWarm.has(grantInterestGroup) && operationalFrictionGroup !== "low_friction" && (urgencyGroup === "high" || urgencyGroup === "moderate")) return "warm";
  if (compWarm.has(competitiveAdvantageGroup) && operationalFrictionGroup !== "low_friction" && (urgencyGroup === "high" || urgencyGroup === "moderate")) return "warm";

  // ── 7.4 Warm Low rules ──────────────────────────────────────────────────
  if (isClearBranch && operationalFrictionGroup === "moderate_friction" && urgencyGroup === "low") return "warm_low";
  if (isClearBranch && (operationalFrictionGroup === "low_friction" || operationalFrictionGroup === "moderate_friction") && (aiOpportunityGroup === "moderate_opportunity" || aiOpportunityGroup === "high_opportunity")) return "warm_low";
  if ((companyFitGroup === "moderate_fit" || companyFitGroup === "weak_fit") && isClearBranch) return "warm_low";
  if (compWarm.has(competitiveAdvantageGroup) && operationalFrictionGroup !== "low_friction" && urgencyGroup === "low") return "warm_low";
  if (grantWarm.has(grantInterestGroup) && operationalFrictionGroup !== "low_friction" && urgencyGroup === "low") return "warm_low";

  // ── 7.5 Default cold ────────────────────────────────────────────────────
  return "cold";
}

// ── Section 7.6: Capability gap readiness override ────────────────────────

function applyCapabilityGapOverride(
  branch: Branch,
  a: Answers,
  frictionGroup: OperationalFrictionGroup,
  temperature: LeadTemperature
): Branch {
  const aiUse       = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const capBlockers = new Set(["do_not_know_where_to_start", "lack_internal_technical_capability", "team_too_busy_to_implement"]);

  if (
    CONCRETE_BRANCHES.has(branch) &&
    branch !== "capability_gap" &&
    aiUse === "barely_use_ai" &&
    capBlockers.has(nonAdoption) &&
    frictionGroup !== "low_friction" &&
    (temperature === "warm" || temperature === "warm_low")
  ) {
    return "capability_gap";
  }
  return branch;
}

// ── Section 8: Commercial Caps and Overrides ──────────────────────────────

function applyCommercialCaps(params: {
  temperature: LeadTemperature;
  branch: Branch;
  a: Answers;
  companyFitGroup: CompanyFitGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  operationalFrictionScore: number;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  urgencyGroup: UrgencyGroup;
}): LeadTemperature {
  const { temperature, branch, a, companyFitGroup, operationalFrictionGroup, operationalFrictionScore, competitiveAdvantageGroup, urgencyGroup } = params;
  const urgency     = str(a, "urgency");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const highComp    = new Set<CompetitiveAdvantageGroup>(["strong_advantage_belief", "competitors_ahead"]);

  // 8.1 Above-target cap
  if (companyFitGroup === "above_target_fit" && temperature === "hot") return "warm";

  // 8.2 Weak fit cap
  if (companyFitGroup === "weak_fit" && temperature === "hot") {
    if (operationalFrictionGroup === "low_friction") return "warm_low";
    return "warm";
  }

  // 8.3 Not urgent cap
  if (urgency === "not_urgent" && temperature === "hot") {
    if (operationalFrictionScore >= 12 && highComp.has(competitiveAdvantageGroup)) return "hot";
    return "warm";
  }

  // 8.4 Low advantage cap
  if (
    competitiveAdvantageGroup === "low_advantage_belief" &&
    urgencyGroup === "low" &&
    temperature === "hot"
  ) return "warm";

  // 8.5 No-need cold cap
  if (nonAdoption === "do_not_think_we_need_it_yet" && operationalFrictionGroup === "low_friction") return "cold";

  // 8.6 Starter exploration cap (max = warm; assign based on external signal)
  if (branch === "starter_exploration") {
    if (temperature === "hot") return "warm"; // safeguard
    if (temperature === "cold") return "cold";
    // Within warm range: determine warm vs warm_low
    const strongSignal =
      urgencyGroup === "high" && highComp.has(competitiveAdvantageGroup);
    if (strongSignal) return "warm";
    // Any residual warm → warm_low unless already cold
    if (temperature === "warm") return "warm_low";
    return temperature; // warm_low stays warm_low
  }

  return temperature;
}

// ── Section 9: Result Code Assignment ────────────────────────────────────

function assignResultCode(
  temperature: LeadTemperature,
  branch: Branch,
  companyFitGroup: CompanyFitGroup,
  operationalFrictionGroup: OperationalFrictionGroup
): ResultCode {
  if (temperature === "hot") {
    const hotMap: Record<Branch, ResultCode> = {
      ai_operating_system:       "AI_OPERATING_LEVERAGE_HOT",
      customer_revenue_ops:      "AI_CUSTOMER_REVENUE_HOT",
      finance_backoffice_ops:    "AI_FINANCE_BACKOFFICE_HOT",
      internal_ops_coordination: "AI_INTERNAL_WORKFLOW_HOT",
      capability_gap:            "AI_CAPABILITY_GAP_HOT",
      starter_exploration:       "AI_STARTER_EXPLORATION_WARM", // capped — shouldn't reach hot
    };
    return hotMap[branch];
  }
  if (temperature === "warm") {
    const warmMap: Record<Branch, ResultCode> = {
      ai_operating_system:       "AI_OPERATING_LEVERAGE_WARM",
      customer_revenue_ops:      "AI_CUSTOMER_REVENUE_WARM",
      finance_backoffice_ops:    "AI_FINANCE_BACKOFFICE_WARM",
      internal_ops_coordination: "AI_INTERNAL_WORKFLOW_WARM",
      capability_gap:            "AI_CAPABILITY_GAP_WARM",
      starter_exploration:       "AI_STARTER_EXPLORATION_WARM",
    };
    return warmMap[branch];
  }
  if (temperature === "warm_low") {
    const warmLowMap: Record<Branch, ResultCode> = {
      ai_operating_system:       "AI_OPERATING_LEVERAGE_WARM_LOW",
      customer_revenue_ops:      "AI_CUSTOMER_REVENUE_WARM_LOW",
      finance_backoffice_ops:    "AI_FINANCE_BACKOFFICE_WARM_LOW",
      internal_ops_coordination: "AI_INTERNAL_WORKFLOW_WARM_LOW",
      capability_gap:            "AI_CAPABILITY_GAP_WARM_LOW",
      starter_exploration:       "AI_STARTER_EXPLORATION_WARM", // same code per spec section 9.3
    };
    return warmLowMap[branch];
  }
  // Cold — priority order per spec section 9.4
  if (companyFitGroup === "weak_fit")              return "AI_TOO_EARLY_COLD";
  if (operationalFrictionGroup === "low_friction") return "AI_LOW_FRICTION_COLD";
  return "AI_NO_CLEAR_NEED_COLD";
}

// ── Section 11: Result Page Variant Mapping ───────────────────────────────

const RESULT_CODE_TO_VARIANT: Record<ResultCode, ResultPageVariant> = {
  AI_OPERATING_LEVERAGE_HOT:      "RP01",
  AI_OPERATING_LEVERAGE_WARM:     "RP02",
  AI_OPERATING_LEVERAGE_WARM_LOW: "RP02",
  AI_CUSTOMER_REVENUE_HOT:        "RP03",
  AI_CUSTOMER_REVENUE_WARM:       "RP04",
  AI_CUSTOMER_REVENUE_WARM_LOW:   "RP04",
  AI_FINANCE_BACKOFFICE_HOT:      "RP05",
  AI_FINANCE_BACKOFFICE_WARM:     "RP06",
  AI_FINANCE_BACKOFFICE_WARM_LOW: "RP06",
  AI_INTERNAL_WORKFLOW_HOT:       "RP07",
  AI_INTERNAL_WORKFLOW_WARM:      "RP08",
  AI_INTERNAL_WORKFLOW_WARM_LOW:  "RP08",
  AI_CAPABILITY_GAP_HOT:          "RP09",
  AI_CAPABILITY_GAP_WARM:         "RP10",
  AI_CAPABILITY_GAP_WARM_LOW:     "RP10",
  AI_STARTER_EXPLORATION_WARM:    "RP11",
  AI_TOO_EARLY_COLD:              "RP12",
  AI_LOW_FRICTION_COLD:           "RP12",
  AI_NO_CLEAR_NEED_COLD:          "RP12",
};

// ── Section 7 (result copy): Kicker derivation ────────────────────────────

function deriveResultPageKickers(
  temperature: LeadTemperature,
  a: Answers,
  costObjectionFlag: boolean,
  grantInterestGroup: GrantInterestGroup,
  competitiveAdvantageGroup: CompetitiveAdvantageGroup
): ResultPageKicker[] {
  const aiUse = str(a, "current_ai_use");

  // failure_kicker: hot/warm OR using AI tools individually or basic
  const addFailure =
    temperature === "hot" ||
    temperature === "warm" ||
    aiUse === "staff_use_chatgpt_individually" ||
    aiUse === "use_ai_tools_but_no_company_system" ||
    aiUse === "some_workflows_automated_basic";

  // funding_kicker: cost objection OR grant interest (not grant_not_relevant)
  const addFunding =
    costObjectionFlag ||
    grantInterestGroup === "grant_ready" ||
    grantInterestGroup === "grant_interested" ||
    grantInterestGroup === "grant_unaware_open" ||
    grantInterestGroup === "grant_uncertain";

  // timing_kicker: hot/warm OR has competitive advantage signal
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

  // warm_low: use same logic as warm (kickers controlled by variant in outcomes.ts)
  const kickers: ResultPageKicker[] = [];
  if (addFailure) kickers.push("failure_kicker");
  if (addTiming)  kickers.push("timing_kicker");
  if (addFunding) kickers.push("funding_kicker");
  return kickers;
}

// ── Delivery Policies ─────────────────────────────────────────────────────

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
    resultPageBookingPolicy: "hide_booking",
    emailBookingPolicy: "hide_booking_link",
    reportBookingPromptPolicy: "soft_prompt",
  };
  if (temperature === "warm_low") return {
    leadTemperatureUi: "Potential fit",
    resultPageBookingPolicy: "hide_booking",
    emailBookingPolicy: "hide_booking_link",
    reportBookingPromptPolicy: "soft_prompt",
  };
  // cold
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
  businessTypeGroup: BusinessTypeGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  aiOpportunityGroup: AiOpportunityGroup;
  readinessGroup: ReadinessGroup;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  costObjectionFlag: boolean;
}): number {
  const { temperature, a, companyFitGroup, businessTypeGroup, operationalFrictionGroup, aiOpportunityGroup, readinessGroup, grantInterestGroup, competitiveAdvantageGroup, costObjectionFlag } = params;

  // 12.1 Base score
  const base: Record<LeadTemperature, number> = { hot: 70, warm: 40, warm_low: 30, cold: 10 };
  let score = base[temperature];

  const stage      = str(a, "company_stage");
  const emp        = str(a, "employee_count");
  const biz        = str(a, "business_type");
  const aiUse      = str(a, "current_ai_use");
  const nonAdoption = str(a, "ai_non_adoption_reason");
  const urgency    = str(a, "urgency");

  // 12.2 Modifiers
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

  if (aiOpportunityGroup === "high_opportunity")          score += 12;
  else if (aiOpportunityGroup === "moderate_opportunity") score += 6;

  if (readinessGroup === "high_readiness")          score += 15;
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

  if (companyFitGroup === "weak_fit")           score -= 8;
  else if (companyFitGroup === "above_target_fit") score -= 15;

  // 12.3 Clamp to [0, 100]
  return Math.max(0, Math.min(100, score));
}

// ── Section 14: CRM Tags ──────────────────────────────────────────────────

function buildCrmTags(params: {
  temperature: LeadTemperature;
  branch: Branch;
  resultCode: ResultCode;
  reportKey: ReportKey;
  companyFitGroup: CompanyFitGroup;
  businessTypeGroup: BusinessTypeGroup;
  operationalFrictionGroup: OperationalFrictionGroup;
  aiOpportunityGroup: AiOpportunityGroup;
  readinessGroup: ReadinessGroup;
  grantInterestGroup: GrantInterestGroup;
  competitiveAdvantageGroup: CompetitiveAdvantageGroup;
  urgencyGroup: UrgencyGroup;
  painAreaCount: number;
  costObjectionFlag: boolean;
  a: Answers;
}): string[] {
  const {
    temperature, branch, resultCode, reportKey, companyFitGroup, businessTypeGroup,
    operationalFrictionGroup, aiOpportunityGroup, readinessGroup,
    grantInterestGroup, competitiveAdvantageGroup, urgencyGroup,
    painAreaCount, costObjectionFlag, a,
  } = params;

  // 14.1 Minimum tags
  const tags: string[] = [
    "assessment:ai_automation",
    `branch:${branch}`,
    `temperature:${temperature}`,
    `result_code:${resultCode}`,
    `report:${reportKey}`,
    `fit:${companyFitGroup}`,
    `business_type:${str(a, "business_type")}`,
    `business_type_group:${businessTypeGroup}`,
    `friction:${operationalFrictionGroup}`,
    `opportunity:${aiOpportunityGroup}`,
    `readiness:${readinessGroup}`,
    `grant:${grantInterestGroup}`,
    `advantage:${competitiveAdvantageGroup}`,
    `urgency:${urgencyGroup}`,
    `ai_use:${str(a, "current_ai_use")}`,
  ];

  // 14.2 Pain tags
  const timeSpend   = arr(a, "team_time_spend");
  const kpd         = str(a, "key_person_dependency");
  const frag        = str(a, "information_fragmentation");
  const nonAdoption = str(a, "ai_non_adoption_reason");

  if (timeSpend.includes("customer_replies_support_followups"))  tags.push("pain:customer_replies");
  if (timeSpend.includes("sales_followups_proposals_crm"))       tags.push("pain:sales_followup");
  if (timeSpend.includes("finance_reporting_invoicing_tracking")) tags.push("pain:finance_reporting");
  if (timeSpend.includes("admin_data_entry_documents"))          tags.push("pain:admin_documents");
  if (timeSpend.includes("internal_coordination_handover_approvals")) tags.push("pain:internal_coordination");
  if (timeSpend.includes("meeting_notes_summaries_documentation")) tags.push("pain:meeting_notes");
  if (timeSpend.includes("research_content_marketing_campaigns")) tags.push("pain:research_content");
  if (painAreaCount >= 3) tags.push("pain:multi_workflow_friction");

  const highKpd = new Set(["work_slows_down_immediately", "decisions_get_delayed", "customers_or_internal_teams_wait"]);
  if (highKpd.has(kpd)) tags.push("pain:key_person_risk");
  if (frag === "yes_information_is_everywhere") tags.push("pain:information_fragmentation");
  if (costObjectionFlag) tags.push("pain:cost_objection");

  if (nonAdoption === "do_not_know_where_to_start")          tags.push("pain:starting_point_block");
  if (nonAdoption === "lack_internal_technical_capability")   tags.push("pain:capability_block");
  if (nonAdoption === "team_too_busy_to_implement")           tags.push("pain:execution_bandwidth_block");
  if (nonAdoption === "not_sure_ai_will_work_for_us")         tags.push("pain:efficacy_doubt");
  if (nonAdoption === "security_data_privacy_concern")        tags.push("pain:security_concern");

  // 14.3 Stage and intent tags
  tags.push(`stage:${str(a, "company_stage")}`);
  tags.push(`employees:${str(a, "employee_count")}`);
  tags.push(`goal:${str(a, "ai_goal")}`);
  if (nonAdoption) tags.push(`non_adoption:${nonAdoption}`);

  return tags;
}

// ── Report key map ────────────────────────────────────────────────────────

const REPORT_KEY_MAP: Record<ResultCode, ReportKey> = {
  AI_OPERATING_LEVERAGE_HOT:      "ai_operating_system_blueprint",
  AI_OPERATING_LEVERAGE_WARM:     "ai_operating_system_blueprint",
  AI_OPERATING_LEVERAGE_WARM_LOW: "ai_operating_system_blueprint",
  AI_CUSTOMER_REVENUE_HOT:        "ai_customer_revenue_automation",
  AI_CUSTOMER_REVENUE_WARM:       "ai_customer_revenue_automation",
  AI_CUSTOMER_REVENUE_WARM_LOW:   "ai_customer_revenue_automation",
  AI_FINANCE_BACKOFFICE_HOT:      "ai_finance_backoffice_automation",
  AI_FINANCE_BACKOFFICE_WARM:     "ai_finance_backoffice_automation",
  AI_FINANCE_BACKOFFICE_WARM_LOW: "ai_finance_backoffice_automation",
  AI_INTERNAL_WORKFLOW_HOT:       "ai_workflow_automation_diagnostic",
  AI_INTERNAL_WORKFLOW_WARM:      "ai_workflow_automation_diagnostic",
  AI_INTERNAL_WORKFLOW_WARM_LOW:  "ai_workflow_automation_diagnostic",
  AI_CAPABILITY_GAP_HOT:          "ai_capability_partner_roadmap",
  AI_CAPABILITY_GAP_WARM:         "ai_capability_partner_roadmap",
  AI_CAPABILITY_GAP_WARM_LOW:     "ai_capability_partner_roadmap",
  AI_STARTER_EXPLORATION_WARM:    "ai_automation_starter_guide",
  AI_TOO_EARLY_COLD:              "ai_automation_starter_guide",
  AI_LOW_FRICTION_COLD:           "ai_automation_starter_guide",
  AI_NO_CLEAR_NEED_COLD:          "ai_automation_starter_guide",
};

// ── Public entry point ────────────────────────────────────────────────────

export function calculateFullResult(
  _track: "ai_automation",
  a: Answers
): FullResult {
  const timeSpend     = arr(a, "team_time_spend");
  const painAreaCount = countPainAreas(timeSpend);

  // 1. Initial branch from Q4
  let branch: Branch = assignBranchFromQ4(a, painAreaCount);

  // 2. Derived groups
  const companyFitGroup   = deriveCompanyFitGroup(a);
  const businessTypeGroup = deriveBusinessTypeGroup(a);
  const { score: frictionScore, group: frictionGroup } = deriveOperationalFriction(a, painAreaCount);
  const { score: oppScore, group: oppGroup }           = deriveAiOpportunity(a, frictionGroup);
  const grantInterestGroup  = deriveGrantInterestGroup(a);
  const competitiveAdvGroup = deriveCompetitiveAdvantageGroup(a);
  const { score: readScore, group: readGroup }         = deriveReadiness(a, grantInterestGroup, competitiveAdvGroup);
  const urgencyGroup        = deriveUrgencyGroup(a);
  const costObjectionFlag   = str(a, "ai_non_adoption_reason") === "cost_or_budget_concern";

  // 3. AI goal override (section 5.2)
  branch = applyAiGoalOverride(branch, a, frictionGroup);

  // 4. Lead temperature classification (sections 7.1–7.5)
  let temperature = classifyLeadTemperature({
    a, branch, painAreaCount, companyFitGroup,
    operationalFrictionGroup: frictionGroup,
    operationalFrictionScore: frictionScore,
    aiOpportunityGroup: oppGroup,
    readinessGroup: readGroup,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    urgencyGroup,
  });

  // 5. Capability gap readiness override (section 7.6)
  branch = applyCapabilityGapOverride(branch, a, frictionGroup, temperature);

  // 6. Commercial caps and overrides (section 8)
  temperature = applyCommercialCaps({
    temperature, branch, a, companyFitGroup,
    operationalFrictionGroup: frictionGroup,
    operationalFrictionScore: frictionScore,
    competitiveAdvantageGroup: competitiveAdvGroup,
    urgencyGroup,
  });

  // 7. Result code, report, variant, policies, kickers, lead score, CRM tags
  const resultCode        = assignResultCode(temperature, branch, companyFitGroup, frictionGroup);
  const reportKey         = REPORT_KEY_MAP[resultCode];
  const resultPageVariant = RESULT_CODE_TO_VARIANT[resultCode];
  const resultPageKickers = deriveResultPageKickers(temperature, a, costObjectionFlag, grantInterestGroup, competitiveAdvGroup);
  const policies          = deriveDeliveryPolicies(temperature);
  const leadScore         = calculateLeadScore({
    temperature, a, companyFitGroup, businessTypeGroup,
    operationalFrictionGroup: frictionGroup,
    aiOpportunityGroup: oppGroup,
    readinessGroup: readGroup,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    costObjectionFlag,
  });
  const crmTags = buildCrmTags({
    temperature, branch, resultCode, reportKey,
    companyFitGroup, businessTypeGroup,
    operationalFrictionGroup: frictionGroup,
    aiOpportunityGroup: oppGroup,
    readinessGroup: readGroup,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    urgencyGroup, painAreaCount, costObjectionFlag, a,
  });

  return {
    track: "ai_automation",
    branch,
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
    urgencyGroup,
    costObjectionFlag,
    grantInterestGroup,
    competitiveAdvantageGroup: competitiveAdvGroup,
    reportKey,
    resultPageVariant,
    resultPageKickers,
    resultPageBookingPolicy: policies.resultPageBookingPolicy,
    emailBookingPolicy: policies.emailBookingPolicy,
    reportBookingPromptPolicy: policies.reportBookingPromptPolicy,
    crmTags,
  };
}
