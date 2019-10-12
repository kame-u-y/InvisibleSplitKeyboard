import {inputLetter, inputPosition, displayTapInfo} from "./InputFunction.js";
import {addVisualEvent} from "./RadioEvent.js";

let tapInfoArray = []
let givenText = "";
let nextLetterNum = 0;

function init() {
    givenText = document.getElementById("given-text").innerText;
}

function addTapInfo(num, letter, x, y) {
    tapInfoArray.push({num: num, letter: letter, x: x, y: y})
}
// target
// inputPositionを実行
function addBodyTapEvent() {
    const body = document.getElementById("target")
    const eventFunction = (x, y) => {
        if (y<150) return;
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
        ev.preventDefault();
        eventFunction(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    body.addEventListener("click", (ev) => {
        eventFunction(ev.pageX, ev.pageY);
    })
}

init();
addVisualEvent();
addBodyTapEvent();