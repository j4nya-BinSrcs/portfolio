export const profile = {
  name: "Your Name",
  role: "Software Engineer",
  tagline: "I build fast, accessible, and delightful web experiences.",
  bio: "Full-stack software engineer with a passion for clean code, modern tooling, and products that scale. I care deeply about performance, accessibility, and developer experience.",
  location: "San Francisco, CA",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/yourusername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "X", href: "https://x.com/yourusername" },
    { label: "Mastodon", href: "https://hachyderm.io/@yourusername" },
  ],
} as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"] },
  { category: "Frontend", items: ["React", "Next.js", "Vue", "Tailwind CSS", "HTML/CSS"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "gRPC"] },
  { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"] },
  { category: "Tools", items: ["Git", "Vite", "Vitest", "Figma", "Linear"] },
] as const;

export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A real-time collaboration tool that lets teams co-edit documents with presence, comments, and version history.",
    stack: ["Next.js", "TypeScript", "WebSockets", "PostgreSQL"],
    href: "https://github.com/yourusername/project-one",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "An open-source CLI for scaffolding microservices with batteries-included observability and testing.",
    stack: ["Go", "Cobra", "Docker", "OpenTelemetry"],
    href: "https://github.com/yourusername/project-two",
    featured: true,
  },
  {
    title: "Project Three",
    description:
      "A privacy-first analytics dashboard that aggregates events with edge computing and streaming queries.",
    stack: ["React", "ClickHouse", "Kafka", "Kubernetes"],
    href: "https://github.com/yourusername/project-three",
  },
  {
    title: "Project Four",
    description:
      "A design-system monorepo powering several products with tokens, theming, and accessible components.",
    stack: ["TypeScript", "React", "Storybook", "Turborepo"],
    href: "https://github.com/yourusername/project-four",
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
    description: "Leading the payments platform team and driving the design-system adoption.",
    highlights: [
      "Reduced checkout latency by 45% through edge caching and query optimization.",
      "Led a migration from a monolith to event-driven microservices serving 2M+ users.",
      "Mentored six engineers and established the team's code review and testing culture.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Globex Inc",
    period: "2020 — 2022",
    description: "Built internal tooling and customer-facing features for the analytics suite.",
    highlights: [
      "Shipped a real-time dashboard used by 10k+ daily active users.",
      "Introduced CI pipelines that cut average release time from hours to minutes.",
      "Contributed to the open-source SDK used by dozens of downstream teams.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Initech",
    period: "2018 — 2020",
    description: "Developed responsive marketing sites and the core component library.",
    highlights: [
      "Rebuilt the marketing site with a 30% improvement in Lighthouse performance.",
      "Authored 40+ accessible, reusable components now used across the org.",
      "Automated visual regression testing to keep releases safe and fast.",
    ],
  },
] as const;
