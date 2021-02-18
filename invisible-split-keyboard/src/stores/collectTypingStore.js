import { ref, inject, provide } from 'vue';
import { phrases } from '../modules/phraseSet';

export const key = Symbol();

export const collectTypingStore = () => {
  const userName = ref('');
  const keyboardMode = ref('eyes-on');
  const bgTextVisible = ref(false);
  const givenText = ref('＼＼しばしお待ちを／／');
  const inputText = ref('');
  let remainPhrases = phrases.slice(0);
  let nextLetterNum = 0;
  let tapData = [];

  // about setting
  const setUserName = (newUserName) => {
    userName.value = newUserName;
  };

  const setKeyboardMode = (selectMode) => {
    keyboardMode.value = selectMode;
  };

  const setBgTextVisible = (isVisible) => {
    bgTextVisible.value = isVisible;
  };

  // about task
  const initTapData = () => {
    tapData = [];
  };

  const addTapData = (letter, x, y) => {
    if (letter === ' ' || letter === '-' || letter === '?' || letter === '�') {
      return;
    }
    letter = letter.toLowerCase();
    if (!tapData[letter]) {
      tapData[letter] = [];
    }
    tapData[letter].push({
      position: {
        x: x,
        y: y,
      },
      timestamp: Date.now(),
    });
  };

  const updateGivenText = () => {
    if (remainPhrases.length === 0) {
      remainPhrases = phrases.slice(0);
    }
    const id = Math.floor(Math.random() * remainPhrases.length);
    givenText.value = remainPhrases[id];
    remainPhrases.splice(id, 1);
  };

  const initInputText = () => {
    inputText.value = '';
    nextLetterNum = 0;
  };

  const isCollectLetter = (isLeftTouch) => {
    const isLeftLetter = 'qwertasdfgzxcv'.match(
      givenText.value.charAt(nextLetterNum)
    );
    return (isLeftTouch && isLeftLetter) || (!isLeftTouch && !isLeftLetter);
  };

  const addInputLetter = (isLeftTouch, tapDataX, tapDataY) => {
    if (nextLetterNum === givenText.value.length) {
      return;
    }
    if (givenText.value.charAt(nextLetterNum) === ' ') {
      return;
    }
    if (isCollectLetter(isLeftTouch)) {
      const newLetter = givenText.value.charAt(nextLetterNum);
      inputText.value += newLetter;
      addTapData(newLetter, tapDataX, tapDataY);
    } else {
      inputText.value += '*';
    }
    nextLetterNum++;
  };

  const isCollectSpace = () => {
    const givenWordList = givenText.value.split(' ');
    const inputWordList = inputText.value.split(' ');
    for (let i = 0; i < inputWordList.length; i++) {
      if (inputWordList[i].length !== givenWordList[i].length) {
        return false;
      }
    }
    return true;
  };

  const goNextPhrase = () => {
    initInputText();
    initTapData();
    updateGivenText();
  };

  const addInputSpace = () => {
    if (nextLetterNum === givenText.value.length) {
      goNextPhrase();
    } else {
      inputText.value += isCollectSpace() ? ' ' : '*';
      nextLetterNum++;
    }
  };

  const backInputText = () => {
    inputText.value = inputText.value.slice(0, -1);
    delete tapData[nextLetterNum - 1];
    nextLetterNum = nextLetterNum === 0 ? 0 : nextLetterNum - 1;
  };

  return {
    userName,
    keyboardMode,
    bgTextVisible,
    givenText,
    inputText,
    setUserName,
    setKeyboardMode,
    setBgTextVisible,
    updateGivenText,
    addInputLetter,
    addInputSpace,
    goNextPhrase,
    backInputText,
  };
};

export const provideStore = () => {
  provide(key, collectTypingStore());
};

export const useStore = () => {
  return inject(key);
};
