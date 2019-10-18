import {
  inputLetter,
  inputPosition,
  displayTapData
} from "./module/InputFunction/InputFunction.js";
import { addVisualEvent } from "./module/RadioEvent/RadioEvent.js";
import { getRandomWords } from "./module/GetRandomWords/GetRandomWords.js";
import {
  initFirebase,
  postTapData
} from "./module/MyHttpRequest/MyHttpRequest.js";

let tapData = {};
let givenText = "";
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
  if (letter === " " || letter === "-" || letter === "?" || letter === "�")
    return;
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
    inputLetter(givenText.charAt(nextLetterNum));
    inputPosition(x, y);
    addTapInfo(givenText.charAt(nextLetterNum), x, y);
    nextLetterNum++;
    if (nextLetterNum === givenText.length) {
      displayTapData(tapData);
      postTapData(tapData);
    }
  };

  target.addEventListener(
    "touchend",
    ev => {
      ev.preventDefault();
      targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );

  target.addEventListener("click", ev => {
    targetEvent(ev.pageX, ev.pageY);
  });
}

function addEnterTapEvent() {
  const enter = document.getElementsByClassName("enter")[0];
  enter.addEventListener("touchend", ev => {
    ev.preventDefault();
    init();
    initFlag = true;
  });
  enter.addEventListener("click", ev => {
    init();
    initFlag = true;
  });
}

init();
initFirebase();
addVisualEvent();
addTargetTapEvent();
addEnterTapEvent();
