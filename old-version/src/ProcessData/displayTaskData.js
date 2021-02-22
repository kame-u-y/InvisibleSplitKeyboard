const fs = require('fs');

var firebase = require('firebase');
const firebaseConfig = {
  apiKey: 'AIzaSyBGPQ2pZFbRAMVDnMyC64jr1WGU-nFpt70',
  authDomain: 'invisiblesplitkeyboard.firebaseapp.com',
  databaseURL: 'https://invisiblesplitkeyboard.firebaseio.com',
  projectId: 'invisiblesplitkeyboard',
  storageBucket: 'invisiblesplitkeyboard.appspot.com',
  messagingSenderId: '567801235303',
  appId: '1:567801235303:web:c544d50e5d15b127b011c2',
  measurementId: 'G-BBG6MG7CMW'
};
app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

function getTapData(user, keyboardType, callback) {
  let db = firebase.firestore();

  db.collection('users')
    .doc(user)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(keyboardType)
    .collection('spaceVisual')
    .doc('invisible')
    .get()
    .then(doc => {
      if (doc.exists) {
        callback(doc.data());
      } else {
        console.log('no such document');
        return;
      }
    })
    .catch(error => {
      console.log('error getting document:', error);
      return;
    });
}

getTapData('mano-taskData', 'invisible', data => {
  let d = data.taskData.map(v => {
    return v.startTime + ',' + v.endTime;
  });
  d.filter(v => {
    console.log(v);
  });
});
