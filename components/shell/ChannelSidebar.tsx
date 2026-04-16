"use client"

import { Hash, Lock, MessageCircle } from "lucide-react"
import { CHANNELS, CHANNEL_CATEGORIES, SERVER_META, type ChannelId } from "@/lib/constants"
import { useActiveChannel } from "@/hooks/useActiveChannel"

const CATEGORY_LABELS: Record<string, string> = {
  [CHANNEL_CATEGORIES.INFO]: 'information',
  [CHANNEL_CATEGORIES.PORTFOLIO]: 'portfolio',
  [CHANNEL_CATEGORIES.CHAT]: 'chat',
}

export function ChannelSidebar() {
  const [active, setChannel] = useActiveChannel()
  const categories = Object.values(CHANNEL_CATEGORIES)

  return (
    <aside className="flex flex-col w-60 shrink-0 select-none" style={{ background: 'var(--dc-bg-secondary)' }} aria-label="Channels">
      <div className="h-12 px-4 flex items-center justify-between font-semibold text-sm border-b shrink-0"
        style={{ borderColor: 'var(--dc-border)', color: 'var(--dc-header-primary)' }}>
        <span>{SERVER_META.name}</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {categories.map(cat => {
          const channels = CHANNELS.filter(c => c.category === cat)
          if (!channels.length) return null
          return (
            <div key={cat} className="mb-4">
              <p className="flex items-center gap-1 px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--dc-text-muted)' }}>
                {CATEGORY_LABELS[cat] ?? cat}
              </p>
              {channels.map(ch => {
                const isActive = active === ch.id
                const isLocked = 'locked' in ch && ch.locked
                return (
                  <button key={ch.id}
                    onClick={() => !isLocked && setChannel(ch.id as ChannelId)}
                    className="flex items-center gap-2 px-2 py-1.5 mx-2 rounded text-[15px] text-left"
                    style={{
                      width: 'calc(100% - 16px)',
                      background: isActive ? 'var(--dc-bg-modifier-selected)' : 'transparent',
                      color: isActive ? 'var(--dc-channel-text-selected)' : isLocked ? 'var(--dc-interactive-muted)' : 'var(--dc-channel-text)',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      transition: 'background 100ms, color 100ms',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={isLocked ? ch.name + ' (locked)' : ch.name}
                  >
                    {isLocked ? <Lock size={16} style={{ color: 'var(--dc-channel-icon)', flexShrink: 0 }} />
                      : ch.category === CHANNEL_CATEGORIES.CHAT ? <MessageCircle size={16} style={{ color: 'var(--dc-channel-icon)', flexShrink: 0 }} />
                      : <Hash size={16} style={{ color: 'var(--dc-channel-icon)', flexShrink: 0 }} />}
                    <span>{ch.name}</span>
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
