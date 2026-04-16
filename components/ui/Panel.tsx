import React from "react"

interface PanelProps {
  section: string
  subsection: string
  meta?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Panel({ section, subsection, meta, children, style }: PanelProps) {
  return (
    <div
      style={{
        border: "1px solid var(--t-border)",
        borderRadius: "4px",
        background: "var(--t-surface)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          height: "32px",
          borderBottom: "1px solid var(--t-border)",
          background: "var(--t-surface-2)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ color: "var(--t-accent)", fontSize: "7px" }}>●</span>
          <span style={{ color: "var(--t-text-dim)", textTransform: "uppercase" }}>
            {section}
          </span>
          <span style={{ color: "var(--t-text-dim)", opacity: 0.35 }}>/</span>
          <span style={{ color: "var(--t-text-muted)", textTransform: "uppercase" }}>
            {subsection}
          </span>
        </span>
        {meta && (
          <span
            style={{
              fontSize: "10px",
              color: "var(--t-text-dim)",
              letterSpacing: "0.06em",
            }}
          >
            {meta}
          </span>
        )}
      </div>

      {/* Body */}
      <div>{children}</div>
    </div>
  )
}
