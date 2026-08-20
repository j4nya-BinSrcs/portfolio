"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import { EASE } from "@/lib/motion";
import PathTypewriter from "../content/path-typewriter";
import TermPrompt from "../term-prompt";
import ReflectCard from "../reflect-card";
import FallingSandCanvas from "./falling-sand-canvas";
import FractalCanvas from "./fractal-canvas";
import PathfindingCanvas from "./pathfinding-canvas";
import ParticleLifeCanvas from "./particle-life-canvas";

const widgets = siteConfig.sandbox.widgets;

export default function SandboxStack() {
  const reduce = useReducedMotion();
  // Which demo widget is currently visible in the stacked panel.
  const [index, setIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  // Accumulated wheel delta across events (a single gesture can fire many
  // wheel events); once it crosses a threshold we advance a widget.
  const accumRef = useRef(0);
  const hoverRef = useRef(false);
  const wheelLockRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const advance = useCallback((delta: 1 | -1) => {
    setSlideDir(delta);
    setIndex((i) => (i + delta + widgets.length) % widgets.length);
  }, []);

  // Auto-rotate to the next widget every 15s, unless the user is hovering.
  const startAutoCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (!hoverRef.current) advance(1);
    }, 15000);
  }, [advance]);

  useEffect(() => {
    startAutoCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoCycle]);

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now - wheelLockRef.current < 350) return;
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    accumRef.current += dy;
    if (Math.abs(accumRef.current) < 48) return;
    const dir: 1 | -1 = accumRef.current > 0 ? 1 : -1;
    accumRef.current = 0;
    wheelLockRef.current = now;
    advance(dir);
    startAutoCycle();
  }

  const cycle = useCallback(() => {
    advance(1);
    startAutoCycle();
  }, [advance, startAutoCycle]);

  function onTitleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cycle();
    }
  }

  const widget = widgets[index];
  const path = `~/sandbox/${widget.id}`;

  return (
    <ReflectCard className="h-full rounded-2xl border border-line bg-panel/80">
      <div
        onWheel={onWheel}
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
        className="flex h-full cursor-default flex-col p-4"
      >
        <div className="flex items-center gap-2.5">
          <TermPrompt />
          <PathTypewriter key={path} text={path} />
          <span className="flex-1" aria-hidden="true" />
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {widgets.map((w, i) => (
              <span
                key={w.id}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i === index ? "bg-accent" : "bg-mute/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-3 flex flex-1 overflow-hidden rounded-xl border border-line bg-bg-elevated/60 transition-colors hover:border-line-strong">
          <div
            role="button"
            tabIndex={0}
            onClick={cycle}
            onKeyDown={onTitleKeyDown}
            aria-label={`${widget.tag}: ${widget.title}. Click to cycle the sandbox widget.`}
            className="flex min-w-0 flex-1 cursor-pointer flex-col justify-center p-4 outline-none focus-visible:outline-1 focus-visible:outline-accent/40"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={widget.id}
                initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  {widget.tag}
                </span>
                <h4 className="mt-1 text-lg font-bold text-tx">{widget.title}</h4>
                <p className="mt-1 text-[11px] leading-snug text-mute">
                  {widget.hint}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex min-w-0 flex-[2] overflow-hidden border-l border-line">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={widget.id}
                className="absolute inset-0"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: 56 * slideDir, scale: 0.94, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, x: -56 * slideDir, scale: 0.94, filter: "blur(4px)" }
                }
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 22 },
                  scale: { type: "spring", stiffness: 280, damping: 22 },
                  opacity: { duration: 0.22, ease: EASE },
                  filter: { duration: 0.22, ease: EASE },
                }}
              >
                {widget.id === "mathematics" ? (
                  <FractalCanvas />
                ) : widget.id === "algorithms" ? (
                  <PathfindingCanvas />
                ) : widget.id === "simulation" ? (
                  <ParticleLifeCanvas />
                ) : (
                  <FallingSandCanvas />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ReflectCard>
  );
}
