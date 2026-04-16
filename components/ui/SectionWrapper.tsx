"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

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
  const reduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={className}
      style={{
        paddingTop: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingBottom: "clamp(4rem, 3rem + 5vw, 8rem)",
        backgroundColor: altBg ? "var(--t-surface)" : "var(--t-bg)",
      }}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, margin: "-60px" }}
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
    </motion.section>
  )
}
