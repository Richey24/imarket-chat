function receivePushNotification(event) {
    console.log("[Service Worker] Push Received.");
    const { tag, url, title, text } = event.data.json();
    const options = {
        data: url,
        body: text,
        icon: "https://cdn.jsdelivr.net/gh/Richey24/imarket-cdn/src/assets/images/icons/logo.png",
        vibrate: [200, 100, 200],
        tag: tag,
        badge: "https://cdn.jsdelivr.net/gh/Richey24/imarket-cdn/src/assets/images/icons/logo.png",
        actions: [{ action: "Detail", title: "View", icon: "https://cdn.jsdelivr.net/gh/Richey24/imarket-cdn/src/assets/images/icons/logo.png" }]
    };
    event.waitUntil(self.registration.showNotification(title, options));
}
self.addEventListener("push", receivePushNotification);

function openPushNotification(event) {
    console.log("[Service Worker] Notification click Received.", event.notification.data);

    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("notificationclick", openPushNotification);

self.addEventListener("activate", (event) => {
    console.log("activating service worker");
    event.waitUntil(self.clients.claim())
})