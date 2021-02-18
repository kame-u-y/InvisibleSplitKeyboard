import { useStore } from '../../../../stores/collectTypingStore';
const {
  givenText,
  nextLetterNum,
  addInputLetter,
  addInputSpace,
  backInputText,
} = useStore();

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
    status: 'NONE',
  },
  right: {
    startX: -1,
    status: 'NONE',
  },
};

const getSide = (x) => {
  return x < window.outerWidth / 2.0 ? Touch_Side.left : Touch_Side.right;
};

const initTouchStatus = () => {
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

export const handleTouchStart = (startX) => {
  const side = getSide(startX);
  if (isTouchStarted(side)) return;
  setTouchStartX(side, startX);
};

export const handleTouchMove = (moveX) => {
  const side = getSide(moveX);
  if (!isTouchStarted(side)) return;
  const offsetX = moveX - touchState[side].startX;
  if (moveX && offsetX > 100) {
    setTouchStatus(side, Touch_Status.space);
  } else if (moveX && offsetX < -70) {
    setTouchStatus(side, Touch_Status.backSpace);
  } else {
    setTouchStatus(side, Touch_Status.click);
  }
};

const clickEnd = (side) => {
  addInputLetter();
  initTouchStartX(side);
  return;
};

const spaceEnd = (side) => {
  if (nextLetterNum === givenText.length) {
    goNextPhrase();
    initTouchStatus();
  } else {
    addInputSpace();
  }
  initTouchStartX(side);
  return;
};

const backSpaceEnd = (side) => {
  backInputText();
  initTouchStartX(side);
  return;
};

export const handleTouchEnd = (endX) => {
  const side = getSide(endX);
  if (!isTouchStarted(side)) return;
  if (touchState[side].status === Touch_Status.click) {
    clickEnd(side);
  } else if (touchState[side].status === Touch_Status.space) {
    spaceEnd(side);
  } else if (touchState[side].status === Touch_Status.backSpace) {
    backSpaceEnd(side);
  }
};
