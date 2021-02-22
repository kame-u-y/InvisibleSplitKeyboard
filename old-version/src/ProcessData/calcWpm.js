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

let wpmData = {
  peripheral: {},
  frameOnly: {},
  invisible: {}
};

let flags = {
  nanri: { peripheral: false, frameOnly: false, invisible: false },
  sabu: { peripheral: false, frameOnly: false, invisible: false },
  yutaro: { peripheral: false, frameOnly: false, invisible: false },
  mano: { peripheral: false, frameOnly: false, invisible: false },
  der3: { peripheral: false, frameOnly: false, invisible: false }
};

let modes = ['peripheral', 'frame-only', 'invisible'];
Object.keys(flags).filter(user => {
  modes.filter(mode => {
    getTapData(`${user}-taskData`, mode, 'invisible', data => {
      //   console.log(data);
      if (mode === 'frame-only') mode = 'frameOnly';
      let wpm = data.taskData.map(task => {
        return (
          ((task.letterCount - 1) * 1000 * 60) /
          ((task.endTime - task.startTime) * 5)
        );
      });
      wpmData[mode][user] = wpm.reduce((sum, v) => sum + v);
      flags[user][mode] = true;
      outputWpmData();
    });
  });
});

function outputWpmData() {
  let endFlag = Object.keys(flags).filter(user => {
    f = flags[user];
    return f.normal && f.flameOnly && f.invisible ? true : false;
  });
  if (!endFlag.find(v => !v)) {
    console.log(wpmData);
  } else {
    return;
  }
}
