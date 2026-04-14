"use client"

import { useState } from "react"
import type { Project } from "@/lib/data"
import { Tag } from "@/components/ui/Tag"

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const isComingSoon = project.status === "coming-soon"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        backgroundColor: "var(--color-surface)",
        border: "1px solid",
        borderColor: hovered && !isComingSoon ? "var(--color-accent-eng)" : "var(--color-border)",
        borderRadius: "6px",
        padding: featured ? "clamp(1.5rem, 3vw, 2.5rem)" : "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color var(--duration-normal) var(--ease-out-expo), transform var(--duration-normal) var(--ease-out-expo), box-shadow var(--duration-normal) var(--ease-out-expo)",
        transform: hovered && !isComingSoon ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered && !isComingSoon ? "0 8px 32px color-mix(in oklch, var(--color-accent-eng) 12%, transparent)" : "none",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Coming Soon overlay */}
      {isComingSoon && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            backgroundColor: "color-mix(in oklch, var(--color-surface) 70%, transparent)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-small)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid var(--color-border)",
              padding: "0.4em 0.9em",
              borderRadius: "4px",
              backgroundColor: "var(--color-surface)",
            }}
          >
            Coming Soon
          </span>
        </div>
      )}

      {/* Context label */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-accent-eng)",
          margin: 0,
        }}
      >
        {project.context}
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize: featured ? "var(--text-h3)" : "1.125rem",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "var(--color-text)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "var(--text-small)",
          color: "var(--color-text-muted)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {project.description}
      </p>

      {/* Highlights (featured only) */}
      {featured && project.highlights.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {project.highlights.map((h) => (
            <li
              key={h}
              style={{
                fontSize: "var(--text-small)",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
              }}
            >
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto", paddingTop: "0.5rem" }}>
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}
