/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 *  Edit every piece of static content for the whole website here.
 * ─────────────────────────────────────────────────────────────────
 */

export type GalleryItem = {
  type: "image" | "video" | "gif";
  src: string;
  caption: string;
  ratio: string;
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  code: string;
  video: string;
  ratio: string;
  caseStudy?: string;
  gallery?: GalleryItem[];
  noViews?: boolean;
};

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
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ],

  /* Sandbox — iOS-style widget stack shown on the left column */
  sandbox: {
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
          label: "Performance Tuning",
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
        { name: "C++", level: "Comfortable" },
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
    "Performance Tuning",
    "Accessibility",
    "System Design",
    "Developer Experience",
    "Graphics Programming",
    "Shaders",
    "Rest API",
    "Developer Tools",
    "Multi-Threading",
    "Linux",
    "Deployment",
    "Simulations",
    "UI/UX",
    "Data Structures",
    "Algorithms",
    "Agentic Programming",
  ],

  /* Projects panel */
  projects: [
    {
      title: "Qwry",
      description:
        "QWRY is a research-focused search engine built around the idea that search should be more than finding links. It combines web search, source discovery, AI-assisted research, and persistent workspaces into a single environment for collecting, understanding, and connecting information.",
      stack: ["TypeScript", "Next.js", "Vector Search", "AI"],
      href: "https://github.com/j4nya-BinSrcs/qwry.git",
      code: "https://github.com/j4nya-BinSrcs/qwry.git",
      video: "",
      ratio: "aspect-[16/10]",
      caseStudy: `# Qwry — Case study

## Overview
Coming soon. A deep dive into the research assistant, source discovery, and persistent workspaces is being written.

## Getting started
\`\`\`bash
git clone https://github.com/j4nya-BinSrcs/qwry.git
cd qwry
npm install
npm run dev
\`\`\``,
      gallery: [
        {
          type: "image",
          src: "/projects/qwry/qwry_home.png",
          caption: "Search home",
          ratio: "aspect-[15/8]",
        },
        {
          type: "image",
          src: "/projects/qwry/qwry_results.png",
          caption: "Search results",
          ratio: "aspect-[15/8]",
        },
        {
          type: "image",
          src: "/projects/qwry/qwry_reads.png",
          caption: "Source reads",
          ratio: "aspect-[15/8]",
        },
        {
          type: "image",
          src: "/projects/qwry/qwry_summaries.png",
          caption: "Summaries",
          ratio: "aspect-[15/8]",
        },
        {
          type: "image",
          src: "/projects/qwry/qwry_canvas.png",
          caption: "Research canvas",
          ratio: "aspect-[16/7]",
        },
        {
          type: "image",
          src: "/projects/qwry/qwry_images.png",
          caption: "Image search results",
          ratio: "aspect-[15/8]",
        },
        {
          type: "image",
          src: "/projects/qwry/qwry_chat.png",
          caption: "AI research chat",
          ratio: "aspect-[16/10]",
        },
        {
          type: "video",
          src: "/projects/qwry/qwry_search.webm",
          caption: "Search walkthrough",
          ratio: "aspect-[15/8]",
        },
        {
          type: "video",
          src: "/projects/qwry/qwry_discovery.webm",
          caption: "Source discovery",
          ratio: "aspect-[15/8]",
        },
        {
          type: "video",
          src: "/projects/qwry/qwry_workspace.webm",
          caption: "Workspace walkthrough",
          ratio: "aspect-[15/8]",
        },
        {
          type: "video",
          src: "/projects/qwry/qwry_home.webm",
          caption: "Home walkthrough",
          ratio: "aspect-[15/8]",
        },
      ],
    },
    {
      title: "DirStudio",
      description:
        "DirStudio is a directory intelligence, deduplication, and digital asset analysis tool designed to deeply scan folders, find exact and near duplicate files and documents, organize content intelligently, and provide cleanup and conversion features. Built for personal, professional, and enterprise level directory analysis.",
      stack: ["TypeScript", "Node.js", "CLI", "File System"],
      href: "https://github.com/j4nya-BinSrcs/dirstudio.git",
      code: "https://github.com/j4nya-BinSrcs/dirstudio.git",
      video: "",
      ratio: "aspect-[4/3]",
      caseStudy: `# DirStudio — Case study

## Overview
Coming soon. A deep dive into duplicate detection, intelligent organization, and cleanup/conversion features is being written.

## Getting started
\`\`\`bash
git clone https://github.com/j4nya-BinSrcs/dirstudio.git
cd dirstudio
npm install
npm run dev
\`\`\``,
      gallery: [
        {
          type: "image",
          src: "",
          caption: "Folder scan",
          ratio: "aspect-[4/3]",
        },
        {
          type: "gif",
          src: "",
          caption: "Duplicate detection",
          ratio: "aspect-video",
        },
        {
          type: "image",
          src: "",
          caption: "Asset analysis",
          ratio: "aspect-square",
        },
        {
          type: "image",
          src: "",
          caption: "Smart organization",
          ratio: "aspect-[3/4]",
        },
        {
          type: "video",
          src: "",
          caption: "Cleanup demo",
          ratio: "aspect-video",
        },
        {
          type: "image",
          src: "",
          caption: "Conversion tools",
          ratio: "aspect-[4/3]",
        },
      ],
    },
    {
      title: "GlyphStream",
      description:
        "GlyphStream is an image to ascii conversion terminal tool that prints images, videos as well as live webcam captures as ascii with colors in the terminal.",
      stack: ["TypeScript", "Node.js", "CLI", "Terminal"],
      href: "https://github.com/j4nya-BinSrcs/glyphstream.git",
      code: "https://github.com/j4nya-BinSrcs/glyphstream.git",
      video: "",
      ratio: "aspect-square",
      caseStudy: `# GlyphStream — Case study

## Overview
Coming soon. A deep dive into image-to-ascii rendering, video support, and live webcam captures is being written.

## Getting started
\`\`\`bash
git clone https://github.com/j4nya-BinSrcs/glyphstream.git
cd glyphstream
npm install
npm run dev
\`\`\``,
      gallery: [
        {
          type: "image",
          src: "",
          caption: "Image to ASCII",
          ratio: "aspect-square",
        },
        {
          type: "video",
          src: "",
          caption: "Video rendering",
          ratio: "aspect-video",
        },
        {
          type: "gif",
          src: "",
          caption: "Live webcam capture",
          ratio: "aspect-[4/3]",
        },
        {
          type: "image",
          src: "",
          caption: "Colored ASCII output",
          ratio: "aspect-[3/4]",
        },
        {
          type: "image",
          src: "",
          caption: "Terminal preview",
          ratio: "aspect-video",
        },
      ],
    },
    {
      title: "Portfolio",
      description:
        "A modern, interactive developer portfolio inspired by desktop applications, terminal workspaces, and bento dashboards. Built with React, TypeScript, Tailwind CSS, and Framer Motion.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      href: "https://github.com/j4nya-BinSrcs/portfolio.git",
      code: "https://github.com/j4nya-BinSrcs/portfolio.git",
      video: "",
      ratio: "aspect-[16/10]",
      noViews: true,
    },
  ] satisfies Project[],

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
        period: "Until 2022",
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
        preview: "/certificates/ibm.png",
        href: "https://coursera.org/verify/7VS6NWHMVM9T",
      },
      {
        name: "Inheritance and Data Structures in Java",
        image: "/certificates/penn.png",
        year: "2025",
        preview: "/certificates/penn.png",
        href: "https://coursera.org/verify/YGPXGU2NIRKG",
      },
      {
        name: "Introduction to Java",
        image: "/certificates/learnquest.png",
        year: "2025",
        preview: "/certificates/learnquest.png",
        href: "https://coursera.org/verify/LHSW3WJ6N11E",
      },
      {
        name: "Exploratory Data Analysis for Machine Learning",
        image: "/certificates/ibm2.png",
        year: "2025",
        preview: "/certificates/ibm2.pdf",
        href: "/certificates/ibm2.pdf",
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
