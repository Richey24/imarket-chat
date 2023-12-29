const isPushNotificationSupported = () => {
    return "serviceWorker" in navigator && "PushManager" in window;
}

// const registerServiceWorker = async () => {
//     await navigator.serviceWorker.register("/sw.js");
//     return await navigator.serviceWorker.ready
// }

const askUserPermission = async () => {
    return await Notification.requestPermission();
}

const createNotificationSubscription = async () => {
    //wait for service worker installation to be ready
    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    // const sub = await serviceWorker.pushManager.getSubscription()
    // sub.unsubscribe()
    return await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BNW__qlZf6FZ3zCZL8H_JzDe051M2dCs-yaXWT9lc1CreFNlQYJ0oLNihj0AgraCKrOLAltz8MX7E3jLt9xUnD4"
    });
}

export {
    isPushNotificationSupported,
    // registerServiceWorker,
    askUserPermission,
    createNotificationSubscription
}