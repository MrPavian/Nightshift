/**
 * Legacy SVG path import/export for the v0.6 command vocabulary.
 *
 * Only absolute M, L, Q, Z occur in the v0.6 glyph data. Anything else is rejected with an
 * error rather than approximated. Formatting reproduces the v0.6 string style exactly, so
 * parse → format is a byte-exact round trip for every imported glyph (tested).
 */
import type { SegmentId, VectorSegment } from '../schema/types.ts';

/** A segment before stable IDs are assigned (distributive Omit over the union). */
export type RawSegment = VectorSegment extends infer S ? (S extends VectorSegment ? Omit<S, 'id'> : never) : never;

export interface ParsedSubpath {
  segments: RawSegment[];
}

const TOKEN = /([A-Za-z])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;

export function parseLegacyPath(d: string): ParsedSubpath[] {
  const tokens: (string | number)[] = [];
  for (const m of d.matchAll(TOKEN)) tokens.push(m[1] !== undefined ? m[1] : Number(m[2]));
  // Reject any character outside the tokens and whitespace/comma separators.
  const residue = d.replace(TOKEN, '').replace(/[\s,]/g, '');
  if (residue) throw new Error(`path: unexpected characters "${residue}"`);

  const out: ParsedSubpath[] = [];
  let cur: ParsedSubpath | null = null;
  let i = 0;
  const num = (): number => {
    const t = tokens[i++];
    if (typeof t !== 'number') throw new Error(`path: expected number at token ${i - 1}, got ${String(t)}`);
    return t;
  };
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (typeof cmd !== 'string') throw new Error(`path: implicit command repetition is not supported (token ${i - 1})`);
    switch (cmd) {
      case 'M': {
        if (cur && cur.segments.at(-1)?.type !== 'close') throw new Error('path: subpath not closed before M');
        const next: ParsedSubpath = { segments: [{ type: 'move', x: num(), y: num() }] };
        out.push(next);
        cur = next;
        break;
      }
      case 'L':
        if (!cur) throw new Error('path: L before M');
        cur.segments.push({ type: 'line', x: num(), y: num() });
        break;
      case 'Q': {
        if (!cur) throw new Error('path: Q before M');
        const cx = num(), cy = num(), x = num(), y = num();
        cur.segments.push({ type: 'quadratic', cx, cy, x, y });
        break;
      }
      case 'Z':
        if (!cur) throw new Error('path: Z before M');
        cur.segments.push({ type: 'close' });
        break;
      default:
        throw new Error(`path: unsupported command "${cmd}" (legacy importer accepts absolute M/L/Q/Z only)`);
    }
  }
  if (cur && cur.segments.at(-1)?.type !== 'close') throw new Error('path: final subpath not closed');
  return out;
}

export function assignSegmentIds(contourId: string, segs: readonly RawSegment[]): VectorSegment[] {
  return segs.map((s, k) => ({ id: `${contourId}.s${k}` as SegmentId, ...s }) as VectorSegment);
}

const n = (v: number): string => String(v);

export function formatSegments(segs: readonly VectorSegment[]): string {
  return segs
    .map((s) => {
      switch (s.type) {
        case 'move':
          return `M${n(s.x)} ${n(s.y)}`;
        case 'line':
          return `L${n(s.x)} ${n(s.y)}`;
        case 'quadratic':
          return `Q${n(s.cx)} ${n(s.cy)} ${n(s.x)} ${n(s.y)}`;
        case 'cubic':
          return `C${n(s.c1x)} ${n(s.c1y)} ${n(s.c2x)} ${n(s.c2y)} ${n(s.x)} ${n(s.y)}`;
        case 'close':
          return 'Z';
      }
    })
    .join(' ');
}
