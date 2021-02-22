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

let flags = {
  awdef: false,
  nanri: false,
  sabu: false,
  yutaro: false,
  mano: false
};

let datas = {
  awdef: {},
  nanri: {},
  sabu: {},
  yutaro: {},
  mano: {}
};

let keys = ['nanri', 'sabu', 'yutaro'];
let mode = 'peripheral';
// let user = 'awdef';
getTapData('awdef', 'eyes-on', 'invisible', data => {
  // console.log(data);
  datas.awdef = data;
  flags.awdef = true;
  joinData();
});
// user = 'nanri';
getTapData('nanri', mode, 'invisible', data => {
  // console.log(data);
  datas.nanri = data;
  flags.nanri = true;
  joinData();
});

// user = 'sabu';
getTapData('sabu', mode, 'invisible', data => {
  // console.log(data);
  datas.sabu = data;
  flags.sabu = true;
  joinData();
});

// user = 'yutaro';
getTapData('yutaro', mode, 'invisible', data => {
  // console.log(data);
  datas.yutaro = data;
  flags.yutaro = true;
  joinData();
});

// // user = 'mano';
// getTapData('mano', 'invisible', 'invisible', data => {
//   // console.log(data);
//   datas.mano = data;
//   flags.mano = true;
//   joinData();
// });

function joinData() {
  // if (!(nFlag && kFlag)) return;
  console.log(flags);
  if (!(flags.awdef && flags.nanri && flags.sabu && flags.yutaro)) return;
  console.log(true);
  Object.keys(datas.awdef).filter(k => {
    keys.filter(u => {
      Object.keys(datas[u]).filter(k2 => {
        if (k === k2) {
          datas.awdef[k] = datas.awdef[k].concat(datas[u][k]);
        }
      });
    });
  });
  console.log(datas.awdef);

  let db = firebase.firestore();
  db.collection('users')
    .doc('mixed-data-nomano')
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(mode)
    .collection('spaceVisual')
    .doc('invisible')
    .set(datas.awdef, { merge: true })
    .then(docRef => {
      console.log(docRef);
    })
    .catch(error => {
      console.log('Error adding document: ', error);
    });
}
