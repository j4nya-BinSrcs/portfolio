"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const updateGlow = () => {
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const el = glowRef.current;
      if (el && accent) {
        el.style.background = `radial-gradient(circle, ${accent} 0%, transparent 65%)`;
      }
    };

    updateGlow();
    const mo = new MutationObserver(updateGlow);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div
        ref={glowRef}
        className="-translate-x-1/2 -translate-y-1/2"
        style={{
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232, 223, 200, 0.045) 0%, rgba(232, 223, 200, 0) 65%)",
        }}
      />
    </motion.div>
  );
}
