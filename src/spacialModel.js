import {addVisualEvent} from "./module/RadioEvent.js";
import {initFirebase, getTapData} from "./module/MyHttpRequest.js";

function init() {
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
    const getDataButton = document.getElementById("get-tap-data");
    
    getDataButton.addEventListener("touchend", (ev) => {
        getTapData(data => displayTapData(data));
    })
    getDataButton.addEventListener("click", (ev) => {
        getTapData(data => displayTapData(data));
    })
}

init();
initFirebase();
addVisualEvent();
addButtonEvent();