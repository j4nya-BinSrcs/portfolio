"use client";

import { useEffect, useRef } from "react";
import { canvasColors } from "@/lib/theme-colors";
import { useTheme } from "@/components/theme-provider";

type Point = {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Node = {
  x: number;
  y: number;
  phase: number;
  speed: number;
};

const SPACING = 84;
const RADIUS = 340;
const MAX_DISPLACE = 9;
const SPRING = 0.055;
const DAMPING = 0.84;

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolved } = useTheme();

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const canvas = element;
    const g = element.getContext("2d");
    if (!g) return;
    const ctx = g;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const colors = canvasColors[resolved];
    const lineRgba = `rgba(${colors.bg.join(",")},${colors.gridAlpha})`;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let points: Point[] = [];
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let cols = 0;
    let firstFrameDrawn = false;

    function buildGrid() {
      cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      points = new Array(cols * rows);
      let i = 0;
      for (let j = 0; j < rows; j++) {
        for (let k = 0; k < cols; k++) {
          const x = k * SPACING;
          const y = j * SPACING;
          points[i++] = { bx: x, by: y, x, y, vx: 0, vy: 0 };
        }
      }
    }

    function buildNodes() {
      const rows = Math.ceil(height / SPACING) + 1;
      nodes = new Array(5);
      for (let i = 0; i < nodes.length; i++) {
        nodes[i] = {
          x: Math.floor(Math.random() * cols) * SPACING,
          y: Math.floor(Math.random() * rows) * SPACING,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.6,
        };
      }
    }

    function draw(now: number) {
      let moved = false;
      const forceFirstFrame = points.length > 0 && !firstFrameDrawn;
      if (forceFirstFrame) firstFrameDrawn = true;
      for (const p of points) {
        const dx = p.bx - pointer.x;
        const dy = p.by - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = p.bx;
        let ty = p.by;
        if (pointer.active && dist < RADIUS && dist > 0.001) {
          const t = 1 - dist / RADIUS;
          const strength = t * t * MAX_DISPLACE;
          tx = p.bx + (dx / dist) * strength;
          ty = p.by + (dy / dist) * strength;
        }
        p.vx += (tx - p.x) * SPRING;
        p.vy += (ty - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.vx) > 0.02 || Math.abs(p.vy) > 0.02) moved = true;
      }

      if (moved || pointer.active || forceFirstFrame) {
        ctx.clearRect(0, 0, width, height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = lineRgba;
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const right = i + 1;
          const down = i + cols;
          if (right < points.length && right % cols !== 0) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(points[right].x, points[right].y);
          }
          if (down < points.length) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(points[down].x, points[down].y);
          }
        }
        ctx.stroke();

        for (const node of nodes) {
          const alpha =
            0.5 * (0.5 + 0.5 * Math.sin(now * 0.001 * node.speed + node.phase));
          const r = 34 + alpha * 30;
          const grad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            r,
          );
          const c = colors.bg;
          const midRgba = `rgba(${c.join(",")},${0.06 * alpha})`;
          grad.addColorStop(0, midRgba);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      buildNodes();
      draw(performance.now());
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibility() {
      if (document.hidden) pointer.active = false;
    }

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", resize);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [resolved]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
