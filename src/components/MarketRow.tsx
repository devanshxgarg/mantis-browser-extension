import { ArrowDown, ArrowUp, GripVertical, Trash2 } from "lucide-react"

import { ChangePill } from "~src/components/ChangePill"
import { IconButton } from "~src/components/IconButton"
import { Sparkline } from "~src/components/Sparkline"
import { formatIndexValue, formatPrice } from "~src/lib/format"
import { cn } from "~src/lib/ui"
import type { Quote } from "~src/types"

type MarketRowProps = {
  quote: Quote
  variant?: "overview" | "watchlist"
  index?: number
  total?: number
  onMove?: (direction: -1 | 1) => void
  onRemove?: () => void
}

export const MarketRow = ({ quote, variant = "watchlist", index = 0, total = 1, onMove, onRemove }: MarketRowProps) => {
  const positive = quote.changePercent >= 0

  return (
    <div
      className={cn(
        "group grid items-center gap-2 rounded-lg border border-white/[0.055] bg-white/[0.025] px-2.5 py-2 shadow-insetline transition duration-150 hover:border-white/[0.11] hover:bg-white/[0.045]",
        variant === "overview" ? "grid-cols-[72px_1fr_72px_84px]" : "grid-cols-[1fr_70px_68px_82px_58px]"
      )}>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[13px] font-semibold tabular-nums text-white">{quote.symbol}</span>
          {variant === "watchlist" && <GripVertical size={13} className="text-white/18" />}
        </div>
        <div className="truncate text-[11px] text-white/40">{quote.name}</div>
      </div>

      <div className="text-right font-mono text-[13px] font-medium tabular-nums text-white/88">
        {variant === "overview" ? formatIndexValue(quote.price) : formatPrice(quote.price)}
      </div>
      <ChangePill value={quote.changePercent} compact={variant === "watchlist"} />
      <Sparkline values={quote.sparkline} positive={positive} />

      {variant === "watchlist" && (
        <div className="flex justify-end gap-1 opacity-65 transition group-hover:opacity-100">
          <IconButton title="Move up" disabled={index === 0} icon={<ArrowUp size={13} />} onClick={() => onMove?.(-1)} />
          <IconButton title="Move down" disabled={index === total - 1} icon={<ArrowDown size={13} />} onClick={() => onMove?.(1)} />
          <IconButton title="Remove" icon={<Trash2 size={13} />} onClick={onRemove} />
        </div>
      )}
    </div>
  )
}
