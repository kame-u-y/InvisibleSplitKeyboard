import { ref, inject, provide } from 'vue';
import { phrases } from '../modules/phraseSet';

export const key = Symbol();

export const collectTypingStore = () => {
  const userName = ref('');
  const keyboardMode = ref('eyes-on');
  const bgTextVisible = ref(false);
  const givenText = ref('＼＼しばしお待ちを／／');
  const inputText = ref('');
  let nextLetterNum = 0;

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
  const remainPhrases = phrases.slice(0);
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

  const addInputLetter = (isLeftTouch) => {
    console.log(givenText.value.charAt(nextLetterNum));
    if (nextLetterNum === givenText.value.length) {
      console.log('task ended');
      return;
    }
    if (givenText.value.charAt(nextLetterNum) === ' ') {
      console.log('next is space');
      return;
    }
    inputText.value += isCollectLetter(isLeftTouch)
      ? givenText.value.charAt(nextLetterNum)
      : '*';
    // add TapInfo;
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
    updateGivenText();
  };

  const addInputSpace = () => {
    if (nextLetterNum === givenText.value.length) {
      console.log('next phrase');
      goNextPhrase();
    } else {
      console.log('space');
      inputText.value += isCollectSpace() ? ' ' : '*';
      nextLetterNum++;
    }
  };

  const backInputText = () => {
    inputText.value = inputText.value.slice(0, -1);
    // delete tapData[nextLetterNum - 1];
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
