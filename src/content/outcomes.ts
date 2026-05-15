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

export const BOOKING_URL = "https://cal.com/bain-squared/ai";

// ── Result page outcome interface ─────────────────────────────────────────

export interface AiOutcome {
  resultPageVariant: ResultPageVariant;
  headline: string;
  badge: string;
  intro: string;           // \n\n separates paragraphs
  calloutTitle: string;
  calloutBody: string;
  ctaOverline: string;
  ctaHeadline: string;
  ctaBody: string;
  formButtonLabel: string;
  afterSubmit: string;     // per-variant post-submission copy
}

// ── RP01. Hot AI Operating System ─────────────────────────────────────────

const RP01: AiOutcome = {
  resultPageVariant: "RP01",
  headline: "Your business may be ready to adopt Agentic AI automation.",
  badge: "High Urgency",
  intro:
    "Your answers suggest that the issue is not just one slow task or one overloaded person. The business appears to have broader operational friction across follow-ups, coordination, information flow, reporting, or repeated manual work.\n\nThis does not mean the team is doing something wrong. It usually means the business has grown faster than the workflow has been redesigned.",
  calloutTitle: "The opportunity is big.",
  calloutBody:
    "When multiple workflows are slow at the same time, the real problem is usually system design. AI automation can help, but only if the workflows are diagnosed properly, redesigned clearly, implemented into the tools your team already uses, and operated until adoption sticks.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Operating System Blueprint, then speak with us directly.",
  ctaBody:
    "We will send the AI Operating System Blueprint to your inbox. Based on your answers, a short complimentary call will be very helpful for you. The call will be to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next operations review, system rollout, hiring decision, or major workflow change. The blueprint is most useful when paired with a brief conversation about which workflow to start with.",
};

// ── RP02. Warm AI Operating System ────────────────────────────────────────

const RP02: AiOutcome = {
  resultPageVariant: "RP02",
  headline: "Your business may benefit from an AI.",
  badge: "Good Opportunity",
  intro:
    "Your answers suggest there are early signs of operational friction across more than one workflow. Things may still be moving today, but the manual coordination is starting to add up.\n\nThis is a useful stage to understand how AI automation could support how work moves, how information is captured, and how much human chasing is needed to keep the business on track.",
  calloutTitle: "Build before it's too late.",
  calloutBody:
    "AI automation tends to deliver more value when it is attached to a coherent operating layer rather than retrofitted under existing complexity. The earlier you map the workflows that should be automated, the easier it is to design a system that scales as the team grows.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Operating System Blueprint.",
  ctaBody:
    "We will send the AI Operating System Blueprint to your inbox. The blueprint will help you understand which workflows usually anchor an AI operating layer, how they connect, and where to start when the timing is right.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review it before your next operations review, hiring round, or systems and tools planning conversation.",
};

// ── RP03. Hot Customer and Revenue ────────────────────────────────────────

const RP03: AiOutcome = {
  resultPageVariant: "RP03",
  headline: "Your current workflows are ready for AI automation.",
  badge: "High Urgency",
  intro:
    "Your answers suggest that customer replies, lead qualification, sales follow-up, proposals, or CRM updates may be taking more manual effort than they should.\n\nThis is one of the clearest areas where AI automation can create visible business impact. The goal is not to replace your sales or customer support team. It is to make sure leads are followed up, customer questions are answered, and proposals are produced faster than the team can manage on its own.",
  calloutTitle: "Slow follow-up quietly costs revenue.",
  calloutBody:
    "When customer and sales workflows depend too heavily on manual chasing, good opportunities can go cold before anyone notices. AI automation can help draft, route, qualify, remind, update, and escalate, so the team spends less time managing the process and more time talking to customers and closing work.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your Customer and Revenue Automation Report, then speak with us directly.",
  ctaBody:
    "We will send the AI Customer and Revenue Automation Report to your inbox. Based on your answers, a short complimentary call will be helpful for you. The call is simply to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next sales push, pipeline review, or customer support reorganisation. The report is most useful when paired with a brief conversation about which part of the customer or revenue workflow should be automated first.",
};

// ── RP04. Warm Customer and Revenue ───────────────────────────────────────

const RP04: AiOutcome = {
  resultPageVariant: "RP04",
  headline: "Your customer and revenue workflows may benefit from AI automation as they scale.",
  badge: "Good Opportunity",
  intro:
    "Your answers suggest that customer replies, sales follow-up, or proposal work is starting to take more manual effort than it should. Things may still be working, but the workload is creeping up.\n\nThis is the right stage to understand which parts of the customer and revenue workflow could be automated, and which parts are better handled by people.",
  calloutTitle: "Free up your team's time.",
  calloutBody:
    "Most customer and revenue workflows have a routine layer (drafting, routing, qualifying, reminding, updating) and a judgement layer (closing, advising, resolving). AI automation works best when it takes the routine layer off the team's hands so the judgement layer gets more attention.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your Customer and Revenue Automation Report.",
  ctaBody:
    "We will send the AI Customer and Revenue Automation Report to your inbox. The report will help you understand which sales and customer workflows usually benefit from automation first, and what to look for when the time is right.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review it before your next sales planning, customer support staffing, or CRM review conversation.",
};

// ── RP05. Hot Finance and Back Office ─────────────────────────────────────

const RP05: AiOutcome = {
  resultPageVariant: "RP05",
  headline: "Your operations team does too much manual work.",
  badge: "Urgent Review",
  intro:
    "Your answers suggest that finance, reporting, invoicing, document review, trackers, or recurring back-office workflows may be creating a lot of manual load on the team.\n\nThis is exactly where AI automation tends to deliver fast, measurable wins. It is also where weak processes are most likely to delay management decisions and quietly add cost.",
  calloutTitle: "Manual back-office work delays good judgement.",
  calloutBody:
    "The cost is not only the time spent preparing reports, checking invoices, updating trackers, or chasing inputs. It is also the decisions that get delayed, the errors that creep in, and the way the business becomes more dependent on individual memory. Cleaner back-office workflows give leaders better numbers, sooner.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your Finance and Back Office Automation Report, then speak with us directly.",
  ctaBody:
    "We will send the AI Finance and Back Office Automation Report to your inbox. Based on your answers, a short complimentary call may also be helpful. The call is simply to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next month-end close, audit prep, reporting cycle, or finance team capacity decision. The report is most useful when paired with a brief conversation about which finance or admin workflow to automate first.",
};

// ── RP06. Warm Finance and Back Office ────────────────────────────────────

const RP06: AiOutcome = {
  resultPageVariant: "RP06",
  headline: "Your operations may benefit from AI automation as it grows.",
  badge: "Good Opportunity",
  intro:
    "Your answers suggest that finance, reporting, invoicing, document review, or recurring back-office work is starting to take more manual effort than it should. The team can probably still handle it today, but the workload is creeping up.\n\nThis is the right stage to understand where automation usually creates the most value in finance and back-office workflows, before the manual load starts to delay decisions.",
  calloutTitle: "Manual work has a cost.",
  calloutBody:
    "The cost is not always obvious in the short term. It is the slower management reporting, the small errors that get caught late, the time finance spends preparing rather than analysing, and the way knowledge ends up in one person's head. Cleaner workflows make finance easier to run and easier to trust.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your Finance and Back Office Automation Report.",
  ctaBody:
    "We will send the AI Finance and Back Office Automation Report to your inbox. The report will help you understand which finance and back-office workflows usually benefit from automation first, and how to think about the sequencing.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review it before your next month-end close, audit prep, finance team review, or systems decision.",
};

// ── RP07. Hot Internal Workflow ───────────────────────────────────────────

const RP07: AiOutcome = {
  resultPageVariant: "RP07",
  headline: "Your team may be ready for AI workflow automation.",
  badge: "Urgent Review",
  intro:
    "Your answers suggest that internal coordination, approvals, handovers, reminders, admin work, or key-person dependency may be slowing the business down.\n\nThis does not always mean the team is underperforming. More often, it means the workflow is under-designed. Too much context lives in messages, meetings, spreadsheets, or individual memory, and the manual chasing fills the gap.",
  calloutTitle: "The bottleneck is the workflow layer.",
  calloutBody:
    "AI automation can help monitor work, draft next steps, trigger reminders, summarise context, escalate exceptions, and reduce the manual follow-up needed to keep the company moving. The result is fewer dropped balls, less reliance on any single person, and a calmer operating rhythm.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your Workflow Automation Diagnostic, then speak with us directly.",
  ctaBody:
    "We will send the AI Workflow Automation Diagnostic to your inbox. Based on your answers, a short complimentary call may also be helpful for you to understand what you need. The call is simply to help you understand the issues raised in your assessment, discuss what they may mean for your business, and share practical next steps. It usually takes 15 to 30 minutes, with no obligation to proceed further.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next leadership meeting, hiring round, or operations review. The diagnostic is most useful when paired with a brief conversation about where the workflow is getting stuck and what to redesign first.",
};

// ── RP08. Warm Internal Workflow ──────────────────────────────────────────

const RP08: AiOutcome = {
  resultPageVariant: "RP08",
  headline: "Your internal workflows may benefit from AI automation as the team grows.",
  badge: "Good Opportunity",
  intro:
    "Your answers suggest that internal coordination, approvals, handovers, reminders, or documentation are starting to take more manual effort than they should. Things may still be working today, but the workload is creeping into more of the team's day.\n\nThis is the right stage to understand which internal workflows usually benefit most from automation, and how to introduce it without creating new tools that nobody adopts.",
  calloutTitle: "Better workflows usually beat more headcount.",
  calloutBody:
    "As the team grows, internal coordination tends to scale faster than the work itself. AI automation works well here when it removes the manual chasing, captures context, and gives the team a reliable place to look for what is happening next.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your Workflow Automation Diagnostic.",
  ctaBody:
    "We will send the AI Workflow Automation Diagnostic to your inbox. The diagnostic will help you understand where internal workflows usually break, what AI automation can take off the team's hands, and what to redesign first.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review it before your next leadership meeting, hiring round, or operations and tools review.",
};

// ── RP09. Hot Capability Gap ──────────────────────────────────────────────

const RP09: AiOutcome = {
  resultPageVariant: "RP09",
  headline: "Your business may be ready for AI with clear next steps.",
  badge: "High Urgency",
  intro:
    "Your answers suggest that the main issue is not whether AI could help. The issue is where to start, how to design the workflow properly, how to integrate it into the business, and how to make sure the system actually works after launch.\n\nThis is where many AI projects quietly fail. Companies test tools, run pilots, or ask staff to use ChatGPT, but the workflow itself does not change. The business still depends on people manually chasing, checking, updating, and remembering what happens next.",
  calloutTitle: "Capabilities are built through workflows.",
  calloutBody:
    "A useful AI system needs more than prompts. It needs diagnosis, process design, implementation, integration, exception handling, adoption support, and ongoing operation. That is why the right partner should not only build the automation, but help operate it until it becomes part of the business.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Capability Partner Roadmap, then speak with us directly.",
  ctaBody:
    "We will send the AI Capability Partner Roadmap to your inbox. Based on your answers, a short complimentary call may also be helpful. The call is simply to help you understand the issues raised in your assessment, identify the right starting point, and share which support options may apply. It usually takes 15 to 30 minutes, with no obligation to proceed further.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Based on your answers, we strongly recommend booking a short call before your next AI tool decision, internal pilot, or capability hiring round. The roadmap is most useful when paired with a brief conversation about your specific starting point and which support options may apply.",
};

// ── RP10. Warm Capability Gap ─────────────────────────────────────────────

const RP10: AiOutcome = {
  resultPageVariant: "RP10",
  headline: "Your business may be exploring AI without clear goals.",
  badge: "Urgent Review",
  intro:
    "Your answers suggest that you can see how AI could help, but the harder question is where to start. Cost, capability, time, or simply not knowing the right first move can make it easier to delay than to act.\n\nThis is normal at this stage. The most useful next step is usually not another tool. It is a clearer view of which workflow would benefit first, what the build and adoption path looks like, and what cost support may apply.",
  calloutTitle: "The first step is choosing the first workflow.",
  calloutBody:
    "Most AI projects that struggle did not pick the wrong technology. They picked the wrong starting workflow, or they tried to start everywhere at once. A clearer roadmap helps you avoid both, and lets you sequence the work in a way the team can actually adopt.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Capability Partner Roadmap.",
  ctaBody:
    "We will send the AI Capability Partner Roadmap to your inbox. The roadmap will help you understand the typical starting points for capability-light businesses, what to prepare before bringing in a partner, and how to think about cost support that may apply.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review it before your next AI tool decision, internal pilot, or capability hiring round.",
};

// ── RP11. Warm Starter ────────────────────────────────────────────────────

const RP11: AiOutcome = {
  resultPageVariant: "RP11",
  headline: "Your business should understand what AI automation looks like before deciding what to do.",
  badge: "Strategic preparation",
  intro:
    "Your answers suggest that AI automation may not be an urgent business need today, but the topic is worth understanding before competitors, customers, or operational complexity force the conversation.\n\nThis is a good stage to understand where AI automation usually creates value, what workflow signals to watch for, and when it becomes worth bringing in a capability partner.",
  calloutTitle: "Start with what works.",
  calloutBody:
    "The clearest signs that a workflow is ready for AI automation are not always about technology. They tend to show up first as repeated manual work, follow-up that depends on individuals, and information that lives in too many places. Understanding the signals makes it easier to know when the timing is right.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Automation Starter Guide.",
  ctaBody:
    "We will send the AI Automation Starter Guide to your inbox. The guide will help you understand the typical workflow signals to watch for, the common starting points, and what to prepare before bringing AI into the business.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review it at your own pace. It is most useful before your next operations review, hiring round, or systems planning conversation.",
};

// ── RP12. Cold Starter ────────────────────────────────────────────────────

const RP12: AiOutcome = {
  resultPageVariant: "RP12",
  headline: "Your business may not need AI automation yet.",
  badge: "Educational",
  intro:
    "Based on your answers, AI automation may not be an urgent business priority today. That is perfectly fine. Many businesses do best by building the right operational foundations first, and revisiting AI when the workflow load is heavier or the timing is clearer.\n\nThe useful next step is to understand where AI automation usually creates value, so the timing of any future decision is made with a clearer view.",
  calloutTitle: "Learn where automation actually matters.",
  calloutBody:
    "AI is most useful when it is attached to repeated workflows, clear business outcomes, and enough operational volume to make the build worthwhile. If the business is still early, already well-organised, or simply not ready to act, the most valuable thing today is a clearer picture of the signals that would make automation more relevant later.",
  ctaOverline: "Recommended next step",
  ctaHeadline: "Get your AI Automation Starter Guide.",
  ctaBody:
    "We will send the AI Automation Starter Guide to your inbox so you can review the key signs, common use cases, and readiness questions at your own pace.",
  formButtonLabel: "Send my report",
  afterSubmit:
    "Your report has been sent. Please check your inbox and review the guide when useful.",
};

// ── Variant map ────────────────────────────────────────────────────────────

const VARIANT_OUTCOMES: Record<ResultPageVariant, AiOutcome> = {
  RP01: RP01,
  RP02: RP02,
  RP03: RP03,
  RP04: RP04,
  RP05: RP05,
  RP06: RP06,
  RP07: RP07,
  RP08: RP08,
  RP09: RP09,
  RP10: RP10,
  RP11: RP11,
  RP12: RP12,
};

// ── Public API ─────────────────────────────────────────────────────────────

export function getOutcomeForResult(result: FullResult): AiOutcome {
  return VARIANT_OUTCOMES[result.resultPageVariant];
}
