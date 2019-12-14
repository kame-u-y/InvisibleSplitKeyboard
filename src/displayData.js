import * as re from './module/RadioEvent/RadioEvent.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';
import * as input from './module/InputFunction/InputFunction.js';
import * as wp from './module/WordPrediction/WordPrediction.js';

let tapDatas = [];
// let debug = document.getElementById('debug');

function init() {
  document.getElementById('dot-container').innerHTML = '';
  document.getElementById('circle-container').innerHTML = '';
}

function addButtonEvent() {
  const buttonEvent = () => {
    init();
    const user = $('#user-name').val();
    const keyboardType = $(
      '#visual-mode input:radio[name=visual-mode]:checked'
    ).val();
    const spaceVisual =
      $('#space-visible').prop('checked') | (keyboardType === 'visible')
        ? 'visible'
        : 'invisible';
    const tapData = tapDatas.find(
      v =>
        v.user === user &&
        v.keyboard === keyboardType &&
        v.space === spaceVisual
    );

    if (tapData) {
      wp.createSpacialModel(tapData.data);
      input.displayTapData(tapData.data);
      wp.drawCircle();
    } else {
      if (user === '') {
        console.log('user is not defined');
        return;
      }
      hr.getTapData(user, keyboardType, spaceVisual, data => {
        wp.createSpacialModel(data);
        input.displayTapData(data);
        wp.drawCircle();
        tapDatas.push({
          user: user,
          keyboard: keyboardType,
          space: spaceVisual,
          data: data
        });
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

function addTargetTapEvent() {
  const target = document.getElementById('target');
  const targetEvent = (x, y) => {
    wp.predictWord(x, y);
  };

  target.addEventListener(
    'touchend',
    ev => {
      ev.preventDefault();
      const touch = ev.changedTouches[0];
      const targetRect = target.getBoundingClientRect();
      const x = touch.clientX - targetRect.left;
      const y = touch.clientY - targetRect.top;
      targetEvent(x, y);
      return false;
    },
    { passive: false }
  );

  target.addEventListener('click', ev => {
    const targetRect = target.getBoundingClientRect();
    const x = ev.clientX - targetRect.left;
    const y = ev.clientY - targetRect.top;
    targetEvent(x, y);
  });
}

function addEnterTapEvent() {
  const enter = document.getElementsByClassName('enter')[0];
  const enterEvent = () => {
    wp.initProbability();
  };
  enter.addEventListener('touchend', ev => {
    ev.preventDefault();
    enterEvent();
  });
  enter.addEventListener('click', ev => {
    enterEvent();
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
addButtonEvent();
addTargetTapEvent();
addEnterTapEvent();
addMoveKeyboardEvent();
