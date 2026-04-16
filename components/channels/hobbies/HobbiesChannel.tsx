import { Message } from "@/components/ui/Message"
import { Embed } from "@/components/ui/Embed"
import { interests } from "@/lib/data"

export function HobbiesChannel() {
  return (
    <div className="flex flex-col gap-1 py-4">
      <Message authorName="Samuel Zhu" authorInitials="SZ" authorColor="#5865f2" timestamp="Today at 12:00 AM">
        <p>{interests.body}</p>
        <Embed title="Interests" color="#f0b232">
          <div className="flex flex-wrap gap-2">
            {['Music Production', 'Audio Engineering', 'Robotics', 'Autonomous Systems', 'AI/ML', 'Guitar'].map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--dc-bg-primary)', color: 'var(--dc-text-normal)' }}>{tag}</span>
            ))}
          </div>
        </Embed>
      </Message>
    </div>
  )
}
