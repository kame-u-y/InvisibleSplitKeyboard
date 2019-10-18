import * as sm from "./SpacialModel.js"; 
import * as lm from "./LanguageModel.js"; 

let letterPs = [];
let initFlag = false;

export function getLetterPs() {
    return letterPs;
}

export function initProbability() {
    letterPs = [];
    document.getElementById("predicted-letter").innerText = "";
    document.getElementById("predicted-word").innerText = "";
    initFlag = true;
}

export function createSpacialModel(tapData) {
    sm.createSpacialModel(tapData);
}

export function removeSMOutlier(tapData) {
    Object.keys(tapData).filter((letter) => {
        tapData[letter] = tapData[letter].filter((v) => {
            return !sm.isOutlier(letter, v.position.x, v.position.y);
        })
    })
    return tapData;
}

export function predictWord(x, y) {
    if (initFlag) {
        initFlag = false;
        return;
    }
    // タップ位置をもとにSMからキー確率取得
    let probabilities = sm.getSMProbability(x, y);
    console.log(probabilities);

    if (getLetterPs().length===0) {
        document.getElementById("predicted-letter").innerText
            = probabilities.slice(0, 5).map(v=>v.letter).join(" ");
        letterPs = probabilities.slice(0, 5);
        return;
    }
    
    document.getElementById("predicted-letter").innerText
        = probabilities.slice(0, 5).map(v=>v.letter).join(" ");

    // 文字列の結合・確率を掛け合わせ
    let newLetterPs = [];
    letterPs.map((v0) => {
        // if (v0.letter===" ") return;
        let arr = probabilities.slice(0, 5).map((v1) => {
            return {
                letter: v0.letter + v1.letter,
                probability: v0.probability * v1.probability,
            }
        })
        newLetterPs = newLetterPs.concat(arr);
    })
    letterPs = newLetterPs
        .sort((a, b) => b.probability - a.probability)
        // .slice(0, 1000);
    console.log(letterPs);

    
    document.getElementById("predicted-word").innerText
        = letterPs.slice(0, 10).map(v=>v.letter).join(" ");
    return;

    // 予測された文字列のfreqをLMから取得・SM*LM
    let pLM = [];
    letterPs.map((v) => {
        lm.getLMProbability(v.letter).map((w) => {
            pLM.push({
                letter: w.word,
                probability: v.probability * Number(w.ratio),
            });
        })
    })
    pLM.sort((a, b) => b.probability - a.probability);

    document.getElementById("predicted-letter").innerText = pLM.slice(0, 5).map(v=>v.letter).join(" ");
}

export function drawCircle() {
    sm.drawCircle();
}