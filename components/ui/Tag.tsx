interface TagProps {
  label: string
  variant?: "default" | "engineering" | "music"
}

export function Tag({ label, variant = "default" }: TagProps) {
  const colorMap: Record<string, React.CSSProperties> = {
    default: {
      color: "var(--color-text-muted)",
      borderColor: "var(--color-border)",
      backgroundColor: "transparent",
    },
    engineering: {
      color: "var(--color-accent-eng)",
      borderColor: "var(--color-accent-eng)",
      backgroundColor: "color-mix(in oklch, var(--color-accent-eng) 8%, transparent)",
    },
    music: {
      color: "var(--color-accent-music)",
      borderColor: "var(--color-accent-music)",
      backgroundColor: "color-mix(in oklch, var(--color-accent-music) 8%, transparent)",
    },
  }

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.75rem",
        letterSpacing: "0.02em",
        padding: "0.2em 0.6em",
        borderRadius: "4px",
        border: "1px solid",
        lineHeight: 1.5,
        whiteSpace: "nowrap",
        ...colorMap[variant],
      }}
    >
      {label}
    </span>
  )
}
