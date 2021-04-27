
var CACHE_STATIC_NAME = 'static'
var CACHE_DYNAMIC_NAME = 'dynamic'
var STATIC_FILES = [
    '/'
]

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then((cache) => {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(STATIC_FILES);
            })
    )
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Worker ...', event);
});

self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching Service Worker ...', event);
    if (!(event.request.url.indexOf('http') === 0)) return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response){
                    return response;
                } else {
                    return fetch(event.request)
                    .then((res) => {
                        return caches.open(CACHE_DYNAMIC_NAME)
                            .then((cache) => {
                                cache || cache.put(event.request.url, res.clone());
                                return res;
                            })
                    })
                    .catch((err) => {
                        return caches.open(CACHE_STATIC_NAME)
                            .then(cache => {
                                return cache.match('/offline.html')
                            })
                    });
                }
            })
    )
});

