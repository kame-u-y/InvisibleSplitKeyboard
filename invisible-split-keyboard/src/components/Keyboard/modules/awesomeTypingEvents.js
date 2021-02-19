import { reactive } from 'vue';
import { useAwesomeTypingProcess } from './awesomeTypingProcess';

export const useTypingEvent = () => {
  const {
    selectCandidate,
    addPredictedLetter,
    decideCandidateSelection,
    backPredictedText,
  } = useAwesomeTypingProcess();

  const Touch_Status = {
    none: 'NONE',
    click: 'CLICK',
    select: 'SELECT',
    backSpace: 'BACK',
  };

  const Touch_Side = {
    left: 'left',
    right: 'right',
  };

  const Selection_Num = 6;
  const Selection_Interval = 30;
  const Selection_Min = 30;
  const Selection_Max = Selection_Interval * Selection_Num - 0.1;

  const touchState = reactive({
    left: {
      startX: -1,
      status: Touch_Status.none,
      selectStartTime: -1,
    },
    right: {
      startX: -1,
      status: Touch_Status.none,
      selectStartTime: -1,
    },
  });

  const getSide = (x) => {
    return x < window.outerWidth / 2.0 ? Touch_Side.left : Touch_Side.right;
  };

  const initTouchStatus = (side) => {
    touchState[side].status = Touch_Status.none;
  };

  const setTouchStatus = (side, status) => {
    touchState[side].status = status;
  };

  const initTouchStartX = (side) => {
    touchState[side].startX = -1;
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

  const isTouchStarted = (side) => {
    return touchState[side].startX !== -1;
  };

  const handleTouchStart = (startX) => {
    const side = getSide(startX);
    if (isTouchStarted(side)) return;
    setTouchStartX(side, startX);
    setTouchStatus(side, Touch_Status.click);
  };

  const handleTouchMove = (moveX) => {
    const side = getSide(moveX);
    if (!isTouchStarted(side)) return;
    const offsetX = moveX - touchState[side].startX;
    if (offsetX >= 10) {
      if (!isSetSelectStartTime(side)) {
        setSelectStartTime(side);
      }
      setTouchStatus(Touch_Status.select);
      // 閾値の処理は全部まとめたくてここでid処理
      if (offsetX < Selection_Min) {
        selectCandidate(getSelectId(Selection_Min));
      } else if (offsetX > Selection_Max) {
        selectCandidate(getSelectId(Selection_Max));
      } else {
        selectCandidate(getSelectId(offsetX));
      }

      // selectCandidateId(offsetX); // 選択の幅を内部で定義する
    } else if (offsetX < -70) {
      setTouchStatus(Touch_Status.backSpace);
    } else {
      setTouchStatus(Touch_Status.click);
    }
  };

  const handleTouchEnd = (endX, endY) => {
    const side = getSide(endX);
    if (!isTouchStarted(side)) return;
    if (touchState[side].status === Touch_Status.click) {
      addPredictedLetter(endX, endY);
    } else if (touchState[side].status === Touch_Status.select) {
      decideCandidateSelection(isQuickSelection()); //
      // initCandidateId();
    } else if (touchState[side].status === Touch_Status.backSpace) {
      backPredictedText();
    }
    initTouchStartX();
    initTouchStatus();
    initSelectStartTime();
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
