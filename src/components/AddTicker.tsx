import { Plus } from "lucide-react"
import { useState } from "react"
import type { FormEvent } from "react"

import { IconButton } from "~src/components/IconButton"

type AddTickerProps = {
  onAdd: (symbol: string) => boolean
}

export const AddTicker = ({ onAdd }: AddTickerProps) => {
  const [value, setValue] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const added = onAdd(value)
    if (added) setValue("")
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-1.5">
      <input
        aria-label="Ticker symbol"
        value={value}
        onChange={(event) => setValue(event.target.value.toUpperCase())}
        placeholder="Ticker"
        className="focus-ring h-7 w-[76px] rounded-md border border-white/[0.08] bg-white/[0.035] px-2 font-mono text-[11px] uppercase text-white placeholder:text-white/25"
      />
      <IconButton title="Add ticker" icon={<Plus size={14} />} type="submit" />
    </form>
  )
}
