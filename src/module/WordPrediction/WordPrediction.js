import * as sm from './SpacialModel.js';
import * as lm from './LanguageModel.js';

/*
構造
inputData = [
  {
    position: {
      x: number,
      y: number,
    },
    timestamp: timestamp,
    initialId: number,
  }
]
*/

let inputData = [];
let initialId = 0;

let letterPs = [];
let initFlag = false;
let typedLetters = '';

// function getLetterPs() {
//   return letterPs;
// }

export function initProbability() {
  letterPs = [];
  document.getElementById('predicted-letter').innerText = '';
  Array.from(document.getElementsByClassName('predicted-button')).filter(v => {
    v.innerText = '';
  });
  typedLetters = '';
  initFlag = true;

  // initする前にタップ列が保存される？
  inputData = [];
  initialId = 0;
}

export function nextProbability() {
  letterPs = [];
  Array.from(document.getElementsByClassName('predicted-button')).filter(v => {
    v.innerText = '';
  });
  document.getElementById('predicted-letter').innerText += ' ';
  typedLetters = document.getElementById('predicted-letter').innerText;

  initialId = inputData.length;
}

export function createSpacialModel(loadedData) {
  sm.createSpacialModel(loadedData);
}

export function removeSMOutlier(loadedData) {
  Object.keys(loadedData).filter(letter => {
    loadedData[letter] = loadedData[letter].filter(v => {
      return !sm.isOutlier(letter, v.position.x, v.position.y);
    });
  });
  return loadedData;
}

export function drawCircle() {
  sm.drawCircle();
}

function smProbability(x, y) {
  // タップ位置をもとにSMからキー確率取得
  let probabilities = sm.getSMProbability(x, y);

  if (letterPs.length === 0) {
    document.getElementById('predicted-letter').innerText =
      typedLetters + probabilities[0].letter;
    let predictedButton = document.getElementsByClassName('predicted-button');
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

  document.getElementById('predicted-letter').innerText =
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

  let predictedButton = document.getElementsByClassName('predicted-button');
  for (let i = 0; i < 5; i++) {
    predictedButton[i].innerText = pLM[i].letter;
  }
  console.log(true);
}

function bsFirstLetter() {
  // "h" > "": pop typedLetters
  console.log(-1);
  inputData.pop();
  Array.from(document.getElementsByClassName('predicted-button')).filter(v => {
    v.innerText = '';
  });
  console.log(inputData);
}

function bsSpaceSpace() {
  // "hoge  " > "hoge ": pop typedLetters
  console.log('space space');
  typedLetters = typedLetters.slice(0, -1);
  typedLetters = typedLetters.substring(0, typedLetters.lastIndexOf(' ') + 1);
  initialId = inputData[inputData.length - 1].initialId;
  Array.from(document.getElementsByClassName('predicted-button')).filter(v => {
    v.innerText = '';
  });
  console.log(inputData);
}

function bsSpace() {
  // "hoge " > "hoge": pop typedLetters
  typedLetters = typedLetters.slice(0, -1);
  typedLetters = typedLetters.substring(0, typedLetters.lastIndexOf(' ') + 1);

  initialId = inputData[inputData.length - 1].initialId;
  inputData
    .filter(v => v.initialId === initialId)
    .filter(v => {
      smProbability(v.position.x, v.position.y);
    });
  console.log(inputData);
  getLMProbability();
}

function bsInitialLetter() {
  // "hoge h" > "hoge ": don't pop typedLetters
  console.log(1);
  inputData.pop();
  Array.from(document.getElementsByClassName('predicted-button')).filter(v => {
    v.innerText = '';
  });
  console.log(inputData);
}

function bsLetter() {
  // "hoge ho" > "hoge h":
  console.log(2);
  inputData.pop();
  inputData
    .filter(v => v.initialId === initialId)
    .filter(v => {
      smProbability(v.position.x, v.position.y);
    });
  console.log(inputData);
  getLMProbability();
}

export function predictWordBS() {
  let inputLetter = document.getElementById('predicted-letter');
  if (inputLetter.innerText === '') return;
  inputLetter.innerText = inputLetter.innerText.slice(0, -1);
  console.log(
    `typedLetters=${typedLetters},inputLetters=${inputLetter.innerText};`
  );
  letterPs = [];
  if (typedLetters === '' && inputLetter.innerText === '') {
    bsFirstLetter();
    return;
  } else if (typedLetters.slice(0, -1) === inputLetter.innerText) {
    console.log(0);
    const lastLetter = inputLetter.innerText.charAt(
      inputLetter.innerText.length - 1
    );
    if (lastLetter === ' ') {
      bsSpaceSpace();
      return;
    } else {
      bsSpace();
      return;
    }
  } else if (typedLetters === inputLetter.innerText) {
    bsInitialLetter();
    return;
  } else {
    bsLetter();
    return;
  }
}

export function predictWord(x, y) {
  if (initFlag) {
    initFlag = false;
    return;
  }
  let isFirstLetter = smProbability(x, y);
  inputData.push({
    position: {
      x: x,
      y: y
    },
    initialId: initialId,
    timestamp: Date.now()
  });
  console.log(inputData);
  if (isFirstLetter) return;
  getLMProbability();
}

export function pushedPredictedButton(value) {
  document.getElementById('predicted-letter').innerText = typedLetters + value;
}
