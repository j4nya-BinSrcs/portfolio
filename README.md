# Developer Portfolio — Dashboard Workspace

A premium, single-page software engineer portfolio inspired by Bento Grid dashboards and terminal workspaces. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lucide.

![Design: near-black bento grid dashboard with warm-white accent, magnetic grid background, terminal-style content panel]

## Design language

- **Bento grid dashboard** — identity rail (left), navigation rail (center), dynamic content panel (right)
- **Warm-white / champagne accent** on a near-black palette; soft gray 1px borders; no gradients, no saturated color
- **Montserrat** typography (300–700) with generous spacing
- **Terminal workspace metaphor** — content panel shows a `~/section` path and swaps views in place

## Signature interactions

- **Magnetic grid background** — an HTML canvas grid whose vertices are attracted to the cursor and relax back with spring physics; faint warm nodes pulse at intersections
- **Cursor glow** — a soft light that trails the pointer with a spring
- **Workspace switching** — content panels fade + slide + defocus-blur into place (250–350ms)
- **Staggered entrance** — dashboard fades upward card-by-card on load, under one second
- **Physical micro-interactions** — nav pill slides between tabs, social buttons lift, project cards raise with zooming thumbnails

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing

All content lives in [`lib/data.ts`](lib/data.ts): `profile`, `skills`, `projects`, `experience`, and `education`.

Sections are declared in [`lib/sections.tsx`](lib/sections.tsx) and rendered by the corresponding panel under [`components/content/`](components/content). The `left/` column (hero, info, socials, availability/email) is in [`components/left/`](components/left).

### Common changes

- **Your identity** — edit `profile` in `lib/data.ts` (name, role, tagline, email, socials).
- **Active sections** — add/remove entries in `lib/sections.tsx` and add a matching panel component + key in `components/content/content-panel.tsx`.
- **Palette** — adjust the CSS variables in `app/globals.css` (backgrounds, borders, accent).
- **Grid behavior** — tune `SPACING`, `RADIUS`, `MAX_DISPLACE`, `SPRING`, and `DAMPING` at the top of `components/background-grid.tsx`.
- **Resume** — drop a `resume.pdf` in `public/` (the Contact panel links to `profile.resumeUrl`).
- **Deep links** — each section has a hash (`#skills`, `#experience`, …); sharing the URL opens that view.

## Accessibility

- Visible keyboard focus, high-contrast text, semantic HTML, and ARIA labels
- Keyboard navigable nav (real buttons, `aria-current`)
- Full `prefers-reduced-motion` support — grid renders static, animations collapse

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
```

## Deploy on Vercel

Push to GitHub and import in Vercel, or run `npx vercel`. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
