import { ref, inject, provide } from 'vue';
import { phrases } from '../modules/phraseSet';

export const key = Symbol();

export const collectTypingStore = () => {
  const userName = ref('');
  const keyboardMode = ref('eyes-on');
  const bgTextVisible = ref(false);
  const givenText = ref('＼＼しばしお待ちを／／');
  const inputText = ref('');
  const nextLetterNum = ref(0);

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

  const goNextPhrase = () => {
    // hr.postTapData(tapData);
    // taskCount++;
    // init();
    // initFlag = ture;
  };

  const isCollectLetter = (isLeftTouch) => {
    const isLeftLetter = 'qwertasdfgzxcv'.match(
      givenText.value.charAt(nextLetterNum)
    );
    return (isLeftTouch && isLeftLetter) || (!isLeftLetter && !isLeftLetter);
  };

  const addInputLetter = () => {
    inputText.value += isCollectLetter()
      ? givenText.value.charAt(nextLetterNum)
      : '*';
    // add TapInfo;
    nextLetterNum.value++;
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

  const addInputSpace = () => {
    inputText.value += isCollectSpace() ? ' ' : '*';
    nextLetterNum.value++;
  };

  const backInputText = () => {
    inputText.value;
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
  };
};

export const provideStore = () => {
  provide(key, collectTypingStore());
};

export const useStore = () => {
  return inject(key);
};

// export default function collectTypingStore() {
//   const state = reactive({
//     userName: '',
//     keyboardMode: 'eyes-on',
//     bgVisible: false,
//     tapData: {},
//     givenText: '',
//     inputText: '',
//     nextLetterNum: 0,
//   });
//   return {
//     setUserName(inputName) {
//       this.state.userName = inputName;
//     },
//     setMode(selectMode) {
//       this.state.keyboardMode = selectMode;
//     },
//     setBgVisible(isCheck) {
//       this.state.bgVisible = isCheck;
//     },
//     addTapData(newData) {
//       letterList.map((letter) => {
//         return (this.state.tapData[letter] = [
//           ...tapData[letter],
//           ...newData[letter],
//         ]);
//       });
//     },
//     setGivenText(givenText) {
//       // phrase setから抽出
//       this.state.givenText = givenText;
//     },
//     updateInputText(tapSide) {
//       const getLetterSide = (letter) => true; // mock
//       const nextLetter = givenText.indexOf(nextLetterNum);
//       if (tapSide === getLetterSide(nextLetter)) {
//         this.state.inputText += nextLetter;
//       } else {
//         this.state.inputText += '*';
//       }
//     },
//     updateNextLetterNum(is) {
//       this.state.nextLetterNum = num;
//     },
//   };
// }
