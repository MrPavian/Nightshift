// Proof run builder (Ticket 0.7A-T06): fixtures → specimens → plates + manifest.
// Deterministic: identical canonical inputs and settings give identical run IDs,
// specimen IDs, plates and hashes. No timestamps are inputs.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { VALIDATOR_VERSION } from '../glyph/validate-geometry.js';
import { RENDER_MODEL_VERSION } from '../render/render-model.js';
import { resolveGlyphs, buildSpecimen, LAYOUT_VERSION } from './specimens.js';
import { identityPlate, semanticPlate, contextPlate, PLATE_RENDERER_VERSION } from './plates.js';
import { REVIEW_SCHEMA_VERSION, blankReview } from './review.js';

export const RUN_SCHEMA_VERSION = '1.0';
export const RENDER_PROFILE = {
  id: 'neutral-light/1.0.0',
  background: '#f2efe6',
  ink: { authored: '#111111', provisional: '#8f8a7e' },
  effects: false,
  projection: 'orthographic',
  sizes: { full: 'native legacy units ×2 px', thumbnail: '0.18 × native' },
};

const AUTHORED = ['A', 'B', 'G', 'R', 'S'];

/**
 * @param {{registry, profile, fixturesContract}} inputs
 * @returns {{manifest:object, files:Record<string,string>}} files keyed by path relative to the run directory
 */
export function buildProofRun({ registry, profile, fixturesContract }) {
  const pairs = fixturesContract.fixtures.pairs.map((f) => ({ ...f, family: 'pair-context' }));
  const words = fixturesContract.fixtures.words.map((f) => ({ ...f, family: 'word-context' }));
  const isolated = AUTHORED.map((ch) => ({ fixtureId: `glyph-${ch.toLowerCase()}`, text: ch, family: 'glyph-identity' }));
  const chars = [...isolated, ...pairs, ...words].flatMap((f) => [...f.text]);
  const resolved = resolveGlyphs(registry, profile, chars);

  const sourceRevision = sha256Hex(registry.serialize());
  const engineVersions = {
    glyphLibrary: `${registry.meta.importer}; ${registry.meta.semanticOverlay}`,
    grammar: 'none (no style grammar in 0.7A)',
    generator: 'none (legacy import, no procedural generation)',
    relationshipSolver: `none — ${LAYOUT_VERSION}`,
    geometryValidator: `${VALIDATOR_VERSION}; ${profile.profileId}@${profile.version}`,
    renderer: `${RENDER_MODEL_VERSION}; ${PLATE_RENDERER_VERSION}`,
  };
  const runIdentity = { schemaVersion: RUN_SCHEMA_VERSION, sourceRevision, engineVersions, renderProfile: RENDER_PROFILE, fixtures: [...isolated, ...pairs, ...words].map((f) => f.fixtureId), rootSeed: 0 };
  const runId = `run.0.7A-T06.${sha256Hex(stableStringify(runIdentity)).slice(0, 12)}`;

  const spec = (f) => buildSpecimen(f, resolved, RENDER_PROFILE.id);
  const isoSpecs = isolated.map(spec), pairSpecs = pairs.map(spec), wordSpecs = words.map(spec);

  const files = {};
  files['plates/glyph-identity.svg'] = identityPlate(isoSpecs, resolved, runId);
  files['plates/semantic-topology.svg'] = semanticPlate(isoSpecs, resolved, runId);
  files['plates/pair-context.svg'] = contextPlate(pairSpecs, resolved, runId, { title: 'Pair context — canonical pair fixtures (naive layout)', columns: 3, scale: 0.6 });
  files['plates/word-context.svg'] = contextPlate(wordSpecs, resolved, runId, { title: 'Word context — canonical word fixtures (naive layout)', columns: 2, scale: 0.5 });
  const validationRefs = {};
  for (const [ch, r] of [...resolved.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const path = `validation/${ch}.json`;
    files[path] = stableStringify(r.report, 2) + '\n';
    validationRefs[r.glyph.glyphId] = { path, hardChecksPassed: r.report.hardChecksPassed, renderStatus: r.status, refusal: r.reason };
  }
  const specimens = [...isoSpecs, ...pairSpecs, ...wordSpecs];
  const plateOf = (s) => (s.family === 'glyph-identity' ? ['plates/glyph-identity.svg', 'plates/semantic-topology.svg'] : s.family === 'pair-context' ? ['plates/pair-context.svg'] : ['plates/word-context.svg']);

  const manifest = {
    runId,
    schemaVersion: RUN_SCHEMA_VERSION,
    contract: ['contracts/proof-sheet-run.v1.json', 'contracts/proof-sheet-fixtures.v1.json'],
    sourceRevision: { kind: 'registry-content-sha256', value: sourceRevision },
    canonicalSnapshotRef: { snapshotId: registry.meta.source, sha256: registry.meta.sourceSha256 },
    engineVersions,
    rootSeed: 0,
    seedDerivationVersion: 'none — no randomness is used in 0.7A proof runs',
    renderProfile: RENDER_PROFILE,
    fixtureIds: specimens.map((s) => s.fixtureId),
    specimens: specimens.map((s) => ({ ...s, plates: plateOf(s), validationReportRefs: [...new Set(s.slots.map((x) => validationRefs[x.glyphId].path))] })),
    validationReportRefs: validationRefs,
    coverage: {
      authoredContourGlyphs: AUTHORED,
      pairs: Object.fromEntries(pairSpecs.map((s) => [s.text, s.coverage])),
      words: Object.fromEntries(wordSpecs.map((s) => [s.text, s.coverage])),
      missingGlyphs: [...resolved.values()].filter((r) => r.status === 'missing').map((r) => ({ glyphId: r.glyph.glyphId, reason: r.reason })),
    },
    proofFamilies: {
      implemented: ['glyph-identity', 'semantic-topology', 'pair-context', 'word-context', 'thumbnail (inside glyph-identity)'],
      notImplemented: {
        'parameter-sweep': 'no parameter operations exist yet (T07+)',
        'grammar-comparison': 'no style grammars implemented (0.7B)',
        'finish-isolation': 'no finish passes beyond monochrome (later)',
        'boundary-regression': 'no previous accepted run to compare against',
      },
    },
    review: {
      status: 'pending',
      schemaVersion: REVIEW_SCHEMA_VERSION,
      records: 'review/ratings.json',
      template: 'review/review-template.json',
      automatedMaturityPromotion: false,
      note: 'Automated checks and these plates are evidence, not approval. Maturity changes only through an explicit, recorded human decision.',
    },
  };
  files['review/review-template.json'] = stableStringify(isoSpecs.map((s) => blankReview(manifest, s)), 2) + '\n';
  files['review/ratings.json'] = '[]\n';
  manifest.artifactHashes = Object.fromEntries(Object.keys(files).filter((p) => p !== 'review/ratings.json').sort().map((p) => [p, sha256Hex(files[p])]));
  files['manifest.json'] = stableStringify(manifest, 2) + '\n';
  files['checksums.json'] = stableStringify({ runId, 'manifest.json': sha256Hex(files['manifest.json']), ...manifest.artifactHashes }, 2) + '\n';
  return { manifest, files };
}
