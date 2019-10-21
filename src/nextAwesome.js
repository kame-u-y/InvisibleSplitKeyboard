import * as re from './module/RadioEvent/RadioEvent.js';
import * as hr from './module/MyHttpRequest/MyHttpRequest.js';
import * as wp from './module/WordPrediction/WordPrediction.js';
import * as rp from './module/GetRandomWords/GetRandomWords.js';

let tapDatas = [];
let isSpace = false;

function init() {
  document.getElementById('given-text').innerText = rp.getRandomPhrase();
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
    const tapData = tapDatas.find(
      v =>
        v.user === user &&
        v.keyboard === keyboardType &&
        v.space === spaceVisual
    );

    if (tapData) {
      wp.createSpacialModel(tapData.data);
    } else {
      if (user === '') {
        console.log('user is not defined');
        return;
      }
      hr.getTapData(user, keyboardType, spaceVisual, data => {
        wp.createSpacialModel(data);
        data = wp.removeSMOutlier(data);
        wp.createSpacialModel(data);
        tapDatas.push({
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
      preventDefault();
      predictEvent(v.innerText);
    });
    v.addEventListener('click', ev => {
      predictEvent(v.innerText);
    });
  });
}

function addTargetTapEvent() {
  let selectFlag = false;
  let selectStartX = -1;
  let selectStartY = -1;
  const target = document.getElementById('target');
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
      selectFlag = false;
    } else {
      if (x - selectStartX < 10) return;
      selectFlag = true;
      let [dx, w] = dxwProcess(x, selectStartX);
      const buttons = document.getElementsByClassName('predicted-button');
      for (let i = 0; i < buttons.length; i++) {
        if (i === Math.floor(dx / w) - 1)
          buttons[i].style.backgroundColor = '#ccc';
        else buttons[i].style.backgroundColor = '#ddd';
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
    } else {
      if (!selectFlag) {
        initStartXY();
        return;
      }
      let [dx, w] = dxwProcess(x, selectStartX);
      const selected = document.getElementsByClassName('predicted-button')[
        Math.floor(dx / w) - 1
      ];
      wp.pushedPredictedButton(selected.innerText);
      selected.style.backgroundColor = '#ddd';
    }
    wp.nextProbability();
    isSpace = true;
    initStartXY();
  };

  const targetEvent = (x, y) => {
    if (isSpace || selectFlag) {
      isSpace = false;
      selectFlag = false;
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
      endEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
      targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );
  target.addEventListener('mouseup', ev => {
    endEvent(ev.pageX, ev.pageY);
  });
  target.addEventListener('click', ev => {
    targetEvent(ev.pageX, ev.pageY);
  });

  // target.addEventListener(
  //   "touchend",
  //   ev => {
  //     ev.preventDefault();
  //     endEvent(ev.changedTouches[0].pageX);
  //   },
  //   { passive: false }
  // );
  // target.addEventListener("mouseup", ev => {
  //   endEvent(ev.pageX);
  // });
}

function addSpaceTapEvent() {
  const space = [
    document.getElementsByClassName('right-space')[0],
    document.getElementsByClassName('left-space')[0]
  ];
  const spaceEvent = () => {
    wp.nextProbability();
    isSpace = true;
  };
  Array.from(space).filter(v => {
    v.addEventListener('touchend', ev => {
      ev.preventDefault();
      spaceEvent();
    });
  });
  Array.from(space).filter(v => {
    v.addEventListener('click', ev => {
      spaceEvent();
    });
  });
}

function addEnterTapEvent() {
  const enter = document.getElementsByClassName('enter')[0];
  const enterEvent = () => {
    wp.initProbability();
    init();
  };
  enter.addEventListener('touchend', ev => {
    ev.preventDefault();
    enterEvent();
  });
  enter.addEventListener('click', ev => {
    enterEvent();
  });
}

init();
restrictScroll();
hr.initFirebase();
re.addVisualEvent();
addButtonEvent();
addTargetTapEvent();
addPredictedButtonEvent();
addSpaceTapEvent();
addEnterTapEvent();
