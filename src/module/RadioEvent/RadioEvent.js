// visual-modeの設定
let leftKeyboard = $('#left-keyboard');
let rightKeyboard = $('#right-keyboard');
let keys = $('.key');
let unusedKeys = $(
  '.shift, .left-symbol, .language, .mic, .back, .enter, .period, .comma, .close, .right-symbol'
);
let leftSpace = $('.left-space');
let rightSpace = $('.right-space');
let spaceVisible = $('#space-visible');
let moveKeyboard = $('.move-keyboard');

// function setKeyboardBGVisible(isVisible, opacity = 0) {
//   leftKeyboard.css(
//     'background-color',
//     `rgba(0, 0, 0, ${isVisible ? '1' : '0'}`
//   );
//   rightKeyboard.css(
//     'background-color',
//     `rgba(0, 0, 0, ${isVisible ? '1' : '0'}`
//   );
// }

// function setKeyboardOpacity(opacity = 0) {
//   leftKeyboard.css('opacity', opacity.toString());
//   rightKeyboard.css('opacity', opacity.toString());
// }

// function setKeyboardBorderVisible(isVisible) {
//   leftKeyboard.css(
//     'border-color',
//     `rgba(64, 64, 64, ${isVisible ? '1' : '0'})`
//   );
//   rightKeyboard.css(
//     'border-color',
//     `rgba(64, 64, 64, ${isVisible ? '1' : '0'})`
//   );
// }

// function setSpaceVisible(isVisible) {
//   leftSpace.css('opacity', `${isVisible ? '1' : '0'}`);
//   rightSpace.css('opacity', `${isVisible ? '1' : '0'}`);
// }

// function setKeyVisible(isVisible) {
//   keys.css('opacity', `${isVisible ? '1' : '0'}`);
//   setSpaceVisible(false);
//   unusedKeys.css('opacity', '0');
//   moveKeyboard.css('opacity', '0');
// }

// function setKeyBorderVisible(isVisible) {
//   keys.css('border', `${isVisible ? '1px' : '0px'}`);
// }

function createLayoutParams(
  kbdBgVisible,
  kbdOpacity,
  kbdBorderVisible,
  keyBgVisible,
  keyOpacity,
  keyBorderVisible
) {
  return {
    keyboard: {
      bgVisible: kbdBgVisible,
      opacity: kbdOpacity,
      borderVisible: kbdBorderVisible
    },
    key: {
      bgVisible: keyBgVisible,
      opacity: keyOpacity,
      borderVisible: keyBorderVisible
    }
  };
}

function setLayout(layoutParams) {
  leftKeyboard.css(
    'background-color',
    `rgba(0, 0, 0, ${layoutParams.keyboard.bgVisible ? '1' : '0'}`
  );
  rightKeyboard.css(
    'background-color',
    `rgba(0, 0, 0, ${layoutParams.keyboard.bgVisible ? '1' : '0'}`
  );

  leftKeyboard.css('opacity', `${layoutParams.keyboard.opacity}`);
  rightKeyboard.css('opacity', `${layoutParams.keyboard.opacity}`);

  leftKeyboard.css(
    'border-color',
    `rgba(64, 64, 64, ${layoutParams.keyboard.borderVisible ? '1' : '0'})`
  );
  rightKeyboard.css(
    'border-color',
    `rgba(64, 64, 64, ${layoutParams.keyboard.borderVisible ? '1' : '0'})`
  );

  keys.css(
    'background-color',
    `rgba(64, 64, 64, ${layoutParams.key.bgVisible ? '1' : '0'})`
  );

  keys.css('opacity', `${layoutParams.key.opacity ? '1' : '0'}`);
  leftSpace.css('opacity', '0');
  rightSpace.css('opacity', '0');
  unusedKeys.css('opacity', '0');
  moveKeyboard.css('opacity', '0');

  // keys.css('border-top-width', '1px');
  // keys.css('border-bottom-width', '1px');
  // keys.css('border-right-width', '1px');
  // $(
  //   `[data-letter="q"],[data-letter="a"],[data-letter="z"],
  //   [data-letter="y"],[data-letter="h"],[data-letter="b"]`
  // ).css('border-left-width', '1px');
  // keys.css('border-width', '1px');
  // keys.css('border-color', 'rgb(64, 64, 64)');
  // keys.css(
  //   'border-radius',
  //   `${layoutParams.key.borderVisible ? '0px' : 'var(--letter-radius)'}`
  // );
}

function addRadioEvent() {
  $('#visual-mode input:radio[name=visual-mode]').on('change', ev => {
    let keys = $('.key');
    let layoutParams = {};
    switch (ev.target.value) {
      case 'eyes-on':
      case 'peripheral':
        // setKeyboardBGVisible(true);
        // setKeyboardOpacity(1);
        // setKeyboardBorderVisible(false);
        // setKeyVisible(true);
        layoutParams = createLayoutParams(true, 1, false, true, 1, false);
        break;
      case 'stk-peripheral':
        // setKeyboardBGVisible(true);
        // setKeyboardOpacity(0.5);
        // setKeyboardBorderVisible(false);
        // setKeyVisible(true);
        layoutParams = createLayoutParams(true, 0.5, false, true, 1, false);
        break;
      case 'key-wired':
        // setKeyboardBGVisible(false);
        // setKeyboardOpacity(1);
        // setKeyboardBorderVisible(true);
        // setKeyVisible(true);
        // setKeyBorderVisible(true);
        layoutParams = createLayoutParams(false, 1, false, false, 1, true);
        break;
      case 'key-invisible':
        // setKeyboardBGVisible(true);
        // setKeyboardOpacity(1);
        // setKeyboardBorderVisible(false);
        // setKeyVisible(false);
        layoutParams = createLayoutParams(true, 1, false, false, 0, false);
        break;
      case 'frame-only':
        // setKeyboardBGVisible(false);
        // setKeyboardOpacity(1);
        // setKeyboardBorderVisible(true);
        // setKeyVisible(false);
        layoutParams = createLayoutParams(false, 1, true, false, 0, false);
        break;
      case 'stk-frame-only':
        // setKeyboardBGVisible(false);
        // setKeyboardOpacity(0.5);
        // setKeyboardBorderVisible(true);
        // setKeyVisible(false);
        layoutParams = createLayoutParams(false, 0.5, true, false, 1, false);
        break;
      case 'invisible':
        // setKeyboardBGVisible(false);
        // setKeyboardOpacity(0);
        // setKeyboardBorderVisible(false);
        // setKeyVisible(false);
        layoutParams = createLayoutParams(false, 0, false, false, 1, false);
        break;
    }
    setLayout(layoutParams);
  });
}

function addSpaceCheckEvent() {
  $('#space-visible').on('change', ev => {
    const visualValue = $(
      '#visual-mode input:radio[name=visual-mode]:checked'
    ).val();
    if (visualValue === 'eyes-on' || visualValue === 'peripheral') return;
    if (ev.target.checked) {
      setSpaceVisible(true);
    } else {
      setSpaceVisible(false);
    }
  });
}

function addBgTextCheckEvent() {
  $('#bg-text-visible').on('change', ev => {
    if (ev.target.checked) {
      $('#bg-text').css('opacity', 1);
    } else {
      $('#bg-text').css('opacity', 0);
    }
  });
}

export function addVisualEvent() {
  addRadioEvent();
  addSpaceCheckEvent();
  addBgTextCheckEvent();
}
