"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ThemeName } from "@/lib/theme";
import { applyTheme, getStoredTheme, THEME_KEY } from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  commitTheme: (theme: ThemeName) => void;
};

let current: ThemeName = "carbon";
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function getSnapshot(): ThemeName {
  current = getStoredTheme();
  return current;
}

function getServerSnapshot(): ThemeName {
  return "carbon";
}

function emit() {
  listeners.forEach((l) => l());
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "carbon",
  setTheme: () => {},
  commitTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((name: ThemeName) => {
    applyTheme(name);
  }, []);

  const commitTheme = useCallback((name: ThemeName) => {
    applyTheme(name);
    localStorage.setItem(THEME_KEY, name);
    current = name;
    emit();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      commitTheme,
    }),
    [theme, setTheme, commitTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
