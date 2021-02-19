import { useStore } from '../../../stores/typingStore';

export const useAwesomeTypingProcess = () => {
  const {
    // userName,
    // keyboardMode,
    // givenText,
    // inputText,
    // incrementTaskCount,
    // updateGivenText,
    // initInputText,
    // addInputLetter,
    // addInputSpace,
    // backInputText,
  } = useStore();

  // const loadedDatas = ref([]);

  const selectCandidate = (offsetX) => {};
  const addPredictedLetter = () => {};
  const decideCandidateSelection = () => {};
  const backPredictedText = () => {};

  return {
    selectCandidate,
    addPredictedLetter,
    decideCandidateSelection,
    backPredictedText,
  };
};
