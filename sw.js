const CACHE_NAME = 'v3_despierta_colombia';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// Instalación e inyección en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Almacenando recursos básicos...');
        // Usamos mètodos individuales para evitar que un fallo en un icono rompa toda la app
        return Promise.all(
          ASSETS.map(url => cache.add(url).catch(err => console.warn(`No se pudo cachear: ${url}`, err)))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activación y limpieza de versiones viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Eliminando caché antiguo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Network-First con caída a Caché (Evita pantallas en blanco si cambia el html)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
