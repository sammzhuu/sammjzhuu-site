"use client"

import { useState, useEffect } from "react"

const NAV_LINKS = [
  { href: "#terminal", label: "terminal" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: scrolled ? "1px solid var(--t-border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.3s, border-color 0.3s",
        padding: "0 clamp(1.25rem, 5vw, 3rem)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          marginInline: "auto",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
          style={{
            color: "var(--t-accent)",
            textDecoration: "none",
            fontSize: "14px",
            letterSpacing: "0.04em",
          }}
        >
          samuel@portfolio
          <span style={{ color: "var(--t-text-muted)" }}>:~$</span>
        </a>

        <nav aria-label="Main navigation">
          <ul
            style={{
              display: "flex",
              gap: "clamp(1rem, 3vw, 2rem)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    color: "var(--t-text-muted)",
                    textDecoration: "none",
                    fontSize: "13px",
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
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
