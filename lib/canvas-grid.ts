/**
 * Strokes a faint grid over a canvas backing store.
 * Kept subtle so it reads as a texture, not a ruler.
 */
export function drawSubtleGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  spacing = 48,
  color = "rgba(215,214,214,0.08)",
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = spacing; x < w; x += spacing) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = spacing; y < h; y += spacing) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();
  ctx.restore();
}
