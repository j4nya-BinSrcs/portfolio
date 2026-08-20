"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { sections } from "@/lib/sections";
import { useSection } from "../section-provider";
import { SECTION_STYLES, sectionTransition, EASE } from "@/lib/motion";
import AboutPanel from "./about-panel";
import SkillsPanel from "./skills-panel";
import ExperiencePanel from "./experience-panel";
import EducationPanel from "./education-panel";
import ProjectsPanel from "./projects-panel";
import type { ProjectMode } from "./projects-panel";
import ContactPanel from "./contact-panel";
import ProjectCaseStudy from "./project-case-study";
import ProjectGallery from "./project-gallery";
import PathTypewriter from "./path-typewriter";
import TermPrompt from "../term-prompt";

type PanelProps = {
  onOpenProject?: (title: string, mode: ProjectMode) => void;
};

// A project detail view (case study or gallery) shown on top of the projects panel.
type ProjectView = { title: string; mode: ProjectMode };

// Map a section id to the panel component that renders it.
const panels: Record<string, React.ComponentType<PanelProps>> = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  education: EducationPanel,
  projects: ProjectsPanel,
  contact: ContactPanel,
};

// Geometry for the scroll HUD ring: radius and its full circumference.
const RING_R = 15;
const RING_C = 2 * Math.PI * RING_R;

export default function ContentPanel() {
  const { active, direction, next, prev } = useSection();
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  // `view` is the project detail currently open (if any); it only applies
  // while the active section is "projects".
  const [view, setView] = useState<ProjectView | null>(null);
  const viewRef = useRef<ProjectView | null>(null);
  // Scroll-to-switch uses refs instead of state so wheel events never trigger
  // re-renders on every tick. lockRef throttles rapid section changes.
  const lockRef = useRef(0);
  const fillRef = useRef(0);
  const ringRef = useRef<SVGCircleElement>(null);
  const hudRef = useRef({ visible: false, dir: 1 as 1 | -1 });
  const hudTimerRef = useRef<number | null>(null);
  const [hud, setHud] = useState({ visible: false, dir: 1 as 1 | -1 });

  const section = sections.find((s) => s.id === active) ?? sections[0];
  const Panel = (panels[active] ?? AboutPanel) as React.ComponentType<PanelProps>;

  const variants = SECTION_STYLES[active](direction === -1 ? -1 : 1);
  const activeIndex = sections.findIndex((s) => s.id === active);
  const showView = view && active === "projects" ? view : null;

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  // Switch sections, but only once per 600ms to avoid chaining off a single
  // scroll gesture. Leaving a project detail also resets to the list view.
  const jump = useCallback(
    (dir: 1 | -1) => {
      if (Date.now() - lockRef.current < 600) return;
      lockRef.current = Date.now();
      if (dir === 1) next();
      else prev();
      setView(null);
    },
    [next, prev],
  );

  // Hide the scroll HUD and reset the fill ring to empty.
  const resetHud = useCallback(() => {
    if (hudTimerRef.current) {
      clearTimeout(hudTimerRef.current);
      hudTimerRef.current = null;
    }
    fillRef.current = 0;
    if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_C);
    if (hudRef.current.visible) {
      hudRef.current = { ...hudRef.current, visible: false };
      setHud(hudRef.current);
    }
  }, []);

  // Reveal the HUD (only setting state once, to avoid re-renders on scroll).
  const showHud = useCallback((dir: 1 | -1) => {
    if (!hudRef.current.visible || hudRef.current.dir !== dir) {
      hudRef.current = { visible: true, dir };
      setHud(hudRef.current);
    }
  }, []);

  // After a small delay with no further scrolling, reset the HUD so the next
  // gesture starts from an empty ring.
  const scheduleReset = useCallback(() => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = window.setTimeout(resetHud, 350);
  }, [resetHud]);

  // Scroll the detail/list back to the top whenever the section or view changes.
  useEffect(() => {
    scrollToTop();
  }, [active, view, scrollToTop]);

  // Clean up the pending HUD reset timer on unmount.
  useEffect(() => () => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
  }, []);

  // Keep a ref mirror of `view` so the active-section effect can read the
  // latest value without re-subscribing.
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // When leaving "projects", drop any open project detail view.
  useEffect(() => {
    if (!viewRef.current) return;
    const id = setTimeout(() => setView(null), 0);
    return () => clearTimeout(id);
  }, [active]);

  // Core interaction: scrolling at the very top/bottom edge of the panel
  // accumulates "fill" on the HUD ring; reaching 100% switches to the next or
  // previous section. Scrolling anywhere in the middle is normal panel scroll.
  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (showView) return;
    const el = scrollRef.current;
    if (!el) return;
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    // Ignore horizontal scroll (trackpads can emit both axes).
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      resetHud();
      return;
    }
    const atTop = el.scrollTop <= 8;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
    const atEdge = dir === 1 ? atBottom : atTop;
    if (!atEdge) {
      resetHud();
      return;
    }
    // At the first/last section, don't try to go further.
    if (
      (dir === 1 && activeIndex === sections.length - 1) ||
      (dir === -1 && activeIndex === 0)
    ) {
      resetHud();
      return;
    }
    const amount = Math.min(Math.abs(e.deltaY), 120) / 1000;
    const fill = Math.min(1, fillRef.current + amount);
    fillRef.current = fill;
    showHud(dir);
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(RING_C * (1 - fill));
    }
    if (fill >= 1) {
      resetHud();
      jump(dir);
    } else {
      scheduleReset();
    }
  }

  const modePath =
    showView?.mode === "case"
      ? "casestudy"
      : "gallery";
  const path = showView ? `~/projects/${showView.title}/${modePath}` : section.path;

  return (
    <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset,0_24px_60px_-40px_rgba(0,0,0,0.9)] lg:h-full">
      <header className="flex items-center gap-3 border-b border-line px-6 py-3.5">
        <TermPrompt />
        <PathTypewriter key={path} text={path} />
        <span className="flex-1" aria-hidden="true" />
        <ProgressDots activeIndex={activeIndex} />
      </header>

      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showView ? `${showView.mode}-${showView.title}` : active}
            initial={reduce ? false : variants.initial}
            animate={variants.animate}
            exit={reduce ? undefined : variants.exit}
            transition={sectionTransition()}
          >
            {showView ? (
              <>
                {showView.mode === "case" && (
                  <ProjectCaseStudy
                    title={showView.title}
                    onBack={() => {
                      scrollToTop();
                      setView(null);
                    }}
                  />
                )}
                {showView.mode === "gallery" && (
                  <ProjectGallery
                    title={showView.title}
                    onBack={() => {
                      scrollToTop();
                      setView(null);
                    }}
                  />
                )}
              </>
            ) : (
              <Panel
                onOpenProject={(title, mode) => {
                  scrollToTop();
                  setView({ title, mode });
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ScrollHud visible={hud.visible} dir={hud.dir} ringRef={ringRef} />
    </div>
  );
}

function ScrollHud({
  visible,
  dir,
  ringRef,
}: {
  visible: boolean;
  dir: 1 | -1;
  ringRef: React.RefObject<SVGCircleElement | null>;
}) {
  const Icon = dir === 1 ? ChevronDown : ChevronUp;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r={RING_R}
            fill="rgba(10,10,11,0.3)"
            stroke="rgba(246,242,232,0.08)"
            strokeWidth="2.5"
          />
          <circle
            ref={ringRef}
            cx="20"
            cy="20"
            r={RING_R}
            fill="none"
            stroke="rgba(232,223,200,0.4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C}
            transform="rotate(-90 20 20)"
          />
        </svg>
        <Icon className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-accent/50" />
      </div>
    </div>
  );
}

function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {sections.map((s, i) => {
        const filled = i <= activeIndex;
        return (
          <span key={s.id} className="flex items-center gap-1.5">
            <motion.span
              initial={{ scale: 0.6, opacity: 0.3 }}
              animate={{
                scale: i === activeIndex ? 1.2 : 1,
                opacity: filled ? 1 : 0.35,
              }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`h-1.5 w-1.5 rounded-full ${
                i === activeIndex
                  ? "bg-accent"
                  : filled
                    ? "bg-soft"
                    : "bg-mute/40"
              }`}
            />
            {i < sections.length - 1 && (
              <span className="h-px w-2 bg-line" />
            )}
          </span>
        );
      })}
    </div>
  );
}
