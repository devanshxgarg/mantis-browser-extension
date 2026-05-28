import { useCallback, useEffect, useMemo, useState } from "react"

import { DEFAULT_WATCHLIST } from "~src/lib/constants"
import type { WatchlistItem } from "~src/types"

const STORAGE_KEY = "mantis.watchlist"

const normalizeTicker = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "")
    .toUpperCase()
    .slice(0, 12)

const readWatchlist = async (): Promise<WatchlistItem[]> => {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  const stored = result[STORAGE_KEY]
  if (!Array.isArray(stored)) return DEFAULT_WATCHLIST
  const items = stored
    .map((item) => ({ symbol: normalizeTicker(String(item?.symbol ?? "")) }))
    .filter((item) => item.symbol)
  return items.length ? items : DEFAULT_WATCHLIST
}

const writeWatchlist = (items: WatchlistItem[]) => chrome.storage.local.set({ [STORAGE_KEY]: items })

export const useWatchlist = () => {
  const [items, setItems] = useState<WatchlistItem[]>(DEFAULT_WATCHLIST)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    void readWatchlist().then((stored) => {
      if (!active) return
      setItems(stored)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  const persist = useCallback((next: WatchlistItem[]) => {
    setItems(next)
    void writeWatchlist(next)
  }, [])

  const addTicker = useCallback(
    (rawSymbol: string) => {
      const symbol = normalizeTicker(rawSymbol)
      if (!symbol) return false
      if (items.some((item) => item.symbol === symbol)) return false
      persist([...items, { symbol }])
      return true
    },
    [items, persist]
  )

  const removeTicker = useCallback(
    (symbol: string) => {
      persist(items.filter((item) => item.symbol !== symbol))
    },
    [items, persist]
  )

  const moveTicker = useCallback(
    (symbol: string, direction: -1 | 1) => {
      const index = items.findIndex((item) => item.symbol === symbol)
      const nextIndex = index + direction
      if (index < 0 || nextIndex < 0 || nextIndex >= items.length) return
      const next = [...items]
      const [item] = next.splice(index, 1)
      next.splice(nextIndex, 0, item)
      persist(next)
    },
    [items, persist]
  )

  const symbols = useMemo(() => items.map((item) => item.symbol), [items])

  return {
    addTicker,
    items,
    moveTicker,
    ready,
    removeTicker,
    symbols
  }
}
