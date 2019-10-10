function inputKey(k) {
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

target.addEventListener("touchend", (ev) => {
    let [x, y] = [ev.changedTouches[0].pageX, ev.changedTouches[0].pageY]
    inputPosition(x, y);
    addDot(x, y);
}, {passive: false})

target.addEventListener("click", (ev) => {
    let [x, y] = [ev.pageX, ev.pageY]
    inputPosition(x, y)
    addDot(x, y);
})

// keys
// inputKey, inputPositionを実行
let keys = document.getElementsByClassName("key")

Array.from(keys).forEach(elem => {
    elem.addEventListener("touchend", (ev) => {
        ev.preventDefault();
        let [x, y] = [ev.changedTouches[0].pageX, ev.changedTouches[0].pageY];
        inputKey(elem.innerText);
    });
    elem.addEventListener("click", (ev) => {
        let [x, y] = [ev.pageX, ev.pageY];
        inputKey(elem.innerText);
    });
})

