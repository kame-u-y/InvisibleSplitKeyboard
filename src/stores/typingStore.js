import { inject, provide, ref, reactive } from 'vue';
import { phrases } from '../modules/phraseSet';
import { getTapData } from '../modules/myHttpRequest';
import { mockData } from './data/mockData';

export const key = Symbol();

export const typingStore = () => {
  const userName = ref('');
  const keyboardMode = ref('eyes-on');
  const bgTextVisible = ref(false);
  const taskCount = ref(1);
  const dataVisible = ref(false);

  const givenText = ref('＼＼しばしお待ちを／／');
  const inputText = ref('');
  let remainPhrases = phrases.slice(0);

  const loadedTapDataList = [mockData];
  const Initial_Info = {
    user: '',
    keyboard: '',
    space: 'invisible',
  };
  const currentDataInfo = reactive(Initial_Info);

  const predictedCandidates = ref([]);
  const selectedCandidateId = ref(-1);

  const gaussianData = {};
  const targetLeft = ref(0);
  const targetTop = ref(0);

  // about setting
  const setUserName = (newUserName) => {
    userName.value = newUserName;
  };

  const isSetUserName = () => {
    return userName.value !== '';
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
    givenText.value = remainPhrases[id].toLowerCase();
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

  const setInputText = (text) => {
    inputText.value = text;
  };

  // tapdata
  const isSetCurrentInfo = () => {
    return currentDataInfo.value && currentDataInfo.value !== Initial_Info;
  };

  const isTapDataFetched = () => {
    return loadedTapDataList.find(
      (v) =>
        v.user === userName.value &&
        v.keyboard === keyboardMode.value &&
        v.space === 'invisible'
    );
  };

  const setCurrentDataInfo = () => {
    if (!isSetUserName()) {
      alert('Please set user name');
      return;
    }
    currentDataInfo.value = {
      user: userName.value,
      keyboard: keyboardMode.value,
      space: 'invisible',
    };
  };

  const fetchTapData = () => {
    getTapData(userName.value, keyboardMode.value, (data) => {
      loadedTapDataList.push({
        user: userName.value,
        keyboard: keyboardMode.value,
        space: 'invisible',
        data: data,
      });
      setCurrentDataInfo();
    });
  };

  const getCurrentTapData = () => {
    const found = loadedTapDataList.find(
      (v) =>
        v.user === currentDataInfo.value.user &&
        v.keyboard === currentDataInfo.value.keyboard &&
        v.space === currentDataInfo.value.space
    );
    return found.data;
  };

  const loadTapData = () => {
    if (!isSetUserName()) {
      alert('Please set user name');
      return false;
    }
    if (!isTapDataFetched()) {
      fetchTapData();
    } else {
      setCurrentDataInfo();
    }
    return true;
  };

  const initPredictedCandidates = () => {
    predictedCandidates.value = [];
  };

  const setPredictedCandidates = (candidates) => {
    // const filled = Object.assign(['', '', '', '', ''], candidates);
    predictedCandidates.value = candidates;
  };

  const setSelectedCandidateId = (id) => {
    selectedCandidateId.value = id;
  };

  const initSelectedCandidateId = () => {
    selectedCandidateId.value = -1;
  };

  const setTargetRect = (rect) => {
    targetLeft.value = rect.left;
    targetTop.value = rect.top;
  };

  const setDataVisible = (visible) => {
    dataVisible.value = visible;
  };

  return {
    userName,
    setUserName,
    keyboardMode,
    setKeyboardMode,
    bgTextVisible,
    setBgTextVisible,
    taskCount,
    incrementTaskCount,
    dataVisible,
    setDataVisible,
    givenText,
    updateGivenText,
    inputText,
    initInputText,
    addInputLetter,
    addInputSpace,
    backInputText,
    setInputText,
    remainPhrases,
    loadedTapDataList,
    currentDataInfo,
    setCurrentDataInfo,
    isSetCurrentInfo,
    getCurrentTapData,
    loadTapData,
    predictedCandidates,
    selectedCandidateId,
    initPredictedCandidates,
    setPredictedCandidates,
    setSelectedCandidateId,
    initSelectedCandidateId,
    gaussianData,
    targetLeft,
    targetTop,
    setTargetRect,
  };
};

export const provideStore = () => {
  provide(key, typingStore());
};

export const useStore = () => {
  return inject(key);
};
