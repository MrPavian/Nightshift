// Offline cache for THE BLACKBOOK ARCHIVE. Everything the archive needs is packaged here:
// the page, styles, script, bridge module, fonts and the generated archive data.
// Network first (so updates arrive immediately), falling back to the cache when offline.
const CACHE = 'blackbook-archive-v2-de';
const FILES = [
  'index.html', 'app.css', 'app.js',
  '../src/bridge/editor-bridge.js',
  '../data/archive/archive.v1.de.json',
  'fonts/barlow-condensed-latin-600-normal.woff2', 'fonts/barlow-condensed-latin-800-normal.woff2',
  'fonts/barlow-latin-400-normal.woff2', 'fonts/barlow-latin-400-italic.woff2', 'fonts/barlow-latin-600-normal.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('blackbook-archive-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit ?? Response.error())));
});
