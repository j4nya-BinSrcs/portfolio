"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const CELL = 3;
const MAX_GRAINS = 80000;
const CENTER_RATE = 4;
const DRAG_RATE = 10;
const BG: [number, number, number] = [8, 10, 18];

const SAND_STOPS: [number, number, number][] = [
  [232, 223, 200],
  [224, 208, 178],
  [214, 190, 150],
  [206, 178, 138],
  [232, 196, 148],
  [240, 214, 168],
  [196, 162, 120],
  [226, 208, 158],
];

const WATER_STOPS: [number, number, number][] = [
  [64, 164, 223],
  [52, 148, 210],
  [88, 190, 235],
  [40, 128, 196],
  [104, 200, 240],
  [58, 156, 220],
];

const WALL_COLOR: [number, number, number] = [35, 40, 55];
const WALL = 255;

interface Sim {
  gw: number;
  gh: number;
  grid: Uint8Array;
  grains: number;
  mode: 0 | 1;
}

let sim: Sim | null = null;

function cellColor(c: number): [number, number, number] {
  if (c === WALL) return WALL_COLOR;
  return c > 8 ? WATER_STOPS[c - 9] : SAND_STOPS[c - 1];
}

export default function FallingSandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const reduce = useReducedMotion();

  function clearSand() {
    if (sim) {
      sim.grid.fill(0);
      sim.grains = 0;
      sim.mode = 0;
    }
    try {
      localStorage.removeItem("falling_sand_v1");
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;
    const context = canvasEl.getContext("2d", { alpha: false });
    if (!context) return;
    const c2d = context;

    let raf = 0;
    let width = 0;
    let height = 0;
    let img: ImageData | null = null;
    let rgba: Uint8ClampedArray | null = null;
    let frameCount = 0;

    function ensureSim() {
      const rect = canvasEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvasEl.width = w;
      canvasEl.height = h;
      img = c2d.createImageData(w, h);
      rgba = img.data;
      const ngw = Math.max(1, Math.floor(w / CELL));
      const ngh = Math.max(1, Math.floor(h / CELL));
      if (!sim || sim.gw !== ngw || sim.gh !== ngh) {
        const ng = new Uint8Array(ngw * ngh);
        let ng2 = 0;
        if (sim && sim.gw === ngw && sim.gh === ngh) {
          ng.set(sim.grid);
          ng2 = sim.grains;
        }
        sim = { gw: ngw, gh: ngh, grid: ng, grains: ng2, mode: sim?.mode ?? 0 };
      }
    }

    function emit(gx: number, gy: number, count: number) {
      if (!sim) return;
      const { grid, gw, gh } = sim;
      const pool = sim.mode === 1 ? 9 : 1;
      const shades = sim.mode === 1 ? WATER_STOPS.length : SAND_STOPS.length;
      for (let i = 0; i < count; i++) {
        if (sim.grains >= MAX_GRAINS) return;
        const x = gx + Math.floor(Math.random() * 5) - 2;
        const y = gy + Math.floor(Math.random() * 5) - 2;
        if (x < 0 || x >= gw || y < 0 || y >= gh) continue;
        const idx = y * gw + x;
        if (grid[idx] !== 0) continue;
        grid[idx] = pool + Math.floor(Math.random() * shades);
        sim.grains++;
      }
    }

    function pour() {
      const ptr = pointerRef.current;
      if (ptr.active) {
        emit(
          Math.min(sim!.gw - 1, Math.max(0, Math.floor(ptr.x / CELL))),
          Math.min(sim!.gh - 1, Math.max(0, Math.floor(ptr.y / CELL))),
          DRAG_RATE,
        );
      } else {
        emit(Math.floor(sim!.gw / 2), 0, CENTER_RATE);
      }
    }

    function update() {
      if (!sim) return;
      const { grid, gw, gh } = sim;
      for (let y = gh - 1; y >= 0; y--) {
        const row = y * gw;
        const goRight = Math.random() < 0.5;
        for (let i = 0; i < gw; i++) {
          const x = goRight ? i : gw - 1 - i;
          const idx = row + x;
          const c = grid[idx];
          if (c === 0 || c === WALL) continue;
          if (y + 1 >= gh) continue;
          const below = idx + gw;
          if (grid[below] === 0) {
            grid[below] = c;
            grid[idx] = 0;
            continue;
          }
          const d = Math.random() < 0.5 ? -1 : 1;
          if (x + d >= 0 && x + d < gw && grid[below + d] === 0) {
            grid[below + d] = c;
            grid[idx] = 0;
            continue;
          }
          if (x - d >= 0 && x - d < gw && grid[below - d] === 0) {
            grid[below - d] = c;
            grid[idx] = 0;
            continue;
          }
          if (c > 8) {
            const dirs = Math.random() < 0.5 ? [1, -1] : [-1, 1];
            const dists = Math.random() < 0.5 ? [1, 2] : [2, 1];
            for (const dd of dirs) {
              for (const k of dists) {
                const nx = x + dd * k;
                if (nx < 0 || nx >= gw) continue;
                const ni = row + nx;
                if (grid[ni] === 0) {
                  grid[ni] = c;
                  grid[idx] = 0;
                  break;
                }
              }
              if (grid[idx] === 0) break;
            }
          }
        }
      }
    }

    function checkTransition() {
      if (!sim) return;
      const total = sim.gw * sim.gh;
      if (sim.mode === 0 && sim.grains >= total * 0.2) {
        sim.grid.fill(0);
        sim.grains = 0;
        sim.mode = 1;
        generateObstacles();
      } else if (sim.mode === 1 && sim.grains >= total * 0.2) {
        sim.grid.fill(0);
        sim.grains = 0;
        sim.mode = 0;
        generateObstacles();
      }
    }

    function generateObstacles() {
      if (!sim) return;
      const { gw, gh } = sim;
      const platformCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < platformCount; i++) {
        const y = Math.floor(gh * 0.25 + Math.random() * gh * 0.5);
        const x = Math.floor(Math.random() * gw * 0.6);
        const w = Math.floor(gw * 0.15 + Math.random() * gw * 0.25);
        for (let dx = 0; dx < w && x + dx < gw; dx++) {
          sim.grid[y * gw + x + dx] = WALL;
        }
      }
      const wallCount = Math.floor(Math.random() * 2);
      for (let i = 0; i < wallCount; i++) {
        const x = Math.floor(gw * 0.2 + Math.random() * gw * 0.6);
        const yStart = Math.floor(gh * 0.3 + Math.random() * gh * 0.2);
        const h = Math.floor(gh * 0.15 + Math.random() * gh * 0.2);
        for (let dy = 0; dy < h && yStart + dy < gh; dy++) {
          sim.grid[(yStart + dy) * gw + x] = WALL;
        }
      }
    }

    function draw() {
      if (!sim || !img || !rgba) return;
      const { grid, gw, gh } = sim;
      const d = rgba;
      const len = width * height * 4;
      for (let i = 0; i < len; i += 4) {
        d[i] = BG[0];
        d[i + 1] = BG[1];
        d[i + 2] = BG[2];
        d[i + 3] = 255;
      }
      for (let gy = 0; gy < gh; gy++) {
        const py0 = gy * CELL;
        const py1 = Math.min(height, py0 + CELL);
        const row = gy * gw;
        for (let gx = 0; gx < gw; gx++) {
          const c = grid[row + gx];
          if (c === 0) continue;
          const col = cellColor(c);
          const px0 = gx * CELL;
          const px1 = Math.min(width, px0 + CELL);
          for (let py = py0; py < py1; py++) {
            const base = (py * width + px0) * 4;
            for (let px = px0; px < px1; px++) {
              const p = base + (px - px0) * 4;
              d[p] = col[0];
              d[p + 1] = col[1];
              d[p + 2] = col[2];
              d[p + 3] = 255;
            }
          }
        }
      }
      c2d.putImageData(img, 0, 0);
    }

    function physics() {
      ensureSim();
      pour();
      update();
      checkTransition();
    }

    function render() {
      draw();
      if (frameCount % 30 === 0 && readoutRef.current && sim) {
        readoutRef.current.textContent = `${sim.mode === 1 ? "water" : "sand"} · ${sim.grains.toLocaleString()}`;
      }
      if (frameCount % 60 === 0 && sim) {
        try {
          localStorage.setItem(
            "falling_sand_v1",
            JSON.stringify({
              gw: sim.gw,
              gh: sim.gh,
              grid: Array.from(sim.grid),
              grains: sim.grains,
              mode: sim.mode,
            }),
          );
        } catch {
          /* ignore */
        }
      }
    }

    function frame() {
      physics();
      render();
      frameCount++;
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      ensureSim();
      for (let i = 0; i < 400; i++) {
        pour();
        update();
      }
      checkTransition();
      render();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerRef.current.active = true;
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [],
  );
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    },
    [],
  );
  const onPointerUp = useCallback(() => {
    pointerRef.current.active = false;
  }, []);
  const onPointerLeave = useCallback(() => {
    pointerRef.current.active = false;
  }, []);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        className="block h-full w-full cursor-crosshair touch-none select-none"
      />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft/80 backdrop-blur-sm">
        <span ref={readoutRef}>sand · 0</span>
      </div>
      <div className="absolute bottom-1.5 right-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearSand();
          }}
          title="Clear and reset to sand"
          aria-label="Clear and reset to sand"
          className="rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft backdrop-blur-sm transition-colors hover:border-line-strong"
        >
          ↻
        </button>
      </div>
    </div>
  );
}