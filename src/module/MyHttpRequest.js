// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBGPQ2pZFbRAMVDnMyC64jr1WGU-nFpt70",
    authDomain: "invisiblesplitkeyboard.firebaseapp.com",
    databaseURL: "https://invisiblesplitkeyboard.firebaseio.com",
    projectId: "invisiblesplitkeyboard",
    storageBucket: "invisiblesplitkeyboard.appspot.com",
    messagingSenderId: "567801235303",
    appId: "1:567801235303:web:c544d50e5d15b127b011c2",
    measurementId: "G-BBG6MG7CMW"
};
// Initialize Firebase
export function initFirebase() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

export function postTapData(tapInfoArray) {
    const arr = {}
    tapInfoArray.filter((v) => {
        if (!arr[v.letter]) {
            arr[v.letter] = [];
        }
        arr[v.letter].push({
            position: {
                x: v.x,
                y: v.y,
            },
            timestamp: v.timestamp,
        });
    })
    let db = firebase.firestore();
    db.collection("users").doc("kame")
    .collection("devices").doc("ipad9.7")
    .set(arr, {merge: true})
    .then((docRef) => {
        console.log(docRef);
    })
    .catch((error) => {
        console.log("Error adding document: ", error);
    })

    // const processData = (tapInfoArray) => {
    //     return JSON.stringify({
    //         user: "kame",
    //         device: "ipad9.7",
    //         tapInfo: tapInfoArray,
    //     });
    // }

    // $.ajax({
    //     type: "post",
    //     url: "https://us-central1-invisiblesplitkeyboard.cloudfunctions.net/helloWorld",
    //     data: processData(tapInfoArray),
    //     contentType: 'application/json',
    //     dataType: "json",
    //     success: () => {
    //         console.log("success!!!");
    //     },
    //     error: (e) => {
    //         console.log(e)
    //     },
    //     complete: () => {
    //     }
    // })
}