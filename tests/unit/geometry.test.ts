import { describe, expect, it } from 'vitest';
import { contourBounds, signedArea, windingOf } from '../../src/core/geometry/measure.ts';
import { assignSegmentIds, parseLegacyPath } from '../../src/core/geometry/path.ts';
import type { VectorSegment } from '../../src/core/schema/types.ts';

const segs = (d: string): VectorSegment[] => assignSegmentIds('t', parseLegacyPath(d)[0]!.segments);

/** Numerical reference: ½∮(x dy − y dx) with fine sampling. */
function numericArea(s: VectorSegment[]): number {
  let start = { x: 0, y: 0 }, p = { x: 0, y: 0 }, a = 0;
  const N = 20000;
  const step = (f: (t: number) => { x: number; y: number }) => {
    let prev = p;
    for (let i = 1; i <= N; i++) {
      const q = f(i / N);
      a += prev.x * q.y - q.x * prev.y;
      prev = q;
    }
    p = prev;
  };
  for (const g of s) {
    if (g.type === 'move') start = p = { x: g.x, y: g.y };
    else if (g.type === 'line') { a += p.x * g.y - g.x * p.y; p = { x: g.x, y: g.y }; }
    else if (g.type === 'quadratic') { const p0 = p; step((t) => ({ x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * g.cx + t * t * g.x, y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * g.cy + t * t * g.y })); }
    else if (g.type === 'cubic') { const p0 = p; step((t) => { const u = 1 - t; return { x: u ** 3 * p0.x + 3 * u * u * t * g.c1x + 3 * u * t * t * g.c2x + t ** 3 * g.x, y: u ** 3 * p0.y + 3 * u * u * t * g.c1y + 3 * u * t * t * g.c2y + t ** 3 * g.y }; }); }
    else if (g.type === 'close') { a += p.x * start.y - start.x * p.y; p = start; }
  }
  return a / 2;
}

describe('exact signed area', () => {
  it('matches the shoelace area for a polygon', () => {
    expect(signedArea(segs('M0 0 L10 0 L10 10 L0 10 Z'))).toBe(100);
  });

  it('matches numerical integration for quadratic contours', () => {
    const s = segs('M51 7 Q101 7 101 70 Q101 133 51 133 Q2 133 2 70 Q2 7 51 7 Z');
    expect(signedArea(s)).toBeCloseTo(numericArea(s), 3);
  });

  it('matches numerical integration for a cubic segment', () => {
    const s: VectorSegment[] = [
      { id: 'a', type: 'move', x: 0, y: 0 },
      { id: 'b', type: 'cubic', c1x: 30, c1y: -40, c2x: 80, c2y: 60, x: 100, y: 0 },
      { id: 'c', type: 'line', x: 50, y: 90 },
      { id: 'd', type: 'close' },
    ];
    expect(signedArea(s)).toBeCloseTo(numericArea(s), 3);
  });

  it('reports screen winding with +y down', () => {
    expect(windingOf(signedArea(segs('M0 0 L10 0 L10 10 Z')), true)).toBe('clockwise');
    expect(windingOf(signedArea(segs('M0 0 L0 10 L10 10 Z')), true)).toBe('counterclockwise');
  });
});

describe('exact bounds', () => {
  it('includes quadratic extrema beyond end points', () => {
    const b = contourBounds(segs('M0 0 Q50 -40 100 0 Z'));
    expect(b.minY).toBeCloseTo(-20, 10);
    expect(b.maxX).toBe(100);
  });
});
