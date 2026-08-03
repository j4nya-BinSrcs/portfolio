/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 *  Edit every piece of static content for the whole website here.
 * ─────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /* Identity */
  name: "Jordan Reyes",
  role: "Software Engineer",
  tagline:
    "Designing and building calm, precise tools for the web — from distributed backends to pixel-perfect interfaces.",

  /* Hero card */
  hero: {
    eyebrow: "~/portfolio",
  },

  /* Quick info strip */
  location: "San Francisco, CA",
  timezone: "GMT-8 · PST",
  languages: ["English", "Español", "日本語", "한국어"],

  /* Contact */
  email: "hello@jordanreyes.dev",
  resumeUrl: "/resume.pdf",
  available: true,
  availabilityText: "Open to internships, jobs & freelance",

  /* Socials — order shown is the order rendered */
  socials: [
    { id: "X", label: "X", href: "https://x.com/jordanreyes" },
    { id: "GitHub", label: "GitHub", href: "https://github.com/jordanreyes" },
    {
      id: "LinkedIn",
      label: "LinkedIn",
      href: "https://linkedin.com/in/jordanreyes",
    },
  ],

  /* Navigation tabs */
  navigation: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],

  /* About panel */
  about: {
    intro: [
      "Full-stack engineer obsessed with calm, precise systems.",
      "I build interfaces that feel engineered, not decorated.",
      "Comfortable from distributed backends to the last 8px of a UI.",
      "Believer in small tools that compose into large ones.",
    ],
    currentlyLabel: "Currently",
    currently: [
      { key: "learning", label: "Learning", items: ["WebGPU", "local-first sync", "compiler internals"] },
      { key: "building", label: "Building", items: ["edge-first note tool", "open-source CLI", "design-system tokens"] },
      { key: "exploring", label: "Exploring", items: ["Rust tooling", "agentic workflows", "CRDTs"] },
    ],
    principlesLabel: "Principles",
    principles: [
      { key: "minimalism", label: "Minimalism", text: "Fewer moving parts, fewer surprises." },
      { key: "performance", label: "Performance", text: "Latency is a feature; sweat the last millisecond." },
      { key: "open-source", label: "Open Source", text: "Give back everything you've learned." },
      { key: "accessibility", label: "Accessibility", text: "Everyone deserves a first-class experience." },
    ],
    preferencesLabel: "Preferences",
    preferences: [
      { label: "Code editor", value: "Zed" },
      { label: "Operating system", value: "Arch Linux" },
    ],
    github: {
      username: "jordanreyes",
      profileUrl: "https://github.com/jordanreyes",
      graphSeed: 7,
      commits: [
        { repo: "quillspace", message: "feat: multiplayer cursor presence", date: "Jul 28", sha: "a3f21c9" },
        { repo: "scaffold", message: "chore: bump otel sdk to 1.18", date: "Jul 26", sha: "9b1e0a4" },
        { repo: "drift", message: "perf: stream queries over websocket", date: "Jul 23", sha: "c47d2b8" },
        { repo: "prism-ui", message: "feat: add tokens for focus rings", date: "Jul 21", sha: "e09af13" },
        { repo: "site", message: "fix: hydration-safe theme switch", date: "Jul 19", sha: "5d6c0e2" },
        { repo: "quillspace", message: "refactor: extract presence protocol", date: "Jul 17", sha: "b3a8d71" },
      ],
    },
  },

  /* Skills panel */
  skills: [
    {
      category: "Languages",
      items: [
        { name: "TypeScript", years: 6, frameworks: ["React", "Node.js", "Express"] },
        { name: "JavaScript", years: 7, frameworks: ["Next.js", "Vue", "Jest"] },
        { name: "Python", years: 5, frameworks: ["FastAPI", "Django", "pytest"] },
        { name: "Go", years: 3, frameworks: ["Gin", "Cobra", "gRPC"] },
        { name: "Rust", years: 2, frameworks: ["Axum", "Tokio", "Serde"] },
      ],
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Docker", years: 5, frameworks: ["Compose", "BuildKit"] },
        { name: "Kubernetes", years: 3, frameworks: ["Helm", "Kustomize"] },
        { name: "AWS", years: 5, frameworks: ["ECS", "Lambda", "S3"] },
        { name: "Terraform", years: 3, frameworks: ["Modules", "Remote state"] },
        { name: "CI/CD", years: 4, frameworks: ["GitHub Actions", "ArgoCD"] },
      ],
    },
  ],

  /* Projects panel */
  projects: [
    {
      title: "Quillspace",
      description:
        "A real-time collaboration workspace with multiplayer cursors, presence, and version history for structured documents.",
      stack: ["Next.js", "TypeScript", "WebSockets", "PostgreSQL"],
      href: "https://quillspace.dev",
      code: "https://github.com/jordanreyes/quillspace",
      video: "",
      ratio: "aspect-[16/10]",
      readme: `# Quillspace

A real-time collaboration workspace for structured documents.

## Features

- Multiplayer cursors with presence
- Version history
- Offline-first sync (CRDT-backed)

## Stack

- **Next.js** + **TypeScript**
- **WebSockets** for presence
- **PostgreSQL** for persistence

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\``,
    },
    {
      title: "Scaffold",
      description:
        "An opinionated CLI that generates production-ready services with batteries-included observability, testing, and CI.",
      stack: ["Go", "Cobra", "Docker", "OpenTelemetry"],
      href: "https://github.com/jordanreyes/scaffold",
      code: "https://github.com/jordanreyes/scaffold",
      video: "",
      ratio: "aspect-square",
      readme: `# Scaffold

An opinionated service generator.

\`\`\`bash
scaffold new api --lang=go
\`\`\`

Ships with observability, tests, and CI out of the box.`,
    },
    {
      title: "Drift",
      description:
        "A privacy-first analytics dashboard aggregating events in real time with edge computing and streaming queries.",
      stack: ["React", "ClickHouse", "Kafka", "Kubernetes"],
      href: "https://github.com/jordanreyes/drift",
      code: "https://github.com/jordanreyes/drift",
      video: "",
      ratio: "aspect-[4/3]",
      readme: `# Drift

Privacy-first, real-time analytics.

- Edge aggregation
- Streaming queries over WebSocket
- ClickHouse storage`,
    },
    {
      title: "Prism UI",
      description:
        "An accessible design-system monorepo powering several products with tokens, theming, and 60+ components.",
      stack: ["TypeScript", "React", "Storybook", "Turborepo"],
      href: "https://github.com/jordanreyes/prism-ui",
      code: "https://github.com/jordanreyes/prism-ui",
      video: "",
      ratio: "aspect-[16/10]",
      readme: `# Prism UI

An accessible design system.

- Token-driven theming
- 60+ components
- Storybook documentation`,
    },
  ],

  /* Experience panel */
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Acme Corp",
      period: "2022 — Present",
      description:
        "Leading the payments platform team; driving design-system adoption and real-time reliability.",
      highlights: [
        "Reduced checkout latency by 45% via edge caching and query optimization.",
        "Led a monolith-to-event-driven migration serving 2M+ users.",
        "Mentored six engineers; established code review and testing culture.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Globex Inc",
      period: "2020 — 2022",
      description:
        "Built internal tooling and customer-facing features for the analytics suite.",
      highlights: [
        "Shipped a real-time dashboard used by 10k+ daily active users.",
        "Cut average release time from hours to minutes with CI pipelines.",
        "Contributed to the open-source SDK used by dozens of teams.",
      ],
    },
    {
      role: "Frontend Engineer",
      company: "Initech",
      period: "2018 — 2020",
      description:
        "Developed responsive marketing sites and the core component library.",
      highlights: [
        "Rebuilt the marketing site with a 30% Lighthouse performance gain.",
        "Authored 40+ accessible, reusable components used across the org.",
        "Automated visual regression testing to keep releases fast and safe.",
      ],
    },
  ],

  /* Education panel */
  education: {
    schools: [
      {
        institution: "University of California, Berkeley",
        degree: "B.S. Computer Science",
        period: "2014 — 2018",
        achievement: "Graduated with high honors · Distributed systems research",
      },
      {
        institution: "Self-directed · Open source",
        degree: "Continuous learning",
        period: "2018 — Present",
        achievement:
          "Contributor to React, Next.js, and several OSS design tools",
      },
    ],
    certificatesLabel: "Certificates",
    certificates: [
      { name: "AWS Solutions Architect", image: "", year: "2023" },
      { name: "Google Cloud Engineer", image: "", year: "2022" },
      { name: "CNCF: Kubernetes Admin", image: "", year: "2021" },
      { name: "Meta Frontend Specialization", image: "", year: "2021" },
      { name: "Rust Fundamentals", image: "", year: "2024" },
    ],
  },

  /* Contact panel */
  contact: {
    prompts: [
      "Want to collaborate?",
      "Building something interesting?",
      "Looking for internships?",
      "Open Source?",
      "Let's talk.",
    ],
    intro:
      "I'm always open to interesting conversations and new opportunities. My inbox is always open — whether you have a question, want to collaborate, or just want to say hi.",
    nameLabel: "Name",
    namePlaceholder: "Ada Lovelace",
    emailLabel: "Email",
    emailPlaceholder: "ada@analytical.engine",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project…",
    sendLabel: "Send message",
    directLabel: "Direct",
    resumeLabel: "Download resume",
  },

  /* Footer */
  footer: {
    left: "© {year} {name} · {role}",
    right: "built with next.js & framer motion",
  },

  /* SEO */
  siteUrl: "https://jordanreyes.dev",
  seoKeywords: [
    "software engineer",
    "portfolio",
    "full-stack",
    "developer",
    "react",
    "typescript",
  ],
} as const;
