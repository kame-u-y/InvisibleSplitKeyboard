import * as input from './module/InputFunction/InputFunction.js';
import * as re from './module/RadioEvent/RadioEvent.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';

let tapData = {};
let givenText = '';
let nextLetterNum = 0;
let initFlag = false;
// let isBS = false;
let sentenceCount = 1;

function init() {
  // document.getElementById(
  //   'given-text'
  // ).innerText = rp.getRandomPhrase().toLowerCase();
  document.getElementById(
    'given-text'
  ).innerText = rp.getRandomSelectedPhrase().toLowerCase();
  givenText = document.getElementById('given-text').innerText;
  tapData = {};
  nextLetterNum = 0;
  document.getElementById('input-text').innerText = '';
  document.getElementById('dot-container').innerHTML = '';
  document.getElementById('sentence-count').innerText = sentenceCount;
  sentenceCount++;
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

function addTargetTapEvent() {
  const target = document.getElementById('target');
  let flags = {
    left: {
      isSpace: false,
      isBs: false,
      touchStartX: -1
    },
    right: {
      isSpace: false,
      isBs: false,
      touchStartX: -1
    }
  };

  const initStartX = isLeft => {
    flags[isLeft ? 'left' : 'right'].touchStartX = -1;
  };
  const isStarted = isLeft => {
    return flags[isLeft ? 'left' : 'right'].touchStartX !== -1;
  };

  const startEvent = (x, isLeft) => {
    if (isStarted(isLeft)) return;
    flags[isLeft ? 'left' : 'right'].touchStartX = x;
  };

  const moveEvent = (x, isLeft) => {
    if (!isStarted(isLeft)) return;
    const setFlags = (isLeft, isSpace, isBs) => {
      flags[isLeft ? 'left' : 'right'].isSpace = isSpace;
      flags[isLeft ? 'left' : 'right'].isBs = isBs;
    };
    if (x && x - flags[isLeft ? 'left' : 'right'].touchStartX > 100) {
      console.log(flags[isLeft ? 'left' : 'right'].touchStartX, x);
      setFlags(isLeft, true, false);
    } else if (x && x - flags[isLeft ? 'left' : 'right'].touchStartX < -70) {
      setFlags(isLeft, false, true);
    } else {
      setFlags(isLeft, false, false);
    }
  };

  const endEvent = (x, isLeft) => {
    if (!isStarted(isLeft)) return;
    if (
      !flags[isLeft ? 'left' : 'right'].isSpace &&
      !flags[isLeft ? 'left' : 'right'].isBs
    ) {
      initStartX(isLeft);
      return;
    }
    if (flags[isLeft ? 'left' : 'right'].isSpace) {
      if (nextLetterNum === givenText.length) {
        hr.postTapData(tapData);
        init();
        initFlag = true;
        flags[isLeft ? 'left' : 'right'].isSpace = false;
      } else {
        let isAst = false;
        const givenWords = givenText.split(' ');
        const inputWords = document
          .getElementById('input-text')
          .innerText.split(' ');
        for (let i = 0; i < inputWords.length; i++) {
          if (inputWords[i].length !== givenWords[i].length) {
            isAst = true;
            break;
          }
        }
        if (isAst) {
          input.inputLetter('*');
        } else {
          input.inputLetter(' ');
        }
        nextLetterNum++;
      }
      initStartX(isLeft);
      return;
    } else if (flags[isLeft ? 'left' : 'right'].isBs) {
      [tapData, nextLetterNum] = input.deleteLetter(tapData, nextLetterNum);
      flags[isLeft ? 'left' : 'right'].isBs = true;
      initStartX(isLeft);
      return;
    }
  };

  const targetEvent = (x, y, isLeft) => {
    if (initFlag) {
      initFlag = false;
      return;
    }
    if (nextLetterNum === givenText.length) {
      console.log('task ended');
      return;
    }
    if (
      flags[isLeft ? 'left' : 'right'].isSpace ||
      flags[isLeft ? 'left' : 'right'].isBs
    ) {
      flags[isLeft ? 'left' : 'right'].isSpace = false;
      flags[isLeft ? 'left' : 'right'].isBs = false;
      return;
    }
    if (givenText.charAt(nextLetterNum) === ' ') {
      return;
    }
    input.inputLetter(givenText.charAt(nextLetterNum));
    addTapInfo(givenText.charAt(nextLetterNum), x, y);
    nextLetterNum++;
  };

  const addTargetEventListener = () => {
    // touchstart, mousedown
    target.addEventListener(
      'touchstart',
      ev => {
        ev.preventDefault();
        startEvent(
          ev.changedTouches[0].pageX,
          ev.changedTouches[0].pageX < window.outerWidth / 2.0 ? true : false
        );
      },
      { passive: false }
    );
    target.addEventListener('mousedown', ev => {
      startEvent(ev.pageX, ev.pageX < window.outerWidth / 2.0 ? true : false);
    });

    // touchmove, mousemove
    target.addEventListener(
      'touchmove',
      ev => {
        ev.preventDefault();
        moveEvent(
          ev.changedTouches[0].pageX,
          ev.changedTouches[0].pageX < window.outerWidth / 2.0 ? true : false
        );
      },
      { passive: false }
    );
    target.addEventListener('mousemove', ev => {
      moveEvent(ev.pageX, ev.pageX < window.outerWidth / 2.0 ? true : false);
    });

    //touchend, mouseup, click
    target.addEventListener(
      'touchend',
      ev => {
        ev.preventDefault();
        const touch = ev.changedTouches[0];
        endEvent(
          touch.pageX,
          touch.pageX < window.outerWidth / 2.0 ? true : false
        );
        const targetRect = target.getBoundingClientRect();
        const x = touch.clientX - targetRect.left;
        const y = touch.clientY - targetRect.top;
        targetEvent(x, y, x < window.outerWidth / 2.0 ? true : false);
      },
      { passive: false }
    );
    target.addEventListener('mouseup', ev => {
      endEvent(ev.pageX, ev.pageX < window.outerWidth / 2.0 ? true : false);
    });
    target.addEventListener('click', ev => {
      const targetRect = target.getBoundingClientRect();
      const x = ev.clientX - targetRect.left;
      const y = ev.clientY - targetRect.top;
      targetEvent(x, y, x < window.outerWidth / 2.0 ? true : false);
    });
  };
  addTargetEventListener();
}

function addMoveKeyboardEvent() {
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
        ? 30
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

  const moveKeyboardEventListener = () => {
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
    moveKeyboard.addEventListener('mousedown', ev => {
      ev.stopPropagation();
      startEvent(ev.pageY);
    });

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
    moveKeyboard.addEventListener('mousemove', ev => {
      ev.stopPropagation();
      moveEvent(ev.pageY);
    });

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
    moveKeyboard.addEventListener('mouseup', ev => {
      ev.stopPropagation();
      endEvent();
    });
  };
  moveKeyboardEventListener();
}

init();
hr.initFirebase();
re.addVisualEvent();
addTargetTapEvent();
addMoveKeyboardEvent();
