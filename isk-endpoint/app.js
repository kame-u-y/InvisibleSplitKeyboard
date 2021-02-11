// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://invisiblesplitkeyboard.firebaseio.com',
});
const db = admin.firestore();

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

/**
 * interface req {
 *  user: string;
 *  keyboardType: string;
 *  spaceVisual: string;
 *  tapData: Map<
 *   char: {
 *    x:number;
 *    y:number;
 *   }
 *  >
 * }
 */
app.post('/postTapData', (req, res) => {
  Object.keys(req.body.tapData).filter((v) => {
    fsTapData[v] = admin.firestore.FieldValue.arrayUnion(
      ...req.body.tapData[v]
    );
  });
  // db.collection("messages").add({original: req.body.message});
  db.collection('users')
    .doc(req.body.user)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(req.body.keyboardType)
    .collection('spaceVisual')
    .doc(req.body.spaceVisual)
    .set(fsTapData, { merge: true })
    .then((docRef) => {
      console.log(docRef);
      res.status(201).json({ message: 'create complete' });
    })
    .catch((error) => {
      console.log('Error adding document: ', error);
    });
});

app.get('/getTapData', (req, res) => {
  // db.collection('users')
  //   .doc(req.user)
  //   .collection('devices')
  //   .doc('ipad9.7')
  //   .collection('keyboardTypes')
  //   .doc(req.keyboardType)
  //   .collection('spaceVisual')
  //   .doc(req.spaceVisual)
  //   .get()
  //   .then((doc) => {
  //     if (!doc.exists) {
  //       console.log('no such document');
  //       res.status(200).json({ status: `no such document` });
  //     } else {
  //       res.status(200).json({ message: `GET: ${req.query.message}` });
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('error getting document:', error);
  //   });
});

app.post('/postTaskData', (req, res) => {
  // db.collection('users')
  //   .doc(req.user + '-taskData')
  //   .collection('devices')
  //   .doc('ipad9.7')
  //   .collection('keyboardTypes')
  //   .doc(req.keyboardType)
  //   .collection('spaceVisual')
  //   .doc(req.spaceVisual)
  //   .set(req.postData, { merge: true })
  //   .then((docRef) => {
  //     console.log(docRef);
  //   })
  //   .catch((error) => {
  //     console.log('Error adding document: ', error);
  //   });
  res.status(200).json({ message: `GET: ${req.query.message}` });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
