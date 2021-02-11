import * as kl from '../KeyList/KeyList.js';

export function postTapData(tapData) {
  const data = {
    user: $('#user-name').val(),
    keyboardType: $('#visual-mode input:radio[name=visual-mode]:checked').val(),
    spaceVisual:
      $('#space-visible').prop('checked') | (keyboardType === 'visible')
        ? 'visible'
        : 'invisible',
    tapData: tapData,
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch('https://invisiblesplitkeyboard.an.r.appspot.com/postTapData', params)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
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
            // console.log(userData);
            // userData[k] = userData[k].concat(defaultData[k]);
          });
          Object.keys(defaultData).map((k) => {
            if (!userData[k]) {
              userData[k] = [];
            }
            userData[k] = defaultData[k].concat(userData[k]);
            return;
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
