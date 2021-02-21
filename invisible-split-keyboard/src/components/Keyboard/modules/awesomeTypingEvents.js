import { onUpdated, reactive } from 'vue';
import { useStore } from '../../../stores/typingStore';
import { useAwesomeTypingProcess } from './awesomeTypingProcess';

export const useTypingEvent = () => {
  const {
    selectCandidate,
    addPredictedLetter,
    addPredictedSpace,
    decideCandidateSelection,
    backPredictedText,
  } = useAwesomeTypingProcess();

  const { predictedCandidates } = useStore();

  const Touch_Status = {
    none: 'NONE',
    click: 'CLICK',
    select: 'SELECT',
    space: 'SPACE',
    backSpace: 'BACK',
  };

  const Touch_Side = {
    left: 'left',
    right: 'right',
  };

  const Initial_Start_X = -99999;

  // const Selection_Num = 5;
  const Selection_Interval = 30;
  const Selection_Min = 30;
  // const Selection_Max = Selection_Interval * Selection_Num - 0.1;

  const touchState = {
    left: {
      startX: Initial_Start_X,
      status: Touch_Status.none,
      selectStartTime: -1,
      isStarted: false,
    },
    right: {
      startX: Initial_Start_X,
      status: Touch_Status.none,
      selectStartTime: -1,
      isStarted: false,
    },
  };

  const getSide = (x) => {
    return x < document.body.clientWidth / 2.0
      ? Touch_Side.left
      : Touch_Side.right;
  };

  const initTouchStatus = (side) => {
    touchState[side].status = Touch_Status.none;
  };

  const setTouchStatus = (side, status) => {
    touchState[side].status = status;
  };

  const isTouchStarted = (side) => {
    // return touchState[side].startX !== Initial_Start_X;
    return touchState[side].isStarted;
  };

  const startTouch = (side) => {
    touchState[side].isStarted = true;
  };

  const endTouch = (side) => {
    touchState[side].isStarted = false;
  };

  const initTouchStartX = (side) => {
    touchState[side].startX = Initial_Start_X;
  };

  const setTouchStartX = (side, startX) => {
    touchState[side].startX = startX;
  };

  const initSelectStartTime = (side) => {
    touchState[side].selectStartTime = -1;
  };

  const setSelectStartTime = (side) => {
    touchState[side].selectStartTime = Date.now();
  };

  const isSetSelectStartTime = (side) => {
    return touchState[side].selectStartTime !== -1;
  };

  const getSelectId = (x) => {
    return Math.floor(x / Selection_Interval) - 1;
  };

  const isQuickSelection = (side) => {
    return (
      isSetSelectStartTime(side) &&
      Date.now() - touchState[side].selectStartTime < 100
    );
  };

  const handleTouchStart = (startX) => {
    const side = getSide(startX);
    if (isTouchStarted(side)) return;
    setTouchStartX(side, startX);
    setTouchStatus(side, Touch_Status.click);
    startTouch(side);
  };

  const handleTouchMove = (moveX) => {
    const side = getSide(moveX);
    if (!isTouchStarted(side)) return;
    const offsetX = moveX - touchState[side].startX;
    if (offsetX < -70) {
      setTouchStatus(side, Touch_Status.backSpace);
      return;
    } else if (offsetX >= -70 && offsetX < 10) {
      setTouchStatus(side, Touch_Status.click);
      return;
    } else if (predictedCandidates.value.length === 0) {
      setTouchStatus(side, Touch_Status.space);
      return;
    } else {
      if (!isSetSelectStartTime(side)) {
        setSelectStartTime(side);
      }
      setTouchStatus(side, Touch_Status.select);
      // 閾値の処理は全部まとめたくてここでid処理
      const selectionMax =
        Selection_Interval * predictedCandidates.value.length;
      if (offsetX < Selection_Min) {
        selectCandidate(getSelectId(Selection_Min));
      } else if (offsetX > selectionMax) {
        selectCandidate(getSelectId(selectionMax));
      } else {
        selectCandidate(getSelectId(offsetX));
      }
      // selectCandidateId(offsetX); // 選択の幅を内部で定義する
      return;
    }
  };

  const handleTouchEnd = (endX, endY) => {
    const side = getSide(endX);
    if (!isTouchStarted(side)) return;
    if (touchState[side].status === Touch_Status.click) {
      addPredictedLetter(endX, endY);
    } else if (touchState[side].status === Touch_Status.select) {
      decideCandidateSelection(isQuickSelection(side)); //
      // initCandidateId();
    } else if (touchState[side].status === Touch_Status.space) {
      addPredictedSpace();
    } else if (touchState[side].status === Touch_Status.backSpace) {
      backPredictedText();
    }

    initTouchStartX(side);
    initTouchStatus(side);
    initSelectStartTime(side);
    endTouch(side);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
