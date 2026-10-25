// Girly Planner Studio — fonctionnement hors ligne (cache des fichiers de l'app)
const C='gps-v78';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./assets/manifest.json'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const isPage=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('.json');
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request);const net=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>hit);return isPage?(net.then(r=>r||hit)):(hit||net)}))});
