/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 *  Edit every piece of static content for the whole website here.
 * ─────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /* Identity */
  name: "Janya Kansara",
  role: "Software Engineer",
  tagline:
    "I build thoughtful software — from complex dev tools and search systems to polished interfaces — with a focus on performance, DX, and maintainability.",

  /* Hero card */
  hero: {
    eyebrow: "~/whoami",
  },

  /* Quick info strip */
  location: "Gujarat, India, Earth",
  timezone: "IST (UTC+5:30)",
  languages: ["English", "हिन्दी"],

  /* Contact */
  email: "j4nya.kansara@gmail.com",
  resumeUrl: "/resume.pdf",
  available: true,
  availabilityText: "Open to internships, jobs & freelance",

  /* Socials — order shown is the order rendered */
  socials: [
    { id: "X", label: "X", href: "https://x.com/j4nyya" },
    { id: "GitHub", label: "GitHub", href: "https://github.com/j4nya-BinSrcs" },
    {
      id: "LinkedIn",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/janya-kansara-6b718a3a0/",
    },
  ],

  /* Navigation tabs */
  navigation: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],

  /* Sandbox — iOS-style widget stack shown on the left column */
  sandbox: {
    path: "~/sandbox",
    widgets: [
      {
        id: "algorithms",
        tag: "Algorithms",
        title: "Pathfinding",
        hint: "A* · Manhattan heuristic · maze solver",
      },
      {
        id: "simulation",
        tag: "Simulation",
        title: "Particle life",
        hint: "emergent behavior from simple rules",
      },
      {
        id: "mathematics",
        tag: "Mathematics",
        title: "Fractals",
        hint: "Mandelbrot · Julia · dragon curve",
      },
      {
        id: "physics",
        tag: "Physics",
        title: "Falling sand",
        hint: "cellular automata playground",
      },
    ],
  },

  /* About panel */
  about: {
    title: "About me",
    intro: [
      "I build software that is calm, predictable, and enjoyable to use.",
      "Interested in systems where infrastructure, developer experience, and design intersect.",
      "Comfortable moving from backend architecture to polished user interfaces.",
      "I enjoy building small tools that compose into larger ecosystems.",
    ],
currentlyLabel: "Currently",
      currently: [
        {
          key: "learning",
          label: "Learning",
          items: ["Agentic workflows", "Async Rust", "Search indexing"],
        },
        {
          key: "building",
          label: "Building",
          items: [
            "Qwry: Search Engine",
            "GlyphStream: terminal renderer",
            "Portfolio sandbox widgets",
          ],
        },
        {
          key: "researching",
          label: "Researching",
          items: ["Graphics programming", "Rendering pipelines", "Browser internals"],
        },
      ],
      principlesLabel: "Engineering Principles",
      principles: [
        {
          key: "minimalism",
          label: "Minimalism",
          text: "Compose complex software from simple parts.",
        },
        {
          key: "performance",
          label: "Performance",
          text: "Latency is a feature.\nEvery millisecond matters.",
        },
        {
          key: "open-source",
          label: "Open-Source",
          text: "Knowledge compounds when it's shared.",
        },
      ],
      engineeringRulesLabel: "Engineering Rules",
      engineeringRules: [
        { number: "01", text: "Make it work." },
        { number: "02", text: "Make it understandable." },
        { number: "03", text: "Make it fast." },
        { number: "04", text: "Make it maintainable." },
        { number: "05", text: "Make it automatic." },
      ],
      workbenchLabel: "Workbench",
      workbench: [
        { category: "Editor", value: "Zed" },
        { category: "Terminal", value: "Ghostty" },
        { category: "Operating System", value: "Arch Linux" },
        { category: "Compositor", value: "Hyprland" },
      ],
      engineeringInterestsLabel: "Engineering Interests",
      engineeringInterests: [
        "Computer Graphics",
        "Developer Tools",
        "Performance Engineering",
        "Search Systems",
        "Linux Customization",
        "Simulations",
        "Shader Programs",
        "Physics Engines",
      ],
      activityLabel: "Activity",
      github: {
        username: "j4nya-BinSrcs",
        profileUrl: "https://github.com/j4nya-BinSrcs",
        graphSeed: 7,
        repos: 42,
        stars: 128,
        commits: [
        {
          repo: "quillspace",
          message: "feat: multiplayer cursor presence",
          date: "Jul 28",
          sha: "a3f21c9",
        },
        {
          repo: "scaffold",
          message: "chore: bump otel sdk to 1.18",
          date: "Jul 26",
          sha: "9b1e0a4",
        },
        {
          repo: "drift",
          message: "perf: stream queries over websocket",
          date: "Jul 23",
          sha: "c47d2b8",
        },
        {
          repo: "prism-ui",
          message: "feat: add tokens for focus rings",
          date: "Jul 21",
          sha: "e09af13",
        },
        {
          repo: "site",
          message: "fix: hydration-safe theme switch",
          date: "Jul 19",
          sha: "5d6c0e2",
        },
        {
          repo: "quillspace",
          message: "refactor: extract presence protocol",
          date: "Jul 17",
          sha: "b3a8d71",
        },
      ],
    },
  },

  /* Skills panel */
  skills: [
    {
      category: "Languages",
      items: [
        { name: "TypeScript", level: "Proficient" },
        { name: "Python", level: "Proficient" },
        { name: "Java", level: "Proficient" },
        { name: "Go", level: "Comfortable" },
        { name: "Rust", level: "Learning" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "Framer Motion" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "FastAPI" },
        { name: "Django" },
        { name: "Express" },
        { name: "Spring Boot" },
      ],
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Linux" },
        { name: "Docker" },
        { name: "Git" },
        { name: "PostgreSQL" },
        { name: "SQLite" },
        { name: "MongoDB" },
        { name: "AWS" },
        { name: "GitHub Actions" },
      ],
    },
  ],
  engineeringConcepts: [
    "Concurrency",
    "Caching",
    "Authentication",
    "CI/CD",
    "Search Indexing",
    "API Design",
    "Performance",
    "Accessibility",
    "System Design",
    "Developer Experience",
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
      caseStudy: `# Quillspace — Case study

## The problem
Distributed teams struggle to keep structured documents in sync. Existing tools either sacrifice offline support for real-time collaboration or lose version history entirely.

## Goals and vision
- Real-time multiplayer editing with presence
- Offline-first sync backed by CRDTs
- Granular, searchable version history

## Constraints
- Must work over flaky mobile networks
- No central "source of truth" lockstep — any node may be offline
- Under 150ms perceived latency for keystrokes

## Research
I studied Operational Transform vs CRDT approaches, read Yjs internals, and benchmarked WebSocket presence against WebRTC for cursor sharing.

## Architecture
- **Yjs** CRDT for document state
- **WebSocket** gateway for presence and ephemeral events
- **PostgreSQL** for durable history snapshots
- Cache-first client reads with server reconciliation

## Challenges
Tombstones and undo across concurrent edits were the hardest part — merge semantics needed careful design and an extensive property-based test suite.

## Metrics
- 40ms median keystroke latency
- 30k+ concurrent rooms in a single region
- 99.98% sync success rate in the field

## Lessons learned
- CRDTs shift complexity to the client; invest in test suites early
- Presence is a UX feature, not an afterthought
- Build the offline path before the online path`,
      gallery: [
        {
          type: "image",
          src: "",
          caption: "Editor overview",
          ratio: "aspect-[4/3]",
        },
        {
          type: "video",
          src: "",
          caption: "Multiplayer cursors",
          ratio: "aspect-video",
        },
        {
          type: "gif",
          src: "",
          caption: "Presence demo",
          ratio: "aspect-square",
        },
        {
          type: "image",
          src: "",
          caption: "Version history panel",
          ratio: "aspect-[3/4]",
        },
        {
          type: "image",
          src: "",
          caption: "Offline mode",
          ratio: "aspect-video",
        },
        {
          type: "gif",
          src: "",
          caption: "Undo across sessions",
          ratio: "aspect-[4/3]",
        },
      ],
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
      caseStudy: `# Scaffold — Case study

## The problem
Bootstrapping a new service meant copy-pasting configs, wiring telemetry by hand, and drifting from the platform baseline within weeks.

## Goals and vision
- Generate production-ready services from a single command
- Batteries-included observability, testing, and CI
- One canonical template, enforced by codegen rather than docs

## Constraints
- Support Go and TypeScript targets from day one
- Generated projects must be understandable, not magic
- Work offline with no service dependencies

## Research
I compared codegen approaches (text/template vs struct-based AST generation), audited the team's existing services, and distilled them into a single source of truth.

## Architecture
- **Cobra** CLI with subcommands
- Go templates for files; HCL for Terraform wiring
- OpenTelemetry SDK wired into every generated service
- CI templates for GitHub Actions and ArgoCD

## Challenges
Keeping generated code stable across Go module versions while supporting additive customization (flag \`--features\`) without bloating the output.

## Metrics
- 6x faster service bootstrap
- 100% of new services ship with tracing on day one
- 90% fewer config drift incidents after adoption

## Lessons learned
- Codegen beats documentation for enforcing conventions
- The template is a product — version it like one
- Defaults matter more than options`,
      gallery: [
        {
          type: "gif",
          src: "",
          caption: "scaffold new api --lang=go",
          ratio: "aspect-video",
        },
        {
          type: "image",
          src: "",
          caption: "Generated project tree",
          ratio: "aspect-[4/3]",
        },
        {
          type: "video",
          src: "",
          caption: "Telemetry out of the box",
          ratio: "aspect-square",
        },
        {
          type: "image",
          src: "",
          caption: "CI pipeline on first push",
          ratio: "aspect-video",
        },
        {
          type: "image",
          src: "",
          caption: "Subcommand reference",
          ratio: "aspect-[3/4]",
        },
      ],
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
      caseStudy: `# Drift — Case study

## The problem
Privacy-first analytics is a contradiction for most tools — they either drop events to the client or ship raw data to third parties.

## Goals and vision
- Real-time aggregation with no raw-event retention
- Edge computing for event normalization and filtering
- Streaming queries without batch warehouses

## Constraints
- GDPR-first: raw events must never persist
- Sub-second dashboard freshness
- Survive regional edge outages

## Research
I evaluated ClickHouse vs Druid, studied Kafka Streams vs in-flight edge reduction, and interviewed product teams about the events they actually needed.

## Architecture
- **React** dashboard with streaming WebSocket feeds
- **Kafka** for the event bus
- **ClickHouse** for aggregated materialized views
- Edge workers reduce and filter events before they hit the bus

## Challenges
Exactly-once semantics across edge retries and keeping query latency flat as cardinality grew by 10x.

## Metrics
- 800ms median dashboard freshness
- 70% less data shipped to storage
- Zero raw events retained at rest

## Lessons learned
- Delete-by-default changes how you design schemas
- Edge filtering is a privacy feature with a perf bonus
- Streaming queries beat batch refreshes for dashboards`,
      gallery: [
        {
          type: "image",
          src: "",
          caption: "Real-time dashboard",
          ratio: "aspect-[4/3]",
        },
        {
          type: "video",
          src: "",
          caption: "Live query streaming",
          ratio: "aspect-video",
        },
        {
          type: "gif",
          src: "",
          caption: "Edge reduction demo",
          ratio: "aspect-square",
        },
        {
          type: "image",
          src: "",
          caption: "Privacy controls",
          ratio: "aspect-[3/4]",
        },
        {
          type: "image",
          src: "",
          caption: "Cardinality drilldown",
          ratio: "aspect-video",
        },
      ],
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
      caseStudy: `# Prism UI — Case study

## The problem
Four products maintained four bespoke component kits. Every design change multiplied across codebases, and accessibility was an afterthought.

## Goals and vision
- One accessible, token-driven design system
- Monorepo architecture that scales to 60+ components
- Docs that double as living, testable specs

## Constraints
- Support React 18 and Next.js App Router
- Tree-shakeable, minimal runtime cost
- AA contrast as a non-negotiable

## Research
I audited the four existing kits, studied theming approaches (CSS vars vs runtime), and benchmarked bundle impact of each primitive.

## Architecture
- **Turborepo** monorepo with packages per layer
- Token pipeline → CSS custom properties
- **Storybook** as the contract surface
- Visual regression tests on every component

## Challenges
Design-token naming across three themes, and keeping SSR-safe theming that doesn't flash on first paint.

## Metrics
- 3x faster component handoff
- 41% smaller average bundle for consumer apps
- 0 accessibility regressions shipped in two years

## Lessons learned
- Tokens are a language — name them like one
- Docs are a product surface, not a chore
- Standardize the primitives, keep the escapes rare`,
      gallery: [
        {
          type: "image",
          src: "",
          caption: "Component gallery",
          ratio: "aspect-[4/3]",
        },
        {
          type: "gif",
          src: "",
          caption: "Theme switching",
          ratio: "aspect-square",
        },
        {
          type: "image",
          src: "",
          caption: "Token playground",
          ratio: "aspect-video",
        },
        {
          type: "video",
          src: "",
          caption: "Focus ring audit",
          ratio: "aspect-[3/4]",
        },
        {
          type: "image",
          src: "",
          caption: "Storybook stories",
          ratio: "aspect-video",
        },
        {
          type: "gif",
          src: "",
          caption: "SSR-safe theming",
          ratio: "aspect-[4/3]",
        },
      ],
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
        institution: "LJ University, Ahmedabad",
        degree: "B.Tech in Computer Science",
        period: "2022 — Current",
        achievement:
          "Coursework in algorithms, operating systems, computer networks, databases, software engineering, and compiler fundamentals.",
      },
      {
        institution: "Sri Sri Ravishankar Vidhya Mandir, Ahmedabad",
        degree: "Physics · Chemistry · Maths",
        period: "2022",
        achievement:
          "Built a strong foundation in mathematics, physics, and problem solving before transitioning into Computer Science.",
      },
    ],
    certificatesLabel: "Certificates",
    certificates: [
      {
        name: "Introduction to HTML, CSS, & JavaScript",
        image: "/certificates/ibm.png",
        year: "2025",
        href: "/certificates/ibm.pdf",
      },
      {
        name: "Inheritance and Data Structures in Java",
        image: "/certificates/penn.png",
        year: "2025",
        href: "/certificates/penn.pdf",
      },
      {
        name: "Introduction to Java",
        image: "/certificates/learnquest.png",
        year: "2025",
        href: "/certificates/learnquest.pdf",
      },
    ],
  },

  /* Contact panel */
  contact: {
    prompts: [
      "Want to collaborate?",
      "Building something interesting?",
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
