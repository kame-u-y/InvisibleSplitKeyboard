import * as functions from 'firebase-functions';
import * as corsLib from 'cors';
import * as admin from 'firebase-admin';
import { Timestamp } from '@google-cloud/firestore';
let serviceAccount = require('firebase\invisiblesplitkeyboard-firebase-adminsdk-fb864-c00761f242.json')

const cors = corsLib({
    origin: "https://turtar.github.io",
});

export const helloWorld = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        console.log(request.body);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        const docRef = admin.firestore()
            .collection('users').doc('kame')
            .collection('devices').doc('ipad9.7')
            .collection('letters').doc('a').collection('tapDatas');
    
        const setData = docRef
            .add({
                position: {
                    x: 130,
                    y: 203,
                },
                timestamp: Timestamp.fromDate(new Date(2019, 10, 13)),
            })
            .then(ref => {
                console.log('added id: ', ref.id);
            });

        response.send("Hello from Firebase!");
        setData;
    })
});