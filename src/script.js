let preparedText = "give when open without quickly long most car would away mean need mile few saw until say picture soon once because";

let target = document.getElementById("target")
target.addEventListener("click", (event) => {
    console.log(true);
    let [x, y] = [event.pageX, event.pageY]
    console.log(`x:${x}, y:${y}`)
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
    document.getElementById("input_text").innerHTML += preparedText[0]===" " ? "&nbsp;" : preparedText[0];
    preparedText = preparedText.slice(1);
})