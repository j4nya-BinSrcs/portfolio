"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeName } from "@/lib/theme";
import { applyTheme, getStoredTheme, THEME_KEY } from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeName;
  resolved: ThemeName;
  setTheme: (theme: ThemeName) => void;
  previewTheme: (theme: ThemeName) => void;
  commitTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "carbon",
  resolved: "carbon",
  setTheme: () => {},
  previewTheme: () => {},
  commitTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => getStoredTheme());
  const [resolved, setResolved] = useState<ThemeName>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((name: ThemeName) => {
    setResolved(name);
    applyTheme(name);
  }, []);

  const commitTheme = useCallback((name: ThemeName) => {
    applyTheme(name);
    localStorage.setItem(THEME_KEY, name);
    setResolved(name);
    setThemeState(name);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolved,
      setTheme,
      previewTheme: setTheme,
      commitTheme,
    }),
    [theme, resolved, setTheme, commitTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
