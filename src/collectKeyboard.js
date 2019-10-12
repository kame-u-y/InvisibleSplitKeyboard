import {inputLetter, inputPosition, displayTapInfo} from "./InputFunction.js";
import {addVisualEvent} from "./RadioEvent.js";

let tapInfoArray = []
let givenText = "";
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
        if (nextLetterNum >= givenText.length) {
            console.log("task ended");
            return;
        }
        inputLetter(givenText.charAt(nextLetterNum));
        inputPosition(x, y);
        addTapInfo(nextLetterNum, givenText.charAt(nextLetterNum), x, y);
        nextLetterNum++;
        if(nextLetterNum===givenText.length) {
            displayTapInfo(tapInfoArray);
        }
    }

    body.addEventListener("touchend", (ev) => {
        if (ev.changedTouches[0].pageY<150) return;
        ev.preventDefault();
        eventFunction(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    body.addEventListener("click", (ev) => {
        eventFunction(ev.pageX, ev.pageY);
    })
}

function addEnterTapEvent() {
    const enter = document.getElementsByClassName("enter")[0];
    enter.addEventListener("touchend", (ev) => {
        ev.preventDefault();
        init();
        initFlag = true;
    });
    enter.addEventListener("click", (ev) => {
        init();
        initFlag = true;
    })
}

init();
addVisualEvent();
addBodyTapEvent();
addEnterTapEvent();