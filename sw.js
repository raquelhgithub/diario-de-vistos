// Service Worker para Diário Digital de Vistos
const CACHE_NAME = 'diario-vistos-v6.4';

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-regular-400.woff2',
  'https://unpkg.com/vue@3/dist/vue.global.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Falha parcial ao pré-armazenar assets no cache:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Ignora chamadas de API Firestore/Firebase online
  if (url.includes('firestore.googleapis.com') || url.includes('identitytoolkit') || url.includes('securetoken')) {
    return;
  }

  // Sempre busca live do servidor para version.json (sem cache)
  if (url.includes('version.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
    );
    return;
  }

  // ESTRATÉGIA NETWORK-FIRST COM TIMEOUT RÁPIDO (1.800ms) PARA PÁGINAS HTML E NAVEGAÇÃO
  // Garante que o app abre rápido mesmo em redes lentas da escola, atualizando em background
  if (event.request.mode === 'navigate' || url.endsWith('/index.html') || url.endsWith('/')) {
    event.respondWith(
      (async () => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout de rede 1.8s atingido')), 1800);
        });

        try {
          return await Promise.race([fetchPromise, timeoutPromise]);
        } catch (err) {
          const cachedResponse = await (caches.match('/index.html') || caches.match('/'));
          if (cachedResponse) {
            fetchPromise.catch(() => {});
            return cachedResponse;
          }
          return await fetchPromise;
        }
      })()
    );
    return;
  }

  // Estratégia Stale-While-Revalidate para demais recursos estáticos
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'error') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
