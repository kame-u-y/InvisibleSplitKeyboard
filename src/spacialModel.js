import {addVisualEvent} from "./module/RadioEvent.js";
import {initFirebase, getTapData} from "./module/MyHttpRequest.js";
let tapDatas = [];

function init() {
    document.getElementById("dot-container").innerHTML = '';
}

function addDot(letter, x, y) {
    const initial = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let dotContainer = document.getElementById("dot-container");
    let dot = document.createElement("p")
    dot.setAttribute("class", "dot");
    dot.style.cssText = `background-color: hsl(${initial.indexOf(letter)*20}, 50%, 50%); left: ${x}px; top: ${y}px`;
    dotContainer.appendChild(dot);
}

function displayTapData(tapData) {
    if (!tapData) return;
    Object.keys(tapData).filter(v => {
        tapData[v].filter(data => {
            addDot(v, data.position.x, data.position.y);
        })
    })
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