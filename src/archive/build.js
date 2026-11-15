// THE BLACKBOOK ARCHIVE — deterministic build + validation (C06).
// Input: { files: [{path, text}] } from the research library. Output: archive data
// plus structured diagnostics. Pure; no I/O.

import { sha256Hex } from '../core/sha256.js';
import { parseSources, parseLedgerClaims, parseEntry, inlineRefs, parseTimeline, parsePaths } from './parse.js';
import { CAPABILITIES, BRIDGE_VERSION, parseGeneratorLink, validateBridgeParams } from './capabilities.js';

export const ARCHIVE_SCHEMA_VERSION = '1.0';
export const ENTRY_TYPES = {
  history: 'History / period', event: 'Event', scene: 'Place / scene', practice: 'Practice', style: 'Letterform style',
  composition: 'Composition', format: 'Format / surface', technique: 'Technique / material', person: 'Person / writer',
  crew: 'Crew / network', media: 'Media / publication', object: 'Object / archive', construction: 'Letter construction', concept: 'Concept / glossary',
};
export const CLAIM_KINDS = ['documented-fact', 'institutional-account', 'practitioner-account', 'scholarly-interpretation', 'editorial-synthesis', 'nightshift-design-inference'];
export const EVIDENCE = ['strong', 'good', 'contextual', 'unverified-lead'];
export const EDITORIAL = ['draft', 'source-checked', 'editorial-reviewed', 'approved-for-archive', 'superseded'];
export const IMAGE_RIGHTS = ['none', 'original-diagram', 'link-only', 'rights-unknown', 'permission-requested', 'cleared', 'do-not-reuse'];
const PUBLISHED = new Set(['source-checked', 'editorial-reviewed', 'approved-for-archive']);
const PLACEHOLDER = /\b(TODO|TBD|lorem ipsum|placeholder|FIXME)\b|\?\?\?/i;
const ID_RE = /^[a-z]+\.[a-z0-9-]+$/;

/**
 * @param {{files: {path:string, text:string}[], diagrams: string[]}} input
 */
export function buildArchive({ files, diagrams = [] }) {
  const diags = [];
  const err = (code, where, message) => diags.push({ severity: 'error', code, where, message });
  const warn = (code, where, message) => diags.push({ severity: 'warning', code, where, message });
  const byPath = (p) => files.find((f) => f.path === p);

  // 1. Sources and ledger claims from every research file.
  const sources = new Map();
  const ledgerClaims = new Map();
  for (const f of files.filter((x) => /^research\/[^/]+\.md$/.test(x.path))) {
    const key = f.path.replace(/^research\//, '').replace(/\.md$/, '');
    for (const s of parseSources(key, f.text)) sources.set(s.id, s);
    for (const c of parseLedgerClaims(key, f.text)) {
      if (ledgerClaims.has(c.id)) err('ARC_DUPLICATE_LEDGER_CLAIM', c.file, `${c.id} defined twice`);
      ledgerClaims.set(c.id, { ...c, sources: [] });
    }
  }
  for (const s of sources.values()) for (const cid of s.evidenceUse) ledgerClaims.get(cid)?.sources.push(s.id);

  // 2. Entries.
  const entries = [];
  for (const f of files.filter((x) => x.path.startsWith('research/archive/entries/')).sort((a, b) => a.path.localeCompare(b.path))) {
    try { entries.push(parseEntry(f.path, f.text)); } catch (e) { err('ARC_PARSE', f.path, e.message); }
  }
  const ids = new Map();
  for (const e of entries) {
    const where = e.file;
    if (!ID_RE.test(e.id ?? '')) err('ARC_BAD_ID', where, `invalid id ${e.id}`);
    if (ids.has(e.id)) err('ARC_DUPLICATE_ID', where, `${e.id} also in ${ids.get(e.id)}`);
    ids.set(e.id, where);
    if (!(e.type in ENTRY_TYPES)) err('ARC_BAD_TYPE', where, `unknown type ${e.type}`);
    if (e.id && e.type && !e.id.startsWith(`${e.type}.`)) err('ARC_ID_TYPE', where, `id must start with "${e.type}."`);
    for (const k of ['title', 'summary']) if (!e[k]) err('ARC_REQUIRED', where, `missing ${k}`);
    if (!e.sections.introduction) err('ARC_REQUIRED', where, 'missing "## Introduction"');
    if (e.unknownSections.length) err('ARC_UNKNOWN_SECTION', where, `unknown sections: ${e.unknownSections.join(', ')}`);
    if (!EDITORIAL.includes(e.editorialStatus)) err('ARC_BAD_STATUS', where, `editorialStatus ${e.editorialStatus}`);
    if (!EVIDENCE.includes(e.evidence)) err('ARC_BAD_EVIDENCE', where, `evidence ${e.evidence}`);
    if (!IMAGE_RIGHTS.includes(e.imageRights)) err('ARC_BAD_RIGHTS', where, `imageRights ${e.imageRights}`);
    if (!e.claims.length) err('ARC_NO_CLAIMS', where, 'an entry needs at least one claim');
    const text = [e.title, e.summary, ...Object.values(e.sections), ...e.distinctions.map((d) => d.text), ...e.claims.map((c) => c.text)].join('\n');
    if (PLACEHOLDER.test(text)) err('ARC_PLACEHOLDER', where, 'placeholder text found');
    for (const d of e.diagrams ?? []) if (!diagrams.includes(d)) err('ARC_UNKNOWN_DIAGRAM', where, `diagram ${d} is not implemented`);
  }

  // 3. Claims: entry-local claims + referenced ledger claims.
  const claimOut = new Map();
  const usedLedger = new Set();
  for (const e of entries) {
    const where = e.file;
    const local = new Map(e.claims.map((c) => [c.localId, c]));
    for (const c of e.claims) {
      const id = `${e.id}#${c.localId}`;
      if (!CLAIM_KINDS.includes(c.kind)) err('ARC_BAD_CLAIM_KIND', where, `${c.localId}: kind ${c.kind}`);
      if (!EVIDENCE.includes(c.evidence)) err('ARC_BAD_CLAIM_EVIDENCE', where, `${c.localId}: evidence ${c.evidence}`);
      if (!c.sources.length) err('ARC_UNSOURCED_CLAIM', where, `${c.localId} has no source`);
      for (const s of c.sources) {
        if (s.startsWith('doc:')) {
          if (!byPath(s.slice(4))) err('ARC_UNKNOWN_SOURCE', where, `${c.localId}: ${s}`);
          if (c.kind !== 'nightshift-design-inference' && c.kind !== 'editorial-synthesis') err('ARC_DOC_SOURCE_KIND', where, `${c.localId}: a project document can only support design inferences or editorial synthesis`);
        } else if (!sources.has(s)) err('ARC_UNKNOWN_SOURCE', where, `${c.localId}: ${s}`);
      }
      if (PUBLISHED.has(e.editorialStatus) && c.evidence === 'unverified-lead') err('ARC_LEAD_PUBLISHED', where, `${c.localId}: an unverified lead cannot appear in a ${e.editorialStatus} entry`);
      claimOut.set(id, { id, entry: e.id, kind: c.kind, evidence: c.evidence, sources: c.sources, text: c.text, origin: 'entry' });
    }
    const refs = inlineRefs([e.summary, ...Object.values(e.sections), ...e.distinctions.map((d) => d.text)].join('\n'));
    e._refs = refs;
    for (const r of refs.claims) {
      if (/^c\d+$/.test(r)) { if (!local.has(r)) err('ARC_UNKNOWN_CLAIM', where, `[${r}] not in the claims table`); }
      else if (!ledgerClaims.has(r)) err('ARC_UNKNOWN_CLAIM', where, `[${r}] is not a ledger claim`);
      else usedLedger.add(r);
    }
    for (const c of e.claims) if (!refs.claims.includes(c.localId)) warn('ARC_CLAIM_UNREFERENCED', where, `${c.localId} is never cited in the text`);
    if (!refs.claims.length) err('ARC_NO_CITATIONS', where, 'prose cites no claims');
  }
  for (const id of [...usedLedger].sort()) {
    const c = ledgerClaims.get(id);
    if (!c.sources.length) err('ARC_LEDGER_UNSOURCED', c.file, `${id} has no source with "Evidence use" for it`);
    claimOut.set(id, { id, entry: null, kind: ledgerKind(c.evidenceClass), evidence: ledgerEvidence(c.support), sources: c.sources, text: c.text, origin: 'ledger', ledger: { file: c.file, line: c.line, evidenceClass: c.evidenceClass, support: c.support, status: c.ledgerStatus } });
  }

  // 4. Links, related, generator capabilities.
  const entryIds = new Set(entries.map((e) => e.id));
  for (const e of entries) {
    for (const r of [...(e.related ?? []), ...e._refs.links, ...e.distinctions.filter((d) => d.target).map((d) => d.target), ...(e.places ?? [])]) {
      if (!entryIds.has(r)) err('ARC_DEAD_LINK', e.file, `link to unknown entry ${r}`);
    }
    if (!(e.related ?? []).length) err('ARC_NO_RELATED', e.file, 'needs at least one related entry');
    e.generatorLinks = (e.generator ?? []).map((g) => {
      const { capability, params } = parseGeneratorLink(g);
      const cap = CAPABILITIES[capability];
      if (!cap) { err('ARC_UNKNOWN_CAPABILITY', e.file, capability); return null; }
      const v = validateBridgeParams(capability, params);
      if (!v.ok) { err('ARC_BRIDGE_PARAMS', e.file, `${capability}: ${v.problem}`); return null; }
      return { capability, params, available: cap.status === 'available' };
    }).filter(Boolean);
  }

  // 5. Timeline and learning paths.
  const tl = byPath('research/archive/TIMELINE.md');
  const timeline = tl ? parseTimeline(tl.text) : [];
  const allClaimIds = new Set(claimOut.keys());
  for (const ev of timeline) {
    if (!entryIds.has(ev.entry)) err('ARC_DEAD_LINK', 'research/archive/TIMELINE.md', `${ev.id} → ${ev.entry}`);
    if (!Number.isFinite(ev.sort)) err('ARC_TIMELINE_SORT', 'research/archive/TIMELINE.md', `${ev.id} sort key`);
    if (!['documented', 'approximate', 'contested'].includes(ev.certainty)) err('ARC_TIMELINE_CERTAINTY', 'research/archive/TIMELINE.md', `${ev.id}: ${ev.certainty}`);
    if (!ev.claims.length) err('ARC_UNSOURCED_EVENT', 'research/archive/TIMELINE.md', ev.id);
    ev.claims = ev.claims.map((c) => (c.includes('#') || /^[A-Z]{2,5}-\d{3}$/.test(c) ? c : `${ev.entry}#${c}`));
    for (const c of ev.claims) if (!allClaimIds.has(c)) err('ARC_UNKNOWN_CLAIM', 'research/archive/TIMELINE.md', `${ev.id}: ${c}`);
  }
  timeline.sort((a, b) => a.sort - b.sort || a.id.localeCompare(b.id));
  const lp = byPath('research/archive/LEARNING_PATHS.md');
  const paths = lp ? parsePaths(lp.text) : [];
  if (paths.length < 2) err('ARC_PATHS', 'research/archive/LEARNING_PATHS.md', 'at least two learning paths are required');
  for (const p of paths) {
    if (p.steps.length < 3) err('ARC_PATHS', 'research/archive/LEARNING_PATHS.md', `${p.id} needs at least three steps`);
    for (const s of p.steps) if (!entryIds.has(s.entry)) err('ARC_DEAD_LINK', 'research/archive/LEARNING_PATHS.md', `${p.id} → ${s.entry}`);
  }

  // 6. Reachability: every entry has an incoming link (related, inline, path or timeline).
  const incoming = new Map(entries.map((e) => [e.id, 0]));
  const bump = (id) => incoming.has(id) && incoming.set(id, incoming.get(id) + 1);
  for (const e of entries) for (const r of new Set([...(e.related ?? []), ...e._refs.links])) if (r !== e.id) bump(r);
  for (const p of paths) for (const s of p.steps) bump(s.entry);
  for (const ev of timeline) bump(ev.entry);
  for (const [id, n] of incoming) if (!n) err('ARC_UNREACHABLE', ids.get(id), `${id} has no incoming link`);

  // 7. Output (deterministic ordering; only cited sources are exported).
  const citedSources = new Set([...claimOut.values()].flatMap((c) => c.sources).filter((s) => !s.startsWith('doc:')));
  const backlinks = {};
  for (const e of entries) for (const g of e.generatorLinks) (backlinks[g.capability] ??= []).push(e.id);
  const data = {
    archiveSchemaVersion: ARCHIVE_SCHEMA_VERSION,
    generatedFrom: files.map((f) => ({ path: f.path, sha256: sha256Hex(f.text) })).sort((a, b) => a.path.localeCompare(b.path)),
    taxonomy: { entryTypes: ENTRY_TYPES, claimKinds: CLAIM_KINDS, evidence: EVIDENCE, editorialStatus: EDITORIAL, imageRights: IMAGE_RIGHTS },
    entries: entries.map(({ _refs, claims, unknownSections, generator, ...e }) => ({
      ...e,
      claimIds: claims.map((c) => `${e.id}#${c.localId}`),
      citedLedgerClaims: _refs.claims.filter((r) => !/^c\d+$/.test(r)),
      inlineLinks: _refs.links,
    })).sort((a, b) => a.id.localeCompare(b.id)),
    claims: [...claimOut.values()].sort((a, b) => a.id.localeCompare(b.id)),
    sources: [...citedSources].sort().map((id) => sources.get(id)).filter(Boolean),
    timeline,
    paths,
    bridge: { version: BRIDGE_VERSION, capabilities: Object.fromEntries(Object.entries(CAPABILITIES).map(([id, c]) => [id, { label: c.label, labelDe: c.labelDe, status: c.status, page: c.page ?? null, after: c.after ?? null, description: c.description ?? null, reason: c.reason ?? null, reasonDe: c.reasonDe ?? null, linkedFrom: (backlinks[id] ?? []).sort() }])) },
  };
  return { data, diagnostics: diags, ok: !diags.some((d) => d.severity === 'error') };
}

function ledgerKind(evidenceClass = '') {
  const s = evidenceClass.toLowerCase();
  if (s.includes('institutional') || s.includes('archive')) return 'institutional-account';
  if (s.includes('design')) return 'editorial-synthesis';
  return 'scholarly-interpretation';
}
function ledgerEvidence(support = '') {
  const s = support.toLowerCase();
  if (s.startsWith('strong')) return 'strong';
  if (s.startsWith('good')) return 'good';
  return 'contextual';
}
