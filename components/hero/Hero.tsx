"use client"

import { motion, type Variants } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { ScrollIndicator } from "@/components/ui/ScrollIndicator"

const WORDS = ["Sam", "Zhuu."]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.55 } },
}

const ruleVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE, delay: 0.75 } },
}

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        paddingInline: "clamp(1.25rem, 5vw, 4rem)",
        maxWidth: "72rem",
        marginInline: "auto",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Label */}
      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-small)",
          color: "var(--color-accent-eng)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        Mechatronics Engineering · University of Waterloo
      </motion.p>

      {/* Hero name */}
      <motion.h1
        id="hero-heading"
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        animate="visible"
        style={{
          fontSize: "var(--text-hero)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          color: "var(--color-text)",
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.25em",
        }}
      >
        {WORDS.map((word) => (
          <motion.span
            key={word}
            variants={reduced ? undefined : wordVariants}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Accent rule */}
      <motion.div
        variants={reduced ? undefined : ruleVariants}
        initial={reduced ? false : "hidden"}
        animate="visible"
        style={{
          height: "2px",
          width: "clamp(4rem, 15vw, 10rem)",
          backgroundColor: "var(--color-accent-eng)",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      />

      {/* Subtitle */}
      <motion.p
        variants={reduced ? undefined : subtitleVariants}
        initial={reduced ? false : "hidden"}
        animate="visible"
        style={{
          fontSize: "clamp(1rem, 0.9rem + 1vw, 1.5rem)",
          color: "var(--color-text-muted)",
          maxWidth: "34ch",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        Building at the intersection of robotics, AI, and music.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  )
}
