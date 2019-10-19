import * as sm from "./SpacialModel.js";
import * as lm from "./LanguageModel.js";

let letterPs = [];
let initFlag = false;
let typedLetters = "";

export function getLetterPs() {
  return letterPs;
}

export function initProbability() {
  letterPs = [];
  document.getElementById("predicted-letter").innerText = "";
  Array.from(document.getElementsByClassName("predicted-button")).filter(v => {
    v.innerText = "";
  });
  typedLetters = "";
  initFlag = true;
}

export function nextProbability() {
  letterPs = [];
  Array.from(document.getElementsByClassName("predicted-button")).filter(v => {
    v.innerText = "";
  });
  document.getElementById("predicted-letter").innerText += " ";
  typedLetters = document.getElementById("predicted-letter").innerText;
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

export function drawCircle() {
  sm.drawCircle();
}

export function predictWord(x, y) {
  if (initFlag) {
    initFlag = false;
    return;
  }
  // タップ位置をもとにSMからキー確率取得
  let probabilities = sm.getSMProbability(x, y);

  if (getLetterPs().length === 0) {
    document.getElementById("predicted-letter").innerText =
      typedLetters + probabilities[0].letter;
    let predictedButton = document.getElementsByClassName("predicted-button");
    for (let i = 0; i < 5; i++) {
      predictedButton[i].innerText = probabilities[i].letter;
    }
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

  document.getElementById("predicted-letter").innerText =
    typedLetters + letterPs[0].letter;

  // 予測された文字列のfreqをLMから取得・SM*LM
  let pLM = [];
  let unknownPLM = [];
  letterPs.map(v => {
    const prob = lm.getLMProbability(v.letter);
    if (prob.isKnown) {
      pLM.push({
        letter: v.letter,
        probability: prob.value
      });
    } else {
      unknownPLM.push({
        letter: v.letter,
        probability: prob.value
      });
    }
  });
  pLM.sort((a, b) => b.probability - a.probability);
  unknownPLM.sort((a, b) => b.probability - a.probability);
  pLM = pLM.concat(unknownPLM);

  let predictedButton = document.getElementsByClassName("predicted-button");
  for (let i = 0; i < 5; i++) {
    predictedButton[i].innerText = pLM[i].letter;
  }
}

export function pushedPredictedButton(value) {
  document.getElementById("predicted-letter").innerText = typedLetters + value;
}
