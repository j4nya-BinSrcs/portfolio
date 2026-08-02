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
  availabilityText: "Open to new opportunities",

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
    keywords: [
      "performance",
      "accessibility",
      "developer experience",
      "real-time collaboration",
      "design systems",
    ],
    paragraphs: [
      "Full-stack engineer focused on performance, accessibility, and developer experience. I like small systems that compose into large ones, and interfaces that feel engineered rather than decorated.",
      "Currently deep in real-time collaboration, design systems, and the fine art of making latency disappear. Previously shipped products at early-stage startups and large platforms alike.",
    ],
    nowLabel: "Now",
    now: [
      "Building a multiplayer, edge-first note-taking tool",
      "Writing about systems and interface craft",
      "Exploring WebGPU and local-first architecture",
    ],
  },

  /* Skills panel */
  skills: [
    {
      category: "Languages",
      items: [
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Go" },
        { name: "Rust" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "Framer Motion" },
        { name: "Accessibility" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js" },
        { name: "PostgreSQL" },
        { name: "Redis" },
        { name: "GraphQL" },
        { name: "gRPC" },
      ],
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "AWS" },
        { name: "Terraform" },
        { name: "CI/CD" },
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
      featured: true,
    },
    {
      title: "Scaffold",
      description:
        "An opinionated CLI that generates production-ready services with batteries-included observability, testing, and CI.",
      stack: ["Go", "Cobra", "Docker", "OpenTelemetry"],
      href: "https://github.com/jordanreyes/scaffold",
      code: "https://github.com/jordanreyes/scaffold",
      featured: true,
    },
    {
      title: "Drift",
      description:
        "A privacy-first analytics dashboard aggregating events in real time with edge computing and streaming queries.",
      stack: ["React", "ClickHouse", "Kafka", "Kubernetes"],
      href: "https://github.com/jordanreyes/drift",
      code: "https://github.com/jordanreyes/drift",
      featured: false,
    },
    {
      title: "Prism UI",
      description:
        "An accessible design-system monorepo powering several products with tokens, theming, and 60+ components.",
      stack: ["TypeScript", "React", "Storybook", "Turborepo"],
      href: "https://github.com/jordanreyes/prism-ui",
      code: "https://github.com/jordanreyes/prism-ui",
      featured: false,
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
  education: [
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

  /* Contact panel */
  contact: {
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
