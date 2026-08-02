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
      className="flex h-full flex-col justify-center gap-1 overflow-x-auto rounded-2xl border border-line bg-panel/80 p-2 lg:overflow-y-auto lg:overflow-x-hidden"
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
            className={`group relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-95 lg:w-full ${
              isActive
                ? "text-tx"
                : "text-mute hover:scale-[1.04] hover:bg-bg-elevated/70 hover:text-soft hover:shadow-[0_0_26px_-8px_rgba(232,223,200,0.4)]"
            }`}
          >
            <span className="relative flex items-center gap-3">
              <Icon
                className={`h-[18px] w-[18px] transition-all duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-mute group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-110 group-hover:text-soft"
                }`}
                aria-hidden="true"
              />
              <span>{label}</span>
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl border border-accent/30 bg-accent-soft shadow-[0_0_26px_-8px_rgba(232,223,200,0.45)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
