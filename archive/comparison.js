// Letterform comparison library views (spec LETTERFORM_COMPARISON_LIBRARY_SPEC_01, Gate 2).
// Reads the generated data/archive/comparison.v1.<lang>.json only. No editorial content lives here.
// Source images are never embedded: every object links to its original source page.

const decadeLabel = (d) => (d ? d.replace(/0er$/, '0er-Jahre') : null);

/** @param {{esc, norm, crumbs}} h helpers from app.js */
export function comparisonViews(C, h) {
  const { esc, norm, crumbs } = h;
  const L = C.labels;
  const byId = new Map(C.specimens.map((s) => [s.id, s]));
  const obs = new Map(C.objectObservations.map((o) => [o.id, o]));
  const glyphObs = new Map(C.glyphObservations.map((g) => [g.id, g]));
  const base = [['Stile & Buchstaben', '#/bereich/stile'], ['Buchstaben vergleichen', '#/vergleich']];
  const dateOf = (s) => (s.date ? `${s.dateQualifier === 'circa' ? 'um ' : ''}${s.date}` : null);
  const creatorOf = (s) => (s.creatorName ? `${esc(s.creatorName)} <span class="muted">(${esc(L.creatorAttribution[s.creatorAttribution])})</span>` : `<span class="muted">${esc(L.creatorAttribution[s.creatorAttribution])}</span>`);

  function landing() {
    const g = C.pilotGate, k = C.counts;
    const glyphPart = g.open
      ? `<p class="orient">${k.eligibleGlyphObservations} Buchstabenbeobachtungen aus ${k.glyphSources} Quellen (${k.glyphInstitutions} Archive bzw. Plattformen).</p>`
      : `<div class="empty"><p><strong>Buchstabenvergleich: Forschungsansicht im Aufbau.</strong></p><p>Ein Buchstabe wird erst verglichen, wenn er auf einem gesichteten Fundstück eindeutig erkennbar ist. Für den Start braucht es mindestens ${g.minEligibleGlyphObservations} solche Beobachtungen aus ${g.minIndependentSources} unabhängigen Quellen; vorhanden sind ${k.eligibleGlyphObservations} aus ${k.glyphSources} (aus ${k.glyphInstitutions} ${k.glyphInstitutions === 1 ? 'Archiv bzw. Plattform' : 'verschiedenen Archiven bzw. Plattformen'}). Bis dahin lassen sich die Fundstücke selbst durchsehen.</p></div>`;
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
    const conf = (c) => L.confidence[c] ?? c;
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
            ${gl.length ? `<ul class="claims">${gl.map((g) => `<li><div class="claim-meta"><span class="kind">Buchstabe ${esc(g.glyph)}</span><span>Lesbarkeit: ${esc(conf(g.legibility))}</span><span>Transkription: ${esc(conf(g.transcriptionConfidence))}</span></div><div>${esc(g.observationDe)}</div></li>`).join('')}</ul>` : '<p class="muted">Auf diesem Fundstück ist noch kein Buchstabe einzeln und sicher erfasst. Einzelne Buchstaben werden nicht aus unleserlichen Wörtern erschlossen.</p>'}
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

  return { landing, browser, detail };
}
