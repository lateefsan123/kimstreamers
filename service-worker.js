self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open("kim-streamers-v1").then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/styles/main.css",
          "/scripts/app.js",
          "/icons/icon.jpg"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  