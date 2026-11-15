// THE BLACKBOOK ARCHIVE — parsers for the research library (C06).
//
// The research Markdown files are the editorial source of truth. These pure
// functions read them; nothing here writes or edits research files.
//   - sources:  "### S1 — Title", "## SR-NYC-001 — Title", "- **DE-03:** Creator, Title. URL"
//   - claims:   ledger table rows "| NYC-001 | claim | class | support | status |"
//   - entries:  research/archive/entries/*.md (front matter + sections + claims table)

const URL_RE = /https?:\/\/[^\s)>\]]+/g;
const CLAIM_ID_RE = /\b[A-Z]{2,5}-\d{3}\b/g;

const clean = (s) => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

/** Source records of one research file. Global ID: `${fileKey}#${localId}`. */
export function parseSources(fileKey, text) {
  const lines = text.split('\n');
  const out = [];
  const head = /^(#{2,3}) +((?:S\d+)|(?:SR-[A-Z]+-\d+)|(?:[A-Z]{2,4}-S\d+)) +[—–-] +(.+)$/;
  const item = /^- \*\*([A-Z]{2,4}-\d{2,3}):\*\* +(.+)$/;
  for (let i = 0; i < lines.length; i++) {
    let m = lines[i].match(head);
    if (m) {
      const level = m[1].length;
      const body = [];
      for (let j = i + 1; j < lines.length; j++) {
        const h = lines[j].match(/^(#{1,6}) /);
        if (h && h[1].length <= level) break;
        body.push(lines[j]);
      }
      out.push(sourceRecord(fileKey, m[2], clean(m[3]), body.join('\n'), i + 1));
      continue;
    }
    m = lines[i].match(item);
    if (m) out.push(sourceRecord(fileKey, m[1], clean(m[2].replace(URL_RE, '').replace(/[.\s]+$/, '')), m[2], i + 1));
  }
  return out;
}

function sourceRecord(fileKey, localId, title, body, line) {
  const field = (name) => body.match(new RegExp(`^- *${name}: *(.+)$`, 'mi'))?.[1]?.trim() ?? null;
  const use = field('Evidence use');
  return {
    id: `${fileKey}#${localId}`,
    localId,
    file: `research/${fileKey}.md`,
    line,
    title,
    urls: [...new Set(body.match(URL_RE) ?? [])],
    evidenceClass: field('Evidence class'),
    limitation: field('Limitation') ?? field('Caution'),
    accessed: body.match(/Accessed (\d{4}-\d{2}-\d{2})/)?.[1] ?? null,
    evidenceUse: use ? [...new Set(use.match(CLAIM_ID_RE) ?? [])] : [],
  };
}

/** Claim-ledger rows: | ID | claim | evidence class | support | editorial status | */
export function parseLedgerClaims(fileKey, text) {
  const out = [];
  text.split('\n').forEach((line, i) => {
    const m = line.match(/^\| *([A-Z]{2,5}-\d{3}) *\|(.+)\|\s*$/);
    if (!m) return;
    const cells = m[2].split('|').map((c) => c.trim());
    if (cells.length < 4) return;
    out.push({
      id: m[1],
      file: `research/${fileKey}.md`,
      line: i + 1,
      text: cells[0],
      evidenceClass: cells[1],
      support: cells[2],
      ledgerStatus: cells[3],
    });
  });
  return out;
}

// ---------- archive entry files ----------

const LIST_KEYS = new Set(['aliases', 'related', 'places', 'regions', 'facets', 'generator', 'diagrams']);

/** Minimal front matter: `key: value`, lists separated by ";". */
export function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error('missing front matter');
  const data = {};
  for (const raw of m[1].split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const kv = raw.match(/^([a-zA-Z][\w-]*): *(.*)$/);
    if (!kv) throw new Error(`bad front matter line: ${raw}`);
    const [, k, v] = kv;
    data[k] = LIST_KEYS.has(k) ? v.split(';').map((s) => s.trim()).filter(Boolean) : v.trim();
  }
  return { data, body: text.slice(m[0].length) };
}

/** Split body into "## Heading" sections (level-2 only). */
export function sections(body) {
  const out = {};
  let cur = '_lead';
  out[cur] = [];
  for (const line of body.split('\n')) {
    const h = line.match(/^## +(.+)$/);
    if (h) { cur = h[1].trim(); out[cur] = []; continue; }
    out[cur].push(line);
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join('\n').trim()]));
}

/** Entry claims table: | id | kind | evidence | sources | claim | */
export function parseClaimsTable(md) {
  const out = [];
  for (const line of (md ?? '').split('\n')) {
    const m = line.match(/^\| *(c\d+) *\|(.+)\|\s*$/);
    if (!m) continue;
    const [kind, evidence, sources, ...rest] = m[2].split('|').map((c) => c.trim());
    out.push({ localId: m[1], kind, evidence, sources: sources.split(';').map((s) => s.trim()).filter(Boolean), text: rest.join('|').trim() });
  }
  return out;
}

/** "Not the same as" list: "- **Label** (→ entry.id) — explanation" */
export function parseDistinctions(md) {
  return (md ?? '').split('\n').map((l) => l.match(/^- \*\*(.+?)\*\*(?: \(→ ([a-z]+\.[a-z0-9-]+)\))? [—–-] (.+)$/))
    .filter(Boolean).map(([, label, target, text]) => ({ label, target: target ?? null, text }));
}

/** Section headings per edition language. Keys are language-neutral. */
export const SECTION_HEADINGS = {
  de: {
    'Einführung': 'introduction', 'Warum es wichtig ist': 'whyItMatters', 'Woran man es erkennt': 'recognize',
    'Kontext und Entwicklung': 'context', 'Begriffe und Varianten': 'terminology', 'Zur Quellenlage': 'evidenceNotes', 'In NIGHTSHIFT': 'inNightshift',
  },
  en: {
    'Introduction': 'introduction', 'Why it matters': 'whyItMatters', 'How to recognize it': 'recognize',
    'Context and development': 'context', 'Terminology and variants': 'terminology', 'Evidence notes': 'evidenceNotes', 'In NIGHTSHIFT': 'inNightshift',
  },
};
export const SPECIAL_HEADINGS = { de: { distinctions: 'Nicht zu verwechseln mit', claims: 'Belege' }, en: { distinctions: 'Not the same as', claims: 'Claims' } };

export function parseEntry(path, text, lang = 'de') {
  const { data, body } = parseFrontMatter(text);
  const s = sections(body);
  const keys = SECTION_HEADINGS[lang], special = SPECIAL_HEADINGS[lang];
  const title = s._lead.match(/^# +(.+)$/m)?.[1]?.trim() ?? null;
  const summary = s._lead.match(/^> +(.+)$/m)?.[1]?.trim() ?? null;
  const entry = { ...data, file: path, title, summary, sections: {}, distinctions: parseDistinctions(s[special.distinctions]), claims: parseClaimsTable(s[special.claims]) };
  for (const [heading, key] of Object.entries(keys)) if (s[heading]) entry.sections[key] = s[heading];
  entry.unknownSections = Object.keys(s).filter((k) => k !== '_lead' && !(k in keys) && !Object.values(special).includes(k));
  return entry;
}

/** Inline references in prose: [c1], [NYC-005], [c1; NYC-002] and [[entry.id|label]]. */
export function inlineRefs(md) {
  const claims = new Set();
  const links = new Set();
  for (const m of (md ?? '').matchAll(/\[\[([a-z]+\.[a-z0-9-]+)(?:\|[^\]]+)?\]\]/g)) links.add(m[1]);
  for (const m of (md ?? '').replace(/\[\[[^\]]+\]\]/g, '').matchAll(/\[((?:c\d+|[A-Z]{2,5}-\d{3})(?:; *(?:c\d+|[A-Z]{2,5}-\d{3}))*)\]/g)) {
    for (const id of m[1].split(';')) claims.add(id.trim());
  }
  return { claims: [...claims], links: [...links] };
}

/** TIMELINE.md: | id | date label | sort | title | entry | claims | certainty | */
export function parseTimeline(text) {
  return text.split('\n').map((l) => l.match(/^\| *(ev\.[a-z0-9-]+) *\|(.+)\|\s*$/)).filter(Boolean).map(([, id, rest]) => {
    const [date, sort, title, entry, claims, certainty] = rest.split('|').map((c) => c.trim());
    return { id, date, sort: Number(sort), title, entry, claims: claims.split(';').map((c) => c.trim()).filter(Boolean), certainty };
  });
}

/** LEARNING_PATHS.md: "## path.id — Title", intro paragraph, "1. entry.id — framing" */
export function parsePaths(text) {
  const out = [];
  let cur = null;
  for (const line of text.split('\n')) {
    const h = line.match(/^## +(path\.[a-z0-9-]+) +[—–-] +(.+)$/);
    if (h) { cur = { id: h[1], title: h[2].trim(), intro: '', steps: [] }; out.push(cur); continue; }
    if (!cur) continue;
    const st = line.match(/^\d+\. +([a-z]+\.[a-z0-9-]+) +[—–-] +(.+)$/);
    if (st) cur.steps.push({ entry: st[1], framing: st[2].trim() });
    else if (line.trim() && !cur.steps.length && !line.startsWith('#')) cur.intro = (cur.intro + ' ' + line.trim()).trim();
  }
  return out;
}
