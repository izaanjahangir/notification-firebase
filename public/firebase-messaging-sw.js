console.log('... Service Worker File Running ...');

// Listner for Push Notification
self.addEventListener('push', function (event) {
  console.log('Received a push message', event);
  var notification = event.data.json().notification
  var title = notification.title;
  var body = notification.body;
  var url = notification.click_action;
  var icon = '/images/icon-192x192.png';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      data: url
    })
  );

});

// on Notification Click do whatever you want...
self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification);
  event.notification.close();
  clients.openWindow(event.notification.data);
});