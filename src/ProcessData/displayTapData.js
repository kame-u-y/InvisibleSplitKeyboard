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

const keyList = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm'
];

const mode = 'KEYBOARD_TYPE_OF_EXTRACTING_DATA';
getTapData('USER_NAME_OF_EXTRACTING_DATA', mode, data => {
  let json = '';
  //   console.log('{');
  json += '{\n';
  keyList.filter(k => {
    // console.log(`"${k}": [`);
    json += `   "${k}": [\n`;
    data[k].filter((v, i, array) => {
      json += `{
                "position": {
                    "x": ${v.position.x},
                    "y": ${v.position.y}
                },
                "timestamp": ${v.timestamp}
            }${i === array.length - 1 ? '' : ','}`;
    });
    // console.log(`]${k === 'm' ? '' : ','}`);
    json += `]${k === 'm' ? '' : ','}\n`;
  });
  //   console.log('}');
  json += '}';
  fs.writeFile(`./data/tapData/${mode}.json`, json, err => {
    if (err) console.log(`error!::${err}`);
  });
  console.log('end');
});
