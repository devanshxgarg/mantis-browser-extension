import { formatPercent } from "~src/lib/format"
import { cn } from "~src/lib/ui"

type ChangePillProps = {
  value: number
  compact?: boolean
}

export const ChangePill = ({ value, compact }: ChangePillProps) => (
  <span
    className={cn(
      "inline-flex items-center justify-center rounded-md border font-mono text-[11px] font-medium tabular-nums",
      compact ? "h-6 min-w-[58px] px-1.5" : "h-7 min-w-[68px] px-2",
      value >= 0
        ? "border-positive/20 bg-positive/10 text-positive"
        : "border-negative/20 bg-negative/10 text-negative"
    )}>
    {formatPercent(value)}
  </span>
)
