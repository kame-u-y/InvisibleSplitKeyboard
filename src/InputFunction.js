export function inputLetter(letter) {
    if (letter==="BS") {
        const t = document.getElementById("input_text");
        t.innerText = t.innerText.slice(0, -1);
    } else {
        document.getElementById("input_text").innerText += letter;
    }
}

export function inputPosition(x, y) {
    console.log(`x:${x}, y:${y}`);
    document.getElementById("x").innerHTML = x; 
    document.getElementById("y").innerHTML = y;
}

function addDot(num, x, y) {
    let dotContainer = document.getElementById("dot-container");
    let dot = document.createElement("p")
    dot.setAttribute("class", "dot");
    dot.style.cssText = `background-color: hsl(${num*20}, 50%, 50%); left: ${x}px; top: ${y}px`;
    dotContainer.appendChild(dot);
}

export function displayTapInfo(tapInfoArray) {
    tapInfoArray.filter((info) => addDot(info.num, info.x, info.y))
    console.log(tapInfoArray);
}