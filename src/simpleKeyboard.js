import {inputLetter, inputPosition, displayTapInfo} from "./InputFunction.js";

let tapInfoArray = []
let givenText = "";
let goNextFlag = false;
let nextLetterNum = 0;

function init() {
    givenText = document.getElementById("given_text").innerText;
}

function addTapInfo(letter, x, y) {
    tapInfoArray.push({letter: letter, x: x, y: y})
}

// target
// inputPositionを実行
function addBodyTapEvent() {
    const body = document.getElementById("target")
    const eventFunction = (x, y) => {
        if(nextLetterNum >= givenText.length) {
            console.log("task ended");
        }
        inputPosition(x, y);
        addTapInfo(givenText.charAt(nextLetterNum), x, y);
        if(goNextFlag) {
            nextLetterNum++;
            goNextFlag = false;
            if(nextLetterNum===givenText.length) {
               displayTapInfo(tapInfoArray);
            }
        }
    }

    body.addEventListener("touchend", (ev) => {
        eventFunction(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    body.addEventListener("click", (ev) => {
        eventFunction(ev.pageX, ev.pageY);
    })
}

// keys
// inputLetter, inputPositionを実行
function addKeyTapEvent() {
    const keys = document.getElementsByClassName("key");
    const eventFunction = (elem, x, y) => {
        if(nextLetterNum >= givenText.length) return;
        if(elem.dataset.letter!==givenText.charAt(nextLetterNum)) return;
        inputLetter(elem.dataset.letter);
        goNextFlag = true;
    }

    Array.from(keys).forEach(elem => {
        elem.addEventListener("touchend", (ev) => {
            ev.preventDefault();
            eventFunction(elem, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
        });
        elem.addEventListener("click", (ev) => {
            eventFunction(elem, ev.pageX, ev.pageY);
        });
    })
}

init();
addBodyTapEvent();
addKeyTapEvent();
