"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface SectionWrapperProps {
  id: string
  className?: string
  children: React.ReactNode
  altBg?: boolean
}

export function SectionWrapper({ id, className = "", children, altBg = false }: SectionWrapperProps) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={className}
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: altBg ? "var(--color-surface-alt)" : "var(--color-surface)",
      }}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div
        style={{
          maxWidth: "72rem",
          marginInline: "auto",
          paddingInline: "clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        {children}
      </div>
    </motion.section>
  )
}
