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

// The theme is held in module-level state and surfaced via useSyncExternalStore
// rather than a plain useState inside the provider. This keeps the server and
// client renders consistent (no hydration mismatch on first paint) while still
// letting any component subscribe to theme changes. See lib/theme.ts for the
// token definitions and localStorage persistence.
let current: ThemeName = "carbon";
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

// Always return the persisted theme on the client; the server snapshot is a
// constant so the first HTML render never differs between client and server.
function getSnapshot(): ThemeName {
  current = getStoredTheme();
  return current;
}

function getServerSnapshot(): ThemeName {
  return "carbon";
}

// Notify all subscribers after a theme change is committed to localStorage.
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

  // Apply the resolved theme to the DOM as soon as it becomes known.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // setTheme previews a theme without persisting it; commitTheme persists to
  // localStorage and notifies subscribers so the whole UI updates.
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
