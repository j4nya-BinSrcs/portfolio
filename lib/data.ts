export const profile = {
  name: "Jordan Reyes",
  firstName: "Jordan",
  role: "Software Engineer",
  tagline:
    "Designing and building calm, precise tools for the web — from distributed backends to pixel-perfect interfaces.",
  bio: [
    "Full-stack engineer focused on performance, accessibility, and developer experience. I like small systems that compose into large ones, and interfaces that feel engineered rather than decorated.",
    "Currently deep in real-time collaboration, design systems, and the fine art of making latency disappear. Previously shipped products at early-stage startups and large platforms alike.",
  ],
  location: "San Francisco, CA",
  timezone: "GMT-8 · PST",
  languages: ["English", "Español", "日本語", "한국어"],
  email: "hello@jordanreyes.dev",
  siteUrl: "https://jordanreyes.dev",
  resumeUrl: "/resume.pdf",
  available: true,
  socials: [
    { label: "X", href: "https://x.com/jordanreyes" },
    { label: "GitHub", href: "https://github.com/jordanreyes" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jordanreyes" },
  ],
} as const;

export type Skill = { name: string; level: number };

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "Python", level: 78 },
      { name: "Go", level: 70 },
      { name: "Rust", level: 55 },
    ] satisfies Skill[],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 94 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 82 },
      { name: "Accessibility", level: 84 },
    ] satisfies Skill[],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL", level: 84 },
      { name: "Redis", level: 78 },
      { name: "GraphQL", level: 80 },
      { name: "gRPC", level: 72 },
    ] satisfies Skill[],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 74 },
      { name: "AWS", level: 82 },
      { name: "Terraform", level: 76 },
      { name: "CI/CD", level: 88 },
    ] satisfies Skill[],
  },
] as const;

export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  code?: string;
  featured?: boolean;
};

export const projects: Project[] = [
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
    featured: true,
  },
  {
    title: "Drift",
    description:
      "A privacy-first analytics dashboard aggregating events in real time with edge computing and streaming queries.",
    stack: ["React", "ClickHouse", "Kafka", "Kubernetes"],
    href: "https://github.com/jordanreyes/drift",
  },
  {
    title: "Prism UI",
    description:
      "An accessible design-system monorepo powering several products with tokens, theming, and 60+ components.",
    stack: ["TypeScript", "React", "Storybook", "Turborepo"],
    href: "https://github.com/jordanreyes/prism-ui",
  },
] as const;

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experience: Experience[] = [
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
] as const;

export type Education = {
  institution: string;
  degree: string;
  period: string;
  achievement: string;
};

export const education: Education[] = [
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
    achievement: "Contributor to React, Next.js, and several OSS design tools",
  },
] as const;
