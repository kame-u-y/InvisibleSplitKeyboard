import {addVisualEvent} from "./module/RadioEvent.js";
import {initFirebase, getTapData} from "./module/MyHttpRequest.js";
import {displayTapData} from "./module/InputFunction.js";
import { displaySpacialModel, getSMProbability } from "./module/SpacialModel.js";
let tapDatas = [];

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
        getSMProbability(x, y);
    }

    target.addEventListener("touchend", (ev) => {
        targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    }, {passive: false})

    target.addEventListener("click", (ev) => {
        targetEvent(ev.pageX, ev.pageY);
    })
}


init();
initFirebase();
addVisualEvent();
addButtonEvent();
addTargetTapEvent();