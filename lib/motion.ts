import type { Variant } from "framer-motion";

// Shared easing curve for all entrance animations across the dashboard.
export const EASE = [0.22, 1, 0.36, 1] as const;

// Build a hidden/show variant pair from generic start/end states, so each
// element can define its own offset (e.g. slide up, slide in) with one helper.
function dashVariant(
  initial: Variant,
  target: Variant,
  delay: number,
  duration = 0.55,
) {
  return {
    hidden: initial,
    show: {
      ...target,
      transition: { duration, ease: EASE, delay },
    },
  };
}

// The root dashboard stagger container; children reveal in sequence.
export const dashboardReveal = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0, delayChildren: 0.12 },
  },
};

// Staggered entrance variants for each dashboard region (hero, nav, info,
// sandbox, content), each offset slightly later for a cascade effect.
export const enterHero = dashVariant(
  { opacity: 0, y: -24, filter: "blur(6px)" },
  { opacity: 1, y: 0, filter: "blur(0px)" },
  0,
);

export const enterNav = dashVariant(
  { opacity: 0, y: -20, filter: "blur(6px)" },
  { opacity: 1, y: 0, filter: "blur(0px)" },
  0.08,
);

export const enterSandbox = dashVariant(
  { opacity: 0, x: -28, filter: "blur(5px)" },
  { opacity: 1, x: 0, filter: "blur(0px)" },
  0.36,
);

export const enterInfo = dashVariant(
  { opacity: 0, filter: "blur(6px)" },
  { opacity: 1, filter: "blur(0px)" },
  0.52,
);

export const enterInfoRow = dashVariant(
  { opacity: 0, filter: "blur(6px)" },
  { opacity: 1, filter: "blur(0px)" },
  0.56,
);

export const enterContent = dashVariant(
  { opacity: 0, x: 28, filter: "blur(5px)" },
  { opacity: 1, x: 0, filter: "blur(0px)" },
  0.86,
);

type Dir = 1 | -1;

/* Per-section entrance/exit flavours, direction-aware for scroll cycling. */

const slideX = (dir: Dir) => ({
  initial: { opacity: 0, x: 80 * dir, filter: "blur(5px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -80 * dir, filter: "blur(5px)" },
});

const slideY = (dir: Dir) => ({
  initial: { opacity: 0, y: 70 * dir, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -70 * dir, filter: "blur(5px)" },
});

const fold = (dir: Dir) => ({
  initial: {
    opacity: 0,
    y: 50 * dir,
    scaleY: 0.9,
    transformOrigin: dir > 0 ? "50% 100%" : "50% 0%",
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transformOrigin: dir > 0 ? "50% 100%" : "50% 0%",
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -50 * dir,
    scaleY: 0.9,
    transformOrigin: dir > 0 ? "50% 0%" : "50% 100%",
    filter: "blur(4px)",
  },
});

const fade = () => ({
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(6px)" },
});

type SectionVariants = {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  exit: Record<string, number | string>;
};

export const SECTION_STYLES: Record<string, (dir: Dir) => SectionVariants> = {
  about: slideX,
  skills: slideY,
  experience: fold,
  education: fade,
  projects: fade,
  contact: slideY,
};

export function sectionTransition(duration = 0.45) {
  return { duration, ease: EASE };
}
