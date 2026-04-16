"use client"

import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "PropSearchGPT",
    period: "2024",
    description:
      "Built an AI-powered real estate chat platform. LangChain tool-calling with GPT-4o, custom full-text search on Tantivy, streaming responses with LangGraph checkpointing.",
    tags: ["Python", "FastAPI", "LangGraph", "OpenAI", "MongoDB"],
  },
  {
    role: "ASD Member",
    company: "WATonomous — UWaterloo",
    period: "2024",
    description:
      "Autonomous vehicle design team. Working on autonomous systems development with ROS 2.",
    tags: ["Python", "ROS 2", "Autonomous Systems"],
  },
  {
    role: "Robotics & Software Lead",
    company: "FIRST Robotics",
    period: "2023",
    description:
      "Designed, built, and programmed competition robots under real engineering constraints and strict deadlines.",
    tags: ["Java", "Control Systems", "Mechanical Design"],
  },
]

const EDUCATION = [
  {
    degree: "BASc Mechatronics Engineering",
    school: "University of Waterloo",
    period: "2024 – present",
    note: "Mechatronics — mechanical, electrical, and software engineering combined.",
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "12px",
        color: "var(--t-accent)",
        letterSpacing: "0.1em",
        marginBottom: "0.5rem",
        textTransform: "uppercase",
      }}
    >
      {"// "}
      {children}
    </p>
  )
}

export function ExperienceSection() {
  return (
    <div className="sheet-music-bg">
      <SectionWrapper id="experience">
        <Panel
          section="portfolio"
          subsection="experience"
          meta={`${EXPERIENCE.length + EDUCATION.length} entries`}
        >
        <div style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "11px", color: "var(--t-text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>// work</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          {EXPERIENCE.map((item, i) => (
            <div
              key={item.company}
              style={{
                display: "grid",
                gridTemplateColumns: "24px 1fr",
                gap: "0 1.25rem",
              }}
            >
              {/* Timeline spine */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "5px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--t-accent)",
                    flexShrink: 0,
                  }}
                />
                {i < EXPERIENCE.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      flex: 1,
                      background: "var(--t-border-2)",
                      margin: "4px 0",
                      minHeight: "2rem",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  paddingBottom: i < EXPERIENCE.length - 1 ? "2rem" : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "4px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--t-white)",
                      }}
                    >
                      {item.role}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--t-accent-2)",
                        marginLeft: "8px",
                      }}
                    >
                      @ {item.company}
                    </span>
                  </div>
                  <span
                    style={{ fontSize: "12px", color: "var(--t-text-muted)" }}
                  >
                    {item.period}
                  </span>
                </div>

                <p
                  style={{
                    margin: "0 0 0.75rem",
                    fontSize: "13px",
                    color: "var(--t-text)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        padding: "2px 7px",
                        borderRadius: "2px",
                        background: "rgba(96,165,250,0.05)",
                        color: "var(--t-text-muted)",
                        border: "1px solid var(--t-border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel>education</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "0.5rem" }}>
          {EDUCATION.map((edu) => (
            <div
              key={edu.school}
              style={{
                border: "1px solid var(--t-border)",
                borderRadius: "4px",
                padding: "1.25rem",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--t-white)",
                  }}
                >
                  {edu.degree}
                </span>
                <span
                  style={{ fontSize: "12px", color: "var(--t-text-muted)" }}
                >
                  {edu.period}
                </span>
              </div>
              <span style={{ fontSize: "13px", color: "var(--t-accent-2)" }}>
                {edu.school}
              </span>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "13px",
                  color: "var(--t-text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {edu.note}
              </p>
            </div>
          ))}
        </div>
        </div>
        </Panel>
      </SectionWrapper>
    </div>
  )
}
