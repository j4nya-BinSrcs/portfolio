"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Play } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import ReflectCard from "../reflect-card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const colFromLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

const colFromRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

function gradientFor(title: string) {
  const h = [...title].reduce((a, c) => a + c.charCodeAt(0), 0);
  const palettes = [
    "from-[#2a2a2f] via-[#1c1c20] to-[#0e0e10]",
    "from-[#2b2620] via-[#1d1a16] to-[#0e0d0c]",
    "from-[#1f2830] via-[#161d24] to-[#0c1014]",
    "from-[#2c2128] via-[#1d151c] to-[#0e0a0d]",
  ];
  return palettes[h % palettes.length];
}

export default function ProjectsPanel({
  onOpenProject,
}: {
  onOpenProject?: (title: string) => void;
}) {
  const open = onOpenProject ?? (() => {});
  const projects = siteConfig.projects;
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid items-start gap-4 md:grid-cols-2"
    >
      {[left, right].map((col, ci) => (
        <motion.div
          key={ci}
          variants={ci === 0 ? colFromLeft : colFromRight}
          className="flex flex-col gap-4"
        >
          {col.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              onOpen={open}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ProjectCard({
  title,
  onOpen,
}: {
  title: string;
  onOpen: (title: string) => void;
}) {
  const project = siteConfig.projects.find((p) => p.title === title)!;

  return (
    <ReflectCard className="group rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col p-3.5">
        <button
          type="button"
          onClick={() => onOpen(project.title)}
          aria-label={`Open ${project.title} readme`}
          className={`relative block w-full overflow-hidden rounded-lg border border-line bg-bg-elevated text-left ${project.ratio}`}
        >
          {project.video ? (
            <video
              className="h-full w-full object-cover"
              src={project.video}
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <span
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradientFor(project.title)} transition-transform duration-500 group-hover:scale-105`}
            >
              <span className="font-mono text-4xl font-bold tracking-tight text-accent/25">
                {project.title.charAt(0)}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-bg/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play className="h-3 w-3" aria-hidden="true" />
                Preview
              </span>
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col px-1 pb-1 pt-3.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-tx">{project.title}</h3>
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-line-strong group-hover:text-accent"
              aria-hidden="true"
            >
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">
            {project.description}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-mute transition-colors group-hover:border-line-strong group-hover:text-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onOpen(project.title)}
            className="mt-3.5 inline-flex items-center gap-2 self-start rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soft transition-all hover:border-accent/40 hover:text-tx"
          >
            <Code2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            View readme
          </button>
        </div>
      </div>
    </ReflectCard>
  );
}
