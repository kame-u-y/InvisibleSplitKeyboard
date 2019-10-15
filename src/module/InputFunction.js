export function inputLetter(letter) {
    if (letter==="BS") {
        const t = document.getElementById("input-text");
        t.innerText = t.innerText.slice(0, -1);
    } else {
        document.getElementById("input-text").innerText += letter;
    }
}

export function inputPosition(x, y) {
    console.log(`x:${x}, y:${y}`);
    document.getElementById("x").innerHTML = x; 
    document.getElementById("y").innerHTML = y;
}

function addDot(letter, x, y) {
    const initial = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let dotContainer = document.getElementById("dot-container");
    let dot = document.createElement("p")
    dot.setAttribute("class", "dot");
    dot.style.cssText = `background-color: hsl(${initial.indexOf(letter)*20}, 50%, 50%); left: ${x}px; top: ${y}px`;
    dotContainer.appendChild(dot);
}

export function displayTapInfo(tapInfoArray) {
    tapInfoArray.filter((info) => addDot(info.letter, info.x, info.y))
    console.log(tapInfoArray);
}