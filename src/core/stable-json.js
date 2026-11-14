// Deterministic JSON serialization: object keys sorted, arrays kept in order.
// Used for hashing and for reproducible persistence output.

/** @param {unknown} value @returns {string} */
export function stableStringify(value, indent = 0) {
  return JSON.stringify(sortKeys(value), null, indent);
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) {
      if (value[k] !== undefined) out[k] = sortKeys(value[k]);
    }
    return out;
  }
  return value;
}

/** Deep-freeze a plain data structure (used for immutable legacy snapshots). */
export function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const v of Object.values(value)) deepFreeze(v);
  }
  return value;
}
