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

let data = {
  q: [{ position: { x: 40, y: 188 }, timestamp: 0 }],
  w: [{ position: { x: 92, y: 188 }, timestamp: 0 }],
  e: [{ position: { x: 144, y: 188 }, timestamp: 0 }],
  r: [{ position: { x: 196, y: 188 }, timestamp: 0 }],
  t: [{ position: { x: 248, y: 188 }, timestamp: 0 }],
  a: [{ position: { x: 63, y: 252 }, timestamp: 0 }],
  s: [{ position: { x: 115, y: 252 }, timestamp: 0 }],
  d: [{ position: { x: 167, y: 252 }, timestamp: 0 }],
  f: [{ position: { x: 219, y: 252 }, timestamp: 0 }],
  g: [{ position: { x: 271, y: 252 }, timestamp: 0 }],
  z: [{ position: { x: 81, y: 314 }, timestamp: 0 }],
  x: [{ position: { x: 133, y: 314 }, timestamp: 0 }],
  c: [{ position: { x: 185, y: 314 }, timestamp: 0 }],
  v: [{ position: { x: 237, y: 314 }, timestamp: 0 }],
  y: [{ position: { x: 1311, y: 188 }, timestamp: 0 }],
  u: [{ position: { x: 1363, y: 188 }, timestamp: 0 }],
  i: [{ position: { x: 1415, y: 188 }, timestamp: 0 }],
  o: [{ position: { x: 1467, y: 188 }, timestamp: 0 }],
  p: [{ position: { x: 1519, y: 188 }, timestamp: 0 }],
  h: [{ position: { x: 1341, y: 252 }, timestamp: 0 }],
  j: [{ position: { x: 1393, y: 252 }, timestamp: 0 }],
  k: [{ position: { x: 1445, y: 252 }, timestamp: 0 }],
  l: [{ position: { x: 1497, y: 252 }, timestamp: 0 }],
  b: [{ position: { x: 1311, y: 314 }, timestamp: 0 }],
  n: [{ position: { x: 1363, y: 314 }, timestamp: 0 }],
  m: [{ position: { x: 1415, y: 314 }, timestamp: 0 }]
};

/*
let data = {
  q: [
    {
      position: {
        x: 40,
        y: 193
      },
      timestamp: 0
    }
  ],
  w: [
    {
      position: {
        x: 92,
        y: 193
      },
      timestamp: 0
    }
  ],
  e: [
    {
      position: {
        x: 143.5,
        y: 193
      },
      timestamp: 0
    }
  ],
  r: [
    {
      position: {
        x: 195,
        y: 193
      },
      timestamp: 0
    }
  ],
  t: [
    {
      position: {
        x: 246.5,
        y: 193
      },
      timestamp: 0
    }
  ],
  a: [
    {
      position: {
        x: 65,
        y: 256
      },
      timestamp: 0
    }
  ],
  s: [
    {
      position: {
        x: 116.5,
        y: 256
      },
      timestamp: 0
    }
  ],
  d: [
    {
      position: {
        x: 168,
        y: 256
      },
      timestamp: 0
    }
  ],
  f: [
    {
      position: {
        x: 219.5,
        y: 256
      },
      timestamp: 0
    }
  ],
  g: [
    {
      position: {
        x: 271,
        y: 256
      },
      timestamp: 0
    }
  ],
  z: [
    {
      position: {
        x: 82,
        y: 319
      },
      timestamp: 0
    }
  ],
  x: [
    {
      position: {
        x: 133.5,
        y: 319
      },
      timestamp: 0
    }
  ],
  c: [
    {
      position: {
        x: 185,
        y: 319
      },
      timestamp: 0
    }
  ],
  v: [
    {
      position: {
        x: 236.5,
        y: 319
      },
      timestamp: 0
    }
  ],
  p: [
    {
      position: {
        x: 942,
        y: 193
      },
      timestamp: 0
    }
  ],
  o: [
    {
      position: {
        x: 890.5,
        y: 193
      },
      timestamp: 0
    }
  ],
  i: [
    {
      position: {
        x: 839,
        y: 193
      },
      timestamp: 0
    }
  ],
  u: [
    {
      position: {
        x: 787.5,
        y: 193
      },
      timestamp: 0
    }
  ],
  y: [
    {
      position: {
        x: 736,
        y: 193
      },
      timestamp: 0
    }
  ],
  l: [
    {
      position: {
        x: 921,
        y: 256
      },
      timestamp: 0
    }
  ],
  k: [
    {
      position: {
        x: 869.5,
        y: 256
      },
      timestamp: 0
    }
  ],
  j: [
    {
      position: {
        x: 818,
        y: 256
      },
      timestamp: 0
    }
  ],
  h: [
    {
      position: {
        x: 766.5,
        y: 256
      },
      timestamp: 0
    }
  ],
  '.': [
    {
      position: {
        x: 942,
        y: 319
      },
      timestamp: 0
    }
  ],
  ',': [
    {
      position: {
        x: 890.5,
        y: 319
      },
      timestamp: 0
    }
  ],
  m: [
    {
      position: {
        x: 839,
        y: 319
      },
      timestamp: 0
    }
  ],
  n: [
    {
      position: {
        x: 787.5,
        y: 319
      },
      timestamp: 0
    }
  ],
  b: [
    {
      position: {
        x: 736,
        y: 319
      },
      timestamp: 0
    }
  ]
};
*/
function joinData(data) {
  let db = firebase.firestore();
  db.collection('users')
    .doc('awdef')
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc('eyes-on')
    .collection('spaceVisual')
    .doc('invisible')
    .set(data, { merge: true })
    .then(docRef => {
      console.log(docRef);
    })
    .catch(error => {
      console.log('Error adding document: ', error);
    });
}

joinData(data);

/*
als = Array.from($('.left-letter,.right-letter'))
ps = "{"
als.map(v => {
	ps += `${v.dataset["letter"]}: [{
		position: {
			x: ${v.offsetLeft+v.offsetWidth/2.0},
			y: ${v.offsetTop+v.offsetHeight/2.0 + a}
		},
		timestamp: 0
	}],`
});
ps += "}"
*/
