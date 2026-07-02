const CACHE_NAME = "ee-pwa-cache-v1";
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/IMG_3195.jpeg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => cacheRes || fetch(event.request))
  );
});
