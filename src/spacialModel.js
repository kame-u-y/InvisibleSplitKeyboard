import {addVisualEvent} from "./module/RadioEvent.js";
import {initFirebase, getTapData} from "./module/MyHttpRequest.js";
import {displayTapData} from "./module/InputFunction.js";
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
        } else {
            if (user==="") {
                console.log("user is not defined");
                return;
            }
            getTapData(user, keyboardType, spaceVisual, (data) => {
                displayTapData(data);
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

init();
initFirebase();
addVisualEvent();
addButtonEvent();