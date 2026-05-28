export type Quote = {
  symbol: string
  name: string
  price: number
  changePercent: number
  sparkline: number[]
}

export type MarketAsset = {
  symbol: string
  label: string
  yahooSymbol: string
}

export type WatchlistItem = {
  symbol: string
}

export type Mover = {
  symbol: string
  name: string
  price: number
  changePercent: number
}

export type NewsHeadline = {
  id: string
  title: string
  source: string
  publishedAt: string
  url: string
}

export type MarketSnapshot = {
  overview: Quote[]
  watchlist: Quote[]
  gainers: Mover[]
  losers: Mover[]
  news: NewsHeadline[]
  updatedAt: string
}
