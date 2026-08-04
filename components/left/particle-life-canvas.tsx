"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { mulberry32 } from "@/lib/rand";
import { drawSubtleGrid } from "@/lib/canvas-grid";
import { canvasColors } from "@/lib/theme-colors";
import { useTheme } from "@/components/theme-provider";

const COUNT = 900;
const SPECIES = 4;
const R = 55;
const R2 = R * R;
const FRICTION = 0.55;
const MAX_SPEED = 6;
const GLOW = 11;

const SPECIES_COLORS: [number, number, number][] = [
  [0, 229, 255],
  [255, 80, 200],
  [255, 215, 0],
  [120, 255, 120],
];

function makeGlow(color: [number, number, number], size = 48): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, `rgba(${color.join(",")},0.35)`);
  grad.addColorStop(1, `rgba(${color.join(",")},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export default function ParticleLifeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { resolved } = useTheme();
  const palette = canvasColors[resolved];
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;
    const context = canvasEl.getContext("2d", { alpha: false });
    if (!context) return;
    const c2d = context;

    const rand = mulberry32(runId * 104729 + 7 + (resolved === "light" ? 1 : 0));
    const rect = canvasEl.getBoundingClientRect();
    const w0 = Math.max(1, Math.round(rect.width));
    const h0 = Math.max(1, Math.round(rect.height));

    const gridRgba = `rgba(${palette.grid.join(",")},${palette.gridAlpha})`;

    const sx = new Float32Array(COUNT);
    const sy = new Float32Array(COUNT);
    const vx = new Float32Array(COUNT);
    const vy = new Float32Array(COUNT);
    const sp = new Uint8Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      sx[i] = rand() * w0;
      sy[i] = rand() * h0;
      sp[i] = i % SPECIES;
    }

    const matrix = new Float32Array(SPECIES * SPECIES);
    for (let i = 0; i < SPECIES * SPECIES; i++) {
      matrix[i] = (rand() * 2 - 1) * 1.2;
    }

    const sprites = SPECIES_COLORS.map((c) => makeGlow(c));
    const coreStyles = SPECIES_COLORS.map((c) => `rgb(${c.join(",")})`);

    let raf = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const r = canvasEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width));
      const h = Math.max(1, Math.round(r.height));
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvasEl.width = w;
        canvasEl.height = h;
      }
    }

    function physics(w: number, h: number) {
      const gw = Math.max(1, Math.ceil(w / R));
      const gh = Math.max(1, Math.ceil(h / R));
      const nCells = gw * gh;

      const counts = new Int32Array(nCells);
      for (let i = 0; i < COUNT; i++) {
        const gx = Math.min(gw - 1, Math.max(0, (sx[i] / R) | 0));
        const gy = Math.min(gh - 1, Math.max(0, (sy[i] / R) | 0));
        counts[gy * gw + gx]++;
      }
      const start = new Int32Array(nCells);
      let acc = 0;
      for (let c = 0; c < nCells; c++) {
        start[c] = acc;
        acc += counts[c];
      }
      const order = new Int32Array(COUNT);
      const cursor = new Int32Array(start);
      for (let i = 0; i < COUNT; i++) {
        const gx = Math.min(gw - 1, Math.max(0, (sx[i] / R) | 0));
        const gy = Math.min(gh - 1, Math.max(0, (sy[i] / R) | 0));
        order[cursor[gy * gw + gx]++] = i;
      }

      for (let i = 0; i < COUNT; i++) {
        let ax = 0;
        let ay = 0;
        const xi = sx[i];
        const yi = sy[i];
        const si = sp[i];
        const gx0 = Math.min(gw - 1, Math.max(0, (xi / R) | 0));
        const gy0 = Math.min(gh - 1, Math.max(0, (yi / R) | 0));
        for (let gy = Math.max(0, gy0 - 1); gy <= Math.min(gh - 1, gy0 + 1); gy++) {
          const rowStart = gy * gw;
          for (let gx = Math.max(0, gx0 - 1); gx <= Math.min(gw - 1, gx0 + 1); gx++) {
            const cell = rowStart + gx;
            const end = cell < nCells - 1 ? start[cell + 1] : COUNT;
            for (let k = start[cell]; k < end; k++) {
              const j = order[k];
              if (j === i) continue;
              const dx = xi - sx[j];
              const dy = yi - sy[j];
              const d2 = dx * dx + dy * dy;
              if (d2 > R2 || d2 < 0.04) continue;
              const d = Math.sqrt(d2);
              const f = matrix[si * SPECIES + sp[j]] * (1 - d / R);
              const inv = f / d;
              ax += dx * inv;
              ay += dy * inv;
            }
          }
        }
        let vxx = (vx[i] + ax * 0.45) * FRICTION;
        let vyy = (vy[i] + ay * 0.45) * FRICTION;
        const speed = Math.hypot(vxx, vyy);
        if (speed > MAX_SPEED) {
          vxx *= MAX_SPEED / speed;
          vyy *= MAX_SPEED / speed;
        }
        let nx = xi + vxx;
        let ny = yi + vyy;
        if (nx < 0) nx += w;
        else if (nx >= w) nx -= w;
        if (ny < 0) ny += h;
        else if (ny >= h) ny -= h;
        sx[i] = nx;
        sy[i] = ny;
        vx[i] = vxx;
        vy[i] = vyy;
      }
    }

    function drawParticles() {
      c2d.globalCompositeOperation = "lighter";
      for (let i = 0; i < COUNT; i++) {
        c2d.drawImage(sprites[sp[i]], sx[i] - GLOW / 2, sy[i] - GLOW / 2, GLOW, GLOW);
      }
      c2d.globalCompositeOperation = "source-over";
      for (let i = 0; i < COUNT; i++) {
        c2d.fillStyle = coreStyles[sp[i]];
        c2d.fillRect(sx[i] - 1, sy[i] - 1, 3, 3);
      }
    }

    function trail() {
      c2d.globalCompositeOperation = "source-over";
      const bg = palette.bg;
      c2d.fillStyle = `rgba(${bg.join(",")},0.22)`;
      c2d.fillRect(0, 0, width, height);
    }

    function frame() {
      resize();
      trail();
      physics(width, height);
      drawParticles();
      drawSubtleGrid(c2d, width, height, 44, gridRgba);
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      resize();
      c2d.fillStyle = `rgb(${palette.bg.join(",")})`;
      c2d.fillRect(0, 0, width, height);
      for (let s = 0; s < 500; s++) physics(width, height);
      drawParticles();
      drawSubtleGrid(c2d, width, height, 44, gridRgba);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const matrixTimer = window.setInterval(() => {
      for (let i = 0; i < SPECIES * SPECIES; i++) {
        matrix[i] = (rand() * 2 - 1) * 1.2;
      }
    }, 5000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(matrixTimer);
    };
  }, [runId, reduce, resolved, palette]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full"
      />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft/80 backdrop-blur-sm">
        900 p · 4 sp
      </div>
      <div className="absolute bottom-1.5 right-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRunId((id) => id + 1);
          }}
          title="Regenerate simulation"
          aria-label="Regenerate particle simulation"
          className="rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft backdrop-blur-sm transition-colors hover:border-line-strong"
        >
          ↻
        </button>
      </div>
    </div>
  );
}
