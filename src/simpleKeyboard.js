import {inputLetter, inputPosition, displayTapInfo} from "./InputFunction.js";
import {addVisualEvent} from "./RadioEvent.js";

let tapInfoArray = []
let givenText = "";
let goNextFlag = false;
let nextLetterNum = 0;
let initFlag = false;

function init() {
    givenText = document.getElementById("given-text").innerText;
    tapInfoArray = [];
    nextLetterNum = 0;
    document.getElementById("input-text").innerText = "";
    document.getElementById("dot-container").innerHTML = '';
}

function addTapInfo(num, letter, x, y) {
    tapInfoArray.push({num: num, letter: letter, x: x, y: y})
}

// target
// inputPositionを実行
function addBodyTapEvent() {
    const body = document.getElementById("target")
    const bodyEvent = (x, y) => {
        if (initFlag) {
            initFlag = false;
            return;
        }
        if (nextLetterNum >= givenText.length) {
            console.log("task ended");
            return;
        }
        inputPosition(x, y);
        addTapInfo(nextLetterNum, givenText.charAt(nextLetterNum), x, y);
        if(goNextFlag) {
            nextLetterNum++;
            goNextFlag = false;
            if(nextLetterNum===givenText.length) {
               displayTapInfo(tapInfoArray);
            }
        }
    }

    body.addEventListener("touchend", (ev) => {
        bodyEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    body.addEventListener("click", (ev) => {
        bodyEvent(ev.pageX, ev.pageY);
    })
}

// keys
// inputLetterを実行
function addKeyTapEvent() {
    const keys = document.getElementsByClassName("key");
    const keyEvent = (elem, x, y) => {
        if(elem.dataset.letter==="enter") {
            init();
            initFlag = true;
            return;
        } 
        if(nextLetterNum >= givenText.length) return;
        if(elem.dataset.letter!==givenText.charAt(nextLetterNum)) return;
        inputLetter(elem.dataset.letter);
        goNextFlag = true;
    }

    Array.from(keys).forEach(elem => {
        elem.addEventListener("touchend", (ev) => {
            ev.preventDefault();
            keyEvent(elem, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
        });
        elem.addEventListener("click", (ev) => {
            keyEvent(elem, ev.pageX, ev.pageY);
        });
    })
}

init();
addVisualEvent();
addBodyTapEvent();
addKeyTapEvent();
