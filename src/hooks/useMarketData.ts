import { useCallback, useEffect, useRef, useState } from "react"

import { fetchMarketOverview, fetchMovers, fetchNews, fetchWatchlistQuotes } from "~src/lib/marketData"
import type { MarketSnapshot } from "~src/types"

export const useMarketData = (symbols: string[], enabled: boolean) => {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasSnapshot = useRef(false)

  const refresh = useCallback(async () => {
    if (!enabled) return
    setRefreshing(hasSnapshot.current)
    setError(null)

    try {
      const [overview, watchlist, gainers, losers, news] = await Promise.all([
        fetchMarketOverview(),
        fetchWatchlistQuotes(symbols),
        fetchMovers("gainers"),
        fetchMovers("losers"),
        fetchNews()
      ])

      setSnapshot({
        overview,
        watchlist,
        gainers,
        losers,
        news,
        updatedAt: new Date().toISOString()
      })
      hasSnapshot.current = true
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Market data unavailable")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [enabled, symbols])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    if (!enabled) return
    const id = window.setInterval(() => void refresh(), 90_000)
    return () => window.clearInterval(id)
  }, [enabled, refresh])

  return {
    error,
    loading,
    refresh,
    refreshing,
    snapshot
  }
}
