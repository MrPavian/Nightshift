// THE BLACKBOOK ARCHIVE (C06) — reads the generated data/archive/archive.v1.json.
// The UI chrome is German; entry content is English (the language of the research library).
// No editorial content lives in this file: everything shown comes from the build output.
import { bridgeHref } from '../src/bridge/editor-bridge.js';

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const TYPE_DE = {
  history: 'Geschichte', event: 'Ereignis', scene: 'Szene', practice: 'Praxis', style: 'Buchstabenstil', composition: 'Komposition',
  format: 'Format / Fläche', technique: 'Technik / Material', person: 'Person', crew: 'Crew / Netzwerk', media: 'Medien', object: 'Objekt / Archiv',
  construction: 'Buchstabenbau', concept: 'Begriff',
};
const KIND_DE = {
  'documented-fact': ['Dokumentierte Tatsache', '#1d2633'],
  'institutional-account': ['Darstellung einer Institution', '#23706d'],
  'practitioner-account': ['Aussage aus der Szene', '#2b5c8a'],
  'scholarly-interpretation': ['Wissenschaftliche Deutung', '#4d6332'],
  'editorial-synthesis': ['Redaktionelle Einordnung', '#c8372d'],
  'nightshift-design-inference': ['NIGHTSHIFT-Designannahme', '#c8372d'],
};
const EVIDENCE_DE = { strong: 'stark', good: 'gut', contextual: 'Kontext', 'unverified-lead': 'ungeprüfter Hinweis' };
const EDITORIAL_DE = { draft: 'Entwurf', 'source-checked': 'Quellen geprüft', 'editorial-reviewed': 'redaktionell geprüft', 'approved-for-archive': 'freigegeben', superseded: 'ersetzt' };
const RIGHTS_DE = { none: 'keine Abbildungen', 'original-diagram': 'eigene Diagramme', 'link-only': 'nur verlinkt', 'rights-unknown': 'Rechte unklar', 'permission-requested': 'Erlaubnis angefragt', cleared: 'Rechte geklärt', 'do-not-reuse': 'nicht verwenden' };
const SECTIONS = [
  ['introduction', 'Einführung'], ['whyItMatters', 'Warum es wichtig ist'], ['howToRecognize', 'Woran man es erkennt'],
  ['context', 'Kontext und Entwicklung'], ['terminology', 'Begriffe und Varianten'], ['evidenceNotes', 'Zur Quellenlage'], ['inNightshift', 'In NIGHTSHIFT'],
];
const ORDER = ['history', 'scene', 'practice', 'style', 'construction', 'format', 'media', 'object', 'person', 'concept'];

let A, byId, claims, sources;
const tc = (type) => `--tc: var(--t-${type})`;

// ---------- persistence (per viewer, optional) ----------
const visited = new Set((() => { try { return JSON.parse(localStorage.getItem('nightshift.archive.visited') || '[]'); } catch { return []; } })());
function markVisited(id) {
  visited.add(id);
  try { localStorage.setItem('nightshift.archive.visited', JSON.stringify([...visited])); } catch { /* storage unavailable: progress is kept for this visit only */ }
}

// ---------- inline text ----------
const REF = /\[((?:c\d+|[A-Z]{2,}-\d{3})(?:;\s*(?:c\d+|[A-Z]{2,}-\d{3}))*)\]/g;
function inline(text, entryId) {
  let s = esc(text);
  s = s.replace(/\[\[([a-z]+\.[a-z0-9-]+)\|([^\]]+)\]\]/g, (_, id, label) => byId.has(id) ? `<a href="#/entry/${id}">${label}</a>` : label);
  s = s.replace(REF, (_, list) => list.split(';').map((r) => refButton(r.trim(), entryId)).join(''));
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return s;
}
function claimId(ref, entryId) { return /^c\d+$/.test(ref) ? `${entryId}#${ref}` : ref; }
function refButton(ref, entryId) {
  const id = claimId(ref, entryId), c = claims.get(id);
  if (!c) return '';
  const n = /^c\d+$/.test(ref) ? ref.slice(1) : ref;
  return `<button type="button" class="ref" data-claim="${esc(id)}" data-kind="${c.kind}" aria-label="Beleg ${esc(n)}: ${esc(KIND_DE[c.kind]?.[0] ?? c.kind)}">${esc(n)}</button>`;
}
function blocks(text, entryId) {
  return text.split(/\n{2,}/).map((p) => {
    const lines = p.split('\n');
    if (lines.every((l) => /^- /.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.slice(2), entryId)}</li>`).join('')}</ul>`;
    return `<p lang="en">${inline(p.replace(/\n/g, ' '), entryId)}</p>`;
  }).join('');
}

// ---------- pieces ----------
function tabRow(e, { highlight } = {}) {
  const mark = (s) => highlight ? esc(s).replace(new RegExp(`(${highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi'), '<mark>$1</mark>') : esc(s);
  return `<li><a href="#/entry/${e.id}" style="${tc(e.type)}"><span class="t-type">${TYPE_DE[e.type]}${e.period ? ` · ${esc(e.period)}` : ''}</span><span class="t-title" lang="en">${mark(e.title)}</span><span class="t-sum" lang="en">${mark(e.summary.replace(REF, '').replace(/\s+\./g, '.'))}</span></a></li>`;
}
const tabs = (list, opts) => `<ul class="tabs">${list.map((e) => tabRow(e, opts)).join('')}</ul>`;
function figure(id) {
  const svg = A.diagrams[id];
  if (!svg) return '';
  const title = svg.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] ?? '';
  return `<figure class="figure">${svg}<figcaption>Eigenes Diagramm: <span lang="en">${esc(title)}</span></figcaption></figure>`;
}
function pathProgress(p) {
  const done = p.steps.filter((s) => visited.has(s.entry)).length;
  return { done, pct: Math.round((done / p.steps.length) * 100) };
}

// ---------- views ----------
function viewHome() {
  const scenes = A.entries.filter((e) => e.type === 'scene').sort((a, b) => a.sort - b.sort);
  const foundation = ['history.nyc-emergence', 'concept.writing-and-graffiti', 'concept.public-inscription', 'practice.tag', 'format.subway-train', 'concept.circulation-and-adaptation'].map((id) => byId.get(id)).filter(Boolean);
  const types = ORDER.filter((t) => A.entries.some((e) => e.type === t));
  return {
    title: 'Blackbook-Archiv',
    html: `<section class="hero">
      <h1>Blackbook-Archiv</h1>
      <p>Wie aus Namen an Wänden eine Kultur wurde: von New York und Philadelphia bis Amsterdam, Paris, São Paulo, China und ins Ruhrgebiet. Jede Aussage ist belegt.</p>
      <form class="search" role="search" action="#/suche" data-search>
        <label for="q" class="sr">Archiv durchsuchen</label>
        <input id="q" name="q" type="search" placeholder="Suchen: Tag, Pixação, Dortmund, Blackbook …" autocomplete="off">
        <button type="submit">Suchen</button>
      </form>
      <ul class="chips" aria-label="Nach Themenart stöbern">${types.map((t) => `<li><a class="chip" style="${tc(t)}" href="#/suche?typ=${t}">${TYPE_DE[t]}</a></li>`).join('')}</ul>
    </section>
    <div class="home-grid">
      <section aria-labelledby="h-start"><div class="section-head"><h2 id="h-start">Hier anfangen</h2><a href="#/a-z">Alle ${A.entries.length} Einträge</a></div>${tabs(foundation)}</section>
      <div>
        <section aria-labelledby="h-paths"><div class="section-head"><h2 id="h-paths">Lernpfade</h2><a href="#/pfade">Alle Pfade</a></div>
          <ul class="paths">${A.paths.map((p) => { const pr = pathProgress(p); return `<li><a class="path-link" href="#/pfad/${p.id}"><strong lang="en">${esc(p.title)}</strong><span>${p.steps.length} Stationen${pr.done ? ` · ${pr.done} gelesen` : ''}</span><div class="progress" aria-hidden="true"><i style="width:${pr.pct}%"></i></div></a></li>`; }).join('')}</ul>
        </section>
        <section aria-labelledby="h-scenes" style="margin-top:2.2rem"><div class="section-head"><h2 id="h-scenes">Szenen</h2><a href="#/szenen">Nach Region</a></div>${tabs(scenes)}</section>
      </div>
    </div>
    <section style="margin-top:2.4rem" aria-labelledby="h-read"><div class="section-head"><h2 id="h-read">So liest du das Archiv</h2><a href="#/so-liest-du">Mehr dazu</a></div>
      <p class="prose">Die farbigen Marken im Text öffnen den Beleg zu einer Aussage. Die Farbe zeigt, welche Art von Aussage es ist:</p>${figure('diagram.evidence-layers')}</section>`,
  };
}

function search(q, type, region) {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  let list = A.entries.filter((e) => (!type || e.type === type) && (!region || e.regions?.includes(region)));
  if (!terms.length) return { list: list.sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type) || a.title.localeCompare(b.title)), terms };
  const scored = list.map((e) => {
    const f = { title: norm(e.title), alias: norm((e.aliases ?? []).join(' ')), sum: norm(e.summary), body: norm(Object.values(e.sections).join(' ')), reg: norm((e.regions ?? []).join(' ')) };
    let score = 0;
    for (const t of terms) {
      const s = (f.title.includes(t) ? 6 : 0) + (f.alias.includes(t) ? 5 : 0) + (f.reg.includes(t) ? 3 : 0) + (f.sum.includes(t) ? 2 : 0) + (f.body.includes(t) ? 1 : 0);
      if (!s) return { e, score: 0 };
      score += s;
    }
    return { e, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score || a.e.title.localeCompare(b.e.title));
  return { list: scored.map((x) => x.e), terms };
}

function viewSearch(params) {
  const q = params.get('q') ?? '', type = params.get('typ') ?? '', region = params.get('region') ?? '';
  const { list, terms } = search(q, type, region);
  const types = ORDER.filter((t) => A.entries.some((e) => e.type === t));
  const regions = [...new Set(A.entries.flatMap((e) => e.regions ?? []))].sort((a, b) => a.localeCompare(b, 'de'));
  const link = (p) => { const u = new URLSearchParams({ q, typ: type, region, ...p }); for (const [k, v] of [...u]) if (!v) u.delete(k); return `#/suche${u.size ? `?${u}` : ''}`; };
  const empty = `<div class="empty"><p><strong>Kein Eintrag passt zu „${esc(q)}“${type ? ` in „${TYPE_DE[type]}“` : ''}.</strong></p><p>Versuche einen anderen Begriff, entferne den Filter oder blättere im <a href="#/a-z">A–Z-Verzeichnis</a>. Das Archiv ist eine erste Auswahl, kein vollständiges Lexikon.</p></div>`;
  return {
    title: q ? `Suche: ${q}` : 'Suche',
    html: `<h1 style="font-size:var(--step-3)">Suche</h1>
      <form class="search" role="search" data-search style="margin-top:1rem">
        <label for="q" class="sr">Archiv durchsuchen</label>
        <input id="q" name="q" type="search" value="${esc(q)}" placeholder="Begriff, Ort, Name, Alias …" autocomplete="off">
        <input type="hidden" name="typ" value="${esc(type)}"><input type="hidden" name="region" value="${esc(region)}">
        <button type="submit">Suchen</button>
      </form>
      <ul class="chips" aria-label="Nach Art filtern"><li><a class="chip" href="${link({ typ: '' })}" aria-pressed="${!type}">Alle Arten</a></li>${types.map((t) => `<li><a class="chip" style="${tc(t)}" href="${link({ typ: t === type ? '' : t })}" aria-pressed="${t === type}">${TYPE_DE[t]}</a></li>`).join('')}</ul>
      <ul class="chips" aria-label="Nach Region filtern"><li><a class="chip" href="${link({ region: '' })}" aria-pressed="${!region}">Alle Regionen</a></li>${regions.map((r) => `<li><a class="chip" href="${link({ region: r === region ? '' : r })}" aria-pressed="${r === region}">${esc(r)}</a></li>`).join('')}</ul>
      <p class="result-count" role="status">${list.length} ${list.length === 1 ? 'Eintrag' : 'Einträge'}</p>
      ${list.length ? tabs(list, { highlight: terms.length ? q.split(/\s+/).filter(Boolean) : null }) : empty}`,
  };
}

function viewEntry(id, params) {
  const e = byId.get(id);
  if (!e) return viewMissing(id);
  markVisited(id);
  const path = A.paths.find((p) => p.id === params.get('pfad'));
  const sections = SECTIONS.filter(([k]) => e.sections[k]).map(([k, label]) => {
    const fig = k === 'introduction' ? (e.diagrams ?? []).map(figure).join('') : '';
    return `<h2>${label}</h2>${blocks(e.sections[k], e.id)}${fig}`;
  });
  if (e.distinctions.length) {
    sections.splice(Math.max(1, sections.length - (e.sections.evidenceNotes ? 1 : 0) - (e.sections.inNightshift ? 1 : 0)), 0,
      `<h2>Nicht zu verwechseln mit</h2><ul class="distinct">${e.distinctions.map((d) => `<li><strong lang="en">${d.target && byId.has(d.target) ? `<a href="#/entry/${d.target}">${esc(d.label)}</a>` : esc(d.label)}</strong><span lang="en">${inline(d.text.charAt(0).toUpperCase() + d.text.slice(1), e.id)}</span></li>`).join('')}</ul>`);
  }
  const allClaims = [...e.claimIds, ...e.citedLedgerClaims].map((c) => claims.get(c)).filter(Boolean);
  const claimList = `<h2 id="belege">Belege</h2><p class="muted">Alle Aussagen dieses Eintrags mit Art, Beleglage und Quelle.</p><ul class="claims">${allClaims.map((c) => claimItem(c)).join('')}</ul>`;
  const caps = A.bridge.capabilities;
  const actions = e.generatorLinks.map((g) => {
    const cap = caps[g.capability];
    if (!g.available) return `<div class="action off" aria-disabled="true"><strong>${esc(cap.labelDe)}</strong><span>Noch nicht verfügbar. ${esc(cap.reasonDe ?? '')}</span></div>`;
    const href = bridgeHref(g.capability, g.params, { from: e.id });
    return href ? `<a class="action" href="${esc(href)}"><strong>${esc(cap.labelDe)}${g.params.glyph ? ` (${esc(g.params.glyph)})` : g.params.word ? ` („${esc(g.params.word)}“)` : ''}</strong><span lang="en">${esc(cap.description)}</span></a>` : '';
  }).join('');
  const related = e.related.map((r) => byId.get(r)).filter(Boolean);
  const backlinks = A.entries.filter((x) => x.id !== e.id && !e.related.includes(x.id) && (x.related.includes(e.id) || x.inlineLinks.includes(e.id)));
  const events = A.timeline.filter((ev) => ev.entry === e.id);
  let pathNav = '';
  if (path) {
    const i = path.steps.findIndex((s) => s.entry === e.id);
    if (i >= 0) {
      const prev = path.steps[i - 1], next = path.steps[i + 1];
      pathNav = `<nav class="pathnav" aria-label="Lernpfad"><p>Lernpfad <a href="#/pfad/${path.id}" lang="en">${esc(path.title)}</a> · Station ${i + 1} von ${path.steps.length}</p>
        ${prev ? `<a class="btn ghost" href="#/entry/${prev.entry}?pfad=${path.id}">Zurück: <span lang="en">${esc(byId.get(prev.entry).title)}</span></a>` : '<span></span>'}
        ${next ? `<a class="btn" href="#/entry/${next.entry}?pfad=${path.id}">Weiter: <span lang="en">${esc(byId.get(next.entry).title)}</span></a>` : `<a class="btn" href="#/pfad/${path.id}">Pfad abgeschlossen</a>`}</nav>`;
    }
  }
  return {
    title: e.title,
    html: `<article class="entry" style="${tc(e.type)}">
      <div>
        <header class="entry-head">
          <p class="kicker">${TYPE_DE[e.type]}</p>
          <h1 lang="en">${esc(e.title)}</h1>
          <p class="summary" lang="en">${inline(e.summary, e.id)}</p>
          <ul class="facts">${e.period ? `<li><b>Zeitraum</b> ${esc(e.period)}</li>` : ''}${e.regions?.length ? `<li><b>Orte</b> ${e.regions.map((r) => `<a href="#/suche?region=${encodeURIComponent(r)}">${esc(r)}</a>`).join(', ')}</li>` : ''}${e.aliases?.length ? `<li><b>Auch</b> <span lang="en">${e.aliases.map(esc).join(', ')}</span></li>` : ''}</ul>
        </header>
        <div class="prose">${sections.join('')}${claimList}</div>
        ${pathNav}
      </div>
      <aside class="aside" aria-label="Zum Eintrag">
        <section><h2>Status</h2><ul class="status">
          <li><span>Beleglage</span><span>${EVIDENCE_DE[e.evidence]}</span></li>
          <li><span>Redaktion</span><span>${EDITORIAL_DE[e.editorialStatus]}</span></li>
          <li><span>Bildrechte</span><span>${RIGHTS_DE[e.imageRights]}</span></li>
          <li><span>Aussagen</span><span><a href="#belege" data-jump="belege">${allClaims.length}</a></span></li>
        </ul><p class="muted" style="font-size:var(--step--1)">Die Freigabe durch den Projektinhaber steht für alle Einträge dieser Ausgabe noch aus.</p></section>
        ${actions ? `<section><h2>Im Editor ausprobieren</h2><div class="actions">${actions}</div></section>` : ''}
        ${events.length ? `<section><h2>Auf der Zeitleiste</h2><ul class="status">${events.map((ev) => `<li><span lang="en">${esc(ev.title)}</span><span>${esc(ev.date)}</span></li>`).join('')}</ul><p><a href="#/zeitleiste">Zur Zeitleiste</a></p></section>` : ''}
        <section><h2>Weiterlesen</h2>${tabs(related)}</section>
        ${backlinks.length ? `<section><h2>Verweist hierher</h2>${tabs(backlinks)}</section>` : ''}
      </aside>
    </article>`,
  };
}

function sourceLine(sid) {
  if (sid.startsWith('doc:')) return `<li>Projektdokument der Recherche-Bibliothek: <code>${esc(sid.slice(4))}</code></li>`;
  const s = sources.get(sid);
  if (!s) return '';
  const url = s.urls?.[0];
  return `<li lang="en">${url ? `<a href="${esc(url)}" rel="noopener" target="_blank">${inline(s.title)}</a>` : inline(s.title)}${s.limitation ? `<br><span class="muted">Einschränkung: ${esc(s.limitation)}</span>` : ''}</li>`;
}
function claimItem(c, { full = false } = {}) {
  const [kind, color] = KIND_DE[c.kind] ?? [c.kind, ''];
  const label = c.origin === 'ledger' ? `Ledger ${c.id}` : c.id.split('#')[1];
  return `<li id="claim-${esc(c.id.replace('#', '-'))}"><div class="claim-meta"><span class="kind" style="--kc:${color}">${kind}</span><span>Beleglage: ${EVIDENCE_DE[c.evidence]}</span><span>${esc(label)}</span></div>
    <${full ? 'blockquote' : 'div'} lang="en">${esc(c.text)}</${full ? 'blockquote' : 'div'}>
    ${c.ledger ? `<p class="muted" style="font-size:var(--step--1);margin:.2rem 0">Aus dem Claim-Ledger: <span lang="en">${esc(c.ledger.status)}</span></p>` : ''}
    <ul class="src">${c.sources.map(sourceLine).join('')}</ul></li>`;
}

function viewTimeline() {
  let last = null;
  const items = A.timeline.map((ev) => {
    const e = byId.get(ev.entry);
    const dec = ev.sort < 1900 ? '19. Jh.' : `${Math.floor(ev.sort / 10) * 10}er`;
    const head = dec !== last ? `</ol><h2 class="decade">${dec}</h2><ol class="timeline">` : '';
    last = dec;
    return `${head}<li style="${tc(e.type)}"><div class="when">${esc(ev.date)}<small class="cert" data-c="${ev.certainty}">${{ documented: 'belegt', approximate: 'ungefähr', contested: 'umstritten' }[ev.certainty]}</small></div>
      <div><a class="what" href="#/entry/${e.id}" lang="en">${esc(ev.title)}</a><span class="where">${TYPE_DE[e.type]}: <span lang="en">${esc(e.title)}</span></span> ${ev.claims.map((c) => refButton(c.includes('#') ? c.split('#')[1] : c, c.includes('#') ? c.split('#')[0] : e.id)).join('')}</div></li>`;
  }).join('');
  return {
    title: 'Zeitleiste',
    html: `<h1 style="font-size:var(--step-3)">Zeitleiste</h1><p class="prose">Ausgewählte Momente aus den Einträgen – keine vollständige Chronik. Mehrere Orte entwickeln sich parallel; Daten aus Erinnerungen sind als „ungefähr“ markiert.</p>
      <ol class="timeline">${items}</ol>`.replace('<ol class="timeline"></ol>', ''),
  };
}

function viewScenes() {
  const scenes = A.entries.filter((e) => e.type === 'scene' || e.id === 'history.nyc-emergence').sort((a, b) => a.sort - b.sort);
  return {
    title: 'Szenen',
    html: `<h1 style="font-size:var(--step-3)">Szenen und Regionen</h1><p class="prose">Writing hat viele Orte und Geschichten. Jede Szene steht für sich – mit eigener Chronologie, eigenen Begriffen und eigenem Austausch.</p>${figure('diagram.circulation-network')}
      <div class="regions">${scenes.map((s) => {
        const regional = A.entries.filter((x) => x.id !== s.id && x.regions?.some((r) => s.regions?.includes(r)));
        const near = regional.length ? regional : s.related.map((r) => byId.get(r)).filter(Boolean);
        return `<section style="${tc(s.type)}"><div class="section-head"><h2 lang="en"><a href="#/entry/${s.id}">${esc(s.title)}</a></h2><span class="muted">${esc(s.period ?? '')}</span></div><p lang="en" class="muted">${inline(s.summary, s.id)}</p>${near.length ? tabs(near) : ''}</section>`;
      }).join('')}</div>`,
  };
}

function viewPaths() {
  return {
    title: 'Lernpfade',
    html: `<h1 style="font-size:var(--step-3)">Lernpfade</h1><p class="prose">Geführte Wege durch das Archiv. Jede Station ist ein Eintrag; „Weiter“ führt zur nächsten. Der Fortschritt wird nur in diesem Browser gespeichert.</p>
      <ul class="paths" style="max-width:46rem">${A.paths.map((p) => { const pr = pathProgress(p); return `<li><a class="path-link" href="#/pfad/${p.id}"><strong lang="en">${esc(p.title)}</strong><span lang="en">${esc(p.intro)}</span><br><span>${p.steps.length} Stationen · ${pr.done} gelesen</span><div class="progress" aria-hidden="true"><i style="width:${pr.pct}%"></i></div></a></li>`; }).join('')}</ul>`,
  };
}

function viewPath(id) {
  const p = A.paths.find((x) => x.id === id);
  if (!p) return viewMissing(id);
  const pr = pathProgress(p);
  const firstOpen = p.steps.find((s) => !visited.has(s.entry)) ?? p.steps[0];
  return {
    title: p.title,
    html: `<p><a href="#/pfade">Alle Lernpfade</a></p><h1 style="font-size:var(--step-3)" lang="en">${esc(p.title)}</h1><p class="prose" lang="en">${esc(p.intro)}</p>
      <p>${pr.done} von ${p.steps.length} Stationen gelesen.</p><div class="progress" style="max-width:30rem" role="progressbar" aria-valuemin="0" aria-valuemax="${p.steps.length}" aria-valuenow="${pr.done}" aria-label="Fortschritt"><i style="width:${pr.pct}%"></i></div>
      <p style="margin:1.2rem 0"><a class="btn" href="#/entry/${firstOpen.entry}?pfad=${p.id}">${pr.done && pr.done < p.steps.length ? 'Weiterlesen' : 'Pfad beginnen'}</a></p>
      <ol class="tabs" style="max-width:46rem">${p.steps.map((s, i) => { const e = byId.get(s.entry); return `<li><a href="#/entry/${e.id}?pfad=${p.id}" style="${tc(e.type)}"><span class="t-type">Station ${i + 1} · ${TYPE_DE[e.type]}${visited.has(e.id) ? ' · gelesen' : ''}</span><span class="t-title" lang="en">${esc(e.title)}</span><span class="t-sum" lang="en">${esc(s.framing)}</span></a></li>`; }).join('')}</ol>`,
  };
}

function viewAZ() {
  const items = A.entries.flatMap((e) => [{ key: e.title, e }, ...(e.aliases ?? []).filter((a) => norm(a) !== norm(e.title)).map((a) => ({ key: a, e, alias: true }))]);
  items.sort((a, b) => norm(a.key).localeCompare(norm(b.key), 'de'));
  const groups = new Map();
  for (const it of items) { const L = norm(it.key)[0].toUpperCase(); if (!groups.has(L)) groups.set(L, []); groups.get(L).push(it); }
  return {
    title: 'A–Z',
    html: `<h1 style="font-size:var(--step-3)">A–Z</h1><p class="prose">Alle Einträge und ihre anderen Namen. Kursive Namen verweisen auf einen Eintrag.</p>
      <div class="az">${[...groups].map(([L, list]) => `<section><h2>${esc(L)}</h2><ul>${list.map((it) => it.alias ? `<li class="alias" lang="en"><em>${esc(it.key)}</em> siehe <a href="#/entry/${it.e.id}">${esc(it.e.title)}</a></li>` : `<li lang="en"><a href="#/entry/${it.e.id}">${esc(it.key)}</a> <span class="alias">${TYPE_DE[it.e.type]}</span></li>`).join('')}</ul></section>`).join('')}</div>`,
  };
}

function viewSources() {
  const users = new Map();
  for (const c of A.claims) for (const s of c.sources) { if (!users.has(s)) users.set(s, new Set()); if (c.entry) users.get(s).add(c.entry); }
  return {
    title: 'Quellen',
    html: `<h1 style="font-size:var(--step-3)">Quellen</h1><p class="prose">Alle zitierten Quellen dieser Ausgabe, wie sie in der Recherche-Bibliothek verzeichnet sind. Verlinkte Seiten liegen außerhalb des Archivs.</p>
      <ul class="sources">${A.sources.map((s) => `<li lang="en">${s.urls?.[0] ? `<a href="${esc(s.urls[0])}" rel="noopener" target="_blank">${inline(s.title)}</a>` : inline(s.title)}<br><span class="muted">Verwendet in: ${[...(users.get(s.id) ?? [])].map((id) => `<a href="#/entry/${id}">${esc(byId.get(id)?.title ?? id)}</a>`).join(', ') || 'Ledger-Aussagen'}</span></li>`).join('')}</ul>`,
  };
}

function viewMissing(id) {
  return { title: 'Nicht gefunden', html: `<div class="empty"><h1 style="font-size:var(--step-2)">Diesen Eintrag gibt es nicht.</h1><p>„${esc(id)}“ ist nicht Teil dieser Ausgabe. Suche nach dem Begriff oder öffne das <a href="#/a-z">A–Z-Verzeichnis</a>.</p><p><a class="btn" href="#/suche?q=${encodeURIComponent(String(id).split('.').pop())}">Danach suchen</a></p></div>` };
}

// ---------- claim sheet ----------
function openClaim(id) {
  const c = claims.get(id);
  if (!c) return;
  const entry = c.entry ? byId.get(c.entry) : null;
  $('#claim-title').textContent = KIND_DE[c.kind]?.[0] ?? 'Beleg';
  $('#claim-body').innerHTML = `<ul class="claims">${claimItem(c, { full: true })}</ul>${entry ? `<p class="muted" style="font-size:var(--step--1)">Aus dem Eintrag <a href="#/entry/${entry.id}" data-close lang="en">${esc(entry.title)}</a>.</p>` : '<p class="muted" style="font-size:var(--step--1)">Diese Aussage stammt aus dem geprüften NYC-Claim-Ledger der Recherche-Bibliothek.</p>'}`;
  const d = $('#claim');
  if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
}

// ---------- router ----------
function route() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [pathPart, query = ''] = raw.split('?');
  const params = new URLSearchParams(query);
  const [head, ...rest] = pathPart.split('/');
  const arg = decodeURIComponent(rest.join('/'));
  let v;
  switch (head) {
    case '': v = viewHome(); break;
    case 'suche': v = viewSearch(params); break;
    case 'entry': v = viewEntry(arg, params); break;
    case 'zeitleiste': v = viewTimeline(); break;
    case 'szenen': v = viewScenes(); break;
    case 'pfade': v = viewPaths(); break;
    case 'pfad': v = viewPath(arg); break;
    case 'a-z': v = viewAZ(); break;
    case 'quellen': v = viewSources(); break;
    case 'so-liest-du': v = viewEntry('concept.reading-the-evidence', params); break;
    default: v = viewMissing(head);
  }
  const main = $('#main');
  main.innerHTML = v.html;
  document.title = `${v.title} · Blackbook-Archiv`;
  const section = head === 'pfad' ? 'pfade' : head;
  for (const a of document.querySelectorAll('[data-nav]')) {
    if (a.dataset.nav === section) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
  if (selftest.ready) main.focus({ preventScroll: true });
  selftest.route = head || 'home';
  selftest.overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  publish();
}

document.addEventListener('submit', (ev) => {
  const f = ev.target.closest('[data-search]');
  if (!f) return;
  ev.preventDefault();
  const fd = new FormData(f), u = new URLSearchParams();
  for (const [k, v] of fd) if (v) u.set(k, v);
  location.hash = `#/suche${u.size ? `?${u}` : ''}`;
});
document.addEventListener('click', (ev) => {
  const r = ev.target.closest('.ref');
  if (r) { ev.preventDefault(); openClaim(r.dataset.claim); return; }
  const j = ev.target.closest('[data-jump]');
  if (j) { ev.preventDefault(); document.getElementById(j.dataset.jump)?.scrollIntoView(); return; }
  if (ev.target.closest('[data-close]') || ev.target === $('#claim')) $('#claim').close?.();
});

// ---------- boot ----------
const selftest = { ready: false, errors: [], route: null };
window.addEventListener('error', (e) => selftest.errors.push(String(e.message)));
function publish() {
  let pre = document.getElementById('selftest');
  if (!pre) { pre = Object.assign(document.createElement('pre'), { id: 'selftest', hidden: true }); document.body.append(pre); }
  pre.textContent = JSON.stringify(selftest);
}
try {
  const res = await fetch('../data/archive/archive.v1.json');
  if (!res.ok) throw new Error(`Archivdaten nicht erreichbar (HTTP ${res.status})`);
  A = await res.json();
  byId = new Map(A.entries.map((e) => [e.id, e]));
  claims = new Map(A.claims.map((c) => [c.id, c]));
  sources = new Map(A.sources.map((s) => [s.id, s]));
  $('#foot-meta').textContent = `Archivdaten v${A.archiveSchemaVersion} · ${A.entries.length} Einträge · ${A.claims.length} Aussagen · ${A.sources.length} Quellen · Editor-Bridge v${A.bridge.version}`;
  selftest.entries = A.entries.length;
  window.addEventListener('hashchange', route);
  route();
  selftest.ready = true;
  if (new URLSearchParams(location.search).has('selftest')) {
    // Scripted check through the same handlers a tap uses: open the first claim marker on the page.
    const ref = document.querySelector('.ref');
    if (ref) { ref.click(); selftest.claimSheet = { open: $('#claim').open, hasSource: !!$('#claim-body .src li'), kind: $('#claim-title').textContent }; $('#claim').close(); }
    selftest.results = document.querySelectorAll('#main .tabs li').length;
  }
} catch (e) {
  $('#main').innerHTML = `<div class="empty"><h1 style="font-size:var(--step-2)">Das Archiv konnte nicht geladen werden.</h1><p>${esc(e.message)}. Lade die Seite neu; offline funktioniert das Archiv erst nach einem ersten Besuch mit Verbindung.</p></div>`;
  selftest.errors.push(e.message);
}
publish();

if ('serviceWorker' in navigator && !location.search.includes('nosw')) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline cache unavailable; the archive still works online */ });
}
