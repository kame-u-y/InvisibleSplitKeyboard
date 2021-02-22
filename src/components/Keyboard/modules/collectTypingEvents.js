import { useCollectTypingProcess } from './collectTypingProcess';

export const useTypingEvent = () => {
  const {
    addCollectLetter,
    addCollectSpace,
    backCollectText,
  } = useCollectTypingProcess();

  const Touch_Status = {
    none: 'NONE',
    click: 'CLICK',
    space: 'SPACE',
    backSpace: 'BACK',
  };

  const Touch_Side = {
    left: 'left',
    right: 'right',
  };

  let touchState = {
    left: {
      startX: -1,
      status: Touch_Status.none,
    },
    right: {
      startX: -1,
      status: Touch_Status.none,
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

  const initTouchStartX = (side) => {
    touchState[side].startX = -1;
  };

  const setTouchStartX = (side, startX) => {
    touchState[side].startX = startX;
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
    if (offsetX > 100) {
      setTouchStatus(side, Touch_Status.space);
    } else if (offsetX < -70) {
      setTouchStatus(side, Touch_Status.backSpace);
    } else {
      setTouchStatus(side, Touch_Status.click);
    }
  };

  const handleTouchEnd = (endX, endY) => {
    const side = getSide(endX);
    if (!isTouchStarted(side)) return;

    if (touchState[side].status === Touch_Status.click) {
      addCollectLetter(side === Touch_Side.left, endX, endY);
    } else if (touchState[side].status === Touch_Status.space) {
      addCollectSpace();
    } else if (touchState[side].status === Touch_Status.backSpace) {
      backCollectText();
    }
    initTouchStartX(side);
    initTouchStatus(side);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
