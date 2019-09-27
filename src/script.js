let preparedText = "give when open without quickly long most car would away mean need mile few saw until say picture soon once because";

function inputKey(k) {
    // document.getElementById("input_text").innerHTML += preparedText[0]===" " ? "&nbsp;" : preparedText[0];
    // preparedText = preparedText.slice(1);
    document.getElementById("input_text").innerHTML += k;
}

function inputPosition(x, y) {
    console.log(`x:${x}, y:${y}`);
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
}

function addDot(x, y) {
    let dotContainer = document.getElementById("dot-container");
    let dot = document.createElement("p")
    dot.setAttribute("class", "dot");
    dot.style.cssText = `left: ${x}px; top: ${y}px`;
    dotContainer.appendChild(dot);
}

// target
// inputPositionを実行
let target = document.getElementById("target")

target.addEventListener("touchstart", (ev) => {
    inputPosition(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    addDot(x, y);
}, {passive: false})

target.addEventListener("click", (ev) => {
    inputPosition(ev.pageX, ev.pageY)
    addDot(ev.pageX, ev.pageY);
})

// keys
// inputKey, inputPositionを実行
let keys = document.getElementsByClassName("key")

Array.from(keys).forEach(elem => {
    elem.addEventListener("touchstart", (ev) => {
        let [x, y] = [ev.changedTouches[0].pageX, ev.changedTouches[0].pageY];
        inputKey(elem.innerText);
        // inputPosition(x, y);
    });
    elem.addEventListener("click", (ev) => {
        let [x, y] = [ev.pageX, ev.pageY];
        inputKey(elem.innerText);
        // inputPosition(x, y);
    });
})
