const CACHE_NAME = 'bhargavachary-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const CACHE_FILES = [
  '/',
  '/assets/css/app.css',
  '/assets/js/app.js',
  '/images/avatar.jpg',
  OFFLINE_URL
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching essential files');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        // Take control immediately
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('Service Worker: Cache failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    (async () => {
      try {
        // Try network first for HTML pages
        if (event.request.headers.get('accept').includes('text/html')) {
          return await networkFirstStrategy(event.request);
        }
        
        // Cache first for assets (CSS, JS, images)
        if (event.request.url.includes('/assets/') || 
            event.request.url.includes('/images/')) {
          return await cacheFirstStrategy(event.request);
        }
        
        // Network first for other requests
        return await networkFirstStrategy(event.request);
        
      } catch (err) {
        console.error('Service Worker: Fetch failed:', err);
        
        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        
        // Return cached version if available
        return caches.match(event.request);
      }
    })()
  );
});

// Network first strategy (good for HTML pages)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (err) {
    // Fall back to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw err;
  }
}

// Cache first strategy (good for assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    updateCacheInBackground(request);
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Update cache in background
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse);
    }
  } catch (err) {
    // Silently fail background updates
    console.log('Background cache update failed:', err);
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Service Worker: Background sync triggered')
    );
  }
});

// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/images/avatar.jpg',
    badge: '/images/avatar.jpg',
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('BhargavAchary.in', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    // Handle performance metrics from main thread
    console.log('Performance metrics received:', event.data.metrics);
  }
});