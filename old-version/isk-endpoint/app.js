'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'https://kame-u-y.github.io',
  })
);

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

app.post('/postTapData', (req, res) => {
  let fsTapData = {};
  Object.keys(req.body.tapData).filter((v) => {
    fsTapData[v] = admin.firestore.FieldValue.arrayUnion(
      ...req.body.tapData[v]
    );
  });
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
      res.status(201).json({ message: 'tap data saved' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'internal server error' });
    });
});

app.get('/getTapData', (req, res) => {
  db.collection('users')
    .doc(req.query.user)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(req.query.keyboardType)
    .collection('spaceVisual')
    .doc(req.query.spaceVisual)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(200).json({
          isDataExist: false,
          message: `no such document`,
          data: null,
        });
      } else {
        res.status(200).json({
          isDataExist: true,
          message: `document was detected!`,
          data: doc.data(),
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'internal server error' });
    });
});

app.post('/postTaskData', (req, res) => {
  const fsTaskData = {
    taskData: admin.firestore.FieldValue.arrayUnion(req.body.taskData),
  };
  db.collection('users')
    .doc(`${req.body.user}-taskData`)
    .collection('devices')
    .doc('ipad9.7')
    .collection('keyboardTypes')
    .doc(req.body.keyboardType)
    .collection('spaceVisual')
    .doc(req.body.spaceVisual)
    .set(fsTaskData, { merge: true })
    .then((docRef) => {
      res.status(201).json({ message: 'task data saved' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'internal server error' });
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
