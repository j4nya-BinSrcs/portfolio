"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sections } from "@/lib/sections";
import { useSection } from "../section-provider";
import { SECTION_STYLES, sectionTransition, EASE } from "@/lib/motion";
import AboutPanel from "./about-panel";
import SkillsPanel from "./skills-panel";
import ExperiencePanel from "./experience-panel";
import EducationPanel from "./education-panel";
import ProjectsPanel from "./projects-panel";
import ContactPanel from "./contact-panel";
import ProjectReadme from "./project-readme";
import PathTypewriter from "./path-typewriter";

type PanelProps = { onOpenProject?: (title: string) => void };

const panels: Record<string, React.ComponentType<PanelProps>> = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  education: EducationPanel,
  projects: ProjectsPanel,
  contact: ContactPanel,
};

export default function ContentPanel() {
  const { active, direction, next, prev } = useSection();
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projectTitle, setProjectTitle] = useState<string | null>(null);
  const lockRef = useRef(0);

  const section = sections.find((s) => s.id === active) ?? sections[0];
  const Panel = (panels[active] ?? AboutPanel) as React.ComponentType<PanelProps>;

  const variants = SECTION_STYLES[active](direction === -1 ? -1 : 1);

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  const jump = useCallback(
    (dir: 1 | -1) => {
      if (Date.now() - lockRef.current < 600) return;
      lockRef.current = Date.now();
      if (dir === 1) next();
      else prev();
      setProjectTitle(null);
    },
    [next, prev],
  );

  useEffect(() => {
    scrollToTop();
  }, [active, projectTitle, scrollToTop]);

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    const atTop = el.scrollTop <= 4;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    if (e.deltaY > 0 && atBottom) jump(1);
    else if (e.deltaY < 0 && atTop) jump(-1);
  }

  const activeIndex = sections.findIndex((s) => s.id === active);
  const path = projectTitle ? `~/projects/${projectTitle}` : section.path;

  return (
    <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset,0_24px_60px_-40px_rgba(0,0,0,0.9)] lg:h-full">
      <header className="flex items-center gap-3 border-b border-line px-6 py-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-bg-elevated ring-1 ring-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-bg-elevated ring-1 ring-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60 ring-1 ring-line" />
        </span>
        <PathTypewriter key={path} text={path} />
        <span className="flex-1" aria-hidden="true" />
        <ProgressDots activeIndex={activeIndex} />
      </header>

      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="flex-1 overflow-y-auto p-6 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={projectTitle ? `readme-${projectTitle}` : active}
            initial={reduce ? false : variants.initial}
            animate={variants.animate}
            exit={reduce ? undefined : variants.exit}
            transition={sectionTransition()}
          >
            {projectTitle ? (
              <ProjectReadme
                title={projectTitle}
                onBack={() => {
                  scrollToTop();
                  setProjectTitle(null);
                }}
              />
            ) : (
              <Panel
                onOpenProject={(title) => {
                  scrollToTop();
                  setProjectTitle(title);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {sections.map((s, i) => {
        const filled = i <= activeIndex;
        return (
          <span key={s.id} className="flex items-center gap-1.5">
            <motion.span
              initial={{ scale: 0.6, opacity: 0.3 }}
              animate={{
                scale: i === activeIndex ? 1.2 : 1,
                opacity: filled ? 1 : 0.35,
              }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`h-1.5 w-1.5 rounded-full ${
                i === activeIndex
                  ? "bg-accent"
                  : filled
                    ? "bg-soft"
                    : "bg-mute/40"
              }`}
            />
            {i < sections.length - 1 && (
              <span className="h-px w-2 bg-line" />
            )}
          </span>
        );
      })}
    </div>
  );
}
