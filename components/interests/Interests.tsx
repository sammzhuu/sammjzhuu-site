import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { interests } from "@/lib/data"

export function Interests() {
  return (
    <SectionWrapper id="music">
      {/* Amber accent bar */}
      <div
        style={{
          width: "3rem",
          height: "3px",
          backgroundColor: "var(--color-accent-music)",
          marginBottom: "2rem",
        }}
        aria-hidden="true"
      />

      <h2
        id="music-heading"
        style={{
          fontSize: "var(--text-h2)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
          margin: "0 0 var(--space-md) 0",
        }}
      >
        {interests.heading}
      </h2>

      <div
        style={{
          maxWidth: "64ch",
          borderLeft: "3px solid var(--color-accent-music)",
          paddingLeft: "1.5rem",
        }}
      >
        <p
          style={{
            fontSize: "var(--text-body)",
            color: "var(--color-text-muted)",
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          {interests.body}
        </p>
      </div>
    </SectionWrapper>
  )
}
