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
    const user = $("#user-name").val();
    const keyboardType = $("#visual-mode input:radio[name=visual-mode]:checked").val();
    const spaceVisual = $("#space-visible").prop('checked') | keyboardType==="visible" 
        ? "visible" 
        : "invisible";
    let db = firebase.firestore();
    db.collection("users").doc(user)
    .collection("devices").doc("ipad9.7")
    .collection("keyboardTypes").doc(keyboardType)
    .collection("spaceVisual").doc(spaceVisual)
    .set(arr, {merge: true})
    .then((docRef) => {
        console.log(docRef);
    })
    .catch((error) => {
        console.log("Error adding document: ", error);
    })
}

export function getTapData(callback) {
    const user = $("#user-name").val();
    const keyboardType = $("#visual-mode input:radio[name=visual-mode]:checked").val();
    const spaceVisual = $("#space-visible").prop('checked') | keyboardType==="visible" 
        ? "visible" 
        : "invisible";

    let db = firebase.firestore();
    db.collection("users").doc(user)
    .collection("devices").doc("ipad9.7")
    .collection("keyboardTypes").doc(keyboardType)
    .collection("spaceVisual").doc(spaceVisual).get()
    .then((doc) => {
        if (doc.exists) {
            console.log(doc.data())
            callback(doc.data());
        } else {
            console.log("no such document");
        }
    })
    .catch((error) => {
        console.log("error getting document:", error);
    })
}