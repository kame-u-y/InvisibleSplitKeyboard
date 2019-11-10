import * as kl from '../KeyList/KeyList.js';

export function inputLetter(letter) {
  document.getElementById('input-text').innerText += letter;
}

export function deleteLetter(tapData, nextLetterNum) {
  const t = document.getElementById('input-text');
  t.innerText = t.innerText.slice(0, -1);
  delete tapData[nextLetterNum - 1];
  nextLetterNum = nextLetterNum === 0 ? 0 : nextLetterNum - 1;
  return [tapData, nextLetterNum];
}

export function inputPosition(x, y) {
  console.log(`x:${x}, y:${y}`);
  document.getElementById('x').innerHTML = x;
  document.getElementById('y').innerHTML = y;
}

function addDot(letter, x, y) {
  const getH = letter => {
    if (kl.rowKeyList[0].indexOf(letter) !== -1)
      return kl.rowKeyList[0].indexOf(letter) * 30;
    if (kl.rowKeyList[1].indexOf(letter) !== -1)
      return 180 + kl.rowKeyList[1].indexOf(letter) * 30;
    if (kl.rowKeyList[2].indexOf(letter) !== -1)
      return kl.rowKeyList[2].indexOf(letter) * 30;
  };
  let dotContainer = document.getElementById('dot-container');
  let dot = document.createElement('p');
  dot.setAttribute('class', 'dot');
  dot.style.cssText = `background-color: hsl(${getH(
    letter
  )}, 50%, 50%); left: ${x}px; top: ${y}px`;
  dotContainer.appendChild(dot);
}

export function displayTapData(tapData) {
  if (!tapData) return;
  const targetRect = document.getElementById('target').getBoundingClientRect();
  Object.keys(tapData).filter(v => {
    tapData[v].filter(data => {
      const x = targetRect.left + data.position.x;
      const y = targetRect.top + data.position.y;
      addDot(v, x, y);
    });
  });
}
