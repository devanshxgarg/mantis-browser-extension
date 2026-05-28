export const Skeleton = () => (
  <div className="space-y-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="h-[52px] animate-pulse rounded-lg border border-white/[0.055] bg-white/[0.035]" />
    ))}
  </div>
)
