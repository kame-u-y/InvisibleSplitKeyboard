import { inject, provide } from 'vue';
import { postTapData } from '../modules/myHttpRequest';
import { useDefaultStore } from './defaultTypingStore/defaultTypingStore';

export const key = Symbol();

export const collectTypingStore = () => {
  const {
    userName,
    keyboardMode,
    bgTextVisible,
    taskCount,
    givenText,
    inputText,
    setUserName,
    setKeyboardMode,
    setBgTextVisible,
    incrementTaskCount,
    updateGivenText,
    initInputText,
    addInputLetter,
    addInputSpace,
    backInputText,
  } = useDefaultStore();

  let nextLetterNum = 0;
  let tapData = [];

  // about task
  const incrementNextLetterNum = () => {
    nextLetterNum++;
  };

  const decrementNextLetterNum = () => {
    if (nextLetterNum === 0) return;
    nextLetterNum--;
  };

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

  const isCollectLetter = (isLeftTouch) => {
    const isLeftLetter = 'qwertasdfgzxcv'.match(
      givenText.value.charAt(nextLetterNum)
    );
    return (isLeftTouch && isLeftLetter) || (!isLeftTouch && !isLeftLetter);
  };

  const addCollectLetter = (isLeftTouch, tapDataX, tapDataY) => {
    if (nextLetterNum === givenText.value.length) return;
    if (givenText.value.charAt(nextLetterNum) === ' ') return;

    if (isCollectLetter(isLeftTouch)) {
      const newLetter = givenText.value.charAt(nextLetterNum);
      addInputLetter(newLetter);
      addTapData(newLetter, tapDataX, tapDataY);
    } else {
      addInputLetter('*');
    }
    incrementNextLetterNum();
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
    if (userName.value === '') {
      alert('Please set user name');
      return;
    }
    postTapData(tapData, userName.value, keyboardMode.value);
    initInputText();
    initTapData();
    incrementTaskCount();
    updateGivenText();
  };

  const addCollectSpace = () => {
    if (nextLetterNum === givenText.value.length) {
      goNextPhrase();
    } else {
      if (isCollectSpace()) {
        addInputSpace();
      } else {
        addInputLetter('*');
      }
      incrementNextLetterNum();
    }
  };

  const backCollectText = () => {
    backInputText();
    delete tapData[nextLetterNum - 1];
    decrementNextLetterNum();
  };

  return {
    userName,
    keyboardMode,
    bgTextVisible,
    taskCount,
    givenText,
    inputText,
    setUserName,
    setKeyboardMode,
    setBgTextVisible,
    updateGivenText,
    addCollectLetter,
    addCollectSpace,
    goNextPhrase,
    backCollectText,
  };
};

export const provideStore = () => {
  provide(key, collectTypingStore());
};

export const useStore = () => {
  return inject(key);
};
