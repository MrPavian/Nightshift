# HANDSTYLE, GESTURE AND MOTOR DYNAMICS

**Scope:** the movement dimension of graffiti writing, especially tags and handstyles.  
**Status:** research synthesis combining computational studies and aesthetic research. Technical models are analytical tools, not substitutes for writers’ lived knowledge.

## 1. Handstyle is not just a static shape

A tag is a drawn trace produced through movement. Berio and Leymarie argue that movement dynamics are central to the stylistic quality of graffiti tags. Their computational work models the gestures involved in producing curves and uses a handwriting motor-control model (Sigma-Lognormal) to generate traces with movement characteristics resembling human writing. [A]

The *AutoGraff* thesis expands this movement-centric approach to stylized letterforms and procedural design. It treats curves as the result of simulated movement rather than only as explicit geometric outlines. [A]

This does not mean all graffiti styles are reducible to one motor model. It means a static outline omits information that can matter to the appearance and feel of a handstyle.

## 2. Observable dimensions

For an educational archive and editor, describe movement using:
- **Trajectory:** the path taken by the hand or tool.
- **Direction:** the order and direction of stroke movement.
- **Velocity:** how quickly the stroke is drawn.
- **Acceleration/deceleration:** changes in speed through a gesture.
- **Pressure/flow proxy:** a model parameter for line weight or paint output; do not equate digital line width directly with physical pressure.
- **Lift and restart:** where the writer interrupts and resumes a trace.
- **Overlap order:** which gesture crosses another.
- **Rhythm:** the timing and spacing of repeated movements.
- **Fluency:** continuity and confidence of motion, an interpretive quality rather than a single objective metric.

## 3. Tag, handstyle and piece are related but not interchangeable

A tag is a writer’s signature form and can be made with different tools and surfaces. A handstyle is the writer’s individualized way of forming letters and signatures. A piece is a larger, more elaborate composition, often with more planned structure and rendering. These categories overlap historically and vary by scene, but a generator should not assume a tag is simply a tiny piece.

Aesthetic research on graffiti describes tags as letter-based signatures and emphasizes rapid, fluid drawing movements as an important aspect of handstyle. The same study contrasts tags with more elaborate mural forms and discusses the way letterforms are modified, extended, looped, shortened and thickened for composition. [A/B] https://journals.sagepub.com/doi/10.1177/0276237420951415

## 4. Why speed is not a quality slider

A high-speed simulated trace is not automatically a convincing handstyle. The path, acceleration, stroke order, pen lifts and letter construction must work together. Likewise, adding random wobble is not the same as modeling expressive movement.

The model should be calibrated against rights-cleared, attributed examples and evaluated by knowledgeable readers. A procedural system can produce plausible variation, but should not claim to reproduce a particular living or historical writer’s hand.

## 5. NIGHTSHIFT design inference

Separate two generation modes:

### A. Gesture-first mode
- define stroke sequence and anchors;
- generate movement trajectories;
- use motion parameters to derive curves;
- construct stroke regions and joins from those trajectories;
- render line weight and material effects afterwards.

### B. Shape-first mode
- edit vector contours directly;
- preserve a stable glyph skeleton;
- use anchors and pair logic to construct words;
- optionally infer plausible stroke paths for animation or teaching.

These modes should share geometry and provenance, but they solve different authoring problems. Gesture-first is especially relevant to tags and marker-like writing; shape-first is useful for large pieces and contour editing.

## 6. Suggested data fields

- stroke_order
- trajectory_points
- velocity_profile
- acceleration_profile
- pen_lifts
- overlap_order
- stroke_width_profile
- gesture_seed
- derived_contour
- reference_provenance

Keep the raw movement trace separate from the final expanded vector contour. This allows the same gesture to be rendered with different line weights or materials without losing the original path.

## 7. Tests

1. Replay a trace and verify deterministic output from its seed.
2. Compare path continuity and velocity transitions.
3. Check that pen lifts correspond to actual breaks in geometry.
4. Confirm that outline expansion does not close essential counters.
5. Compare the static trace with its rendered shape.
6. Evaluate at realistic tag size, not only when enlarged.
7. Keep human review in the loop; numerical smoothness is not the same as stylistic authenticity.

## 8. Sources

1. Daniel Berio and Frederic Fol Leymarie, “Computational Models for the Analysis and Synthesis of Graffiti Tag Strokes”: https://doc.gold.ac.uk/autograff/post/papers/strokes/
2. Daniel Berio, *AutoGraff*, PhD thesis, Goldsmiths, 2021: https://research.gold.ac.uk/id/eprint/29999/1/COM_thesis_BerioD_2021.pdf
3. “Aesthetics of Graffiti: Comparison to Text-Based and Pictorial Artforms”, *The Journal of Popular Culture*: https://journals.sagepub.com/doi/10.1177/0276237420951415

## 9. Related research

- [Graffiti Letter Anatomy and Composition](GRAFFITI_LETTER_ANATOMY_AND_COMPOSITION.md)
- [Letter Pair Connections and Word Flow](LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md)
- [Blackbooks, Sketchbooks and Peer Learning](BLACKBOOKS_SKETCHBOOKS_AND_PEER_LEARNING.md)
- [Glyph Construction Guide](GLYPH_CONSTRUCTION_GUIDE.md)
