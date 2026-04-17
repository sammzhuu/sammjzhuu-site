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
  icon: "github" | "linkedin" | "email" | "resume"
  href: string
  label: string
}

export interface ExperienceEntry {
  role: string
  company: string
  period: string
  description: string
  tags: string[]
}

export interface EducationEntry {
  degree: string
  school: string
  period: string
  note: string
}

export const about = {
  heading: "About",
  body: "I'm a Mechatronics Engineering student at the University of Waterloo — a program that sits at the intersection of mechanical design, electrical systems, and software. I'm drawn to problems that span those boundaries: autonomous systems that need to perceive and act in the physical world, AI tools that make complex information accessible, and the creative side of building things that actually work. Outside of engineering, music keeps me grounded and curious in a different way.",
}

export const projects: Project[] = [
  {
    title: "Full-Stack AI Platform",
    context: "Personal Project",
    description:
      "Full-stack AI productivity assistant with a multi-channel communication engine, modular widget dashboard, and serverless backend.",
    highlights: [
      "Gemini-powered communication engine extending to email, calendars, and enterprise platforms",
      "Modular widget-based dashboard (calendar, notes, tasks, images) with TailwindCSS + shadcn/ui",
      "Scalable monorepo architecture with CI/CD pipelines and Prisma-backed PostgreSQL",
      "Serverless backend deployed on Vercel with Next.js App Router",
    ],
    tags: ["TypeScript", "Next.js", "React", "Prisma", "Gemini API", "Vercel", "TailwindCSS"],
    status: "complete",
    featured: true,
  },
  {
    title: "LiDAR Navigation Robot",
    context: "WATonomous Onboarding Assignment",
    description:
      "Autonomous mobile robot with full LiDAR-based perception, A* path planning, and Pure Pursuit control — built as the WATonomous admission assignment.",
    highlights: [
      "C++ ROS2 nodes to process LiDAR point clouds into a 2D costmap for real-time obstacle detection",
      "Fused costmap and odometry into a dynamic world model representing the robot's driving environment",
      "A* path planning for collision-free routes; Pure Pursuit control for sub-centimeter path tracking",
      "Visualized in Foxglove — full node map and navigation architecture documented",
    ],
    tags: ["C++", "ROS 2", "Docker", "LiDAR", "Ubuntu", "Foxglove"],
    status: "complete",
    featured: true,
  },
  {
    title: "3-Key Macropad",
    context: "Hardware Project",
    description:
      "Custom PCB macropad with ATMega32U2, QMK firmware, USB-C, RGB underglow, and a 3D-printed modular case.",
    highlights: [
      "Engineered PCB in KiCAD with ATMega32U2 and ground fill, reducing assembly costs by 30%",
      "Programmed QMK firmware in C with custom layers and function configuration",
      "3D-printed modular case in AutoCAD — improved assembly speed by 30%",
      "USB-C connectivity + RGB underglow for extended customization and device lifespan",
    ],
    tags: ["C", "KiCAD", "QMK", "AutoCAD", "ATMega32U2", "PCB Design"],
    status: "complete",
    featured: false,
  },
  {
    title: "MechCat FTC Robot",
    context: "Competition Team — Robotics Lead",
    description:
      "FTC competition robot with computer vision, a motor-controlled linear slider arm, and a mecanum drivetrain across 3 manufactured iterations.",
    highlights: [
      "Motor-controlled Musumi Linear Slider arm with OpenCV + TensorFlow object recognition",
      "Mecanum drive system with 5 motors + 3 servos for omnidirectional control",
      "3 full robot iterations — aluminum, 3D-printed PLA, and CNC-cut polycarbonate frame",
      "Custom 3D-printed multi-directional scoring claw optimized for game element positioning",
    ],
    tags: ["Java", "OpenCV", "TensorFlow", "OnShape", "3D Printing", "Mechanical Design"],
    status: "complete",
    featured: false,
  },
]

export const techStack: TechGroup[] = [
  { group: "Languages", items: ["Python", "TypeScript", "Java", "C/C++", "HTML/CSS"] },
  { group: "Frameworks & Libraries", items: ["Next.js", "React", "Tailwind CSS", "Expo", "FastAPI", "LangChain", "LangGraph", "ROS 2"] },
  { group: "ML & AI", items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "Claude", "GenAI / LLMs"] },
  { group: "Data & Infrastructure", items: ["MongoDB", "PostgreSQL", "Docker", "Azure", "Polars"] },
  { group: "Hardware & Mechanical", items: ["SolidWorks", "OnShape", "KiCAD", "Arduino", "PCB Design"] },
  { group: "Tools & Concepts", items: ["Git", "Linux", "REST APIs"] },
]

export const interests = {
  heading: "Music & Interests",
  body: "Music has always run parallel to engineering for me. There's something about the structure of a well-produced track — the layering, the tension and release, the way rhythm creates momentum — that feels deeply connected to how I think about systems. I've spent time playing instruments and digging into the technical side of sound: how EQ shapes tone, how compression controls dynamics, how a mix comes together from dozens of small decisions. It's a creative outlet, but it's also a different kind of problem-solving — one where the feedback is immediate and visceral rather than logical. I find that switching between the two keeps both sharper.",
}

export const socialLinks: SocialLink[] = [
  { icon: "github", href: "https://github.com/sammjzhuu", label: "GitHub" },
  { icon: "linkedin", href: "https://linkedin.com/in/sammjzhuu", label: "LinkedIn" },
  { icon: "email", href: "mailto:zjiale1118@gmail.com", label: "Email" },
  { icon: "resume", href: "/Samuel-Zhu-Resume.pdf", label: "Resume" },
]

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack + AI Engineering Intern",
    company: "PropertySearchGPT",
    period: "Jan 2026 – Apr 2026",
    description:
      "Built an AI-powered real estate chat platform: LangGraph streaming backend with multi-model routing (classification vs. tool-calling), a custom Tantivy full-text search engine, geo tools via Google Maps API, prompt injection guardrails, and an Expo mobile app + React/MapLibre web dashboard.",
    tags: ["Python", "FastAPI", "LangGraph", "LangChain", "OpenAI", "MongoDB", "Expo", "MapLibre"],
  },
  {
    role: "Welding Research Assistant",
    company: "CAMJ — University of Waterloo",
    period: "May 2025 – Aug 2025",
    description:
      "Investigated process parameters in Resistance Spot Welding to inform predictive quality control. Trained ML classifiers achieving 97% accuracy, fine-tuned YOLOv11 for weld defect detection (mAP@0.5 = 0.89), and built automated resistance curve analysis pipelines.",
    tags: ["Python", "PyTorch", "YOLOv11", "scikit-learn", "XGBoost", "OpenCV"],
  },
  {
    role: "Battery Team Member",
    company: "Midnight Sun — UWaterloo Solar Car",
    period: "Sep 2024 – Apr 2025",
    description:
      "Designed a lightweight battery enclosure in SolidWorks (20% weight reduction), conducted cell configuration analysis to optimize energy density to 5.25 kWh, and implemented plated cell-level fusing to prevent thermal runaway.",
    tags: ["SolidWorks", "Battery Design", "Mechanical Design"],
  },
]

export const education: EducationEntry[] = [
  {
    degree: "BASc Mechatronics Engineering",
    school: "University of Waterloo",
    period: "2024 – June 2029",
    note: "Mechatronics — mechanical, electrical, and software engineering at the intersection of all three disciplines.",
  },
]
