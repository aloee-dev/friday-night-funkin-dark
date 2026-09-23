const CACHE_NAME = 'ACE-engine-v0.0.0';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => Promise.all(names.map(c => c !== CACHE_NAME && caches.delete(c))))
    ).then(() => self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith(self.location.origin)) return;

    let targetUrl = event.request.url;

    if (targetUrl.includes('?preload=true')) {
        targetUrl = targetUrl.replace('?preload=true', '');
    }

    const isAudio = targetUrl.match(/\.(mp3|m4a|wav)$/i);
    const requestToProcess = new Request(targetUrl, isAudio ? {} : event.request);

    event.respondWith(
        caches.match(requestToProcess).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) return networkResponse;

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(requestToProcess, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});
