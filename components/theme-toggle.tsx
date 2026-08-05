"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES, THEME_ORDER, type ThemeName } from "@/lib/theme";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const reduce = useReducedMotion();
   const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const active = THEMES[theme];

  const startClose = useCallback(() => {
    if (reduce) return setOpen(false);
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setOpen(false);
    }, 220);
  }, [reduce]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelClose();
        setOpen(false);
      }
    };
    const outside = (e: PointerEvent) => {
      const t = e.target as Node;
      if (
        open &&
        btnRef.current &&
        !btnRef.current.contains(t) &&
        stripRef.current &&
        !stripRef.current.contains(t)
      ) {
        cancelClose();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, cancelClose]);

  const pick = useCallback(
    (name: ThemeName) => {
      cancelClose();
      setTheme(name);
      setOpen(false);
    },
    [setTheme, cancelClose],
  );

  const stripVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleX: 0.97,
      filter: "blur(1px)",
      transition: { duration: 0.18, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 22,
        mass: 0.6,
      },
    },
  };

  return (
      <div
      className="relative inline-block w-full"
      onMouseLeave={startClose}
    >
      <motion.button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Switch theme"
        onMouseEnter={() => {
          cancelClose();
          if (!reduce) setOpen(true);
        }}
        onClick={() => (!reduce ? (cancelClose(), setOpen((o) => !o)) : pick("carbon"))}
        className="relative flex h-10 w-full min-w-[170px] cursor-pointer items-center justify-between rounded-xl border border-line bg-panel/80 px-3 text-[11px] font-medium text-soft outline-none delay-150 hover:border-line-strong hover:text-tx hover:ring-2 hover:ring-accent-soft"
        whileTap={{ scale: 0.97 }}>
        <span className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="relative flex h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: active.accent }}
          />
          <span className="truncate">{active.name}</span>
        </span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="shrink-0 opacity-70"
          fill="none"
        >
          <path
            d="M12 1.5v3m-8.2 2.3A7.75 7.75 0 0 1 12 3a7.75 7.75 0 1 8.2 4.8"
            stroke="#f87171"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M4.8 7.2A7.75 7.75 0 0 1 12 4.8l-.3.1"
            stroke="#fb923c"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M4.8 7.2v12.8A7.75 7.75 0 0 0 12 21.2l-7.2-7.2-.1-.1z"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M12 2.4v3l7.2 7.2-.3.3"
            stroke="#a78bfa"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2" fill="#ddd6fe" />
        </svg>
      </motion.button>

      <motion.div
          ref={stripRef}
          variants={reduce ? undefined : stripVariants}
          initial={reduce ? undefined : "hidden"}
          animate={open ? "visible" : "hidden"}
          exit={reduce ? undefined : "hidden"}
          className="pointer-events-none absolute bottom-[120%] left-1/2 mb-2 flex -translate-x-1/2 items-center justify-center gap-1.5 rounded-lg border border-line bg-panel/90 px-1.5 py-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)] sm:pointer-events-auto sm:max-w-max"
          style={{ transformOrigin: "bottom center" }}
        >
          {THEME_ORDER.map((name) => {
            const t = THEMES[name];
            const selected = theme === name;
            return (
              <button
                key={name}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => pick(name)}
                className="relative flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-medium transition-colors duration-150 focus:ring-1 focus:ring-offset-1 focus:outline-none"
                style={{
                  backgroundColor: t.bg,
                  borderColor: t.border,
                  color: t.text,
                  maxWidth: "110px",
                }}
                title={t.name}
              >
                <span
                  aria-hidden="true"
                  className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: t.accent }}
                >
                  <span
                    className="block h-1.25 w-1.25 rounded-full"
                    style={{
                      backgroundColor: t.bg,
                      opacity: selected ? 0.6 : 0.3,
                    }}
                  />
                </span>
                <span className="truncate">{t.name}</span>
              </button>
            );
          })}
        </motion.div>
    </div>
  );
}
