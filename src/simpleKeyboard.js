// {letter, x, y}
let tapInfoArray = []

function inputLetter(letter) {
    if (letter==="BS") {
        const t = document.getElementById("input_text");
        t.innerText = t.innerText.slice(0, -1);
    } else if (letter===" ") {
        document.getElementById("input_text").innerText += " ";
    } else {
        document.getElementById("input_text").innerText += letter;
    }
}

function inputPosition(x, y) {
    console.log(`x:${x}, y:${y}`);
    document.getElementById("x").innerHTML = x; 
    document.getElementById("y").innerHTML = y;
}

function addTapInfo(letter, x, y) {
    tapInfoArray.push({letter: letter, x: x, y: y})
}

function addDot(x, y) {
    let dotContainer = document.getElementById("dot-container");
    let dot = document.createElement("p")
    dot.setAttribute("class", "dot");
    dot.style.cssText = `left: ${x}px; top: ${y}px`;
    dotContainer.appendChild(dot);
}

function displayTapInfo() {
    tapInfoArray.filter((info) => addDot(info.x, info.y))
}

// target
// inputPositionを実行
function addBodyTapEvent() {
    let body = document.getElementById("target")

    body.addEventListener("touchend", (ev) => {
        let [x, y] = [ev.changedTouches[0].pageX, ev.changedTouches[0].pageY]
        inputPosition(x, y);
        // addDot(x, y);
    }, {passive: false})

    body.addEventListener("click", (ev) => {
        let [x, y] = [ev.pageX, ev.pageY]
        inputPosition(x, y)
        // addDot(x, y);
    })
}

// keys
// inputLetter, inputPositionを実行
function addKeyTapEvent() {
    const keys = document.getElementsByClassName("key");
    const eventFunction = (elem, x, y) => {
        inputLetter(elem.dataset.letter);
        addTapInfo(elem.letter, x, y);
        const given = document.getElementById("given_text");
        const input = document.getElementById("input_text");
        console.log(typeof given.innerText);
        console.log(typeof input.innerText);
        if (given.innerText === input.innerText) {
            console.log(true)
            displayTapInfo();
        }
    }

    Array.from(keys).forEach(elem => {
        elem.addEventListener("touchend", (ev) => {
            ev.preventDefault();
            eventFunction(elem, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
        });
        elem.addEventListener("click", (ev) => {
            eventFunction(elem, ev.pageX, ev.pageY);
        });
    })
}

addBodyTapEvent();
addKeyTapEvent();
