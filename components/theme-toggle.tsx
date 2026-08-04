"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => toggle()}
      className="relative flex h-9 w-[170px] shrink-0 items-center justify-between rounded-xl border border-line bg-panel/80 px-2.5 text-[11px] font-medium text-soft outline-none transition-colors hover:border-line-strong hover:text-tx"
      whileTap={{ scale: 0.96 }}
    >
      <span className="flex items-center gap-1.5">
        <Sun
          className={`h-3.5 w-3.5 transition-colors ${
            isDark ? "text-mute" : "text-amber-400"
          }`}
          aria-hidden="true"
        />
        <span>Light</span>
      </span>
      <span className="flex items-center gap-1.5">
        <Moon
          className={`h-3.5 w-3.5 transition-colors ${
            isDark ? "text-amber-300" : "text-mute"
          }`}
          aria-hidden="true"
        />
        <span>Dark</span>
      </span>
      <motion.span
        layoutId="theme-knob"
        className="absolute top-1 pointer-events-none block h-7 w-[78px] rounded-lg border border-line bg-bg/60 shadow-[0_0_12px_-4px_rgba(232,223,200,0.18)]"
        style={{ left: isDark ? "86px" : "2px" }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />
    </motion.button>
  );
}
