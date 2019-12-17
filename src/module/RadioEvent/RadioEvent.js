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

function createLayoutParams(
  kbdBgVisible,
  kbdOpacity,
  kbdBorderVisible,
  kbdIsBorderless,
  keyBgVisible,
  keyOpacity,
  keyBorderVisible
) {
  return {
    keyboard: {
      bgVisible: kbdBgVisible,
      opacity: kbdOpacity,
      borderVisible: kbdBorderVisible,
      isBorderless: kbdIsBorderless
    },
    key: {
      bgVisible: keyBgVisible,
      opacity: keyOpacity,
      borderVisible: keyBorderVisible
    }
  };
}

function setLayout(layoutParams) {
  const kbdBgColor = layoutParams.keyboard.isBorderless
    ? `rgba(64, 64, 64, ${layoutParams.keyboard.bgVisible ? '1' : '0'})`
    : `rgba(0, 0, 0, ${layoutParams.keyboard.bgVisible ? '1' : '0'}`;
  leftKeyboard.css('background-color', kbdBgColor);
  rightKeyboard.css('background-color', kbdBgColor);

  leftKeyboard.css('opacity', `${layoutParams.keyboard.opacity}`);
  rightKeyboard.css('opacity', `${layoutParams.keyboard.opacity}`);

  const kbdBorderColor = `rgba(64, 64, 64, ${
    layoutParams.keyboard.borderVisible ? '1' : '0'
  })`;
  leftKeyboard.css('border-color', kbdBorderColor);
  rightKeyboard.css('border-color', kbdBorderColor);

  keys.css('font-size', layoutParams.keyboard.isBorderless ? '27px' : '27px');

  keys.css(
    'background-color',
    `rgba(64, 64, 64, ${layoutParams.key.bgVisible ? '1' : '0'})`
  );

  keys.css('opacity', `${layoutParams.key.opacity ? '1' : '0'}`);
  leftSpace.css('opacity', '0');
  rightSpace.css('opacity', '0');
  unusedKeys.css('opacity', '0');
  moveKeyboard.css('opacity', '0');

  if (!layoutParams.key.bgVisible && layoutParams.key.opacity === 1) {
    // keys.css('border-top-width', '1px');
    // keys.css('border-bottom-width', '1px');
    // keys.css('border-right-width', '1px');
    // $(
    //   `[data-letter="q"],[data-letter="a"],[data-letter="z"],
    // [data-letter="y"],[data-letter="h"],[data-letter="b"]`
    // ).css('border-left-width', '1px');
    keys.css('border-width', '3px');
    keys.css('border-color', 'rgb(64, 64, 64)');
    keys.css(
      'border-radius',
      `${layoutParams.key.borderVisible ? '0px' : '7px'}`
    );
  } else {
    keys.css('border-width', '0px');
    //   // keys.css('border-color', '')
    //   keys.css(
    //     'border-radius',
    //     ''
    //   )
  }
}

function addRadioEvent() {
  $('#visual-mode input:radio[name=visual-mode]').on('change', ev => {
    let layoutParams = {};
    switch (ev.target.value) {
      case 'eyes-on':
      case 'peripheral':
        layoutParams = createLayoutParams(
          true,
          1,
          false,
          false,
          true,
          1,
          false
        );
        break;
      case 'stk-peripheral':
        layoutParams = createLayoutParams(
          true,
          0.5,
          false,
          false,
          true,
          1,
          false
        );
        break;
      case 'borderless':
        // bordreless border visible false
        // key backround === bg background
        layoutParams = createLayoutParams(true, 1, false, true, true, 1, false);
        break;
      case 'stk-borderless':
        // semitransparent
        // border visible false
        // key background === bg background
        layoutParams = createLayoutParams(
          true,
          0.5,
          false,
          true,
          true,
          1,
          false
        );
        break;
      case 'key-wired':
        layoutParams = createLayoutParams(
          false,
          1,
          true,
          false,
          false,
          1,
          false
        );
        break;
      case 'stk-key-wired':
        layoutParams = createLayoutParams(
          false,
          0.5,
          true,
          false,
          false,
          1,
          false
        );
        break;
      case 'key-invisible':
        layoutParams = createLayoutParams(
          true,
          1,
          false,
          false,
          false,
          0,
          false
        );
        break;
      case 'stk-key-invisible':
        layoutParams = createLayoutParams(
          true,
          0.5,
          false,
          false,
          false,
          0,
          false
        );
        break;
      case 'frame-only':
        layoutParams = createLayoutParams(
          false,
          1,
          true,
          false,
          false,
          0,
          false
        );
        break;
      case 'stk-frame-only':
        layoutParams = createLayoutParams(
          false,
          0.5,
          true,
          false,
          false,
          0,
          false
        );
        break;
      case 'invisible':
        layoutParams = createLayoutParams(
          false,
          0,
          false,
          false,
          false,
          1,
          false
        );
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
