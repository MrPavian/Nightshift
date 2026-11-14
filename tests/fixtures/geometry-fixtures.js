// Synthetic glyph records for the validator fixtures required by
// contracts/glyph-geometry-validation.v1.json#requiredFixtures.
import { parsePath } from '../../src/geometry/svg-path.js';
import { buildContour } from '../../src/glyph/import-v06.js';

/**
 * @param {object} o
 * @param {string} [o.ch='X'] glyph character
 * @param {string[]} o.outer outer contour paths
 * @param {string[]} [o.counters] counter contour paths (declared as counters)
 * @param {object[]} [o.apertures] declared aperture entities
 * @param {object[]} [o.channels] declared channel entities
 */
export function fixtureGlyph({ ch = 'X', outer, counters = [], apertures = [], channels = [], fillRule = 'evenodd',
  apertureStatus, declaredCrossings = [], anchors = [], checks = [], expectedComponents = 1, closed = true }) {
  const contours = [];
  outer.forEach((d, i) => {
    const c = buildContour(`glyph.${ch}.contour.outer${i ? `.${i + 1}` : ''}`, 'outer', parsePath(d)[0].segments);
    contours.push(c);
  });
  counters.forEach((d, i) => contours.push(buildContour(`glyph.${ch}.contour.counter.c${i + 1}`, 'counter', parsePath(d)[0].segments)));
  if (!closed) {
    contours[0].segments.pop();
    contours[0].closed = false;
  }
  const negativeSpaces = [
    ...counters.map((_, i) => ({ id: `glyph.${ch}.negative.counter.c${i + 1}`, kind: 'counter', status: 'provisional',
      geometryRef: `glyph.${ch}.contour.counter.c${i + 1}`, boundaryComponentIds: [], protected: true })),
    ...apertures.map((a, i) => ({ id: `glyph.${ch}.negative.aperture.a${i + 1}`, kind: 'aperture', status: 'provisional', boundaryComponentIds: [], protected: true, ...a })),
    ...channels.map((a, i) => ({ id: `glyph.${ch}.negative.channel.h${i + 1}`, kind: 'channel', status: 'provisional', boundaryComponentIds: [], protected: false, ...a })),
  ];
  const counterIds = negativeSpaces.filter((n) => n.kind === 'counter').map((n) => n.id);
  const apertureIds = negativeSpaces.filter((n) => n.kind === 'aperture').map((n) => n.id);
  return {
    schemaVersion: '1.0',
    glyphId: `latin.upper.${ch}`,
    character: ch,
    script: 'Latin',
    case: 'uppercase',
    displayName: `fixture ${ch}`,
    maturity: 'provisional',
    geometryStatus: 'draft',
    revision: 1,
    coordinateSystem: { frameId: 'fixture', unitsPerEm: null, origin: { x: 0, y: 0 }, positiveYDirection: 'down', baselineY: null, capHeightY: null, calibrated: false },
    baseMetrics: { advanceWidth: null, visibleBounds: null, sideBearingStart: null, sideBearingEnd: null, capHeight: null, measurementMethod: 'fixture', calibrated: false },
    semanticGraph: {
      components: [], junctions: [], negativeSpaces, anchors, constraints: [],
      topology: {
        contourCount: contours.length, connectedComponentCount: null, counterIds, apertureIds, fillRule,
        counterStatus: counterIds.length ? 'provisional-declared' : 'none-in-master',
        apertureStatus: apertureStatus ?? (apertureIds.length ? 'classified' : 'none-declared'),
        analysisStatus: 'declared-not-analysed',
        signature: { connectedComponentCount: expectedComponents, requiredCounterIds: counterIds, requiredApertureIds: apertureIds,
          requiredChannelRelations: [], declaredCrossings, declaredJunctions: [], fillRule, status: 'declared-unverified' },
      },
      identityProfile: { checks: checks.map((name) => ({ name, status: 'pending-validator' })) },
    },
    variants: [{ variantId: `${ch.toLowerCase()}.fixture`, label: 'fixture', maturity: 'provisional',
      geometry: { format: 'path-segments', editability: 'fully-editable', contours },
      styleCompatibility: [], identityInvariants: [], deliberateChanges: ['fixture'], seedPolicy: 'none', provenanceRefs: [] }],
    provenance: [], review: [], importDiagnostics: [],
  };
}

export const SQUARE = 'M0 0 L100 0 L100 100 L0 100 Z';
export const C_SHAPE = 'M0 0 L100 0 L100 30 L30 30 L30 70 L100 70 L100 100 L0 100 Z';
export const BOWTIE = 'M0 0 L100 100 L100 0 L0 100 Z';
