"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  FlaskConical,
  Hammer,
  Heart,
  Gauge,
  GitCommit,
  MonitorCog,
  Boxes,
  Accessibility as A11y,
  GitBranch,
  TerminalSquare,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import ReflectCard from "../reflect-card";

const principleIcons: Record<string, typeof Heart> = {
  minimalism: Sparkles,
  performance: Gauge,
  "open-source": Boxes,
  accessibility: A11y,
};

const currentlyIcons: Record<string, typeof Heart> = {
  learning: BookOpen,
  building: Hammer,
  exploring: FlaskConical,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function AboutPanel() {
  const { about } = siteConfig;
  const graph = useMemo(
    () => buildGraph(about.github.graphSeed, 24, 7),
    [about.github.graphSeed],
  );
  const maxCell = Math.max(...graph.flat());

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      <motion.section variants={item} className="space-y-3">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          {about.title}
        </h3>
        <motion.ul variants={item} className="space-y-1">
          {about.intro.map((point, i) => (
            <li key={i} className="flex items-baseline gap-2 text-[13px] leading-snug text-soft">
              <span className="shrink-0 font-mono text-accent" aria-hidden="true">
                ›
              </span>
              {point}
            </li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section variants={item} className="space-y-3">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          {about.currentlyLabel}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {about.currently.map((c) => {
            const Icon = currentlyIcons[c.key];
            return (
              <ReflectCard
                key={c.key}
                className="rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-0.5"
                innerClassName=""
              >
                <div className="flex h-full flex-col gap-3 p-4">
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-soft">
                    {c.label}
                  </p>
                  <ul className="space-y-1.5">
                    {c.items.map((t) => (
                      <li key={t} className="flex items-baseline gap-1.5 text-xs text-mute">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-ok" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </ReflectCard>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        variants={item}
        className="grid items-start gap-5 lg:grid-cols-[1.5fr_1fr]"
      >
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
            {about.principlesLabel}
          </h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {about.principles.map((p) => {
              const Icon = principleIcons[p.key] ?? Heart;
              return (
                <ReflectCard
                  key={p.key}
                  className="rounded-xl border border-line bg-panel/70 transition-colors duration-300"
                >
                  <div className="flex items-start gap-3 p-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-elevated">
                      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-tx">{p.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-mute">{p.text}</p>
                    </div>
                  </div>
                </ReflectCard>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 lg:border-l lg:border-line lg:pl-5">
          <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
            {about.preferencesLabel}
          </h3>
          <div className="flex flex-col gap-2.5">
            {about.preferences.map((p) => (
              <ReflectCard
                key={p.label}
                className="rounded-lg border border-line bg-panel/70 transition-colors duration-300"
              >
                <span className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-soft">
                  <MonitorCog className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="text-mute">{p.label}:</span>
                  <span className="font-medium text-tx">{p.value}</span>
                </span>
              </ReflectCard>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section variants={item} className="space-y-3">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          <GitCommit className="h-3.5 w-3.5" aria-hidden="true" />
          Recent commits
        </h3>
        <div className="flex items-start gap-6">
          <ul className="min-w-0 max-w-[420px] flex-1 space-y-0.5">
            {about.github.commits.map((c, i) => (
              <motion.li
                key={`${c.repo}-${c.sha}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.05 * i }}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs transition-colors hover:bg-bg-elevated"
              >
                <GitBranch className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <span className="w-24 shrink-0 truncate font-medium text-soft">{c.repo}</span>
                <span className="flex-1 truncate text-mute">{c.message}</span>
                <span className="shrink-0 font-mono text-mute/70">{c.date}</span>
                <span className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute sm:inline">
                  {c.sha}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="shrink-0">
            <div className="rounded-xl border border-line bg-panel/70 p-3.5">
              <div className="flex items-center justify-between gap-6">
                <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
                  {about.github.username}
                </p>
                <TerminalSquare className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              </div>
              <div className="mt-3 flex gap-[3px]">
                {graph.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <span
                        key={di}
                        className="h-[9px] w-[9px] rounded-[2px] transition-colors duration-200"
                        style={{ backgroundColor: cellColor(level, maxCell) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

function buildGraph(seed: number, weeks: number, days: number) {
  let state = seed >>> 0;
  const rand = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  return Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => {
      const r = rand();
      if (r > 0.45) return 0;
      if (r > 0.3) return 1;
      if (r > 0.17) return 2;
      if (r > 0.08) return 3;
      return 4;
    }),
  );
}

function cellColor(level: number, max: number) {
  if (level === 0) return "rgba(246,242,232,0.06)";
  const alpha = 0.12 + (level / (max || 4)) * 0.5;
  return `rgba(232,223,200,${alpha.toFixed(3)})`;
}
