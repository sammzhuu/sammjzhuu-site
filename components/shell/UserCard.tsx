"use client"

import { useState } from "react"
import { Mic, Headphones, Settings } from "lucide-react"
import { ThemeCustomizer } from "@/components/shell/ThemeCustomizer"

export function UserCard() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <div className="h-[52px] px-2 flex items-center gap-2 shrink-0" style={{ background: 'var(--dc-bg-floating)' }}>
        <div className="relative">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: '#5c6069' }}>
            SZ
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: 'var(--dc-green-online)', borderColor: 'var(--dc-bg-floating)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold overflow-hidden whitespace-nowrap text-ellipsis" style={{ color: 'var(--dc-header-primary)' }}>Samuel Zhu</p>
          <p className="text-xs" style={{ color: 'var(--dc-text-muted)' }}>Online</p>
        </div>
        <div className="flex items-center gap-1">
          {([['Mute', Mic], ['Deafen', Headphones]] as const).map(([label, Icon]) => (
            <button key={label} aria-label={label} className="p-1.5 rounded" style={{ color: 'var(--dc-interactive-normal)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--dc-bg-modifier-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <Icon size={16} />
            </button>
          ))}
          <button aria-label="Settings" className="p-1.5 rounded" style={{ color: 'var(--dc-interactive-normal)' }}
            onClick={() => setSettingsOpen(true)}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--dc-bg-modifier-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <Settings size={16} />
          </button>
        </div>
      </div>
      {settingsOpen && <ThemeCustomizer onClose={() => setSettingsOpen(false)} />}
    </>
  )
}
