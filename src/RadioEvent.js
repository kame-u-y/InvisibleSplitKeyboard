// visual-modeの設定
let leftKeyboard = $("#left-keyboard");
let rightKeyboard = $("#right-keyboard");
let keys = $(".key");

function setKeyboardBGColor(isVisible) {
    if (isVisible) {
        leftKeyboard.css("background-color", "rgb(48, 48, 48)");
        rightKeyboard.css("background-color", "rgb(48, 48, 48)");
    } else {
        leftKeyboard.css("background-color", "rgba(48, 48, 48, 0)");
        rightKeyboard.css("background-color", "rgba(48, 48, 48, 0)");
    }
}

function setKeyboardOpacity(isVisible) {
    if (isVisible) {
        leftKeyboard.css("opacity", "1");
        rightKeyboard.css("opacity", "1");
    } else {
        leftKeyboard.css("opacity", "0");
        rightKeyboard.css("opacity", "0");
    }
}

function setKeyOpacity(isVisible) {
    if (isVisible) {
        keys.css("opacity", "1");
    } else {
        keys.css("opacity", "0");
    }
}

export function addRadioEvent() {
    $("#visual-mode input:radio[name=visual-mode]").on('change', (ev, a) => {
        let keys = $(".key");

        switch(ev.target.value) {
            case "visible":
                setKeyboardBGColor(true);
                setKeyboardOpacity(true);
                setKeyOpacity(true);
                break;
            case "key-invisible":
                setKeyboardBGColor(true);
                setKeyboardOpacity(true);
                setKeyOpacity(false);
                break;
            case "frame-only":
                setKeyboardBGColor(false);
                setKeyboardOpacity(true);
                setKeyOpacity(false);
                break;
            case "invisible":
                setKeyboardBGColor(false);
                setKeyboardOpacity(false);
                setKeyOpacity(false);
                break;
        }
    })
}