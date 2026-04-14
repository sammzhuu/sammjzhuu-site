"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_ITEMS } from "@/lib/constants"
import { useScrolledPast } from "@/hooks/useScrollProgress"

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export function Nav() {
  const scrolled = useScrolledPast(60)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = (stored as "light" | "dark") ?? (prefersDark ? "dark" : "light")
    setTheme(initial)
    document.documentElement.setAttribute("data-theme", initial)
  }, [])

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
  }

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
    backgroundColor: scrolled ? "color-mix(in oklch, var(--color-surface) 92%, transparent)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    transition: "background-color var(--duration-normal) var(--ease-out-expo), border-color var(--duration-normal) var(--ease-out-expo)",
  }

  return (
    <nav style={navStyle} aria-label="Main navigation">
      <div style={{ maxWidth: "72rem", marginInline: "auto", paddingInline: "clamp(1.25rem, 5vw, 4rem)", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Monogram */}
        <a
          href="#"
          aria-label="Samuel Zhu — back to top"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "1rem", color: "var(--color-text)", textDecoration: "none", letterSpacing: "-0.02em" }}
        >
          SZ
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hide-mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{ fontSize: "var(--text-small)", color: "var(--color-text-muted)", textDecoration: "none", fontFamily: "var(--font-mono)", letterSpacing: "0.02em", transition: "color var(--duration-fast)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-muted)" }}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: "0.25rem", display: "flex", alignItems: "center", transition: "color var(--duration-fast)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-muted)" }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>

        {/* Mobile controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="show-mobile">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: "0.25rem", display: "flex", alignItems: "center" }}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text)", padding: "0.25rem", display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "currentColor", transition: "transform var(--duration-fast)", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "currentColor", transition: "opacity var(--duration-fast)", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: "currentColor", transition: "transform var(--duration-fast)", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
          >
            <div style={{ paddingInline: "clamp(1.25rem, 5vw, 4rem)", paddingBlock: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontSize: "var(--text-body)", color: "var(--color-text)", textDecoration: "none", fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) { .hide-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 639px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </nav>
  )
}
