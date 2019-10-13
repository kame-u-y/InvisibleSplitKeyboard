import * as functions from 'firebase-functions';
import * as corsLib from 'cors';
const cors = corsLib({
    origin: "https://turtar.github.io",
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        console.log(request.body);
        response.send("Hello from Firebase!");
    })
});
