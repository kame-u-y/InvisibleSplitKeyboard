import * as input from "./module/InputFunction/InputFunction.js";
import * as re from "./module/RadioEvent/RadioEvent.js";
import * as rp from "./module/GetRandomWords/GetRandomWords.js";
import * as hr from "./module/MyHttpRequest/MyHttpRequest.js";

let tapData = {};
let givenText = "";
let nextLetterNum = 0;
let initFlag = false;
let isBS = false;

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
  letter = letter.toLowerCase();
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
  let spaceFlag = false;
  let bsFlag = false;
  let spaceStartX = -1;

  const initStartX = () => {
    spaceStartX = -1;
  };
  const isStarted = x => x !== -1;

  const startEvent = x => {
    if (isStarted(spaceStartX)) return;
    spaceStartX = x;
  };

  const moveEvent = x => {
    if (!isStarted(spaceStartX)) return;
    if (x - spaceStartX > 100) {
      [spaceFlag, bsFlag] = [true, false];
    } else if (x - spaceStartX < -100) {
      [spaceFlag, bsFlag] = [false, true];
    } else {
      [spaceFlag, bsFlag] = [false, false];
    }
    console.log(spaceFlag, bsFlag);
  };

  const endEvent = x => {
    if (!isStarted(x)) return;
    if (!spaceFlag && !bsFlag) {
      initStartX();
      return;
    }
    if (spaceFlag) {
      if (nextLetterNum === givenText.length) {
        hr.postTapData(tapData);
        init();
        initFlag = true;
        spaceFlag = false;
      } else {
        input.inputLetter(" ");
        nextLetterNum++;
      }
      return;
    } else if (bsFlag) {
      [tapData, nextLetterNum] = input.deleteLetter(tapData, nextLetterNum);
      bsFlag = true;
      console.log(tapData);
      return;
    }
  };

  const targetEvent = (x, y) => {
    if (initFlag) {
      initFlag = false;
      return;
    }
    if (nextLetterNum === givenText.length) {
      console.log("task ended");
      return;
    }
    if (spaceFlag || isBS || bsFlag) {
      spaceFlag = false;
      isBS = false;
      bsFlag = false;
      return;
    }
    if (givenText.charAt(nextLetterNum) === " ") {
      return;
    }
    input.inputLetter(givenText.charAt(nextLetterNum));
    input.inputPosition(x, y);
    addTapInfo(givenText.charAt(nextLetterNum), x, y);
    nextLetterNum++;
    // if (nextLetterNum === givenText.length) {
    //   input.displayTapData(tapData);
    //   // hr.postTapData(tapData);
    // }
  };

  // touchstart, mousedown
  target.addEventListener(
    "touchstart",
    ev => {
      ev.preventDefault();
      startEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );
  target.addEventListener("mousedown", ev => {
    startEvent(ev.pageX, ev.pageY);
  });

  // touchmove, mousemove
  target.addEventListener(
    "touchmove",
    ev => {
      ev.preventDefault();
      moveEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );
  target.addEventListener("mousemove", ev => {
    moveEvent(ev.pageX, ev.pageY);
  });

  //touchend, mouseup, click
  target.addEventListener(
    "touchend",
    ev => {
      ev.preventDefault();
      endEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
      targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );
  target.addEventListener("mouseup", ev => {
    endEvent(ev.pageX, ev.pageY);
  });
  target.addEventListener("click", ev => {
    targetEvent(ev.pageX, ev.pageY);
  });
}

// function addEnterTapEvent() {
//   const enter = document.getElementsByClassName("enter")[0];
//   enter.addEventListener("touchend", ev => {
//     ev.preventDefault();
//     init();
//     initFlag = true;
//   });
//   enter.addEventListener("click", ev => {
//     init();
//     initFlag = true;
//   });
// }

// function addBSTapEvent() {
//   const bs = document.getElementsByClassName("back")[0];
//   const bsEvent = () => {
//     [tapData, nextLetterNum] = input.deleteLetter(tapData, nextLetterNum);
//     isBS = true;
//     console.log(tapData);
//   };
//   bs.addEventListener("touchend", ev => {
//     ev.preventDefault();
//     bsEvent();
//   });
//   bs.addEventListener("click", ev => {
//     bsEvent();
//   });
// }

init();
hr.initFirebase();
re.addVisualEvent();
addTargetTapEvent();
// addEnterTapEvent();
// addBSTapEvent();
