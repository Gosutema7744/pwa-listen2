const CACHE_NAME = 'v1';
const ASSETS = [
  'https://gosutema7744.github.io/pwa-listen1/index.html',
  '/main.js',
  '/styles.css',
  '/icons/icon-192.png'
];

// インストール時：プリキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// アクティベート時：古いキャッシュ削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// フェッチ時：キャッシュ優先 or ネットワーク優先
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
