// GlyphRegistry: immutable, validated set of canonical glyph definitions.
// No DOM or Three.js dependency; runs identically in Node and the browser.

import { deepFreeze, stableStringify } from '../core/stable-json.js';
import { ALPHABET, glyphId as toGlyphId } from './ids.js';
import { importLegacyV06, IMPORTER_VERSION, GLYPH_SCHEMA_VERSION } from './import-v06.js';
import { validateRecords } from './schema.js';
import { applySemanticOverlay, OVERLAY_APPLIER_VERSION } from './semantic-overlay.js';

export const REGISTRY_SCHEMA_VERSION = '1.0';

export class GlyphRegistry {
  /** @param {object[]} records canonical GlyphDefinition records */
  constructor(records, meta = {}) {
    const clone = structuredClone(records);
    this.meta = deepFreeze({ registrySchemaVersion: REGISTRY_SCHEMA_VERSION, glyphSchemaVersion: GLYPH_SCHEMA_VERSION, ...meta });
    this.diagnostics = deepFreeze(validateRecords(clone));
    this._byId = new Map(clone.map((g) => [g.glyphId, deepFreeze(g)]));
    if (this._byId.size !== clone.length) throw new Error('Duplicate glyph IDs in registry input');
  }

  static fromLegacyV06(snapshot) {
    return new GlyphRegistry(importLegacyV06(snapshot), {
      source: snapshot.snapshotId,
      sourceSha256: snapshot.source.sha256,
      importer: IMPORTER_VERSION,
    });
  }

  /**
   * Import v0.6 and apply the A/B/G/R/S semantic overlay (T03).
   * @param {{snapshot:object, overlay:object, parameterContract:object, validationContract:object}} inputs
   */
  static build({ snapshot, overlay, parameterContract, validationContract }) {
    const records = applySemanticOverlay(importLegacyV06(snapshot), overlay, { parameterContract, validationContract });
    return new GlyphRegistry(records, {
      source: snapshot.snapshotId,
      sourceSha256: snapshot.source.sha256,
      importer: IMPORTER_VERSION,
      semanticOverlay: `${overlay.overlayId}@${overlay.version}`,
      overlayApplier: OVERLAY_APPLIER_VERSION,
    });
  }

  /** Errors only (warnings/info are carried as importDiagnostics on records). */
  get errors() { return this.diagnostics.filter((d) => d.severity === 'error'); }
  get isValid() { return this.errors.length === 0; }

  has(id) { return this._byId.has(id); }
  get(id) {
    const g = this._byId.get(id);
    if (!g) throw new Error(`Unknown glyph ID ${id}`);
    return g;
  }
  getByChar(ch) { return this.get(toGlyphId(ch)); }
  getVariant(id, variantId) {
    const v = this.get(id).variants.find((x) => x.variantId === variantId);
    if (!v) throw new Error(`Unknown variant ${variantId} for ${id}`);
    return v;
  }
  list() { return [...this._byId.values()]; }

  /** A–Z coverage vs. maturity summary (coverage is not maturity). */
  inventory() {
    return [...ALPHABET].map((ch) => {
      const id = toGlyphId(ch);
      if (!this._byId.has(id)) return { glyphId: id, character: ch, present: false };
      const g = this._byId.get(id);
      const t = g.semanticGraph.topology;
      return {
        glyphId: id,
        character: ch,
        present: true,
        maturity: g.maturity,
        geometryStatus: g.geometryStatus,
        variants: g.variants.map((v) => v.variantId),
        editability: g.variants[0].geometry.editability,
        contours: t.contourCount,
        counters: t.counterIds.length,
        counterStatus: t.counterStatus,
        apertureStatus: t.apertureStatus,
        components: g.semanticGraph.components.length,
        componentsMapped: g.semanticGraph.components.filter((c) => c.mappingStatus === 'mapped').length,
        warnings: g.importDiagnostics.filter((d) => d.severity === 'warning').map((d) => d.code),
      };
    });
  }

  toJSON() {
    return { ...this.meta, glyphs: this.list() };
  }
  serialize() { return stableStringify(this.toJSON(), 2); }

  static fromJSON(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    if (obj.registrySchemaVersion !== REGISTRY_SCHEMA_VERSION) {
      throw new Error(`Unsupported registry schema ${obj.registrySchemaVersion}`);
    }
    const { glyphs, ...meta } = obj;
    return new GlyphRegistry(glyphs, meta);
  }
}
