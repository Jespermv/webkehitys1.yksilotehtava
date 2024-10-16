const CACHE_NAME = "restaurant-app-cache-v1";
const urlsToCache = [
  "../public/index.html", // Your index.html
  "../public/styles.css", // Your stylesheet
  "../dist/main.js", // Your JavaScript file
  "../public/manifest.json", // Your manifest file
];

// Install the service worker and cache the essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch the cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
