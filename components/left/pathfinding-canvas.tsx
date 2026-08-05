"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { mulberry32, shuffle } from "@/lib/rand";
import { drawSubtleGrid } from "@/lib/canvas-grid";

const COLS = 88;
const ROWS = 56;
const TILE_W = 2 * COLS + 1;
const TILE_H = 2 * ROWS + 1;
const SIZE = TILE_W * TILE_H;
const START = 1 * TILE_W + 1;
const GOAL = (TILE_H - 2) * TILE_W + (TILE_W - 2);
const BATCH = 10;

const WALL: [number, number, number] = [22, 25, 42];
const OPEN: [number, number, number] = [13, 15, 26];
const ACCENT: [number, number, number] = [232, 223, 200];
const START_C: [number, number, number] = [126, 201, 143];
const GOAL_C: [number, number, number] = [217, 138, 128];

const LUT_N = 48;

function buildLut(stops: [number, number, number][]): [number, number, number][] {
  const arr: [number, number, number][] = [];
  for (let i = 0; i < LUT_N; i++) {
    const t = i / (LUT_N - 1);
    const scaled = t * (stops.length - 1);
    const s = Math.floor(scaled);
    const f = scaled - s;
    const a = stops[s];
    const b = stops[Math.min(stops.length - 1, s + 1)];
    arr.push([
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f),
    ]);
  }
  return arr;
}

const GRADIENT_SWATCHES: [number, number, number][] = [
  [255, 130, 40],
  [255, 200, 70],
  [190, 225, 90],
  [70, 220, 130],
  [40, 190, 220],
  [130, 110, 255],
  [220, 80, 170],
  [255, 90, 130],
  [160, 220, 90],
  [90, 220, 200],
  [255, 170, 60],
  [190, 120, 230],
];

function buildRandomLut(
  rand: ReturnType<typeof mulberry32>,
): [number, number, number][] {
  const count = 3 + ((rand() * 3) | 0);
  const swatch = [...GRADIENT_SWATCHES].sort(() => rand() - 0.5).slice(0, count);
  const stops: [number, number, number][] = swatch.map((base) => [
    Math.max(0, Math.min(255, base[0] + ((rand() * 30) | 0) - 15)),
    Math.max(0, Math.min(255, base[1] + ((rand() * 30) | 0) - 15)),
    Math.max(0, Math.min(255, base[2] + ((rand() * 30) | 0) - 15)),
  ]);
  return buildLut(stops);
}

function manhattan(n: number): number {
  const x = n % TILE_W;
  const y = (n / TILE_W) | 0;
  return Math.abs(x - (TILE_W - 2)) + Math.abs(y - (TILE_H - 2));
}

function generateMaze(seed: number): Uint8Array {
  const rand = mulberry32(seed);
  const grid = new Uint8Array(SIZE).fill(1);
  const opened = new Uint8Array(ROWS * COLS);
  const setTile = (x: number, y: number, v: number) => {
    grid[y * TILE_W + x] = v;
  };
  setTile(1, 1, 0);
  opened[0] = 1;
  const stack: number[] = [0];
  while (stack.length > 0) {
    const cell = stack[stack.length - 1];
    const r = (cell / COLS) | 0;
    const c = cell % COLS;
    let carved = false;
    for (const [dx, dy] of shuffle(rand, [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ])) {
      const nr = r + dy;
      const nc = c + dx;
      if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) continue;
      const ncell = nr * COLS + nc;
      if (opened[ncell]) continue;
      setTile(1 + c * 2 + dx, 1 + r * 2 + dy, 0);
      setTile(1 + nc * 2, 1 + nr * 2, 0);
      opened[ncell] = 1;
      stack.push(ncell);
      carved = true;
      break;
    }
    if (!carved) stack.pop();
  }
  return grid;
}

interface SearchResult {
  expOrder: number[];
  expIndex: Int32Array;
  addStep: Int32Array;
  popStep: Int32Array;
  path: number[];
  done: boolean;
}

function runAStar(grid: Uint8Array): SearchResult {
  const g = new Int32Array(SIZE).fill(-1);
  const gAtPush = new Int32Array(SIZE).fill(-2);
  const cameFrom = new Int32Array(SIZE).fill(-1);
  const expanded = new Uint8Array(SIZE);
  const expIndex = new Int32Array(SIZE).fill(-1);
  const addStep = new Int32Array(SIZE).fill(-1);
  const popStep = new Int32Array(SIZE).fill(-1);
  const expOrder: number[] = [];
  const heap: number[] = [];
  const fOf = (n: number) => g[n] + manhattan(n);

  const push = (n: number) => {
    gAtPush[n] = g[n];
    heap.push(n);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (fOf(heap[p]) <= fOf(heap[i])) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };

  const pop = (): number => {
    const top = heap[0];
    const last = heap.pop() as number;
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let m = i;
        if (l < heap.length && fOf(heap[l]) < fOf(heap[m])) m = l;
        if (r < heap.length && fOf(heap[r]) < fOf(heap[m])) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };

  g[START] = 0;
  addStep[START] = 0;
  push(START);
  let done = false;

  while (heap.length > 0) {
    const n = pop();
    if (expanded[n] || gAtPush[n] !== g[n]) continue;
    expanded[n] = 1;
    expIndex[n] = expOrder.length;
    popStep[n] = expOrder.length;
    expOrder.push(n);
    if (n === GOAL) {
      done = true;
      break;
    }
    const x = n % TILE_W;
    const y = (n / TILE_W) | 0;
    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= TILE_W || ny >= TILE_H) continue;
      const m = ny * TILE_W + nx;
      if (grid[m] === 1) continue;
      const ng = g[n] + 1;
      if (g[m] === -1 || ng < g[m]) {
        g[m] = ng;
        cameFrom[m] = n;
        if (addStep[m] === -1) addStep[m] = expOrder.length;
        push(m);
      }
    }
  }

  const path: number[] = [];
  if (done) {
    let cur = GOAL;
    while (cur !== -1) {
      path.push(cur);
      cur = cameFrom[cur];
    }
    path.reverse();
  }
  return { expOrder, expIndex, addStep, popStep, path, done };
}

interface Sim {
  createdRegen: number;
  grid: Uint8Array;
  result: SearchResult;
  expLutIdx: Uint8Array;
  searchLut: [number, number, number][];
  step: number;
}

let regenCounter = 0;
let sim: Sim | null = null;

export default function PathfindingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [regen, setRegen] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;
    const context = canvasEl.getContext("2d", { alpha: false });
    if (!context) return;
    const c2d = context;

    let s: Sim;
    if (!sim || regenCounter !== sim.createdRegen) {
      const seed = (Math.random() * 0x7fffffff) | 0;
      const gradRand = mulberry32((seed ^ 0x9e3779b9) >>> 0);
      const searchLut = buildRandomLut(gradRand);
      const grid = generateMaze(seed);
      const result = runAStar(grid);
      const lastIdx = result.expOrder.length - 1;
      const expLutIdx = new Uint8Array(SIZE);
      for (const n of result.expOrder) {
        expLutIdx[n] =
          lastIdx > 0 ? ((result.expIndex[n] / lastIdx) * (LUT_N - 1)) | 0 : 0;
      }
      s = sim = {
        createdRegen: regenCounter,
        grid,
        result,
        expLutIdx,
        searchLut,
        step: reduce ? result.expOrder.length : 0,
      };
    } else {
      s = sim;
    }

    const { grid, result, expLutIdx } = s;
    const { expOrder, expIndex, addStep, popStep, path, done } = result;
    let step = reduce ? expOrder.length : s.step;

    const off = document.createElement("canvas");
    off.width = TILE_W;
    off.height = TILE_H;
    const offCtxRaw = off.getContext("2d");
    if (!offCtxRaw) return;
    const offCtx = offCtxRaw;
    const img = offCtx.createImageData(TILE_W, TILE_H);
    const buf = img.data;

    let raf = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvasEl.width = w;
        canvasEl.height = h;
      }
    }

    function draw(now: number) {
      if (readoutRef.current) {
        const shown = Math.min(step, expOrder.length);
        readoutRef.current.textContent = `exp ${shown} · path ${
          done && step >= expOrder.length ? path.length : "…"
        }`;
      }

      const showPath = done && step >= expOrder.length;
      const pulse = 0.5 + 0.22 * Math.sin(now * 0.004);
      const pr = Math.round(ACCENT[0] * pulse);
      const pg = Math.round(ACCENT[1] * pulse);
      const pb = Math.round(ACCENT[2] * pulse);

      let i = 0;
      for (let y = 0; y < TILE_H; y++) {
        for (let x = 0; x < TILE_W; x++, i++) {
          const o = i * 4;
          const ei = expIndex[i];
          if (ei >= 0 && ei < step) {
            const c = s.searchLut[expLutIdx[i]];
            buf[o] = c[0];
            buf[o + 1] = c[1];
            buf[o + 2] = c[2];
          } else if (
            addStep[i] >= 0 &&
            addStep[i] <= step &&
            (popStep[i] === -1 || popStep[i] > step)
          ) {
            buf[o] = pr;
            buf[o + 1] = pg;
            buf[o + 2] = pb;
          } else if (grid[i] === 1) {
            buf[o] = WALL[0];
            buf[o + 1] = WALL[1];
            buf[o + 2] = WALL[2];
          } else {
            buf[o] = OPEN[0];
            buf[o + 1] = OPEN[1];
            buf[o + 2] = OPEN[2];
          }
          buf[o + 3] = 255;
        }
      }

      offCtx.putImageData(img, 0, 0);

      c2d.fillStyle = "rgb(8,10,18)";
      c2d.fillRect(0, 0, width, height);
      drawSubtleGrid(c2d, width, height, 36, "rgba(215,214,214,0.1)");
      const cell = Math.max(
        1,
        Math.floor(Math.min(width / TILE_W, height / TILE_H)),
      );
      const ox = Math.floor((width - cell * TILE_W) / 2);
      const oy = Math.floor((height - cell * TILE_H) / 2);
      c2d.drawImage(off, ox, oy, cell * TILE_W, cell * TILE_H);

      if (showPath) {
        c2d.fillStyle = "rgba(255,255,255,0.14)";
        for (const n of path) {
          const px = ox + (n % TILE_W) * cell;
          const py = oy + ((n / TILE_W) | 0) * cell;
          c2d.fillRect(px - 1, py - 1, cell + 2, cell + 2);
        }
        c2d.fillStyle = "rgb(255,255,255)";
        for (const n of path) {
          const px = ox + (n % TILE_W) * cell;
          const py = oy + ((n / TILE_W) | 0) * cell;
          c2d.fillRect(px, py, cell, cell);
        }
      }

      const sx = ox + (START % TILE_W) * cell;
      const sy = oy + ((START / TILE_W) | 0) * cell;
      c2d.fillStyle = `rgb(${START_C.join(",")})`;
      c2d.fillRect(sx, sy, cell, cell);
      const gx = ox + (GOAL % TILE_W) * cell;
      const gy = oy + ((GOAL / TILE_W) | 0) * cell;
      c2d.fillStyle = `rgb(${GOAL_C.join(",")})`;
      c2d.fillRect(gx, gy, cell, cell);
    }

    let restartTimer: number | null = null;
    const scheduleRestart = () => {
      if (restartTimer !== null) return;
      restartTimer = window.setTimeout(() => {
        restartTimer = null;
        regenCounter++;
        setRegen((r) => r + 1);
      }, 3000);
    };

    function frame(now: number) {
      resize();
      step = Math.min(expOrder.length, step + BATCH);
      s.step = step;
      draw(now);
      if (step < expOrder.length) {
        raf = requestAnimationFrame(frame);
      } else if (done) {
        scheduleRestart();
      }
    }

    resize();
    if (reduce || step >= expOrder.length) {
      s.step = step;
      draw(performance.now());
      if (done) scheduleRestart();
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      if (restartTimer !== null) clearTimeout(restartTimer);
    };
  }, [regen, reduce]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full"
      />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft/80 backdrop-blur-sm">
        <span ref={readoutRef}>exp 0 · path …</span>
      </div>
      <div className="absolute bottom-1.5 right-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            regenCounter++;
            setRegen((r) => r + 1);
          }}
          title="Regenerate maze"
          aria-label="Regenerate maze"
          className="rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft backdrop-blur-sm transition-colors hover:border-line-strong"
        >
          ↻
        </button>
      </div>
    </div>
  );
}
