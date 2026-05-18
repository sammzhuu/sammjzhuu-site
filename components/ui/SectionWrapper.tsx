"use client"

import { useRef, useEffect, useState } from "react"

interface SectionWrapperProps {
  id: string
  className?: string
  children: React.ReactNode
  altBg?: boolean
}

export function SectionWrapper({
  id,
  className = "",
  children,
  altBg = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const revealed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || revealed.current) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    function check() {
      if (!el || revealed.current) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.88 && rect.bottom > 0
      if (!inView) return
      revealed.current = true
      window.removeEventListener("scroll", check)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }

    window.addEventListener("scroll", check, { passive: true })
    // Defer initial check one tick so layout is settled
    const t = setTimeout(check, 0)

    return () => {
      window.removeEventListener("scroll", check)
      clearTimeout(t)
    }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={className || undefined}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s cubic-bezier(0.23, 1, 0.32, 1), transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
        paddingTop: "clamp(1.5rem, 1rem + 2vw, 3rem)",
        paddingBottom: "clamp(1.5rem, 1rem + 2vw, 3rem)",
        backgroundColor: altBg ? "var(--t-surface)" : "transparent",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          marginInline: "auto",
          paddingInline: "clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {children}
      </div>
    </section>
  )
}
