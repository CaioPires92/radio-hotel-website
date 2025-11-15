const CACHE_NAME = 'radio-hotel-v1';
const STATIC_CACHE_NAME = 'radio-hotel-static-v1';
const DYNAMIC_CACHE_NAME = 'radio-hotel-dynamic-v1';
const IMAGE_CACHE_NAME = 'radio-hotel-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  // Add critical CSS and JS files here when available
];

// Images to cache (ajuste essa lista conforme o que REALMENTE existe no /public)
const IMAGE_ASSETS = [
  '/images/hero/hero1.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  // '/images/hero/hero4.jpg', // descomente se existir
  '/logo.png',
  '/logo-color.png',
  '/about-hotel.jpg',
];

// === Helper para cachear sem quebrar o install ===
async function cacheAssetsSafely(cacheName, urls) {
  const cache = await caches.open(cacheName);

  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'no-cache' });

        if (!response || !response.ok) {
          console.warn('Service Worker: Skip caching (status)', url, response && response.status);
          return;
        }

        await cache.put(url, response.clone());
        console.log('Service Worker: Cached:', url);
      } catch (error) {
        console.warn('Service Worker: Skip caching (error)', url, error);
      }
    })
  );
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    (async () => {
      await Promise.all([
        cacheAssetsSafely(STATIC_CACHE_NAME, STATIC_ASSETS),
        cacheAssetsSafely(IMAGE_CACHE_NAME, IMAGE_ASSETS),
      ]);

      console.log('Service Worker: Installation complete');
      await self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (
            cacheName !== STATIC_CACHE_NAME &&
            cacheName !== DYNAMIC_CACHE_NAME &&
            cacheName !== IMAGE_CACHE_NAME
          ) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      // Take control of all pages
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', request.url);
        return cachedResponse;
      }

      // Otherwise, fetch from network
      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Determine which cache to use
          let cacheName = DYNAMIC_CACHE_NAME;

          if (isImageRequest(request)) {
            cacheName = IMAGE_CACHE_NAME;
          } else if (isStaticAsset(request)) {
            cacheName = STATIC_CACHE_NAME;
          }

          // Cache the response
          caches.open(cacheName).then((cache) => {
            console.log('Service Worker: Caching new resource:', request.url);
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If network fails, try to serve offline page for navigation requests
          if (request.destination === 'document') {
            return caches.match('/offline.html') || createOfflineResponse();
          }

          // For images, return a placeholder
          if (isImageRequest(request)) {
            return createImagePlaceholder();
          }

          // For other requests, return a generic error response
          return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        });
    })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered:', event.tag);

  if (event.tag === 'booking-form') {
    event.waitUntil(syncBookingForms());
  }

  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'Nova mensagem do Radio Hotel',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Detalhes',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Radio Hotel', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions
function isImageRequest(request) {
  return request.destination === 'image' ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/_next/static/') ||
    url.pathname.includes('.css') ||
    url.pathname.includes('.js') ||
    url.pathname === '/manifest.json' ||
    url.pathname.startsWith('/icons/');
}

function createOfflineResponse() {
  return new Response(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Radio Hotel</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #0a0d29 0%, #16446e 100%);
          color: white;
          text-align: center;
          padding: 20px;
        }
        .logo {
          width: 120px;
          height: 120px;
          background: #b2ab70;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #b2ab70;
        }
        p {
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        .retry-btn {
          background: #b2ab70;
          color: #0a0d29;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .retry-btn:hover {
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="logo">RH</div>
      <h1>Você está offline</h1>
      <p>
        Parece que você perdeu a conexão com a internet. 
        Verifique sua conexão e tente novamente.
      </p>
      <button class="retry-btn" onclick="window.location.reload()">
        Tentar Novamente
      </button>
    </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

function createImagePlaceholder() {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f6f5f1"/>
      <rect x="50%" y="50%" width="100" height="100" transform="translate(-50,-50)" fill="#b2ab70" rx="10"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#0a0d29" font-family="Arial, sans-serif" font-size="14">Radio Hotel</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}

// Sync functions
async function syncBookingForms() {
  try {
    const cache = await caches.open('booking-forms');
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const formData = await response.json();

      // Try to submit the form
      const submitResponse = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (submitResponse.ok) {
        // Remove from cache if successful
        await cache.delete(request);
        console.log('Service Worker: Booking form synced successfully');
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing booking forms:', error);
  }
}

async function syncContactForms() {
  try {
    const cache = await caches.open('contact-forms');
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const formData = await response.json();

      // Try to submit the form
      const submitResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (submitResponse.ok) {
        // Remove from cache if successful
        await cache.delete(request);
        console.log('Service Worker: Contact form synced successfully');
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing contact forms:', error);
  }
}
