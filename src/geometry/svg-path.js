// Minimal, lossless SVG path parser/serializer for canonical glyph geometry.
//
// Supported: absolute M, L, Q, C, Z (the full command set used by the v0.6
// legacy glyph paths). Anything else is rejected with a structured error
// rather than approximated, so imports never silently change geometry.
//
// Coordinates are kept exactly as written (JS numbers parsed from the source
// tokens). Serialization uses the same compact "M8 132 L8 42 ... Z" form as
// the legacy source, so legacy strings round-trip byte-for-byte.

const TOKEN_RE = /([MLQCZmlqczHhVvSsTtAa])|(-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/g;
const ARITY = { M: 2, L: 2, Q: 4, C: 6, Z: 0 };

export class PathParseError extends Error {
  constructor(code, message, detail = {}) {
    super(message);
    this.code = code;
    this.detail = detail;
  }
}

/**
 * Parse a path string into subpaths of typed segments.
 * @param {string} d
 * @returns {{segments: Array<object>}[]} one entry per subpath (split at M)
 */
export function parsePath(d) {
  const tokens = [];
  let m;
  TOKEN_RE.lastIndex = 0;
  const stripped = d.replace(TOKEN_RE, '').replace(/[\s,]/g, '');
  if (stripped.length) {
    throw new PathParseError('PATH_UNSUPPORTED_TOKEN', `Unsupported characters in path: "${stripped}"`);
  }
  while ((m = TOKEN_RE.exec(d))) tokens.push(m[1] ?? Number(m[2]));

  const subpaths = [];
  let current = null;
  let i = 0;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (typeof cmd !== 'string') {
      throw new PathParseError('PATH_IMPLICIT_COMMAND', 'Implicit repeated commands are not supported', { index: i - 1 });
    }
    if (!(cmd in ARITY)) {
      throw new PathParseError('PATH_UNSUPPORTED_COMMAND', `Unsupported path command "${cmd}"`, { command: cmd });
    }
    const n = ARITY[cmd];
    const args = tokens.slice(i, i + n);
    if (args.length !== n || args.some((a) => typeof a !== 'number')) {
      throw new PathParseError('PATH_ARITY', `Command ${cmd} expects ${n} numbers`, { command: cmd, index: i - 1 });
    }
    i += n;
    if (cmd === 'M') {
      current = { segments: [{ type: 'move', x: args[0], y: args[1] }] };
      subpaths.push(current);
      continue;
    }
    if (!current) throw new PathParseError('PATH_NO_MOVE', 'Path must begin with M');
    if (current.segments.at(-1).type === 'close') {
      throw new PathParseError('PATH_DRAW_AFTER_CLOSE', 'Drawing after Z without a new M is not supported');
    }
    if (cmd === 'L') current.segments.push({ type: 'line', x: args[0], y: args[1] });
    else if (cmd === 'Q') current.segments.push({ type: 'quadratic', cx: args[0], cy: args[1], x: args[2], y: args[3] });
    else if (cmd === 'C') current.segments.push({ type: 'cubic', c1x: args[0], c1y: args[1], c2x: args[2], c2y: args[3], x: args[4], y: args[5] });
    else if (cmd === 'Z') current.segments.push({ type: 'close' });
  }
  return subpaths;
}

/** Serialize one subpath's segments back to path data. */
export function serializeSegments(segments) {
  return segments
    .map((s) => {
      switch (s.type) {
        case 'move': return `M${s.x} ${s.y}`;
        case 'line': return `L${s.x} ${s.y}`;
        case 'quadratic': return `Q${s.cx} ${s.cy} ${s.x} ${s.y}`;
        case 'cubic': return `C${s.c1x} ${s.c1y} ${s.c2x} ${s.c2y} ${s.x} ${s.y}`;
        case 'close': return 'Z';
        default: throw new PathParseError('PATH_UNKNOWN_SEGMENT', `Unknown segment type ${s.type}`);
      }
    })
    .join(' ');
}

/**
 * Exact axis-aligned bounds of a subpath, including quadratic/cubic extrema.
 * Returned values are analytic (no flattening), so no approximation error.
 */
export function segmentBounds(segments) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const add = (x, y) => {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  };
  let px = 0, py = 0;
  for (const s of segments) {
    if (s.type === 'move' || s.type === 'line') add(s.x, s.y);
    else if (s.type === 'quadratic') {
      add(s.x, s.y);
      for (const t of quadExtrema(px, s.cx, s.x)) add(quadAt(px, s.cx, s.x, t), quadAt(py, s.cy, s.y, t));
      for (const t of quadExtrema(py, s.cy, s.y)) add(quadAt(px, s.cx, s.x, t), quadAt(py, s.cy, s.y, t));
    } else if (s.type === 'cubic') {
      add(s.x, s.y);
      for (const t of [...cubicExtrema(px, s.c1x, s.c2x, s.x), ...cubicExtrema(py, s.c1y, s.c2y, s.y)]) {
        add(cubicAt(px, s.c1x, s.c2x, s.x, t), cubicAt(py, s.c1y, s.c2y, s.y, t));
      }
    }
    if (s.type !== 'close') { px = s.x; py = s.y; }
  }
  return { minX, minY, maxX, maxY };
}

const quadAt = (a, b, c, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
function quadExtrema(a, b, c) {
  const den = a - 2 * b + c;
  if (den === 0) return [];
  const t = (a - b) / den;
  return t > 0 && t < 1 ? [t] : [];
}
const cubicAt = (a, b, c, d, t) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};
function cubicExtrema(a, b, c, d) {
  const qa = -a + 3 * b - 3 * c + d, qb = 2 * (a - 2 * b + c), qc = b - a;
  const ts = [];
  if (Math.abs(qa) < 1e-12) { if (qb !== 0) ts.push(-qc / qb); }
  else {
    const disc = qb * qb - 4 * qa * qc;
    if (disc >= 0) { const r = Math.sqrt(disc); ts.push((-qb + r) / (2 * qa), (-qb - r) / (2 * qa)); }
  }
  return ts.filter((t) => t > 0 && t < 1);
}
