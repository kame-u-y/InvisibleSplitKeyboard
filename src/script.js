let preparedText = "give when open without quickly long most car would away mean need mile few saw until say picture soon once because";

function inputKey(ev, x, y) {
    console.log(`x:${x}, y:${y}`)
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
    document.getElementById("input_text").innerHTML += preparedText[0]===" " ? "&nbsp;" : preparedText[0];
    preparedText = preparedText.slice(1);
}

let target = document.getElementById("target")
target.addEventListener("touchstart", (ev) => {
    // ev.preventDefault();
    console.log(true);
    let [x, y] = [ev.changedTouches[0].pageX, ev.changedTouches[0].pageY]
    inputKey(ev, x, y);
}, {passive: false})

target.addEventListener("click", (ev) => {
    console.log(true);
    let [x, y] = [ev.pageX, ev.pageY]
    inputKey(ev, x, y);
})