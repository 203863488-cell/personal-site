const CACHE_PREFIX = "portfolio-";
const CACHE_NAME = "portfolio-source-v20260619-1";
const BASE_URL = new URL("./", self.registration.scope);
const INDEX_URL = new URL("index.html", BASE_URL).href;
const OFFLINE_IMAGE_URL = new URL("offline-image.svg", BASE_URL).href;
const CORE_ASSETS = ["", "index.html", "favicon.svg", "resume.pdf", "offline-image.svg"].map(
  (path) => new URL(path, BASE_URL).href
);

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(
    CORE_ASSETS.map(async (url) => {
      const response = await fetch(url, { cache: "reload" });
      if (response.ok) {
        await cache.put(url, response);
      }
    })
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

async function networkFirstNavigation(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetchWithTimeout(request, 4500);
    if (response.ok) {
      await cache.put(INDEX_URL, response.clone());
    }
    return response;
  } catch {
    return (await cache.match(INDEX_URL, { ignoreSearch: true })) || Response.error();
  }
}

async function cacheFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cachedWithoutQuery = await cache.match(request, { ignoreSearch: true });
    if (cachedWithoutQuery) {
      return cachedWithoutQuery;
    }

    if (fallbackUrl) {
      return (await cache.match(fallbackUrl, { ignoreSearch: true })) || Response.error();
    }

    return Response.error();
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
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

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(cacheFirst(request, OFFLINE_IMAGE_URL));
    return;
  }

  if (["script", "style", "font"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});
