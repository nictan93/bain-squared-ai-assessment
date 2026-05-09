export const LANDING_COPY = {
  subheadline1:
    "Most businesses have workflows that work against them. Admin stacks up, context gets lost, and good people spend their day chasing and checking instead of moving the business forward.",
  subheadline2:
    "The assessment identifies where AI automation can reduce the friction, which workflows to target first, and what the right starting point looks like for your business.",
  ctaLabel: "Start the assessment",
  disclaimer: "No credit card. No login. Takes under 3 minutes.",
  benefits: [
    {
      title: "Find out where your biggest friction is.",
      body: "The assessment maps where your team spends the most time and where manual work is slowing down growth, decisions, or customer delivery.",
    },
    {
      title: "Understand which AI workflows fit your business.",
      body: "Not every AI tool creates value. Your result matches the right automation approach to your stage, team size, and the workflows that matter most.",
    },
    {
      title: "Leave with a clear starting point.",
      body: "Your result tells you what to do first, whether that means a specific workflow to automate, a capability partner to engage, or a readiness milestone to reach.",
    },
  ],
} as const;

export const RESULT_COPY = {
  yourResultLabel: "YOUR RESULT",

  // Form field labels (V3 spec section 3)
  emailLabel: "Business email *",
  emailPlaceholder: "your@company.com",
  emailHelperText:
    "Use your company email. Personal email addresses cannot receive the report.",
  personalEmailError:
    "Please use your business email so we can send the correct report.",
  namePlaceholder: "Name",
  nameOptional: "(optional)",
  companyPlaceholder: "Company name",
  companyOptional: "(optional)",
  newsletterCheckboxLabel: "I would like to receive newsletters from Bain Squared.",
  privacyNote:
    "Your email is used to send your report and track requested follow-up.\nWe do not send marketing newsletters unless you opt in.",

  // Submit states
  submittingLabel: "Sending...",
  submitBadge: "Sent",
  bookingButtonLabel: "Book a discovery call",

  retakeLabel: "Retake the assessment",
} as const;

// ── Kicker block copy (V3 spec section 5) ─────────────────────────────────

export const KICKER_COPY = {
  failure_kicker: {
    title: "Why this needs to be done properly",
    body: "MIT NANDA's 2025 research found that 95% of organisations were getting zero return from GenAI initiatives, with only a small minority of integrated pilots extracting measurable value. The issue is usually not the model, rather weak workflow integration, unclear ownership, and technology deployed before the process is redesigned.\n\nThat is why Bain Squared starts with the workflow before deploying automation.",
  },
  timing_kicker: {
    title: "Why timing matters",
    body: "Deloitte's 2026 Singapore AI research reported that 72% of Singapore businesses plan to deploy agentic AI in several operational areas within two years, up from 15% today.\n\nThe AI era is here. If your competitors start adopting AI today, you will be left behind. It usually shows up later as faster response times, lower costs with better margins, and stronger operating efficiency.",
  },
  funding_kicker: {
    title: "Your company may be eligible for grants",
    body: "Qualified Singapore SMEs can access up to 70% government co-funding for qualified AI deployments through EDG, ECI, EIS, and PSG. A S$50,000 engagement can net out to S$10,000 to S$15,000 after grants and tax deductions. Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position.\n\nDon't worry too much about the cost, we've done the ROI calculation. The first step is to map the workflow, estimate ROI, and check which support options may apply.",
  },
} as const;
