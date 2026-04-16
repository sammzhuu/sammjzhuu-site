@AGENTS.md

# sammjzhuu-site — Terminal Portfolio

Personal website for Samuel Zhu, Mechatronics Engineering student at the University of Waterloo.

**Stack:** Next.js 16 (Turbopack) · TypeScript · Tailwind v4 · Framer Motion · React 19 · Vercel AI SDK

---

## Design System

Terminal / hacker-dark aesthetic. Single-scroll page with sections that fade in/out on scroll.

**Color tokens** (all in `app/globals.css`):

```
--t-bg          #0a0a0a   page background
--t-surface     #111111   panel body background
--t-surface-2   #161616   panel header / sidebar background
--t-border      #1e1e1e   subtle border
--t-border-2    #2a2a2a   slightly brighter border
--t-accent      #60a5fa   blue  — primary highlight (links, active states, cursor)
--t-accent-dim  #3b82f6   blue dim
--t-accent-2    #818cf8   indigo — secondary highlight (company names, sub-labels)
--t-cyan        #7dd3fc   cyan  — rarely used
--t-red         #f87171   error states
--t-text        #c8c8c8   body text
--t-text-muted  #5a5a5a   secondary / placeholder text
--t-text-dim    #3a3a3a   faint labels
--t-white       #e8e8e8   headings / emphasis
```

**Rule:** always use `--t-accent` (blue) and `--t-accent-2` (indigo). Never hardcode `#00ff41` or reference the removed `--t-green` / `--t-amber` aliases.

---

## Section Order (top → bottom)

1. **Hero** — `components/hero/Hero.tsx`
2. **Projects** — `components/projects/ProjectsSection.tsx`
3. **Experience** — `components/experience/ExperienceSection.tsx`
4. **Inventory** — `components/inventory/InventorySection.tsx`
5. **Terminal** — `components/terminal/TerminalSection.tsx`
6. **Socials** — `components/socials/SocialsSection.tsx`
7. **Contact** — `components/contact/ContactSection.tsx`

Change order in `app/page.tsx`.

---

## Panel Component

Every section uses `<Panel>` (`components/ui/Panel.tsx`) for the bordered rectangle format:

```tsx
<Panel section="portfolio" subsection="projects" meta="3 total">
  {/* content */}
</Panel>
```

Header bar renders: `● SECTION / SUBSECTION` left · `meta` right (optional).

---

## How to Modify Content

All content lives in **`lib/data.ts`** — edit there, no component changes needed.

### Add / edit a project

```ts
// lib/data.ts → projects array
{
  title: "My Project",           // initials shown on sidebar icon
  context: "Personal Project",   // sub-label in detail panel
  description: "One paragraph.", // shown in detail panel
  highlights: ["bullet 1"],      // shown below description (can be empty [])
  tags: ["Python", "React"],     // pill tags
  status: "complete",            // "complete" | "coming-soon"
  featured: true,
  href: "https://github.com/...", // optional — shows ↗ GitHub button
}
```

**Add a project image:** drop a PNG at `public/images/<title-kebab>.png`
(e.g. `public/images/propsearchgpt.png`). The `PlaceholderImage` component in
`ProjectsSection.tsx` shows a placeholder until the file is added — swap it for
`<img src={...}>` when the asset is ready.

**Add a project color:** extend `PROJECT_COLORS` in `ProjectsSection.tsx`:
```ts
const PROJECT_COLORS: Record<string, string> = {
  "My Project": "#f97316",
}
```

### Add / edit a tech stack item

```ts
// lib/data.ts → techStack array
{ group: "Languages", items: ["Python", "TypeScript", "Rust"] }
```

Add a brand color in `TECH_COLORS` inside `InventorySection.tsx`:
```ts
Rust: { bg: "#f7421520", text: "#e74c3c" },
```

> **TODO — real icons:** `TechChip` currently renders text initials. Replace with
> SVG brand icons (`simple-icons` npm package or `devicons`) for a polished look.
> Component is `TechChip` in `components/inventory/InventorySection.tsx`.

### Add / edit a social link

```ts
// lib/data.ts → socialLinks array
{ icon: "github", href: "https://github.com/yourhandle", label: "GitHub" }
```

Update the display handle + symbol in `SOCIAL_META` in `SocialsSection.tsx`:
```ts
GitHub: { handle: "github.com/yourhandle", symbol: "⌥" },
```

### Edit experience / education

Edit `EXPERIENCE` and `EDUCATION` arrays at the top of
`components/experience/ExperienceSection.tsx`. (TODO: move these into `lib/data.ts`.)

---

## Terminal

Commands defined in `lib/terminal/commands.ts` — add entries to the `COMMANDS` map.
`chat` activates SamBot (Claude Haiku). System prompt: `lib/ai/systemPrompt.ts`.

---

## Contact Form

`POST /api/contact` with `{ name, email, message }` → Discord embed webhook.
Requires env var `DISCORD_WEBHOOK_URL`.

---

## Environment Variables

```
ANTHROPIC_API_KEY=    # terminal SamBot chat
DISCORD_WEBHOOK_URL=  # contact form → Discord
```

---

## Browser Tab — Title & Icon

**Title and meta description** are in `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: "Samuel Zhu",
  description: "Mechatronics Engineering student...",
}
```

**Favicon** — replace `app/favicon.ico` with your own `.ico` file.
Next.js picks it up automatically with no config change needed.

For a higher-quality icon (e.g. PNG at multiple sizes), add these files to `app/`:

```
app/
  icon.png          # 32×32 or larger — used as favicon
  apple-icon.png    # 180×180 — iOS home screen icon
```

Next.js will serve them automatically. You can generate both from a single
high-res PNG using a tool like [realfavicongenerator.net](https://realfavicongenerator.net).

---

## Development

```bash
npm run dev    # localhost:3000
npm run build  # must pass before deploy
npm run lint
```

---

## Known TODOs

- [ ] **Real tech icons** — replace text initials in `TechChip` with SVG icons from `simple-icons`
- [ ] **Project images** — add PNGs to `public/images/` and wire into `ProjectsSection.tsx`
- [ ] **Move experience data** — migrate `EXPERIENCE` / `EDUCATION` from component into `lib/data.ts`
- [ ] **3D model viewer** — add `.glb` support (placeholder exists); export from Onshape → `public/models/`
- [ ] **Real email** — update `socialLinks` email `href` in `lib/data.ts` (currently placeholder)
