const CACHE_NAME = "kueku-pwa";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/typecake.html",
  "/pages/recipe.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/images/bakery.jpg",
  "/images/kue-basah.jpg",
  "/images/kue-kering.jpg",
  "/images/kue-talam.jpg",
  "/images/kue.jpg",
  "/css/style.css",
  "/manifest.json",
  "/js/index.js",
  "/images/icon/icon-256.png",
  "/images/icon/icon.png",
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&display=swap",
  "https://fonts.gstatic.com/s/dancingscript/v15/If2RXTr6YS-zF4S-kcSWSVi_szLviuEHiC4Wl-8.woff2",
  "https://fonts.gstatic.com/s/dancingscript/v15/If2RXTr6YS-zF4S-kcSWSVi_szLuiuEHiC4Wl-8.woff2",
  "https://fonts.gstatic.com/s/dancingscript/v15/If2RXTr6YS-zF4S-kcSWSVi_szLgiuEHiC4W.woff2"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
