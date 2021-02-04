import * as re from './module/RadioEvent/RadioEvent.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';
import * as wp from './module/WordPrediction/WordPrediction.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';

let loadedDatas = [];
let isSpace = false;
let isBS = false;

function init() {
  document.getElementById(
    'given-text'
  ).innerText = rp.getRandomPhrase().toLowerCase();
}

function restrictScroll() {
  $('body').css('overflow', 'hidden');
  document.addEventListener(
    'touchmove',
    (ev) => {
      ev.preventDefault();
    },
    {
      passive: false,
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
      (v) =>
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
      hr.getTapData(user, keyboardType, spaceVisual, (data) => {
        wp.createSpacialModel(data);
        loadedDatas.push({
          user: user,
          keyboard: keyboardType,
          space: spaceVisual,
          data: data,
        });
        document.getElementById('is-ok').innerText = `load success`;
      });
    }
  };
  const getDataButton = document.getElementById('get-tap-data');

  getDataButton.addEventListener('touchend', (ev) => {
    ev.preventDefault();
    buttonEvent();
  });
  getDataButton.addEventListener('click', (ev) => {
    buttonEvent();
  });
}

function addPredictedButtonEvent() {
  const buttons = document.getElementsByClassName('predicted-button');
  const predictEvent = (value) => {
    wp.pushedPredictedButton(value);
  };

  Array.from(buttons).filter((v) => {
    v.addEventListener('touchend', (ev) => {
      ev.preventDefault();
      predictEvent(v.innerText);
    });
    v.addEventListener('click', (ev) => {
      predictEvent(v.innerText);
    });
  });
}

function addTargetTapEvent() {
  const target = document.getElementById('target');
  const targetEvent = (x, y) => {
    if (isSpace) {
      isSpace = false;
      return;
    }
    if (isBS) {
      isBS = false;
      return;
    }
    wp.predictWord(x, y);
  };

  target.addEventListener(
    'touchend',
    (ev) => {
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

  target.addEventListener('click', (ev) => {
    const targetRect = target.getBoundingClientRect();
    const x = ev.clientX - targetRect.left;
    const y = ev.clientY - targetRect.top;
    console.log(x, y);
    targetEvent(x, y);
  });
}

function addSpaceTapEvent() {
  const space = [
    document.getElementsByClassName('right-space')[0],
    document.getElementsByClassName('left-space')[0],
  ];
  const spaceEvent = () => {
    wp.nextProbability();
    isSpace = true;
  };
  Array.from(space).filter((v) => {
    v.addEventListener('touchend', (ev) => {
      ev.preventDefault();
      spaceEvent();
    });
  });
  Array.from(space).filter((v) => {
    v.addEventListener('click', (ev) => {
      spaceEvent();
    });
  });
}

function addBSTapEvent() {
  const bs = document.getElementsByClassName('back')[0];
  const bsEvent = () => {
    wp.predictWordBS();
    isBS = true;
  };
  bs.addEventListener('touchend', (ev) => {
    ev.preventDefault();
    bsEvent();
  });
  bs.addEventListener('click', (ev) => {
    bsEvent();
  });
}

function addEnterTapEvent() {
  const enter = document.getElementsByClassName('enter')[0];
  const enterEvent = () => {
    wp.initProbability();
    init();
  };
  enter.addEventListener('touchend', (ev) => {
    ev.preventDefault();
    enterEvent();
  });
  enter.addEventListener('click', (ev) => {
    enterEvent();
  });
}

const addMoveKeyboardEvent = () => {
  const moveKeyboard = document.getElementsByClassName('move-keyboard')[0];
  const target = document.getElementById('target');
  let startY = -1;
  let paddingBottom = -1;
  let isMoveKeyboard = false;

  const startEvent = (y) => {
    isMoveKeyboard = true;
    startY = y;
    paddingBottom =
      target.style.paddingBottom === ''
        ? 0
        : parseInt(target.style.paddingBottom);
  };

  const moveEvent = (y) => {
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
    (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      startEvent(ev.changedTouches[0].pageY);
    },
    {
      passive: false,
    }
  );
  moveKeyboard.addEventListener(
    'touchmove',
    (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      moveEvent(ev.changedTouches[0].pageY);
    },
    {
      passive: false,
    }
  );
  moveKeyboard.addEventListener(
    'touchend',
    (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      endEvent();
    },
    {
      passive: false,
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
addSpaceTapEvent();
addBSTapEvent();
addEnterTapEvent();
addMoveKeyboardEvent();
