import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { projects } from "@/lib/data"

export function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="projects">
      <h2
        id="projects-heading"
        style={{
          fontSize: "var(--text-h2)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
          margin: "0 0 var(--space-lg) 0",
        }}
      >
        Selected Projects
      </h2>

      {/* Bento grid */}
      <div className="bento-grid">
        {/* Featured card — full width on desktop */}
        {featured && (
          <div className="bento-featured">
            <ProjectCard project={featured} featured />
          </div>
        )}

        {/* Regular cards */}
        {rest.map((project) => (
          <div key={project.title} className="bento-card">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .bento-featured { grid-column: 1 / -1; }
        .bento-card { grid-column: 1 / -1; }

        @media (min-width: 768px) {
          .bento-grid { grid-template-columns: 1fr 1fr; }
          .bento-featured { grid-column: 1 / -1; }
          .bento-card { grid-column: span 1; }
        }
      `}</style>
    </SectionWrapper>
  )
}
