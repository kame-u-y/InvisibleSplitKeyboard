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

let nouchi;
getTapData('nouchi-alienware', 'frame-only', 'invisible', data => {
  // console.log(data);
  nouchi = data;
  nFlag = true;
  joinData();
});

let kame;
getTapData('kame-alienware', 'frame-only', 'invisible', data => {
  // console.log(data);
  kame = data;
  kFlag = true;
  joinData();
});

function joinData() {
  if (!(nFlag && kFlag)) return;
  Object.keys(kame).filter(k => {
    Object.keys(nouchi).filter(n => {
      if (k === n) {
        kame[k] = kame[k].concat(nouchi[n]);
      }
    });
  });
  console.log(kame);

  let db = firebase.firestore();
  db.collection('users')
    .doc('kame-nouchi-alienware')
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc('frame-only')
    .collection('spaceVisual')
    .doc('invisible')
    .set(kame, { merge: true })
    .then(docRef => {
      console.log(docRef);
    })
    .catch(error => {
      console.log('Error adding document: ', error);
    });
}
