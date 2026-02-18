const STATIC_CACHE_NAME = 'radio-hotel-static-v4';
const DYNAMIC_CACHE_NAME = 'radio-hotel-dynamic-v4';
const IMAGE_CACHE_NAME = 'radio-hotel-images-v4';

// Assets to cache imediatamente (coisas críticas, leves)
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.png',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
];

// Imagens "fixas" que vale a pena pré-cachear (hero, logo, etc)
const IMAGE_ASSETS = [
  '/images/hero/hero1.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  '/logo.png',
  '/logo-color.png',
];

// 🔹 Regra: não usar cache para as fotos de quartos
function shouldBypassCache(request) {
  const url = new URL(request.url);
  // sempre buscar na rede essas
  if (url.pathname.startsWith('/images/rooms/')) {
    return true;
  }
  return false;
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    (async () => {
      const staticCache = await caches.open(STATIC_CACHE_NAME);
      const imageCache = await caches.open(IMAGE_CACHE_NAME);
      try {
        console.log('Service Worker: Caching static assets');
        await staticCache.addAll(STATIC_ASSETS);
      } catch { }
      console.log('Service Worker: Caching images');
      await Promise.allSettled(
        IMAGE_ASSETS.map(async (url) => {
          try {
            const res = await fetch(url);
            if (res && res.ok) {
              await imageCache.put(url, res.clone());
            }
          } catch { }
        })
      );
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
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
      return self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // Documentos HTML devem ser network-first para evitar conteúdo antigo após deploy.
  if (isDocumentRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return caches.match('/offline.html') || createOfflineResponse();
        })
    );
    return;
  }

  // 🔹 BYPASS pro /images/rooms/* → sempre pega da rede
  if (shouldBypassCache(request)) {
    event.respondWith(
      fetch(request).catch(() => {
        console.warn('Service Worker: Falha ao buscar imagem de quarto, usando placeholder');
        return createImagePlaceholder();
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', request.url);
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          let cacheName = DYNAMIC_CACHE_NAME;
          if (isImageRequest(request)) {
            cacheName = IMAGE_CACHE_NAME;
          } else if (isStaticAsset(request)) {
            cacheName = STATIC_CACHE_NAME;
          }

          caches.open(cacheName).then((cache) => {
            console.log('Service Worker: Caching new resource:', request.url);
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          if (request.destination === 'document') {
            return caches.match('/offline.html') || createOfflineResponse();
          }

          if (isImageRequest(request)) {
            return createImagePlaceholder();
          }

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

// Background sync
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
      { action: 'explore', title: 'Ver Detalhes', icon: '/icons/action-explore.png' },
      { action: 'close', title: 'Fechar', icon: '/icons/action-close.png' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Radio Hotel', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked:', event.action);
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Helpers
function isImageRequest(request) {
  return request.destination === 'image' ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

function isDocumentRequest(request) {
  const url = new URL(request.url);
  return request.destination === 'document' ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html');
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
    headers: { 'Content-Type': 'text/html' },
  });
}

function createImagePlaceholder() {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f6f5f1"/>
      <rect x="50%" y="50%" width="100" height="100" transform="translate(-50,-50)" fill="#b2ab70" rx="10"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#0a0d29" font-family="Arial, sans-serif" font-size="14">Radio Hotel</text>
    </svg>
  `;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}

async function syncBookingForms() {
  try {
    const cache = await caches.open('booking-forms');
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const formData = await response.json();

      const submitResponse = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (submitResponse.ok) {
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

      const submitResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (submitResponse.ok) {
        await cache.delete(request);
        console.log('Service Worker: Contact form synced successfully');
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing contact forms:', error);
  }
}
