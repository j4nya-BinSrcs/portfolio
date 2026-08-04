"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import TechLogo from "./tech-logo";
import ReflectCard from "../reflect-card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function SkillsPanel() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]"
    >
      <div className="space-y-5">
        {siteConfig.skills.map((group) => (
          <motion.section key={group.category} variants={item} className="space-y-2.5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-mute">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {group.items.map((skill) => (
                <ReflectCard
                  key={skill.name}
                  className="group relative rounded-xl border border-line bg-panel/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_16px_-4px_rgba(232,223,200,0.2)]"
                >
                  <div className="flex items-center gap-2.5 p-3">
                    <TechLogo name={skill.name} size="lg" />
                    <span className="text-[12px] font-medium text-soft transition-colors duration-200 group-hover:text-tx">
                      {skill.name}
                    </span>
                  </div>
                </ReflectCard>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <motion.section variants={item} className="lg:border-l lg:border-line lg:pl-6">
        <div className="sticky top-4 space-y-3">
          <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            Engineering Concepts
          </h3>
          <div className="flex flex-wrap gap-2">
            {siteConfig.engineeringConcepts.map((concept, i) => (
              <motion.span
                key={concept}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.03 * i }}
                className="rounded-full border border-line bg-panel/70 px-3 py-1.5 text-[11px] font-medium text-soft transition-all duration-300 hover:border-accent/40 hover:text-tx hover:shadow-[0_0_12px_-4px_rgba(232,223,200,0.25)]"
              >
                {concept}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
