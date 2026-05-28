import { ChangePill } from "~src/components/ChangePill"
import { formatPrice } from "~src/lib/format"
import type { Mover } from "~src/types"

type MoverCardProps = {
  mover: Mover
}

export const MoverCard = ({ mover }: MoverCardProps) => (
  <div className="rounded-lg border border-white/[0.055] bg-white/[0.025] p-2.5 transition duration-150 hover:border-white/[0.11] hover:bg-white/[0.045]">
    <div className="mb-1 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <div className="font-mono text-[12px] font-semibold text-white">{mover.symbol}</div>
        <div className="truncate text-[10px] text-white/38">{mover.name}</div>
      </div>
      <ChangePill value={mover.changePercent} compact />
    </div>
    <div className="font-mono text-[12px] tabular-nums text-white/70">{formatPrice(mover.price)}</div>
  </div>
)
