export const useTypingEvent = () => {
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
      selectCandidate(offsetX); //
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
