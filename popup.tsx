import { AnimatePresence, motion } from "framer-motion"
import { Activity, RefreshCw, Signal } from "lucide-react"

import { AddTicker } from "~src/components/AddTicker"
import { IconButton } from "~src/components/IconButton"
import { MarketRow } from "~src/components/MarketRow"
import { MoverCard } from "~src/components/MoverCard"
import { NewsItem } from "~src/components/NewsItem"
import { Section } from "~src/components/Section"
import { Skeleton } from "~src/components/Skeleton"
import { useMarketData } from "~src/hooks/useMarketData"
import { useWatchlist } from "~src/hooks/useWatchlist"
import { formatTimestamp } from "~src/lib/format"

import "./src/styles/globals.css"

const Popup = () => {
  const watchlist = useWatchlist()
  const { error, loading, refresh, refreshing, snapshot } = useMarketData(watchlist.symbols, watchlist.ready)

  return (
    <main className="mantis-scroll h-[640px] w-[420px] overflow-y-auto bg-[linear-gradient(180deg,#0A0C0F_0%,#07080A_42%,#050607_100%)] text-white">
      <div className="sticky top-0 z-20 border-b border-white/[0.07] bg-graphite/92 px-4 pb-3 pt-3 backdrop-blur-xl">
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">
              <Signal size={13} className="text-positive/80" />
              Market pulse
            </div>
            <h1 className="mt-1 text-[22px] font-semibold leading-none tracking-normal">Mantis</h1>
          </div>
          <div className="flex items-center gap-2">
            {snapshot && <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/35">{formatTimestamp(snapshot.updatedAt)}</span>}
            <IconButton
              title="Refresh market data"
              icon={<RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />}
              onClick={() => void refresh()}
            />
          </div>
        </header>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 rounded-lg border border-caution/20 bg-caution/10 px-3 py-2 text-[11px] text-caution">
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 p-4">
        <Section title="Market Overview">
          {loading && !snapshot ? (
            <Skeleton />
          ) : (
            <div className="space-y-1.5">
              {snapshot?.overview.map((quote) => <MarketRow key={quote.symbol} quote={quote} variant="overview" />)}
            </div>
          )}
        </Section>

        <Section title="Watchlist" action={<AddTicker onAdd={watchlist.addTicker} />}>
          {loading && !snapshot ? (
            <Skeleton />
          ) : (
            <div className="space-y-1.5">
              {snapshot?.watchlist.map((quote, index) => (
                <MarketRow
                  key={quote.symbol}
                  quote={quote}
                  index={index}
                  total={snapshot.watchlist.length}
                  onMove={(direction) => watchlist.moveTicker(quote.symbol, direction)}
                  onRemove={() => watchlist.removeTicker(quote.symbol)}
                />
              ))}
            </div>
          )}
        </Section>

        <Section title="Top Movers">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-positive/70">
                <Activity size={12} />
                Gainers
              </div>
              <div className="space-y-1.5">
                {snapshot?.gainers.slice(0, 3).map((mover) => <MoverCard key={mover.symbol} mover={mover} />)}
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-negative/70">
                <Activity size={12} />
                Losers
              </div>
              <div className="space-y-1.5">
                {snapshot?.losers.slice(0, 3).map((mover) => <MoverCard key={mover.symbol} mover={mover} />)}
              </div>
            </div>
          </div>
        </Section>

        <Section title="News">
          <div className="space-y-1">
            {snapshot?.news.map((headline) => <NewsItem key={headline.id} headline={headline} />)}
          </div>
        </Section>
      </div>
    </main>
  )
}

export default Popup
