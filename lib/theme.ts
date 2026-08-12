"use client";

export type ThemeName =
  | "carbon"
  | "nord"
  | "gruvbox"
  | "everforest"
  | "mono";

type ThemeTokens = {
  name: string;
  bg: string;
  bgElevated: string;
  panel: string;
  border: string;
  borderStrong: string;
  text: string;
  textSoft: string;
  textMute: string;
  accent: string;
  accentSoft: string;
};

export const THEME_KEY = "theme";

export const THEMES: Record<ThemeName, ThemeTokens> = {
  carbon: {
    name: "carbon",
    bg: "#000000",
    bgElevated: "#0d0d0d",
    panel: "#0d0d0d",
    border: "#232323",
    borderStrong: "#3a3a3a",
    text: "#f7f7f7",
    textSoft: "rgba(247, 247, 247, 0.75)",
    textMute: "rgba(247, 247, 247, 0.45)",
    accent: "#f3e2a2",
    accentSoft: "rgba(243, 226, 162, 0.16)",
  },
  nord: {
    name: "nord",
    bg: "#2e3440",
    bgElevated: "#3b4252",
    panel: "#3b4252",
    border: "#4c566a",
    borderStrong: "#5e6e87",
    text: "#eceff4",
    textSoft: "rgba(236, 239, 244, 0.75)",
    textMute: "rgba(236, 239, 244, 0.45)",
    accent: "#88c0d0",
    accentSoft: "rgba(136, 192, 208, 0.16)",
  },
  gruvbox: {
    name: "gruvbox",
    bg: "#282828",
    bgElevated: "#32302f",
    panel: "#32302f",
    border: "#504945",
    borderStrong: "#62574c",
    text: "#ebdbb2",
    textSoft: "rgba(235, 219, 178, 0.75)",
    textMute: "rgba(235, 219, 178, 0.45)",
    accent: "#fabd2f",
    accentSoft: "rgba(250, 189, 46, 0.16)",
  },
  everforest: {
    name: "everforest",
    bg: "#2d353b",
    bgElevated: "#343f44",
    panel: "#343f44",
    border: "#475258",
    borderStrong: "#5a666e",
    text: "#d3c6aa",
    textSoft: "rgba(211, 198, 170, 0.75)",
    textMute: "rgba(211, 198, 170, 0.45)",
    accent: "#a7c080",
    accentSoft: "rgba(167, 192, 128, 0.16)",
  },
  mono: {
    name: "mono",
    bg: "#f8f8f8",
    bgElevated: "#f0f0f0",
    panel: "#f0f0f0",
    border: "#d0d0d0",
    borderStrong: "#b0b0b0",
    text: "#121212",
    textSoft: "rgba(18, 18, 18, 0.75)",
    textMute: "rgba(18, 18, 18, 0.45)",
    accent: "#666666",
    accentSoft: "rgba(102, 102, 102, 0.16)",
  },
};

export const THEME_ORDER: ThemeName[] = [
  "carbon",
  "nord",
  "gruvbox",
  "everforest",
  "mono",
];

export function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "carbon";
  const stored = localStorage.getItem(THEME_KEY);
  return stored && stored in THEMES ? (stored as ThemeName) : "carbon";
}

export function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  const t = THEMES[theme];
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--bg-elevated", t.bgElevated);
  root.style.setProperty("--panel", t.panel);
  root.style.setProperty("--border", t.border);
  root.style.setProperty("--border-strong", t.borderStrong);
  root.style.setProperty("--tx", t.text);
  root.style.setProperty("--tx-soft", t.textSoft);
  root.style.setProperty("--tx-mute", t.textMute);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-soft", t.accentSoft);
}
