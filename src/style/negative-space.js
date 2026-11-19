// Negative-space metrics and the Bubble counter-safety gate (C03, Issue #24).
//
// Uses the geometry validator's own outputs first (counter area, counter-wall clearance, aperture
// connectivity). It adds exactly one measurement the validator does not provide: the counter
// opening, i.e. the diameter of the largest circle inside a counter. A triangular counter (A) has
// no non-adjacent boundary segments, so boundary self-proximity cannot describe how open it is.
//
// The safety floors are reject-only and provisional: they can only make the resolver choose a
// gentler candidate or skip; they never certify a result. Every accepted result stays
// `measured-uncalibrated` until an owner/practitioner review promotes it.
import { contourToPolygon } from './polygon.js';

export const NEGATIVE_SPACE_VERSION = 'negative-space-metrics/1.0.0';
const OPENING_STEP = 1, OPENING_REFINE = 0.1;
const round = (n, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

const segDist = (px, py, [ax, ay], [bx, by]) => {
  const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
const inside = (x, y, q) => {
  let c = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) {
    const [xi, yi] = q[i], [xj, yj] = q[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const edgeDist = (x, y, q) => { let m = Infinity; for (let i = 0; i < q.length; i++) m = Math.min(m, segDist(x, y, q[i], q[(i + 1) % q.length])); return m; };

/**
 * Diameter of the largest inscribed circle of a closed polygon (coarse grid, then a fine grid
 * around the best point). Deterministic. errorBound covers the grid resolution.
 */
export function inscribedDiameter(q) {
  const xs = q.map((p) => p[0]), ys = q.map((p) => p[1]);
  let best = { r: 0, x: null, y: null };
  const scan = (x0, x1, y0, y1, step) => {
    for (let x = x0; x <= x1 + 1e-9; x += step) for (let y = y0; y <= y1 + 1e-9; y += step) {
      if (!inside(x, y, q)) continue;
      const r = edgeDist(x, y, q);
      if (r > best.r) best = { r, x, y };
    }
  };
  scan(Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys), OPENING_STEP);
  if (best.x !== null) scan(best.x - OPENING_STEP, best.x + OPENING_STEP, best.y - OPENING_STEP, best.y + OPENING_STEP, OPENING_REFINE);
  return { diameter: round(2 * best.r), errorBound: round(2 * OPENING_REFINE * Math.SQRT2) };
}

const countersOf = (report) => report.negativeSpace.counters.filter((c) => c.boundedFace);
const contourPoly = (record, contourId) => {
  const c = record.variants[0].geometry.contours.find((k) => k.contourId === contourId);
  return c ? contourToPolygon(c) : null;
};

/**
 * Per-counter and per-aperture metrics of a derived glyph against its neutral master.
 * @returns {{counters: object[], apertures: object[], calibrationStatus: string}}
 */
export function negativeSpaceMetrics(master, masterReport, derived, derivedReport) {
  const walls = (report) => new Map((report.clearance?.counterWalls ?? []).map((w) => [w.featureId, w]));
  const mWalls = walls(masterReport), dWalls = walls(derivedReport);
  const dCounters = new Map(countersOf(derivedReport).map((c) => [c.contourId, c]));
  const counters = countersOf(masterReport).map((m) => {
    const d = dCounters.get(m.contourId);
    const mOpen = inscribedDiameter(contourPoly(master, m.contourId));
    const dPoly = d ? contourPoly(derived, m.contourId) : null;
    const dOpen = dPoly ? inscribedDiameter(dPoly) : null;
    const wall = dWalls.get(d?.id ?? m.id) ?? null;
    return {
      counterId: m.id,
      contourId: m.contourId,
      present: Boolean(d),
      neutralArea: round(m.area),
      area: d ? round(d.area) : 0,
      areaRatio: d ? round(d.area / m.area) : 0,
      neutralOpening: mOpen.diameter,
      opening: dOpen ? dOpen.diameter : 0,
      openingRatio: dOpen ? round(dOpen.diameter / mOpen.diameter) : 0,
      openingErrorBound: mOpen.errorBound,
      wallClearance: wall ? { minimumDistance: round(wall.minimumDistance), errorBound: wall.measurementErrorBound, neutral: mWalls.get(m.id) ? round(mWalls.get(m.id).minimumDistance) : null, calibrationStatus: wall.calibrationStatus } : null,
      calibrationStatus: 'measured-uncalibrated',
    };
  });
  const dAps = new Map((derivedReport.negativeSpace.apertures ?? []).map((a) => [a.id, a]));
  const apertures = (masterReport.negativeSpace.apertures ?? []).map((a) => ({
    apertureId: a.id,
    exteriorConnected: dAps.get(a.id)?.exteriorConnected ?? false,
    throat: 'not-evaluable',
    throatReason: 'No aperture boundary definition (mouth line) exists in the semantic data, so a throat width cannot be measured; connectivity only.',
  }));
  return { counters, apertures, calibrationStatus: 'measured-uncalibrated' };
}

/**
 * Reject-only safety gate. params: { minAreaRatio, minOpeningRatio }.
 * @returns {{ok:boolean, reasons:string[]}} stable reason codes
 */
export function checkCounterSafety(metrics, { minAreaRatio, minOpeningRatio }) {
  const reasons = [];
  for (const c of metrics.counters) {
    if (!c.present) reasons.push(`COUNTER_MISSING:${c.counterId}`);
    else {
      if (c.areaRatio < minAreaRatio) reasons.push(`COUNTER_AREA_BELOW_FLOOR:${c.counterId}`);
      if (c.openingRatio < minOpeningRatio) reasons.push(`COUNTER_OPENING_BELOW_FLOOR:${c.counterId}`);
    }
  }
  for (const a of metrics.apertures) if (!a.exteriorConnected) reasons.push(`APERTURE_CLOSED:${a.apertureId}`);
  return { ok: reasons.length === 0, reasons };
}
