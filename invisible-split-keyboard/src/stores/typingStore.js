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

  const setInputText = (text) => {
    inputText.value = text;
  };

  // tapdata
  const isSetCurrentInfo = () => {
    return currentDataInfo.value === Initial_Info;
  };

  const isTapDataFetched = () => {
    return loadedTapDataList.find(
      (v) =>
        v.user === userName.value &&
        v.keyboard === keyboardMode.value &&
        v.space === 'invisible'
    );
  };

  const fetchTapData = () => {
    getTapData(userName.value, keyboardMode.value, (data) => {
      loadedTapDataList.push({
        user: userName.value,
        keyboard: keyboardMode.value,
        space: 'invisible',
        data: data,
      });
    });
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
    }
    setCurrentDataInfo();
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

  return {
    userName,
    setUserName,
    keyboardMode,
    setKeyboardMode,
    bgTextVisible,
    setBgTextVisible,
    taskCount,
    incrementTaskCount,
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
  };
};

export const provideStore = () => {
  provide(key, typingStore());
};

export const useStore = () => {
  return inject(key);
};
