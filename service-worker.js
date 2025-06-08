const CACHE_NAME = 'airbridge-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.jpg',
  'icon-512.png',
  'https://cdn.jsdelivr.net/npm/peerjs@1.3.1/dist/peerjs.min.js',
  'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.10/minified/html5-qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});
// service-worker.js
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("airbridge-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icon-192.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
navigator.mediaDevices.getUserMedia({ video: true })
  .then(() => console.log("✅ Camera access granted"))
  .catch(err => alert("❌ Camera access denied: " + err));
