// Exact signed area of closed subpaths (lines, quadratics, cubics).

/**
 * Exact signed area (shoelace generalisation, Green's theorem) of a closed
 * subpath of line/quadratic/cubic segments. Positive = clockwise in a y-down frame.
 */
export function signedArea(segments) {
  let a = 0, sx = 0, sy = 0, px = 0, py = 0;
  const cross = (x0, y0, x1, y1) => x0 * y1 - x1 * y0;
  for (const s of segments) {
    if (s.type === 'move') { sx = px = s.x; sy = py = s.y; continue; }
    if (s.type === 'line') a += cross(px, py, s.x, s.y) / 2;
    else if (s.type === 'quadratic') {
      a += (2 * cross(px, py, s.cx, s.cy) + 2 * cross(s.cx, s.cy, s.x, s.y) + cross(px, py, s.x, s.y)) / 6;
    } else if (s.type === 'cubic') {
      const [x0, y0, x1, y1, x2, y2, x3, y3] = [px, py, s.c1x, s.c1y, s.c2x, s.c2y, s.x, s.y];
      a += (6 * cross(x0, y0, x1, y1) + 3 * cross(x0, y0, x2, y2) + cross(x0, y0, x3, y3)
        + 3 * cross(x1, y1, x2, y2) + 3 * cross(x1, y1, x3, y3) + 6 * cross(x2, y2, x3, y3)) / 20;
    } else if (s.type === 'close') { a += cross(px, py, sx, sy) / 2; px = sx; py = sy; continue; }
    px = s.x; py = s.y;
  }
  return a;
}

