// Academy reference gallery: 26 owner-approved draft sheets plus documented corrections.
// Routing: #A … #Z shows one sheet, #hinweise or empty shows the overview.
const data = await (await fetch('../data/academy/uppercase-reference.v1.json')).json();
const LETTERS = Object.keys(data.letters);
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const panelName = (p) => (p === 0 ? 'Kopfzeile' : `Feld ${p}`);
const issueItem = (i, panels) => `<li><span class="kind">${esc(i.kind)}</span><strong>${esc(panels)}:</strong> ${esc(i.issue)}<span class="fix">${esc(i.correction)}</span></li>`;
const count = (n) => (n === 1 ? '1 Korrektur' : `${n} Korrekturen`);

$('grid').innerHTML = LETTERS.map((c) => `<li><a class="card" href="#${c}"><img src="../${data.letters[c].thumb}" alt="Lernblatt ${c}, Vorschau" width="480" height="320" loading="lazy"><span><b>${c}</b><small>${count(data.letters[c].issues.length)}</small></span></a></li>`).join('');
$('general').innerHTML = data.general.map((g) => issueItem(g, g.panels.map(panelName).join(', '))).join('');

function show() {
  const c = decodeURIComponent(location.hash.slice(1));
  const L = data.letters[c];
  $('grid-view').hidden = !!L; $('detail-view').hidden = !L;
  if (!L) { document.title = 'Academy: Großbuchstaben A–Z (Entwurf)'; if (c === 'hinweise') $('hinweise').scrollIntoView(); return; }
  const i = LETTERS.indexOf(c);
  document.title = `Lernblatt ${c} (Entwurf) – Academy`;
  $('d-title').textContent = `Lernblatt ${c}`;
  $('d-img').src = `../${L.image}`; $('d-img').alt = `Lernblatt ${c} mit neun Feldern (Entwurf, Texte ungeprüft)`;
  $('d-full').href = `../${L.image}`;
  $('d-issues').innerHTML = L.issues.length ? L.issues.map((x) => issueItem(x, panelName(x.panel))).join('') : '<li>Keine blattspezifischen Korrekturen gefunden.</li>';
  $('d-word').textContent = L.practiceWord;
  for (const [id, j] of [['prev', i - 1], ['next', i + 1]]) {
    const ok = j >= 0 && j < LETTERS.length, a = $(id);
    a.href = ok ? `#${LETTERS[j]}` : '#'; a.setAttribute('aria-disabled', String(!ok));
    a.textContent = `${id === 'prev' ? 'Vorheriger' : 'Nächster'}${ok ? `: ${LETTERS[j]}` : ''}`;
  }
  $('d-title').setAttribute('tabindex', '-1'); $('d-title').focus({ preventScroll: false });
}
$('back').addEventListener('click', (e) => { e.preventDefault(); history.pushState(null, '', location.pathname); show(); });
document.addEventListener('keydown', (e) => {
  if ($('detail-view').hidden || e.target.closest('input,textarea')) return;
  const i = LETTERS.indexOf(location.hash.slice(1));
  if (e.key === 'ArrowLeft' && i > 0) location.hash = LETTERS[i - 1];
  if (e.key === 'ArrowRight' && i < LETTERS.length - 1) location.hash = LETTERS[i + 1];
  if (e.key === 'Escape') $('back').click();
});
addEventListener('hashchange', show);
show();
document.documentElement.dataset.ready = 'true';
