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

function getTapData(user, keyboardType, spaceVisual, callback) {
  let db = firebase.firestore();
  db.collection('users')
    .doc(user)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(keyboardType)
    .collection('spaceVisual')
    .doc(spaceVisual)
    .get()
    .then(doc => {
      if (doc.exists) {
        // console.log(doc.data());
        return callback(doc.data());
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

let nFlag = false;
let kFlag = false;

let data1;
getTapData('kame-peripheral', 'visible', 'visible', data => {
  // console.log(data);
  data1 = data;
  nFlag = true;
  joinData();
});

let data2;
getTapData('dsk', 'peripheral', 'invisible', data => {
  // console.log(data);
  data2 = data;
  kFlag = true;
  joinData();
});

function joinData() {
  if (!(nFlag && kFlag)) return;
  Object.keys(data2).filter(k => {
    Object.keys(data1).filter(n => {
      if (k === n) {
        data2[k] = data2[k].concat(data1[n]);
      }
    });
  });
  console.log(data2);

  let db = firebase.firestore();
  db.collection('users')
    .doc('dsk-kame')
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc('peripheral')
    .collection('spaceVisual')
    .doc('invisible')
    .set(data2, { merge: true })
    .then(docRef => {
      console.log(docRef);
    })
    .catch(error => {
      console.log('Error adding document: ', error);
    });
}
