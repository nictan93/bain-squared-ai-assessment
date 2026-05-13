import { Progress } from "@/components/ui/Progress";
import { Bracket } from "@/components/ui/Bracket";

interface ProgressHeaderProps {
  current: number;
  total: number;
}

export function ProgressHeader({ current, total }: ProgressHeaderProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans">
          <Bracket className="text-xs">AI Automation Assessment</Bracket>
        </span>
        <span className="text-xs font-sans text-text-secondary">
          {current} / {total}
        </span>
      </div>
      <Progress
        value={pct}
        label={`Question ${current} of ${total}`}
      />
    </div>
  );
}
