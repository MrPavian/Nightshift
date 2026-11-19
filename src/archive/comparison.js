// Letterform comparison library (spec LETTERFORM_COMPARISON_LIBRARY_SPEC_01, contract letterform-comparison v1).
// Deterministic build + validation of the typed sidecar research/archive/comparison/*.v1.json.
// Pure; no I/O. Output contains display fields only (no English research notes, no image URLs).

import { sha256Hex } from '../core/sha256.js';

export const COMPARISON_SCHEMA_VERSION = '1.0';
export const GLYPHS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const ELIGIBLE_STATES = new Set(['hi_fi_image_opened_and_inspected', 'physical_item_inspected']);
const PUBLISHED = new Set(['source-checked', 'editorial-reviewed', 'approved-for-archive']);
const IMAGE_FILE = /\.(jpe?g|png|gif|webp|avif|tiff?|bmp|svg)(\?|#|$)|\/wp-content\/uploads\//i;

export const LABELS_DE = {
  visualState: {
    catalogue_metadata_only: 'Nur Katalogangaben',
    image_preview_seen: 'Vorschaubild gesehen',
    hi_fi_image_opened_and_inspected: 'Bild in hoher Auflösung gesichtet',
    physical_item_inspected: 'Original vor Ort gesichtet',
  },
  imageRights: {
    'link-only': 'Nur Link – keine Bildnutzung',
    'rights-unknown': 'Bildrechte ungeklärt – nur Link',
    'permission-requested': 'Erlaubnis angefragt – nur Link',
    cleared: 'Bildnutzung geklärt',
    'do-not-reuse': 'Keine Nutzung – nur Link',
  },
  creatorAttribution: {
    'named-by-source': 'Name laut Quelle',
    'catalogue-title-only': 'nur Katalogtitel – Zuschreibung ungeprüft',
    unknown: 'unbekannt',
  },
  confidence: { high: 'hoch', medium: 'mittel', low: 'niedrig' },
  generatorRelevance: { none: 'keine', 'research-lead': 'Rechercheansatz', 'study-candidate': 'Studienkandidat', 'validated-capability': 'geprüfte Generator-Funktion' },
  comparisonAxis: {
    'rounded-angular': 'rund ↔ eckig', 'open-closed-counters': 'offene ↔ geschlossene Punzen', 'simple-interlocking': 'einfach ↔ verschränkt',
    'compact-extended': 'kompakt ↔ gestreckt', 'isolated-connected': 'einzeln ↔ verbunden', 'flat-dimensional': 'flach ↔ räumlich', 'regular-irregular': 'regelmäßig ↔ unregelmäßig',
  },
};

/**
 * @param {{contract, sources, specimens, observations, findings, entryIds: string[], capabilities?: object, lang?: string, inputFiles?: {path,text}[]}} input
 */
export function buildComparison({ contract, sources, specimens, observations, findings, entryIds = [], capabilities = {}, lang = 'de', inputFiles = [] }) {
  const diags = [];
  const err = (code, where, message) => diags.push({ severity: 'error', code, where, message });
  const E = contract.enums, P = contract.idPatterns;
  const re = (k) => new RegExp(P[k]);
  const enumOk = (k, v, where, field) => { if (!E[k].includes(v)) err('CMP_BAD_ENUM', where, `${field}: ${v}`); };
  const https = (u) => typeof u === 'string' && /^https:\/\/[^\s]+$/.test(u);
  const entrySet = new Set(entryIds);

  // ---- sources ----
  const srcById = new Map();
  for (const s of sources.sources ?? []) {
    if (!re('source').test(s.id ?? '')) err('CMP_BAD_ID', s.id, 'source id');
    if (srcById.has(s.id)) err('CMP_DUPLICATE_ID', s.id, 'source');
    if (!https(s.url) || IMAGE_FILE.test(s.url)) err('CMP_BAD_URL', s.id, `url ${s.url}`);
    srcById.set(s.id, s);
  }
  // ---- specimens ----
  const specById = new Map();
  for (const s of specimens.specimens ?? []) {
    const w = s.id;
    if (!re('specimen').test(s.id ?? '')) err('CMP_BAD_ID', w, 'specimen id');
    if (specById.has(s.id)) err('CMP_DUPLICATE_ID', w, 'specimen');
    if (!srcById.has(s.sourceRecordId)) err('CMP_UNKNOWN_SOURCE', w, s.sourceRecordId);
    if (!https(s.itemUrl) || IMAGE_FILE.test(s.itemUrl)) err('CMP_BAD_URL', w, `itemUrl must be a https page URL, not an image file: ${s.itemUrl}`);
    if (!s.title) err('CMP_REQUIRED', w, 'title');
    enumOk('visualState', s.visualState, w, 'visualState');
    enumOk('imageRights', s.imageRights, w, 'imageRights');
    enumOk('displayMode', s.displayMode, w, 'displayMode');
    enumOk('creatorAttribution', s.creatorAttribution, w, 'creatorAttribution');
    enumOk('dateQualifier', s.dateQualifier, w, 'dateQualifier');
    if (s.displayMode === 'embed-permitted' && s.imageRights !== 'cleared') err('CMP_RIGHTS', w, 'embedding requires imageRights cleared');
    specById.set(s.id, s);
  }

  // ---- observations ----
  const obsIds = new Set();
  const publishedText = (o, field, w) => {
    if (!PUBLISHED.has(o.editorialState)) return false;
    if (!o[field] || !String(o[field]).trim()) { err('CMP_GERMAN_TEXT', w, `${field} is required for published records`); return false; }
    return true;
  };
  const objectObs = [];
  for (const o of observations.objectObservations ?? []) {
    const w = o.id;
    if (!re('objectObservation').test(o.id ?? '')) err('CMP_BAD_ID', w, 'object observation id');
    if (obsIds.has(o.id)) err('CMP_DUPLICATE_ID', w, 'observation');
    obsIds.add(o.id);
    const sp = specById.get(o.specimenId);
    if (!sp) { err('CMP_UNKNOWN_SPECIMEN', w, o.specimenId); continue; }
    if (sp.visualState === 'catalogue_metadata_only') err('CMP_NOT_INSPECTED', w, `${o.specimenId} was not visually inspected`);
    enumOk('observationKind', o.kind, w, 'kind');
    enumOk('confidence', o.confidence, w, 'confidence');
    enumOk('editorialState', o.editorialState, w, 'editorialState');
    if (publishedText(o, 'observationDe', w)) objectObs.push(o);
  }
  const glyphObs = [];
  for (const g of observations.glyphObservations ?? []) {
    const w = g.id;
    if (!re('glyphObservation').test(g.id ?? '')) err('CMP_BAD_ID', w, 'glyph observation id');
    if (obsIds.has(g.id)) err('CMP_DUPLICATE_ID', w, 'observation');
    obsIds.add(g.id);
    const sp = specById.get(g.specimenId);
    if (!sp) { err('CMP_UNKNOWN_SPECIMEN', w, g.specimenId); continue; }
    if (!ELIGIBLE_STATES.has(sp.visualState)) err('CMP_GLYPH_NOT_ELIGIBLE', w, `${g.specimenId} is ${sp.visualState}; glyph observations need a high-resolution or physical inspection`);
    if (!GLYPHS.includes(g.glyph)) err('CMP_GLYPH_NOT_ELIGIBLE', w, `glyph ${g.glyph} is not A–Z`);
    for (const k of ['transcriptionConfidence', 'legibility']) {
      enumOk('confidence', g[k], w, k);
      if (g[k] === 'low') err('CMP_GLYPH_NOT_ELIGIBLE', w, `${k} low`);
    }
    enumOk('editorialState', g.editorialState, w, 'editorialState');
    if (publishedText(g, 'observationDe', w)) glyphObs.push(g);
  }

  // ---- findings ----
  const allObs = new Map([...(observations.objectObservations ?? []), ...(observations.glyphObservations ?? [])].map((o) => [o.id, o]));
  const findingsOut = [];
  for (const f of findings.findings ?? []) {
    const w = f.id;
    if (!re('finding').test(f.id ?? '')) err('CMP_BAD_ID', w, 'finding id');
    const obs = (f.observationIds ?? []).map((id) => allObs.get(id));
    if (obs.some((o) => !o)) err('CMP_UNKNOWN_OBSERVATION', w, (f.observationIds ?? []).filter((id) => !allObs.has(id)).join(', '));
    const srcs = new Set(obs.filter(Boolean).map((o) => specById.get(o.specimenId)?.sourceRecordId));
    if (obs.length < 2 || srcs.size < 2) err('CMP_NOT_INDEPENDENT', w, 'a finding needs at least two observations from two different source records');
    enumOk('comparisonAxis', f.axis, w, 'axis');
    enumOk('confidence', f.confidence, w, 'confidence');
    enumOk('generatorRelevance', f.generatorRelevance, w, 'generatorRelevance');
    enumOk('editorialState', f.editorialState, w, 'editorialState');
    for (const k of ['evidenceBasisDe', 'limitationDe']) if (PUBLISHED.has(f.editorialState) && !f[k]) err('CMP_REQUIRED', w, k);
    if (f.generatorRelevance === 'validated-capability' && capabilities[f.capability]?.status !== 'available') err('CMP_CAPABILITY', w, `capability ${f.capability} is not available`);
    for (const e of f.relatedEntries ?? []) if (!entrySet.has(e)) err('CMP_DEAD_LINK', w, `unknown archive entry ${e}`);
    if (publishedText(f, 'findingDe', w)) findingsOut.push(f);
  }

  // ---- counts and pilot gate ----
  const gate = contract.pilotGate.glyphComparison;
  const glyphSources = new Set(glyphObs.map((g) => specById.get(g.specimenId)?.sourceRecordId));
  const counts = {
    specimens: specById.size,
    inspectedSpecimens: [...specById.values()].filter((s) => ELIGIBLE_STATES.has(s.visualState)).length,
    eligibleGlyphObservations: glyphObs.length,
    glyphSources: glyphSources.size,
    // Different source records can sit on the same platform or archive; this is the stricter count.
    glyphInstitutions: new Set([...glyphSources].map((id) => srcById.get(id)?.institution ?? id)).size,
    findings: findingsOut.length,
  };
  // Independence is counted by archive/platform (owner decision, contract 1.1.0), not by source record.
  const pilotGate = { ...gate, eligible: counts.eligibleGlyphObservations, independentInstitutions: counts.glyphInstitutions, open: counts.eligibleGlyphObservations >= gate.minEligibleGlyphObservations && counts.glyphInstitutions >= gate.minIndependentInstitutions };

  // ---- output: display fields only ----
  const decade = (d) => (d && /^\d{4}$/.test(d) ? `${d.slice(0, 3)}0er` : null);
  const usedSources = [...new Set([...specById.values()].map((s) => s.sourceRecordId))].filter((id) => srcById.has(id)).sort();
  const data = {
    comparisonSchemaVersion: COMPARISON_SCHEMA_VERSION,
    contract: `${contract.contractId}@${contract.version}`,
    language: lang,
    generatedFrom: inputFiles.map((f) => ({ path: f.path, sha256: sha256Hex(f.text) })).sort((a, b) => a.path.localeCompare(b.path)),
    labels: LABELS_DE,
    counts,
    pilotGate,
    sources: usedSources.map((id) => { const s = srcById.get(id); return { id, title: s.title, institution: s.institution, url: s.url }; }),
    specimens: [...specById.values()].map((s) => ({
      id: s.id, sourceRecordId: s.sourceRecordId, institution: srcById.get(s.sourceRecordId)?.institution ?? null, itemUrl: s.itemUrl, title: s.title,
      creatorName: s.creatorName, creatorAttribution: s.creatorAttribution, photographerName: s.photographerName,
      date: s.date, dateQualifier: s.dateQualifier, decade: decade(s.date), place: s.place, identifier: s.identifier,
      visualState: s.visualState, archiveStyleLabel: s.archiveStyleLabel, imageRights: s.imageRights, displayMode: s.displayMode, accessDate: s.accessDate,
      observationIds: objectObs.filter((o) => o.specimenId === s.id).map((o) => o.id),
      glyphObservationIds: glyphObs.filter((g) => g.specimenId === s.id).map((g) => g.id),
    })).sort((a, b) => a.id.localeCompare(b.id)),
    objectObservations: objectObs.map(({ id, specimenId, kind, confidence, observationDe, editorialState }) => ({ id, specimenId, kind, confidence, observationDe, editorialState })).sort((a, b) => a.id.localeCompare(b.id)),
    glyphObservations: glyphObs.map(({ id, specimenId, glyph, transcriptionConfidence, legibility, observationDe, features = [], editorialState }) => ({ id, specimenId, glyph, transcriptionConfidence, legibility, observationDe, features, editorialState })).sort((a, b) => a.id.localeCompare(b.id)),
    findings: findingsOut.map(({ id, axis, observationIds, findingDe, evidenceBasisDe, limitationDe, confidence, generatorRelevance, relatedEntries = [], editorialState }) => ({ id, axis, observationIds, findingDe, evidenceBasisDe, limitationDe, confidence, generatorRelevance, relatedEntries, editorialState })).sort((a, b) => a.id.localeCompare(b.id)),
  };
  return { data, diagnostics: diags, ok: !diags.some((d) => d.severity === 'error') };
}
