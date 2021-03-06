import { watch } from 'vue';
import { useStore } from '../../../stores/typingStore';
import { useWordPrediction } from '../../../modules/wordPrediction/wordPrediction';

export const useAwesomeTypingProcess = () => {
  const {
    givenText,
    inputText,
    // loadedTapDataList,
    currentDataInfo,
    incrementTaskCount,
    // isSetCurrentInfo,
    getCurrentTapData,
    predictedCandidates,
    selectedCandidateId,
    setSelectedCandidateId,
    initSelectedCandidateId,
    updateGivenText,
  } = useStore();

  const {
    createModel,
    predictWordBS,
    pushedPredictedButton,
    initProbability,
    nextProbability,
    predictWord,
  } = useWordPrediction();

  // const loadedDatas = ref([]);

  watch(currentDataInfo, () => {
    console.log(getCurrentTapData());
    createModel(getCurrentTapData());
  });

  const selectCandidate = (selectId) => {
    setSelectedCandidateId(selectId);
  };

  const addPredictedLetter = (x, y) => {
    // predict word
    // addInputLetter
    predictWord(x, y);
  };

  const addPredictedSpace = () => {
    nextProbability();
  };

  const decideCandidateSelection = (isQuickSelection) => {
    // selectedCandedateId
    const id = isQuickSelection ? 0 : selectedCandidateId.value;
    const selectedValue = predictedCandidates.value[id];
    pushedPredictedButton(selectedValue);
    initSelectedCandidateId();
    if (givenText.value === inputText.value) {
      incrementTaskCount();
      initProbability();
      updateGivenText();
    } else {
      nextProbability();
    }
  };

  const backPredictedText = () => {
    // predict word bs
    predictWordBS();
  };

  return {
    selectCandidate,
    addPredictedLetter,
    addPredictedSpace,
    decideCandidateSelection,
    backPredictedText,
  };
};
