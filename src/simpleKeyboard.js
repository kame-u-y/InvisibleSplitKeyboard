import * as input from './module/InputFunction/InputFunction.js';
import * as re from './module/RadioEvent/RadioEvent.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';

// let tapData = {};
let givenText = '';
// let goNextFlag = false;
// let nextLetterNum = 0;
// let initFlag = false;
// let isBS = false;

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

function init() {
  let gt = document.getElementById('given-text');
  gt.innerText = rp.getRandomPhrase().toLowerCase();
  givenText = gt.innerText;
  // tapData = {};
  // nextLetterNum = 0;
  document.getElementById('input-text').innerText = '';
  // document.getElementById('dot-container').innerHTML = '';
}

function addInitButtonEvent() {
  document.getElementById('init-button').addEventListener('click', ev => {
    init();
  });
}

// function addTapInfo(letter, x, y) {
//   if (!tapData[letter]) {
//     tapData[letter] = [];
//   }
//   tapData[letter].push({
//     position: {
//       x: x,
//       y: y
//     },
//     timestamp: Date.now()
//   });
// }
// target
// input.inputPositionを実行
function addTargetTapEvent() {
  const target = document.getElementById('target');

  const initStartX = isLeft => {
    flags[isLeft ? 'left' : 'right'].touchStartX = -1;
  };
  const isStarted = isLeft => {
    return flags[isLeft ? 'left' : 'right'].touchStartX !== -1;
  };
  const setFlags = (isLeft, isSpace, isBs) => {
    flags[isLeft ? 'left' : 'right'].isSpace = isSpace;
    flags[isLeft ? 'left' : 'right'].isBs = isBs;
  };

  const startEvent = (x, isLeft) => {
    if (isStarted(isLeft)) return;
    flags[isLeft ? 'left' : 'right'].touchStartX = x;
  };

  const moveEvent = (x, isLeft) => {
    if (!isStarted(isLeft)) return;
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
    console.log(flags);
    if (!isStarted(isLeft)) return;
    if (
      !flags[isLeft ? 'left' : 'right'].isSpace &&
      !flags[isLeft ? 'left' : 'right'].isBs
    ) {
      initStartX(isLeft);
      return;
    }
    if (flags[isLeft ? 'left' : 'right'].isSpace) {
      input.inputLetter(' ');
      initStartX(isLeft);
      setFlags(isLeft, false, false);
      return;
    } else if (flags[isLeft ? 'left' : 'right'].isBs) {
      // input.deleteLetter(tapData, nextLetterNum);
      document.getElementById('input-text').innerText = document
        .getElementById('input-text')
        .innerText.slice(0, -1);
      initStartX(isLeft);
      setFlags(isLeft, false, false);
      return;
    }
  };

  const targetEvent = (x, isLeft) => {
    // if (initFlag) {
    //   initFlag = false;
    //   return;
    // }
    // if (nextLetterNum >= givenText.length) {
    //   console.log('task ended');
    //   return;
    // }
    // if (isBS) {
    //   isBS = false;
    //   return;
    // }
    // input.inputPosition(x, y);
    // addTapInfo(nextLetterNum, givenText.charAt(nextLetterNum), x, y);
    // if (goNextFlag) {
    //   nextLetterNum++;
    //   goNextFlag = false;
    //   if (nextLetterNum === givenText.length) {
    //     input.displayTapData(tapData);
    //   }
    // }
  };

  const addTargetTapEvent = () => {
    const isLeft = x => (x < window.outerWidth / 2.0 ? true : false);

    target.addEventListener('touchstart', ev => {
      ev.preventDefault();
      startEvent(
        ev.changedTouches[0].pageX,
        isLeft(ev.changedTouches[0].pageX)
      );
    });
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
    target.addEventListener(
      'touchend',
      ev => {
        ev.preventDefault();
        const touch = ev.changedTouches[0];
        endEvent(touch.pageX, isLeft(touch.pageX));
        const targetRect = target.getBoundingClientRect();
        const x = touch.clientX - targetRect.left;
        targetEvent(x, isLeft(x));
      },
      { passive: false }
    );
    target.addEventListener('mouseup', ev => {
      endEvent(ev.pageX, isLeft(ev.pageX));
    });
    target.addEventListener('click', ev => {
      const targetRect = target.getBoundingClientRect();
      const x = ev.clientX - targetRect.left;
      targetEvent(x, isLeft(x));
    });
  };
  addTargetTapEvent();
}

// keys
// input.inputLetterを実行
function addKeyTapEvent() {
  const isLeft = x => (x < window.outerWidth / 2.0 ? true : false);
  const keys = document.getElementsByClassName('letter');
  const keyEvent = (elem, isLeft) => {
    console.log('key');
    if (
      flags[isLeft ? 'left' : 'right'].isSpace ||
      flags[isLeft ? 'left' : 'right'].isBs
    ) {
      return;
    }

    // if (elem.dataset.letter === 'enter') {
    //   init();
    //   initFlag = true;
    //   return;
    // }
    // if (elem.dataset.letter === 'BS') {
    //   [tapData, nextLetterNum] = input.deleteLetter(tapData, nextLetterNum);
    //   isBS = true;
    //   return;
    // }

    // if (nextLetterNum >= givenText.length) return;
    // if (elem.dataset.letter !== givenText.charAt(nextLetterNum)) return;
    input.inputLetter(elem.dataset.letter);
    // goNextFlag = true;
    if (document.getElementById('input-text').innerText === givenText) {
      init();
    }
  };

  Array.from(keys).forEach(elem => {
    elem.addEventListener('touchend', ev => {
      ev.preventDefault();
      keyEvent(elem, isLeft(ev.changedTouches[0].pageX));
    });
    elem.addEventListener('click', ev => {
      keyEvent(elem, isLeft(ev.pageX));
    });
  });
}

// const addMoveKeyboardEvent = () => {
//   const moveKeyboard = document.getElementsByClassName('move-keyboard')[0];
//   const target = document.getElementById('target');
//   let startY = -1;
//   let paddingBottom = -1;
//   let isMoveKeyboard = false;

//   const startEvent = y => {
//     isMoveKeyboard = true;
//     startY = y;
//     paddingBottom =
//       target.style.paddingBottom === ''
//         ? 0
//         : parseInt(target.style.paddingBottom);
//   };

//   const moveEvent = y => {
//     if (!isMoveKeyboard || startY === -1) return;
//     const movedY = paddingBottom + (startY - y);
//     target.style.paddingBottom = `${movedY}px`;
//   };

//   const endEvent = () => {
//     if (!isMoveKeyboard) return;
//     isMoveKeyboard = false;
//     startY = -1;
//   };

//   moveKeyboard.addEventListener(
//     'touchstart',
//     ev => {
//       ev.preventDefault();
//       ev.stopPropagation();
//       startEvent(ev.changedTouches[0].pageY);
//     },
//     {
//       passive: false
//     }
//   );
//   moveKeyboard.addEventListener(
//     'touchmove',
//     ev => {
//       ev.preventDefault();
//       ev.stopPropagation();
//       moveEvent(ev.changedTouches[0].pageY);
//     },
//     {
//       passive: false
//     }
//   );
//   moveKeyboard.addEventListener(
//     'touchend',
//     ev => {
//       ev.preventDefault();
//       ev.stopPropagation();
//       endEvent();
//     },
//     {
//       passive: false
//     }
//   );
// };

init();
re.addVisualEvent();
addInitButtonEvent();
addTargetTapEvent();
addKeyTapEvent();
// addMoveKeyboardEvent();
