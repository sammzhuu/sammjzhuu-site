import { Message } from "@/components/ui/Message"
import { Embed } from "@/components/ui/Embed"
import { about, techStack } from "@/lib/data"

export function AboutChannel() {
  return (
    <div className="flex flex-col gap-1 py-4">
      <Message authorName="Samuel Zhu" authorInitials="SZ" authorColor="#5865f2" timestamp="Today at 12:00 AM">
        <p>{about.body}</p>
        <Embed title="Education" description="BASc Mechatronics Engineering — University of Waterloo" color="#5865f2" />
      </Message>
      <Message authorName="Samuel Zhu" authorInitials="SZ" authorColor="#5865f2" timestamp="Today at 12:01 AM">
        <p className="mb-2 font-medium" style={{ color: 'var(--dc-header-primary)' }}>Tech Stack</p>
        <div className="flex flex-col gap-2">
          {techStack.map(group => (
            <Embed key={group.group} title={group.group} color="#23a55a">
              <div className="flex flex-wrap gap-1">
                {group.items.map(item => (
                  <span key={item} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--dc-bg-primary)', color: 'var(--dc-text-normal)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </Embed>
          ))}
        </div>
      </Message>
    </div>
  )
}
