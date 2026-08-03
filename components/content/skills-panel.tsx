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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((skill) => (
              <ReflectCard
                key={skill.name}
                className="rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <TechLogo name={skill.name} size="lg" />
                    <span className="rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
                      {skill.years} yrs
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold leading-tight text-tx">
                    {skill.name}
                  </p>
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
        </motion.section>
      ))}
    </motion.div>
  );
}
