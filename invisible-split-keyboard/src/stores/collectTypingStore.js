import { ref, inject, provide } from 'vue';
// import { letterList } from '../modules/KeyList/KeyList';

export const key = Symbol();

export const collectTypingStore = () => {
  const keyboardMode = ref('eyes-on');
  const setKeyboardMode = (selectMode) => {
    keyboardMode.value = selectMode;
  };
  return { keyboardMode, setKeyboardMode };
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
