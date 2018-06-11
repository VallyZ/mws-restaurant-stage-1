self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open('restaurant-static-v2').then(function(cache) {
      return cache.addAll([
        '/',
        'data/restaurants.json',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.delete('restaurant-static-v1')
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});