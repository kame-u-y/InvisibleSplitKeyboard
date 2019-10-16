import {addVisualEvent} from "./module/RadioEvent.js";
import {initFirebase, getTapData} from "./module/MyHttpRequest.js";
import {displayTapData} from "./module/InputFunction.js";
import {displaySpacialModel, getSMProbability} from "./module/SpacialModel.js";
import {getLMProbability} from "./module/LanguageModel.js";

let tapDatas = [];
let letterPs = [];
let initFlag = false;

function init() {
    document.getElementById("dot-container").innerHTML = '';
}

function addButtonEvent() {
    const buttonEvent = () => {
        init();
        const user = $("#user-name").val();
        const keyboardType = $("#visual-mode input:radio[name=visual-mode]:checked").val();
        const spaceVisual = $("#space-visible").prop('checked') | keyboardType==="visible" 
            ? "visible" 
            : "invisible";
        const tapData = tapDatas.find((v) => {
            return v.user===user && v.keyboard===keyboardType && v.space===spaceVisual;
        });

        if (tapData) {
            displayTapData(tapData.data);
            displaySpacialModel(tapData.data)
        } else {
            if (user==="") {
                console.log("user is not defined");
                return;
            }
            getTapData(user, keyboardType, spaceVisual, (data) => {
                displayTapData(data);
                displaySpacialModel(data)
                tapDatas.push({
                    user: user,
                    keyboard: keyboardType,
                    space: spaceVisual,
                    data: data,
                });
            });
        }
    }
    const getDataButton = document.getElementById("get-tap-data");
    
    getDataButton.addEventListener("touchend", (ev) => {
        ev.preventDefault();
        buttonEvent();
    })
    getDataButton.addEventListener("click", (ev) => {
        buttonEvent();
    })
}


function addTargetTapEvent() {
    const target = document.getElementById("target")
    const targetEvent = (x, y) => {
        if (initFlag) {
            initFlag = false;
            return;
        }
        // タップ位置をもとにSMからキー確率取得
        let probabilities = getSMProbability(x, y);

        if (letterPs.length===0) {
            letterPs = probabilities;
            document.getElementById("predicted-letter").innerText = probabilities.slice(0, 5).map(v=>v.letter).join(" ");
            return;
        }

        // 文字列の結合・確率を組み合わせで掛け合わせ
        let newLetterPs = [];
        letterPs.map((v0) => {
            if (v0.letter===" ") return;
            let arr = probabilities.map((v1) => {
                return {
                    letter: v0.letter + v1.letter,
                    probability: v0.probability * v1.probability,
                }
            })
            newLetterPs = newLetterPs.concat(arr);
        })
        letterPs = newLetterPs
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 1000);
        
        // 予測された文字列のfreqをLMから取得・SM*LM
        let pLM = [];
        letterPs.map((v) => {
            getLMProbability(v.letter).map((w) => {
                pLM.push({
                    letter: w.word,
                    probability: v.probability * Number(w.ratio),
                });
            })
        })
        pLM.sort((a, b) => b.probability - a.probability);
        
        document.getElementById("predicted-letter").innerText = pLM.slice(0, 5).map(v=>v.letter).join(" ");
    }

    target.addEventListener("touchend", (ev) => {
        ev.preventDefault();
        targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    target.addEventListener("click", (ev) => {
        targetEvent(ev.pageX, ev.pageY);
    })
}

function addEnterTapEvent() {
    const enter = document.getElementsByClassName("enter")[0];
    const enterEvent = () => {
        letterPs = [];
        document.getElementById("predicted-letter").innerText = "";
        initFlag = true;
    }
    enter.addEventListener("touchend", (ev) => {
        ev.preventDefault();
        enterEvent();
    });
    enter.addEventListener("click", (ev) => {
        enterEvent();
    })
}

init();
initFirebase();
addVisualEvent();
addButtonEvent();
addTargetTapEvent();
addEnterTapEvent();