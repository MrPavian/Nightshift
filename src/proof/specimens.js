// Proof specimens and neutral layout (Ticket 0.7A-T06).
//
// A specimen is one fixture (glyph, pair or word) resolved against the
// registry: which variant fills each slot, whether it can be rendered, and
// where it sits. Layout is deliberately naive (fixed gap between visible
// bounds): no relationship solver exists yet, so pair/word sheets show raw
// adjacency, not designed spacing.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { validateGlyphGeometry } from '../glyph/validate-geometry.js';
import { buildRenderModel, RenderError } from '../render/render-model.js';
import { glyphId as toGlyphId } from '../glyph/ids.js';

export const LAYOUT_VERSION = 'neutral-naive-layout/1.0.0';
export const NAIVE_GAP = 12; // legacy units between visible bounds; a layout setting, not designed spacing

/**
 * Resolve every distinct character once: validation report + render model or refusal.
 * @returns {Map<string, {glyph, report, model|null, status, reason|null}>}
 */
export function resolveGlyphs(registry, profile, chars) {
  const out = new Map();
  for (const ch of [...new Set(chars)]) {
    const glyph = registry.get(toGlyphId(ch));
    const report = validateGlyphGeometry(glyph, profile);
    let model = null, status, reason = null;
    try {
      model = buildRenderModel(glyph, report);
      status = glyph.maturity === 'provisional' ? 'rendered-provisional' : 'rendered';
    } catch (e) {
      if (!(e instanceof RenderError)) throw e;
      status = 'missing';
      reason = e.code;
    }
    out.set(ch, { glyph, report, model, status, reason });
  }
  return out;
}

/** Coverage per the proof-sheet fixture contract. */
export function coverageOf(slots) {
  return slots.every((s) => s.maturity !== 'provisional') ? 'authored-subset' : 'partial-provisional-coverage';
}

/**
 * Build a specimen for a fixture text.
 * @param {{fixtureId:string, text:string, family:string}} fixture
 */
export function buildSpecimen(fixture, resolved, renderProfileId) {
  let cursor = 0;
  const slots = [...fixture.text].map((ch, index) => {
    const r = resolved.get(ch);
    const v = r.glyph.variants[0];
    const b = r.glyph.baseMetrics.visibleBounds;
    const dx = cursor - b.minX;
    cursor += b.maxX - b.minX + NAIVE_GAP;
    return {
      index,
      character: ch,
      glyphId: r.glyph.glyphId,
      variantId: v.variantId,
      revision: r.glyph.revision,
      maturity: r.glyph.maturity,
      geometryHash: v.geometryHash,
      status: r.status,
      reason: r.reason,
      hardChecksPassed: r.report.hardChecksPassed,
      transform: { translateX: dx, translateY: 0 },
    };
  });
  const identity = {
    fixtureId: fixture.fixtureId,
    text: fixture.text,
    family: fixture.family,
    layout: LAYOUT_VERSION,
    renderProfile: renderProfileId,
    slots: slots.map(({ character, variantId, revision, geometryHash, transform }) => ({ character, variantId, revision, geometryHash, transform })),
  };
  return {
    specimenId: `spec.${fixture.fixtureId}.${sha256Hex(stableStringify(identity)).slice(0, 12)}`,
    fixtureId: fixture.fixtureId,
    family: fixture.family,
    text: fixture.text,
    coverage: coverageOf(slots),
    layout: { version: LAYOUT_VERSION, gap: NAIVE_GAP, note: 'Naive fixed gap between visible bounds. No relationship solver; not designed spacing.' },
    width: cursor - NAIVE_GAP,
    slots,
    missingSlots: slots.filter((s) => s.status === 'missing').map((s) => ({ character: s.character, reason: s.reason })),
  };
}
