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
    const eventFunction = (x, y) => {
        if (initFlag) {
            initFlag = false;
            return;
        }
        if (y<150) return;
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
            eventFunction(elem, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
        });
        elem.addEventListener("click", (ev) => {
            eventFunction(elem, ev.pageX, ev.pageY);
        });
    })
}

init();
addVisualEvent();
addBodyTapEvent();
addKeyTapEvent();
