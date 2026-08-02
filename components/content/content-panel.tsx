"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sections } from "@/lib/sections";
import { useSection } from "../section-provider";
import { panelVariants, panelTransition } from "@/lib/motion";
import AboutPanel from "./about-panel";
import SkillsPanel from "./skills-panel";
import ExperiencePanel from "./experience-panel";
import EducationPanel from "./education-panel";
import ProjectsPanel from "./projects-panel";
import ContactPanel from "./contact-panel";

const panels: Record<string, React.ComponentType> = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  education: EducationPanel,
  projects: ProjectsPanel,
  contact: ContactPanel,
};

export default function ContentPanel() {
  const { active } = useSection();
  const reduce = useReducedMotion();
  const section = sections.find((s) => s.id === active) ?? sections[0];
  const Panel = panels[active] ?? AboutPanel;

  return (
    <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset,0_24px_60px_-40px_rgba(0,0,0,0.9)] lg:h-full">
      <header className="flex items-center gap-3 border-b border-line px-6 py-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-bg-elevated ring-1 ring-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-bg-elevated ring-1 ring-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60 ring-1 ring-line" />
        </span>
        <span className="font-mono text-xs text-soft">{section.path}</span>
        <span className="flex-1" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
          {active}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : panelVariants.initial}
            animate={panelVariants.animate}
            exit={reduce ? undefined : panelVariants.exit}
            transition={panelTransition}
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
