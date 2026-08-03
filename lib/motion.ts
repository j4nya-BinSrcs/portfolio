export const EASE = [0.22, 1, 0.36, 1] as const;

export const panelVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
};

export const panelTransition = { duration: 0.3, ease: EASE };

export const revealContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

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
