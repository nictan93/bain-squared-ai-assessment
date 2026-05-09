import type { ReportKey, ResultPageVariant } from "@/content/questions";
import type { FullResult } from "@/lib/scoring";

// ── Report display titles ──────────────────────────────────────────────────

export const REPORT_TITLES: Record<ReportKey, string> = {
  ai_operating_system_blueprint:     "AI Operating System Blueprint",
  ai_customer_revenue_automation:    "AI Customer and Revenue Automation Report",
  ai_finance_backoffice_automation:  "AI Finance and Back Office Automation Report",
  ai_workflow_automation_diagnostic: "AI Workflow Automation Diagnostic",
  ai_capability_partner_roadmap:     "AI Capability Partner Roadmap",
  ai_automation_starter_guide:       "AI Automation Starter Guide",
};

// ── Booking URL ────────────────────────────────────────────────────────────

export const BOOKING_URL = "https://cal.com/bain-squared/ai-automation";

// ── Universal after-submit copy (V3 spec section 4) ───────────────────────

export const AFTER_SUBMIT_COPY = {
  strong:
    "Your report has been sent.\n\nBased on your answers, your business appears to have a near-term AI automation opportunity. We strongly recommend booking a short call so we can identify the highest-impact workflow to diagnose, design, implement, and operate.",
  soft:
    "Your report has been sent.\n\nYour answers suggest there may be meaningful AI automation opportunities in your business. You can review the report first, or book a short call if you want help identifying the first workflow to automate.",
  hide:
    "Your report has been sent.\n\nPlease check your inbox and review the guide at your own pace.",
} as const;

// ── Result page outcome interface ─────────────────────────────────────────

export interface AiOutcome {
  resultPageVariant: ResultPageVariant;
  headline: string;
  badge: string;
  intro: string;          // \n\n separates paragraphs
  calloutTitle: string;
  calloutBody: string;
  ctaOverline: string;
  ctaHeadline: string;
  ctaBody: string;
  formButtonLabel: string;
}

// ── RP01. Operating Leverage / AI Operating System ────────────────────────

const RP01: AiOutcome = {
  resultPageVariant: "RP01",
  headline: "Your business seems to be ready for AI",
  badge: "High AI opportunity",
  intro:
    "Your answers suggest that the issue is not just one slow task or one overloaded person. The business appears to have broader operational issues across follow-ups, coordination, information flow, reporting, or repeated manual work.\n\nThat usually means the company does not only need another software tool or dashboard. It needs an AI-enabled operating layer that helps work move, captures context, supports decisions, and reduces the amount of human chasing required to get things done.",
  calloutTitle: "The opportunity is bigger than you think",
  calloutBody:
    "When multiple workflows are slow at the same time, the real problem is usually system design. AI automation can help, but only if the workflows are diagnosed properly, redesigned clearly, implemented into the tools your team already uses, and operated until adoption sticks.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Operating System Blueprint.",
  ctaBody:
    "We will send the AI Operating System Blueprint to your inbox. Based on your answers, we recommend booking a short call after the report is sent so we can identify the first workflow that should be automated and the operating layer needed around it.",
  formButtonLabel: "Send my report",
};

// ── RP02. Customer and Revenue Operations ─────────────────────────────────

const RP02: AiOutcome = {
  resultPageVariant: "RP02",
  headline: "Your customer and revenue workflows may be ready for AI",
  badge: "Revenue workflow opportunity",
  intro:
    "Your answers suggest that customer replies, lead qualification, sales follow-up, proposals, or CRM updates may be taking more manual effort than they should.\n\nThis is one of the clearest areas where AI automation can create visible business impact. The goal is not to replace your sales or customer support team, rather to make sure all leads are followed up, customers answered and proposals prepared faster and more efficient than before.",
  calloutTitle: "Slow follow-up is a huge problem",
  calloutBody:
    "When customer and sales workflows depend too heavily on manual chasing, good opportunities can go cold. AI automation can help draft, route, qualify, remind, update, and escalate so the team spends less time focusing on the process and more time closing the sale.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your customer and revenue automation report.",
  ctaBody:
    "We will send the AI Customer and Revenue Automation Report to your inbox. You can also book a short call after the report is sent if you want help identifying which part of the customer or revenue workflow should be automated first.",
  formButtonLabel: "Send my report",
};

// ── RP03. Finance and Back Office Automation ──────────────────────────────

const RP03: AiOutcome = {
  resultPageVariant: "RP03",
  headline: "Your back office may be carrying too much manual work",
  badge: "Finance and operations automation opportunity",
  intro:
    "Your answers suggest that finance, reporting, invoicing, document review, trackers, or recurring back-office workflows may be creating a lot of manual work.\n\nThis is exactly where AI automation can help reduce repeated work, improve visibility, and create cleaner handoffs between people, documents, spreadsheets, and systems.",
  calloutTitle: "Nobody likes manual back-office work",
  calloutBody:
    "The cost is more than just the time spent preparing reports, checking invoices, updating trackers, or chasing inputs. Management decisions will be delayed, resulting in missed opportunities.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your finance and back-office automation report.",
  ctaBody:
    "We will send the AI Finance and Back Office Automation Report to your inbox. If you want to understand which recurring finance or admin workflow should be automated first, you can book a short call after the report is sent.",
  formButtonLabel: "Send my report",
};

// ── RP04. Internal Operations and Coordination ────────────────────────────

const RP04: AiOutcome = {
  resultPageVariant: "RP04",
  headline: "Your team may be ready for AI automation",
  badge: "Workflow automation opportunity",
  intro:
    "Your answers suggest that internal coordination, approvals, handovers, reminders, admin work, or key-person dependency may be slowing the business down.\n\nThis does not always mean the team is underperforming. More often, it means the workflow is under-designed. Too much context lives in messages, meetings, spreadsheets, or individual memory.",
  calloutTitle: "The bottleneck is the workflow layer",
  calloutBody:
    "AI automation can help monitor work, draft next steps, trigger reminders, summarise context, escalate exceptions, and reduce the amount of manual work and follow ups needed to keep the company moving.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your workflow automation diagnostic.",
  ctaBody:
    "We will send the AI Workflow Automation Diagnostic to your inbox. Based on your answers, you can book a short call after the report is sent to identify where work is getting stuck and what an AI-enabled workflow could look like.",
  formButtonLabel: "Send my report",
};

// ── RP05. Capability Gap ──────────────────────────────────────────────────

const RP05: AiOutcome = {
  resultPageVariant: "RP05",
  headline: "Your business may be ready for AI",
  badge: "Capability partner fit",
  intro:
    "Your answers suggest that the main issue is not whether AI could help. The issue is where to start, how to design the workflow properly, how to integrate it into the business, and how to make sure the system actually works after launch.\n\nThis is where many AI projects fail. Companies test tools, run pilots, or ask staff to use ChatGPT, but the workflow itself does not change. The business still depends on people manually chasing, checking, updating, and remembering what happens next.",
  calloutTitle: "Capability is built through workflow ownership",
  calloutBody:
    "A useful AI system needs more than prompts. It needs diagnosis, process design, implementation, integration, exception handling, adoption support, and ongoing operation. That is why the right partner should not only build the automation, but help operate it until it becomes part of the business.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Capability Partner Roadmap.",
  ctaBody:
    "We will send the AI Capability Partner Roadmap to your inbox. Based on your answers, we recommend booking a short call after the report is sent so we can help identify the right starting point and whether cost support may apply.",
  formButtonLabel: "Send my report",
};

// ── RP06. Starter / Education Track ──────────────────────────────────────

const RP06: AiOutcome = {
  resultPageVariant: "RP06",
  headline: "Your business may not be ready for AI yet",
  badge: "Education track",
  intro:
    "Based on your answers, AI automation may not be an urgent business priority yet. That is not necessarily a bad thing.\n\nThis is the right stage to understand where AI automation usually creates value, what workflow signals to watch for, and when it becomes worth bringing in an AI capabilities partner.",
  calloutTitle: "Start by learning where automation actually matters",
  calloutBody:
    "AI is most useful when it is attached to repeated workflows, clear business outcomes, and enough operational volume. If the business is still early, already well structured, or not ready to act, the best next step is to understand the signals that would make automation more relevant later.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Automation Starter Guide.",
  ctaBody:
    "We will send the AI Automation Starter Guide to your inbox so you can review the key signs, use cases, and readiness questions at your own pace.",
  formButtonLabel: "Get my report",
};

// ── Variant map ────────────────────────────────────────────────────────────

const VARIANT_OUTCOMES: Record<ResultPageVariant, AiOutcome> = {
  RP01: RP01,
  RP02: RP02,
  RP03: RP03,
  RP04: RP04,
  RP05: RP05,
  RP06: RP06,
};

// ── Public API ─────────────────────────────────────────────────────────────

export function getOutcomeForResult(result: FullResult): AiOutcome {
  return VARIANT_OUTCOMES[result.resultPageVariant];
}
