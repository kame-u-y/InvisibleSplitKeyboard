import { ref, onMounted, watch } from 'vue';
import { useStore } from '../../../stores/typingStore';
import { useWordPrediction } from '../../../modules/wordPrediction/wordPrediction';

export const useAwesomeTypingProcess = () => {
  const {
    loadedTapDataList,
    currentDataInfo,
    isSetCurrentInfo,
    getCurrentTapData,
  } = useStore();

  const { createModel } = useWordPrediction();

  // const loadedDatas = ref([]);
  const selectedCandedateId = ref(-1);

  watch(currentDataInfo, () => {
    console.log('watched');
    createModel(getCurrentTapData());
  });

  const setSelectedCandidateId = (id) => {
    selectedCandedateId.value = id;
  };

  const selectCandidate = (selectId) => {
    setSelectedCandidateId(selectId);
  };

  const addPredictedLetter = (x, y) => {
    // predict word
    // addInputLetter
  };

  const decideCandidateSelection = (isQuickSelection) => {
    // selectedCandedateId
  };

  const backPredictedText = () => {
    // predict word bs
  };

  return {
    selectCandidate,
    addPredictedLetter,
    decideCandidateSelection,
    backPredictedText,
  };
};
