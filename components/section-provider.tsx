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

export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActiveState] = useState<SectionId>(() => {
    if (typeof window === "undefined") return "about";
    return getSection(window.location.hash.slice(1)).id;
  });
  const [direction, setDirection] = useState<Direction>(0);

  const setActive = useCallback((id: SectionId, dir: Direction = 0) => {
    setActiveState(id);
    setDirection(dir);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const cycle = useCallback(
    (delta: 1 | -1) => {
      setActiveState((current) => {
        const index = sections.findIndex((s) => s.id === current);
        const next = sections[(index + delta + sections.length) % sections.length];
        if (typeof window !== "undefined") {
          history.replaceState(null, "", `#${next.id}`);
        }
        return next.id;
      });
      setDirection(delta);
    },
    [],
  );

  const next = useCallback(() => cycle(1), [cycle]);
  const prev = useCallback(() => cycle(-1), [cycle]);

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
