// One-time, deterministic migration of the PR #25 research manifest (graffiti-reference-manifest-01.json,
// schema 1.0.0) into the typed comparison sidecar (letterform-comparison v1). Pure; no I/O.
// See docs/lettering/style-library/ADR_LETTERFORM_COMPARISON_LIBRARY_GATE0_01.md §2.4.
// Nothing is lost: every original value is kept in a `…Raw` field. Free-text glyph notes are NOT turned
// into glyph observations; those are created only from new, eligible research observations.

export const MIGRATION_VERSION = 'comparison-migration/1.0.0';
// (1.0.0 includes identifier normalisation: NGA accession numbers kept, Letterform Archive captions moved to raw.)

/** Review-status mapping (8 spellings → 4 states of the spec). */
export function mapVisualState(raw) {
  const r = String(raw).toLowerCase();
  if (/hi_fi_(gallery_)?images?_opened|individual_image_opened/.test(r)) return 'hi_fi_image_opened_and_inspected';
  if (/search_preview_reviewed/.test(r)) return 'image_preview_seen';
  if (/metadata_verified_image_not_inspected|nga.catalogue.visual.description/.test(r)) return 'catalogue_metadata_only';
  throw new Error(`Unmapped visual review status: ${raw}`);
}

/** Rights mapping onto the archive's IMAGE_RIGHTS; the original wording stays in rightsNoteRaw. */
export function mapRights(raw) {
  const r = String(raw).toLowerCase();
  if (r.startsWith('link-only')) return 'link-only';
  if (/appointment required|media unavailable for download/.test(r)) return 'rights-unknown';
  throw new Error(`Unmapped rights status: ${raw}`);
}

/** "Edec (writer)" → { name, attribution }. */
export function mapCreator(raw) {
  const r = String(raw).trim();
  if (/^unknown/i.test(r)) return { name: null, attribution: 'unknown' };
  if (/^as titled in/i.test(r)) return { name: null, attribution: 'catalogue-title-only' };
  const name = r.replace(/\s*\(.*$/, '').trim();
  const attribution = /catalogue title|should not be assumed|not .*verif/i.test(r) ? 'catalogue-title-only' : 'named-by-source';
  return { name: name || null, attribution };
}

/** Photographer / archive credit → person name or null when the credit is only an archive record. */
export function mapPhotoCredit(raw) {
  const r = String(raw).trim();
  if (/^letterform archive (collection record|gallery caption)/i.test(r)) return null;
  return r.replace(/\s*\(.*$/, '').trim() || null;
}

export function mapDate(raw) {
  const r = String(raw).trim();
  if (!r || /^unknown$/i.test(r)) return { value: null, qualifier: 'unknown' };
  const m = r.match(/^(?:circa|ca\.?)\s*(\d{4})$/i);
  if (m) return { value: m[1], qualifier: 'circa' };
  if (/^\d{4}$/.test(r)) return { value: r, qualifier: 'as-catalogued' };
  return { value: r, qualifier: 'as-catalogued' };
}

/** Keep real inventory numbers; descriptive archive captions are not identifiers (kept in raw). */
export function mapIdentifier(raw) {
  const r = String(raw ?? '').trim();
  const nga = r.match(/^NGA (?:accession|object) (.+)$/);
  if (nga) return nga[1];
  if (/^Letterform Archive/i.test(r)) return null;
  return r || null;
}

export const mapPlace = (raw) => (!raw || /^unknown$/i.test(String(raw).trim()) ? null : String(raw).trim());

const archiveStyleLabel = (s) => (/archive_style_label_explicit/.test(s.visual_review_status) && /throw-?up/i.test(s.archive_title) ? 'Throw-up' : null);

/**
 * @param {object} manifest graffiti-reference-manifest-01.json
 * @returns {{sources, specimens, observations, findings, report}}
 */
export function migrateManifest(manifest) {
  if (manifest.schema_version !== '1.0.0') throw new Error(`Unexpected manifest schema ${manifest.schema_version}`);
  const visualMap = {}, rightsMap = {};
  const sources = manifest.source_records.map((r) => ({
    id: r.id,
    title: r.title,
    institution: r.title.split(' — ')[0].trim(),
    url: r.url,
    sourceType: r.source_type,
    scope: r.source_scope,
    targetGrammarsRaw: r.target_grammars,
    evidenceRaw: r.evidence,
    rightsRaw: r.rights_status,
    confidenceRaw: r.confidence,
    nextActionRaw: r.next_action,
  })).sort((a, b) => a.id.localeCompare(b.id));

  const specimens = manifest.specimens.map((s) => {
    const visualState = mapVisualState(s.visual_review_status);
    const rights = mapRights(s.rights_status);
    (visualMap[s.visual_review_status] ??= { to: visualState, count: 0 }).count++;
    (rightsMap[s.rights_status] ??= { to: rights, count: 0 }).count++;
    const creator = mapCreator(s.creator_or_writer), date = mapDate(s.date);
    return {
      id: s.specimen_id,
      sourceRecordId: s.source_record_id,
      itemUrl: s.item_url,
      title: s.archive_title,
      creatorName: creator.name,
      creatorAttribution: creator.attribution,
      photographerName: mapPhotoCredit(s.photographer_or_archive_credit),
      date: date.value,
      dateQualifier: date.qualifier,
      place: mapPlace(s.place),
      identifier: mapIdentifier(s.identifier),
      visualState,
      archiveStyleLabel: archiveStyleLabel(s),
      imageRights: rights,
      displayMode: 'link-only',
      accessDate: s.access_date ?? null,
      // Original research values, kept verbatim (English research notes; not displayed).
      raw: {
        creator: s.creator_or_writer, photographerCredit: s.photographer_or_archive_credit, date: s.date, place: s.place,
        identifier: s.identifier, dimensions: s.dimensions ?? null, visualReviewStatus: s.visual_review_status, rightsStatus: s.rights_status,
        visibleGlyphs: s.visible_glyphs, candidateGrammarTags: s.candidate_grammar_tags, executionFormat: s.execution_format,
        compositionMode: s.composition_mode, renderingTreatment: s.rendering_treatment, letterAnatomyNotes: s.letter_anatomy_notes,
        wordCompositionNotes: s.word_composition_notes, whatNotToCopy: s.what_not_to_copy, confidence: s.confidence, viewUrl: s.view_url ?? null,
      },
    };
  }).sort((a, b) => a.id.localeCompare(b.id));

  const report = {
    migrationVersion: MIGRATION_VERSION,
    input: { schemaVersion: manifest.schema_version, reviewedAt: manifest.reviewed_at, sources: manifest.source_records.length, specimens: manifest.specimens.length },
    visualStateMapping: visualMap,
    rightsMapping: rightsMap,
    notMigrated: {
      glyphObservations: 'visible_glyphs is free text in every record; no glyph observation is derived from it',
      styleTargets: 'style_targets (acquisition goals) stay in the legacy snapshot; they are research planning, not archive data',
    },
    needsConfirmation: Object.keys(visualMap).filter((k) => /nga.catalogue.visual.description/i.test(k)),
  };
  return {
    sources: { schemaVersion: '1.0', sources },
    specimens: { schemaVersion: '1.0', specimens },
    observations: { schemaVersion: '1.0', objectObservations: [], glyphObservations: [] },
    findings: { schemaVersion: '1.0', findings: [] },
    report,
  };
}
