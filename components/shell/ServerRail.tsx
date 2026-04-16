"use client"

import { SERVER_META } from "@/lib/constants"

interface ServerRailProps {
  serverName: string
}

export function ServerRail({ serverName }: ServerRailProps) {
  return (
    <nav
      className="flex flex-col items-center gap-2 py-3 w-[72px] shrink-0"
      style={{ background: 'var(--dc-bg-tertiary)' }}
      aria-label="Servers"
    >
      <button
        className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm transition-all duration-200 hover:rounded-xl shrink-0"
        style={{ background: 'var(--dc-blurple)' }}
        aria-label={serverName}
        title={serverName}
      >
        {SERVER_META.iconInitials}
      </button>
      <div className="w-8 h-px my-1" style={{ background: 'var(--dc-border)' }} />
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl cursor-pointer transition-all duration-200 hover:rounded-xl"
        style={{ background: 'var(--dc-bg-secondary)', color: 'var(--dc-text-muted)' }}
        aria-hidden="true"
      >
        +
      </div>
    </nav>
  )
}
