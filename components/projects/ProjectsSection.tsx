"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"
import { projects } from "@/lib/data"

const PROJECT_COLORS: Record<string, string> = {
  PropSearchGPT:    "#60a5fa",
  "WATonomous ASD": "#818cf8",
  "FIRST Robotics": "#34d399",
}

function initials(title: string) {
  return title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
}

function ProjectIcon({ title, active, onClick }: { title: string; active: boolean; onClick: () => void }) {
  const color = PROJECT_COLORS[title] ?? "#60a5fa"
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "6px",
        border: active ? `1px solid ${color}60` : "1px solid var(--t-border)",
        background: active ? `${color}18` : "transparent",
        color: active ? color : "var(--t-text-dim)",
        fontSize: "11px",
        fontWeight: 700,
        fontFamily: "var(--font-mono, monospace)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        flexShrink: 0,
      }}
    >
      {initials(title)}
    </button>
  )
}

function PlaceholderImage({ title }: { title: string }) {
  const color = PROJECT_COLORS[title] ?? "#60a5fa"
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        background: `linear-gradient(135deg, var(--t-surface-2) 0%, ${color}10 100%)`,
        border: "1px solid var(--t-border)",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
        color: "var(--t-text-dim)",
        fontSize: "11px",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <span style={{ fontSize: "1.5rem", opacity: 0.2 }}>⬡</span>
      <code style={{ fontSize: "10px", color: "var(--t-text-dim)" }}>
        public/images/{title.toLowerCase().replace(/\s+/g, "-")}.png
      </code>
    </div>
  )
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]

  return (
    <SectionWrapper id="projects">
      <Panel
        section="portfolio"
        subsection="projects"
        meta={`${projects.length} total`}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr",
          }}
        >
          {/* Icon sidebar */}
          <div
            style={{
              borderRight: "1px solid var(--t-border)",
              padding: "12px 6px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {projects.map((p, i) => (
              <ProjectIcon
                key={p.title}
                title={p.title}
                active={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Detail */}
          <div style={{ padding: "1.25rem" }}>
            <button
              onClick={() => {}}
              style={{
                background: "none",
                border: "none",
                color: "var(--t-text-muted)",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "var(--font-mono, monospace)",
                padding: 0,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Back to list
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                    alignItems: "start",
                  }}
                >
                  {/* Image */}
                  <PlaceholderImage title={active.title} />

                  {/* Info */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "5px",
                          background: `${PROJECT_COLORS[active.title] ?? "#60a5fa"}20`,
                          border: `1px solid ${PROJECT_COLORS[active.title] ?? "#60a5fa"}40`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "9px",
                          fontWeight: 700,
                          color: PROJECT_COLORS[active.title] ?? "#60a5fa",
                          flexShrink: 0,
                          fontFamily: "var(--font-mono, monospace)",
                        }}
                      >
                        {initials(active.title)}
                      </div>
                      <h3
                        id="projects-heading"
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "var(--t-white)",
                        }}
                      >
                        {active.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--t-text)",
                        lineHeight: 1.65,
                        marginBottom: "1rem",
                      }}
                    >
                      {active.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                      }}
                    >
                      {active.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "11px",
                            padding: "3px 8px",
                            borderRadius: "20px",
                            background: "var(--t-surface-2)",
                            color: "var(--t-text-muted)",
                            border: "1px solid var(--t-border)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {active.href && (
                      <a
                        href={active.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          padding: "6px 14px",
                          borderRadius: "3px",
                          background: "rgba(96,165,250,0.1)",
                          color: "var(--t-accent)",
                          border: "1px solid rgba(96,165,250,0.25)",
                          textDecoration: "none",
                        }}
                      >
                        ↗ GitHub
                      </a>
                    )}
                  </div>
                </div>

                {active.highlights.length > 0 && (
                  <div
                    style={{
                      marginTop: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {active.highlights.map((h) => (
                      <div
                        key={h}
                        style={{
                          fontSize: "12px",
                          color: "var(--t-text-muted)",
                          paddingLeft: "0.875rem",
                          borderLeft: "2px solid var(--t-border-2)",
                          lineHeight: 1.55,
                        }}
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Panel>
    </SectionWrapper>
  )
}
