"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  siPython,
  siTypescript,
  siJavascript,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siFastapi,
  siLangchain,
  siLanggraph,
  siDocker,
  siMongodb,
  siPostgresql,
  siGit,
  siArduino,
  siRos,
  siRaspberrypi,
  siDassaultsystemes,
  siCplusplus,
  siGooglegemini,
  siExpo,
  siScikitlearn,
  siPytorch,
  siTensorflow,
  siOpencv,
  siClaude,
  siHuggingface,
  siPolars,
  siKicad,
  siLinux,
  siHtml5,
} from "simple-icons"
import Image from "next/image"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"
import { techStack } from "@/lib/data"

// ── simple-icons (single-color SVG paths) ────────────────────────────────────
const SI_ICONS: Record<string, { path: string; hex: string }> = {
  Python:          siPython,
  TypeScript:      siTypescript,
  JavaScript:      siJavascript,
  "Next.js":       siNextdotjs,
  React:           siReact,
  "Tailwind CSS":  siTailwindcss,
  Expo:            siExpo,
  FastAPI:         siFastapi,
  LangChain:       siLangchain,
  LangGraph:       siLanggraph,
  "ROS 2":         siRos,
  PyTorch:         siPytorch,
  TensorFlow:      siTensorflow,
  "scikit-learn":  siScikitlearn,
  OpenCV:          siOpencv,
  Claude:          siClaude,
  "GenAI / LLMs":  siHuggingface,
  "Gemini API":    siGooglegemini,
  MongoDB:         siMongodb,
  PostgreSQL:      siPostgresql,
  Git:             siGit,
  Docker:          siDocker,
  Linux:           siLinux,
  Polars:          siPolars,
  KiCAD:           siKicad,
  Arduino:         siArduino,
  "Raspberry Pi":  siRaspberrypi,
  SolidWorks:      siDassaultsystemes,
  "C/C++":         siCplusplus,
  "HTML/CSS":      siHtml5,
}

// ── Inline multi-color SVGs ───────────────────────────────────────────────────
function JavaIcon() {
  return (
    <svg viewBox="0 0 128 128" width="36" height="36" aria-label="Java">
      <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
      <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
      <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
      <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
    </svg>
  )
}

// ── Public asset icons ────────────────────────────────────────────────────────
const PUBLIC_ICONS: Record<string, string> = {
  OnShape: "/onshape.png",
  Azure:   "/azure.png",
}

// ── Text fallbacks ────────────────────────────────────────────────────────────
const TEXT_FALLBACK: Record<string, string> = {
  "PCB Design": "PCB",
  "REST APIs":  "API",
}

// ── Colors ────────────────────────────────────────────────────────────────────
const TECH_COLORS: Record<string, { bg: string; text: string }> = {
  Python:          { bg: "#3776ab20", text: "#4b9cd3" },
  TypeScript:      { bg: "#3178c620", text: "#4a9ede" },
  JavaScript:      { bg: "#f7df1e20", text: "#c9a800" },
  Java:            { bg: "#0074bd15", text: "#4a9fd5" },
  "C/C++":         { bg: "#00599c20", text: "#0077cc" },
  "HTML/CSS":      { bg: "#e34f2620", text: "#e34f26" },
  "Next.js":       { bg: "#ffffff12", text: "#e8e8e8" },
  React:           { bg: "#61dafb18", text: "#4fc4e8" },
  "Tailwind CSS":  { bg: "#06b6d420", text: "#06b6d4" },
  Expo:            { bg: "#1c202420", text: "#888e9b" },
  FastAPI:         { bg: "#00968820", text: "#00b8a0" },
  LangChain:       { bg: "#7fc8ff20", text: "#7fc8ff" },
  LangGraph:       { bg: "#1c3c3c30", text: "#5a9090" },
  "ROS 2":         { bg: "#5ba4cf20", text: "#5ba4cf" },
  PyTorch:         { bg: "#ee4c2c20", text: "#ee4c2c" },
  TensorFlow:      { bg: "#ff6f0020", text: "#ff8c33" },
  "scikit-learn":  { bg: "#f7931e20", text: "#e8851a" },
  OpenCV:          { bg: "#5c3ee820", text: "#8070ee" },
  Claude:          { bg: "#d9775720", text: "#d97757" },
  "GenAI / LLMs":  { bg: "#ffd21e20", text: "#c9a800" },
  "Gemini API":    { bg: "#8e75b220", text: "#a992cc" },
  MongoDB:         { bg: "#47a24820", text: "#5cb85c" },
  PostgreSQL:      { bg: "#4169e120", text: "#6b8fd4" },
  Git:             { bg: "#f0502820", text: "#e05a2b" },
  Docker:          { bg: "#2496ed20", text: "#2496ed" },
  Azure:           { bg: "#0078d420", text: "#3a9fe0" },
  Linux:           { bg: "#fcc62420", text: "#c9a800" },
  Polars:          { bg: "#0075ff20", text: "#3399ff" },
  SolidWorks:      { bg: "#ff000018", text: "#e05555" },
  OnShape:         { bg: "#22c55e18", text: "#4ade80" },
  KiCAD:           { bg: "#314cb020", text: "#5577d4" },
  Arduino:         { bg: "#00979d20", text: "#00b5bc" },
  "Raspberry Pi":  { bg: "#c5102520", text: "#e0304f" },
  "PCB Design":    { bg: "#4caf5020", text: "#66bb6a" },
  "REST APIs":     { bg: "#60a5fa20", text: "#60a5fa" },
}

const CATEGORY_ICONS: Record<string, string> = {
  "Languages":              "</>",
  "Frameworks & Libraries": "[ ]",
  "ML & AI":                "◆",
  "Data & Infrastructure":  "◈",
  "Hardware & Mechanical":  "⚙",
  "Tools & Concepts":       "~",
}

// ── TechChip — landscape rectangle matching reference design ─────────────────
function TechChip({ name }: { name: string }) {
  const colors = TECH_COLORS[name] ?? {
    bg: "rgba(96,165,250,0.08)",
    text: "var(--t-text-muted)",
  }
  const siIcon = SI_ICONS[name]
  const publicUrl = PUBLIC_ICONS[name]
  const fallback = TEXT_FALLBACK[name] ?? name.slice(0, 2).toUpperCase()
  const isJava = name === "Java"

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "16px 8px 12px",
        borderRadius: "6px",
        border: "1px solid var(--t-border)",
        background: "var(--t-bg)",
        minHeight: "80px",
        transition: "border-color 0.15s, background 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = colors.text + "55"
        el.style.background = colors.bg
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = "var(--t-border)"
        el.style.background = "var(--t-bg)"
      }}
    >
      <div style={{ height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isJava ? (
          <JavaIcon />
        ) : siIcon ? (
          <svg role="img" viewBox="0 0 24 24" width="32" height="32" fill={"#" + siIcon.hex} aria-label={name}>
            <path d={siIcon.path} />
          </svg>
        ) : publicUrl ? (
          <Image src={publicUrl} alt={name} width={32} height={32} style={{ objectFit: "contain" }} />
        ) : (
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            color: colors.text,
            letterSpacing: "0.04em",
            fontFamily: "var(--font-mono, monospace)",
          }}>
            {fallback}
          </span>
        )}
      </div>
      <span style={{
        fontSize: "11px",
        color: "var(--t-text-muted)",
        textAlign: "center",
        lineHeight: 1.3,
        whiteSpace: "nowrap",
      }}>
        {name}
      </span>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function InventorySection() {
  const [activeGroup, setActiveGroup] = useState(techStack[0]?.group ?? "")
  const activeItems = techStack.find((g) => g.group === activeGroup)?.items ?? []

  return (
    <SectionWrapper id="inventory">
      <Panel
        section="inventory"
        subsection="tools"
        meta={`${techStack.reduce((acc, g) => acc + g.items.length, 0)} items`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr" }}>
          {/* Sidebar */}
          <div style={{ borderRight: "1px solid var(--t-border)", background: "var(--t-surface-2)" }}>
            {techStack.map((group) => {
              const isActive = group.group === activeGroup
              return (
                <button
                  key={group.group}
                  onClick={() => setActiveGroup(group.group)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    textAlign: "left",
                    background: isActive ? "var(--t-surface)" : "transparent",
                    border: "none",
                    borderLeft: isActive ? "2px solid var(--t-accent)" : "2px solid transparent",
                    color: isActive ? "var(--t-white)" : "var(--t-text-muted)",
                    fontFamily: "var(--font-mono, monospace)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.12s",
                  }}
                >
                  <span style={{ fontSize: "10px", opacity: 0.6, flexShrink: 0 }}>
                    {CATEGORY_ICONS[group.group] ?? "·"}
                  </span>
                  <span style={{ fontSize: "11px", lineHeight: 1.3 }}>{group.group}</span>
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div style={{ background: "var(--t-surface)", padding: "1.25rem" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.5rem",
                }}
              >
                {activeItems.map((item) => (
                  <TechChip key={item} name={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Panel>
    </SectionWrapper>
  )
}
