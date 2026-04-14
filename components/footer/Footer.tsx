import { socialLinks } from "@/lib/data"
import { SocialLink } from "@/components/ui/SocialLink"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingBlock: "3rem",
        paddingInline: "clamp(1.25rem, 5vw, 4rem)",
        backgroundColor: "var(--color-surface-alt)",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          marginInline: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        {/* Social links */}
        <nav aria-label="Social links" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {socialLinks.map((link) => (
            <SocialLink key={link.icon} link={link} />
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          © {year} Samuel Zhu
        </p>
      </div>
    </footer>
  )
}
