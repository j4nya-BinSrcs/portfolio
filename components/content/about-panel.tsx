"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  FlaskConical,
  Hammer,
  Heart,
  Gauge,
  GitCommit,
  Boxes,
  GitBranch,
  TerminalSquare,
  Grid3X3,
  Wrench,
  Compass,
  ListOrdered,
  Star,
  FolderGit2,
  User,
  Target,
  Settings,
} from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import { fetchGitHubStats, generateContributionGraph, cellColor, type GitHubCommit } from "@/lib/github";
import ReflectCard from "../reflect-card";
import TechLogo from "./tech-logo";

const principleIcons: Record<string, typeof Heart> = {
  minimalism: Grid3X3,
  performance: Gauge,
  "open-source": Boxes,
};

const currentlyIcons: Record<string, typeof Heart> = {
  learning: BookOpen,
  building: Hammer,
  researching: FlaskConical,
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
  const { data: githubStats } = useSWR(
    "/api/github/stats",
    () => fetchGitHubStats(),
    { refreshInterval: 300000, revalidateOnFocus: true }
  );
  const { data: githubCommits } = useSWR<GitHubCommit[]>(
    "/api/github/commits",
    () => fetch("/api/github/commits").then((r) => r.json()),
    { refreshInterval: 300000, revalidateOnFocus: true }
  );

  const isLive = githubCommits != null;
  const commits = isLive
    ? githubCommits?.slice(0, 5) ?? []
    : about.github.commits.slice(0, 5).map((c) => ({
        sha: c.sha,
        commit: {
          message: c.message,
          author: { name: "", date: c.date },
        },
        repo: c.repo,
      }));
  const graph = useMemo(
    () => generateContributionGraph(githubCommits ?? [], 120),
    [githubCommits]
  );
  const stats = githubStats ?? {
    repos: about.github.repos,
    stars: about.github.stars,
    followers: 0,
    following: 0,
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      <motion.section variants={item} className="space-y-3">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          <User className="h-3.5 w-3.5" aria-hidden="true" />
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

      <motion.section variants={item} className="space-y-3 border-t border-line pt-5">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          <Target className="h-3.5 w-3.5" aria-hidden="true" />
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
          className="grid items-start gap-5 lg:grid-cols-[1.5fr_1fr] border-t border-line pt-5"
        >
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              {about.workbenchLabel}
            </h3>
           <div className="grid gap-2.5 sm:grid-cols-2">
             {about.workbench.map((w) => {
               return (
                 <ReflectCard
                   key={w.value}
                   className="rounded-xl border border-line bg-panel/70 transition-colors duration-300"
                 >
                   <div className="flex items-start gap-3 p-3.5">
                     <TechLogo name={w.value} size="lg" />
                     <div>
                       <p className="text-[11px] font-semibold uppercase tracking-wider text-soft">
                         {w.category}
                       </p>
                       <p className="mt-0.5 text-sm font-medium text-tx">{w.value}</p>
                     </div>
                   </div>
                 </ReflectCard>
               );
             })}
           </div>
         </div>

         <div className="space-y-3">
           <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
             <Compass className="h-3.5 w-3.5" aria-hidden="true" />
             {about.engineeringInterestsLabel}
           </h3>
           <div className="flex flex-wrap gap-2">
             {about.engineeringInterests.map((interest) => (
               <span
                 key={interest}
                 className="rounded-full border border-line bg-panel/70 px-3 py-1 text-xs text-soft transition-colors duration-300 hover:border-line-strong"
               >
                 {interest}
               </span>
             ))}
           </div>
         </div>
       </motion.section>

        <motion.section
          variants={item}
          className="grid items-start gap-5 lg:grid-cols-[1fr_1.5fr] border-t border-line pt-5"
        >
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
              <ListOrdered className="h-3.5 w-3.5" aria-hidden="true" />
              {about.engineeringRulesLabel}
            </h3>
           <div className="space-y-3">
             {about.engineeringRules.map((rule) => (
               <div
                 key={rule.number}
                 className="flex items-baseline gap-2"
               >
                 <span className="font-mono text-xs text-accent">{rule.number}</span>
                 <span className="text-sm text-soft">{rule.text}</span>
               </div>
             ))}
           </div>
         </div>

          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
              <Settings className="h-3.5 w-3.5" aria-hidden="true" />
              {about.principlesLabel}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {about.principles.map((p) => {
                const Icon = principleIcons[p.key] ?? Heart;
                return (
                  <ReflectCard
                    key={p.key}
                    className="rounded-xl border border-line bg-panel/70 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-2 p-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-bg-elevated">
                        <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-tx">{p.label}</p>
                        <p className="mt-0 text-[11px] leading-snug text-mute whitespace-pre-line">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </ReflectCard>
                );
              })}
            </div>
          </div>
       </motion.section>

      <motion.section variants={item} className="space-y-3 border-t border-line pt-5">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
          <GitCommit className="h-3.5 w-3.5" aria-hidden="true" />
          {about.activityLabel}
        </h3>
        <div className="flex items-start gap-6">
          <div className="min-w-0 w-[65%] space-y-0.5">
            {commits.map((c, i) => (
              <motion.li
                key={`${c.repo}-${c.sha}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.05 * i }}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-soft transition-colors duration-200 hover:bg-bg-elevated hover:text-tx cursor-pointer"
              >
                <GitBranch className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <span className="w-24 shrink-0 truncate font-medium text-soft">{c.repo}</span>
                <span className="flex-1 truncate text-mute">
                  {c.commit.message.split("\n")[0]}
                </span>
                <span className="shrink-0 font-mono text-mute/70">{c.commit.author.date}</span>
              </motion.li>
            ))}
          </div>

          <div className="shrink-0 space-y-3">
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
                        className="h-[9px] w-[9px] rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-accent/50"
                        style={{ backgroundColor: cellColor(level) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-line bg-panel/70 px-4 py-1.5">
                <FolderGit2 className="h-3 w-3 text-accent" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-wider text-mute">Repos</span>
                <span className="text-sm font-semibold text-tx">{stats.repos}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-panel/70 px-4 py-1.5">
                <Star className="h-3 w-3 text-accent" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-wider text-mute">Stars</span>
                <span className="text-sm font-semibold text-tx">{stats.stars}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

