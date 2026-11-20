// Letterform comparison library views (spec LETTERFORM_COMPARISON_LIBRARY_SPEC_01, Gates 2 and 3).
// Reads the generated data/archive/comparison.v1.<lang>.json only. No editorial content lives here.
// Source images are never embedded: every object links to its original source page.

const GLYPHS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const decadeLabel = (d) => (d ? d.replace(/0er$/, '0er-Jahre') : null);

/** @param {{esc, norm, crumbs}} h helpers from app.js */
export function comparisonViews(C, h) {
  const { esc, norm, crumbs } = h;
  const L = C.labels;
  const byId = new Map(C.specimens.map((s) => [s.id, s]));
  const obs = new Map(C.objectObservations.map((o) => [o.id, o]));
  const glyphObs = new Map(C.glyphObservations.map((g) => [g.id, g]));
  const base = [['Stile & Buchstaben', '#/bereich/stile'], ['Buchstaben vergleichen', '#/vergleich']];
  const conf = (c) => L.confidence[c] ?? c;
  const featLabel = (t) => L.glyphFeature?.[t];
  const featName = (t) => (featLabel(t) ? esc(featLabel(t)) : `<span class="mono">${esc(t)}</span> <span class="muted">(Merkmal noch nicht in der Tag-Liste)</span>`);
  const glyphsOf = (c) => C.glyphObservations.filter((g) => g.glyph === c);
  const findingsFor = (ids) => C.findings.filter((f) => f.observationIds.some((o) => ids.has(o)));
  const GATE_CLOSED = (g, k) => `<div class="empty"><p><strong>Buchstabenvergleich: Forschungsansicht im Aufbau.</strong></p><p>Ein Buchstabe wird erst verglichen, wenn er auf einem gesichteten Fundstück eindeutig erkennbar ist. Für den Start braucht es mindestens ${g.minEligibleGlyphObservations} solche Beobachtungen aus ${g.minIndependentInstitutions} verschiedenen Archiven bzw. Plattformen; vorhanden sind ${k.eligibleGlyphObservations} aus ${k.glyphInstitutions} (${k.glyphSources} Quellen, mehrere Quellen derselben Plattform zählen einmal). Bis dahin lassen sich die Fundstücke selbst durchsehen.</p></div>`;
  const dateOf = (s) => (s.date ? `${s.dateQualifier === 'circa' ? 'um ' : ''}${s.date}` : null);
  const creatorOf = (s) => (s.creatorName ? `${esc(s.creatorName)} <span class="muted">(${esc(L.creatorAttribution[s.creatorAttribution])})</span>` : `<span class="muted">${esc(L.creatorAttribution[s.creatorAttribution])}</span>`);

  function landing() {
    const g = C.pilotGate, k = C.counts;
    const letters = GLYPHS.map((c) => [c, glyphsOf(c).length]);
    const featCounts = new Map();
    for (const o of C.glyphObservations) for (const t of o.features) featCounts.set(t, (featCounts.get(t) ?? 0) + 1);
    const featChip = (t) => `<li><a class="chip" href="#/vergleich/merkmal/${encodeURIComponent(t)}">${featLabel(t) ? esc(featLabel(t)) : `<span class="mono">${esc(t)}</span>*`} (${featCounts.get(t)})</a></li>`;
    const listed = (L.glyphFeatureGroups ?? []).map(([group, tags]) => [group, tags.filter((t) => featCounts.has(t))]).filter(([, t]) => t.length);
    const unlisted = [...featCounts.keys()].filter((t) => !featLabel(t)).sort();
    const glyphPart = g.open
      ? `<p class="orient">${k.eligibleGlyphObservations} Buchstabenbeobachtungen aus ${k.glyphSources} Quellen (${k.glyphInstitutions} Archive bzw. Plattformen). Gezählt wird nur, was auf einem in hoher Auflösung gesichteten Fundstück eindeutig als Buchstabe erkennbar ist.</p>
        <h3 class="cmp-h3">Nach Buchstabe</h3>
        <ul class="glyph-grid" aria-label="Buchstaben">${letters.map(([c, n]) => (n ? `<li><a href="#/vergleich/buchstabe/${c}"><span class="g">${c}</span><span class="n">${n}</span></a></li>` : `<li><span class="g-none" title="Noch keine Beobachtung"><span class="g">${c}</span><span class="n">0</span></span></li>`)).join('')}</ul>
        <p class="status-note">Buchstaben ohne Beobachtung sind nicht verlinkt.</p>
        <h3 class="cmp-h3">Nach Merkmal</h3>
        <p class="prose">Merkmale sind sichtbare Formeigenschaften am Einzelbuchstaben, keine Stilnamen und keine Wertung.</p>
        ${listed.map(([group, tags]) => `<p class="cmp-group">${esc(group)}</p><ul class="chips">${tags.map(featChip).join('')}</ul>`).join('')}
        ${unlisted.length ? `<p class="cmp-group">Noch nicht in der Tag-Liste*</p><ul class="chips">${unlisted.map(featChip).join('')}</ul><p class="status-note">* Diese Merkmale wurden bei der Recherche vergeben, stehen aber noch nicht in der abgestimmten Tag-Liste. Sie werden mit ihrem Originalnamen gezeigt, bis sie geprüft sind.</p>` : ''}
        <h3 class="cmp-h3">Vergleichsbefunde</h3>
        ${C.findings.length ? `<ul class="tabs">${C.findings.map((f) => { const gl = [...new Set(f.observationIds.map((o) => C.glyphObservations.find((x) => x.id === o)?.glyph).filter(Boolean))]; return `<li><a href="#/vergleich/buchstabe/${gl[0] ?? ''}?auswahl=${f.observationIds.map(encodeURIComponent).join(',')}"><span class="t-type">Befund · ${esc(L.comparisonAxis[f.axis] ?? f.axis)}</span><span class="t-title">Buchstabe ${esc(gl.join(', '))}</span><span class="t-sum">${esc(f.findingDe)}</span></a></li>`; }).join('')}</ul>` : '<p class="muted">Noch kein geprüfter Befund.</p>'}`
      : GATE_CLOSED(g, k);
    return {
      title: 'Buchstaben vergleichen',
      html: `${crumbs([base[0], [base[1][0]]])}<h1 class="page-title">Buchstaben vergleichen</h1>
        <p class="orient">Fundstücke aus Archiven und Sammlungen: was auf ihnen zu sehen ist, woher sie stammen und welche Rechte gelten. Verglichen wird nur, was sich am Objekt belegen lässt – keine Rangliste, kein Stil-Urteil, keine Vorlage zum Nachzeichnen.</p>
        <ul class="status" style="max-width:34rem">
          <li><span>Fundstücke</span><span>${k.specimens}</span></li>
          <li><span>davon im Bild gesichtet</span><span>${k.inspectedSpecimens}</span></li>
          <li><span>Buchstabenbeobachtungen</span><span>${k.eligibleGlyphObservations}</span></li>
          <li><span>Vergleichsbefunde</span><span>${k.findings}</span></li>
        </ul>
        <p style="margin:1.2rem 0"><a class="btn" href="#/vergleich/fundstuecke">Fundstücke durchsehen</a></p>
        <h2>Buchstabenvergleich</h2>${glyphPart}
        <h2>So liest du die Fundstücke</h2>
        <p class="prose">Jedes Fundstück trägt drei getrennte Angaben: <strong>wie es gesichtet wurde</strong> (nur Katalogangaben, Vorschaubild oder Bild in hoher Auflösung), <strong>wer genannt ist</strong> (Name laut Quelle oder nur Katalogtitel) und <strong>welche Bildrechte gelten</strong>. Fremde Bilder werden hier nie gezeigt; „Originalquelle öffnen“ führt zur Seite der Sammlung.</p>`,
    };
  }

  function facets(list) {
    const count = (f) => { const m = new Map(); for (const s of list) { const v = f(s); if (v) m.set(v, (m.get(v) ?? 0) + 1); } return [...m].sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'de')); };
    return {
      sichtung: count((s) => s.visualState).sort((a, b) => Object.keys(L.visualState).indexOf(a[0]) - Object.keys(L.visualState).indexOf(b[0])),
      archiv: count((s) => s.institution),
      jahrzehnt: count((s) => s.decade),
      ort: count((s) => s.place),
      rechte: count((s) => s.imageRights),
    };
  }
  const FILTERS = [
    ['sichtung', 'Sichtung', (s) => s.visualState, (v) => L.visualState[v]],
    ['archiv', 'Archiv', (s) => s.institution, (v) => v],
    ['jahrzehnt', 'Jahrzehnt', (s) => s.decade, decadeLabel],
    ['ort', 'Ort', (s) => s.place, (v) => v],
    ['rechte', 'Bildrechte', (s) => s.imageRights, (v) => L.imageRights[v]],
  ];

  function browser(params) {
    const q = params.get('q') ?? '';
    const active = Object.fromEntries(FILTERS.map(([k]) => [k, params.get(k) ?? '']));
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const text = (s) => norm([s.title, s.creatorName, s.photographerName, s.institution, s.place, s.identifier, s.date, s.archiveStyleLabel].filter(Boolean).join(' '));
    const list = C.specimens
      .filter((s) => FILTERS.every(([k, , get]) => !active[k] || get(s) === active[k]))
      .filter((s) => terms.every((t) => text(s).includes(t)))
      .sort((a, b) => Object.keys(L.visualState).indexOf(b.visualState) - Object.keys(L.visualState).indexOf(a.visualState) || a.title.localeCompare(b.title, 'de'));
    const f = facets(C.specimens);
    const link = (p) => { const u = new URLSearchParams({ q, ...active, ...p }); for (const [k, v] of [...u]) if (!v) u.delete(k); return `#/vergleich/fundstuecke${u.size ? `?${u}` : ''}`; };
    const chipRow = ([k, label, , show]) => `<ul class="chips" aria-label="Nach ${esc(label)} filtern"><li><a class="chip" href="${link({ [k]: '' })}" aria-pressed="${!active[k]}">${esc(label)}: alle</a></li>${f[k].map(([v, n]) => `<li><a class="chip" href="${link({ [k]: v === active[k] ? '' : v })}" aria-pressed="${v === active[k]}">${esc(show(v))} (${n})</a></li>`).join('')}</ul>`;
    const anyFilter = q || Object.values(active).some(Boolean);
    const row = (s) => `<li><a href="#/vergleich/fundstueck/${encodeURIComponent(s.id)}"><span class="t-type">Fundstück · ${esc(s.institution ?? '')}${dateOf(s) ? ` · ${esc(dateOf(s))}` : ''}</span><span class="t-title">${esc(s.title)}</span><span class="t-sum">${esc(L.visualState[s.visualState])}${s.creatorName ? ` · ${esc(s.creatorName)}` : ''}${s.place ? ` · ${esc(s.place)}` : ''}</span></a></li>`;
    return {
      title: 'Fundstücke',
      html: `${crumbs([...base, ['Fundstücke']])}<h1 class="page-title">Fundstücke</h1>
        <p class="orient">Alle erfassten Objekte mit Herkunft, Sichtungsstand und Bildrechten. Gesichtete Objekte stehen oben.</p>
        <form class="search" role="search" data-cmp-search style="margin-top:1rem">
          <label for="cq" class="sr">Fundstücke durchsuchen</label>
          <input id="cq" name="q" type="search" value="${esc(q)}" placeholder="Titel, Name, Archiv, Ort …" autocomplete="off">
          ${FILTERS.map(([k]) => `<input type="hidden" name="${k}" value="${esc(active[k])}">`).join('')}
          <button type="submit">Suchen</button>
        </form>
        ${FILTERS.map(chipRow).join('')}
        <p class="result-count" role="status">${list.length} ${list.length === 1 ? 'Fundstück' : 'Fundstücke'}${anyFilter ? ` · <a href="#/vergleich/fundstuecke">Filter zurücksetzen</a>` : ''}</p>
        ${list.length ? `<ul class="tabs" data-specimens>${list.map(row).join('')}</ul>` : `<div class="empty"><p><strong>Kein Fundstück passt zu dieser Auswahl.</strong></p><p><a href="#/vergleich/fundstuecke">Alle Filter zurücksetzen</a></p></div>`}`,
    };
  }

  function detail(id) {
    const s = byId.get(id);
    if (!s) return null;
    const ob = s.observationIds.map((o) => obs.get(o)).filter(Boolean);
    const gl = s.glyphObservationIds.map((g) => glyphObs.get(g)).filter(Boolean);
    const noObs = s.visualState === 'catalogue_metadata_only'
      ? 'Das Bild dieses Objekts wurde noch nicht gesichtet. Es gibt nur Katalogangaben; deshalb steht hier keine Beobachtung.'
      : 'Für dieses Fundstück liegt noch keine geprüfte deutsche Beobachtung vor.';
    const facts = [
      ['Archiv', esc(s.institution ?? '–')],
      ['Name', creatorOf(s)],
      s.photographerName ? ['Fotografie', esc(s.photographerName)] : null,
      ['Datum', esc(dateOf(s) ?? 'unbekannt')],
      ['Ort', esc(s.place ?? 'unbekannt')],
      s.identifier ? ['Kennung', `<span class="mono">${esc(s.identifier)}</span>`] : null,
      s.archiveStyleLabel ? ['Bezeichnung des Archivs', esc(s.archiveStyleLabel)] : null,
    ].filter(Boolean);
    return {
      title: s.title,
      html: `${crumbs([...base, ['Fundstücke', '#/vergleich/fundstuecke'], [s.title]])}<article class="entry">
        <div>
          <header class="entry-head">
            <p class="kicker">Fundstück · <span class="mono">${esc(s.id)}</span></p>
            <h1>${esc(s.title)}</h1>
            <ul class="facts">${facts.map(([k, v]) => `<li><b>${k}</b> ${v}</li>`).join('')}</ul>
          </header>
          <div class="sheet-paper"><div class="prose">
            <h2>Beobachtungen</h2>
            ${ob.length ? `<ul class="claims">${ob.map((o) => `<li><div class="claim-meta"><span class="kind">${o.kind === 'direct-observation' ? 'Direkte Beobachtung' : 'Deutung'}</span><span>Sicherheit: ${esc(conf(o.confidence))}</span></div><div>${esc(o.observationDe)}</div></li>`).join('')}</ul>` : `<p class="muted">${esc(noObs)}</p>`}
            <h2>Buchstaben</h2>
            ${gl.length ? `<ul class="claims">${gl.map((g) => `<li><div class="claim-meta"><span class="kind">${C.pilotGate.open ? `<a href="#/vergleich/buchstabe/${esc(g.glyph)}?auswahl=${encodeURIComponent(g.id)}">Buchstabe ${esc(g.glyph)} vergleichen</a>` : `Buchstabe ${esc(g.glyph)}`}</span><span>Lesbarkeit: ${esc(conf(g.legibility))}</span><span>Transkription: ${esc(conf(g.transcriptionConfidence))}</span></div><div>${esc(g.observationDe)}</div></li>`).join('')}</ul>` : '<p class="muted">Auf diesem Fundstück ist noch kein Buchstabe einzeln und sicher erfasst. Einzelne Buchstaben werden nicht aus unleserlichen Wörtern erschlossen.</p>'}
          </div></div>
        </div>
        <aside class="aside" aria-label="Zum Fundstück">
          <section class="panel"><h2>Status</h2><ul class="status cmp">
            <li><span>Sichtung</span><span>${esc(L.visualState[s.visualState])}</span></li>
            <li><span>Bildrechte</span><span>${esc(L.imageRights[s.imageRights])}</span></li>
            ${s.accessDate ? `<li><span>Abgerufen</span><span class="mono">${esc(s.accessDate)}</span></li>` : ''}
          </ul><p class="status-note">Das Bild wird hier nicht gezeigt. Öffentlich sichtbar heißt nicht frei nutzbar; die Rechte werden für jedes Bild einzeln geklärt.</p>
          <p><a class="btn" href="${esc(s.itemUrl)}" rel="noopener" target="_blank">Originalquelle öffnen</a></p></section>
          <section class="panel"><h2>Weiter</h2><p><a href="#/vergleich/fundstuecke?archiv=${encodeURIComponent(s.institution ?? '')}">Weitere Fundstücke aus diesem Archiv</a></p><p><a href="#/vergleich">Zur Übersicht</a></p></section>
        </aside>
      </article>`,
    };
  }


  // ---- Gate 3: glyph comparison ----
  const card = (o, { selected, toggleHref, mode }) => {
    const s = byId.get(o.specimenId);
    const fields = [
      ['Fundstück', `<a href="#/vergleich/fundstueck/${encodeURIComponent(s.id)}">${esc(s.title)}</a>`],
      ['Name', creatorOf(s)],
      ['Archiv', esc(s.institution ?? '–')],
      ['Datum', esc(dateOf(s) ?? 'unbekannt')],
      ['Sichtung', esc(L.visualState[s.visualState])],
      ['Lesbarkeit', esc(conf(o.legibility))],
      ['Transkription', esc(conf(o.transcriptionConfidence))],
      ['Merkmale', o.features.length ? o.features.map((t) => `<a href="#/vergleich/merkmal/${encodeURIComponent(t)}">${featName(t)}</a>`).join(', ') : '<span class="muted">keine erfasst</span>'],
      ['Bildrechte', esc(L.imageRights[s.imageRights])],
    ];
    return `<li class="cmp-card${selected ? ' is-selected' : ''}" data-cmp-card data-obs="${esc(o.id)}">
      <p class="kicker">${mode === 'feature' ? `Buchstabe ${esc(o.glyph)} · ` : ''}<span class="mono">${esc(o.id)}</span></p>
      <p class="cmp-label">Direkte Beobachtung</p>
      <p class="cmp-obs">${esc(o.observationDe)}</p>
      <dl class="cmp-fields">${fields.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      <p class="cmp-actions">${toggleHref ? `<a class="chip" href="${toggleHref}" aria-pressed="${selected}">${selected ? 'Im Vergleich' : 'Zum Vergleich wählen'}</a>` : ''}<a href="${esc(s.itemUrl)}" rel="noopener" target="_blank">Originalquelle öffnen</a></p>
    </li>`;
  };

  function letter(c, params) {
    c = (c ?? '').toUpperCase();
    if (!GLYPHS.includes(c)) return null;
    const g = C.pilotGate, k = C.counts;
    const crumbsHere = crumbs([...base, [`Buchstabe ${c}`]]);
    if (!g.open) return { title: `Buchstabe ${c}`, html: `${crumbsHere}<h1 class="page-title">Buchstabe ${c}</h1>${GATE_CLOSED(g, k)}` };
    const all = glyphsOf(c).sort((a, b) => (byId.get(a.specimenId).institution ?? '').localeCompare(byId.get(b.specimenId).institution ?? '', 'de') || a.id.localeCompare(b.id));
    const ids = new Set(all.map((o) => o.id));
    const picked = (params.get('auswahl') ?? '').split(',').filter((id) => ids.has(id));
    const sel = new Set(picked);
    const href = (set) => `#/vergleich/buchstabe/${c}${set.size ? `?auswahl=${[...set].map(encodeURIComponent).join(',')}` : ''}`;
    const toggle = (id) => { const n = new Set(sel); if (n.has(id)) n.delete(id); else n.add(id); return href(n); };
    const nav = `<ul class="glyph-grid small" aria-label="Anderen Buchstaben wählen">${GLYPHS.map((x) => { const n = glyphsOf(x).length; return n ? `<li><a href="#/vergleich/buchstabe/${x}"${x === c ? ' aria-current="page"' : ''}><span class="g">${x}</span><span class="n">${n}</span></a></li>` : `<li><span class="g-none"><span class="g">${x}</span><span class="n">0</span></span></li>`; }).join('')}</ul>`;
    if (!all.length) {
      return { title: `Buchstabe ${c}`, html: `${crumbsHere}<h1 class="page-title">Buchstabe ${c}</h1>${nav}<div class="empty"><p><strong>Für ${c} gibt es noch keine geprüfte Beobachtung.</strong></p><p>Ein Buchstabe wird nur aufgenommen, wenn er auf einem gesichteten Fundstück eindeutig erkennbar ist. <a href="#/vergleich">Zur Übersicht</a></p></div>` };
    }
    let compare = '';
    if (all.length < 2) {
      compare = `<div class="empty"><p><strong>Für einen Vergleich braucht es mindestens zwei Beobachtungen.</strong> Zu ${c} gibt es bisher eine.</p></div>`;
    } else if (sel.size < 2) {
      compare = `<div class="empty"><p><strong>Wähle zwei oder mehr Beobachtungen</strong>, um sie nebeneinander zu stellen.</p><p><a class="btn ghost" href="${href(new Set(all.map((o) => o.id)))}">Alle ${all.length} vergleichen</a></p></div>`;
    } else {
      const chosen = all.filter((o) => sel.has(o.id));
      const insts = new Set(chosen.map((o) => byId.get(o.specimenId).institution));
      const specs = new Set(chosen.map((o) => o.specimenId));
      const indep = specs.size < chosen.length
        ? 'Mindestens zwei gewählte Beobachtungen stammen vom selben Fundstück. Sie zeigen Varianten auf einem Objekt, keine unabhängigen Belege.'
        : insts.size === 1
          ? `Alle gewählten Beobachtungen stammen von derselben Plattform (${[...insts][0]}). Unterschiede zeigen die Bandbreite innerhalb dieser Quelle, keine unabhängige Bestätigung.`
          : `Die gewählten Beobachtungen stammen aus ${insts.size} verschiedenen Archiven bzw. Plattformen.`;
      const tagSets = chosen.map((o) => new Set(o.features));
      const tags = [...new Set(chosen.flatMap((o) => o.features))];
      const shared = tags.filter((t) => tagSets.every((x) => x.has(t)));
      const partial = tags.filter((t) => !shared.includes(t));
      compare = `<section class="cmp-compare" aria-labelledby="cmp-h">
        <h2 id="cmp-h">Gegenüberstellung: ${chosen.length} Beobachtungen</h2>
        <p class="status-note">${esc(indep)} <a href="${href(new Set())}">Auswahl aufheben</a></p>
        <div class="cmp-tags">
          <p><strong>Bei allen gewählten erfasst:</strong> ${shared.length ? shared.map(featName).join(', ') : '<span class="muted">kein gemeinsames Merkmal erfasst</span>'}</p>
          <p><strong>Nur bei einem Teil erfasst:</strong> ${partial.length ? partial.map((t) => `${featName(t)} <span class="muted">(${chosen.filter((o) => o.features.includes(t)).length} von ${chosen.length})</span>`).join(', ') : '<span class="muted">keines</span>'}</p>
          <p class="status-note">Automatischer Abgleich der vergebenen Merkmals-Tags, keine Deutung. Ein fehlender Tag heißt nicht, dass das Merkmal am Buchstaben fehlt.</p>
        </div>
        <ul class="cmp-cards">${chosen.map((o) => card(o, { selected: true, toggleHref: toggle(o.id) })).join('')}</ul>
      </section>`;
    }
    const rest = all.filter((o) => !sel.has(o.id));
    const fs = findingsFor(ids);
    const findingHtml = fs.length ? `<h2>Deutung über mehrere Objekte</h2>
      <p class="orient">Befunde vergleichen mehrere Beobachtungen. Sie sind Deutungen und stehen deshalb getrennt von den direkten Beobachtungen.</p>
      <div class="sheet-paper"><ul class="claims cmp-findings">${fs.map((f) => `<li><div class="claim-meta"><span class="kind">Befund · ${esc(L.comparisonAxis[f.axis] ?? f.axis)}</span><span>Sicherheit: ${esc(conf(f.confidence))}</span><span>Generator: ${esc(L.generatorRelevance[f.generatorRelevance] ?? f.generatorRelevance)}</span></div>
        <p>${esc(f.findingDe)}</p><p><strong>Grundlage:</strong> ${esc(f.evidenceBasisDe)}</p><p><strong>Grenzen:</strong> ${esc(f.limitationDe)}</p>
        <p><a href="${href(new Set(f.observationIds.filter((o) => ids.has(o))))}">Diese Beobachtungen gegenüberstellen</a></p></li>`).join('')}</ul></div>` : '';
    return {
      title: `Buchstabe ${c}`,
      html: `${crumbsHere}<h1 class="page-title">Buchstabe ${c}</h1>
        <p class="orient">${all.length} ${all.length === 1 ? 'geprüfte Beobachtung' : 'geprüfte Beobachtungen'}. Jede Karte zeigt dieselben Angaben: was am Buchstaben zu sehen ist, wie sicher er erkannt wurde und woher er stammt. Keine Rangliste, keine Vorlage zum Nachzeichnen.</p>
        ${nav}
        ${compare}
        ${rest.length ? `<h2>${sel.size >= 2 ? 'Weitere Beobachtungen' : 'Beobachtungen'}</h2><ul class="cmp-cards">${rest.map((o) => card(o, { selected: false, toggleHref: all.length > 1 ? toggle(o.id) : null })).join('')}</ul>` : ''}
        ${findingHtml}`,
    };
  }

  // ---- Gate 3: construction comparison by observable feature ----
  function feature(tag) {
    const g = C.pilotGate, k = C.counts;
    const list = C.glyphObservations.filter((o) => o.features.includes(tag));
    const name = featLabel(tag) ?? tag;
    const crumbsHere = crumbs([...base, [`Merkmal: ${name}`]]);
    if (!g.open) return { title: `Merkmal: ${name}`, html: `${crumbsHere}<h1 class="page-title">Merkmal: ${esc(name)}</h1>${GATE_CLOSED(g, k)}` };
    if (!list.length) return null;
    const letters = [...new Set(list.map((o) => o.glyph))].sort();
    const insts = new Set(list.map((o) => byId.get(o.specimenId).institution));
    const others = (L.glyphFeatureGroups ?? []).find(([, tags]) => tags.includes(tag));
    return {
      title: `Merkmal: ${name}`,
      html: `${crumbsHere}<h1 class="page-title">Merkmal: ${featLabel(tag) ? esc(name) : `<span class="mono">${esc(tag)}</span>`}</h1>
        ${featLabel(tag) ? '' : '<p class="status-note">Dieses Merkmal steht noch nicht in der abgestimmten Tag-Liste und wird deshalb mit seinem Originalnamen gezeigt.</p>'}
        <p class="orient">${list.length} ${list.length === 1 ? 'Beobachtung' : 'Beobachtungen'} an ${letters.length} ${letters.length === 1 ? 'Buchstabe' : 'Buchstaben'} (${letters.join(', ')}), aus ${insts.size} ${insts.size === 1 ? 'Archiv bzw. Plattform' : 'Archiven bzw. Plattformen'}.</p>
        <div class="panel cmp-why"><h2>Was dieser Vergleich zeigt – und was nicht</h2>
          <p>Verglichen wird nur, ob dieses Merkmal am einzelnen Buchstaben sichtbar ist. Das ist eine Formbeschreibung, kein Stilname und keine Wertung.</p>
          <p>Der Vergleich trägt nicht über Buchstaben hinweg: Proportionen eines X und eines O lassen sich nicht direkt gegenüberstellen. Aus der Häufigkeit eines Merkmals in dieser kleinen Sammlung folgt keine Regel für eine Szene, eine Zeit oder einen Stil.</p>
          ${others ? `<p>Verwandte Merkmale (${esc(others[0])}): ${others[1].filter((t) => t !== tag && C.glyphObservations.some((o) => o.features.includes(t))).map((t) => `<a href="#/vergleich/merkmal/${encodeURIComponent(t)}">${esc(featLabel(t))}</a>`).join(', ') || '<span class="muted">noch keine</span>'}</p>` : ''}
        </div>
        ${letters.map((c) => { const os = list.filter((o) => o.glyph === c); return `<h2>Buchstabe ${c}</h2><p><a href="#/vergleich/buchstabe/${c}${os.length > 1 ? `?auswahl=${os.map((o) => encodeURIComponent(o.id)).join(',')}` : ''}">${os.length > 1 ? `Diese ${os.length} Beobachtungen gegenüberstellen` : `Alle Beobachtungen zu ${c}`}</a></p><ul class="cmp-cards">${os.map((o) => card(o, { selected: false, toggleHref: null, mode: 'feature' })).join('')}</ul>`; }).join('')}`,
    };
  }

  return { landing, browser, detail, letter, feature };
}
