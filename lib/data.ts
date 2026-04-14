export type ProjectStatus = "complete" | "coming-soon"

export interface Project {
  title: string
  context: string
  description: string
  highlights: string[]
  tags: string[]
  status: ProjectStatus
  featured: boolean
  href?: string
}

export interface TechGroup {
  group: string
  items: string[]
}

export interface SocialLink {
  icon: "github" | "linkedin" | "email"
  href: string
  label: string
}

export const about = {
  heading: "About",
  body: "I'm a Mechatronics Engineering student at the University of Waterloo — a program that sits at the intersection of mechanical design, electrical systems, and software. I'm drawn to problems that span those boundaries: autonomous systems that need to perceive and act in the physical world, AI tools that make complex information accessible, and the creative side of building things that actually work. Outside of engineering, music keeps me grounded and curious in a different way.",
}

export const projects: Project[] = [
  {
    title: "PropSearchGPT",
    context: "Internship Project",
    description:
      "AI-powered real estate chat platform enabling conversational property search through natural language.",
    highlights: [
      "LLM-driven conversational search using LangChain tool-calling with GPT-4o-mini and GPT-4o-nano",
      "Custom full-text search engine built on Tantivy with road-type normalization (St/Street/Ave/Avenue equivalence)",
      "Multiple retrieval systems: MLS listings, investor listings, location data, market intelligence tools",
      "Real-time streaming responses with MongoDB-backed conversation checkpointing via LangGraph",
      "Guardrails system for message classification and safety filtering",
      "OAuth2 + session auth, rate limiting, caching, and business card OCR via Gemini Vision",
    ],
    tags: ["Python", "FastAPI", "LangGraph", "LangChain", "OpenAI GPT", "MongoDB", "Tantivy", "Google Gemini"],
    status: "complete",
    featured: true,
  },
  {
    title: "WATonomous ASD",
    context: "University Design Team",
    description:
      "Autonomous Systems Design project at WATonomous, the University of Waterloo's autonomous vehicle design team.",
    highlights: [],
    tags: ["Python", "ROS 2", "Autonomous Systems"],
    status: "coming-soon",
    featured: false,
  },
  {
    title: "FIRST Robotics",
    context: "Competition Team",
    description:
      "FIRST Robotics Competition — designing, building, and programming competition robots under real engineering constraints.",
    highlights: [],
    tags: ["Java", "Control Systems", "Robotics"],
    status: "coming-soon",
    featured: false,
  },
]

export const techStack: TechGroup[] = [
  { group: "Languages", items: ["Python", "TypeScript", "Java", "C/C++"] },
  { group: "Frameworks & Libraries", items: ["Next.js", "React", "FastAPI", "LangGraph", "ROS 2"] },
  { group: "Data & Infrastructure", items: ["MongoDB", "Git", "Docker"] },
  { group: "Hardware & Mechanical", items: ["SolidWorks", "Arduino", "Raspberry Pi", "PCB Design"] },
]

export const interests = {
  heading: "Music & Interests",
  body: "Music has always run parallel to engineering for me. There's something about the structure of a well-produced track — the layering, the tension and release, the way rhythm creates momentum — that feels deeply connected to how I think about systems. I've spent time playing instruments and digging into the technical side of sound: how EQ shapes tone, how compression controls dynamics, how a mix comes together from dozens of small decisions. It's a creative outlet, but it's also a different kind of problem-solving — one where the feedback is immediate and visceral rather than logical. I find that switching between the two keeps both sharper.",
}

export const socialLinks: SocialLink[] = [
  { icon: "github", href: "https://github.com/sammjzhuu", label: "GitHub" },
  { icon: "linkedin", href: "https://linkedin.com/in/sammjzhuu", label: "LinkedIn" },
  { icon: "email", href: "mailto:placeholder@example.com", label: "Email" },
]
