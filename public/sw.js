const CACHE_PREFIX = "portfolio-";
const BUILD_VERSION = "__PORTFOLIO_BUILD__";
const CACHE_NAME = "portfolio-shell-" + BUILD_VERSION;
const OFFLINE_CACHE_NAME = "portfolio-offline-" + BUILD_VERSION;
const BASE_URL = new URL("./", self.registration.scope);
const INDEX_URL = new URL("index.html", BASE_URL).href;
const OFFLINE_IMAGE_URL = new URL("offline-image.svg", BASE_URL).href;
const APP_PATH = BASE_URL.pathname;
const INDEX_PATH = new URL("index.html", BASE_URL).pathname;
const MANIFEST_URL = new URL("offline-manifest.json", BASE_URL).href;
const READY_URL = new URL("offline-ready.json", BASE_URL).href;

const CORE_ASSET_PATHS = [
  "favicon.svg",
  "offline-image.svg",
  "offline-manifest.json",
  "images/generated/contest-2026-three-phase-waveform-480.webp",
  "images/generated/llc-full-load-board-480.webp",
  "images/generated/pfc-boost-project-480.webp",
  "images/generated/flyback-project-480.webp",
  "images/generated/capability-calculation-480.webp",
  "images/generated/capability-magnetics-480.webp",
  "images/generated/capability-pcb-layout-480.webp",
  "images/generated/capability-stm32g4-control-480.webp",
  "images/generated/capability-closed-loop-debug-480.webp",
  "images/generated/capability-test-record-480.webp"
];

async function cacheResponse(cache, url) {
  const response = await fetchWithTimeout(new Request(url, { cache: "reload" }), 15000);

  if (response.ok) {
    await cache.put(url, response);
  }
}

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const indexResponse = await fetchWithTimeout(new Request(INDEX_URL, { cache: "reload" }), 15000);

  if (!indexResponse.ok) {
    throw new Error(`Unable to cache app shell: ${indexResponse.status}`);
  }

  const indexHtml = await indexResponse.clone().text();
  await Promise.all([
    cache.put(INDEX_URL, indexResponse.clone()),
    cache.put(BASE_URL.href, indexResponse.clone())
  ]);

  const bundledAssetUrls = [
    ...indexHtml.matchAll(/\b(?:src|href)="([^"]*assets\/[^"]+)"/g)
  ].map((match) => new URL(match[1], BASE_URL).href);

  await Promise.allSettled(
    [...CORE_ASSET_PATHS.map((path) => new URL(path, BASE_URL).href), ...bundledAssetUrls].map(
      (url) => cacheResponse(cache, url)
    )
  );
}

async function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function updateCachedNavigation(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetchWithTimeout(request, 4500);

    if (response.ok) {
      await Promise.all([
        cache.put(INDEX_URL, response.clone()),
        cache.put(BASE_URL.href, response.clone())
      ]);
    }

    return response;
  } catch {
    return null;
  }
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  const offline = await caches.open(OFFLINE_CACHE_NAME);
  const cached = await offline.match(INDEX_URL, { ignoreSearch: true, ignoreVary: true })
    || await cache.match(INDEX_URL, { ignoreSearch: true, ignoreVary: true });
  if (self.navigator?.onLine === false && cached) return cached;
  const networkResponse = await updateCachedNavigation(request);

  if (networkResponse?.ok) {
    return networkResponse;
  }

  return cached || Response.error();
}

function getSmallImageFallbackUrl(url) {
  const generatedMatch = url.pathname.match(/\/images\/generated\/(.+)-\d+\.webp$/);

  if (generatedMatch) {
    return new URL(`images/generated/${generatedMatch[1]}-480.webp`, BASE_URL).href;
  }

  const originalMatch = url.pathname.match(/\/images\/([^/]+)\.(?:jpe?g|png)$/i);

  if (originalMatch) {
    return new URL(`images/generated/${originalMatch[1]}-480.webp`, BASE_URL).href;
  }

  return null;
}

async function cachedImageFallback(cache, requestUrl) {
  const smallImageUrl = getSmallImageFallbackUrl(requestUrl);

  if (smallImageUrl) {
    const smallImage = await cache.match(smallImageUrl, { ignoreSearch: true, ignoreVary: true });

    if (smallImage) {
      return smallImage;
    }
  }

  return (await cache.match(OFFLINE_IMAGE_URL, { ignoreSearch: true, ignoreVary: true })) || Response.error();
}

async function cacheFirstImage(request) {
  const cache = await caches.open(CACHE_NAME);
  const offline = await caches.open(OFFLINE_CACHE_NAME);
  const cached = await offline.match(request, { ignoreSearch: true, ignoreVary: true })
    || await cache.match(request, { ignoreSearch: true, ignoreVary: true });

  if (cached) {
    return cached;
  }

  try {
    const response = await fetchWithTimeout(request, 4000);

    if (!response.ok) {
      return cachedImageFallback(cache, new URL(request.url));
    }

    await cache.put(request, response.clone());
    return response;
  } catch {
    return cachedImageFallback(cache, new URL(request.url));
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const offline = await caches.open(OFFLINE_CACHE_NAME);
  const cached = await offline.match(request, { ignoreSearch: true, ignoreVary: true })
    || await cache.match(request, { ignoreSearch: true, ignoreVary: true });

  if (cached) {
    return cached;
  }

  try {
    const response = await fetchWithTimeout(request, 4500);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return Response.error();
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && !key.startsWith("portfolio-offline-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname === new URL("resume.pdf", BASE_URL).pathname || url.href === MANIFEST_URL) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === "navigate" && (url.pathname === APP_PATH || url.pathname === INDEX_PATH)) {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  if (["script", "style", "font"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});

async function offlineManifest() {
  const shell = await caches.open(CACHE_NAME);
  const response = await shell.match(MANIFEST_URL) || await fetchWithTimeout(new Request(MANIFEST_URL, { cache: "reload" }), 15000);
  if (!response.ok) throw new Error("manifest-unavailable");
  const manifest = await response.json();
  if (manifest.version !== BUILD_VERSION || !Array.isArray(manifest.files) || !manifest.files.length) throw new Error("refresh-required");
  for (const file of manifest.files) {
    const url = new URL(file.path, BASE_URL);
    if (url.origin !== BASE_URL.origin || !url.pathname.startsWith(APP_PATH) || !/^[a-f0-9]{64}$/.test(file.sha256)) throw new Error("invalid-manifest");
  }
  return manifest;
}

async function offlineStatus() {
  const pack = await caches.open(OFFLINE_CACHE_NAME);
  const marker = await pack.match(READY_URL);
  if (!marker) return { type: "status", ready: false };
  const saved = await marker.json();
  const manifest = await offlineManifest();
  const paths = new Set((await pack.keys()).map(request => request.url));
  const ready = saved.version === BUILD_VERSION && manifest.files.every(file => paths.has(new URL(file.path, BASE_URL).href));
  return { type: "status", ready, bytes: manifest.bytes, total: manifest.files.length };
}

async function verifiedAsset(response, expectedHash) {
  if (!response?.ok) return false;
  const bytes = await response.clone().arrayBuffer();
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), byte => byte.toString(16).padStart(2, "0")).join("");
  return hash === expectedHash;
}

let offlineJob = null;
let offlineProgress = { type: "progress", completed: 0, total: 0 };
const offlineListeners = new Set();
function broadcastOffline(message) {
  offlineProgress = message;
  for (const port of offlineListeners) {
    try { port.postMessage(message); } catch { offlineListeners.delete(port); }
  }
}

async function prepareOffline() {
  const manifest = await offlineManifest();
  const pack = await caches.open(OFFLINE_CACHE_NAME);
  const shell = await caches.open(CACHE_NAME);
  await pack.delete(READY_URL);
  let cursor = 0;
  let completed = 0;
  let failed = false;
  broadcastOffline({ type: "progress", completed, total: manifest.files.length });
  async function downloadNext() {
    while (cursor < manifest.files.length && !failed) {
      const file = manifest.files[cursor++];
      const url = new URL(file.path, BASE_URL).href;
      const existing = await pack.match(url) || await shell.match(url);
      let response = await verifiedAsset(existing, file.sha256) ? existing : null;
      for (let attempt = 0; !response && attempt < 2; attempt++) {
        try {
          const fetched = await fetchWithTimeout(new Request(url, { cache: "reload" }), 15000);
          if (await verifiedAsset(fetched, file.sha256)) response = fetched;
        } catch { /* Retry this file once without discarding completed downloads. */ }
      }
      if (!response) { failed = true; throw new Error("download-incomplete"); }
      await pack.put(url, response);
      completed++;
      broadcastOffline({ type: "progress", completed, total: manifest.files.length });
    }
  }
  const results = await Promise.allSettled([downloadNext(), downloadNext(), downloadNext()]);
  if (results.some(result => result.status === "rejected") || completed !== manifest.files.length) throw new Error("download-incomplete");
  await pack.put(READY_URL, Response.json({ version: BUILD_VERSION, completed, bytes: manifest.bytes }));
  await Promise.all((await caches.keys()).filter(key => key.startsWith("portfolio-offline-") && key !== OFFLINE_CACHE_NAME).map(key => caches.delete(key)));
  broadcastOffline({ type: "complete", ready: true, completed, total: manifest.files.length, bytes: manifest.bytes });
}

self.addEventListener("message", event => {
  const port = event.ports?.[0];
  if (!port) return;
  if (event.data?.type === "OFFLINE_STATUS") {
    event.waitUntil(offlineStatus().then(state => port.postMessage(state)).catch(error => port.postMessage({ type: "error", message: error.message })));
  } else if (event.data?.type === "PREPARE_OFFLINE") {
    offlineListeners.add(port);
    port.postMessage(offlineProgress);
    if (!offlineJob) {
      offlineJob = prepareOffline().catch(error => broadcastOffline({ type: "error", message: error.message })).finally(() => {
        offlineListeners.clear();
        offlineJob = null;
        offlineProgress = { type: "progress", completed: 0, total: 0 };
      });
    }
    event.waitUntil(offlineJob);
  }
});
