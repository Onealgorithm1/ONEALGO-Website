// OneAlgorithm Service Worker for Performance Optimization
const CACHE_NAME = 'onealgorithm-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/blog',
  '/careers',
  '/events',
  '/industries',
  // Add critical CSS and JS files
  '/client/global.css',
  '/client/App.tsx',
];

const DYNAMIC_CACHE_URLS = [
  // API endpoints and dynamic content
  '/api/',
  // External resources
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://images.unsplash.com/',
  'https://cdn.builder.io/',
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets - cache first strategy
    if (STATIC_CACHE_URLS.some(path => url.pathname.includes(path))) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            return fetch(request)
              .then((response) => {
                // Cache the response for future use
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return response;
              });
          })
      );
    }
    // External resources - cache with network fallback
    else if (DYNAMIC_CACHE_URLS.some(domain => url.origin.includes(domain))) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            return response || fetch(request)
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return response;
              })
              .catch(() => {
                // Return offline fallback if available
                return caches.match('/offline.html');
              });
          })
      );
    }
    // Default - network first with cache fallback
    else {
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            return caches.match(request);
          })
      );
    }
  }
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  };

  event.waitUntil(
    self.registration.showNotification('OneAlgorithm', options)
  );
});
