import { Hash, Lock } from "lucide-react"
import { CHANNELS, type ChannelId } from "@/lib/constants"

interface ChannelHeaderProps {
  channelId: ChannelId
}

export function ChannelHeader({ channelId }: ChannelHeaderProps) {
  const channel = CHANNELS.find(c => c.id === channelId)
  if (!channel) return null
  const isLocked = 'locked' in channel && channel.locked

  return (
    <header
      className="h-12 px-4 flex items-center gap-2 shrink-0 border-b"
      style={{ borderColor: 'var(--dc-border)', background: 'var(--dc-bg-primary)' }}
    >
      {isLocked
        ? <Lock size={20} style={{ color: 'var(--dc-channel-icon)' }} />
        : <Hash size={20} style={{ color: 'var(--dc-channel-icon)' }} />
      }
      <span className="font-semibold text-sm" style={{ color: 'var(--dc-header-primary)' }}>
        {channel.name}
      </span>
      {channel.topic && (
        <>
          <div className="w-px h-5 mx-1" style={{ background: 'var(--dc-border)' }} />
          <span className="text-sm hidden sm:block overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: 'var(--dc-text-muted)' }}>
            {channel.topic}
          </span>
        </>
      )}
    </header>
  )
}
