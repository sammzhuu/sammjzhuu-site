"use client"

import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"
import { about, education } from "@/lib/data"

// Drop a photo into public/ and set this path, e.g. "/profile.jpg"
// Set to null to show the placeholder instead
const PHOTO_SRC: string | null = "/profile.png"

function PhotoSlot() {
  if (PHOTO_SRC) {
    return (
      <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden", border: "1px solid var(--t-border)" }}>
        <img
          src={PHOTO_SRC}
          alt="Samuel Zhu"
          style={{ width: "100%", display: "block", aspectRatio: "3/4", objectFit: "cover" }}
        />
        {/* Scanline overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        aspectRatio: "3/4",
        border: "1px solid var(--t-border)",
        borderRadius: "4px",
        background: "var(--t-surface-2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        color: "var(--t-text-dim)",
      }}
    >
      <span style={{ fontSize: "2rem", opacity: 0.15 }}>◈</span>
      <code style={{ fontSize: "10px", color: "var(--t-text-dim)" }}>photo placeholder</code>
    </div>
  )
}

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <Panel section="portfolio" subsection="about">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "2rem",
            padding: "1.5rem",
            alignItems: "start",
          }}
        >
            {/* Left — photo */}
            <PhotoSlot />

            {/* Right — text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--t-accent)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {"// "} who i am
                </p>
                <p style={{ fontSize: "13px", lineHeight: "1.7", color: "var(--t-text)" }}>
                  {about.body}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--t-border)",
                  paddingTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <p style={{ fontSize: "11px", color: "var(--t-text-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Education
                </p>
                {education.map((e) => (
                  <div key={e.school} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                    <span style={{ fontSize: "13px", color: "var(--t-text)" }}>
                      <span style={{ color: "var(--t-accent-2)" }}>{e.school}</span>
                      {" — "}
                      {e.degree}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--t-text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {e.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </SectionWrapper>
  )
}
