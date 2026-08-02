# Portfolio Boilerplate

A clean, single-page [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS v4) boilerplate for a software engineer portfolio. It includes a hero, about, skills, projects, experience, and contact section, plus a persistent dark/light theme toggle.

## Features

- **Next.js 16** with App Router, React 19, and TypeScript
- **Tailwind CSS v4** with class-based dark mode (`@custom-variant`)
- **Persistent theme toggle** (localStorage + system preference, no FOUC)
- **Single source of truth** for content in `lib/data.ts`
- Fully static, SEO-friendly metadata, Open Graph tags, generated `sitemap.xml` and `robots.txt`
- Custom 404 page and client-side error boundary
- Accessible, responsive layout with smooth-scroll navigation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing

All content lives in [`lib/data.ts`](lib/data.ts):

- `profile` — name, role, tagline, bio, location, email, and social links
- `navigation` — header nav links (anchor to section `id`s)
- `skills` — skill categories and items
- `projects` — project cards (title, description, stack, link)
- `experience` — work history timeline (role, company, period, highlights)

Sections are individual components under [`components/`](components) and are composed in [`app/page.tsx`](app/page.tsx).

### Common changes

- **Avatar/photo**: replace the placeholder in [`components/about.tsx`](components/about.tsx) with a `next/image` component.
- **Metadata / SEO**: edit the exported `metadata` in [`app/layout.tsx`](app/layout.tsx), and set `siteUrl` in `lib/data.ts` (used by `app/sitemap.ts` and `app/robots.ts`).
- **Dark mode**: initial theme is applied via the inline script in `app/layout.tsx`; the toggle lives in `components/theme-toggle.tsx`.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
```

## Deploy on Vercel

The easiest way is to push to GitHub and import the repo in Vercel, or run:

```bash
npx vercel
```

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other providers.
