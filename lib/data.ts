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
  highlights?: string[]
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
  body: "I'm a Mechatronics Engineering student at the University of Waterloo - a program that sits at the intersection of mechanical design, electrical systems, and software. I'm drawn to problems that span those boundaries: autonomous systems that need to perceive and act in the physical world, AI tools that make complex information accessible, and the creative side of building things that actually work. Outside of engineering, I'm a musician with 10+ year of piano experience, and currently exploring guitar in my spare time. I find that music and engineering feed into each other in unexpected ways - both require a mix of creativity and structure, and I love how they can be both deeply technical and deeply human at the same time.",
}

export const projects: Project[] = [
  {
    title: "Visual Music Recommender",
    context: "Personal Project",
    description:
      "Cross-modal music recommendation system that maps album cover art to audio via a shared embedding space, enabling image-based music search by visual-aesthetic alignment.",
    highlights: [
      "Trained dual 512→256 projection heads with InfoNCE contrastive loss to align frozen CLIP image and CLAP audio encoders into a shared cross-modal embedding space; optimized with AdamW and cosine annealing LR",
      "Curated a ~2,740-track dataset via iTunes Search API with 60+ targeted genre/aesthetic queries and deduplication by artist + title; built incremental embedding extraction to expand the dataset without full reprocessing",
      "Indexed projected 256-dim embeddings in FAISS for real-time image-to-music retrieval; applied UMAP (cosine metric) for embedding space visualization with score-weighted position interpolation to place query images on the map at inference",
    ],
    tags: ["Python", "PyTorch", "CLIP", "CLAP", "FAISS", "UMAP", "FastAPI", "HuggingFace"],
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
  { group: "ML & AI", items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "LightGBM", "OpenCV", "FAISS", "HuggingFace", "Optuna", "Claude", "GenAI / LLMs"] },
  { group: "Data & Infrastructure", items: ["MongoDB", "PostgreSQL", "Docker", "Azure", "Polars"] },
  { group: "Hardware & Mechanical", items: ["SolidWorks", "OnShape", "KiCAD", "Arduino", "PCB Design"] },
  { group: "Tools & Concepts", items: ["Git", "Linux", "REST APIs"] },
]

export const interests = {
  heading: "Music & Interests",
  body: "Music has always run parallel to engineering for me. There's something about the structure of a well-produced track — the layering, the tension and release, the way rhythm creates momentum — that feels deeply connected to how I think about systems. I've spent time playing instruments and digging into the technical side of sound: how EQ shapes tone, how compression controls dynamics, how a mix comes together from dozens of small decisions. It's a creative outlet, but it's also a different kind of problem-solving — one where the feedback is immediate and visceral rather than logical. I find that switching between the two keeps both sharper.",
}

export const socialLinks: SocialLink[] = [
  { icon: "github", href: "https://github.com/sammzhuu", label: "GitHub" },
  { icon: "linkedin", href: "https://linkedin.com/in/sammzhuu", label: "LinkedIn" },
  { icon: "email", href: "mailto:s274zhu@uwaterloo.ca", label: "Email" },
  { icon: "resume", href: "/Samuel-Zhu-Resume.pdf", label: "Resume" },
]

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack + AI Engineering Intern",
    company: "PropertySearchGPT",
    period: "Jan 2026 – Apr 2026",
    description: "AI-powered real estate platform with multi-tier agentic routing, ML-based property price estimation, and injection-resistant chat.",
    highlights: [
      "Designed a two-tier LangGraph agent pipeline — a nano LLM classifies intent and short-circuits simple queries; a tool-calling model handles geo/listing requests, cutting inference cost on low-complexity traffic",
      "Built a property price estimator ensembling LightGBM, XGBoost, and CatBoost with Optuna HPO (50 trials, 5-fold CV, temporal split) and custom comparable scoring with exponential decay weighting by distance and recency",
      "Designed a dynamic ML + comparable alpha-blending algorithm that caps ML weight at 30% when high-quality nearby comps exist, with confidence scoring derived from MedAPE and comp proximity",
      "Implemented a two-stage prompt injection guardrail: regex pre-filter over 15 attack patterns (zero-cost fast path), followed by an LLM classifier that fails open on outage to avoid blocking legitimate users",
    ],
    tags: ["Python", "FastAPI", "LangGraph", "LangChain", "LightGBM", "XGBoost", "Optuna", "MongoDB"],
  },
  {
    role: "Machine Learning Research Assistant",
    company: "CAMJ — University of Waterloo",
    period: "May 2025 – Aug 2025",
    description: "Developed predictive quality control systems for Resistance Spot Welding using supervised ML and computer vision.",
    highlights: [
      "Developed supervised ML classifiers (Random Forest, XGBoost) to predict weld quality from real-time process data, leveraging stratified k-fold CV, nested CV, and class weighting to address data imbalance; achieved 97% accuracy, 95% recall, and 96% F1-score on unseen data",
      "Fine-tuned YOLOv11 with data augmentation to detect weld defects from etched cross-sections, achieving mAP@0.5 of 0.89; integrated OpenCV contour analysis to localize and visualize defect boundaries, improving recall by 40%",
    ],
    tags: ["Python", "PyTorch", "YOLOv11", "scikit-learn", "XGBoost", "OpenCV"],
  },
  {
    role: "Battery Hardware Developer",
    company: "Midnight Sun — UWaterloo Solar Car",
    period: "Sep 2024 – Apr 2025",
    description: "Optimized battery pack energy density and cell safety systems for UWaterloo's solar car racing team.",
    highlights: [
      "Executed cell configuration analysis to optimize energy density, increasing the total battery pack capacity to 5.25 kWh",
      "Implemented a plated cell-level fusing system to establish a physical barrier, successfully mitigating thermal runaway risk",
    ],
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
