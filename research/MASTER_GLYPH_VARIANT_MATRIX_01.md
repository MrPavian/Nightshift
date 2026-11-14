# Master Glyph Variant Matrix 01 — A/B/G/R/S

**Status:** NIGHTSHIFT design specification / candidate authoring plan  
**Depends on:** `GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`, `GLYPH_DATA_CONTRACT_A_Z.md`, `STYLE_GRAMMAR_SPECIFICATIONS_01.md`, `STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md`, `GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`  
**Evidence boundary:** The current v0.6 path facts are source-code observations in the master specification. All variants, parameter names, dependency rules and acceptance criteria below are NIGHTSHIFT design proposals. They are not claims about historical universal letter construction and are not yet implemented or visually approved.

## 1. Purpose and scope

Define a controlled first family of variants for the five individually authored v0.6 contours:
- A — apex / two-leg construction;
- B — spine / two-bowl construction;
- G — open bowl / internal bar / aperture;
- R — spine / bowl / diagonal leg;
- S — continuous directional curve.

The objective is not to generate dozens of random silhouettes. It is to expose a small number of meaningful structural controls while protecting letter identity and topology.

The initial deliverable is a reviewable authoring matrix and parameter contract. Claude must not treat this document as proof that variants already exist.

## 2. Variant taxonomy

Use three levels:

1. **Master-preserving variants:** retain the current topology and core identity. Suitable for the first implementation slice.
2. **Structural variants:** deliberately change proportions or component relationships while preserving glyph identity. Require their own geometry validation and human review.
3. **Topology variants:** change counter/aperture structure or component connectivity. Always separately named; never created as incidental side effects of a slider.

Every variant has a stable ID, maturity, provenance, supported grammar combinations, identity invariants, deliberate changes, constraints and proof-sheet record.

## 3. Shared parameter contract

Parameter values are normalized to each glyph's reviewed local metrics, not hard-coded universal pixels. Numerical bounds must be calibrated from authored geometry and review; this document intentionally does not invent them.

| Parameter family | Meaning | Owner | Dependency / validation |
|---|---|---|---|
| widthProfile | overall width and local width distribution | glyph variant | visible bounds, advance width, pair spacing |
| massBias | relative distribution of visual mass | glyph variant | silhouette balance, stem/bowl clearance |
| stemProfile | thickness along a stem/leg/bar | semantic component | minimum neck, joins, counter clearance |
| curveTension | curvature / shoulder tension | bowl/arc component | curvature continuity, self-intersection |
| terminalTreatment | cut, taper, roundness and direction | terminal component | aperture width, anchor tangent |
| junctionTreatment | transition between connected components | junction | contour continuity, local thickness |
| slant | global or component-local directional bias | instance/style operation | counter/aperture clearance, bounds |
| negativeSpaceTarget | desired counter/aperture/channel clearance | topology constraint | hard minimum cannot be overridden silently |
| connectionEligibility | allowed neighbor roles at an anchor | anchor | clearance envelope and relationship validator |
| extensionReach | length of optional extension from a valid anchor | composition grammar | collision and identity checks |
| ornamentAttachment | optional decorative structure attachment | composition/render layer | may not alter semantic topology unless explicitly authored |

### Parameter behavior

- Store the source value, resolved value and operation provenance.
- Keep base master geometry immutable; create a named variant or instance override.
- Separate structural controls from rendering controls.
- Hard constraints: preserve glyph identity, declared topology, required components, minimum clearances and valid geometry.
- Soft preferences: preferred width rhythm, visual balance, curvature style and composition density.
- A soft preference may be overridden with a warning. A hard constraint requires an explicit named topology/identity variant and a new review gate.
- Parameter changes must be deterministic and reversible.
- Do not use unseeded randomness. If a variant includes procedural variation, persist seed and resolved parameters.

## 4. Variant matrix

### A — Apex / two-leg

**Current documented topology:** one closed outer contour plus one triangular-like inner contour. Crossbar semantics are not settled by the path alone.

| Variant ID | Type | Deliberate change | Must preserve | Primary tests |
|---|---|---|---|---|
| `a.master` | master-preserving | exact imported v0.6 contour snapshot | two rising sides, apex region, internal negative space, cross-structure | isolated baseline, counter mask |
| `a.stance-narrow` | structural | bring legs closer / reduce overall stance | apex identity, protected counter, cross-structure | thumbnail, AV, AR |
| `a.stance-wide` | structural | widen leg spread | counter remains intentional; legs do not become unrelated diagonals | AV, BA, word silhouette |
| `a.crossbar-high` | structural | raise crossbar region | A identity and counter clearance | counter area/clearance, AR, AT |
| `a.crossbar-low` | structural | lower crossbar region | crossbar remains distinct; counter does not pinch | thumbnail, ABRA |
| `a.apex-rounded` | structural | soften apex transition | two-leg convergence and A identity | silhouette, AV, KRAZE |
| `a.open-apex` | topology | deliberately convert closed apex/counter arrangement to named open construction | explicitly declared aperture/terminal relation; never masquerade as master | aperture continuity, Λ confusion, thumbnail |

**Controls:** stance width, apex tension, left/right leg mass, crossbar height, crossbar thickness, crossbar integration mode, terminal cut, counter clearance.

**Dependencies:** crossbar position affects counter shape/clearance; leg mass affects counter clearance and pair collision; apex treatment affects silhouette identity. A topology change to open-apex requires a new variant ID and topology record.

**Hard failures:** lost cross-structure without an explicitly approved alternate; counter collapse; accidental self-intersection; apex no longer reads as a joined upper region; open-apex declared but aperture closes.

### B — Spine / two bowls

**Current documented topology:** one closed outer contour plus two separate closed inner contours.

| Variant ID | Type | Deliberate change | Must preserve | Primary tests |
|---|---|---|---|---|
| `b.master` | master-preserving | exact imported v0.6 contour snapshot | spine, upper/lower bowl distinction, two counters, waist | two-counter topology |
| `b.upper-dominant` | structural | upper bowl larger/heavier than lower | two distinct bowls and counters | thumbnail, BA, BR |
| `b.lower-dominant` | structural | lower bowl larger/heavier than upper | waist remains deliberate; counters stay separate | BOMB, MB |
| `b.waist-open` | structural | relax waist compression | upper/lower masses remain connected and distinct | silhouette, counter separation |
| `b.waist-tight` | structural | compress waist transition | no fragile neck or merged counters | min-clearance stress |
| `b.angular-bowls` | structural | more angular bowl transitions | two-bowl identity and counter containment | render layers, BR |
| `b.rounded-bowls` | structural | smoother bowl transitions | letter-specific asymmetry retained | BOMB, thumbnail |
| `b.open-bowl-study` | topology | authored opening in one or both bowl regions | explicit aperture semantics and clear distinction from master | aperture continuity, P/R confusion |

**Controls:** spine thickness profile, upper/lower bowl width and height, upper/lower mass ratio, waist position/width, bowl tension, counter size/clearance, terminal openness.

**Dependencies:** bowl size changes counter area; waist changes counter separation and local neck strength; spine thickness changes bowl attachment and interior clearance.

**Hard failures:** counters merge; either counter disappears unintentionally; waist severs bowl/spine continuity; counter clearance falls below calibrated minimum.

### G — Open bowl / internal bar / aperture

**Current documented topology:** one closed outer contour and no explicit hole array. Opening and internal bar logic are embedded in the single contour. Aperture semantics remain to be authored.

| Variant ID | Type | Deliberate change | Must preserve | Primary tests |
|---|---|---|---|---|
| `g.master` | master-preserving | exact imported v0.6 contour snapshot | open bowl family, internal bar/terminal logic | compare C/O |
| `g.aperture-wide` | structural | widen opening | terminals remain directional; G remains distinct from C | thumbnail, GO, GR |
| `g.aperture-tight` | structural | reduce opening | opening remains open under all render passes | aperture stress |
| `g.bar-high` | structural | raise internal bar | bar remains attached and G identity clear | C/O comparison, GHOST |
| `g.bar-low` | structural | lower internal bar | bar does not collapse aperture or read as ornament | GO, NG |
| `g.bar-extended` | structural | lengthen bar toward bowl interior | attachment and terminal relationship remain coherent | component graph, render |
| `g.terminal-angular` | structural | sharper terminal cuts | aperture and direction remain clear | thumbnail, pair |
| `g.terminal-rounded` | structural | softer terminal cuts | G does not collapse toward O | thumbnail |
| `g.aperture-variant` | topology | alternate explicitly authored opening/boundary structure | aperture record and terminal pair are first-class | aperture continuity and C/O confusion |

**Controls:** aperture width, upper/lower terminal direction, bar height/length/angle, attachment mode, bowl tension, terminal treatment.

**Dependencies:** terminal direction and bowl tension jointly determine aperture shape; bar position affects G/C distinction; bar length affects local clearance and possible accidental closure.

**Hard failures:** aperture closes; bar loses required attachment; G becomes indistinguishable from C/O at tested size; bar is represented as a decorative bridge instead of a semantic component.

### R — Spine / bowl / diagonal leg

**Current documented topology:** one closed outer contour plus one closed inner counter.

| Variant ID | Type | Deliberate change | Must preserve | Primary tests |
|---|---|---|---|---|
| `r.master` | master-preserving | exact imported v0.6 contour snapshot | spine, upper bowl, counter, descending leg | counter/leg baseline |
| `r.leg-steep` | structural | increase leg descent angle | leg remains attached at bowl/waist; counter clear | RA, RO, RISK |
| `r.leg-shallow` | structural | reduce leg descent angle | R remains distinct from P | thumbnail, BR |
| `r.leg-long` | structural | extend leg | no collision with next glyph without warning | RA, AR, KRAZE |
| `r.leg-compact` | structural | shorten leg | leg remains a distinct identity-bearing part | silhouette, R/P |
| `r.bowl-wide` | structural | widen upper bowl | counter and leg junction remain viable | RO, RISK |
| `r.bowl-narrow` | structural | narrow upper bowl | counter not pinched; no P-like collapse | thumbnail |
| `r.bowl-angular` | structural | angularize bowl transitions | counter boundary remains stable | BR, ABRA |
| `r.bowl-rounded` | structural | smooth bowl transitions | leg remains structurally distinct | RA, GHOST |
| `r.straight-leg-study` | structural | use a more vertical/straight leg construction | authored junction and counter clearance | P/K confusion, context |

**Controls:** bowl width/height, counter scale/clearance, leg origin, leg angle, leg length, leg mass, spine profile, bowl-to-leg junction treatment.

**Dependencies:** bowl width changes counter and leg origin; leg angle/length changes collision envelope; junction treatment changes local thickness and counter clearance.

**Hard failures:** counter intersects or pinches against leg; leg detaches; bowl-to-leg junction self-intersects; R collapses toward P or another tested confusion form.

### S — Continuous directional curve

**Current documented topology:** one closed outer contour, no declared enclosed counter. The outline does not establish an authoritative stroke order.

| Variant ID | Type | Deliberate change | Must preserve | Primary tests |
|---|---|---|---|---|
| `s.master` | master-preserving | exact imported v0.6 contour snapshot | continuous directional flow, opposing turns, middle transition | neutral silhouette |
| `s.upper-heavy` | structural | increase upper mass relative to lower | continuous S-flow and neck | thumbnail, SA, SB |
| `s.lower-heavy` | structural | increase lower mass relative to upper | continuous S-flow and neck | GS, NS |
| `s.wide` | structural | expand horizontal extent | no flattened two-lobe reading | thumbnail, GHOST |
| `s.compact` | structural | compress horizontal extent | upper/lower turns remain distinct | SQUE, SB |
| `s.neck-open` | structural | widen middle transition | continuous silhouette, controlled mass | SA, GS |
| `s.neck-tight` | structural | narrow middle transition | minimum neck and outline stability | clearance stress |
| `s.angular-flow` | structural | sharpen selected transitions | still reads as a continuous S, not arbitrary zigzag | RISK, thumbnail |
| `s.curved-flow` | structural | smooth curve transitions | distinct upper/lower mass and directional reversal | GHOST, SQUE |
| `s.terminal-direction-study` | structural | change terminal tangents | continuous path and connection anchors remain valid | pair connection tests |

**Controls:** upper/lower mass ratio, overall width, neck width, curve tension, inflection positions, terminal tangent directions, terminal cut.

**Dependencies:** mass ratio changes bounds and visual balance; neck width affects outline robustness; terminal direction affects connection eligibility; curve tension affects self-intersection and silhouette.

**Hard failures:** self-intersection; neck collapse; disconnected lobes; loss of directional reversal; inferred gesture order stored as fact without separate authored trace.

## 5. Cross-glyph compatibility rules

| Pair of operations | Compatibility | Rule |
|---|---|---|
| width + mass bias | supported | recompute bounds and validate silhouette |
| bowl size + counter size | coupled | counter geometry must be regenerated/edited coherently |
| terminal treatment + aperture width | coupled for G | validate opening after both operations |
| R bowl width + leg origin | coupled | move/rebuild junction and revalidate counter |
| S neck width + outline/depth | coupled | run neck-collapse stress |
| any topology variant + random remix | unsupported by default | topology changes require authored, named variant |
| rendering effect + semantic geometry | independent | effect must not mutate canonical contours |
| slant + protected negative space | constrained | validate after transform; reject hard-constraint violation |
| composition interlock + glyph identity | graph-backed | interlock cannot silently edit glyph master |

## 6. Style grammar support policy for first five masters

Compatibility is provisional until actual variants and proof sheets are reviewed.

| Glyph | Bubble | Blockbuster | Straight Letter | Wildstyle study |
|---|---|---|---|---|
| A | adaptable | adaptable | adaptable | experimental composition |
| B | adaptable | adaptable | adaptable | experimental composition |
| G | adaptable | adaptable | adaptable | experimental composition |
| R | adaptable | adaptable | adaptable | experimental composition |
| S | adaptable | adaptable | adaptable | experimental composition |

“Adaptable” means the grammar may generate a dedicated reviewed variant; it does not mean a finished implementation exists. Wildstyle study is primarily a composition grammar: use graph-backed pair relationships around these glyphs, not a per-letter “wildstyle” deformation. Do not mark any combination native before construction and context review.

## 7. First implementation order

### Slice 1 — Preserve and inspect
- import exact v0.6 paths as immutable snapshots;
- create `*.master` entries for A/B/G/R/S;
- expose semantic components and topology overlays;
- no automatic geometry changes yet.

### Slice 2 — Master-preserving structural controls
Implement only a minimal, reversible subset:
- A: stance width and crossbar position;
- B: upper/lower bowl balance and waist width;
- G: aperture width and bar position;
- R: leg angle and length;
- S: upper/lower mass balance and neck width.

Every control updates canonical vector geometry via a typed model command, then runs topology and identity diagnostics.

### Slice 3 — Named variants
Add the remaining structural variants after the first subset passes visual review. Keep topology variants (A open apex, B open bowl, G alternate aperture) as separately authored tasks, not generic sliders.

### Slice 4 — Pair/word composition
Add anchors and relationship candidates only after the relevant glyph geometry is reviewed. Wildstyle composition study follows here.

## 8. Required proof sheets

For each glyph, generate:
1. master silhouette and exact source snapshot comparison;
2. one parameter sweep per first-slice control (low / reference / high, with values recorded);
3. component and anchor overlay;
4. counter/aperture mask and measured clearances;
5. grammar comparison with rendering held constant;
6. pair contexts from the existing matrix;
7. word contexts with provisional letters clearly marked;
8. render-layer stress and thumbnail views.

Do not invent numerical low/high values before metric calibration. The sweep should use calibrated bounds and record the actual values.

## 9. Acceptance criteria

- Master snapshot remains recoverable and unchanged.
- Every variant has stable ID and explicit maturity.
- Parameter ownership and dependencies are machine-readable.
- Hard constraints cannot be bypassed by ordinary sliders.
- Topology variants have separate negative-space declarations.
- Same seed/project/version reproduces identical geometry.
- Undo/redo restores exact canonical state.
- Three.js selection maps to stable component IDs.
- SVG output matches the canonical vector composition.
- Human visual review is recorded separately from automated tests.

## 10. Claude handoff instruction

Implement Slice 1 and the minimal Slice 2 controls only after the canonical model and Three.js command pipeline exist. Do not implement the entire matrix at once. Report:
- which controls are truly functional;
- model commands and validation rules;
- calibrated parameter bounds and how they were measured;
- proof sheets and tests;
- any glyph that fails identity/topology checks;
- unimplemented variants and exact next task.

Do not call candidate variants production-ready without human review.
