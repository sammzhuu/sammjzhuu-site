import { MEMBERS } from "@/lib/constants"

type MemberStatus = 'online' | 'offline'

interface Member {
  id: string
  name: string
  role: string
  status: MemberStatus
  initials: string
  isBot?: boolean
}

export function MembersPanel() {
  const owner = (MEMBERS as readonly Member[]).filter(m => !m.isBot)
  const bots = (MEMBERS as readonly Member[]).filter(m => m.isBot)

  return (
    <aside
      className="w-60 shrink-0 py-4 overflow-y-auto"
      style={{ background: 'var(--dc-bg-secondary)' }}
      aria-label="Members"
    >
      <MemberGroup label="Online" members={owner} />
      <MemberGroup label="Bots" members={bots} />
    </aside>
  )
}

function MemberGroup({ label, members }: { label: string; members: readonly Member[] }) {
  if (!members.length) return null
  return (
    <div className="mb-4">
      <p className="px-4 mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--dc-text-muted)' }}>
        {label} — {members.length}
      </p>
      {members.map(m => (
        <div
          key={m.id}
          className="flex items-center gap-3 px-2 mx-2 py-1 rounded cursor-pointer"
          style={{ transition: 'background 150ms' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div className="relative shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
              style={{ background: m.isBot ? 'var(--dc-blurple)' : '#5c6069' }}
            >
              {m.initials}
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{
                background: m.status === 'online' ? 'var(--dc-green-online)' : 'var(--dc-gray-offline)',
                borderColor: 'var(--dc-bg-secondary)',
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis" style={{ color: 'var(--dc-interactive-normal)' }}>
              {m.name}
            </p>
            {m.isBot && (
              <span
                className="px-1 rounded"
                style={{ background: 'var(--dc-blurple)', color: '#fff', fontSize: '10px' }}
              >
                BOT
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
