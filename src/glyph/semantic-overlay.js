// Ticket 0.7A-T03: semantic graph overlays and topology declarations.
//
// Attaches provisional component proposals, junction candidates, identity
// constraints and a declared topology signature to imported glyph records.
// Geometry is never touched: the overlay only adds references to existing
// contour/segment/node IDs. Mappings that are not topologically determined
// stay `provisional-unmapped` and carry reviewable `candidateGeometryRefs`.

import { contourId, glyphPrefix, glyphId as toGlyphId } from './ids.js';

export const OVERLAY_APPLIER_VERSION = 'semantic-overlay/1.0.0';
export const MAPPING_STATUS = ['mapped', 'provisional-unmapped', 'pending-classification'];

export const componentId = (ch, name) => `${glyphPrefix(ch)}.component.${name}`;
export const junctionId = (ch, name) => `${glyphPrefix(ch)}.junction.${name}`;
export const constraintId = (ch, name) => `${glyphPrefix(ch)}.constraint.${name}`;

/** Resolve overlay shorthand ("outer#01", "outer@03", "counter.primary") to stable IDs. */
export function resolveRef(ch, ref) {
  const seg = ref.match(/^([a-z0-9.-]+)#(\d{2})$/);
  if (seg) return `${contourId(ch, seg[1])}.seg.${seg[2]}`;
  const node = ref.match(/^([a-z0-9.-]+)@(\d{2})$/);
  if (node) return `${contourId(ch, node[1])}.node.${node[2]}`;
  if (/^[a-z0-9.-]+$/.test(ref)) return contourId(ch, ref);
  throw new Error(`Invalid overlay reference "${ref}"`);
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Apply the overlay to imported records. Returns new records (inputs untouched).
 * @param {object[]} records imported GlyphDefinition records
 * @param {object} overlay data/semantic/abgrs-semantic-overlay.v1.json
 * @param {{parameterContract:object, validationContract:object}} contracts
 */
export function applySemanticOverlay(records, overlay, { parameterContract, validationContract }) {
  const invariantsByGlyph = new Map(parameterContract.glyphs.map((g) => [g.glyphId, g]));
  const profiles = validationContract.glyphIdentityProfiles;

  return records.map((rec) => {
    const spec = overlay.glyphs[rec.character];
    if (!spec) return rec;
    const ch = rec.character;
    const g = structuredClone(rec);
    const sg = g.semanticGraph;
    const cid = (n) => componentId(ch, n);

    sg.components = spec.components.map((c) => ({
      id: cid(c.name),
      role: c.role,
      label: c.name,
      required: c.required,
      mappingStatus: c.mapping,
      geometryRefs: c.mapping === 'mapped' ? c.refs.map((r) => resolveRef(ch, r)) : [],
      candidateGeometryRefs: (c.candidateRefs ?? []).map((r) => resolveRef(ch, r)),
      mappingBasis: c.basis,
      connectsTo: c.connectsTo.map(cid),
      confidence: 'provisional',
    }));
    sg.componentStatus = 'provisional-proposals-declared';

    sg.junctions = spec.junctions.map((j) => ({
      id: junctionId(ch, j.name),
      kind: j.kind,
      componentIds: j.components.map(cid),
      position: null,
      candidateNodeRefs: j.candidateNodeRefs.map((r) => resolveRef(ch, r)),
      confidence: 'provisional',
    }));

    for (const ns of sg.negativeSpaces) {
      const contourName = ns.geometryRef?.split('.contour.')[1];
      const names = spec.negativeSpaceBoundaries[contourName];
      if (names) ns.boundaryComponentIds = names.map(cid);
    }

    // Identity invariants (parameter contract) and per-counter protection.
    const inv = invariantsByGlyph.get(rec.glyphId)?.identityInvariants ?? [];
    sg.constraints = [
      ...inv.map((text) => ({
        id: constraintId(ch, `identity.${slug(text).slice(0, 48)}`),
        kind: 'identity-invariant',
        description: text,
        targetIds: sg.components.filter((c) => c.required).map((c) => c.id),
        severity: 'error',
        status: 'declared-unverified',
        source: 'contracts/glyph-parameter-contract.v1.json',
      })),
      ...sg.negativeSpaces.filter((n) => n.kind === 'counter').map((n) => ({
        id: constraintId(ch, `preserve.${n.id.split('.negative.')[1]}`),
        kind: 'preserve-counter',
        description: `Counter ${n.id} must remain a bounded, enclosed face.`,
        targetIds: [n.id],
        severity: 'error',
        status: 'declared-unverified',
        source: 'contracts/abgrs-glyph-construction.v1.json',
      })),
    ];
    if (ch === 'G') {
      sg.constraints.push({
        id: constraintId(ch, 'preserve.aperture'),
        kind: 'preserve-aperture',
        description: 'Aperture must stay exterior-connected once classified. Pending classification (AUD-01).',
        targetIds: [cid('aperture-boundary')],
        severity: 'error',
        status: 'pending-classification',
        source: 'contracts/glyph-geometry-validation.v1.json',
      });
    }

    // Declared topology signature (fields per validation contract topologyModel).
    const profile = profiles[rec.glyphId];
    sg.topology.signature = {
      connectedComponentCount: spec.expectedConnectedComponents,
      requiredCounterIds: sg.topology.counterIds.slice(),
      requiredApertureIds: sg.topology.apertureIds.slice(),
      requiredChannelRelations: [],
      declaredCrossings: [],
      declaredJunctions: sg.junctions.map((j) => j.id),
      fillRule: sg.topology.fillRule,
      status: 'declared-unverified',
    };
    sg.identityProfile = {
      source: 'contracts/glyph-geometry-validation.v1.json#glyphIdentityProfiles',
      required: profile.required,
      expectedNegativeSpace: profile.negativeSpace,
      checks: profile.checks.map((name) => ({ name, status: 'pending-validator' })),
    };
    if (spec.apertureInterpretation) {
      sg.apertureInterpretation = {
        ...structuredClone(spec.apertureInterpretation),
        gatedOperations: spec.apertureInterpretation.gatedOperations.map((op) => ({ operationId: op, commitAllowed: false })),
      };
    }

    g.revision = rec.revision + 1;
    g.provenance.push({
      id: `prov.semantic-overlay.${ch}`,
      kind: 'derived',
      sourcePath: 'data/semantic/abgrs-semantic-overlay.v1.json',
      claim: `Provisional engineering component proposals for ${ch} (${overlay.overlayId} ${overlay.version}).`,
      evidenceGrade: 'not-applicable',
      rightsStatus: 'original',
      notes: `Applied by ${OVERLAY_APPLIER_VERSION}. Not semantically reviewed; geometry unchanged.`,
    });
    return g;
  });
}

/**
 * Structured identity/topology report for one glyph, comparing the declared
 * topology against the contract identity profile. Counters, apertures and
 * channels are reported separately. Nothing here measures geometry (T04).
 */
export function topologyReport(rec) {
  const sg = rec.semanticGraph;
  const t = sg.topology;
  const findings = [];
  const add = (code, severity, affectedIds, message, extra = {}) =>
    findings.push({ code, severity, glyphId: rec.glyphId, affectedIds, message, ...extra });

  const expected = sg.identityProfile?.expectedNegativeSpace;
  const counters = sg.negativeSpaces.filter((n) => n.kind === 'counter');
  const apertures = sg.negativeSpaces.filter((n) => n.kind === 'aperture');
  const channels = sg.negativeSpaces.filter((n) => n.kind === 'channel');

  if (expected) {
    if (expected.counterCount === counters.length) {
      add('TOPO_COUNTER_COUNT_DECLARED', 'info', counters.length ? counters.map((c) => c.id) : [rec.glyphId], `Declared ${counters.length} counter(s), matching the identity profile.`);
    } else {
      add('VAL_TOPOLOGY_MISMATCH', 'error', [rec.glyphId], `Declared ${counters.length} counter(s); identity profile expects ${expected.counterCount}.`);
    }
    if (typeof expected.apertureCount === 'number' && expected.apertureCount !== apertures.length) {
      if (t.apertureStatus === 'interpretation-required') {
        add('TOPO_APERTURE_UNRESOLVED', 'warning', [rec.glyphId],
          `Identity profile expects ${expected.apertureCount} aperture(s); classification is pending, so the aperture is not reported as passing.`,
          { blockers: sg.apertureInterpretation?.blockers ?? [] });
      } else {
        add('VAL_TOPOLOGY_MISMATCH', 'error', [rec.glyphId], `Declared ${apertures.length} aperture(s); identity profile expects ${expected.apertureCount}.`);
      }
    }
  }

  const unmapped = sg.components.filter((c) => c.mappingStatus !== 'mapped');
  if (unmapped.length) {
    add('SEM_COMPONENTS_UNMAPPED', 'warning', unmapped.map((c) => c.id),
      `${unmapped.length} of ${sg.components.length} components are not mapped to geometry; candidates await semantic review.`);
  }
  for (const c of sg.constraints.filter((x) => x.status !== 'verified')) {
    add('SEM_CONSTRAINT_UNVERIFIED', 'info', [c.id], `${c.kind}: ${c.description} (${c.status})`);
  }

  return {
    glyphId: rec.glyphId,
    maturity: rec.maturity,
    negativeSpace: {
      counters: counters.map((c) => ({ id: c.id, status: c.status, boundaryComponentIds: c.boundaryComponentIds })),
      apertures: { status: t.apertureStatus, ids: apertures.map((a) => a.id) },
      channels: channels.map((c) => c.id),
      counterStatus: t.counterStatus,
    },
    components: {
      total: sg.components.length,
      mapped: sg.components.filter((c) => c.mappingStatus === 'mapped').map((c) => c.id),
      unmapped: unmapped.map((c) => c.id),
    },
    signature: t.signature ?? null,
    findings,
  };
}

export const abgrsGlyphIds = (overlay) => Object.keys(overlay.glyphs).map(toGlyphId);
