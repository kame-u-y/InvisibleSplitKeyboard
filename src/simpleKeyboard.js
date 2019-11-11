import * as input from './module/InputFunction/InputFunction.js';
import * as re from './module/RadioEvent/RadioEvent.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';

let tapData = {};
let givenText = '';
let goNextFlag = false;
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
// input.inputPositionを実行
function addTargetTapEvent() {
  const target = document.getElementById('target');
  const targetEvent = (x, y) => {
    if (initFlag) {
      initFlag = false;
      return;
    }
    if (nextLetterNum >= givenText.length) {
      console.log('task ended');
      return;
    }
    if (isBS) {
      isBS = false;
      return;
    }
    input.inputPosition(x, y);
    addTapInfo(nextLetterNum, givenText.charAt(nextLetterNum), x, y);
    if (goNextFlag) {
      nextLetterNum++;
      goNextFlag = false;
      if (nextLetterNum === givenText.length) {
        input.displayTapData(tapData);
      }
    }
  };

  target.addEventListener(
    'touchend',
    ev => {
      ev.preventDefault();
      const touch = ev.changedTouches[0];
      const targetRect = target.getBoundingClientRect();
      const x = touch.clientX - targetRect.left;
      const y = touch.clientY - targetRect.top;
      console.log(x, y);
      targetEvent(x, y);
    },
    { passive: false }
  );

  target.addEventListener('click', ev => {
    const targetRect = target.getBoundingClientRect();
    const x = ev.clientX - targetRect.left;
    const y = ev.clientY - targetRect.top;
    console.log(x, y);
    targetEvent(x, y);
  });
}

// keys
// input.inputLetterを実行
function addKeyTapEvent() {
  const keys = document.getElementsByClassName('key');
  const keyEvent = (elem, x, y) => {
    if (elem.dataset.letter === 'enter') {
      init();
      initFlag = true;
      return;
    }
    if (elem.dataset.letter === 'BS') {
      [tapData, nextLetterNum] = input.deleteLetter(tapData, nextLetterNum);
      isBS = true;
      return;
    }

    if (nextLetterNum >= givenText.length) return;
    if (elem.dataset.letter !== givenText.charAt(nextLetterNum)) return;
    input.inputLetter(elem.dataset.letter);
    goNextFlag = true;
  };

  Array.from(keys).forEach(elem => {
    elem.addEventListener('touchend', ev => {
      ev.preventDefault();
      keyEvent(elem, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    });
    elem.addEventListener('click', ev => {
      keyEvent(elem, ev.pageX, ev.pageY);
    });
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
re.addVisualEvent();
addTargetTapEvent();
addKeyTapEvent();
addMoveKeyboardEvent();
