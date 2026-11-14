// Stable ID conventions (see research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md §2).
// IDs identify entities, never array positions in a mutable list. Segment and
// node IDs of imported contours are assigned once from the immutable legacy
// snapshot order; later edits must keep existing IDs and mint new ones for
// inserted segments instead of renumbering.

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const AUTHORED_LEGACY_SET = ['A', 'B', 'G', 'R', 'S'];

export const glyphId = (ch) => `latin.upper.${ch}`;
export const glyphPrefix = (ch) => `glyph.${ch}`;
export const masterVariantId = (ch) => `${ch.toLowerCase()}.master`;
export const provisionalVariantId = (ch) => `${ch.toLowerCase()}.provisional`;
export const contourId = (ch, name) => `${glyphPrefix(ch)}.contour.${name}`;
export const negativeSpaceId = (ch, kind, name) => `${glyphPrefix(ch)}.negative.${kind}.${name}`;
export const segmentId = (contour, n) => `${contour}.seg.${String(n).padStart(2, '0')}`;
export const nodeId = (contour, n) => `${contour}.node.${String(n).padStart(2, '0')}`;

export const ID_PATTERNS = {
  glyphId: /^latin\.upper\.[A-Z]$/,
  variantId: /^[a-z]\.[a-z0-9]+(?:-[a-z0-9]+)*$/,
  scoped: (ch) => new RegExp(`^glyph\\.${ch}\\.[a-z0-9.-]+$`),
};

/** Character for a stable glyph ID, e.g. "latin.upper.G" -> "G". */
export const charOf = (id) => id.slice(-1);
