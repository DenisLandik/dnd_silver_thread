/* Silver Thread Party - offline shell.
   The sheet is one big HTML file, so caching it is the whole job. Bump CACHE
   when the page changes; the old cache is dropped on activate. */
var CACHE = "silver-thread-v9";
var ASSETS = ["./", "./index.html", "./manifest.webmanifest",
              "./icon-192.png", "./icon-512.png", "./icon-maskable.png", "./apple-touch-icon.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(ASSETS);
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function(){ return self.clients.claim(); }));
});

/* Serve from cache so the sheet opens with no signal, but refresh in the
   background so a new version is picked up on the next launch. */
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if(url.origin !== self.location.origin) return;      /* fonts etc: leave alone */

  e.respondWith(
    caches.match(e.request).then(function(hit){
      var live = fetch(e.request).then(function(res){
        if(res && res.status === 200){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return res;
      })["catch"](function(){ return hit; });
      return hit || live;
    })
  );
});
