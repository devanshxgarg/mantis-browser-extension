import type { MarketAsset, WatchlistItem } from "~src/types"

export const MARKET_ASSETS: MarketAsset[] = [
  { symbol: "SPX", label: "S&P 500", yahooSymbol: "^GSPC" },
  { symbol: "NDX", label: "Nasdaq", yahooSymbol: "^IXIC" },
  { symbol: "DJI", label: "Dow Jones", yahooSymbol: "^DJI" },
  { symbol: "BTC", label: "Bitcoin", yahooSymbol: "BTC-USD" },
  { symbol: "VIX", label: "VIX", yahooSymbol: "^VIX" }
]

export const DEFAULT_WATCHLIST: WatchlistItem[] = [
  { symbol: "AAPL" },
  { symbol: "MSFT" },
  { symbol: "NVDA" },
  { symbol: "AMZN" },
  { symbol: "TSLA" }
]

export const COMPANY_NAME_OVERRIDES: Record<string, string> = {
  AAPL: "Apple",
  AMZN: "Amazon",
  BTC: "Bitcoin",
  "BTC-USD": "Bitcoin",
  DJI: "Dow Jones",
  GOOGL: "Alphabet",
  IXIC: "Nasdaq",
  META: "Meta Platforms",
  MSFT: "Microsoft",
  NFLX: "Netflix",
  NVDA: "NVIDIA",
  SPX: "S&P 500",
  TSLA: "Tesla",
  VIX: "Volatility Index"
}
