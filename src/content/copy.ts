export const LANDING_COPY = {
  headline: "Your business runs on manual work, are you ready to change that?",
  // subheadline1 split: line break after "efficiency." on desktop
  subheadline1:
    "Most businesses know AI can reduce manual work and improve efficiency. The question is how to ensure your business is ready to adopt AI. Qualified Singapore SMEs may be able to access up to 80% government co-funding for qualified AI deployments.",
  // subheadline2 split: line break after "AI," on desktop
  subheadline2:
    "Take the assessment to find out whether your business is ready to deploy AI, automate workflows and increase operational efficiencies.",
  ctaLabel: "Start the assessment",
  disclaimer: "No credit card. No login. Takes under 3 minutes.",
  trustBar: [
    {
      heading: "See where your team is losing time.",
      body: "The assessment maps the workflows where manual work, key-person dependency, and information fragmentation are quietly slowing the business down.",
    },
    {
      heading: "Know which automation is actually worth it.",
      body: "Not every workflow needs AI. The assessment shows whether your friction is strong enough to justify a build, and which area to start with for the fastest impact.",
    },
    {
      heading: "Leave with a clear next step.",
      body: "Your result tells you exactly what kind of AI support your business may need, whether that means a full operating system build, a single workflow fix, or a capability roadmap before you act.",
    },
  ],
} as const;

export const RESULT_COPY = {
  yourResultLabel: "YOUR RESULT",

  // Form field labels (master spec section 4.13)
  emailLabel: "Business email *",
  emailPlaceholder: "your@company.com",
  emailHelperText:
    "For confidentiality and verified delivery, please use your company email address.",
  personalEmailError:
    "A business email address helps us make sure your report is delivered correctly.",
  namePlaceholder: "Name",
  nameOptional: "(optional)",
  companyPlaceholder: "Company name",
  companyOptional: "(optional)",
  newsletterCheckboxLabel: "I would like to receive newsletters from Bain Squared.",
  privacyNote:
    "Your email is used to send your report and track requested follow-up. We do not send marketing newsletters unless you opt in.",

  // Submit states
  submittingLabel: "Sending...",
  submitBadge: "Sent",
  bookingButtonLabel: "Book a discovery call",

  retakeLabel: "Retake the assessment",
} as const;

// ── Kicker block copy (master result page copy section 7) ─────────────────

export const KICKER_COPY = {
  failure_kicker: {
    title: "Why this needs to be done properly",
    body: "MIT NANDA's 2025 research, The GenAI Divide: State of AI in Business 2025, found that 95 percent of organisations were getting zero return from generative AI initiatives, with only a small minority of integrated pilots extracting measurable value. The issue is usually not the model. It is weak workflow integration, unclear ownership, poor exception handling, and technology deployed before the process is understood.\n\nThat is why Bain Squared starts with the workflow before deploying automation.",
  },
  timing_kicker: {
    title: "Why timing matters",
    body: "Deloitte's 2026 Singapore AI research reported that 72 percent of Singapore businesses plan to deploy agentic AI in several operational areas within two years, up from 15 percent today.\n\nThe shift is already underway. Companies that adopt AI workflow automation early tend to see compounding gains in response time, manual workload, and operating efficiency before competitors catch up.",
  },
  funding_kicker: {
    title: "Your company may be eligible for funding support",
    body: "Qualified Singapore SMEs may be able to access up to 80 percent government co-funding for qualified AI deployments through schemes such as EDG, ECI, EIS, and PSG. Depending on eligibility, a S$50,000 engagement can net out to roughly S$10,000 to S$15,000 after grants and applicable tax deductions. Support depends on company profile, project scope, qualifying costs, scheme availability, approval, and tax position.\n\nThe first step is to map the workflow, estimate ROI, and check which support options may apply.",
  },
} as const;
