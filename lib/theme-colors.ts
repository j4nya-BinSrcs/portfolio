import type { Theme } from "./theme";

export interface CanvasColors {
  bg: [number, number, number];
  grid: [number, number, number];
  gridAlpha: number;
  wall: [number, number, number];
  sand: [number, number, number][];
  water: [number, number, number][];
  acid: [number, number, number][];
  particle: [number, number, number][];
  fractalBg: [number, number, number];
  fractalAccent: [number, number, number];
  fractalInSet: [number, number, number];
  pathfinding: {
    wall: [number, number, number];
    open: [number, number, number];
    accent: [number, number, number];
  };
  accentGlow: string;
}

const dark: CanvasColors = {
  bg: [8, 10, 18],
  grid: [32, 38, 60],
  gridAlpha: 0.06,
  wall: [35, 40, 55],
  sand: [
    [232, 223, 200],
    [224, 208, 178],
    [214, 190, 150],
    [206, 178, 138],
    [232, 196, 148],
    [240, 214, 168],
    [196, 162, 120],
    [226, 208, 158],
  ],
  water: [
    [64, 164, 223],
    [52, 148, 210],
    [88, 190, 235],
    [40, 128, 196],
    [104, 200, 240],
    [58, 156, 220],
  ],
  acid: [
    [148, 225, 80],
    [130, 208, 60],
    [168, 235, 110],
    [116, 196, 50],
    [182, 240, 130],
    [106, 190, 44],
  ],
  particle: [
    [0, 229, 255],
    [255, 80, 200],
    [255, 215, 0],
    [120, 255, 120],
  ],
  fractalBg: [8, 10, 18],
  fractalAccent: [232, 223, 200],
  fractalInSet: [8, 10, 18],
  pathfinding: {
    wall: [22, 25, 42],
    open: [13, 15, 26],
    accent: [232, 223, 200],
  },
  accentGlow: "rgba(232, 223, 200, 0.045)",
};

const light: CanvasColors = {
  bg: [246, 243, 236],
  grid: [82, 80, 74],
  gridAlpha: 0.09,
  wall: [95, 100, 120],
  sand: [
    [170, 138, 88],
    [158, 128, 80],
    [148, 120, 74],
    [140, 112, 68],
    [178, 146, 96],
    [188, 156, 106],
    [132, 104, 60],
    [174, 142, 92],
  ],
  water: [
    [40, 140, 210],
    [28, 125, 195],
    [60, 160, 225],
    [18, 105, 175],
    [82, 172, 230],
    [50, 150, 215],
  ],
  acid: [
    [138, 210, 68],
    [120, 190, 48],
    [158, 220, 98],
    [108, 180, 38],
    [172, 230, 118],
    [98, 178, 34],
  ],
  particle: dark.particle,
  fractalBg: [246, 243, 236],
  fractalAccent: [35, 38, 50],
  fractalInSet: [14, 16, 26],
  pathfinding: {
    wall: [55, 60, 75],
    open: [80, 90, 110],
    accent: [174, 152, 108],
  },
  accentGlow: "rgba(184, 134, 11, 0.06)",
};

export const canvasColors: Record<Theme, CanvasColors> = { dark, light };
