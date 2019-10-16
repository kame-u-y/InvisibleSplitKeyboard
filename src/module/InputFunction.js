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
    const initial = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
    let dotContainer = document.getElementById("dot-container");
    let dot = document.createElement("p")
    dot.setAttribute("class", "dot");
    dot.style.cssText = `background-color: hsl(${initial.indexOf(letter)*15}, 50%, 50%); left: ${x}px; top: ${y}px`;
    dotContainer.appendChild(dot);
}

export function displayTapData(tapData) {
    if (!tapData) return;
    Object.keys(tapData).filter(v => {
        tapData[v].filter(data => {
            addDot(v, data.position.x, data.position.y);
        })
    })
}
