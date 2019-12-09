var CACHE_VERSION = 'v1'
var CACHE_NAME = '${registration.scope}!${CACHE_VERSION}';
var filesToCache = [
    '/pwa-demo/',
    '/pwa-demo/index.html',
    '/index.html',
    '/pwa-demo/css/style.css',
    '/pwa-demo/js/main.js',
    '/pwa-demo/images/icons-192.png',
    '/pwa-demo/images/icons-512.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});
// Serve cached content when offline
self.addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
    })
    );
});

/*
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(filesToCache);
        })
    );
});
    
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => cacheNames.filter(cacheName => {
        // Find the caches that belong to this scope, but don't match CACHE_NAME.
        return cacheName.startsWith(`${registration.scope}!`) &&
                cacheName !== CACHE_NAME;
        }).then(cachesToDelete => Promise.all(cachesToDelete.map(caches.delete)))
        )
    );
}); 
*/

