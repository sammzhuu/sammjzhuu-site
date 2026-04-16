import type { ReactNode } from "react"

interface MessageProps {
  authorName: string
  authorInitials: string
  authorColor?: string
  timestamp: string
  isBot?: boolean
  children: ReactNode
}

export function Message({ authorName, authorInitials, authorColor = '#5c6069', timestamp, isBot, children }: MessageProps) {
  return (
    <div className="flex gap-4 px-4 py-1 group" style={{ transition: 'background 50ms' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0 mt-0.5"
        style={{ background: authorColor }}>
        {authorInitials}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ color: 'var(--dc-header-primary)' }}>{authorName}</span>
          {isBot && (
            <span className="px-1 rounded text-white" style={{ background: 'var(--dc-blurple)', fontSize: '10px' }}>BOT</span>
          )}
          <span className="text-xs" style={{ color: 'var(--dc-text-muted)' }}>{timestamp}</span>
        </div>
        <div style={{ color: 'var(--dc-text-normal)', lineHeight: 1.4 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
