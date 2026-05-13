"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import type { Question as QuestionType } from "@/content/questions";

interface QuestionProps {
  question: QuestionType;
  value: string | string[];
  onChange: (value: string | string[], justToggled?: string) => void;
}

export function Question({ question, value, onChange }: QuestionProps) {
  if (question.type === "multi_select") {
    const selected = Array.isArray(value) ? value : [];
    const exclusive = question.exclusiveOption;
    const max = question.maxSelect;

    const handleCheck = (optionId: string, checked: boolean) => {
      let next: string[];

      if (checked) {
        if (optionId === exclusive) {
          // Exclusive option clears all others
          next = [optionId];
        } else {
          // Remove exclusive if selected; enforce maxSelect
          const base = exclusive ? selected.filter((id) => id !== exclusive) : selected;
          if (max !== undefined && base.length >= max) return;
          next = [...base, optionId];
        }
      } else {
        next = selected.filter((id) => id !== optionId);
      }

      onChange(next, optionId);
    };

    return (
      <div className="space-y-6">
        <div className="space-y-2 text-left">
          <p className="text-2xl font-sans font-bold text-text-primary leading-snug">
            {question.prompt}
          </p>
          {question.helper && (
            <p className="text-sm text-text-secondary">{question.helper}</p>
          )}
        </div>

        <div className="space-y-3" role="group" aria-label={question.prompt}>
          {question.options?.map((option) => {
            const checked = selected.includes(option.id);
            // Disable non-exclusive options when max is reached (unless already checked)
            const atCap =
              max !== undefined &&
              selected.filter((id) => id !== exclusive).length >= max;
            const isDisabled = !checked && atCap && option.id !== exclusive;

            return (
              <button
                key={option.id}
                type="button"
                role="checkbox"
                aria-checked={checked}
                disabled={isDisabled}
                onClick={() => handleCheck(option.id, !checked)}
                className={[
                  "group w-full text-left rounded-xl border px-5 py-4",
                  "transition-all duration-[180ms] cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  checked
                    ? "border-brand-primary bg-brand-primary-soft"
                    : "border-border-default bg-surface-card hover:border-brand-primary/50 hover:bg-surface-card-soft",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={[
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors duration-[180ms]",
                      checked
                        ? "border-brand-primary bg-brand-primary"
                        : "border-border-default",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {checked && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        className="text-text-inverse"
                      >
                        <path
                          d="M1 4l2.5 2.5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-base text-text-primary leading-relaxed">
                      {option.label}
                    </span>
                    {option.helper && (
                      <span className="text-xs text-text-tertiary leading-relaxed">
                        {option.helper}
                      </span>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // single_select
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <p className="text-2xl font-sans font-bold text-text-primary leading-snug">
          {question.prompt}
        </p>
        {question.helper && (
          <p className="text-sm text-text-secondary">{question.helper}</p>
        )}
      </div>

      <RadioGroup.Root
        value={typeof value === "string" ? value : ""}
        onValueChange={(v) => onChange(v, v)}
        className="space-y-3"
        aria-label={question.prompt}
      >
        {question.options?.map((option) => (
          <RadioGroup.Item
            key={option.id}
            value={option.id}
            className={[
              "group w-full text-left rounded-xl border bg-surface-card px-5 py-4",
              "transition-all duration-[180ms] cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
              "data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary-soft",
              "data-[state=unchecked]:border-border-default hover:border-brand-primary/50 hover:bg-surface-card-soft",
            ].join(" ")}
          >
            <div className="flex items-start gap-4">
              <span
                className={[
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-[180ms]",
                  "group-data-[state=checked]:border-brand-primary group-data-[state=checked]:bg-brand-primary",
                  "group-data-[state=unchecked]:border-border-default",
                ].join(" ")}
                aria-hidden="true"
              >
                <RadioGroup.Indicator>
                  <span className="block h-1.5 w-1.5 rounded-full bg-text-inverse" />
                </RadioGroup.Indicator>
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-base text-text-primary leading-relaxed">
                  {option.label}
                </span>
                {option.helper && (
                  <span className="text-xs text-text-tertiary leading-relaxed">
                    {option.helper}
                  </span>
                )}
              </span>
            </div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
