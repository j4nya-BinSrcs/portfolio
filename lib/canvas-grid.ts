/**
 * Strokes a faint grid over a canvas backing store.
 * Slightly bolder so the grid reads as a texture, not hairline.
 * Used as a subtle backdrop for the left-panel demo canvases.
 */
export function drawSubtleGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  spacing = 48,
  color = "rgba(215,214,214,0.1)",
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "butt";
  ctx.beginPath();
  for (let x = spacing; x < w; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = spacing; y < h; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
  ctx.restore();
}
