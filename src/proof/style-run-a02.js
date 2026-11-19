// Style Library Phase A-02 proof run: Bubble counter safety and Bounce collision safety, before/after.
// Brief: docs/lettering/style-library/CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01.md (Issue #24).
//
// "Before" reproduces resolver 1.0 behaviour exactly: the counter-safety operation is removed from the
// contract (count-only gate) and Bounce runs with the legacy, unchecked placement. "After" is the current
// resolver and layout. Deterministic; solid monochrome silhouettes only; no review is implied.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { validateGlyphGeometry, VALIDATOR_VERSION } from '../glyph/validate-geometry.js';
import { buildRenderModel, RENDER_MODEL_VERSION } from '../render/render-model.js';
import { glyphGroup } from '../render/svg.js';
import { resolveStyle, RESOLVER_VERSION } from '../style/resolver.js';
import { layoutWordWithReport, glyphPolygons, WORD_LAYOUT_VERSION } from '../style/render.js';
import { negativeSpaceMetrics, NEGATIVE_SPACE_VERSION } from '../style/negative-space.js';
import { bounds } from '../style/polygon.js';

export const A02_SCHEMA_VERSION = '1.0';
export const A02_PLATES_VERSION = 'style-proof-plates-a02/1.0.0';
export const A02_LABEL = 'style-library-phase-a-02';
export const A02_GLYPHS = ['A', 'B', 'G', 'R', 'S'];
export const A02_PAIRS = ['AR', 'BA', 'BR', 'GR', 'RA', 'SA', 'SB', 'GS'];
export const A02_WORDS = ['ABRA'];
export const MATURITY = ['rendered', 'measured-uncalibrated', 'owner-review-required'];
const INK = '#111111', BG = '#f2efe6';
const f2 = (n) => Math.round(n * 100) / 100;
const pct = (r) => `${Math.round(r * 100)} %`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Contract as resolver 1.0 behaved: no counter-safety operation (count-only gate). */
export function legacyContract(contract) {
  const c = structuredClone(contract);
  delete c.operations['letterform.bubble.counter-safety'];
  return c;
}

export function buildPhaseA02Run({ registry, profile, styleContract }) {
  const after = styleContract, before = legacyContract(styleContract);
  const chars = [...new Set([...A02_GLYPHS, ...A02_PAIRS.join(''), ...A02_WORDS.join('')])].sort();
  const bounceParams = after.operations['composition.bounce'].params;

  const R = new Map();
  for (const c of chars) {
    const g = registry.getByChar(c);
    const neutralReport = validateGlyphGeometry(g, profile);
    const one = (contract) => {
      const r = resolveStyle(g, 'bubble', { contract, profile });
      const rec = r.derived ?? g, rep = validateGlyphGeometry(rec, profile);
      return { r, rec, rep, model: buildRenderModel(rec, rep), metrics: negativeSpaceMetrics(g, neutralReport, rec, rep) };
    };
    R.set(c, { glyph: g, neutral: { rec: g, model: buildRenderModel(g, neutralReport) }, before: one(before), after: one(after) });
  }

  const sourceRevision = sha256Hex(registry.serialize());
  const engineVersions = {
    styleResolver: `${RESOLVER_VERSION}; ${after.contractId}@${after.version}`,
    before: `${RESOLVER_VERSION} with letterform.bubble.counter-safety removed (= resolver 1.0 count-only gate); ${WORD_LAYOUT_VERSION} collisionPolicy legacy-unchecked`,
    wordLayout: WORD_LAYOUT_VERSION,
    negativeSpace: NEGATIVE_SPACE_VERSION,
    geometryValidator: `${VALIDATOR_VERSION}; ${profile.profileId}@${profile.version}`,
    renderer: `${RENDER_MODEL_VERSION}; ${A02_PLATES_VERSION}`,
  };
  const runIdentity = { schemaVersion: A02_SCHEMA_VERSION, sourceRevision, engineVersions, fixtures: { glyphs: A02_GLYPHS, pairs: A02_PAIRS, words: A02_WORDS }, bounceParams, counterSafety: after.operations['letterform.bubble.counter-safety'].params };
  const runId = `run.${A02_LABEL}.${sha256Hex(stableStringify(runIdentity)).slice(0, 12)}`;

  // ---- layouts ----
  const layouts = {};
  for (const w of [...A02_PAIRS, ...A02_WORDS]) {
    layouts[w] = {
      before: layoutWordWithReport([...w].map((c) => R.get(c).before.rec), 'bounce', bounceParams, { collisionPolicy: 'legacy-unchecked' }),
      after: layoutWordWithReport([...w].map((c) => R.get(c).after.rec), 'bounce', bounceParams),
    };
  }

  // ---- plates ----
  const all = [...R.values()].flatMap((e) => [e.neutral.rec, e.before.rec, e.after.rec]).map((rec) => bounds(glyphPolygons(rec).map((q) => q.poly)));
  const G = { x0: Math.min(...all.map((b) => b.x0)), y0: Math.min(...all.map((b) => b.y0)), x1: Math.max(...all.map((b) => b.x1)), y1: Math.max(...all.map((b) => b.y1)) };
  const gw = G.x1 - G.x0, gh = G.y1 - G.y0;
  const svgOpen = (W, H) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="system-ui, sans-serif" data-run-id="${esc(runId)}">`;
  const header = (title, sub, W) => `<rect width="100%" height="100%" fill="${BG}"/><text x="20" y="32" font-size="19" font-weight="700">${esc(title)}</text><text x="20" y="52" font-size="11" fill="#555">${esc(sub)}</text><text x="${W - 20}" y="32" font-size="10" fill="#777" text-anchor="end">${esc(runId)}</text>`;
  const FOOTER = [
    'Vorher = Resolver-1.0-Verhalten (nur Punzen-Anzahl geprüft) und ungeprüftes Bounce. Nachher = Punzenschutz und Kollisionsprüfung.',
    'Die Schwellen (Punzenfläche ≥ 40 %, Punzenöffnung ≥ 60 % des Neutral-Masters; Abstand ≥ 4 Einheiten) sind vorläufig und lehnen nur ab.',
    `Reife: ${MATURITY.join(' · ')}. Nur Silhouetten, ohne Effekte. Keine Freigabe, keine Kalibrierung.`,
  ];
  const FOOTER_H = 20 + FOOTER.length * 16;
  const footer = (y) => FOOTER.map((t, i) => `<text x="20" y="${y + i * 16}" font-size="11" fill="#333">${esc(t)}</text>`).join('');
  const glyph = (model, tx, ty, s, rot = null) => glyphGroup(model, { fill: INK, transform: `translate(${f2(tx)} ${f2(ty)}) scale(${s})${rot ? ` rotate(${rot.deg} ${f2(rot.cx)} ${f2(rot.cy)})` : ''}` });
  const colHead = (x, top, label, sub) => `<text x="${x}" y="${top - 22}" font-size="13" font-weight="700">${esc(label)}</text><text x="${x}" y="${top - 9}" font-size="9" fill="#666">${esc(sub)}</text>`;
  const counterLine = (m) => m.counters.length ? `kleinste Punze: ${pct(Math.min(...m.counters.map((k) => k.areaRatio)))} Fläche · ${pct(Math.min(...m.counters.map((k) => k.openingRatio)))} Öffnung` : 'keine Punze';

  const files = {};
  {
    const s = 0.9, pad = 12, cellW = Math.ceil(gw * s) + 2 * pad + 40, glyphH = Math.ceil(gh * s), cellH = glyphH + 44, left = 130, top = 96;
    const cols = [['Neutral', 'Master', 'neutral'], ['Bubble vorher', 'Resolver 1.0: nur Anzahl', 'before'], ['Bubble nachher', 'mit Punzenschutz', 'after']];
    const W = Math.max(left + cols.length * cellW + 20, 940), H = top + A02_GLYPHS.length * cellH + FOOTER_H + 10;
    let svg = svgOpen(W, H) + header('Bubble-Punzenschutz: vorher / nachher', `A/B/G/R/S · Maßstab ${s} × für alle Spalten · Werte relativ zum Neutral-Master`, W);
    cols.forEach(([l, sub], ci) => { svg += colHead(left + ci * cellW + pad, top, l, sub); });
    A02_GLYPHS.forEach((c, ri) => {
      const y = top + ri * cellH, e = R.get(c);
      svg += `<text x="20" y="${y + glyphH / 2 + 6}" font-size="22" font-weight="700">${c}</text>`;
      cols.forEach(([, , k], ci) => {
        const x = left + ci * cellW;
        svg += glyph(e[k].model, x + pad - G.x0 * s, y - G.y0 * s, s);
        if (k !== 'neutral') {
          const inf = e[k].r.operations.find((o) => o.operationId === 'letterform.bubble.inflate');
          svg += `<text x="${x + pad}" y="${y + glyphH + 14}" font-size="9" fill="#555">Aufblasen ${esc(inf?.params?.distance ?? '—')}</text><text x="${x + pad}" y="${y + glyphH + 26}" font-size="9" fill="#555">${esc(counterLine(e[k].metrics))}</text>`;
        }
      });
    });
    files['plates/glyph-before-after.svg'] = svg + footer(H - FOOTER_H + 14) + '</svg>';
  }
  const contextPlate = (words, s, title, sub) => {
    const pad = 14, slack = 14, left = 130, top = 96, glyphH = Math.ceil((gh + 2 * slack) * s), lineH = glyphH + 30;
    let maxW = 0;
    for (const w of words) for (const k of ['before', 'after']) for (const it of layouts[w][k].items) maxW = Math.max(maxW, it.x + it.box.x1);
    const colW = Math.max(Math.ceil((maxW - G.x0 + slack) * s) + 2 * pad, 300);
    const W = Math.max(left + 2 * colW + 20, 940), H = top + words.length * lineH + FOOTER_H + 10;
    let svg = svgOpen(W, H) + header(title, sub, W);
    svg += colHead(left + pad, top, 'Bubble + Bounce vorher', 'ungeprüfte Platzierung, Geometrie Resolver 1.0') + colHead(left + colW + pad, top, 'Bubble + Bounce nachher', 'Kollisionsprüfung auf transformierten Konturen');
    words.forEach((w, ri) => {
      const y = top + ri * lineH;
      svg += `<text x="20" y="${y + glyphH / 2 + 4}" font-size="15" font-weight="700">${esc(w)}</text>`;
      ['before', 'after'].forEach((k, ci) => {
        const { items, report } = layouts[w][k];
        for (const it of items) {
          const rot = it.rotate ? { deg: it.rotate, cx: (it.box.x0 + it.box.x1) / 2, cy: (it.box.y0 + it.box.y1) / 2 } : null;
          svg += glyph(R.get(it.record.character)[k].model, left + ci * colW + pad + (it.x - G.x0) * s, y + (it.y - G.y0 + slack) * s, s, rot);
        }
        const cls = report.pairs.map((p) => (k === 'before' ? p.preferred.class : p.accepted.class));
        const counts = Object.entries(cls.reduce((m, c) => ({ ...m, [c]: (m[c] ?? 0) + 1 }), {})).map(([c, n]) => `${n}× ${c}`).join(', ');
        svg += `<text x="${left + ci * colW + pad}" y="${y + glyphH + 14}" font-size="9" fill="#555">${esc(counts)}</text>`;
      });
    });
    return svg + footer(H - FOOTER_H + 14) + '</svg>';
  };
  files['plates/pairs-before-after.svg'] = contextPlate(A02_PAIRS, 0.6, 'Bounce-Kollision: Paare vorher / nachher', 'Paar-Fixtures aus A/B/G/R/S. Unter jedem Paar: Kontaktklasse benachbarter Buchstaben (intersection, tangency, too-close, safe).');
  files['plates/word-before-after.svg'] = contextPlate(A02_WORDS, 0.8, 'Bounce-Kollision: ABRA vorher / nachher', 'Hauptwort ABRA. Überlappen ist nur mit einer erklärten Beziehung erlaubt; hier ist keine erklärt.');

  // ---- reports ----
  const strip = (r) => ({ status: r.status, geometryHash: r.derived?.variants[0].geometryHash ?? null, operations: r.operations });
  const negative = Object.fromEntries(chars.map((c) => {
    const e = R.get(c);
    return [c, { glyphId: e.glyph.glyphId, masterGeometryHash: e.glyph.variants[0].geometryHash, maturity: e.glyph.maturity, before: { ...strip(e.before.r), negativeSpace: e.before.metrics }, after: { ...strip(e.after.r), negativeSpace: e.after.metrics }, maturityLabels: MATURITY }];
  }));
  files['report/negative-space.json'] = stableStringify({ runId, counterSafety: after.operations['letterform.bubble.counter-safety'], glyphs: negative }, 2) + '\n';
  const placement = Object.fromEntries(Object.entries(layouts).map(([w, l]) => [w, {
    before: { ...l.before.report, items: l.before.items.map(({ record, ...it }) => ({ ...it, geometryHash: record.variants[0].geometryHash })) },
    after: { ...l.after.report, items: l.after.items.map(({ record, ...it }) => ({ ...it, geometryHash: record.variants[0].geometryHash })) },
  }]));
  files['report/placement.json'] = stableStringify({ runId, policy: after.operations['composition.bounce'].collisionPolicy, words: placement }, 2) + '\n';

  const summary = {
    bubble: Object.fromEntries(A02_GLYPHS.map((c) => {
      const e = R.get(c), d = (k) => e[k].r.operations.find((o) => o.operationId === 'letterform.bubble.inflate')?.params?.distance ?? null;
      const min = (k, f) => (e[k].metrics.counters.length ? Math.min(...e[k].metrics.counters.map((x) => x[f])) : null);
      return [c, { distanceBefore: d('before'), distanceAfter: d('after'), minAreaRatioBefore: min('before', 'areaRatio'), minAreaRatioAfter: min('after', 'areaRatio'), minOpeningRatioBefore: min('before', 'openingRatio'), minOpeningRatioAfter: min('after', 'openingRatio') }];
    })),
    bounce: Object.fromEntries(Object.entries(layouts).map(([w, l]) => [w, { before: l.before.report.pairs.map((p) => p.preferred.class), after: l.after.report.pairs.map((p) => p.accepted.class), afterResults: l.after.report.pairs.map((p) => p.result) }])),
  };
  files['README.md'] = readme(runId, summary);
  const manifest = {
    runId,
    schemaVersion: A02_SCHEMA_VERSION,
    brief: 'docs/lettering/style-library/CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01.md',
    issue: 24,
    previousRun: 'docs/reports/proof/style-library/phase-a-01/ (frozen; not overwritten)',
    sourceRevision: { kind: 'registry-content-sha256', value: sourceRevision },
    engineVersions,
    renderProfile: { background: BG, ink: INK, finish: 'none (solid silhouettes)', scale: 'one scale per plate for all columns' },
    fixtures: { glyphs: A02_GLYPHS, pairs: A02_PAIRS, words: A02_WORDS },
    maturity: MATURITY,
    summary,
    limitations: [
      'Counter-safety floors are provisional and reject-only; nothing is calibrated. Owner/practitioner review is required before any promotion.',
      'Glyphs now get different inflation distances (A/B/P/R 5, D/O/Q 7, glyphs without counters 9), so words mix stroke masses; this is visible and unresolved.',
      'Aperture throat width is not evaluable (no aperture boundary definition); only exterior connectivity is reported.',
      'No inter-letter channels are declared, so none are checked. No relationships are declared, so no overlap is authorised.',
      'Bounce placement avoids contact by stepping right; it does not design connections (C04).',
    ],
    review: { status: 'owner-review-required', automatedMaturityPromotion: false },
  };
  manifest.artifactHashes = Object.fromEntries(Object.keys(files).sort().map((p) => [p, sha256Hex(files[p])]));
  files['manifest.json'] = stableStringify(manifest, 2) + '\n';
  files['checksums.json'] = stableStringify({ runId, 'manifest.json': sha256Hex(files['manifest.json']), ...manifest.artifactHashes }, 2) + '\n';
  return { manifest, summary, files };
}

function readme(runId, summary) {
  const g = Object.entries(summary.bubble).map(([c, x]) => `| ${c} | ${x.distanceBefore} → ${x.distanceAfter} | ${x.minAreaRatioBefore ?? '—'} → ${x.minAreaRatioAfter ?? '—'} | ${x.minOpeningRatioBefore ?? '—'} → ${x.minOpeningRatioAfter ?? '—'} |`).join('\n');
  const w = Object.entries(summary.bounce).map(([k, x]) => `| ${k} | ${x.before.join(', ')} | ${x.after.join(', ')} | ${x.afterResults.join(', ')} |`).join('\n');
  return `# Style Library — Phase A-02: Bubble and Bounce safety

Run: \`${runId}\`
Brief: [CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01](../../../../lettering/style-library/CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01.md) · Issue #24

Before/after proof for the Bubble counter-safety gate and the Bounce collision check. **Automated evidence only. Maturity: ${MATURITY.join(', ')}.** Phase A-01 stays frozen next to this run.

## Bubble: inflation distance and smallest counter (relative to the neutral master)

| Glyph | inflation | area ratio | opening ratio |
|---|---|---|---|
${g}

## Bounce: contact class of adjacent letters

| Fixture | before (preferred placement) | after | after result |
|---|---|---|---|
${w}

## Files

- \`plates/glyph-before-after.svg\`, \`plates/pairs-before-after.svg\`, \`plates/word-before-after.svg\`
- \`report/negative-space.json\`: per glyph, before and after: operations with every candidate and its reason codes, counter area/opening/wall clearance, aperture status
- \`report/placement.json\`: per pair and word: placement, contact class, clearance and error bound, fallback, authorisation
- \`manifest.json\`, \`checksums.json\`

## Limitations

- Floors are provisional, reject-only and uncalibrated.
- Mixed inflation distances make words uneven in mass.
- Aperture throat width is not evaluable; no channels or relationships are declared.
- Bounce now avoids contact; real letter connections need C04.

## Reproduce

\`\`\`bash
node tools/proof-style-plates.mjs          # writes phase-a-02, verifies phase-a-01 checksums
node tools/proof-style-plates.mjs --check
\`\`\`
`;
}
