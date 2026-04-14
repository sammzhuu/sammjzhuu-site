import { Nav } from "@/components/nav/Nav"
import { Hero } from "@/components/hero/Hero"
import { About } from "@/components/about/About"
import { Projects } from "@/components/projects/Projects"
import { TechStack } from "@/components/tech-stack/TechStack"
import { Interests } from "@/components/interests/Interests"
import { Footer } from "@/components/footer/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Interests />
      </main>
      <Footer />
    </>
  )
}
