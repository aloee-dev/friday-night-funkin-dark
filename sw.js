const CACHE_NAME = 'ACE-engine-v0.0.0';

self.addEventListener('fetch', (event) => {
    if (event.request.cache === 'only-if-cached' || event.request.mode === 'navigate') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
