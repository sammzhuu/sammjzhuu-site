@AGENTS.md

# sammjzhuu-site — Personal Portfolio

Personal website for Samuel Zhu, Mechatronics Engineering student at the University of Waterloo.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · React 19

---

## Architecture

### Single-page layout
All content lives on `/` — one scrolling page with anchor navigation. No routing required.

### Content management
All copy and data is in **`lib/data.ts`** — update projects, tech stack, bio, social links here without touching components. `lib/constants.ts` holds site metadata and nav items.

### File structure

```
app/
  layout.tsx          Root layout — metadata, Geist fonts, skip link
  page.tsx            Assembles all sections
  globals.css         Design token system (CSS custom properties)

lib/
  data.ts             All site content (projects, techStack, about, interests, socialLinks)
  constants.ts        SITE_METADATA, NAV_ITEMS

hooks/
  useReducedMotion.ts Detects prefers-reduced-motion
  useScrollProgress.ts useScrolledPast(threshold) — used by Nav for scroll state

components/
  nav/Nav.tsx         Fixed top nav, dark mode toggle, mobile hamburger
  hero/Hero.tsx       Full-viewport hero with staggered word reveal (Framer Motion)
  about/About.tsx     Two-column: bio text + SZ headshot placeholder
  projects/
    Projects.tsx      Bento grid — featured card full-width, placeholders 2-col
    ProjectCard.tsx   Card with hover lift, Coming Soon overlay, highlights list
  tech-stack/
    TechStack.tsx     4-group grid: Languages, Frameworks, Data/Infra, Hardware
    TechGroup.tsx     Group label + Tag pills
  interests/
    Interests.tsx     Editorial layout with amber accent, music & interests prose
  footer/Footer.tsx   Social links + copyright
  ui/
    SectionWrapper.tsx  Scroll-reveal fade-up wrapper (motion.section)
    Tag.tsx             Mono pill — variants: default, engineering, music
    SocialLink.tsx      Icon + label anchor (GitHub, LinkedIn, Email)
    ScrollIndicator.tsx Animated scroll-down chevron in Hero
```

### Design tokens
Defined in `globals.css` as CSS custom properties. Dark mode via `[data-theme="dark"]` on `<html>` (toggled by Nav, persisted in localStorage). Key tokens:

- `--color-accent-eng` — indigo blue (engineering theme)
- `--color-accent-music` — amber (music/creative theme)
- `--text-hero`, `--text-h2`, `--text-h3` — fluid clamp type scale
- `--space-section` — fluid section vertical padding

---

## Future Plans

- [ ] **Replace headshot placeholder** — swap `SZ` gray box in `About` with real photo; add as `public/headshot.jpg`, update `About.tsx` to use `next/image`
- [ ] **Fill in WATonomous ASD project** — update `projects[1]` in `lib/data.ts` with real description and highlights when ready to share
- [ ] **Fill in FIRST Robotics project** — update `projects[2]` in `lib/data.ts`
- [ ] **Custom domain** — update `SITE_METADATA.url` in `lib/constants.ts`, configure in Vercel/hosting
- [ ] **Deploy to Vercel** — connect GitHub repo, set up auto-deploy on push to main
- [ ] **Real social links** — update `socialLinks` in `lib/data.ts` (GitHub URL, LinkedIn URL, real email)
- [ ] **Blog / writing section** — could be added as a separate route `/writing` with MDX
- [ ] **Project links** — add `href` field to projects in `lib/data.ts` when repos/demos are public
- [ ] **OG image** — add `opengraph-image.png` or dynamic OG image in `app/`
- [ ] **Analytics** — add Vercel Analytics or Plausible once deployed
- [ ] **3D interactive element** — add a Three.js / React Three Fiber scene (e.g. interactive 3D model of a robot, PCB, or abstract mechanical form); responds to cursor/scroll; candidate placement: Hero background or a standalone "Lab" section; lazy-load the canvas and use LOD for performance
- [ ] **AI chatbot** — floating futuristic chat widget that answers questions about Samuel; RAG pipeline over `lib/data.ts` content fed into a Claude API system prompt; design: dark glassmorphic panel, monospace font, typewriter streaming response, subtle scan-line / grid overlay; backend via Next.js Route Handler + Vercel AI SDK streaming

---

## Development

```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Production build (must pass before deploy)
npm run lint   # ESLint
```

