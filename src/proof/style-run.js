// Style Library Phase A proof run: neutral, monochrome comparison of the style grammars the
// C03 resolver actually implements (Neutral, Straight, Bubble, Blockbuster = Straight + Block-fit).
// Wildstyle is requested only as a diagnostic: its interlocking step is skipped (C04 missing) and
// it is not drawn. Brief: docs/lettering/style-library/CLAUDE_TASK_PHASE_A_PROOF_PLATES_01.md.
//
// Deterministic: identical inputs give identical run IDs, plates and hashes. No timestamps.
// Every glyph is drawn as a solid front-face silhouette (one fill colour, counters as real holes);
// no outline, depth, highlight, texture, gradient or decoration. Nothing here changes a master or
// a maturity value; the review template is blank.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { validateGlyphGeometry, VALIDATOR_VERSION } from '../glyph/validate-geometry.js';
import { buildRenderModel, RENDER_MODEL_VERSION } from '../render/render-model.js';
import { glyphGroup } from '../render/svg.js';
import { resolveStyle, RESOLVER_VERSION } from '../style/resolver.js';
import { layoutWord, glyphPolygons } from '../style/render.js';
import { bounds } from '../style/polygon.js';
import { REVIEW_SCHEMA_VERSION, DECISIONS, blankReview } from './review.js';

export const STYLE_RUN_SCHEMA_VERSION = '1.0';
export const STYLE_PLATES_VERSION = 'style-proof-plates/1.0.0';
export const RUN_LABEL = 'style-library-phase-a-01';
export const PRIMARY_GLYPHS = ['A', 'B', 'G', 'R', 'S'];
/** Implemented core grammars, in plate column order. */
export const COMPARED_PRESETS = ['neutral', 'straight', 'bubble', 'blockbuster'];
/** Requested only to record its status; never drawn. */
export const DIAGNOSTIC_PRESETS = ['wildstyle'];
export const INK = '#111111';
export const RENDER_PROFILE = {
  id: 'style-neutral-monochrome/1.0.0',
  background: '#f2efe6',
  ink: INK,
  finish: { outline: false, inline: false, depth: false, highlights: false, texture: false, gradient: false, drips: false },
  projection: 'orthographic',
  scale: 'one uniform scale per plate for all styles (native glyph units, not normalised per glyph)',
  sizes: { full: '0.9 × native glyph units', pairs: '0.6 ×', words: '0.5 ×', thumbnail: '0.18 ×' },
};

const f2 = (n) => Math.round(n * 100) / 100;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const MARK = { applied: '✓ angewendet', unchanged: '= unverändert', partial: '½ teilweise', fallback: '↺ Rückfall' };

/**
 * @param {{registry, profile, styleContract, fixturesContract}} inputs
 * @returns {{manifest:object, files:Record<string,string>}} files keyed by path relative to the run directory
 */
export function buildStyleProofRun({ registry, profile, styleContract, fixturesContract }) {
  const contract = styleContract;
  const presets = [...COMPARED_PRESETS, ...DIAGNOSTIC_PRESETS];
  const primarySet = new Set(PRIMARY_GLYPHS);
  const pairs = fixturesContract.fixtures.pairs.filter((p) => [...p.text].every((c) => primarySet.has(c)));
  const words = [...fixturesContract.fixtures.words].sort((a, b) => (a.text === 'ABRA' ? -1 : b.text === 'ABRA' ? 1 : 0));
  const chars = [...new Set([...PRIMARY_GLYPHS, ...pairs.flatMap((p) => [...p.text]), ...words.flatMap((w) => [...w.text])])].sort();

  // ---- resolve every (glyph, preset) once ----
  const res = new Map();
  const key = (p, c) => `${p}:${c}`;
  for (const c of chars) {
    const g = registry.getByChar(c);
    if (!g) throw new Error(`Glyph ${c} missing from the registry`);
    for (const p of presets) {
      const r = resolveStyle(g, p, { contract, profile });
      const record = r.derived ?? g;
      const report = validateGlyphGeometry(record, profile);
      res.set(key(p, c), { glyph: g, r, record, report, model: buildRenderModel(record, report) });
    }
  }
  const glyphInfo = (c) => {
    const g = registry.getByChar(c);
    return { character: c, glyphId: g.glyphId, maturity: g.maturity, source: g.provenance?.[0]?.kind ?? 'unknown', masterGeometryHash: g.variants[0].geometryHash };
  };

  const sourceRevision = sha256Hex(registry.serialize());
  const engineVersions = {
    glyphLibrary: [registry.meta.importer, ...(registry.meta.authored ?? []), registry.meta.semanticOverlay].join('; '),
    styleResolver: `${RESOLVER_VERSION}; ${contract.contractId}@${contract.version} (${contract.status})`,
    geometryValidator: `${VALIDATOR_VERSION}; ${profile.profileId}@${profile.version}`,
    renderer: `${RENDER_MODEL_VERSION}; ${STYLE_PLATES_VERSION}`,
    relationshipSolver: 'none — C04 not implemented',
  };
  const fixtureIds = [...PRIMARY_GLYPHS.map((c) => `glyph-${c.toLowerCase()}`), ...pairs.map((p) => p.fixtureId), ...words.map((w) => w.fixtureId)];
  const runIdentity = { schemaVersion: STYLE_RUN_SCHEMA_VERSION, sourceRevision, engineVersions, renderProfile: RENDER_PROFILE, presets, fixtureIds };
  const runId = `run.${RUN_LABEL}.${sha256Hex(stableStringify(runIdentity)).slice(0, 12)}`;

  // ---- specimens ----
  const slot = (p, c, i) => {
    const e = res.get(key(p, c));
    const variant = e.record.variants[0];
    return { index: i, character: c, glyphId: e.glyph.glyphId, variantId: variant.variantId, geometryHash: variant.geometryHash, masterGeometryHash: e.glyph.variants[0].geometryHash, maturity: e.glyph.maturity, derived: Boolean(e.r.derived), resolverStatus: e.r.status, hardChecksPassed: e.report.hardChecksPassed };
  };
  const specimens = [];
  const addSpec = (family, fixtureId, text, p, plates) => {
    const slots = [...text].map((c, i) => slot(p, c, i));
    const id = `spec.${fixtureId}.${p}.${sha256Hex(stableStringify({ fixtureId, p, hashes: slots.map((s) => s.geometryHash), profile: RENDER_PROFILE.id })).slice(0, 12)}`;
    const nonPrimary = [...text].filter((c) => !primarySet.has(c));
    specimens.push({ specimenId: id, family, fixtureId, text, preset: p, request: res.get(key(p, text[0])).r.request, plates, slots, coverage: nonPrimary.length ? `includes C02 masters ${[...new Set(nonPrimary)].join('')} (authored-contour, owner design review pending)` : 'primary review set A/B/G/R/S (authored-contour)' });
  };
  for (const c of PRIMARY_GLYPHS) for (const p of COMPARED_PRESETS) addSpec('glyph-comparison', `glyph-${c.toLowerCase()}`, c, p, ['plates/glyph-comparison.svg', 'plates/thumbnails.svg']);
  for (const f of pairs) for (const p of COMPARED_PRESETS) addSpec('pair-context', f.fixtureId, f.text, p, ['plates/pair-context.svg']);
  for (const f of words) for (const p of COMPARED_PRESETS) addSpec('word-context', f.fixtureId, f.text, p, ['plates/word-context.svg']);

  // ---- plates ----
  const label = (p) => contract.presets[p].labelDe;
  const axes = (p) => `${contract.presets[p].letterform} + ${contract.presets[p].composition}`;
  const header = (title, sub, W) => `<rect width="100%" height="100%" fill="${RENDER_PROFILE.background}"/><text x="20" y="32" font-size="19" font-weight="700">${esc(title)}</text><text x="20" y="52" font-size="11" fill="#555">${esc(sub)}</text><text x="${W - 20}" y="32" font-size="10" fill="#777" text-anchor="end">${esc(runId)}</text>`;
  const svgOpen = (W, H) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="system-ui, sans-serif" data-run-id="${esc(runId)}">`;
  const glyphAt = (p, c, tx, ty, s, rot = null) => glyphGroup(res.get(key(p, c)).model, { fill: INK, transform: `translate(${f2(tx)} ${f2(ty)}) scale(${s})${rot ? ` rotate(${rot.deg} ${f2(rot.cx)} ${f2(rot.cy)})` : ''}` });
  const FOOTER = [
    'Blockbuster = Straight-Buchstabenform + Block-fit-Komposition (kein eigenes Alphabet). Bubble = Bubble-Form + Bounce (Bounce wirkt nur im Wort).',
    'Wildstyle (Studie): angefragt, aber nicht gezeigt. Die Verschränkung braucht den Beziehungslöser C04, der fehlt;',
    'der Resolver meldet den Schritt als übersprungen. Nichts auf diesem Bogen ist verschränkt.',
    'Nur Silhouetten, ohne Effekte. Parameter unkalibriert. Automatischer Beweis, keine Freigabe: menschliche Sichtung steht aus.',
  ];
  const FOOTER_H = 20 + FOOTER.length * 16, MIN_W = 940;
  const footer = (y) => FOOTER.map((t, i) => `<text x="20" y="${y + i * 16}" font-size="11" fill="#333">${esc(t)}</text>`).join('');
  // One frame for every drawn glyph (all compared styles), so cells never clip an inflated shape.
  // Measured from the actual (derived) contours: baseMetrics of a derived record still describe the master.
  const all = [...res.entries()].filter(([k]) => COMPARED_PRESETS.includes(k.split(':')[0])).map(([, e]) => bounds(glyphPolygons(e.record).map((q) => q.poly)));
  const G = { minX: Math.min(...all.map((b) => b.x0)), minY: Math.min(...all.map((b) => b.y0)), maxX: Math.max(...all.map((b) => b.x1)), maxY: Math.max(...all.map((b) => b.y1)) };
  const gw = G.maxX - G.minX, gh = G.maxY - G.minY;

  // Glyph comparison (full) and thumbnails share one layout function.
  const comparisonPlate = (s, title) => {
    const pad = 12, cellW = Math.max(Math.ceil(gw * s) + 2 * pad, 150), glyphH = Math.ceil(gh * s), cellH = glyphH + 30, left = 150, top = 96;
    const W = Math.max(left + COMPARED_PRESETS.length * cellW + 20, MIN_W), H = top + PRIMARY_GLYPHS.length * cellH + FOOTER_H + 10;
    let svg = svgOpen(W, H) + header(title, `Einheitlicher Maßstab ${s} × Glyph-Einheiten für alle Stile · ${RESOLVER_VERSION} · Zeichen: ${Object.values(MARK).join(', ')}`, W);
    COMPARED_PRESETS.forEach((p, ci) => { svg += `<text x="${left + ci * cellW + pad}" y="${top - 22}" font-size="13" font-weight="700">${esc(label(p))}</text><text x="${left + ci * cellW + pad}" y="${top - 9}" font-size="9" fill="#666">${esc(axes(p))}</text>`; });
    PRIMARY_GLYPHS.forEach((c, ri) => {
      const y = top + ri * cellH, gi = glyphInfo(c);
      svg += `<text x="20" y="${y + glyphH / 2 + 4}" font-size="${s < 0.5 ? 13 : 22}" font-weight="700">${c}</text><text x="20" y="${y + glyphH / 2 + 18}" font-size="9" fill="#666">${esc(gi.maturity)}</text>`;
      COMPARED_PRESETS.forEach((p, ci) => {
        const x = left + ci * cellW, e = res.get(key(p, c));
        svg += glyphAt(p, c, x + pad - G.minX * s, y - G.minY * s, s);
        svg += `<text x="${x + pad}" y="${y + glyphH + 14}" font-size="9" fill="#555">${esc(MARK[e.r.status])}${e.report.hardChecksPassed ? '' : ' · Prüfung FEHLGESCHLAGEN'}</text>`;
      });
    });
    return svg + footer(H - FOOTER_H + 14) + '</svg>';
  };
  const files = {};
  files['plates/glyph-comparison.svg'] = comparisonPlate(0.9, 'Stil-Vergleich Phase A: A/B/G/R/S, monochrom');
  files['plates/thumbnails.svg'] = comparisonPlate(0.18, 'Stil-Vergleich Phase A: Thumbnail-Größe (0,18 ×)');

  // Pairs and words: same style columns, layout from the resolver's word composition.
  const contextPlate = (fixtures, s, title, note) => {
    const layouts = new Map();
    let maxW = 0;
    for (const f of fixtures) for (const p of COMPARED_PRESETS) {
      const recs = [...f.text].map((c) => res.get(key(p, c)).record);
      const comp = contract.presets[p].composition === 'bounce' ? 'bounce' : 'neutral';
      const items = layoutWord(recs, comp, contract.operations['composition.bounce'].params);
      layouts.set(`${f.fixtureId}:${p}`, items);
      maxW = Math.max(maxW, ...items.map((it) => it.x + it.box.x1));
    }
    const pad = 14, slack = 12, labelW = 150, top = 96, glyphH = Math.ceil((gh + 2 * slack) * s), lineH = glyphH + 14;
    const colW = Math.ceil((maxW - G.minX + slack) * s) + 2 * pad;
    const W = Math.max(labelW + COMPARED_PRESETS.length * colW + 20, MIN_W), H = top + fixtures.length * lineH + FOOTER_H + 10;
    let svg = svgOpen(W, H) + header(title, note, W);
    COMPARED_PRESETS.forEach((p, ci) => { svg += `<text x="${labelW + ci * colW + pad}" y="${top - 22}" font-size="13" font-weight="700">${esc(label(p))}</text><text x="${labelW + ci * colW + pad}" y="${top - 9}" font-size="9" fill="#666">${esc(axes(p))}</text>`; });
    fixtures.forEach((f, ri) => {
      const y = top + ri * lineH, extra = [...f.text].filter((c) => !primarySet.has(c));
      svg += `<text x="20" y="${y + glyphH / 2 + 2}" font-size="14" font-weight="700">${esc(f.text)}</text><text x="20" y="${y + glyphH / 2 + 15}" font-size="9" fill="#666">${extra.length ? `mit C02: ${esc([...new Set(extra)].join(''))}` : 'nur A/B/G/R/S'}</text>`;
      COMPARED_PRESETS.forEach((p, ci) => {
        for (const [i, it] of layouts.get(`${f.fixtureId}:${p}`).entries()) {
          const cy = (it.box.y0 + it.box.y1) / 2, cx = (it.box.x0 + it.box.x1) / 2;
          svg += glyphAt(p, f.text[i], labelW + ci * colW + pad + (it.x - G.minX) * s, y + (it.y - G.minY + slack) * s, s, it.rotate ? { deg: it.rotate, cx, cy } : null);
        }
      });
    });
    return svg + footer(H - FOOTER_H + 14) + '</svg>';
  };
  files['plates/pair-context.svg'] = contextPlate(pairs, 0.6, 'Stil-Vergleich Phase A: Paare (nur A/B/G/R/S)', 'Paar-Fixtures aus contracts/proof-sheet-fixtures.v1.json, deren Buchstaben alle zum Prüfsatz A/B/G/R/S gehören. Feste Lücke; keine Verbindungen (C04 fehlt).');
  files['plates/word-context.svg'] = contextPlate(words, 0.5, 'Stil-Vergleich Phase A: Wörter (ABRA zuerst)', 'ABRA ist das Hauptwort (nur A/B/G/R/S). Die übrigen Wörter enthalten C02-Master: ausgearbeitet, Owner-Sichtung offen. Keine Verbindungen (C04 fehlt).');

  // ---- report ----
  // Counter area is measured, not gated: the resolver only checks that the counter count is unchanged.
  const counterArea = (e) => e.report.negativeSpace.counters.filter((x) => x.boundedFace).reduce((sum, x) => sum + x.area, 0);
  const neutralArea = (c) => counterArea(res.get(key('neutral', c)));
  const report = {
    runId,
    resolverVersion: RESOLVER_VERSION,
    contract: `${contract.contractId}@${contract.version}`,
    presets: Object.fromEntries(presets.map((p) => [p, { ...contract.presets[p], drawn: COMPARED_PRESETS.includes(p) }])),
    glyphs: Object.fromEntries(chars.map((c) => [c, {
      ...glyphInfo(c),
      styles: Object.fromEntries(presets.map((p) => {
        const e = res.get(key(p, c));
        return [p, { status: e.r.status, request: e.r.request, operations: e.r.operations, derived: Boolean(e.r.derived), geometryHash: e.record.variants[0].geometryHash, validation: { hardChecksPassed: e.report.hardChecksPassed, counters: e.report.negativeSpace.counters.filter((x) => x.boundedFace).length, counterArea: f2(counterArea(e)), counterAreaVsNeutral: neutralArea(c) ? f2(counterArea(e) / neutralArea(c)) : null, connectedComponents: e.report.topology.connectedComponents } }];
      })),
    }])),
  };
  report.summary = Object.fromEntries(presets.map((p) => [p, Object.fromEntries(['applied', 'unchanged', 'partial', 'fallback'].map((st) => [st, chars.filter((c) => res.get(key(p, c)).r.status === st).length]))]));
  files['report/operations.json'] = stableStringify(report, 2) + '\n';

  // ---- manifest ----
  const fixtureCoverage = [...pairs, ...words].map((f) => ({ fixtureId: f.fixtureId, contractLabel: f.coverage, currentMaturity: [...new Set([...f.text].map((c) => registry.getByChar(c).maturity))] }));
  const manifest = {
    runId,
    schemaVersion: STYLE_RUN_SCHEMA_VERSION,
    brief: 'docs/lettering/style-library/CLAUDE_TASK_PHASE_A_PROOF_PLATES_01.md',
    contracts: ['contracts/style-resolver.v1.json', 'contracts/proof-sheet-fixtures.v1.json'],
    sourceRevision: { kind: 'registry-content-sha256', value: sourceRevision },
    canonicalSnapshotRef: { snapshotId: registry.meta.source, sha256: registry.meta.sourceSha256 },
    engineVersions,
    renderProfile: RENDER_PROFILE,
    presets: { compared: COMPARED_PRESETS, diagnosticOnly: DIAGNOSTIC_PRESETS },
    fixtureIds,
    glyphs: chars.map(glyphInfo),
    coverage: {
      primaryReviewSet: PRIMARY_GLYPHS,
      note: 'Since C02 every uppercase glyph is an authored-contour master; none is provisional. The fixture contract still carries pre-C02 coverage labels; they are recorded here unchanged, next to the current maturity.',
      fixtureContractLabels: fixtureCoverage,
      ownerDesignReview: 'pending for all glyphs (docs/reports/proof/T06/review/ratings.json has no records)',
    },
    specimens,
    limitations: [
      'Only the C03 resolver subset is compared: Neutral, Straight, Bubble, Blockbuster. Parameters are uncalibrated grammar defaults.',
      'Wildstyle is requested only to record that interlocking is skipped (C04 missing); it is not drawn.',
      'Pairs and words use a fixed gap (Bubble: bounce placement). No joins, overlaps by design or relationship solving.',
      'The Creator graffiti engine (src/style/graffiti-engine.js, D-017) builds letters from separate skeletons, not from these masters; it is outside this brief and not on these plates.',
      'Rendering treatments (outline, depth, highlights) are not shown; finish isolation is checked by the tests, not on a plate.',
    ],
    review: {
      status: 'pending',
      schemaVersion: REVIEW_SCHEMA_VERSION,
      records: 'review/ratings.json',
      template: 'review/review-template.json',
      automatedMaturityPromotion: false,
      decisionOptions: DECISIONS,
      scoreOptions: '0–3, cannot-judge or empty per rubric item',
      note: 'Plates are evidence, not approval. Reviews here concern derived, reference-only style geometry and never change the maturity of a master. Reviewers may answer unsure or cannot-assess instead of a verdict. Pairwise tie / neither options belong to the later calibration slice (contracts/visual-calibration.v1.json).',
    },
  };
  files['review/review-template.json'] = stableStringify(specimens.filter((s) => s.family === 'glyph-comparison').map((s) => ({ ...blankReview(manifest, s), preset: s.preset, maturityAtReview: 'derived-reference-only', masterMaturity: s.slots[0].maturity })), 2) + '\n';
  files['review/ratings.json'] = '[]\n';
  files['README.md'] = readme(runId, report);
  manifest.artifactHashes = Object.fromEntries(Object.keys(files).filter((p) => p !== 'review/ratings.json').sort().map((p) => [p, sha256Hex(files[p])]));
  files['manifest.json'] = stableStringify(manifest, 2) + '\n';
  files['checksums.json'] = stableStringify({ runId, 'manifest.json': sha256Hex(files['manifest.json']), ...manifest.artifactHashes }, 2) + '\n';
  return { manifest, report, files };
}

function readme(runId, report) {
  const summary = report.summary;
  const withCounters = Object.values(report.glyphs).filter((g) => g.styles.neutral.validation.counters > 0);
  const areaRows = withCounters.map((g) => `| ${g.character} | ${COMPARED_PRESETS.filter((p) => p !== 'neutral').map((p) => g.styles[p].validation.counterAreaVsNeutral).join(' | ')} |`).join('\n');
  const rows = Object.entries(summary).map(([p, s]) => `| ${p} | ${s.applied} | ${s.unchanged} | ${s.partial} | ${s.fallback} |`).join('\n');
  return `# Style Library — Phase A proof run

Run: \`${runId}\`
Brief: [CLAUDE_TASK_PHASE_A_PROOF_PLATES_01](../../../../lettering/style-library/CLAUDE_TASK_PHASE_A_PROOF_PLATES_01.md)

Neutral, monochrome comparison of the style grammars that the C03 resolver implements today. **This is an automated proof, not an approval. Human review is pending.**

## Plates

| File | Content |
|---|---|
| \`plates/glyph-comparison.svg\` | A/B/G/R/S × Neutral, Straight, Bubble, Blockbuster, one uniform scale |
| \`plates/thumbnails.svg\` | the same grid at 0.18 × |
| \`plates/pair-context.svg\` | pair fixtures whose letters are all in A/B/G/R/S |
| \`plates/word-context.svg\` | ABRA first; the other word fixtures contain C02 masters |
| \`report/operations.json\` | per glyph and style: resolver status, every operation with reason and parameters, geometry hash, validation |
| \`manifest.json\`, \`checksums.json\` | inputs, versions, specimens, artifact hashes |
| \`review/review-template.json\` | blank review records; \`review/ratings.json\` is human-owned and never overwritten |

## Resolver status per style (all glyphs in this run)

| Style | applied | unchanged | partial | fallback |
|---|---:|---:|---:|---:|
${rows}

## Measured: counter area relative to Neutral

The resolver only checks that the *number* of counters stays the same. Their size is measured here, not gated (1 = same area as the neutral master; glyphs without an enclosed counter are left out).

| Glyph | ${COMPARED_PRESETS.filter((p) => p !== 'neutral').join(' | ')} |
|---|${COMPARED_PRESETS.filter((p) => p !== 'neutral').map(() => '---:').join('|')}|
${areaRows}

Wildstyle is *partial* on purpose: its interlocking step is skipped because the relationship solver (C04) is missing. It is recorded in the report but not drawn.

## Rendering rules

Solid black front-face silhouettes on a plain light background; counters are real holes. No outline, inline, depth, highlights, chrome, texture, drips, gradient or marks. All styles share one scale per plate, so authored proportions are kept.

## Limitations

- Only Neutral, Straight, Bubble and Blockbuster (= Straight letterform + Block-fit composition) exist in the resolver. Parameters are uncalibrated.
- No joins or relationship solving; pairs and words use a fixed gap (Bubble: bounce placement).
- All 26 uppercase glyphs are authored-contour masters since C02. The fixture contract still labels some fixtures "partial-provisional-coverage"; the manifest records those labels next to the current maturity.
- The Creator graffiti engine (D-017) uses separate skeletons and is not part of this run.
- Review decisions: pass / fail / needs-revision / unsure / cannot-assess; rubric scores also allow cannot-judge. Pairwise tie / neither comes with the calibration slice.

## Reproduce

\`\`\`bash
npm ci
node tools/proof-style-plates.mjs          # writes this directory
node tools/proof-style-plates.mjs --check  # fails if anything here is stale
\`\`\`
`;
}
