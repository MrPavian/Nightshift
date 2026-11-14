/**
 * Strict parser for the glyph data blocks in prototypes/nightshift_art_engine_v06.html.
 * Pure function apart from hashing: no file system access. Node-only (node:crypto); not part of src/core.
 */
import { createHash } from 'node:crypto';

export interface V06Extraction {
  sourcePath: string;
  sourceSha256: string;
  /** `M` map: authored contour records `[outer, inner[]]`. */
  custom: Record<string, { outer: string; inner: string[] }>;
  /** `F` map: provisional single-string bases (may contain several subpaths). */
  provisional: Record<string, string>;
}

const EXPECTED_CUSTOM = ['A', 'B', 'G', 'R', 'S'];

function block(html: string, start: string, end: string): string {
  const i = html.indexOf(start);
  if (i < 0) throw new Error(`v06 extract: marker not found: ${start}`);
  const j = html.indexOf(end, i + start.length);
  if (j < 0) throw new Error(`v06 extract: end marker not found after ${start}`);
  return html.slice(i + start.length, j);
}

export function extractV06(html: string, sourcePath = 'prototypes/nightshift_art_engine_v06.html'): V06Extraction {
  const sourceSha256 = createHash('sha256').update(html, 'utf8').digest('hex');

  // const M={ A:['outer',['inner',...]], ... };
  const mBody = block(html, 'const M={', '\n};');
  const custom: V06Extraction['custom'] = {};
  const mLine = /^([A-Z]):\['([^']*)',\[((?:'[^']*'(?:,'[^']*')*)?)\]\],?$/;
  for (const raw of mBody.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const m = mLine.exec(line);
    if (!m) throw new Error(`v06 extract: unrecognised M line: ${line.slice(0, 60)}`);
    const [, ch, outer, innerList] = m as unknown as [string, string, string, string | undefined];
    const inner = innerList ? [...innerList.matchAll(/'([^']*)'/g)].map((x) => x[1] as string) : [];
    custom[ch] = { outer, inner };
  }
  const got = Object.keys(custom).sort().join('');
  if (got !== EXPECTED_CUSTOM.join('')) throw new Error(`v06 extract: expected custom ${EXPECTED_CUSTOM.join('')}, got ${got}`);

  // const F={ C:"...", ..., Z:"..."};
  const fBody = block(html, 'const F={', '};');
  const provisional: Record<string, string> = {};
  const fLine = /^([A-Z]):"([^"]*)",?$/;
  for (const raw of fBody.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const m = fLine.exec(line);
    if (!m) throw new Error(`v06 extract: unrecognised F line: ${line.slice(0, 60)}`);
    provisional[m[1] as string] = m[2] as string;
  }

  const all = new Set([...Object.keys(custom), ...Object.keys(provisional)]);
  for (const ch of Object.keys(custom)) {
    if (ch in provisional) throw new Error(`v06 extract: ${ch} present in both M and F`);
  }
  if (all.size !== 26) throw new Error(`v06 extract: expected 26 letters across M and F, got ${all.size}`);

  return { sourcePath, sourceSha256, custom, provisional };
}
