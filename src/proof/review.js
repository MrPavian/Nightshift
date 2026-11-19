// Human review records (Ticket 0.7A-T06).
//
// Review status is stored separately from automated pass/fail. Validation of a
// record enforces the rubric rules of research/GLYPH_VISUAL_REVIEW_PROTOCOL_01.md
// §6. Maturity is never changed here: proposeMaturity() only returns a proposal
// that a later, explicit command must apply.

export const REVIEW_SCHEMA_VERSION = '1.0';

export const RUBRIC = [
  { key: 'identity', label: 'Identity — recognizable without effects', critical: true },
  { key: 'silhouette', label: 'Silhouette — deliberate contour and mass' },
  { key: 'topology', label: 'Topology — counters/apertures/channels read as intended', critical: true },
  { key: 'junctions', label: 'Junctions — attachments and crossings intentional' },
  { key: 'styleConstruction', label: 'Style construction — grammar visible in structure' },
  { key: 'thumbnail', label: 'Thumbnail resilience' },
  { key: 'pairBehavior', label: 'Pair behavior' },
  { key: 'wordRhythm', label: 'Word rhythm' },
  { key: 'surface', label: 'Surface behavior' },
  { key: 'renderConsistency', label: 'Render consistency — SVG vs Three.js' },
];
// 'unsure' and 'cannot-assess' let a reviewer decline a verdict instead of being forced into one
// (owner request on #22). Only 'pass' can ever support a maturity proposal.
export const DECISIONS = ['pass', 'fail', 'needs-revision', 'unsure', 'cannot-assess'];
export const STAGES = ['semantic', 'render'];
export const SEVERITIES = ['critical', 'major', 'minor'];

const MATURITY_AFTER = { semantic: { from: 'authored-contour', to: 'semantic-reviewed' }, render: { from: 'semantic-reviewed', to: 'render-reviewed' } };

/** Empty review record for one specimen slot (used by the review page and template). */
export function blankReview(manifest, specimen, slotIndex = 0) {
  const slot = specimen.slots[slotIndex];
  return {
    schemaVersion: REVIEW_SCHEMA_VERSION,
    reviewId: null,
    runId: manifest.runId,
    specimenId: specimen.specimenId,
    glyphId: slot.glyphId,
    variantId: slot.variantId,
    geometryHash: slot.geometryHash,
    maturityAtReview: slot.maturity,
    stage: 'semantic',
    reviewer: '',
    date: '',
    scores: Object.fromEntries(RUBRIC.map((r) => [r.key, null])),
    decision: null,
    rationale: '',
    defects: [],
  };
}

/** @returns {{code:string,severity:string,message:string}[]} */
export function validateReviewRecord(rec, manifest) {
  const out = [];
  const e = (code, message) => out.push({ code, severity: 'error', message });
  if (rec.schemaVersion !== REVIEW_SCHEMA_VERSION) e('REVIEW_SCHEMA', 'schemaVersion must be 1.0');
  if (rec.runId !== manifest.runId) e('REVIEW_RUN_MISMATCH', `review belongs to run ${rec.runId}, not ${manifest.runId}`);
  const sp = manifest.specimens.find((s) => s.specimenId === rec.specimenId);
  if (!sp) e('REVIEW_UNKNOWN_SPECIMEN', `unknown specimen ${rec.specimenId}`);
  const slot = sp?.slots.find((s) => s.glyphId === rec.glyphId && s.variantId === rec.variantId);
  if (sp && !slot) e('REVIEW_UNKNOWN_GLYPH', `${rec.glyphId}/${rec.variantId} is not part of ${rec.specimenId}`);
  if (slot && slot.geometryHash !== rec.geometryHash) e('REVIEW_STALE_GEOMETRY', 'review was made for different geometry');
  if (!STAGES.includes(rec.stage)) e('REVIEW_STAGE', `stage must be one of ${STAGES.join(', ')}`);
  if (!rec.reviewer?.trim()) e('REVIEW_REVIEWER', 'reviewer is required');
  if (!/^\d{4}-\d{2}-\d{2}/.test(rec.date ?? '')) e('REVIEW_DATE', 'date must be ISO (YYYY-MM-DD)');
  if (!DECISIONS.includes(rec.decision)) e('REVIEW_DECISION', `decision must be one of ${DECISIONS.join(', ')}`);
  if (!rec.rationale?.trim()) e('REVIEW_RATIONALE', 'rationale is required');
  for (const r of RUBRIC) {
    const v = rec.scores?.[r.key];
    if (!(v === null || v === 'cannot-judge' || [0, 1, 2, 3].includes(v))) e('REVIEW_SCORE', `${r.key}: score must be 0–3, cannot-judge or empty`);
  }
  for (const d of rec.defects ?? []) {
    if (!d.defectId || !SEVERITIES.includes(d.severity) || !d.note?.trim()) e('REVIEW_DEFECT', 'each defect needs defectId, severity and note');
  }
  const scores = rec.scores ?? {};
  const critical = RUBRIC.filter((r) => r.critical);
  if (rec.decision === 'pass') {
    for (const r of critical) if (![0, 1, 2, 3].includes(scores[r.key])) e('REVIEW_PASS_NEEDS_CRITICAL_SCORES', `pass requires a score for ${r.key}`);
    for (const r of critical) if (scores[r.key] === 0) e('REVIEW_CRITICAL_ZERO', `${r.key} scored 0 blocks approval`);
    if ((rec.defects ?? []).some((d) => d.severity === 'critical')) e('REVIEW_CRITICAL_DEFECT', 'pass is not allowed with an open critical defect');
  }
  if (RUBRIC.some((r) => scores[r.key] === 1) && !(rec.defects ?? []).length) e('REVIEW_SCORE1_NEEDS_DEFECT', 'any score of 1 requires a defect note');
  return out;
}

/** Proposal only: never mutates the glyph. */
export function proposeMaturity(glyph, records) {
  const valid = records.filter((r) => r.glyphId === glyph.glyphId && r.decision === 'pass');
  for (const stage of STAGES) {
    const step = MATURITY_AFTER[stage];
    if (glyph.maturity === step.from && valid.some((r) => r.stage === stage)) {
      return { glyphId: glyph.glyphId, current: glyph.maturity, proposed: step.to, basis: valid.filter((r) => r.stage === stage).map((r) => r.reviewId), applied: false };
    }
  }
  return { glyphId: glyph.glyphId, current: glyph.maturity, proposed: null, basis: [], applied: false };
}
