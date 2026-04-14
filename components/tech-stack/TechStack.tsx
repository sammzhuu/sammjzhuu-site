import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { TechGroup } from "@/components/tech-stack/TechGroup"
import { techStack } from "@/lib/data"

export function TechStack() {
  return (
    <SectionWrapper id="tech-stack" altBg>
      <h2
        id="tech-stack-heading"
        style={{
          fontSize: "var(--text-h2)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
          margin: "0 0 var(--space-lg) 0",
        }}
      >
        Tech Stack
      </h2>

      <div className="tech-grid">
        {techStack.map((group) => (
          <TechGroup key={group.group} group={group} />
        ))}
      </div>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
        }
        @media (min-width: 640px) {
          .tech-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .tech-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </SectionWrapper>
  )
}
