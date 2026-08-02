"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getSection, type SectionId } from "@/lib/sections";

type SectionContextValue = {
  active: SectionId;
  setActive: (id: SectionId) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActiveState] = useState<SectionId>(() => {
    if (typeof window === "undefined") return "about";
    return getSection(window.location.hash.slice(1)).id;
  });

  const setActive = useCallback((id: SectionId) => {
    setActiveState(id);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActiveState(getSection(window.location.hash.slice(1)).id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <SectionContext.Provider value={{ active, setActive }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection(): SectionContextValue {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSection must be used within SectionProvider");
  return ctx;
}
