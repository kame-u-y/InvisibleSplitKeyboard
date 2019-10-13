import {freqJson} from "../../data/wordFreq_initialOrder.js"
const initial = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function getInitial5(arr) {
    let res = [];
    for (let i=0; i<5; i++) {
        var id = Math.floor(Math.random() * arr.length);
        res.push(initial[id]);
        arr.splice(id, 1);
    }
    return res;
}

function getRandomWord(initial) {
    let arr = Object.keys(freqJson[initial]);
    var id = Math.floor(Math.random() * arr.length);
    return arr[id];
}

export function getRandomWords() {
    let initials = getInitial5(initial.slice())
    let res = []
    for (let i=0; i<5; i++) {
        res.push(getRandomWord(initials[i]));
    }
    return res;
}

"word something along enemy hoge fuga piyo ajipon"
"wo"
"qu"
""