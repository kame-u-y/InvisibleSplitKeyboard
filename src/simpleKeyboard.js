// {letter, x, y}
let tapInfoArray = []

function inputLetter(letter) {
    document.getElementById("input_text").innerHTML += letter;
}

function inputPosition(x, y) {
    console.log(`x:${x}, y:${y}`);
    document.getElementById("x").innerHTML = x; 
    document.getElementById("y").innerHTML = y;
}

function addTapInfo(letter, x, y) {
    tapInfoArray.push({letter: letter, x: x, y: y})
}

function displayTapInfo() {
    tapInfoArray.filter((info) => addDot(info.x, info.y))
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
    let keys = document.getElementsByClassName("key")

    Array.from(keys).forEach(elem => {
        elem.addEventListener("touchend", (ev) => {
            ev.preventDefault();
            let [x, y] = [ev.changedTouches[0].pageX, ev.changedTouches[0].pageY];
            inputLetter(elem.innerText);
            addTapInfo(elem.innerText, x, y);
            
            let given = document.getElementById("given_text");
            let input = document.getElementById("input_text");
            if (given.innerText === input.innerText) {
                console.log(true);
                displayTapInfo();
            }
        });
        elem.addEventListener("click", (ev) => {
            let [x, y] = [ev.pageX, ev.pageY];
            inputLetter(elem.innerText);
            addTapInfo(elem.innerText, x, y);
            
            let given = document.getElementById("given_text");
            let input = document.getElementById("input_text");
            if (given.innerText === input.innerText) {
                console.log(true);
                displayTapInfo();
            }
        });
    })
}

addBodyTapEvent();
addKeyTapEvent();
