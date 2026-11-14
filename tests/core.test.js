import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { sha256Hex } from '../src/core/sha256.js';
import { stableStringify } from '../src/core/stable-json.js';
import { parsePath, serializeSegments, segmentBounds, PathParseError } from '../src/geometry/svg-path.js';
import { signedArea } from '../src/glyph/import-v06.js';

test('sha256Hex matches node:crypto for ASCII, empty, multi-block and UTF-8 input', () => {
  for (const s of ['', 'abc', 'M8 132 L8 42 Z', 'x'.repeat(1000), 'Größe – ✓']) {
    assert.equal(sha256Hex(s), createHash('sha256').update(s, 'utf8').digest('hex'));
  }
});

test('stableStringify is key-order independent', () => {
  assert.equal(stableStringify({ b: 1, a: [{ d: 1, c: 2 }] }), stableStringify({ a: [{ c: 2, d: 1 }], b: 1 }));
});

test('parsePath splits subpaths and round-trips exactly', () => {
  const d = 'M51 7 Q101 7 101 70 Z M30 34 L40 34 C1 2 3 4 5 6 Z';
  const sub = parsePath(d);
  assert.equal(sub.length, 2);
  assert.deepEqual(sub[1].segments.map((s) => s.type), ['move', 'line', 'cubic', 'close']);
  assert.equal(sub.map((s) => serializeSegments(s.segments)).join(' '), d);
  assert.deepEqual(parsePath('M92 22 Q55 -2 25 17 Z')[0].segments[1], { type: 'quadratic', cx: 55, cy: -2, x: 25, y: 17 });
});

test('parsePath rejects unsupported input instead of approximating', () => {
  for (const [d, code] of [
    ['M0 0 l10 10 Z', 'PATH_UNSUPPORTED_COMMAND'],
    ['M0 0 A1 1 0 0 1 5 5', 'PATH_UNSUPPORTED_COMMAND'],
    ['M0 0 L1 1 2 2', 'PATH_IMPLICIT_COMMAND'],
    ['L1 1', 'PATH_NO_MOVE'],
    ['M0 0 L1', 'PATH_ARITY'],
    ['M0 0 Z L1 1', 'PATH_DRAW_AFTER_CLOSE'],
    ['M0 0 #', 'PATH_UNSUPPORTED_TOKEN'],
  ]) {
    assert.throws(() => parsePath(d), (e) => e instanceof PathParseError && e.code === code, d);
  }
});

test('segmentBounds includes quadratic extrema analytically', () => {
  const [{ segments }] = parsePath('M0 0 Q50 -20 100 0 Z');
  const b = segmentBounds(segments);
  assert.equal(b.minY, -10); // apex of the quadratic at t=0.5
  assert.deepEqual([b.minX, b.maxX, b.maxY], [0, 100, 0]);
});

test('signedArea is exact for polygons and matches dense flattening for curves', () => {
  const [{ segments: sq }] = parsePath('M0 0 L10 0 L10 10 L0 10 Z');
  assert.equal(signedArea(sq), 100);
  const [{ segments: curve }] = parsePath('M0 0 Q50 80 100 0 C120 -30 20 -60 0 0 Z');
  // Flatten densely and compare with shoelace.
  const pts = [];
  let p = [0, 0];
  for (const s of curve) {
    if (s.type === 'move') { pts.push([s.x, s.y]); p = [s.x, s.y]; continue; }
    if (s.type === 'close') continue;
    for (let i = 1; i <= 4000; i++) {
      const t = i / 4000, u = 1 - t;
      if (s.type === 'quadratic') pts.push([u * u * p[0] + 2 * u * t * s.cx + t * t * s.x, u * u * p[1] + 2 * u * t * s.cy + t * t * s.y]);
      else pts.push([u ** 3 * p[0] + 3 * u * u * t * s.c1x + 3 * u * t * t * s.c2x + t ** 3 * s.x, u ** 3 * p[1] + 3 * u * u * t * s.c1y + 3 * u * t * t * s.c2y + t ** 3 * s.y]);
    }
    p = [s.x, s.y];
  }
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % pts.length]; a += (x0 * y1 - x1 * y0) / 2; }
  assert.ok(Math.abs(a - signedArea(curve)) < 0.05, `${a} vs ${signedArea(curve)}`);
});
