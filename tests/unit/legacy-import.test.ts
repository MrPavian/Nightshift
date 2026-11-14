import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { extractV06 } from '../../tools/v06-extract.ts';
import { V06_SNAPSHOT } from '../../src/core/legacy/v06-snapshot.ts';
import { ALPHABET, AUTHORED, glyphIdOf, importV06 } from '../../src/core/legacy/import.ts';
import { formatSegments, parseLegacyPath } from '../../src/core/geometry/path.ts';
import { GlyphRegistry } from '../../src/core/registry/registry.ts';

const PROTOTYPE = 'prototypes/nightshift_art_engine_v06.html';

describe('v0.6 snapshot', () => {
  it('matches a fresh extraction from the untouched prototype file', () => {
    const fresh = extractV06(readFileSync(PROTOTYPE, 'utf8'));
    expect(fresh.sourceSha256).toBe(V06_SNAPSHOT.sourceSha256);
    expect(fresh.custom).toEqual(V06_SNAPSHOT.custom);
    expect(fresh.provisional).toEqual(V06_SNAPSHOT.provisional);
  });

  it('records the known prototype hash', () => {
    expect(V06_SNAPSHOT.sourceSha256).toBe('2b5a6be891a9b98b8c6d930c57ca79b4f183bf373713a9cd93d4514bf4a5bc6d');
  });

  it('has the expected inner contour counts (A1 B2 G0 R1 S0)', () => {
    const counts = Object.fromEntries(AUTHORED.map((c) => [c, V06_SNAPSHOT.custom[c].inner.length]));
    expect(counts).toEqual({ A: 1, B: 2, G: 0, R: 1, S: 0 });
  });

  it('fails loudly on an altered source layout', () => {
    expect(() => extractV06('<script>const M={\nA:oops\n};const F={};</script>')).toThrow(/unrecognised M line/);
  });
});

describe('legacy path import', () => {
  it('round-trips every imported glyph path byte-exactly', () => {
    for (const g of importV06()) {
      const v = g.variants[0]!;
      const rebuilt: string[] = [];
      if (g.legacySource.map === 'M') {
        for (const c of v.geometry.contours) rebuilt.push(formatSegments(c.segments));
      } else {
        rebuilt.push(v.geometry.contours.map((c) => formatSegments(c.segments)).join(' '));
      }
      expect(rebuilt, g.character).toEqual(g.legacySource.paths);
    }
  });

  it('rejects commands outside the legacy vocabulary instead of approximating', () => {
    expect(() => parseLegacyPath('M0 0 C1 1 2 2 3 3 Z')).toThrow(/unsupported command "C"/);
    expect(() => parseLegacyPath('M0 0 l1 1 Z')).toThrow(/unsupported command "l"/);
    expect(() => parseLegacyPath('M0 0 L1 1')).toThrow(/not closed/);
  });

  it('is deterministic', () => {
    expect(JSON.stringify(importV06())).toBe(JSON.stringify(importV06()));
  });
});

describe('maturity and topology declarations', () => {
  const reg = GlyphRegistry.fromLegacyV06();

  it('covers A–Z with 5 authored-contour masters and 21 provisional bases', () => {
    expect(reg.ids()).toEqual(ALPHABET.map(glyphIdOf));
    const inv = reg.maturityInventory();
    for (const ch of ALPHABET) {
      expect(inv[ch], ch).toBe((AUTHORED as readonly string[]).includes(ch) ? 'authored-contour' : 'provisional');
    }
  });

  it('creates only master variants for A/B/G/R/S', () => {
    for (const ch of AUTHORED) {
      expect(reg.get(glyphIdOf(ch)).variants.map((v) => v.variantId)).toEqual([`${ch.toLowerCase()}.master`]);
    }
  });

  it('declares counters A1 B2 R1, none for G and S, and leaves G aperture unresolved', () => {
    const t = (ch: string) => reg.get(glyphIdOf(ch)).semanticGraph.topology;
    expect(t('A').counterIds).toHaveLength(1);
    expect(t('B').counterIds).toHaveLength(2);
    expect(t('R').counterIds).toHaveLength(1);
    expect(t('S').counterIds).toHaveLength(0);
    expect(t('S').apertureStatus).toBe('none-declared');
    expect(t('G').counterIds).toHaveLength(0);
    expect(t('G').apertureIds).toHaveLength(0);
    expect(t('G').apertureStatus).toBe('interpretation-required');
  });

  it('invents no calibrated metrics', () => {
    for (const g of reg.all()) {
      expect(g.baseMetrics.calibrated).toBe(false);
      expect(g.baseMetrics.advanceWidth).toBeNull();
      expect(g.coordinateSystem.baselineY).toBeNull();
    }
  });

  it('records provenance with the source hash on every glyph', () => {
    for (const g of reg.all()) {
      expect(g.provenance[0]?.kind).toBe('legacy-prototype');
      expect(g.provenance[0]?.sourceSha256).toBe(V06_SNAPSHOT.sourceSha256);
    }
  });

  it('records winding for provisional subpaths without inferring counters', () => {
    const o = reg.variant(glyphIdOf('O')).geometry.contours;
    expect(o).toHaveLength(2);
    expect(o[1]!.role).toBe('unclassified');
    expect(o[0]!.winding).not.toBe('unspecified');
    expect(reg.get(glyphIdOf('O')).semanticGraph.topology.counterIds).toEqual([]);
  });

  it('freezes registry records', () => {
    expect(Object.isFrozen(reg.get(glyphIdOf('A')).variants[0]!.geometry.contours[0]!.segments[0])).toBe(true);
  });
});
