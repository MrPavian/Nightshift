# Style Grammar Compatibility & Parameter Contract

**Status:** Engineering specification derived from `STYLE_GRAMMAR_SPECIFICATIONS_01.md`  
**Purpose:** Define how NIGHTSHIFT composes grammar dimensions and validates parameter dependencies without collapsing all style decisions into one preset.  
**Not an implementation:** No production UI or generator code is claimed by this document.

## 1. Canonical profile model

A saved composition must serialize independent selections:

```ts
interface StyleProfileSelection {
  letterformGrammar: {
    id: "bubble" | "straight" | "hybrid" | "authored";
    version: string;
    variantPolicy: "preserve" | "allow-authored-variants";
  };
  compositionGrammar: {
    id: "neutral" | "compact" | "block-fit" | "interlocking";
    version: string;
  };
  practiceContext: {
    id: "tag" | "throw-up" | "piece" | "panel" | "wholecar" | "none";
  };
  surface: {
    id: "blackbook" | "wall" | "train-car" | "paper" | "custom";
  };
  rendering: {
    fill: string;
    outline: string;
    inline?: string;
    depth?: string;
    highlights?: string;
    texture?: string;
  };
  overrides: ParameterOverride[];
}
```

The identifiers are NIGHTSHIFT product categories, not universal historical classifications. The user interface may offer named presets, but the saved project must preserve the underlying axis selections.

## 2. Compatibility matrix

Legend:
- **Native:** intended first-class combination for the initial engine.
- **Supported:** valid, but needs context-specific constraints.
- **Experimental:** allow only with warnings and visible diagnostics.
- **Not a grammar relation:** belongs to a separate product axis.

| Letterform | Composition | Compatibility | Notes |
|---|---|---|---|
| Bubble | Compact | Native | Rounded masses, protected counters, compact word rhythm |
| Bubble | Neutral | Native | Isolated/low-overlap bubble construction |
| Bubble | Block-fit | Supported | Can be arranged to fill a broad surface; do not square the letterforms by stealth |
| Bubble | Interlocking | Experimental | Preserve rounded identity and counter clearance |
| Straight | Neutral | Native | Baseline readable skeleton |
| Straight | Block-fit | Native | Strong rectangular word silhouette; format remains separate |
| Straight | Compact | Supported | Controlled compression without losing counters |
| Straight | Interlocking | Supported | Can support wildstyle-like composition; keep style axes distinct |
| Hybrid | Neutral | Supported | Requires authored per-glyph variants |
| Hybrid | Compact | Supported | Validate local transitions between rounded and angular forms |
| Hybrid | Block-fit | Experimental | Avoid inconsistent mass and width rhythm |
| Hybrid | Interlocking | Supported | Rich variation; high validation burden |
| Authored | Any | Conditional | Compatibility must be declared by the authored variant |

Separate context/finish compatibility:
- Throw-up is a practice/form context, not a required synonym for Bubble.
- Piece is a broader developed-work context, not a letterform.
- Panel and Wholecar are surface/coverage formats.
- 3D, chrome, outline, fill and texture are render treatments and must not change grammar identity.
- Blackbook and wall are surfaces; they may affect presentation and export, not semantic construction.

## 3. Parameter ownership

Every parameter must have one owner. Avoid duplicate sliders that independently modify the same geometry.

| Parameter group | Owner | Examples |
|---|---|---|
| Glyph construction | Letterform grammar / glyph variant | inflation, corner treatment, stem mass, terminal form |
| Glyph identity | Glyph master | component graph, counters, apertures, invariant relationships |
| Word layout | Composition grammar | advance spacing, baseline rhythm, packing |
| Connections | Relationship solver | anchor compatibility, interlock depth, crossing order |
| Surface fit | Format/surface constraint | panel bounds, safe margins, aspect ratio |
| Rendering | Finish pipeline | fill, outline, inline, depth, highlights, texture |

### 3.1 Parameter precedence

Apply constraints in this order:
1. Glyph identity invariants and topology (hard constraints).
2. Authored variant constraints.
3. Selected letterform grammar.
4. Composition grammar.
5. Practice/format/surface constraints.
6. User overrides (validated; may be rejected or warned).
7. Rendering treatments.

A lower layer cannot silently violate a higher layer. If a user override conflicts with a protected counter or letter identity invariant, show the conflict and require an explicit alternative variant or override policy.

## 4. Parameter dependency graph

### Bubble / rounded letterform

```text
inflationAmount
  -> outer contour expansion
  -> counter shrink risk
  -> minimum counter clearance validation
  -> neck/junction width validation

cornerRoundness
  -> corner geometry
  -> local silhouette
  -> terminal and junction integrity

terminalRoundness
  -> terminal geometry
  -> anchor direction recalculation
  -> pair-compatibility recalculation
```

### Straight / squared letterform

```text
linearity
  -> segment/corner treatment
  -> contour simplification constraints
  -> identity-invariant validation

stemMass
  -> outer contour / counter geometry
  -> counter and channel clearance
  -> neighboring collision checks

proportionDiscipline
  -> width/height metrics
  -> word advance layout
  -> surface-fit diagnostics
```

### Compact composition

```text
spacing / advance
  -> neighbor proximity
  -> channel width
  -> collision and overlap diagnostics
  -> accepted relationship candidates
```

### Block-fit composition

```text
surface bounds
  -> target word bounds
  -> allowed global scale
  -> per-glyph width/height constraints
  -> overflow and distortion diagnostics
```

### Interlocking composition

```text
anchor candidates
  -> role/direction compatibility
  -> candidate relationship graph
  -> overlap/crossing order
  -> contour collision analysis
  -> counter/aperture protection
  -> negative-space channel analysis
  -> accepted/rejected relationship
```

### Rendering

```text
validated front-face vector geometry
  -> fill / outline / inline / highlight
  -> optional extrusion/depth
  -> surface material and lighting
```

Rendering never feeds back into semantic letter construction unless the user explicitly chooses a geometry-changing operation and it is validated as a model command.

## 5. Hard constraints and soft preferences

### Hard constraints (must not be silently violated)
- required glyph components remain connected according to the glyph's semantic graph;
- protected counters remain enclosed and above minimum clearance;
- protected apertures remain open;
- no prohibited self-intersections;
- anchors remain inside their declared validity envelopes;
- crossing order is explicit where contours intersect;
- stable glyph/variant identity is retained;
- deterministic operations reproduce the same canonical geometry.

### Soft preferences (may be violated with warnings)
- consistent cap height;
- preferred width rhythm;
- preferred corner family;
- preferred spacing;
- preferred word silhouette;
- stylistic density;
- target surface fill efficiency.

A soft preference should never override a hard topology constraint.

## 6. UI control policy

Do not expose every internal parameter as a free slider.

Provide:
- a small number of high-level controls per grammar;
- an advanced inspector for detailed parameters;
- visible diagnostics for any parameter that approaches a constraint;
- reset-to-grammar-default and reset-to-authored-master actions;
- an override marker when a value differs from the selected grammar profile.

Each control must state what it changes. For example:
- “Inflation” changes the glyph contour, not outline width.
- “Spacing” changes word layout, not glyph width.
- “Interlock” proposes geometric relationships; it does not draw decorative bridges.
- “Depth” changes render geometry, not the letterform skeleton.

## 7. Presets and serialization

Presets are convenience bundles. Each preset must expand to a complete explicit selection across the independent axes and parameter overrides.

Example: “Classic Bubble Throw-up” might select:
- letterformGrammar = bubble;
- compositionGrammar = compact;
- practiceContext = throw-up;
- surface = blackbook or wall;
- rendering = independently selected outline/fill treatment.

This is a product preset name, not a claim that all historical throw-ups followed one fixed grammar.

Do not store only the preset name. Persist:
- each axis selection and version;
- every non-default parameter override;
- glyph variant selections;
- solver relationship overrides;
- surface constraints;
- render settings;
- seed and generator version.

## 8. Required compatibility validation

At project load and after relevant edits:
- verify selected grammar exists and version is supported;
- verify glyph variants declare compatibility or allow experimental mode;
- verify practice context does not imply a false letterform requirement;
- verify surface bounds do not force invalid glyph distortion;
- verify composition parameters do not violate protected negative spaces;
- verify render settings do not modify canonical topology;
- report unsupported combinations with actionable diagnostics.

## 9. Test fixtures

Minimum comparison fixtures:
- ABRA: Bubble/Compact, Straight/Neutral, Straight/Interlocking.
- BOMB: Bubble/Compact, Straight/Block-fit.
- GHOST: Bubble/Compact and Straight/Interlocking; inspect G aperture and S neck.
- KRAZE: Straight/Interlocking and Hybrid/Interlocking.
- NYX: Straight/Neutral and Straight/Interlocking.
- RISK: Bubble/Compact and Straight/Interlocking.

For every fixture:
- monochrome front-face comparison;
- topology overlay;
- pair/word relationship diagnostics;
- light/dark surface render;
- SVG export comparison;
- deterministic save/reload.

Label tests with provisional glyphs as partial coverage.

## 10. Acceptance criteria

- The project stores independent grammar axes, not a single exclusive style enum.
- A named preset expands to explicit serialized settings.
- Parameter ownership is unambiguous.
- Dependency changes trigger relevant diagnostics.
- Hard constraints cannot be silently overridden.
- Soft preferences may be overridden with visible warnings.
- Rendering effects do not change semantic construction.
- Interlocking relationships are graph-backed and geometry-validated.
- Unsupported combinations produce actionable diagnostics.
- The same project state and generator version reproduce the same canonical geometry.
