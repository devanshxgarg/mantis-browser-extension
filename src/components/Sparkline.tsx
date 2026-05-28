import { cn } from "~src/lib/ui"

type SparklineProps = {
  values: number[]
  positive: boolean
  className?: string
}

export const Sparkline = ({ values, positive, className }: SparklineProps) => {
  const clean = values.filter((value) => Number.isFinite(value))
  const min = Math.min(...clean)
  const max = Math.max(...clean)
  const range = max - min || 1
  const points = clean
    .map((value, index) => {
      const x = clean.length === 1 ? 50 : (index / (clean.length - 1)) * 100
      const y = 30 - ((value - min) / range) * 26 + 2
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(" ")

  return (
    <svg className={cn("h-8 w-24 overflow-visible", className)} viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#4ADE80" : "#FB7185"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
