const CACHE_NAME = "restaurant-app-cache-v2"; // Incremented version number
const urlsToCache = [
  "/",
  "../public/styles.css",
  "../public/index.html",
  "../public/images/knifefork192.png",
  "../public/images/knifefork512.png",
  "../dist/main.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // If the cache name doesn't match the current cache name, delete it
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response; // Return the cached response
      }
      return fetch(event.request).then((fetchResponse) => {
        // Optional: Cache the fetched response for future use
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone()); // Clone and cache the response
          return fetchResponse; // Return the original response
        });
      });
    })
  );
});
