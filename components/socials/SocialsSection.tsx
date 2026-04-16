"use client"

import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"
import { socialLinks } from "@/lib/data"

const SOCIAL_META: Record<string, { handle: string; symbol: string }> = {
  GitHub:   { handle: "github.com/sammjzhuu",   symbol: "⌥" },
  LinkedIn: { handle: "in/sammjzhuu",            symbol: "◈" },
  Email:    { handle: "zjiale1118@gmail.com",     symbol: "✉" },
}

export function SocialsSection() {
  return (
    <SectionWrapper id="socials">
      <Panel section="social" subsection="connect" meta={`${socialLinks.length} links`}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {socialLinks.map((link, i) => {
          const meta = SOCIAL_META[link.label]
          const isLastRow = i >= socialLinks.length - 2
          const isLeftCol = i % 2 === 0

          return (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderBottom: isLastRow ? "none" : "1px solid var(--t-border)",
                borderRight: isLeftCol ? "1px solid var(--t-border)" : "none",
                textDecoration: "none",
                background: "var(--t-surface)",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  "var(--t-surface-2)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  "var(--t-surface)"
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--t-accent)",
                  flexShrink: 0,
                  width: "20px",
                  textAlign: "center",
                }}
              >
                {meta?.symbol ?? "→"}
              </span>
              <div>
                <p
                  style={{
                    margin: "0 0 3px",
                    fontSize: "11px",
                    color: "var(--t-text-muted)",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--t-white)",
                    lineHeight: 1,
                  }}
                >
                  {meta?.handle ?? link.href}
                </p>
              </div>
            </a>
          )
        })}
      </div>
      </Panel>
    </SectionWrapper>
  )
}
