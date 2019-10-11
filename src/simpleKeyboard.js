import {inputLetter, inputPosition, displayTapInfo} from "./InputFunction.js";

let tapInfoArray = []
let givenText = "";
let goNextFlag = false;
let nextLetterNum = 0;

function init() {
    givenText = document.getElementById("given-text").innerText;
}

function addTapInfo(num, letter, x, y) {
    tapInfoArray.push({num: num, letter: letter, x: x, y: y})
}

// visual-modeの設定
function addRadioEvent() {
    $("#visual-mode input:radio[name=visual-mode]").on('change', (ev, a) => {
        switch(ev.target.value) {
            case "visible":
                $(".key").css("opacity", "1");
                break;
            case "semi-invisible":
                console.log(2)
                // document.getElementsByClassName(".key").style.opacity = ;
                break;
            case "invisible":
                $(".key").css("opacity", "0");
                break;
        }
    })
}

// target
// inputPositionを実行
function addBodyTapEvent() {
    const body = document.getElementById("target")
    const eventFunction = (x, y) => {
        if (y<150) return;
        if (nextLetterNum >= givenText.length) {
            console.log("task ended");
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
addRadioEvent();
addBodyTapEvent();
addKeyTapEvent();
