
/***************************************
***************************************
***************************************
***************************************

  Put firebase configuration here...

***************************************
***************************************
***************************************
***************************************
*/

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(function() {
    console.log("Notification permission granted.");
    return messaging.getToken();
  })
  .then(function(token) {
    // Displaying user token
    console.log("token >>>> ", token);
  })
  .catch(function(err) {
    // Happen if user deney permission
    console.log("Unable to get permission to notify.", err);
  });

if ("serviceWorker" in navigator) {
  console.log("Service Worker is supported");

  // if service worker supported then register my service worker
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function(reg) {
      console.log("Successfully Register :^)", reg);

      reg.pushManager
        .subscribe({
          userVisibleOnly: true
        })
        .then(function(subscription) {
          console.log("subscription:", subscription.toJSON());
          // GCM were used this endpoint
          console.log("endpoint:", subscription.endpoint);
        });
    })
    .catch(function(error) {
      console.log("SW Registration Failed: :^(", error);
    });
}
