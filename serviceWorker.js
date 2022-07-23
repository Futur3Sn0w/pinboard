const staticPinboard = "dev-pinboard-v1"
const assets = [
    "/",
    "/index.html",
    "/css/csw.css",
    "/css/fonts.css",
    "/css/globals.css",
    "/css/mobile.css",
    "/css/navigation.css",
    "/css/pinboard.css",
    "/css/settings.css",
    "/main.js",
    "/shapes/shape1.svg",
    "/shapes/shape2.svg",
    "/shapes/shape3.svg",
    "/shapes/shape4.svg",
    "/shapes/shape5.svg",
    "/shapes/shape6.svg",
    "/shapes/shape7.svg",
    "/icon/72.png",
    "/icon/96.png",
    "/icon/128.png",
    "/icon/144.png",
    "/icon/152.png",
    "/icon/192.png",
    "/icon/384.png",
    "/icon/512.png",
    "/gst/bold.ttf",
    "/gst/med.ttf",
    "/gst/reg.ttf"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPinboard).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});