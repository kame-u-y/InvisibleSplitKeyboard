import * as kl from '../KeyList/KeyList.js';

export function postTapData(tapData) {
  const keyboardType = $(
    '#visual-mode input:radio[name=visual-mode]:checked'
  ).val();
  const data = {
    user: $('#user-name').val(),
    keyboardType: keyboardType,
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
    mode: 'cors',
    body: JSON.stringify(data),
  };

  fetch('https://invisiblesplitkeyboard.an.r.appspot.com/postTapData', params)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function getTapData(user, keyboardType, spaceVisual, callback) {
  let defaultData = {};
  const target = document.getElementById('target');
  const targetRect = target.getBoundingClientRect();
  const letters = document.querySelectorAll('.letter');
  Object.values(letters).map((v) => {
    const letter = v.innerText;
    const rect = v.getBoundingClientRect();
    const buttonX = (rect.left + rect.right) / 2;
    const buttonY = (rect.top + rect.bottom) / 2;
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

  let userData = {};
  const params = {
    user: user,
    keyboardType: keyboardType,
    spaceVisual: spaceVisual,
  };
  const query_params = new URLSearchParams(params);
  const fetchURL =
    'https://invisiblesplitkeyboard.an.r.appspot.com/getTapData?' +
    query_params;

  const options = {
    method: 'GET',
    mode: 'cors',
  };

  fetch(fetchURL, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (!json.isDataExist) {
        console.log('no such document');
      } else {
        let data = Object.assign({}, json.data);
        Object.keys(data)
          .filter((k) => !kl.keyList.find((v) => v === k))
          .filter((k) => {
            delete data[k];
          });
        userData = data;
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
        });
        Object.keys(defaultData).map((k) => {
          if (!userData[k]) {
            userData[k] = [];
          }
          userData[k] = defaultData[k].concat(userData[k]);
          return;
        });
        console.log(userData);
        callback(userData);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  // db.collection('users')
  //   .doc(user)
  //   .collection('devices')
  //   .doc('ipad9.7')
  //   .collection('keyboardTypes')
  //   .doc(keyboardType)
  //   .collection('spaceVisual')
  //   .doc(spaceVisual)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       let data = Object.assign({}, doc.data());
  //       Object.keys(data)
  //         .filter((k) => !kl.keyList.find((v) => v === k))
  //         .filter((k) => {
  //           delete data[k];
  //         });
  //       // callback(data);
  //       userData = data;
  //       // isSetData.user = true;
  //       // if (isSetData.default && isSetData.user) {
  //       Object.keys(userData).filter((k) => {
  //         // それぞれのキーに対してx座標が反対側のキーボードにあるやつを排除
  //         let leftKey = 'qwertasdfgzxcv';
  //         userData[k] = userData[k].filter((v) => {
  //           return (
  //             (v.position.x - window.outerWidth / 2.0) *
  //               (leftKey.match(k) ? -1 : 1) >
  //             0
  //           );
  //         });
  //         // console.log(userData);
  //         // userData[k] = userData[k].concat(defaultData[k]);
  //       });
  //       Object.keys(defaultData).map((k) => {
  //         if (!userData[k]) {
  //           userData[k] = [];
  //         }
  //         userData[k] = defaultData[k].concat(userData[k]);
  //         return;
  //       });
  //       callback(userData);
  //       // }
  //     } else {
  //       console.log('no such document');
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('error getting document:', error);
  //   });
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
