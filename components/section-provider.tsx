"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getSection, sections, type SectionId } from "@/lib/sections";

type Direction = 1 | -1 | 0;

type SectionContextValue = {
  active: SectionId;
  direction: Direction;
  setActive: (id: SectionId, dir?: Direction) => void;
  next: () => void;
  prev: () => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

// Holds the currently active section and the direction of travel (needed to
// pick the correct entrance/exit animation). Also keeps the URL hash in sync
// with the active section so sections are shareable and back/forward work.
export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActiveState] = useState<SectionId>("about");
  const [direction, setDirection] = useState<Direction>(0);

  // Set a specific section; `dir` controls the animation direction. Uses
  // replaceState (not pushState) so navigating sections doesn't spam history.
  const setActive = useCallback((id: SectionId, dir: Direction = 0) => {
    setActiveState(id);
    setDirection(dir);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  // Move to the section delta steps away. Clamping at the ends keeps the last
  // first section in place while still recording the overshoot direction.
  const cycle = useCallback(
    (delta: 1 | -1) => {
      const index = sections.findIndex((s) => s.id === active);
      const nextIndex = index + delta;
      if (nextIndex < 0 || nextIndex >= sections.length) {
        setDirection(delta);
        return;
      }
      const next = sections[nextIndex];
      setActiveState(next.id);
      setDirection(delta);
      if (typeof window !== "undefined") {
        history.replaceState(null, "", `#${next.id}`);
      }
    },
    [active],
  );

  const next = useCallback(() => cycle(1), [cycle]);
  const prev = useCallback(() => cycle(-1), [cycle]);

  // On first load, always land on "about" regardless of any stale hash.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.slice(1) !== "about") {
      history.replaceState(null, "", "#about");
    }
  }, []);

  // Support manual hash edits (browser back/forward) from the address bar.
  useEffect(() => {
    const onHashChange = () => {
      setActiveState(getSection(window.location.hash.slice(1)).id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <SectionContext.Provider value={{ active, direction, setActive, next, prev }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection(): SectionContextValue {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used within SectionProvider");
  return ctx;
}
