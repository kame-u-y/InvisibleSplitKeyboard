import * as kl from '../KeyList/KeyList.js';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBGPQ2pZFbRAMVDnMyC64jr1WGU-nFpt70',
  authDomain: 'invisiblesplitkeyboard.firebaseapp.com',
  databaseURL: 'https://invisiblesplitkeyboard.firebaseio.com',
  projectId: 'invisiblesplitkeyboard',
  storageBucket: 'invisiblesplitkeyboard.appspot.com',
  messagingSenderId: '567801235303',
  appId: '1:567801235303:web:c544d50e5d15b127b011c2',
  measurementId: 'G-BBG6MG7CMW',
};
// Initialize Firebase
export function initFirebase() {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
//a duck quakes to ask for food
/*
40, 187
91, 189
142, 189
195, 188
246, 187
64, 252
115, 252
167, 250
219, 252

*/
// x : 51
// y : 188, 252

export function postTapData(tapData) {
  let a = [];
  Object.keys(tapData).filter((v) => {
    a = a.concat(tapData[v]);
  });
  a.sort((b, c) => (b.timestamp > c.timestamp ? 1 : -1));
  console.log(a);

  Object.keys(tapData).filter((v) => {
    tapData[v] = firebase.firestore.FieldValue.arrayUnion(...tapData[v]);
  });
  const user = $('#user-name').val();
  const keyboardType = $(
    '#visual-mode input:radio[name=visual-mode]:checked'
  ).val();
  const spaceVisual =
    $('#space-visible').prop('checked') | (keyboardType === 'visible')
      ? 'visible'
      : 'invisible';
  let db = firebase.firestore();
  db.collection('users')
    .doc(user)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(keyboardType)
    .collection('spaceVisual')
    .doc(spaceVisual)
    .set(tapData, { merge: true })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.log('Error adding document: ', error);
    });
}

export function getTapData(user, keyboardType, spaceVisual, callback) {
  let db = firebase.firestore();
  let defaultData = {};
  let userData = {};
  let isSetData = { default: false, user: false };

  // // default data (each center of a key)
  // db.collection('users')
  //   .doc('awdef')
  //   .collection('devices')
  //   .doc('ipad9.7')
  //   .collection('keyboardTypes')
  //   .doc('eyes-on')
  //   .collection('spaceVisual')
  //   .doc('invisible')
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       let data = Object.assign({}, doc.data());
  //       Object.keys(data)
  //         .filter((k) => !kl.keyList.find((v) => v === k))
  //         .filter((k) => {
  //           delete data[k];
  //         });
  //       // console.log(data);
  //       // callback(data);
  //       defaultData = data;
  //       isSetData.default = true;
  //       if (isSetData.default && isSetData.user) {
  //         Object.keys(userData).filter((k) => {
  //           // それぞれのキーに対してx座標が反対側のキーボードにあるやつを排除
  //           let leftKey = 'qwertasdfgzxcv';
  //           userData[k] = userData[k].filter((v) => {
  //             return (
  //               (v.position.x - window.outerWidth / 2.0) *
  //                 (leftKey.match(k) ? -1 : 1) >
  //               0
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
  //   .catch((error) => {
  //     console.log('error getting document:', error);
  //   });

  const target = document.getElementById('target');
  const targetRect = target.getBoundingClientRect();
  const letters = document.querySelectorAll('.letter');
  Object.values(letters).map((v) => {
    const letter = v.innerText;
    const rect = v.getBoundingClientRect();
    const buttonX = (rect.left + rect.right) / 2;
    const buttonY = (rect.top + rect.bottom) / 2;
    // const buttonX = v.clientLeft + v.clientWidth / 2;
    // const buttonY = v.clientTop + v.clientHeight / 2;
    const x = buttonX - targetRect.left;
    const y = buttonY - targetRect.top;
    defaultData[letter] = [
      {
        position: {
          x: x,
          y: y,
        },
        timestamp: 0,
      },
    ];
  });
  isSetData.default = true;

  db.collection('users')
    .doc(user)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(keyboardType)
    .collection('spaceVisual')
    .doc(spaceVisual)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data = Object.assign({}, doc.data());
        Object.keys(data)
          .filter((k) => !kl.keyList.find((v) => v === k))
          .filter((k) => {
            delete data[k];
          });
        // callback(data);
        userData = data;
        isSetData.user = true;
        if (isSetData.default && isSetData.user) {
          Object.keys(userData).filter((k) => {
            // それぞれのキーに対してx座標が反対側のキーボードにあるやつを排除
            let leftKey = 'qwertasdfgzxcv';
            userData[k] = userData[k].filter((v) => {
              return (
                (v.position.x - window.outerWidth / 2.0) *
                  (leftKey.match(k) ? -1 : 1) >
                0
              );
            });
            console.log(userData);
            userData[k] = userData[k].concat(defaultData[k]);
          });
          callback(userData);
        }
      } else {
        console.log('no such document');
      }
    })
    .catch((error) => {
      console.log('error getting document:', error);
    });
}

export function postTaskData(taskData) {
  // let a = [];
  // Object.keys(taskData).filter(v => {
  //   a = a.concat(taskData[v]);
  // });
  // a.sort((b, c) => (b.timestamp > c.timestamp ? 1 : -1));
  // console.log(a);

  // Object.keys(taskData).filter(v => {
  //   taskData[v] = firebase.firestore.FieldValue.arrayUnion(...taskData[v]);
  // });
  // taskData ;
  const postData = {
    taskData: firebase.firestore.FieldValue.arrayUnion(taskData),
  };
  const user = $('#user-name').val();
  const keyboardType = $(
    '#visual-mode input:radio[name=visual-mode]:checked'
  ).val();
  const spaceVisual =
    $('#space-visible').prop('checked') | (keyboardType === 'visible')
      ? 'visible'
      : 'invisible';
  let db = firebase.firestore();
  db.collection('users')
    .doc(user + '-taskData')
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(keyboardType)
    .collection('spaceVisual')
    .doc(spaceVisual)
    .set(postData, { merge: true })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.log('Error adding document: ', error);
    });
}
