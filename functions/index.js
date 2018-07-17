const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore.document('rooms/{roomId}/messages/{messageId}')
.onWrite((change,context) => {
    const payload = {
        notification: {
            title: 'New Message:',
            body: change.after.data().message,
            status: 'Wohoo its work',
            click_action: 'https://www.google.com'
        }
    }
    const receiverId = change.after.data().receiverId;

    return admin.firestore().collection('users').doc(receiverId).get()
    .then((snapshot) => {
        const data = snapshot.data();
        const token = data.token;
        return admin.messaging().sendToDevice(token, payload);
    });

})