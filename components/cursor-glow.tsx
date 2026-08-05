"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas = canvasEl;
    const g = canvas.getContext("2d");
    if (!g) return;
    const ctx = g;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let tx = -9999;
    let ty = -9999;
    let active = false;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function draw() {
      if (!active) {
        ctx.clearRect(0, 0, width, height);
        raf = requestAnimationFrame(draw);
        return;
      }

      const lineColor = "215,214,214";

      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${lineColor},0.28)`;
      ctx.beginPath();
      ctx.moveTo(tx, 0);
      ctx.lineTo(tx, height);
      ctx.moveTo(0, ty);
      ctx.lineTo(width, ty);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tx, ty, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${lineColor},0.16)`;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduceMotion) {
      window.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", resize);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden h-full w-full md:block"
    />
  );
}
