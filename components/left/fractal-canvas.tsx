"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const STOPS: [number, number, number][] = [
  [6, 8, 14],
  [13, 27, 84],
  [74, 31, 158],
  [155, 38, 234],
  [236, 64, 122],
  [255, 140, 82],
  [255, 210, 118],
];

const CYCLE = 24;
const ZOOM_PER_FRAME = 1.008;
const SWITCH_MS = 6000;
const ACCENT = "rgb(232,223,200)";
const BG = "rgb(8,10,18)";
const T = 1.6;

type PixelFn = (cre: number, cim: number, budget: number) => [number, boolean];

function mandelbrotPixel(
  cre: number,
  cim: number,
  budget: number,
): [number, boolean] {
  let zre = cre;
  let zim = cim;
  let i = 0;
  while (i < budget) {
    const x = zre * zre - zim * zim + cre;
    const y = 2 * zre * zim + cim;
    zre = x;
    zim = y;
    if (zre * zre + zim * zim > 4) break;
    i++;
  }
  if (i >= budget) return [0, true];
  const nu = i + 1 - Math.log2(Math.log2(Math.sqrt(zre * zre + zim * zim)));
  return [((nu % CYCLE) / CYCLE + 1) % 1, false];
}

function juliaPixel(
  cre: number,
  cim: number,
  budget: number,
): [number, boolean] {
  let zre = cre;
  let zim = cim;
  let i = 0;
  while (i < budget) {
    const x = zre * zre - zim * zim - 0.8;
    const y = 2 * zre * zim + 0.156;
    zre = x;
    zim = y;
    if (zre * zre + zim * zim > 4) break;
    i++;
  }
  if (i >= budget) return [0, true];
  const nu = i + 1 - Math.log2(Math.log2(Math.sqrt(zre * zre + zim * zim)));
  return [((nu % CYCLE) / CYCLE + 1) % 1, false];
}

const TRI_A = [0, -T * (Math.sqrt(3) / 3)];
const TRI_B = [-T / 2, T * (Math.sqrt(3) / 6)];
const TRI_C = [T / 2, T * (Math.sqrt(3) / 6)];

function sign(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  return (px - bx) * (ay - by) - (ax - bx) * (py - by);
}

function pointInTriangle(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
): boolean {
  const d1 = sign(px, py, ax, ay, bx, by);
  const d2 = sign(px, py, bx, by, cx, cy);
  const d3 = sign(px, py, cx, cy, ax, ay);
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}

function sierpinskiPixel(
  cre: number,
  cim: number,
  budget: number,
): [number, boolean] {
  if (
    !pointInTriangle(cre, cim, TRI_A[0], TRI_A[1], TRI_B[0], TRI_B[1], TRI_C[0], TRI_C[1])
  ) {
    return [0, true];
  }
  let ax = TRI_A[0];
  let ay = TRI_A[1];
  let bx = TRI_B[0];
  let by = TRI_B[1];
  let cx = TRI_C[0];
  let cy = TRI_C[1];
  let depth = 0;
  while (depth < budget) {
    const mABx = (ax + bx) / 2;
    const mABy = (ay + by) / 2;
    const mBCx = (bx + cx) / 2;
    const mBCy = (by + cy) / 2;
    const mCAx = (cx + ax) / 2;
    const mCAy = (cy + ay) / 2;
    if (pointInTriangle(cre, cim, mABx, mABy, mBCx, mBCy, mCAx, mCAy)) {
      return [depth / budget, false];
    }
    if (pointInTriangle(cre, cim, ax, ay, mABx, mABy, mCAx, mCAy)) {
      bx = mABx;
      by = mABy;
      cx = mCAx;
      cy = mCAy;
    } else if (pointInTriangle(cre, cim, mABx, mABy, bx, by, mBCx, mBCy)) {
      ax = mABx;
      ay = mABy;
      cx = mBCx;
      cy = mBCy;
    } else {
      ax = mCAx;
      ay = mCAy;
      bx = mBCx;
      by = mBCy;
    }
    depth++;
  }
  return [1, false];
}

function budgetEscape(scale: number): number {
  return Math.min(600, Math.floor(120 + Math.log2(Math.max(1, scale)) * 18));
}

function budgetSierpinski(scale: number): number {
  return Math.min(28, 8 + Math.ceil(Math.log2(Math.max(1, scale))));
}

interface Viewport {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

type LineDraw = (
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  vp: Viewport,
  xf: (x: number) => number,
  yf: (y: number) => number,
) => void;

const DRAGON_L = 1.7;

function dragonMid(
  n: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  vp: Viewport,
  xf: (x: number) => number,
  yf: (y: number) => number,
  g: CanvasRenderingContext2D,
) {
  if (n === 0) {
    if (ax < vp.right && bx > vp.left && ay < vp.bottom && by > vp.top) {
      g.moveTo(xf(ax), yf(ay));
      g.lineTo(xf(bx), yf(by));
    }
    return;
  }
  const dx = bx - ax;
  const dy = by - ay;
  const L = Math.hypot(dx, dy);
  const cx = (ax + bx) / 2 + (ay - by) / 2;
  const cy = (ay + by) / 2 - (ax - bx) / 2;
  const mx = ax + 0.42 * dx - 0.17 * dy;
  const my = ay + 0.42 * dy + 0.17 * dx;
  const r = 0.92 * L;
  if (mx + r < vp.left || mx - r > vp.right || my + r < vp.top || my - r > vp.bottom) return;
  dragonMid(n - 1, ax, ay, cx, cy, vp, xf, yf, g);
  dragonMid(n - 1, bx, by, cx, cy, vp, xf, yf, g);
}

function drawDragon(g: CanvasRenderingContext2D, w: number, h: number, vp: Viewport, xf: (x: number) => number, yf: (y: number) => number) {
  g.fillStyle = BG;
  g.fillRect(0, 0, w, h);
  const pixelWorld = (vp.right - vp.left) / w;
  const depth = Math.min(22, Math.max(4, Math.ceil(2 * Math.log2(DRAGON_L / (pixelWorld * 2)))));
  const ax = -0.42 * DRAGON_L;
  const ay = -0.17 * DRAGON_L;
  const bx = ax + DRAGON_L;
  const by = ay;
  g.strokeStyle = ACCENT;
  g.lineWidth = 1.25;
  g.beginPath();
  dragonMid(depth, ax, ay, bx, by, vp, xf, yf, g);
  g.stroke();
}

interface PixelDef {
  kind: "pixel";
  name: string;
  cx: number;
  cy: number;
  span: number;
  pixel: PixelFn;
  budget: (scale: number) => number;
}

interface LineDef {
  kind: "line";
  name: string;
  cx: number;
  cy: number;
  span: number;
  draw: LineDraw;
}

type FractalDef = PixelDef | LineDef;

const FRACTALS: FractalDef[] = [
  { kind: "pixel", name: "Mandelbrot", cx: -0.743643887037151, cy: 0.13182590420533, span: 3.2, pixel: mandelbrotPixel, budget: budgetEscape },
  { kind: "pixel", name: "Julia", cx: 0.25, cy: 0.52, span: 3.2, pixel: juliaPixel, budget: budgetEscape },
  { kind: "pixel", name: "Sierpinski triangle", cx: 0, cy: T * (Math.sqrt(3) / 6), span: 2.8, pixel: sierpinskiPixel, budget: budgetSierpinski },
  { kind: "line", name: "Dragon curve", cx: 0, cy: 0, span: 2.6, draw: drawDragon },
];

let fractalIndex = 0;
let sharedScale = 1;

function palette(t: number): [number, number, number] {
  const pos = ((t % 1) + 1) % 1;
  const scaled = pos * (STOPS.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = STOPS[i];
  const b = STOPS[Math.min(STOPS.length - 1, i + 1)];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

export default function FractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;
    const context = canvasEl.getContext("2d", { alpha: false });
    if (!context) return;
    const c2d = context;

    const geo = document.createElement("canvas");
    const geoCtxRaw = geo.getContext("2d");
    if (!geoCtxRaw) return;
    const geoCtx = geoCtxRaw;

    let raf = 0;
    let width = 0;
    let height = 0;
    let data: ImageData | null = null;
    let renderScale = 1;
    let last = performance.now();
    let frameCount = 0;

    function resizePixel() {
      const rect = canvasEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * renderScale));
      const h = Math.max(1, Math.round(rect.height * renderScale));
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvasEl.width = w;
        canvasEl.height = h;
        data = c2d.createImageData(w, h);
      }
    }

    function resizeGeo() {
      const rect = canvasEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvasEl.width = w;
        canvasEl.height = h;
      }
      if (geo.width !== w || geo.height !== h) {
        geo.width = w;
        geo.height = h;
      }
    }

    function renderPixel(def: PixelDef): number {
      if (!data) return 0;
      const buf = data.data;
      const budget = def.budget(sharedScale);
      const spanX = def.span / sharedScale;
      const spanY = (spanX * height) / width;
      const left = def.cx - spanX / 2;
      const top = def.cy - spanY / 2;

      let idx = 0;
      for (let py = 0; py < height; py++) {
        const cim = top + (py / height) * spanY;
        for (let px = 0; px < width; px++) {
          const cre = left + (px / width) * spanX;
          const [t, inSet] = def.pixel(cre, cim, budget);
          if (inSet) {
            buf[idx] = 8;
            buf[idx + 1] = 10;
            buf[idx + 2] = 18;
            buf[idx + 3] = 255;
          } else {
            const [r, g, b] = palette(t);
            buf[idx] = r;
            buf[idx + 1] = g;
            buf[idx + 2] = b;
            buf[idx + 3] = 255;
          }
          idx += 4;
        }
      }
      c2d.putImageData(data, 0, 0);
      return budget;
    }

    function renderLine(def: LineDef) {
      resizeGeo();
      const spanX = def.span / sharedScale;
      const spanY = (spanX * geo.height) / geo.width;
      const left = def.cx - spanX / 2;
      const top = def.cy - spanY / 2;
      const vp: Viewport = { left, top, right: left + spanX, bottom: top + spanY };
      const xf = (x: number) => ((x - left) / spanX) * geo.width;
      const yf = (y: number) => ((y - top) / spanY) * geo.height;
      def.draw(geoCtx, geo.width, geo.height, vp, xf, yf);
      c2d.drawImage(geo, 0, 0);
    }

    function frame(now: number) {
      const def = FRACTALS[fractalIndex];
      if (def.kind === "pixel") {
        const elapsed = now - last;
        last = now;
        if (elapsed > 24) renderScale = Math.max(0.4, renderScale * 0.9);
        else if (elapsed < 12) renderScale = Math.min(1, renderScale * 1.06);
        if (!reduce) sharedScale *= ZOOM_PER_FRAME;
        resizePixel();
        const budget = renderPixel(def);
        if (frameCount % 30 === 0 && readoutRef.current) {
          readoutRef.current.textContent = `${def.name} · zoom ${sharedScale.toExponential(
            2,
          )} · it ${budget}`;
        }
      } else {
        if (!reduce) sharedScale *= ZOOM_PER_FRAME;
        renderLine(def);
        if (frameCount % 30 === 0 && readoutRef.current) {
          readoutRef.current.textContent = `${def.name} · zoom ${sharedScale.toExponential(
            2,
          )}`;
        }
      }
      frameCount++;
      raf = requestAnimationFrame(frame);
    }

    const switchTimer = window.setInterval(() => {
      fractalIndex = (fractalIndex + 1) % FRACTALS.length;
      sharedScale = 1;
    }, SWITCH_MS);

    const def = FRACTALS[fractalIndex];
    let initial: string;
    if (def.kind === "pixel") {
      resizePixel();
      const budget = renderPixel(def);
      initial = `${def.name} · zoom ${sharedScale.toExponential(2)} · it ${budget}`;
    } else {
      renderLine(def);
      initial = `${def.name} · zoom ${sharedScale.toExponential(2)}`;
    }
    if (readoutRef.current) readoutRef.current.textContent = initial;

    if (!reduce) raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(switchTimer);
    };
  }, [reduce]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full saturate-[1.35] brightness-[1.08]"
      />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-md border border-line bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-soft/80 backdrop-blur-sm">
        <span ref={readoutRef}>Mandelbrot</span>
      </div>
    </div>
  );
}
