import * as input from "./module/InputFunction/InputFunction.js";
import * as re from "./module/RadioEvent/RadioEvent.js";
import * as rp from "./module/GetRandomWords/GetRandomWords.js";
import * as hr from "./module/MyHttpRequest/MyHttpRequest.js";

let tapData = {};
let givenText = "";
let nextLetterNum = 0;
let initFlag = false;

function init() {
  document.getElementById("given-text").innerText = rp.getRandomPhrase();
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
    input.inputLetter(givenText.charAt(nextLetterNum));
    input.inputPosition(x, y);
    addTapInfo(givenText.charAt(nextLetterNum), x, y);
    nextLetterNum++;
    if (nextLetterNum === givenText.length) {
      input.displayTapData(tapData);
      hr.postTapData(tapData);
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
hr.initFirebase();
re.addVisualEvent();
addTargetTapEvent();
addEnterTapEvent();
