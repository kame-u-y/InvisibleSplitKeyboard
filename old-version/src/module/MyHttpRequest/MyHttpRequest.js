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
}

export function postTaskData(taskData) {
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
    taskData: taskData,
  };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  };

  fetch('https://invisiblesplitkeyboard.an.r.appspot.com/postTaskData', params)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
