// OneAlgorithm Service Worker for Performance Optimization
// Bump cache name to force clients to fetch new assets on update
const CACHE_NAME = "onealgorithm-v2";
const STATIC_CACHE_URLS = [
  "/",
  "/about",
  "/services",
  "/blog",
  "/careers",
  "/events",
  "/industries",
  // Add critical CSS and JS files
  "/client/global.css",
  "/client/App.tsx",
];

const DYNAMIC_CACHE_URLS = [
  // API endpoints and dynamic content
  "/api/",
  // External resources
  "https://fonts.googleapis.com/",
  "https://fonts.gstatic.com/",
  "https://images.unsplash.com/",
  "https://cdn.builder.io/",
];

// Install event - cache static resources (do not pre-cache /contact to avoid serving stale page)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

// Fetch event - network-first for navigations, cache-first for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // For navigation requests (HTML pages) use network-first to ensure fresh content
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Update cache with latest page (optional)
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => caches.match("/index.html")),
    );
    return;
  }

  // Static assets - cache first strategy
  if (STATIC_CACHE_URLS.some((path) => url.pathname.includes(path))) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      }),
    );
    return;
  }

  // External resources - cache with network fallback
  if (DYNAMIC_CACHE_URLS.some((domain) => url.origin.includes(domain))) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return response;
            })
            .catch(() => caches.match("/offline.html"))
        );
      }),
    );
    return;
  }

  // Default - network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});

// Background sync for offline functionality
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle background sync tasks
      console.log("Background sync triggered"),
    );
  }
});

// Handle push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update available",
    icon: "/logo.webp",
    badge: "/logo.webp",
  };

  event.waitUntil(self.registration.showNotification("OneAlgorithm", options));
});
