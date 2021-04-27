/******/ (() => { // webpackBootstrap
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
var CACHE_STATIC_NAME = 'static';
var CACHE_DYNAMIC_NAME = 'dynamic';
var STATIC_FILES = ['/'];
self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(CACHE_STATIC_NAME).then(function (cache) {
    console.log('[Service Worker] Precaching App Shell');
    cache.addAll(STATIC_FILES);
  }));
});
self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
});
self.addEventListener('fetch', function (event) {
  console.log('[Service Worker] Fetching Service Worker ...', event);
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response) {
      return response;
    } else {
      return fetch(event.request).then(function (res) {
        return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
          cache || cache.put(event.request.url, res.clone());
          return res;
        });
      })["catch"](function (err) {
        return caches.open(CACHE_STATIC_NAME).then(function (cache) {
          return cache.match('/offline.html');
        });
      });
    }
  }));
});
/******/ })()
;
//# sourceMappingURL=sw.js.map