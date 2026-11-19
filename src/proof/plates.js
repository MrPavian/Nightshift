// Proof plates as deterministic SVG documents (Ticket 0.7A-T06).
//
// Plates are derived evidence for human review. They never change canonical
// data or maturity. Every plate carries its specimen IDs and the run ID so a
// reviewer can trace any image back to the manifest and validation reports.

import { glyphGroup } from '../render/svg.js';

export const PLATE_RENDERER_VERSION = 'proof-plates/1.0.0';

const INK = { authored: '#111111', provisional: '#8f8a7e' };
const SURFACE = '#f2efe6';
const COMPONENT_COLORS = ['#d81b60', '#1e88e5', '#43a047', '#fb8c00', '#8e24aa', '#00897b', '#6d4c41', '#c0ca33'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const num = (x) => Math.round(x * 100) / 100;
const short = (h) => (h ? h.slice(0, 8) : '—');

function doc(width, height, title, body, runId) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(width)} ${num(height)}" width="${num(width * 2)}" height="${num(height * 2)}" font-family="monospace" data-run-id="${esc(runId)}" data-plate-renderer="${PLATE_RENDERER_VERSION}">` +
    `<rect x="0" y="0" width="${num(width)}" height="${num(height)}" fill="${SURFACE}"/>` +
    `<text x="8" y="12" font-size="7" fill="#333">${esc(title)}</text>` +
    `<text x="8" y="21" font-size="4.2" fill="#666">run ${esc(runId)} · neutral profile · automated evidence only, not an approval</text>` +
    body + '</svg>';
}

/** One slot of a specimen, positioned by its transform plus an offset. */
function slotSvg(slot, resolved, ox, oy, scale = 1) {
  const r = resolved.get(slot.character);
  const b = r.glyph.baseMetrics.visibleBounds;
  const tx = ox + slot.transform.translateX * scale, ty = oy;
  const tr = `translate(${num(tx)} ${num(ty)}) scale(${scale})`;
  if (slot.status === 'missing') {
    return `<g data-slot="${slot.index}" data-glyph-id="${esc(slot.glyphId)}" data-status="missing" transform="${tr}">` +
      `<rect x="${b.minX}" y="${b.minY}" width="${b.maxX - b.minX}" height="${b.maxY - b.minY}" fill="none" stroke="#c62828" stroke-width="${num(1.2 / scale)}" stroke-dasharray="${num(4 / scale)} ${num(3 / scale)}"/>` +
      `<text x="${(b.minX + b.maxX) / 2}" y="${(b.minY + b.maxY) / 2}" text-anchor="middle" font-size="${num(28)}" fill="#c62828" opacity="0.5">${esc(slot.character)}</text>` +
      `<text x="${(b.minX + b.maxX) / 2}" y="${(b.minY + b.maxY) / 2 + 18}" text-anchor="middle" font-size="7" fill="#c62828">missing</text>` +
      `<text x="${(b.minX + b.maxX) / 2}" y="${(b.minY + b.maxY) / 2 + 27}" text-anchor="middle" font-size="5.5" fill="#c62828">provisional</text>` +
      `</g>`;
  }
  const fill = slot.status === 'rendered-provisional' ? INK.provisional : INK.authored;
  return `<g data-slot="${slot.index}" data-status="${slot.status}" transform="${tr}">${glyphGroup(r.model, { fill })}</g>`;
}

/** Identity plate: A/B/G/R/S neutral silhouettes at full size and thumbnail size. */
export function identityPlate(specimens, resolved, runId) {
  const cell = 130, top = 34, thumbScale = 0.18, perRow = 5, rowH = 240;
  const parts = [];
  specimens.forEach((sp, i) => {
    const x = 10 + (i % perRow) * cell;
    const top = 34 + Math.floor(i / perRow) * rowH;
    const s = sp.slots[0];
    const r = resolved.get(s.character);
    const b = r.glyph.baseMetrics.visibleBounds;
    const w = b.maxX - b.minX;
    parts.push(`<g data-specimen-id="${esc(sp.specimenId)}">`);
    parts.push(slotSvg(s, resolved, x + (cell - w) / 2, top + 2));
    const ly = top + 150;
    parts.push(`<text x="${x + 4}" y="${ly}" font-size="6" fill="#222">${esc(s.character)} · ${esc(s.variantId)} · ${esc(s.maturity)}</text>`);
    parts.push(`<text x="${x + 4}" y="${ly + 7}" font-size="4.2" fill="#666">geom ${short(s.geometryHash)} · rev ${s.revision} · hard checks ${s.hardChecksPassed ? 'pass' : 'FAIL'}</text>`);
    parts.push(`<text x="${x + 4}" y="${ly + 13}" font-size="4.2" fill="#666">${esc(sp.specimenId)}</text>`);
    // Thumbnail (identity at reduced scale).
    parts.push(slotSvg(s, resolved, x + cell / 2 - (w * thumbScale) / 2, ly + 20 - b.minY * thumbScale, thumbScale));
    parts.push('</g>');
  });
  const rows = Math.ceil(specimens.length / perRow);
  const h = top + (rows - 1) * rowH + 222;
  parts.push(`<text x="10" y="${h - 10}" font-size="4.5" fill="#666">Each cell: native size, then thumbnail at ${thumbScale}× (thumbnail resilience check).</text>`);
  return doc(10 + Math.min(specimens.length, perRow) * cell + 10, h, `Glyph identity — neutral silhouette (${specimens.map((s) => s.text).join('/')})`, parts.join(''), runId);
}

/** Per-segment path pieces of one contour (for component colouring). */
function segmentPieces(contour) {
  const out = [];
  let start = null, cur = null;
  for (const s of contour.segments) {
    if (s.type === 'move') { start = cur = [s.x, s.y]; continue; }
    const from = `M${cur[0]} ${cur[1]}`;
    if (s.type === 'line') out.push({ id: s.segmentId, d: `${from} L${s.x} ${s.y}` });
    else if (s.type === 'quadratic') out.push({ id: s.segmentId, d: `${from} Q${s.cx} ${s.cy} ${s.x} ${s.y}` });
    else if (s.type === 'cubic') out.push({ id: s.segmentId, d: `${from} C${s.c1x} ${s.c1y} ${s.c2x} ${s.c2y} ${s.x} ${s.y}` });
    else if (s.type === 'close') out.push({ id: s.segmentId, d: `${from} L${start[0]} ${start[1]}` });
    if (s.type !== 'close') cur = [s.x, s.y];
  }
  return out;
}

/** Semantic/topology plate: component proposals, counters, junction candidates, aperture flag. */
export function semanticPlate(specimens, resolved, runId) {
  const cell = 180, perRow = 5, rowH = 245;
  const parts = [];
  specimens.forEach((sp, i) => {
    const top = 30 + Math.floor(i / perRow) * rowH;
    const col = i % perRow;
    const s = sp.slots[0];
    const { glyph, report, model } = resolved.get(s.character);
    const sg = glyph.semanticGraph;
    const contours = glyph.variants[0].geometry.contours;
    const b = glyph.baseMetrics.visibleBounds;
    const x0 = 10 + col * cell + (cell - (b.maxX - b.minX)) / 2 - b.minX;
    const y0 = top + 10 - b.minY;
    const colorOf = new Map();
    sg.components.forEach((c, k) => colorOf.set(c.id, COMPONENT_COLORS[k % COMPONENT_COLORS.length]));
    const segOwner = new Map();
    for (const c of sg.components) for (const ref of [...c.geometryRefs, ...c.candidateGeometryRefs]) segOwner.set(ref, c.id);

    parts.push(`<g data-specimen-id="${esc(sp.specimenId)}" transform="translate(${num(x0)} ${num(y0)})">`);
    parts.push(glyphGroup(model, { fill: '#dcd8cc' }));
    for (const c of contours) {
      for (const p of segmentPieces(c)) {
        const owner = segOwner.get(p.id) ?? segOwner.get(c.contourId);
        const color = owner ? colorOf.get(owner) : '#999';
        const dash = c.role === 'counter' ? ' stroke-dasharray="3 2"' : '';
        parts.push(`<path d="${p.d}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round"${dash} data-segment-id="${esc(p.id)}"/>`);
      }
    }
    for (const j of sg.junctions) {
      for (const ref of j.candidateNodeRefs) {
        const seg = contours.flatMap((c) => c.segments).find((x) => x.nodeId === ref);
        if (seg) parts.push(`<circle cx="${seg.x}" cy="${seg.y}" r="2.6" fill="#fff" stroke="#111" stroke-width="0.8" data-junction-id="${esc(j.id)}"/>`);
      }
    }
    for (const a of sg.negativeSpaces.filter((n) => n.kind === 'aperture' && n.mouthNodeRefs)) {
      const pts = a.mouthNodeRefs.map((ref) => contours.flatMap((c) => c.segments).find((x) => x.nodeId === ref)).filter(Boolean);
      if (pts.length === 2) parts.push(`<line x1="${pts[0].x}" y1="${pts[0].y}" x2="${pts[1].x}" y2="${pts[1].y}" stroke="#2e7d32" stroke-width="1.4" stroke-dasharray="3 2" data-aperture-id="${esc(a.id)}"/>`);
    }
    if (sg.topology.apertureStatus === 'interpretation-required') {
      parts.push(`<rect x="${b.minX - 4}" y="${b.minY - 4}" width="${b.maxX - b.minX + 8}" height="${b.maxY - b.minY + 8}" fill="none" stroke="#e53935" stroke-dasharray="4 3"/>`);
    }
    parts.push('</g>');
    // Legend.
    const lx = 10 + col * cell + 6;
    let ly = top + 150;
    parts.push(`<text x="${lx}" y="${ly}" font-size="6" fill="#222">${esc(s.character)} — components (proposals, unreviewed)</text>`);
    for (const c of sg.components) {
      ly += 7;
      parts.push(`<rect x="${lx}" y="${ly - 4.5}" width="5" height="5" fill="${colorOf.get(c.id)}"/>`);
      parts.push(`<text x="${lx + 8}" y="${ly}" font-size="4.6" fill="#333">${esc(c.label)} · ${esc(c.mappingStatus)}</text>`);
    }
    ly += 9;
    const counters = report.negativeSpace.counters;
    parts.push(`<text x="${lx}" y="${ly}" font-size="4.6" fill="#333">counters: ${counters.length ? counters.map((c) => (c.boundedFace ? 'enclosed' : 'NOT enclosed')).join(', ') : 'none'} · aperture: ${esc(sg.topology.apertureStatus)}</text>`);
    ly += 6;
    const walls = report.clearance.counterWalls.map((w) => (Math.round(w.minimumDistance * 10) / 10).toFixed(1));
    parts.push(`<text x="${lx}" y="${ly}" font-size="4.6" fill="#333">counter wall min: ${walls.length ? walls.join(' / ') : '—'} (uncalibrated)</text>`);
    ly += 6;
    parts.push(`<text x="${lx}" y="${ly}" font-size="4.6" fill="#333">automated hard checks: ${report.hardChecksPassed ? 'pass' : 'FAIL'}</text>`);
  });
  const h = 30 + (Math.ceil(specimens.length / perRow) - 1) * rowH + 150 + 7 * 7 + 36;
  parts.push(`<text x="10" y="${h - 8}" font-size="4.5" fill="#666">Coloured strokes: candidate segments per component (proposal). Dashed: counter boundaries. Circles: junction candidate nodes. Red dashed frame: aperture unresolved (AUD-01). Green line: authored aperture mouth.</text>`);
  return doc(10 + Math.min(specimens.length, perRow) * cell + 10, h, `Semantic / topology diagnostics (${specimens.map((s) => s.text).join('/')})`, parts.join(''), runId);
}

/** Context plate (pairs or words): naive layout, provisional and missing slots marked. */
export function contextPlate(specimens, resolved, runId, { title, columns = 1, scale = 0.6 }) {
  const rowH = 150 * scale + 34;
  const colW = Math.max(...specimens.map((s) => s.width)) * scale + 40;
  const parts = [];
  specimens.forEach((sp, i) => {
    const col = i % columns, row = Math.floor(i / columns);
    const x = 10 + col * colW, y = 30 + row * rowH;
    parts.push(`<g data-specimen-id="${esc(sp.specimenId)}" data-coverage="${sp.coverage}">`);
    for (const slot of sp.slots) parts.push(slotSvg(slot, resolved, x, y + 6 - 8 * scale, scale));
    const label = `${sp.text} · ${sp.coverage}${sp.missingSlots.length ? ` · missing: ${sp.missingSlots.map((m) => m.character).join(',')}` : ''}`;
    parts.push(`<text x="${x}" y="${y + 150 * scale + 12}" font-size="5.5" fill="${sp.coverage === 'authored-subset' ? '#222' : '#8a4b00'}">${esc(label)}</text>`);
    parts.push(`<text x="${x}" y="${y + 150 * scale + 18}" font-size="4" fill="#777">${esc(sp.specimenId)}</text>`);
    parts.push('</g>');
  });
  const rows = Math.ceil(specimens.length / columns);
  const h = 30 + rows * rowH + 16;
  parts.push(`<text x="10" y="${h - 6}" font-size="4.5" fill="#666">Black: authored-contour master (review pending). Grey: provisional base (reference only). Red dashed: missing — provisional glyph cannot be rendered (invalid or undeclared topology). Layout: naive fixed gap, no relationship solver.</text>`);
  return doc(10 + columns * colW + 10, h, title, parts.join(''), runId);
}
