@AGENTS.md

# sammjzhuu-site — Terminal Portfolio

Personal website for Samuel Zhu, Mechatronics Engineering student at the University of Waterloo.

**Stack:** Next.js 16 (Turbopack) · TypeScript · Tailwind v4 · Framer Motion · React 19 · Vercel AI SDK · Gemini 2.5 Flash

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
2. **Terminal** — `components/terminal/TerminalSection.tsx`
3. **Projects** — `components/projects/ProjectsSection.tsx`
4. **Experience** — `components/experience/ExperienceSection.tsx`
5. **Inventory** — `components/inventory/InventorySection.tsx`
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
  title: "My Project",
  context: "Personal Project",
  description: "One paragraph.",
  highlights: ["bullet 1"],
  tags: ["Python", "React"],
  status: "complete",       // "complete" | "coming-soon"
  featured: true,
  href: "https://github.com/...", // optional — shows ↗ GitHub button
}
```

**Add a project image:** drop a PNG/WebP into `public/images/<title-kebab>.png`
(e.g. `public/images/full-stack-ai-platform.png`). Then in `ProjectsSection.tsx`
replace `<PlaceholderImage title={active.title} />` with:

```tsx
<img
  src={`/images/${active.title.toLowerCase().replace(/\s+/g, "-")}.png`}
  alt={active.title}
  style={{ width: "100%", borderRadius: "3px", border: "1px solid var(--t-border)" }}
/>
```

**Add a project color / icon:** extend `PROJECT_COLORS` and `PROJECT_ICONS` in `ProjectsSection.tsx`.

### Add / edit experience / education

Edit `experience[]` and `education[]` in `lib/data.ts`.
Both `ExperienceSection` and the terminal `experience` command read from this automatically.

### Add / edit a tech stack item

```ts
// lib/data.ts → techStack array
{ group: "Languages", items: ["Python", "TypeScript", "Rust"] }
```

Then in `InventorySection.tsx`, add an icon and color:

```ts
// SI_ICONS map — simple-icons single-color SVG
Rust: siRust,

// TECH_COLORS map
Rust: { bg: "#f7421520", text: "#e74c3c" },
```

For tools with no simple-icons entry, drop a PNG into `public/` and add to `PUBLIC_ICONS`:

```ts
const PUBLIC_ICONS: Record<string, string> = {
  MyTool: "/mytool.png",
}
```

`next/image` is used for public assets — it auto-optimizes on serve.
**Keep source PNGs small** — a 3840×3840 PNG (like a raw screenshot) will be slow to load
even with optimization. Resize to ~256×256 before dropping into `public/`.

### Add / edit a social link

```ts
// lib/data.ts → socialLinks array
{ icon: "github", href: "https://github.com/yourhandle", label: "GitHub" }
```

---

## Terminal

Commands defined in `lib/terminal/commands.ts`.
`chat` activates SamBot (Gemini 2.5 Flash, free tier). System prompt: `lib/ai/systemPrompt.ts`.

The `experience` and `skills` commands pull live from `lib/data.ts` — no manual sync needed.

---

## Contact Form → Discord Webhook

The contact form (`POST /api/contact`) sends messages as Discord embeds to a webhook URL.

**Setup steps:**
1. In Discord, open the target channel → **Edit Channel → Integrations → Webhooks → New Webhook**
2. Copy the webhook URL — it looks like `https://discord.com/api/webhooks/123456/abc...`
3. Add to `.env.local` for local dev:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
   ```
4. On Vercel: **Project → Settings → Environment Variables** → add `DISCORD_WEBHOOK_URL` → redeploy
5. Test by submitting the contact form — message should appear in the Discord channel

The handler is `app/api/contact/route.ts`.

---

## Environment Variables

```
GOOGLE_GENERATIVE_AI_API_KEY=    # terminal SamBot chat (Google AI Studio — free tier)
DISCORD_WEBHOOK_URL=             # contact form → Discord
```

Local dev: put both in `.env.local` (gitignored — never commit).

---

## Browser Tab — Title & Icon

**Title and meta description** are in `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: "Samuel Zhu",
  description: "Mechatronics Engineering student...",
}
```

**Favicon** — `app/icon.png` is used automatically by Next.js (already set).
To update: replace `app/icon.png`. For an iOS home screen icon also add `app/apple-icon.png` at 180×180.

---

## Development

```bash
npm run dev    # localhost:3000
npm run build  # must pass before deploy
npm run lint
```

---

## Known TODOs

- [x] **Real tech icons** — `TechChip` uses `simple-icons`, inline SVG (Java), and `next/image` (OnShape, Azure)
- [ ] **Project images** — add PNGs to `public/images/` and swap `<PlaceholderImage />` in `ProjectsSection.tsx`
- [x] **Experience data** — `experience[]` and `education[]` live in `lib/data.ts`; terminal command reads live
- [x] **Real email** — `socialLinks` email set to `zjiale1118@gmail.com`
- [x] **Resume PDF** — available at `/Samuel-Zhu-Resume.pdf`, linked in socials
- [ ] **Discord webhook** — add `DISCORD_WEBHOOK_URL` to env to enable contact form (see setup above)
- [ ] **Project images** — drop PNGs into `public/images/` and wire into `ProjectsSection.tsx`
- [ ] **3D model viewer** — add `.glb` support; export from OnShape → `public/models/`
