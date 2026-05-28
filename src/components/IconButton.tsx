import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "~src/lib/ui"

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
}

export const IconButton = ({ icon, className, ...props }: IconButtonProps) => (
  <button
    className={cn(
      "focus-ring grid h-7 w-7 place-items-center rounded-md border border-white/[0.08] bg-white/[0.035] text-white/55 transition duration-150 hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-35",
      className
    )}
    {...props}>
    {icon}
  </button>
)
