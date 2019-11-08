import * as re from './module/RadioEvent/RadioEvent.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';
import * as wp from './module/WordPrediction/WordPrediction.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';

let loadedDatas = [];
let isSpace = false;
// let isBS = false;

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
  let selectFlag = false;
  let bsFlag = false;
  let selectStartX = -1;
  let selectStartY = -1;

  const initStartXY = () => {
    selectStartX = -1;
    selectStartY = -1;
  };
  const isStarted = (x, y) => x !== -1 && y !== -1;

  const startEvent = (x, y) => {
    if (isStarted(selectStartX, selectStartY)) return;
    selectStartX = x;
    selectStartY = y;
  };

  const dxwProcess = (x, selectStartX) => {
    let dx = x - selectStartX;
    let w = 30;
    if (dx < 30) dx = 30;
    if (dx > w * 6 - 0.1) dx = w * 6 - 0.1;
    return [dx, w];
  };

  const moveEvent = (x, y) => {
    if (!isStarted(selectStartX, selectStartY)) return;

    if (y - selectStartY < -100) {
      Array.from(document.getElementsByClassName('predicted-button')).filter(
        v => {
          v.style.backgroundColor = '#eee';
        }
      );
      [selectFlag, bsFlag] = [false, false];
    } else {
      const buttons = document.getElementsByClassName('predicted-button');
      if (x - selectStartX < -100) {
        [selectFlag, bsFlag] = [false, true];
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '#ddd';
        }
        return;
      } else if (x - selectStartX >= 10) {
        [selectFlag, bsFlag] = [true, false];
        let [dx, w] = dxwProcess(x, selectStartX);
        for (let i = 0; i < buttons.length; i++) {
          if (i === Math.floor(dx / w) - 1)
            buttons[i].style.backgroundColor = '#ccc';
          else buttons[i].style.backgroundColor = '#ddd';
        }
        return;
      } else {
        [selectFlag, bsFlag] = [false, false];
      }
    }
  };
  const endEvent = (x, y) => {
    if (!isStarted(selectStartX, selectStartY)) return;

    if (y - selectStartY < -100) {
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
        initStartXY();
      } else {
        wp.nextProbability();
        isSpace = true;
        initStartXY();
      }
    } else {
      if (!selectFlag && !bsFlag) {
        initStartXY();
        return;
      }
      if (bsFlag) {
        wp.predictWordBS();
        initStartXY();
      } else if (selectFlag) {
        let [dx, w] = dxwProcess(x, selectStartX);
        const selected = document.getElementsByClassName('predicted-button')[
          Math.floor(dx / w) - 1
        ];
        wp.pushedPredictedButton(selected.innerText);
        selected.style.backgroundColor = '#ddd';
        wp.nextProbability();
        isSpace = true;
        initStartXY();
      }
    }
  };

  const targetEvent = (x, y) => {
    if (isSpace || selectFlag || bsFlag) {
      isSpace = false;
      selectFlag = false;
      bsFlag = false;
      return;
    }
    wp.predictWord(x, y);
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

init();
restrictScroll();
hr.initFirebase();
re.addVisualEvent();
addButtonEvent();
addTargetTapEvent();
addPredictedButtonEvent();
