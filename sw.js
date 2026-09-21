const CACHE_NAME = 'ACE-engine-v0.0.0';

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
