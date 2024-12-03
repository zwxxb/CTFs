self.addEventListener('install', (event) => {
    self.skipWaiting();
  
    event.waitUntil(
        caches.open('v1').then((cache) => cache.addAll([
            '/static/js/scripts.js'
        ]))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(async function() { 
        let cResponse = await caches.match(event.request);
        if(cResponse) {
            return cResponse;
        }
        if(new URL(event.request.url).pathname=="/storage" || new URL(event.request.url).pathname=="/static/css/styles.css"|| new URL(event.request.url).pathname=="/static/js/scripts.js"){
            let response = await fetch(event.request);
            let responseClone = response.clone();
            let cache = await caches.open('v1');
            cache.put(event.request, responseClone);
            return response;
        }
        let response = await fetch(event.request);
        return response
    }());
});