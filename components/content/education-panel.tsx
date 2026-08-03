"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, ScrollText } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import ReflectCard from "../reflect-card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function EducationPanel() {
  const { education } = siteConfig;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.section variants={item} className="relative space-y-4">
        <span
          className="absolute bottom-4 left-5 top-4 w-px bg-line"
          aria-hidden="true"
        />
        <ol className="space-y-4">
          {education.schools.map((entry) => (
            <li
              key={`${entry.institution}-${entry.period}`}
              className="relative rounded-xl border border-line bg-panel/70 p-5 pl-12 transition-colors hover:border-line-strong"
            >
              <span
                className="absolute left-[15px] top-7 h-2.5 w-2.5 rounded-full border border-accent/50 bg-bg"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-tx">
                  {entry.institution}
                </h3>
                <span className="font-mono text-xs text-mute">{entry.period}</span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-soft">
                <GraduationCap className="h-4 w-4 text-mute" aria-hidden="true" />
                {entry.degree}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-mute">
                {entry.achievement}
              </p>
            </li>
          ))}
        </ol>
      </motion.section>

      <motion.section variants={item} className="space-y-3">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
          {education.certificatesLabel}
        </h3>
        <div className="-mx-1 overflow-x-auto pb-2">
          <div className="flex gap-3 px-1">
            {education.certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 * i }}
                className="w-40 shrink-0"
              >
                <ReflectCard className="rounded-xl border border-line bg-panel/70 transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex flex-col gap-2.5 p-3">
                    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg border border-line bg-bg-elevated">
                      {cert.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cert.image}
                          alt={`${cert.name} certificate`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-accent-soft to-transparent">
                          <Award className="h-6 w-6 text-accent" aria-hidden="true" />
                          <span className="px-2 text-center text-[9px] leading-tight text-soft">
                            {cert.name}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium leading-tight text-soft">
                        {cert.name}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-mute">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                </ReflectCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
