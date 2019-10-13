import {inputLetter, inputPosition, displayTapInfo} from "./module/InputFunction.js";
import {addVisualEvent} from "./module/RadioEvent.js";
import {getRandomWords} from "./module/GetRandomWords.js";
import {initFirebase, postTapData} from "./module/MyHttpRequest.js";

let tapInfoArray = [];
let givenText = "";
let nextLetterNum = 0;
let initFlag = false;

function init() {
    document.getElementById("given-text").innerText = getRandomWords().join(" ");
    givenText = document.getElementById("given-text").innerText;
    tapInfoArray = [];
    nextLetterNum = 0;
    document.getElementById("input-text").innerText = "";
    document.getElementById("dot-container").innerHTML = '';
}

function addTapInfo(num, letter, x, y) {
    tapInfoArray.push({
        num: num, 
        letter: letter, 
        x: x, 
        y: y,
        timestamp: Date.now(),
    })
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
        inputLetter(givenText.charAt(nextLetterNum));
        inputPosition(x, y);
        addTapInfo(nextLetterNum, givenText.charAt(nextLetterNum), x, y);
        nextLetterNum++;
        if(nextLetterNum===givenText.length) {
            displayTapInfo(tapInfoArray);
            postTapData(tapInfoArray);
        }
    }

    body.addEventListener("touchend", (ev) => {
        ev.preventDefault();
        bodyEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    body.addEventListener("click", (ev) => {
        bodyEvent(ev.pageX, ev.pageY);
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
initFirebase();
addVisualEvent();
addBodyTapEvent();
addEnterTapEvent();