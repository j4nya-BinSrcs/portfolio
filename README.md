# Developer Portfolio — Dashboard Workspace

A premium, single-page software engineer portfolio inspired by Bento Grid dashboards and terminal workspaces. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lucide.

Portfolio is an interactive developer workspace that showcases my projects, engineering journey, and technical interests through a desktop-inspired interface. Rather than behaving like a traditional scrolling website, it emphasizes thoughtful interactions, clean information architecture, and engineering-focused storytelling.

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

**All static content lives in a single config file: [`lib/site.config.ts`](lib/site.config.ts).**

Edit `siteConfig` there to change names, role, tagline, bio paragraphs, location, timezone, languages, email, social links, navigation labels, skills, projects, experience, education, contact form labels, footer text, and SEO keywords. `lib/sections.tsx` derives the nav structure and icons from this config.

### Common changes

- **Your identity** — edit `name`, `role`, `tagline`, `location`, `timezone`, `languages`, and `email` in `lib/site.config.ts`.
- **Links** — update `socials` (order rendered = order listed) and `siteUrl`.
- **Text content** — all paragraph/panel copy lives in `siteConfig.about`, `contact`, and `footer`.
- **Active sections** — edit `navigation` in `lib/site.config.ts`; add a matching panel component + key in `components/content/content-panel.tsx`.
- **Layout** — the bento box size lives in `components/dashboard.tsx` (`lg:h-[65vh] lg:w-[70vw]`).
- **Palette** — adjust the CSS variables in `app/globals.css` (backgrounds, borders, accent).
- **Grid behavior** — tune `SPACING`, `RADIUS`, `MAX_DISPLACE`, `SPRING`, and `DAMPING` at the top of `components/background-grid.tsx`.
- **Resume** — drop a `resume.pdf` in `public/` (the Contact panel links to `siteConfig.resumeUrl`).
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
