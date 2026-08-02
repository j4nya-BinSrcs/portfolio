"use client";

import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { sections } from "@/lib/sections";
import { useSection } from "./section-provider";

export default function NavRail() {
  const { active, setActive } = useSection();

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    const currentIndex = sections.findIndex((s) => s.id === active);
    let next = currentIndex;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = (currentIndex + 1) % sections.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = (currentIndex - 1 + sections.length) % sections.length;
    } else {
      return;
    }
    e.preventDefault();
    setActive(sections[next].id);
    const el = document.getElementById(`nav-${sections[next].id}`);
    el?.focus();
  }

  return (
    <nav
      aria-label="Sections"
      onKeyDown={onKeyDown}
      className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
    >
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            id={`nav-${id}`}
            type="button"
            aria-current={isActive ? "true" : undefined}
            onClick={() => setActive(id)}
            className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 lg:w-full ${
              isActive
                ? "border-transparent text-tx"
                : "border-line bg-panel/60 text-mute hover:border-line-strong hover:bg-panel hover:text-soft"
            }`}
          >
            <span className="relative flex items-center gap-3">
              <Icon
                className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5 ${
                  isActive ? "text-accent" : "text-mute group-hover:text-soft"
                }`}
                aria-hidden="true"
              />
              <span>{label}</span>
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl border border-accent/30 bg-accent-soft"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
