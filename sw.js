//importScripts('https://cdn.jsdelivr.net/gh/utkarshv/push_test/firebase-messaging-sw.js');
console.log('Hello World')
importScripts('https://www.gstatic.com/firebasejs/6.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.1/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyDwQ1l_xlv152z3zsXoCEqVrdy32ZkGtOQ",
    authDomain: "pushservice-de9e2.firebaseapp.com",
    databaseURL: "https://pushservice-de9e2.firebaseio.com",
    projectId: "pushservice-de9e2",
    storageBucket: "pushservice-de9e2.appspot.com",
    messagingSenderId: "53707849923",
    appId: "1:53707849923:web:fd85f9eb2ea64d1c"
};
firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();

// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };
    
    self.addEventListener('notificationclick', event => {
        event.notification.close()

        event.waitUntil(
            self.clients.openWindow('https://artofmyself.com')
        )
    })
    
    // Add an event listener to handle notification clicks
    self.addEventListener('notificationclick', function(event) {
       if (event.action === 'like') {
           // Like button was clicked
            const url = 'http://localhost:9000/cleverfork/api/v1/user/countrieslist';
            if (!url) return;
            fetch(url, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'GET'
            })
            .then(res => console.log(res));
           
           const photoId = event.notification.data.Id;
           //like(photoId);
       }
       else if (event.action === 'unsubscribe') {
           // Unsubscribe button was clicked
           const url = 'http://localhost:9000/cleverfork/api/v1/user/countrieslist';
            if (!url) return;
            fetch(url, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'GET'
            })
            .then(res => console.log(res));
           const notificationType = event.notification.data.notificationType;
           //unsubscribe(notificationType);
       }

       event.notification.close();
    });

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
// [END background_handler]
