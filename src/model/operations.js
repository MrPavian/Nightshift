// Operation registry for editor commands (Ticket 0.7A-T07).
//
// An operation is a pure function: (committed record, payload) -> canonical
// patch. Patches touch authored fields only; derived fields (geometry hash,
// visible bounds, revision) are recomputed by the store, so replay is
// deterministic. Parameter operations from the parameter contract are listed
// but disabled until their bounds are calibrated (ticket rule: only
// calibrated operations may be enabled).

export const OPERATIONS = {
  'contour.move-node': {
    enabled: true,
    label: 'Move contour node',
    entityKind: 'segment',
    calibration: 'not-required: no numeric bounds; validity decided by hard geometry/topology validation only (D-013)',
    buildPatch: moveNodePatch,
  },
};

/** Register the parameter contract's operations as disabled (uncalibrated). */
export function disabledParameterOperations(parameterContract) {
  return Object.fromEntries(Object.keys(parameterContract.operationSemantics).map((id) => [id, {
    enabled: false,
    label: id,
    reason: 'uncalibrated: numeric bounds require a calibration reference (contracts/glyph-parameter-contract.v1.json parameterValuePolicy)',
  }]));
}

export class OperationError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

/** Locate a node by stable ID in variant 0. */
export function findNode(record, nodeId) {
  const contours = record.variants[0].geometry.contours;
  for (let ci = 0; ci < contours.length; ci++) {
    const si = contours[ci].segments.findIndex((s) => s.nodeId === nodeId);
    if (si >= 0) return { ci, si, contour: contours[ci], segment: contours[ci].segments[si] };
  }
  return null;
}

function moveNodePatch(record, payload, command) {
  const variant = record.variants[0];
  if (variant.geometry.editability !== 'fully-editable') {
    throw new OperationError('OP_NOT_EDITABLE', `${variant.variantId} is ${variant.geometry.editability}; provisional bases cannot be edited.`);
  }
  const { nodeId, to } = payload ?? {};
  if (!nodeId || !to || !Number.isFinite(to.x) || !Number.isFinite(to.y)) {
    throw new OperationError('OP_BAD_PAYLOAD', 'contour.move-node needs {nodeId, to:{x,y}} with finite numbers.');
  }
  const hit = findNode(record, nodeId);
  if (!hit) throw new OperationError('OP_UNKNOWN_TARGET', `Unknown node ${nodeId}.`);
  const base = ['variants', 0, 'geometry', 'contours', hit.ci, 'segments', hit.si];
  const change = { commandId: command.command_id, operationId: command.operation_id, targetIds: [nodeId], from: { x: hit.segment.x, y: hit.segment.y }, to: { x: to.x, y: to.y } };
  return [
    { path: [...base, 'x'], from: hit.segment.x, to: to.x },
    { path: [...base, 'y'], from: hit.segment.y, to: to.y },
    { path: ['variants', 0, 'deliberateChanges'], from: variant.deliberateChanges, to: [...variant.deliberateChanges, change] },
  ];
}

/** Apply a canonical patch (or its inverse) to a mutable clone. */
export function applyPatch(record, patch, { inverse = false } = {}) {
  for (const op of patch) {
    let o = record;
    for (const k of op.path.slice(0, -1)) o = o[k];
    o[op.path.at(-1)] = structuredClone(inverse ? op.from : op.to);
  }
  return record;
}
