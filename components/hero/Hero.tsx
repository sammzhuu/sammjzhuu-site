"use client"

import { useEffect, useState } from "react"
import { socialLinks } from "@/lib/data"

const ROLES = [
  "mechatronics engineer",
  "software developer",
  "robotics builder",
  "musician",
  "autonomous systems",
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = ROLES[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => {
        setDisplayed(target.slice(0, displayed.length + 1))
      }, 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <section
      id="hero"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "clamp(6rem, 15vh, 10rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        paddingInline: "clamp(1.25rem, 5vw, 3rem)",
        maxWidth: "900px",
        marginInline: "auto",
        width: "100%",
      }}
    >
      <h1
        id="hero-heading"
        style={{
          fontSize: "clamp(2.8rem, 1rem + 6vw, 5.5rem)",
          fontWeight: 700,
          color: "var(--t-white)",
          margin: "0 0 1rem",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        Samuel Zhu
      </h1>

      <div
        style={{
          fontSize: "clamp(1rem, 0.5rem + 2vw, 1.4rem)",
          marginBottom: "2rem",
          minHeight: "2em",
          display: "flex",
          alignItems: "center",
          gap: "0.4em",
        }}
      >
        <span style={{ color: "var(--t-text-dim)" }}>~/</span>
        <span style={{ color: "var(--t-accent-2)" }}>{displayed}</span>
        <span className="cursor-blink" />
      </div>

      <p
        style={{
          color: "var(--t-text-muted)",
          fontSize: "14px",
          maxWidth: "480px",
          lineHeight: 1.7,
          margin: "0 0 2.5rem",
        }}
      >
        Mechatronics Engineering @ University of Waterloo.
        Building at the intersection of robotics, AI, and music.
      </p>

      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            style={{
              color: "var(--t-text-muted)",
              textDecoration: "none",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "0.4em",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                "var(--t-accent)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                "var(--t-text-muted)"
            }}
          >
            <span style={{ color: "var(--t-accent)" }}>→</span>
            {link.label}
          </a>
        ))}
      </div>

      <div
        style={{
          marginTop: "3rem",
          color: "var(--t-text-dim)",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          animation: "heroScrollHint 2s ease-in-out infinite",
        }}
      >
        <span>scroll</span>
        <span>↓</span>
      </div>

      <style>{`
        @keyframes heroScrollHint {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(4px); }
        }
      `}</style>
    </section>
  )
}
