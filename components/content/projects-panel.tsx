"use client";

import { motion } from "framer-motion";
import {
  Code2,
  ExternalLink,
  FileText,
  Images,
} from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import ReflectCard from "../reflect-card";

export type ProjectMode = "case" | "gallery";

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
  onOpenProject?: (title: string, mode: ProjectMode) => void;
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
  onOpen: (title: string, mode: ProjectMode) => void;
}) {
  const project = siteConfig.projects.find((p) => p.title === title)!;
  const hasViews = !project.noViews;

  const thumbnail = project.video ? (
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
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradientFor(project.title)}`}
    >
      <span className="font-mono text-4xl font-bold tracking-tight text-accent/25">
        {project.title.charAt(0)}
      </span>
    </span>
  );

  return (
    <ReflectCard className="group rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col p-3.5">
        {hasViews ? (
          <button
            type="button"
            aria-label={`Open gallery for ${project.title}`}
            onClick={() => onOpen(project.title, "gallery")}
            className={`relative block w-full overflow-hidden rounded-lg border border-line bg-bg-elevated text-left transition-transform duration-300 group-hover:scale-[1.05] ${project.ratio}`}
          >
            {thumbnail}
            <span className="absolute inset-0 z-10 flex items-center justify-center bg-bg/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-bg/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                <Images className="h-3 w-3" aria-hidden="true" />
                Gallery
              </span>
            </span>
          </button>
        ) : (
          <div
            aria-hidden="true"
            className={`relative block w-full overflow-hidden rounded-lg border border-line bg-bg-elevated ${project.ratio}`}
          >
            {thumbnail}
          </div>
        )}

        <div className="flex flex-1 flex-col px-1 pb-1 pt-3.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-tx">{project.title}</h3>
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

          <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-line pt-3.5">
            {hasViews && (
              <button
                type="button"
                onClick={() => onOpen(project.title, "case")}
                className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-2 text-xs font-semibold text-tx transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:brightness-110 active:scale-[0.98]"
              >
                <FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                Case study
              </button>
            )}
            {project.href !== project.code && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-semibold text-soft transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-tx active:scale-[0.98]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                Visit live
              </a>
            )}
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-semibold text-soft transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-tx active:scale-[0.98] ${project.href !== project.code ? "" : "col-span-2"}`}
            >
              <Code2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Source code
            </a>
          </div>
        </div>
      </div>
    </ReflectCard>
  );
}
