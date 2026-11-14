/**
 * Exact measurements on canonical contours. No flattening: lines and quadratic/cubic
 * Béziers are integrated in closed form, and bounds include curve extrema.
 */
import type { Bounds, Point, VectorContour, VectorSegment } from '../schema/types.ts';

const cross = (a: Point, b: Point): number => a.x * b.y - b.x * a.y;

/**
 * Signed area via Green's theorem: ½∮(x dy − y dx).
 * Positive means clockwise on screen when +y points down (the v0.6 coordinate system).
 */
export function signedArea(segs: readonly VectorSegment[]): number {
  let start: Point | null = null;
  let p: Point | null = null;
  let twice = 0;
  for (const s of segs) {
    switch (s.type) {
      case 'move':
        start = p = { x: s.x, y: s.y };
        break;
      case 'line': {
        const q = { x: s.x, y: s.y };
        twice += cross(p!, q);
        p = q;
        break;
      }
      case 'quadratic': {
        const c = { x: s.cx, y: s.cy };
        const q = { x: s.x, y: s.y };
        twice += (2 / 3) * (cross(p!, c) + cross(c, q)) + (1 / 3) * cross(p!, q);
        p = q;
        break;
      }
      case 'cubic': {
        const c1 = { x: s.c1x, y: s.c1y }, c2 = { x: s.c2x, y: s.c2y }, q = { x: s.x, y: s.y };
        const P0 = p!;
        twice +=
          (6 * cross(P0, c1) + 3 * cross(P0, c2) + cross(P0, q) +
            3 * cross(c1, c2) + 3 * cross(c1, q) + 6 * cross(c2, q)) / 10;
        p = q;
        break;
      }
      case 'close':
        if (p && start) twice += cross(p, start);
        p = start;
        break;
    }
  }
  return twice / 2;
}

function extend(b: Bounds, x: number, y: number): void {
  if (x < b.minX) b.minX = x;
  if (y < b.minY) b.minY = y;
  if (x > b.maxX) b.maxX = x;
  if (y > b.maxY) b.maxY = y;
}

function quadExtrema(p0: number, c: number, p1: number): number[] {
  const den = p0 - 2 * c + p1;
  if (den === 0) return [];
  const t = (p0 - c) / den;
  return t > 0 && t < 1 ? [t] : [];
}

export function contourBounds(segs: readonly VectorSegment[]): Bounds {
  const b: Bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  let p: Point = { x: 0, y: 0 };
  for (const s of segs) {
    if (s.type === 'move' || s.type === 'line') {
      extend(b, s.x, s.y);
      p = { x: s.x, y: s.y };
    } else if (s.type === 'quadratic') {
      extend(b, s.x, s.y);
      for (const t of [...quadExtrema(p.x, s.cx, s.x), ...quadExtrema(p.y, s.cy, s.y)]) {
        const u = 1 - t;
        extend(b, u * u * p.x + 2 * u * t * s.cx + t * t * s.x, u * u * p.y + 2 * u * t * s.cy + t * t * s.y);
      }
      p = { x: s.x, y: s.y };
    } else if (s.type === 'cubic') {
      // Conservative for T02: control-point hull. Exact cubic extrema arrive with the first cubic geometry.
      extend(b, s.c1x, s.c1y);
      extend(b, s.c2x, s.c2y);
      extend(b, s.x, s.y);
      p = { x: s.x, y: s.y };
    }
  }
  return b;
}

export function unionBounds(list: readonly Bounds[]): Bounds {
  const b: Bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const x of list) {
    extend(b, x.minX, x.minY);
    extend(b, x.maxX, x.maxY);
  }
  return b;
}

export function windingOf(area: number, yDown: boolean): VectorContour['winding'] {
  if (area === 0) return 'unspecified';
  return area > 0 === yDown ? 'clockwise' : 'counterclockwise';
}
