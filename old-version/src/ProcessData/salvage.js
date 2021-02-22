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
  // let defaultData = {};
  let userData = {};
  // let isSetData = {
  //   default: false,
  //   user: false
  // };

  // default data (each center of a key)
  // db.collection('users')
  //   .doc('awdef')
  //   .collection('devices')
  //   .doc('ipad9.7')
  //   .collection('keyboardTypes')
  //   .doc('eyes-on')
  //   .collection('spaceVisual')
  //   .doc('invisible')
  //   .get()
  //   .then(doc => {
  //     if (doc.exists) {
  //       let data = Object.assign({}, doc.data());
  //       Object.keys(data)
  //         .filter(k => !keyList.find(v => v === k))
  //         .filter(k => {
  //           delete data[k];
  //         });
  //       // callback(data);
  //       defaultData = data;
  //       isSetData.default = true;
  //       if (isSetData.default && isSetData.user) {
  //         Object.keys(userData).filter(k => {
  //           // それぞれのキーに対してx座標が反対側のキーボードにあるやつを排除
  //           let leftKey = 'qwertasdfgzxcv';
  //           userData[k] = userData[k].filter(v => {
  //             return (
  //               (v.position.x - 1590 / 2.0) * (leftKey.match(k) ? -1 : 1) > 0
  //             );
  //           });
  //           userData[k] = userData[k].concat(defaultData[k]);
  //         });
  //         callback(userData);
  //       }
  //     } else {
  //       console.log('no such document');
  //     }
  //   })
  //   .catch(error => {
  //     console.log('error getting document:', error);
  //   });

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
        let data = Object.assign({}, doc.data());
        Object.keys(data)
          .filter(k => !keyList.find(v => v === k))
          .filter(k => {
            delete data[k];
          });
        // callback(data);
        userData = data;
        // isSetData.user = true;
        // if (isSetData.default && isSetData.user) {
        // Object.keys(userData).filter(k => {
        // それぞれのキーに対してx座標が反対側のキーボードにあるやつを排除
        // let leftKey = 'qwertasdfgzxcv';
        // userData[k] = userData[k].filter(v => {
        //   return (
        //     (v.position.x - 1590 / 2.0) * (leftKey.match(k) ? -1 : 1) > 0
        //   );
        // });
        // userData[k] = userData[k].concat(defaultData[k]);
        // });
        callback(userData);
        // }
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

const mode = 'peripheral';
getTapData('kmaw2', mode, data => {
  let a = {};
  keyList.filter(k => {
    a[k] = data[k].filter(v => {
      return v.timestamp > 1576395216187;
    });
  });
  console.log(a);

  let db = firebase.firestore();
  db.collection('users')
    .doc('exp01tuchi')
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc('peripheral')
    .collection('spaceVisual')
    .doc('invisible')
    .set(a, { merge: true })
    .then(docRef => {
      console.log(docRef);
    })
    .catch(error => {
      console.log('Error adding document: ', error);
    });
  // let json = '';
  // //   console.log('{');
  // json += '{\n';
  // keyList.filter(k => {
  //   // console.log(`"${k}": [`);
  //   json += `   "${k}": [\n`;
  //   data[k].filter((v, i, array) => {
  //     json += `{
  //               "position": {
  //                   "x": ${v.position.x},
  //                   "y": ${v.position.y}
  //               },
  //               "timestamp": ${v.timestamp}
  //           }${i === array.length - 1 ? '' : ','}`;
  //   });
  //   // console.log(`]${k === 'm' ? '' : ','}`);
  //   json += `]${k === 'm' ? '' : ','}\n`;
  // });
  // //   console.log('}');
  // json += '}';
  // fs.writeFile(`./data/tapData/upd-${mode}.json`, json, err => {
  //   if (err) console.log(`error!::${err}`);
  // });
  // console.log('end');
});
