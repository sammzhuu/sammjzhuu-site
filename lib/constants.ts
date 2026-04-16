export const SITE_METADATA = {
  title: "Samuel Zhu",
  description:
    "Mechatronics Engineering student at the University of Waterloo — building at the intersection of robotics, AI, and music.",
  url: "https://sammjzhuu.dev",
} as const

export const SERVER_META = {
  name: "Samuel Zhu",
  shortName: "SZ",
  tagline: "Mechatronics @ UWaterloo",
  iconInitials: "SZ",
} as const

export const CHANNEL_CATEGORIES = {
  INFO: "information",
  PORTFOLIO: "portfolio",
  CHAT: "chat",
} as const

export const CHANNELS = [
  {
    id: "welcome",
    name: "welcome",
    category: CHANNEL_CATEGORIES.INFO,
    topic: "Start here — readme and introduction",
  },
  {
    id: "about-me",
    name: "about-me",
    category: CHANNEL_CATEGORIES.INFO,
    topic: "Background, education, and what I'm working on",
  },
  {
    id: "projects",
    name: "projects",
    category: CHANNEL_CATEGORIES.PORTFOLIO,
    topic: "Things I've built — with demos and 3D models",
  },
  {
    id: "experience",
    name: "experience",
    category: CHANNEL_CATEGORIES.PORTFOLIO,
    topic: "Work experience and internships",
  },
  {
    id: "hobbies",
    name: "hobbies",
    category: CHANNEL_CATEGORIES.PORTFOLIO,
    topic: "Music, interests, and what keeps me curious",
  },
  {
    id: "ai-chat",
    name: "ai-chat",
    category: CHANNEL_CATEGORIES.CHAT,
    topic: "Ask SamBot anything about me",
  },
  {
    id: "contact",
    name: "contact",
    category: CHANNEL_CATEGORIES.CHAT,
    topic: "Links and ways to get in touch",
  },
] as const

export type ChannelId = (typeof CHANNELS)[number]["id"]

export const DEFAULT_CHANNEL: ChannelId = "welcome"

export const MEMBERS = [
  {
    id: "samuel",
    name: "Samuel Zhu",
    role: "Owner",
    status: "online" as const,
    initials: "SZ",
  },
  {
    id: "sambot",
    name: "SamBot",
    role: "Bot",
    status: "online" as const,
    initials: "SB",
    isBot: true,
  },
] as const

export const LOADING_TIPS = [
  "Did you know Samuel built an AI real estate search platform?",
  "Samuel is studying Mechatronics at the University of Waterloo.",
  "Ask SamBot anything about Samuel's projects or experience.",
  "Samuel works at the intersection of robotics, AI, and music.",
  "WATonomous team member — building autonomous vehicle systems.",
] as const
