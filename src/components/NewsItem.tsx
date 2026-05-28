import { ExternalLink } from "lucide-react"

import { formatTimestamp } from "~src/lib/format"
import type { NewsHeadline } from "~src/types"

type NewsItemProps = {
  headline: NewsHeadline
}

export const NewsItem = ({ headline }: NewsItemProps) => (
  <a
    href={headline.url}
    target="_blank"
    rel="noreferrer"
    className="group grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-transparent px-1.5 py-1.5 transition duration-150 hover:border-white/[0.08] hover:bg-white/[0.035]">
    <div className="min-w-0">
      <div className="line-clamp-2 text-[12px] leading-4 text-white/82 transition group-hover:text-white">{headline.title}</div>
      <div className="mt-1 flex gap-2 text-[10px] uppercase tracking-[0.08em] text-white/35">
        <span>{headline.source}</span>
        <span>{formatTimestamp(headline.publishedAt)}</span>
      </div>
    </div>
    <ExternalLink size={13} className="mt-0.5 text-white/25 transition group-hover:text-white/55" />
  </a>
)
