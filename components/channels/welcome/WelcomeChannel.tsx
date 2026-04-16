import { Message } from "@/components/ui/Message"
import { Embed } from "@/components/ui/Embed"

export function WelcomeChannel() {
  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="px-4 py-6 mb-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ background: 'var(--dc-blurple)' }}>
          SZ
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--dc-header-primary)' }}>Welcome to Samuel Zhu&apos;s server!</h1>
        <p style={{ color: 'var(--dc-text-muted)' }}>This is the beginning of this server.</p>
      </div>
      <div className="h-px mx-4 mb-4" style={{ background: 'var(--dc-border)' }} />
      <Message authorName="Samuel Zhu" authorInitials="SZ" authorColor="#5865f2" timestamp="Today at 12:00 AM">
        <p>Hey there! 👋 Welcome to my portfolio server.</p>
        <Embed title="About this server" description="Browse the channels on the left to learn about my projects, experience, and interests. You can also chat with SamBot in #ai-chat to ask questions about me." color="#5865f2" footer="Use the channel list to navigate">
          <div className="flex flex-wrap gap-2 mt-1">
            {['#about-me', '#projects', '#experience', '#hobbies', '#ai-chat'].map(ch => (
              <span key={ch} className="text-sm" style={{ color: 'var(--dc-text-link)' }}>{ch}</span>
            ))}
          </div>
        </Embed>
      </Message>
    </div>
  )
}
