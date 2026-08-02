"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { skills } from "@/lib/data";
import { EASE } from "@/lib/motion";

function SkillBar({ name, level }: { name: string; level: number }) {
  const reduce = useReducedMotion();
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-soft">{name}</span>
        <span className="font-mono text-xs text-mute">{level}</span>
      </div>
      <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-bg-elevated">
        <motion.div
          className="h-full rounded-full bg-accent/70"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        />
      </div>
    </li>
  );
}

export default function SkillsPanel() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {skills.map((group) => (
        <div
          key={group.category}
          className="rounded-xl border border-line bg-panel/70 p-5 transition-colors hover:border-line-strong"
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider text-mute">
            {group.category}
          </h3>
          <ul className="mt-4 space-y-3">
            {group.items.map((item) => (
              <SkillBar key={item.name} {...item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
