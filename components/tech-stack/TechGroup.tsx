import type { TechGroup as TechGroupType } from "@/lib/data"
import { Tag } from "@/components/ui/Tag"

interface TechGroupProps {
  group: TechGroupType
}

export function TechGroup({ group }: TechGroupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <h3
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-accent-eng)",
          margin: 0,
        }}
      >
        {group.group}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {group.items.map((item) => (
          <Tag key={item} label={item} />
        ))}
      </div>
    </div>
  )
}
