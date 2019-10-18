import {
  inputLetter,
  inputPosition,
  displayTapData
} from "./module/InputFunction/InputFunction.js";
import { addVisualEvent } from "./module/RadioEvent/RadioEvent.js";
import { getRandomWords } from "./module/GetRandomWords/GetRandomWords.js";

let tapData = {};
let givenText = "";
let goNextFlag = false;
let nextLetterNum = 0;
let initFlag = false;

function init() {
  document.getElementById("given-text").innerText = getRandomWords().join(" ");
  givenText = document.getElementById("given-text").innerText;
  tapData = {};
  nextLetterNum = 0;
  document.getElementById("input-text").innerText = "";
  document.getElementById("dot-container").innerHTML = "";
}

function addTapInfo(letter, x, y) {
  if (!tapData[letter]) {
    tapData[letter] = [];
  }
  tapData[letter].push({
    position: {
      x: x,
      y: y
    },
    timestamp: Date.now()
  });
}
// target
// inputPositionを実行
function addTargetTapEvent() {
  const target = document.getElementById("target");
  const targetEvent = (x, y) => {
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
    if (goNextFlag) {
      nextLetterNum++;
      goNextFlag = false;
      if (nextLetterNum === givenText.length) {
        displayTapData(tapData);
      }
    }
  };

  target.addEventListener(
    "touchend",
    ev => {
      targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );

  target.addEventListener("click", ev => {
    targetEvent(ev.pageX, ev.pageY);
  });
}

// keys
// inputLetterを実行
function addKeyTapEvent() {
  const keys = document.getElementsByClassName("key");
  const keyEvent = (elem, x, y) => {
    if (elem.dataset.letter === "enter") {
      init();
      initFlag = true;
      return;
    }
    if (nextLetterNum >= givenText.length) return;
    if (elem.dataset.letter !== givenText.charAt(nextLetterNum)) return;
    inputLetter(elem.dataset.letter);
    goNextFlag = true;
  };

  Array.from(keys).forEach(elem => {
    elem.addEventListener("touchend", ev => {
      ev.preventDefault();
      keyEvent(elem, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    });
    elem.addEventListener("click", ev => {
      keyEvent(elem, ev.pageX, ev.pageY);
    });
  });
}

init();
addVisualEvent();
addTargetTapEvent();
addKeyTapEvent();
