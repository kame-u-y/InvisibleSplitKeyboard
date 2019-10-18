import * as sm from './SpacialModel.js';
import * as lm from './LanguageModel.js';

let letterPs = [];
let initFlag = false;

export function getLetterPs() {
  return letterPs;
}

export function initProbability() {
  letterPs = [];
  document.getElementById('predicted-letter').innerText = '';
  document.getElementById('predicted-word').innerText = '';
  initFlag = true;
}

export function createSpacialModel(tapData) {
  sm.createSpacialModel(tapData);
}

export function removeSMOutlier(tapData) {
  Object.keys(tapData).filter(letter => {
    tapData[letter] = tapData[letter].filter(v => {
      return !sm.isOutlier(letter, v.position.x, v.position.y);
    });
  });
  return tapData;
}

export function predictWord(x, y) {
  if (initFlag) {
    initFlag = false;
    return;
  }
  // タップ位置をもとにSMからキー確率取得
  let probabilities = sm.getSMProbability(x, y);

  document.getElementById('predicted-letter').innerText = probabilities
    .slice(0, 5)
    .map(v => v.letter)
    .join(' ');

  if (getLetterPs().length === 0) {
    letterPs = probabilities.slice(0, 5);
    return;
  }

  // 文字列の結合・確率を掛け合わせ
  let newLetterPs = [];
  letterPs.map(v0 => {
    let arr = probabilities.slice(0, 5).map(v1 => {
      return {
        letter: v0.letter + v1.letter,
        probability: v0.probability * v1.probability
      };
    });
    newLetterPs = newLetterPs.concat(arr);
  });
  letterPs = newLetterPs
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 1000);

  document.getElementById('predicted-word').innerText = letterPs
    .slice(0, 10)
    .map(v => v.letter)
    .join(' ');

  // 予測された文字列のfreqをLMから取得・SM*LM
  let pLM = [];
  let unknownPLM = [];
  letterPs.map(v => {
    // pLM.push({
    //   letter: v.letter,
    //   probability: v.probability * lm.getLMProbability(v.letter)
    // });
    const prob = lm.getLMProbability(v.letter);
    if (prob.isKnown) {
      pLM.push({
        letter: v.letter,
        probability: prob.value,
      })
    } else {
      unknownPLM.push({
        letter: v.letter,
        probability: prob.value,
      })
    }
  });
  pLM.sort((a, b) => b.probability - a.probability);
  unknownPLM.sort((a, b) => b.probability - a.probability);
  pLM = pLM.concat(unknownPLM);

  document.getElementById('predicted-letter').innerText = pLM
    .slice(0, 5)
    .map(v => v.letter)
    .join(' ');
}

export function drawCircle() {
  sm.drawCircle();
}
