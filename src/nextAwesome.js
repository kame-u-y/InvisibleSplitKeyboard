import * as re from './module/RadioEvent/RadioEvent.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';
import * as wp from './module/WordPrediction/WordPrediction.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';

let loadedDatas = [];
// let isSpace = false;
// TODO: isSpaceはグローバルである必要ないよね
// TODO: いい加減WordPredictionのリファクタしろ
function init() {
  document.getElementById(
    'given-text'
  ).innerText = rp.getRandomPhrase().toLowerCase();
}

function restrictScroll() {
  $('body').css('overflow', 'hidden');
  document.addEventListener(
    'touchmove',
    ev => {
      ev.preventDefault();
    },
    {
      passive: false
    }
  );
}

function addButtonEvent() {
  const buttonEvent = () => {
    const user = $('#user-name').val();
    const keyboardType = $(
      '#visual-mode input:radio[name=visual-mode]:checked'
    ).val();
    const spaceVisual =
      $('#space-visible').prop('checked') | (keyboardType === 'visible')
        ? 'visible'
        : 'invisible';
    const loadedData = loadedDatas.find(
      v =>
        v.user === user &&
        v.keyboard === keyboardType &&
        v.space === spaceVisual
    );

    if (loadedData) {
      wp.createSpacialModel(loadedData.data);
    } else {
      if (user === '') {
        console.log('user is not defined');
        return;
      }
      hr.getTapData(user, keyboardType, spaceVisual, data => {
        wp.createSpacialModel(data);
        data = wp.removeSMOutlier(data);
        wp.createSpacialModel(data);
        loadedDatas.push({
          user: user,
          keyboard: keyboardType,
          space: spaceVisual,
          data: data
        });
        document.getElementById(
          'is-ok'
        ).innerText = `ok, ${keyboardType} ${spaceVisual}`;
      });
    }
  };
  const getDataButton = document.getElementById('get-tap-data');

  getDataButton.addEventListener('touchend', ev => {
    ev.preventDefault();
    buttonEvent();
  });
  getDataButton.addEventListener('click', ev => {
    buttonEvent();
  });
}

function addPredictedButtonEvent() {
  const buttons = document.getElementsByClassName('predicted-button');
  const predictEvent = value => {
    wp.pushedPredictedButton(value);
    wp.nextProbability();
  };

  Array.from(buttons).filter(v => {
    v.addEventListener('touchend', ev => {
      ev.preventDefault();
      predictEvent(v.innerText);
    });
    v.addEventListener('click', ev => {
      predictEvent(v.innerText);
    });
  });
}

function addTargetTapEvent() {
  const target = document.getElementById('target');
  // let isSelect = false;
  // let isBS = false;
  // let selectStartX = -1;
  // let selectStartY = -1;

  let flags = {
    left: {
      isSpace: false,
      isSelect: false,
      isBs: false,
      selectStartX: -1,
      selectStartY: -1
    },
    right: {
      isSpace: false,
      isSelect: false,
      isBs: false,
      selectStartX: -1,
      selectStartY: -1
    }
  };

  const initStartXY = isLeft => {
    // selectStartX = -1;
    // selectStartY = -1;
    flags[isLeft ? 'left' : 'right'].selectStartX = -1;
    flags[isLeft ? 'left' : 'right'].selectStartY = -1;
  };
  // const isStarted = (x, y) => x !== -1 && y !== -1;
  const isStarted = isLeft => {
    return (
      flags[isLeft ? 'left' : 'right'].selectStartX !== -1 &&
      flags[isLeft ? 'left' : 'right'].selectStartY
    );
  };

  const startEvent = (x, y, isLeft) => {
    // if (isStarted(selectStartX, selectStartY)) return;
    if (isStarted(isLeft)) return;
    flags[isLeft ? 'left' : 'right'].selectStartX = x;
    flags[isLeft ? 'left' : 'right'].selectStartY = y;
  };

  const dxwProcess = (x, selectStartX) => {
    let dx = x - selectStartX;
    let w = 30;
    if (dx < 30) dx = 30;
    if (dx > w * 6 - 0.1) dx = w * 6 - 0.1;
    return [dx, w];
  };

  const moveEvent = (x, y, isLeft) => {
    // if (!isStarted(selectStartX, selectStartY)) return;
    if (!isStarted(isLeft)) return;

    if (y - flags[isLeft ? 'left' : 'right'].selectStartY < -100) {
      Array.from(document.getElementsByClassName('predicted-button')).filter(
        v => {
          v.style.backgroundColor = '#eee';
        }
      );
      // [isSelect, isBS] = [false, false];
      flags[isLeft ? 'left' : 'right'].isSelect = false;
      flags[isLeft ? 'left' : 'right'].isBs = false;
    } else {
      const buttons = document.getElementsByClassName('predicted-button');
      if (x - flags[isLeft ? 'left' : 'right'].selectStartX < -100) {
        // [isSelect, isBS] = [false, true];
        flags[isLeft ? 'left' : 'right'].isSelect = false;
        flags[isLeft ? 'left' : 'right'].isBs = true;
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '#ddd';
        }
        return;
      } else if (x - flags[isLeft ? 'left' : 'right'].selectStartX >= 10) {
        // [isSelect, isBS] = [true, false];
        flags[isLeft ? 'left' : 'right'].isSelect = true;
        flags[isLeft ? 'left' : 'right'].isBs = false;
        let [dx, w] = dxwProcess(
          x,
          flags[isLeft ? 'left' : 'right'].selectStartX
        );
        for (let i = 0; i < buttons.length; i++) {
          if (i === Math.floor(dx / w) - 1)
            buttons[i].style.backgroundColor = '#ccc';
          else buttons[i].style.backgroundColor = '#ddd';
        }
        return;
      } else {
        // [isSelect, isBS] = [false, false];
        flags[isLeft ? 'left' : 'right'].isSelect = false;
        flags[isLeft ? 'left' : 'right'].isBs = false;
      }
    }
  };
  const endEvent = (x, y, isLeft) => {
    // if (!isStarted(selectStartX, selectStartY)) return;
    if (!isStarted(isLeft)) return;

    if (y - flags[isLeft ? 'left' : 'right'].selectStartY < -100) {
      Array.from(document.getElementsByClassName('predicted-button')).filter(
        v => {
          v.style.backgroundColor = '#ddd';
        }
      );
      let givenText = document.getElementById('given-text').innerText;
      let inputText = document.getElementById('predicted-letter').innerText;
      if (givenText + ' ' === inputText) {
        wp.initProbability();
        init();
        initStartXY(isLeft);
      } else {
        wp.nextProbability();
        flags[isLeft ? 'left' : 'right'].isSpace = true;
        initStartXY(isLeft);
      }
    } else {
      if (
        !flags[isLeft ? 'left' : 'right'].isSelect &&
        !flags[isLeft ? 'left' : 'right'].isBs
      ) {
        initStartXY(isLeft);
        return;
      }
      if (flags[isLeft ? 'left' : 'right'].isBs) {
        wp.predictWordBS();
        initStartXY(isLeft);
      } else if (flags[isLeft ? 'left' : 'right'].isSelect) {
        let [dx, w] = dxwProcess(
          x,
          flags[isLeft ? 'left' : 'right'].selectStartX
        );
        const selected = document.getElementsByClassName('predicted-button')[
          Math.floor(dx / w) - 1
        ];
        wp.pushedPredictedButton(selected.innerText);
        selected.style.backgroundColor = '#ddd';
        wp.nextProbability();
        flags[isLeft ? 'left' : 'right'].isSpace = true;
        initStartXY(isLeft);
      }
    }
  };

  const targetEvent = (x, y, isLeft) => {
    if (
      flags[isLeft ? 'left' : 'right'].isSpace ||
      flags[isLeft ? 'left' : 'right'].isSelect ||
      flags[isLeft ? 'left' : 'right'].isBs
    ) {
      flags[isLeft ? 'left' : 'right'].isSpace = false;
      flags[isLeft ? 'left' : 'right'].isSelect = false;
      flags[isLeft ? 'left' : 'right'].isBs = false;
      return;
    }
    wp.predictWord(x, y);
  };

  const addTargetEventListener = () => {
    const isLeft = x => (x < window.outerWidth / 2.0 ? true : false);
    // touchstart, mousedown
    target.addEventListener(
      'touchstart',
      ev => {
        console.log('touchstart');
        console.log(ev);
        ev.preventDefault();
        startEvent(
          ev.changedTouches[0].pageX,
          ev.changedTouches[0].pageY,
          isLeft(ev.changedTouches[0].pageX)
        );
      },
      { passive: false }
    );
    target.addEventListener('mousedown', ev => {
      startEvent(ev.pageX, ev.pageY, isLeft(ev.pageX));
    });

    // touchmove, mousemove
    target.addEventListener(
      'touchmove',
      ev => {
        console.log('touchmove');
        console.log(ev);
        ev.preventDefault();
        moveEvent(
          ev.changedTouches[0].pageX,
          ev.changedTouches[0].pageY,
          isLeft(ev.changedTouches[0].pageX)
        );
      },
      { passive: false }
    );
    target.addEventListener('mousemove', ev => {
      moveEvent(ev.pageX, ev.pageY, isLeft(ev.pageX));
    });

    //touchend, mouseup, click
    target.addEventListener(
      'touchend',
      ev => {
        console.log('touchend');
        console.log(ev);
        ev.preventDefault();
        const touch = ev.changedTouches[0];
        endEvent(touch.pageX, touch.pageY, isLeft(touch.pageX));
        const targetRect = target.getBoundingClientRect();
        const x = touch.clientX - targetRect.left;
        const y = touch.clientY - targetRect.top;
        // console.log(x, y);
        targetEvent(x, y, isLeft(x));
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
      // console.log(x, y);
      targetEvent(x, y, isLeft(x));
    });
  };
  addTargetEventListener();
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
restrictScroll();
hr.initFirebase();
re.addVisualEvent();
addButtonEvent();
addTargetTapEvent();
addPredictedButtonEvent();
addMoveKeyboardEvent();
