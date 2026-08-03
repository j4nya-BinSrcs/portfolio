"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import TechLogo from "./tech-logo";
import ReflectCard from "../reflect-card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const levelStyles: Record<string, string> = {
  Advanced: "border-accent/40 bg-accent-soft text-accent",
  Comfortable: "border-line-strong bg-panel text-soft",
  Learning: "border-line bg-bg-elevated text-mute",
};

export default function SkillsPanel() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {siteConfig.skills.map((group) => (
        <motion.section key={group.category} variants={item} className="space-y-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mute">
            {group.category}
          </h3>
          {"iconOnly" in group && group.iconOnly ? (
            <div className="flex flex-wrap gap-3">
              {group.items.map((skill) => (
                <ReflectCard
                  key={skill.name}
                  className="group relative w-fit rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-bg-elevated px-2.5 py-1 text-xs font-semibold text-soft opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                    {skill.name}
                  </span>
                  <div className="flex items-center justify-center p-2">
                    <TechLogo name={skill.name} size="lg" />
                  </div>
                </ReflectCard>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((skill) => (
                <ReflectCard
                  key={skill.name}
                  className="group relative rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="pointer-events-none absolute left-1/2 top-16 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-bg-elevated px-2.5 py-1 text-xs font-semibold text-soft opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                    {skill.name}
                  </span>
                  <div className="flex h-full flex-col gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <TechLogo name={skill.name} size="lg" />
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                          levelStyles[skill.level] ?? levelStyles.Comfortable
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    {skill.frameworks.length > 0 && (
                      <ul className="mt-auto flex flex-wrap gap-1.5">
                        {skill.frameworks.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-line px-2 py-0.5 text-[10px] font-medium text-mute transition-colors hover:border-line-strong hover:text-soft"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ReflectCard>
              ))}
            </div>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
}
