import * as input from './module/InputFunction/InputFunction.js';
import * as re from './module/RadioEvent/RadioEvent.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';

let tapData = {};
let givenText = '';
let nextLetterNum = 0;
let initFlag = false;
// let isBS = false;
let taskCount = 1;

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
  document.getElementById('task-count').innerText = taskCount;
}

function addInitCountEvent() {
  const initCount = document.getElementById('init-count');
  initCount.addEventListener('click', ev => {
    taskCount = 1;
    init();
  });
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
        if (document.getElementById('is-collecting').checked && taskCount > 3) {
          hr.postTapData(tapData);
        }
        taskCount++;
        init();
        initFlag = true;
        flags[isLeft ? 'left' : 'right'].isSpace = false;
      } else {
        let isAst = false;
        const givenWords = givenText.split(' ');
        const inputWords = document
          .getElementById('input-text')
          .innerText.split(' ');
        // 入力文字数が足りてないとき*
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
    // 入力位置が明らかに誤ってるとき*

    const isLeftLetter = 'qwertasdfgzxcv'.match(
      givenText.charAt(nextLetterNum)
    );
    const collectTap = (isLeft && isLeftLetter) || (!isLeft && !isLeftLetter);
    if (collectTap) {
      input.inputLetter(givenText.charAt(nextLetterNum));
    } else {
      input.inputLetter('*');
    }
    addTapInfo(givenText.charAt(nextLetterNum), x, y);
    nextLetterNum++;
  };

  const addTargetEventListener = () => {
    const isLeft = x => (x < window.outerWidth / 2.0 ? true : false);
    // touchstart, mousedown
    target.addEventListener(
      'touchstart',
      ev => {
        ev.preventDefault();
        startEvent(
          ev.changedTouches[0].pageX,
          isLeft(ev.changedTouches[0].pageX)
        );
      },
      { passive: false }
    );
    target.addEventListener('mousedown', ev => {
      startEvent(ev.pageX, isLeft(ev.pageX));
    });

    // touchmove, mousemove
    target.addEventListener(
      'touchmove',
      ev => {
        ev.preventDefault();
        moveEvent(
          ev.changedTouches[0].pageX,
          isLeft(ev.changedTouches[0].pageX)
        );
      },
      { passive: false }
    );
    target.addEventListener('mousemove', ev => {
      moveEvent(ev.pageX, isLeft(ev.pageX));
    });

    //touchend, mouseup, click
    target.addEventListener(
      'touchend',
      ev => {
        ev.preventDefault();
        const touch = ev.changedTouches[0];
        endEvent(touch.pageX, isLeft(touch.pageX));
        const targetRect = target.getBoundingClientRect();
        const x = touch.clientX - targetRect.left;
        const y = touch.clientY - targetRect.top;
        targetEvent(x, y, isLeft(x));
      },
      { passive: false }
    );
    target.addEventListener('mouseup', ev => {
      endEvent(ev.pageX, isLeft(ev.pageX));
    });
    target.addEventListener('click', ev => {
      const targetRect = target.getBoundingClientRect();
      const x = ev.clientX - targetRect.left;
      const y = ev.clientY - targetRect.top;
      targetEvent(x, y, isLeft(x));
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
addInitCountEvent();
addTargetTapEvent();
addMoveKeyboardEvent();
