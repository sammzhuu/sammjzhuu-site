import { Message } from "@/components/ui/Message"
import { Embed } from "@/components/ui/Embed"

const EXPERIENCE = [
  {
    role: 'Software Engineer Intern',
    company: 'PropSearchGPT',
    period: '2024',
    description: 'Built an AI-powered real estate search platform with LLM-driven conversational search, custom full-text search engine, and real-time streaming responses.',
    tags: ['Python', 'FastAPI', 'LangGraph', 'OpenAI', 'MongoDB'],
  },
] as const

export function ExperienceChannel() {
  return (
    <div className="flex flex-col gap-1 py-4">
      {EXPERIENCE.map((exp, i) => (
        <Message key={i} authorName="Samuel Zhu" authorInitials="SZ" authorColor="#5865f2" timestamp="Today at 12:00 AM">
          <Embed title={exp.role} description={exp.description} color="#f0b232" footer={exp.company + ' · ' + exp.period}>
            <div className="flex flex-wrap gap-1">
              {exp.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--dc-bg-primary)', color: 'var(--dc-text-normal)' }}>{t}</span>
              ))}
            </div>
          </Embed>
        </Message>
      ))}
    </div>
  )
}
