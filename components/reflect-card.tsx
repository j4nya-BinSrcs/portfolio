"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ReflectCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * Brightens a card's border the closer the cursor gets (reflected light, not glow).
 * Writes directly to the DOM via rAF so pointermove never triggers a re-render.
 */
export default function ReflectCard({
  children,
  className = "",
  innerClassName = "",
}: ReflectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const reach = Math.max(rect.width, rect.height) * 0.9;
        const d = Math.hypot(dx, dy);
        const t = Math.max(0, 1 - d / reach);
        const light = t * t;
        el.style.setProperty("--reflect", light.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={
        {
          "--reflect": "0",
          borderColor: `rgba(246,242,232, calc(0.08 + var(--reflect) * 0.22))`,
        } as React.CSSProperties
      }
    >
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200 ${innerClassName}`}
        style={{
          opacity: "var(--reflect)",
          boxShadow: "inset 0 1px 0 0 rgba(246,242,232,0.5)",
        }}
      />
    </div>
  );
}
