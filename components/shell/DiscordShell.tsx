"use client"

import { useState, useMemo } from "react"
import { Menu, Users } from "lucide-react"
import { ServerRail } from "@/components/shell/ServerRail"
import { ChannelSidebar } from "@/components/shell/ChannelSidebar"
import { ChannelHeader } from "@/components/shell/ChannelHeader"
import { MembersPanel } from "@/components/shell/MembersPanel"
import { UserCard } from "@/components/shell/UserCard"
import { MobileDrawers } from "@/components/shell/MobileDrawers"
import { LoadingScreen } from "@/components/shell/LoadingScreen"
import { useActiveChannel } from "@/hooks/useActiveChannel"
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery"
import { SERVER_META, type ChannelId } from "@/lib/constants"
import { WelcomeChannel } from "@/components/channels/welcome/WelcomeChannel"
import { AboutChannel } from "@/components/channels/about/AboutChannel"
import { ProjectsChannel } from "@/components/channels/projects/ProjectsChannel"
import { ExperienceChannel } from "@/components/channels/experience/ExperienceChannel"
import { HobbiesChannel } from "@/components/channels/hobbies/HobbiesChannel"
import { AiChatChannel } from "@/components/channels/ai-chat/AiChatChannel"
import { ContactChannel } from "@/components/channels/contact/ContactChannel"

const CHANNEL_MAP: Record<ChannelId, React.ComponentType> = {
  'welcome': WelcomeChannel,
  'about-me': AboutChannel,
  'projects': ProjectsChannel,
  'experience': ExperienceChannel,
  'hobbies': HobbiesChannel,
  'ai-chat': AiChatChannel,
  'contact': ContactChannel,
}

export function DiscordShell() {
  const [active] = useActiveChannel()
  const [channelsOpen, setChannelsOpen] = useState(false)
  const [membersOpen, setMembersOpen] = useState(false)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const ActiveChannel = useMemo(() => CHANNEL_MAP[active] ?? WelcomeChannel, [active])

  return (
    <>
      <LoadingScreen />
      <div className="flex h-screen overflow-hidden" id="main-content">
        {/* Server rail — hidden on mobile */}
        {!isMobile && <ServerRail serverName={SERVER_META.name} />}

        {/* Channel sidebar — hidden on mobile/tablet (shown in drawer) */}
        {!isMobile && (
          <div className="flex flex-col">
            <ChannelSidebar />
            <UserCard />
          </div>
        )}

        {/* Main content */}
        <main className="flex flex-col flex-1 min-w-0" style={{ background: 'var(--dc-bg-primary)' }}>
          {/* Mobile top bar */}
          {isMobile && (
            <div className="h-12 px-3 flex items-center justify-between border-b shrink-0" style={{ borderColor: 'var(--dc-border)' }}>
              <button onClick={() => setChannelsOpen(true)} aria-label="Open channels" className="p-1.5 rounded" style={{ color: 'var(--dc-text-muted)' }}>
                <Menu size={20} />
              </button>
              <span className="font-semibold text-sm" style={{ color: 'var(--dc-header-primary)' }}>#{active}</span>
              <button onClick={() => setMembersOpen(true)} aria-label="Open members" className="p-1.5 rounded" style={{ color: 'var(--dc-text-muted)' }}>
                <Users size={20} />
              </button>
            </div>
          )}

          <ChannelHeader channelId={active} />

          <div className="flex-1 overflow-y-auto">
            <ActiveChannel />
          </div>
        </main>

        {/* Members panel — hidden on mobile/tablet */}
        {!isMobile && !isTablet && <MembersPanel />}

        {/* Mobile drawers */}
        {isMobile && (
          <MobileDrawers
            channelsOpen={channelsOpen}
            membersOpen={membersOpen}
            onClose={() => { setChannelsOpen(false); setMembersOpen(false) }}
          />
        )}
      </div>
    </>
  )
}
