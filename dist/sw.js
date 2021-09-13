var CACHE_VERSION = 'sw_v1';

self.addEventListener('install', function (event) {

});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key, i) {
        if (key !== CACHE_VERSION) {
          return caches.delete(keys[i]);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('dynamic-cache').then(function (cache) {
      return fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});