"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { canvasColors } from "@/lib/theme-colors";
import { useTheme } from "@/components/theme-provider";

const CELL = 3;
const MAX_GRAINS = 80000;
const CENTER_RATE = 4;
const DRAG_RATE = 10;

const WALL = 255;
const LS_KEY = "falling_sand_v2";
const GRID_EVERY = CELL * 5;
const SOURCES = [0.25, 0.5, 0.75];
const SWITCH_THRESHOLD = 0.4;

const SAND_MIN = 1;
const WATER_MIN = 9;
const ACID_MIN = 15;
const ACID_EAT_RATE = 0.02;
const ACID_SLIDE_RATE = 0.6;
const ACID_SPREAD_RATE = 0.55;

interface Sim {
  gw: number;
  gh: number;
  grid: Uint8Array;
  grains: number;
  mode: 0 | 1 | 2;
}

let sim: Sim | null = null;

function cellColor(
  c: number,
  palette: {
    wall: [number, number, number];
    sand: [number, number, number][];
    water: [number, number, number][];
    acid: [number, number, number][];
  },
): [number, number, number] {
  if (c === WALL) return palette.wall;
  if (c >= ACID_MIN) return palette.acid[c - ACID_MIN];
  if (c >= WATER_MIN) return palette.water[c - WATER_MIN];
  return palette.sand[c - SAND_MIN];
}

function generateObstacles(grid: Uint8Array, gw: number, gh: number) {
  const platformCount = 5 + Math.floor(Math.random() * 5);
  for (let i = 0; i < platformCount; i++) {
    const y = Math.floor(gh * 0.55 + Math.random() * gh * 0.35);
    const x = Math.floor(Math.random() * gw * 0.5);
    const w = Math.floor(gw * 0.12 + Math.random() * gw * 0.22);
    for (let dx = 0; dx < w && x + dx < gw; dx++) {
      grid[y * gw + x + dx] = WALL;
    }
  }
  const wallCount = 3 + Math.floor(Math.random() * 4);
  for (let i = 0; i < wallCount; i++) {
    const x = Math.floor(gw * 0.15 + Math.random() * gw * 0.7);
    const yStart = Math.floor(gh * 0.55 + Math.random() * gh * 0.25);
    const h = Math.floor(gh * 0.1 + Math.random() * gh * 0.15);
    for (let dy = 0; dy < h && yStart + dy < gh; dy++) {
      grid[(yStart + dy) * gw + x] = WALL;
    }
  }
  const diagCount = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < diagCount; i++) {
    const startX = Math.floor(Math.random() * gw * 0.6);
    const startY = Math.floor(gh * 0.6 + Math.random() * gh * 0.25);
    const len = Math.floor(3 + Math.random() * 6);
    const dir = Math.random() < 0.5 ? 1 : -1;
    for (let j = 0; j < len; j++) {
      const px = startX + j * dir;
      const py = startY + j;
      if (px >= 0 && px < gw && py < gh) {
        grid[py * gw + px] = WALL;
      }
    }
  }
}

function loadFromStorage(): Sim | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.gw || !data.gh || !data.grid) return null;
    const grid = new Uint8Array(data.grid);
    return { gw: data.gw, gh: data.gh, grid, grains: data.grains ?? 0, mode: data.mode ?? 0 };
  } catch {
    return null;
  }
}

function saveToStorage(s: Sim) {
  try {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        gw: s.gw,
        gh: s.gh,
        grid: Array.from(s.grid),
        grains: s.grains,
        mode: s.mode,
      }),
    );
  } catch {
    /* ignore */
  }
}

export default function FallingSandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const reduce = useReducedMotion();
  const { resolved } = useTheme();
  const palette = canvasColors[resolved];

  function clearSand() {
    sim = null;
    try {
      localStorage.removeItem(LS_KEY);
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
      if (!sim) {
        const saved = loadFromStorage();
        if (saved && saved.gw === ngw && saved.gh === ngh) {
          sim = saved;
        } else {
          sim = { gw: ngw, gh: ngh, grid: new Uint8Array(ngw * ngh), grains: 0, mode: 0 };
          generateObstacles(sim.grid, ngw, ngh);
        }
      } else if (sim.gw !== ngw || sim.gh !== ngh) {
        const old = sim;
        sim = { gw: ngw, gh: ngh, grid: new Uint8Array(ngw * ngh), grains: 0, mode: old.mode };
        generateObstacles(sim.grid, ngw, ngh);
      }
    }

    function emit(gx: number, gy: number, count: number) {
      if (!sim) return;
      const { grid, gw, gh } = sim;
      const pool =
        sim.mode === 1 ? WATER_MIN : sim.mode === 2 ? ACID_MIN : SAND_MIN;
      const shades =
        sim.mode === 1
          ? palette.water.length
          : sim.mode === 2
            ? palette.acid.length
            : palette.sand.length;
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
        for (const f of SOURCES) {
          emit(Math.floor(sim!.gw * f), 0, CENTER_RATE);
        }
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
          const isFluid = c >= WATER_MIN;
          const isAcid = c >= ACID_MIN;
          const below = idx + gw;

          if (isAcid && grid[below] === WALL && Math.random() < ACID_EAT_RATE) {
            grid[below] = 0;
          }

          if (grid[below] === 0) {
            grid[below] = c;
            grid[idx] = 0;
            continue;
          }

          if (grid[below] === WALL) {
            if (isFluid) {
              const canSlide = isAcid ? Math.random() < ACID_SLIDE_RATE : true;
              if (canSlide) {
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
              }
            }
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

          if (isFluid) {
            if (isAcid && Math.random() >= ACID_SPREAD_RATE) {
            } else {
              const dirs = Math.random() < 0.5 ? [1, -1] : [-1, 1];
              for (const dd of dirs) {
                const nx1 = x + dd;
                if (nx1 < 0 || nx1 >= gw) continue;
                if (grid[row + nx1] !== 0) continue;
                const nx2 = x + dd * 2;
                if (nx2 < 0 || nx2 >= gw) continue;
                if (grid[row + nx2] !== 0) continue;
                grid[row + nx2] = c;
                grid[idx] = 0;
                break;
              }
            }
            if (grid[idx] === 0) continue;
          }
        }
      }
    }

    function checkTransition() {
      if (!sim) return;
      const total = sim.gw * sim.gh;
      if (sim.grains >= total * SWITCH_THRESHOLD) {
        sim.grid.fill(0);
        sim.grains = 0;
        sim.mode = ((sim.mode + 1) % 3) as 0 | 1 | 2;
        generateObstacles(sim.grid, sim.gw, sim.gh);
      }
    }

    function draw() {
      if (!sim || !img || !rgba) return;
      const { grid, gw, gh } = sim;
      const d = rgba;
      const len = width * height * 4;
      for (let i = 0; i < len; i += 4) {
        const p = i / 4;
        const px = p % width;
        const py = (p / width) | 0;
        if (px % GRID_EVERY === 0 || py % GRID_EVERY === 0) {
          d[i] = palette.grid[0];
          d[i + 1] = palette.grid[1];
          d[i + 2] = palette.grid[2];
        } else {
          d[i] = palette.bg[0];
          d[i + 1] = palette.bg[1];
          d[i + 2] = palette.bg[2];
        }
        d[i + 3] = 255;
      }
      for (let gy = 0; gy < gh; gy++) {
        const py0 = gy * CELL;
        const py1 = Math.min(height, py0 + CELL);
        const row = gy * gw;
        for (let gx = 0; gx < gw; gx++) {
          const c = grid[row + gx];
          if (c === 0) continue;
          const col = cellColor(c, palette);
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
        const material =
          sim.mode === 1 ? "water" : sim.mode === 2 ? "acid" : "sand";
        readoutRef.current.textContent = `${material} · ${sim.grains.toLocaleString()}`;
      }
      if (frameCount % 60 === 0 && sim) {
        saveToStorage(sim);
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
  }, [reduce, resolved, palette]);

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
