/**
 * GlyphRegistry — A–Z canonical glyph records, keyed by stable glyph ID.
 * Pure data module (no DOM, no three.js). Records are deep-frozen; edits will go through
 * the EditCommandBus (T07), never by mutating these objects.
 */
import { importV06 } from '../legacy/import.ts';
import {
  SCHEMA_VERSION,
  type GlyphDefinition,
  type GlyphId,
  type GlyphRegistrySnapshot,
  type GlyphVariant,
  type Maturity,
} from '../schema/types.ts';

function deepFreeze<T>(o: T): T {
  if (o && typeof o === 'object' && !Object.isFrozen(o)) {
    Object.freeze(o);
    for (const v of Object.values(o)) deepFreeze(v);
  }
  return o;
}

export class GlyphRegistry {
  readonly registryRevision: number;
  private readonly byId: ReadonlyMap<GlyphId, GlyphDefinition>;

  private constructor(glyphs: GlyphDefinition[], registryRevision: number) {
    const map = new Map<GlyphId, GlyphDefinition>();
    for (const g of glyphs) {
      if (map.has(g.glyphId)) throw new Error(`registry: duplicate glyph ID ${g.glyphId}`);
      map.set(g.glyphId, deepFreeze(g));
    }
    assertUniqueIds(glyphs);
    this.byId = map;
    this.registryRevision = registryRevision;
  }

  static fromLegacyV06(): GlyphRegistry {
    return new GlyphRegistry(importV06(), 1);
  }

  static fromSnapshot(s: GlyphRegistrySnapshot): GlyphRegistry {
    if (s.schemaVersion !== SCHEMA_VERSION) throw new Error(`registry: unsupported schema ${String(s.schemaVersion)}`);
    return new GlyphRegistry(structuredClone(s.glyphs), s.registryRevision);
  }

  get(id: GlyphId): GlyphDefinition {
    const g = this.byId.get(id);
    if (!g) throw new Error(`registry: unknown glyph ${id}`);
    return g;
  }

  has(id: string): id is GlyphId {
    return this.byId.has(id as GlyphId);
  }

  ids(): GlyphId[] {
    return [...this.byId.keys()];
  }

  all(): GlyphDefinition[] {
    return [...this.byId.values()];
  }

  variant(id: GlyphId, variantId?: string): GlyphVariant {
    const g = this.get(id);
    const v = variantId ? g.variants.find((x) => x.variantId === variantId) : g.variants[0];
    if (!v) throw new Error(`registry: unknown variant ${variantId ?? '(default)'} for ${id}`);
    return v;
  }

  maturityInventory(): Record<string, Maturity> {
    return Object.fromEntries(this.all().map((g) => [g.character, g.maturity]));
  }

  toSnapshot(): GlyphRegistrySnapshot {
    return { schemaVersion: SCHEMA_VERSION, registryRevision: this.registryRevision, glyphs: structuredClone(this.all()) };
  }
}

/** Every glyph/variant/contour/segment ID must be unique across the registry. */
function assertUniqueIds(glyphs: GlyphDefinition[]): void {
  const seen = new Set<string>();
  const add = (id: string): void => {
    if (seen.has(id)) throw new Error(`registry: duplicate stable ID ${id}`);
    seen.add(id);
  };
  for (const g of glyphs) {
    add(g.glyphId);
    for (const v of g.variants) {
      add(v.variantId);
      for (const c of v.geometry.contours) {
        add(c.contourId);
        for (const s of c.segments) add(s.id);
      }
    }
  }
}
