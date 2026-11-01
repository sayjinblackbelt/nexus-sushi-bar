export function configureCanvas(canvas, logicalWidth, logicalHeight) {
  const pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
  canvas.width = Math.round(logicalWidth * pixelRatio);
  canvas.height = Math.round(logicalHeight * pixelRatio);

  const context = canvas.getContext("2d", { alpha: false });
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.imageSmoothingEnabled = false;
  return context;
}
