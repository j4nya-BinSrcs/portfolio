"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";

function ExperienceItem({
  role,
  company,
  period,
  description,
  highlights,
  defaultOpen,
}: (typeof siteConfig.experience)[number] & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div
        className={`rounded-xl border p-5 transition-colors ${
          open
            ? "border-line-strong bg-panel/80"
            : "border-line bg-panel/60 hover:border-line-strong"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-4 text-left"
        >
          <div>
            <h3 className="text-[15px] font-semibold text-tx">{role}</h3>
            <p className="mt-1 text-sm text-soft">{company}</p>
            <p className="mt-1 text-xs text-mute">{description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-xs text-mute">{period}</span>
            <ChevronDown
              className={`h-4 w-4 text-mute transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-baseline gap-2 text-sm leading-relaxed text-soft"
                  >
                    <span className="text-accent" aria-hidden="true">›</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ExperiencePanel() {
  return (
    <div className="relative space-y-4">
      <span
        className="absolute bottom-4 left-5 top-4 w-px bg-line"
        aria-hidden="true"
      />
      <ol className="space-y-4">
        {siteConfig.experience.map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative pl-10">
            <span
              className="absolute left-[15px] top-7 h-2.5 w-2.5 rounded-full border border-accent/50 bg-bg"
              aria-hidden="true"
            />
            <ExperienceItem {...job} defaultOpen={i === 0} />
          </li>
        ))}
      </ol>
    </div>
  );
}
