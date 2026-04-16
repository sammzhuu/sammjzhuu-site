"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"
import { techStack } from "@/lib/data"

const TECH_COLORS: Record<string, { bg: string; text: string }> = {
  Python:                { bg: "#3776ab20", text: "#4b9cd3" },
  TypeScript:            { bg: "#3178c620", text: "#4a9ede" },
  JavaScript:            { bg: "#f7df1e20", text: "#c9a800" },
  Java:                  { bg: "#f8982020", text: "#e07b00" },
  "C/C++":               { bg: "#00599c20", text: "#0077cc" },
  "Next.js":             { bg: "#ffffff12", text: "#e8e8e8" },
  React:                 { bg: "#61dafb18", text: "#4fc4e8" },
  FastAPI:               { bg: "#00968820", text: "#00b8a0" },
  LangGraph:             { bg: "#818cf820", text: "#818cf8" },
  "ROS 2":               { bg: "#5ba4cf20", text: "#5ba4cf" },
  MongoDB:               { bg: "#47a24820", text: "#5cb85c" },
  Git:                   { bg: "#f0502820", text: "#e05a2b" },
  Docker:                { bg: "#2496ed20", text: "#2496ed" },
  SolidWorks:            { bg: "#ff000018", text: "#e05555" },
  Arduino:               { bg: "#00979d20", text: "#00b5bc" },
  "Raspberry Pi":        { bg: "#c5102520", text: "#e0304f" },
  "PCB Design":          { bg: "#4caf5020", text: "#66bb6a" },
}

const CATEGORY_ICONS: Record<string, string> = {
  "Languages":             "</>",
  "Frameworks & Libraries": "[ ]",
  "Data & Infrastructure":  "◈",
  "Hardware & Mechanical":  "⚙",
}

function TechChip({ name }: { name: string }) {
  const colors = TECH_COLORS[name] ?? {
    bg: "rgba(96,165,250,0.08)",
    text: "var(--t-text-muted)",
  }
  const initials = name
    .replace(/[^A-Z0-9+#./]/g, "")
    .slice(0, 3) || name.slice(0, 2).toUpperCase()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "12px 10px 10px",
        borderRadius: "6px",
        border: "1px solid var(--t-border)",
        background: "var(--t-bg)",
        minWidth: "80px",
        transition: "border-color 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor =
          colors.text + "60"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = "var(--t-border)"
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: colors.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 700,
          color: colors.text,
          letterSpacing: "0.02em",
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        {initials}
      </div>
      <span
        style={{
          fontSize: "11px",
          color: "var(--t-text-muted)",
          textAlign: "center",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  )
}

export function InventorySection() {
  const [activeGroup, setActiveGroup] = useState(techStack[0]?.group ?? "")
  const activeItems =
    techStack.find((g) => g.group === activeGroup)?.items ?? []

  return (
    <SectionWrapper id="inventory">
      <Panel
        section="inventory"
        subsection="tools"
        meta={`${techStack.reduce((acc, g) => acc + g.items.length, 0)} items`}
      >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
        }}
      >
        {/* Category sidebar */}
        <div
          style={{
            borderRight: "1px solid var(--t-border)",
            background: "var(--t-surface-2)",
          }}
        >
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
                  borderLeft: isActive
                    ? "2px solid var(--t-accent)"
                    : "2px solid transparent",
                  color: isActive ? "var(--t-white)" : "var(--t-text-muted)",
                  fontSize: "12px",
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
                <span style={{ fontSize: "11px", lineHeight: 1.3 }}>
                  {group.group}
                </span>
              </button>
            )
          })}
        </div>

        {/* Icon grid */}
        <div style={{ background: "var(--t-surface)", padding: "1.25rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}
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
