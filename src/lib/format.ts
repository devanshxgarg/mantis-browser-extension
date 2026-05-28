const compactFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})

const largeFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
})

const priceFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit"
})

export const formatIndexValue = (value: number) => {
  if (!Number.isFinite(value)) return "—"
  return value >= 1000 ? largeFormatter.format(value) : compactFormatter.format(value)
}

export const formatPrice = (value: number) => {
  if (!Number.isFinite(value)) return "—"
  if (value >= 1000) return largeFormatter.format(value)
  return priceFormatter.format(value)
}

export const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) return "—"
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

export const formatTimestamp = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return timeFormatter.format(date)
}

export const initials = (value: string) =>
  value
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase()
