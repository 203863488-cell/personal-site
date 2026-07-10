const CACHE_PREFIX = "portfolio-";
const CACHE_NAME = "portfolio-source-v20260622-1";
const BASE_URL = new URL("./", self.registration.scope);
const INDEX_URL = new URL("index.html", BASE_URL).href;
const OFFLINE_IMAGE_URL = new URL("offline-image.svg", BASE_URL).href;
const APP_PATH = BASE_URL.pathname;
const INDEX_PATH = new URL("index.html", BASE_URL).pathname;

const CORE_ASSET_PATHS = [
  "favicon.svg",
  "offline-image.svg",
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
  const response = await fetch(url, { cache: "reload" });

  if (response.ok) {
    await cache.put(url, response);
  }
}

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const indexResponse = await fetch(INDEX_URL, { cache: "reload" });

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

async function staleWhileRevalidateNavigation(request, event) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(INDEX_URL, { ignoreSearch: true, ignoreVary: true });
  const networkResponse = updateCachedNavigation(request);

  if (cached) {
    event.waitUntil(networkResponse);
    return cached;
  }

  return (await networkResponse) || Response.error();
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
  const cached = await cache.match(request, { ignoreSearch: true, ignoreVary: true });

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
  const cached = await cache.match(request, { ignoreSearch: true, ignoreVary: true });

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
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
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

  if (request.mode === "navigate" && (url.pathname === APP_PATH || url.pathname === INDEX_PATH)) {
    event.respondWith(staleWhileRevalidateNavigation(request, event));
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
