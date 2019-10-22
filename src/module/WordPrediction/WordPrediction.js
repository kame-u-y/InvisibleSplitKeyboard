import * as sm from "./SpacialModel.js";
import * as lm from "./LanguageModel.js";

let letterPs = [];
let initFlag = false;
let typedLetters = "";

// function getLetterPs() {
//   return letterPs;
// }

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

function smProbability(x, y) {
  // タップ位置をもとにSMからキー確率取得
  let probabilities = sm.getSMProbability(x, y);

  if (letterPs.length === 0) {
    document.getElementById("predicted-letter").innerText =
      typedLetters + probabilities[0].letter;
    let predictedButton = document.getElementsByClassName("predicted-button");
    for (let i = 0; i < 5; i++) {
      predictedButton[i].innerText = probabilities[i].letter;
    }
    letterPs = probabilities.slice(0, 5);
    return true;
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
  return false;
}

function getLMProbability() {
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
  console.log(true);
}

export function predictWordBS() {
  let inputLetter = document.getElementById("predicted-letter");
  if (inputLetter.innerText === "") return;
  console.log(inputLetter.innerText.substring(typedLetters));

  inputLetter.innerText = inputLetter.innerText.slice(0, -1);

  if (typedLetters.slice(0, -1) === inputLetter.innerText) {
    // "hoge " > "hoge": pop typedLetters
    console.log(0);
    typedLetters = typedLetters.slice(0, -1);
    return;
  } else if (typedLetters === inputLetter.innerText) {
    // "hoge h" > "hoge ": don't pop typedLetters
    console.log(1);
    return;
  } else {
    // "hoge ho" > "hoge h":
    console.log(2);
    console.log(letterPs);
    letterPs.pop();
    getLMProbability();
    return;
  }
}

export function predictWord(x, y) {
  if (initFlag) {
    initFlag = false;
    return;
  }
  let isFirstLetter = smProbability(x, y);
  if (isFirstLetter) return;
  getLMProbability();
}

export function pushedPredictedButton(value) {
  document.getElementById("predicted-letter").innerText = typedLetters + value;
}
