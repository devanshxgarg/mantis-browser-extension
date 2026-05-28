import type { ReactNode } from "react"

type SectionProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export const Section = ({ title, action, children }: SectionProps) => (
  <section className="border-t border-white/[0.07] pt-3">
    <div className="mb-2 flex h-7 items-center justify-between">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{title}</h2>
      {action}
    </div>
    {children}
  </section>
)
