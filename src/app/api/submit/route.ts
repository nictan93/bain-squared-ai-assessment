import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateFullResult } from "@/lib/scoring";
import { REPORT_TITLES } from "@/content/outcomes";

const SubmissionSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  newsletterOptIn: z.boolean().optional(),
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  referralCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown;
    const data = SubmissionSchema.parse(body);

    // Always recompute classification server-side from answers
    const fullResult = calculateFullResult("ai_automation", data.answers ?? {});

    const webhookPayload = {
      submitted_at: new Date().toISOString(),

      // Contact
      email: data.email,
      name: data.name ?? "",
      company: data.company ?? "",
      newsletter_opt_in: data.newsletterOptIn ?? false,
      referral_code: data.referralCode ?? "",

      // Classification
      track: "ai_automation",
      result_code: fullResult.resultCode,
      lead_temperature: fullResult.leadTemperature,
      lead_temperature_ui: fullResult.leadTemperatureUi,
      lead_score: fullResult.leadScore,
      report_key: fullResult.reportKey,
      report_title: REPORT_TITLES[fullResult.reportKey],
      result_page_variant: fullResult.resultPageVariant,
      result_page_booking_policy: fullResult.resultPageBookingPolicy,

      // Signal groups
      company_fit_group: fullResult.companyFitGroup,
      business_type_group: fullResult.businessTypeGroup,
      operational_friction_group: fullResult.operationalFrictionGroup,
      operational_friction_score: fullResult.operationalFrictionScore,
      ai_opportunity_group: fullResult.aiOpportunityGroup,
      ai_opportunity_score: fullResult.aiOpportunityScore,
      readiness_group: fullResult.readinessGroup,
      readiness_score: fullResult.readinessScore,
      use_case_group: fullResult.useCaseGroup,
      cost_objection_flag: fullResult.costObjectionFlag,
      grant_interest_group: fullResult.grantInterestGroup,
      competitive_advantage_group: fullResult.competitiveAdvantageGroup,

      // CRM tags and answers
      crm_tags: fullResult.crmTags,
      answers: data.answers ?? {},
    };

    // Fire Google Apps Script webhook (non-blocking best-effort)
    const gasUrl = process.env.GAS_WEBHOOK_URL_AI;
    if (gasUrl) {
      try {
        await fetch(gasUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
          // GAS executes doPost before the 302 redirect — do not follow redirects,
          // following them converts POST to GET which returns 405.
          redirect: "manual",
        });
      } catch (webhookErr) {
        console.error("[ai-assessment] gas webhook error (GAS_WEBHOOK_URL_AI)", webhookErr);
      }
    }

    console.log("[ai-assessment] submission", {
      email: data.email,
      result_code: fullResult.resultCode,
      lead_temperature: fullResult.leadTemperature,
      lead_score: fullResult.leadScore,
      report_key: fullResult.reportKey,
      crm_tags: fullResult.crmTags,
    });

    return NextResponse.json({
      success: true,
      resultCode: fullResult.resultCode,
      reportKey: fullResult.reportKey,
      leadTemperature: fullResult.leadTemperature,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("[ai-assessment] submission error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
