import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LANDING_COPY } from "@/content/copy";

function IconFriction() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconWorkflows() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconStartingPoint() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 14h4m-4 4h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const benefitIcons = [IconFriction, IconWorkflows, IconStartingPoint];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas">

      {/* Header */}
      <header className="px-4 sm:px-6 py-4">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          <img src="/logo.png" alt="Bain Squared" className="h-8 w-auto" />
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 sm:px-6 pb-6">

        {/* Hero card */}
        <div className="max-w-[1320px] w-full mx-auto bg-surface-card rounded-[32px] shadow-sm overflow-hidden">
          <div className="px-8 sm:px-16 md:px-24 pt-16 pb-16 flex flex-col items-start sm:items-center text-left sm:text-center min-h-[560px]">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-text-primary leading-[1.05] tracking-[-0.03em] mb-6">
              Is your team productive,
              <br className="hidden sm:inline" />
              {" "}or just{" "}
              <span className="text-state-warning">[busy]</span>?
            </h1>

            <p className="text-base sm:text-lg text-text-secondary mb-4 leading-relaxed max-w-2xl">
              {LANDING_COPY.subheadline1}
            </p>

            <p className="text-base sm:text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl">
              {LANDING_COPY.subheadline2}
            </p>

            <div className="mt-auto flex flex-col items-start sm:items-center">
              <Link href="/scorecard">
                <Button variant="primary" size="lg">
                  {LANDING_COPY.ctaLabel}
                </Button>
              </Link>

              <p className="text-sm text-text-tertiary mt-4 text-center">
                {LANDING_COPY.disclaimer}
              </p>
            </div>

          </div>
        </div>

        {/* Feature pillars */}
        <div className="max-w-[1320px] w-full mx-auto mt-12 grid md:grid-cols-3 gap-12 px-4 sm:px-8">
          {LANDING_COPY.benefits.map((benefit, i) => {
            const Icon = benefitIcons[i];
            return (
              <div key={benefit.title} className="flex flex-col items-start sm:items-center text-left sm:text-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary-soft text-brand-primary flex items-center justify-center shrink-0">
                  <Icon />
                </div>
                <h2 className="text-sm sm:text-base font-sans font-semibold text-text-primary leading-snug">
                  {benefit.title}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {benefit.body}
                </p>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="px-6 py-8">
        <p className="text-xs font-sans text-text-tertiary text-center">
          © 2026 Bain Squared | All rights reserved.
        </p>
      </footer>

    </div>
  );
}
