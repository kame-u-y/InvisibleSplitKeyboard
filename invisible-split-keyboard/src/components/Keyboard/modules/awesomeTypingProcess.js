import { ref, onMounted, watch } from 'vue';
import { useStore } from '../../../stores/typingStore';
import { useWordPrediction } from '../../../modules/wordPrediction/wordPrediction';

export const useAwesomeTypingProcess = () => {
  const {
    givenText,
    inputText,
    loadedTapDataList,
    currentDataInfo,
    isSetCurrentInfo,
    getCurrentTapData,
    predictedCandedates,
    selectedCandidateId,
    setSelectedCandidateId,
    initSelectedCandidateId,
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

  const decideCandidateSelection = (isQuickSelection) => {
    // selectedCandedateId
    const id = isQuickSelection ? 0 : selectedCandidateId.value;
    const selectedValue = predictedCandedates.value[id];
    pushedPredictedButton(selectedValue);
    initSelectedCandidateId();
    if (givenText.value === inputText.value) {
      incrementTaskCount();
      initProbability();
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
    decideCandidateSelection,
    backPredictedText,
  };
};
