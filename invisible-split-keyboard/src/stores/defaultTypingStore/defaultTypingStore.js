import { ref } from 'vue';
import { phrases } from '../../modules/phraseSet';

export const useDefaultStore = () => {
  const userName = ref('');
  const keyboardMode = ref('eyes-on');
  const bgTextVisible = ref(false);
  const taskCount = ref(1);
  const givenText = ref('＼＼しばしお待ちを／／');
  const inputText = ref('');
  let remainPhrases = phrases.slice(0);

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

  const incrementTaskCount = () => {
    taskCount.value++;
  };

  // about task
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
  };

  const addInputLetter = (newLetter) => {
    inputText.value += newLetter;
  };

  const addInputSpace = () => {
    inputText.value += ' ';
  };

  const backInputText = () => {
    inputText.value = inputText.value.slice(0, -1);
  };

  return {
    userName,
    keyboardMode,
    bgTextVisible,
    taskCount,
    givenText,
    inputText,
    remainPhrases,
    setUserName,
    setKeyboardMode,
    setBgTextVisible,
    incrementTaskCount,
    updateGivenText,
    initInputText,
    addInputLetter,
    addInputSpace,
    backInputText,
  };
};
