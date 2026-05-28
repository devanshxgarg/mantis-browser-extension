import { COMPANY_NAME_OVERRIDES, MARKET_ASSETS } from "~src/lib/constants"
import type { Mover, NewsHeadline, Quote } from "~src/types"

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        currency?: string
        longName?: string
        shortName?: string
        regularMarketPrice?: number
        chartPreviousClose?: number
        previousClose?: number
      }
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>
        }>
      }
    }>
    error?: { description?: string }
  }
}

type YahooScreenerResponse = {
  finance?: {
    result?: Array<{
      quotes?: Array<{
        symbol?: string
        shortName?: string
        longName?: string
        regularMarketPrice?: number
        regularMarketChangePercent?: number
      }>
    }>
  }
}

const asCleanSymbol = (symbol: string) => symbol.replace(/^\^/, "").toUpperCase()

const nameForSymbol = (symbol: string, fallback?: string) =>
  COMPANY_NAME_OVERRIDES[asCleanSymbol(symbol)] ?? COMPANY_NAME_OVERRIDES[symbol] ?? fallback ?? asCleanSymbol(symbol)

const chartUrl = (symbol: string) =>
  `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=5m&includePrePost=false`

const screenerUrl = (id: "day_gainers" | "day_losers") =>
  `https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&scrIds=${id}&count=5`

const newsUrl =
  "https://feeds.finance.yahoo.com/rss/2.0/headline?s=%5EGSPC,%5EIXIC,%5EDJI,BTC-USD,%5EVIX&region=US&lang=en-US"

const jsonFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json() as Promise<T>
}

const normalizeSeries = (values: Array<number | null | undefined>) =>
  values.filter((value): value is number => typeof value === "number" && Number.isFinite(value))

export const fetchQuote = async (symbol: string, displayName?: string): Promise<Quote> => {
  const data = await jsonFetch<YahooChartResponse>(chartUrl(symbol))
  const result = data.chart?.result?.[0]
  const error = data.chart?.error?.description
  if (!result || error) throw new Error(error ?? `No data for ${symbol}`)

  const closes = normalizeSeries(result.indicators?.quote?.[0]?.close ?? [])
  const lastClose = closes.at(-1)
  const price = result.meta?.regularMarketPrice ?? lastClose
  const previousClose = result.meta?.chartPreviousClose ?? result.meta?.previousClose ?? closes[0]

  if (typeof price !== "number" || typeof previousClose !== "number") {
    throw new Error(`Incomplete quote for ${symbol}`)
  }

  return {
    symbol: asCleanSymbol(symbol),
    name: displayName ?? nameForSymbol(symbol, result.meta?.shortName ?? result.meta?.longName),
    price,
    changePercent: ((price - previousClose) / previousClose) * 100,
    sparkline: closes.length > 1 ? closes : [previousClose, price]
  }
}

export const fetchMarketOverview = () =>
  Promise.all(MARKET_ASSETS.map((asset) => fetchQuote(asset.yahooSymbol, asset.label).then((quote) => ({ ...quote, symbol: asset.symbol }))))

export const fetchWatchlistQuotes = async (symbols: string[]) => {
  const settled = await Promise.allSettled(symbols.map((symbol) => fetchQuote(symbol, nameForSymbol(symbol))))
  return settled.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []))
}

const fallbackMovers: Mover[] = [
  { symbol: "NVDA", name: "NVIDIA", price: 0, changePercent: 0 },
  { symbol: "AAPL", name: "Apple", price: 0, changePercent: 0 },
  { symbol: "TSLA", name: "Tesla", price: 0, changePercent: 0 }
]

export const fetchMovers = async (kind: "gainers" | "losers"): Promise<Mover[]> => {
  try {
    const data = await jsonFetch<YahooScreenerResponse>(screenerUrl(kind === "gainers" ? "day_gainers" : "day_losers"))
    return (
      data.finance?.result?.[0]?.quotes
        ?.filter((quote) => quote.symbol && typeof quote.regularMarketPrice === "number")
        .slice(0, 5)
        .map((quote) => ({
          symbol: asCleanSymbol(quote.symbol ?? ""),
          name: nameForSymbol(quote.symbol ?? "", quote.shortName ?? quote.longName),
          price: quote.regularMarketPrice ?? 0,
          changePercent: quote.regularMarketChangePercent ?? 0
        })) ?? fallbackMovers
    )
  } catch {
    return fallbackMovers
  }
}

export const fetchNews = async (): Promise<NewsHeadline[]> => {
  const response = await fetch(newsUrl)
  if (!response.ok) throw new Error(`News request failed: ${response.status}`)
  const xml = await response.text()
  const document = new DOMParser().parseFromString(xml, "application/xml")

  return Array.from(document.querySelectorAll("item"))
    .slice(0, 5)
    .map((item, index) => ({
      id: item.querySelector("guid")?.textContent ?? `${index}`,
      title: item.querySelector("title")?.textContent ?? "Market headline",
      source: "Yahoo Finance",
      publishedAt: new Date(item.querySelector("pubDate")?.textContent ?? Date.now()).toISOString(),
      url: item.querySelector("link")?.textContent ?? "https://finance.yahoo.com"
    }))
}
