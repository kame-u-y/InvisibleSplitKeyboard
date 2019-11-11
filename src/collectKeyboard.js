import * as input from './module/InputFunction/InputFunction.js';
import * as re from './module/RadioEvent/RadioEvent.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';

let tapData = {};
let givenText = '';
let nextLetterNum = 0;
let initFlag = false;
let isBS = false;

function init() {
  document.getElementById(
    'given-text'
  ).innerText = rp.getRandomPhrase().toLowerCase();
  givenText = document.getElementById('given-text').innerText;
  tapData = {};
  nextLetterNum = 0;
  document.getElementById('input-text').innerText = '';
  document.getElementById('dot-container').innerHTML = '';
}

function addTapInfo(letter, x, y) {
  if (letter === ' ' || letter === '-' || letter === '?' || letter === '�')
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
  const target = document.getElementById('target');
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
        input.inputLetter(' ');
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
      console.log('task ended');
      return;
    }
    if (spaceFlag || bsFlag) {
      spaceFlag = false;
      bsFlag = false;
      return;
    }
    if (givenText.charAt(nextLetterNum) === ' ') {
      return;
    }
    input.inputLetter(givenText.charAt(nextLetterNum));
    // input.inputPosition(x, y);
    addTapInfo(givenText.charAt(nextLetterNum), x, y);
    nextLetterNum++;
  };

  // touchstart, mousedown
  target.addEventListener(
    'touchstart',
    ev => {
      ev.preventDefault();
      startEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );
  target.addEventListener('mousedown', ev => {
    startEvent(ev.pageX, ev.pageY);
  });

  // touchmove, mousemove
  target.addEventListener(
    'touchmove',
    ev => {
      ev.preventDefault();
      moveEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );
  target.addEventListener('mousemove', ev => {
    moveEvent(ev.pageX, ev.pageY);
  });

  //touchend, mouseup, click
  target.addEventListener(
    'touchend',
    ev => {
      ev.preventDefault();
      const touch = ev.changedTouches[0];
      endEvent(touch.pageX, touch.pageY);
      const targetRect = target.getBoundingClientRect();
      const x = touch.clientX - targetRect.left;
      const y = touch.clientY - targetRect.top;
      console.log(x, y);
      targetEvent(x, y);
    },
    { passive: false }
  );
  target.addEventListener('mouseup', ev => {
    endEvent(ev.pageX, ev.pageY);
  });
  target.addEventListener('click', ev => {
    const targetRect = target.getBoundingClientRect();
    const x = ev.clientX - targetRect.left;
    const y = ev.clientY - targetRect.top;
    console.log(x, y);
    targetEvent(x, y);
  });
}

const addMoveKeyboardEvent = () => {
  const moveKeyboard = document.getElementsByClassName('move-keyboard')[0];
  const target = document.getElementById('target');
  let startY = -1;
  let paddingBottom = -1;
  let isMoveKeyboard = false;

  const startEvent = y => {
    isMoveKeyboard = true;
    startY = y;
    paddingBottom =
      target.style.paddingBottom === ''
        ? 0
        : parseInt(target.style.paddingBottom);
  };

  const moveEvent = y => {
    if (!isMoveKeyboard || startY === -1) return;
    const movedY = paddingBottom + (startY - y);
    target.style.paddingBottom = `${movedY}px`;
  };

  const endEvent = () => {
    if (!isMoveKeyboard) return;
    isMoveKeyboard = false;
    startY = -1;
  };

  moveKeyboard.addEventListener(
    'touchstart',
    ev => {
      ev.preventDefault();
      ev.stopPropagation();
      startEvent(ev.changedTouches[0].pageY);
    },
    {
      passive: false
    }
  );
  moveKeyboard.addEventListener(
    'touchmove',
    ev => {
      ev.preventDefault();
      ev.stopPropagation();
      moveEvent(ev.changedTouches[0].pageY);
    },
    {
      passive: false
    }
  );
  moveKeyboard.addEventListener(
    'touchend',
    ev => {
      ev.preventDefault();
      ev.stopPropagation();
      endEvent();
    },
    {
      passive: false
    }
  );
};

init();
hr.initFirebase();
re.addVisualEvent();
addTargetTapEvent();
addMoveKeyboardEvent();
