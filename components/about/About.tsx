import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { about } from "@/lib/data"

export function About() {
  return (
    <SectionWrapper id="about" altBg>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "var(--space-lg)",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Text column */}
        <div>
          <h2
            id="about-heading"
            style={{
              fontSize: "var(--text-h2)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              margin: "0 0 var(--space-md) 0",
            }}
          >
            {about.heading}
          </h2>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-muted)",
              lineHeight: 1.8,
              maxWidth: "60ch",
              margin: 0,
            }}
          >
            {about.body}
          </p>
        </div>

        {/* Headshot placeholder */}
        <div
          aria-label="Headshot placeholder"
          style={{
            aspectRatio: "3 / 4",
            maxWidth: "260px",
            width: "100%",
            backgroundColor: "var(--color-border)",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--color-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 600,
              color: "var(--color-text-muted)",
              letterSpacing: "-0.02em",
            }}
          >
            SZ
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 3fr 2fr !important; }
        }
      `}</style>
    </SectionWrapper>
  )
}
