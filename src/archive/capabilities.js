// Archive-side view of the archive ⇄ editor bridge contract (see src/bridge/editor-bridge.js).
export { BRIDGE_VERSION, BRIDGE_CAPABILITIES as CAPABILITIES, validateBridgeParams } from '../bridge/editor-bridge.js';

/** Parse "capability-id key=value key=value" from an entry's generator field. */
export function parseGeneratorLink(spec) {
  const [id, ...kv] = spec.trim().split(/\s+/);
  return { capability: id, params: Object.fromEntries(kv.map((p) => p.split('='))) };
}
