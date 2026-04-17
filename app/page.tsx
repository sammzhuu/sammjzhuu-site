import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/hero/Hero"
import { ProjectsSection } from "@/components/projects/ProjectsSection"
import { InventorySection } from "@/components/inventory/InventorySection"
import { SocialsSection } from "@/components/socials/SocialsSection"
import { TerminalSection } from "@/components/terminal/TerminalSection"
import { ExperienceSection } from "@/components/experience/ExperienceSection"
import { ContactSection } from "@/components/contact/ContactSection"

export default function Home() {
  return (
    <>
      <div className="crt-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <Hero />
        <TerminalSection />
        <ProjectsSection />
        <ExperienceSection />
        <InventorySection />
        <SocialsSection />
        <ContactSection />
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--t-border)",
          padding: "1.5rem clamp(1.25rem, 5vw, 3rem)",
          textAlign: "center",
          fontSize: "12px",
          color: "var(--t-text-dim)",
        }}
      >
        <span style={{ color: "var(--t-accent)" }}>samuel@portfolio</span>
        {" — "}
        built with Next.js
      </footer>
    </>
  )
}
