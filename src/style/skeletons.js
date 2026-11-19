// Letter skeletons A–Z for the graffiti engine: centre lines ("Skelett") with named terminals.
// Graffiti tutorials build letters as: skeleton lines -> bars around the lines -> style moves at bar
// ends -> fill -> 3D. These skeletons are original constructions (cap height 0..140, y down), not traced.
//
// Each letter: strokes (polylines; curves are pre-sampled arcs), terminals (free bar ends where style
// moves may sit: stroke index + 'start' | 'end') and bars (stroke indices of crossbars that may split).

export const ARC_STEP_DEG = 12;

/** Sample an elliptical arc from angle a0 to a1 (degrees, 0 = right, 90 = down). */
export function arc(cx, cy, rx, ry, a0, a1) {
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / ARC_STEP_DEG));
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [Math.round((cx + rx * Math.cos(a)) * 100) / 100, Math.round((cy + ry * Math.sin(a)) * 100) / 100];
  });
}

const T = (s, e) => ({ s, e }); // terminal shorthand: stroke index, 'start' | 'end'

export const SKELETONS = {
  A: { strokes: [[[8, 140], [44, 0], [80, 140]], [[24, 94], [64, 94]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [1] },
  B: { strokes: [[[0, 140], [0, 0]], [[0, 0], [30, 0], ...arc(30, 32, 30, 32, -90, 90), [0, 64]], [[0, 64], [34, 64], ...arc(34, 102, 34, 38, -90, 90), [0, 140]]], terminals: [T(0, 'end')], bars: [] },
  C: { strokes: [arc(44, 70, 42, 68, -40, -320)], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  D: { strokes: [[[0, 140], [0, 0]], [[0, 0], [22, 0], ...arc(22, 70, 50, 70, -90, 90), [0, 140]]], terminals: [T(0, 'end')], bars: [] },
  E: { strokes: [[[74, 0], [0, 0], [0, 140], [76, 140]], [[0, 70], [58, 70]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'end')], bars: [1] },
  F: { strokes: [[[74, 0], [0, 0], [0, 140]], [[0, 68], [56, 68]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'end')], bars: [1] },
  G: { strokes: [[...arc(44, 70, 42, 68, -40, -355), [48, 76]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  H: { strokes: [[[0, 0], [0, 140]], [[76, 0], [76, 140]], [[0, 70], [76, 70]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'start'), T(1, 'end')], bars: [2] },
  I: { strokes: [[[0, 0], [0, 140]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  J: { strokes: [[[64, 0], [64, 96], ...arc(34, 96, 30, 44, 0, 180).slice(1)]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  K: { strokes: [[[0, 0], [0, 140]], [[72, 0], [0, 84]], [[26, 58], [76, 140]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'start'), T(2, 'end')], bars: [] },
  L: { strokes: [[[0, 0], [0, 140], [70, 140]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  M: { strokes: [[[0, 140], [0, 0], [44, 82], [88, 0], [88, 140]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  N: { strokes: [[[0, 140], [0, 0], [74, 140], [74, 0]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  O: { strokes: [arc(42, 70, 42, 68, -90, 270)], terminals: [], bars: [] },
  P: { strokes: [[[0, 140], [0, 0]], [[0, 0], [30, 0], ...arc(30, 38, 32, 38, -90, 90), [0, 76]]], terminals: [T(0, 'start')], bars: [] },
  Q: { strokes: [arc(42, 70, 42, 68, -90, 270), [[54, 104], [92, 146]]], terminals: [T(1, 'end')], bars: [] },
  R: { strokes: [[[0, 140], [0, 0]], [[0, 0], [30, 0], ...arc(30, 38, 32, 38, -90, 90), [0, 76]], [[26, 76], [72, 140]]], terminals: [T(0, 'start'), T(2, 'end')], bars: [] },
  S: { strokes: [[...arc(40, 35, 36, 35, -30, -270), ...arc(40, 105, 38, 35, -90, 150).slice(1)]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  T: { strokes: [[[0, 0], [84, 0]], [[42, 0], [42, 140]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'end')], bars: [] },
  U: { strokes: [[[0, 0], [0, 96], ...arc(36, 96, 36, 44, 180, 0).slice(1), [72, 0]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  V: { strokes: [[[0, 0], [40, 140], [80, 0]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  W: { strokes: [[[0, 0], [24, 140], [52, 44], [80, 140], [104, 0]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
  X: { strokes: [[[0, 0], [80, 140]], [[80, 0], [0, 140]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'start'), T(1, 'end')], bars: [] },
  Y: { strokes: [[[0, 0], [40, 72], [80, 0]], [[40, 72], [40, 140]]], terminals: [T(0, 'start'), T(0, 'end'), T(1, 'end')], bars: [] },
  Z: { strokes: [[[0, 0], [78, 0], [0, 140], [80, 140]]], terminals: [T(0, 'start'), T(0, 'end')], bars: [] },
};
