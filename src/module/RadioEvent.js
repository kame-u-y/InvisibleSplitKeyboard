// visual-modeの設定
let leftKeyboard = $("#left-keyboard");
let rightKeyboard = $("#right-keyboard");
let keys = $(".key");
let leftSpace = $(".left-space");
let rightSpace = $(".right-space");
let spaceVisible = $("#spaceVisible");

function setKeyboardBGColor(isVisible) {
    if (isVisible) {
        leftKeyboard.css("background-color", "rgb(48, 48, 48)");
        rightKeyboard.css("background-color", "rgb(48, 48, 48)");
    } else {
        leftKeyboard.css("background-color", "rgba(48, 48, 48, 0)");
        rightKeyboard.css("background-color", "rgba(48, 48, 48, 0)");
    }
}

function setKeyboardBorderColor(isVisible) {
    if (isVisible) {
        leftKeyboard.css("border-color", "rgb(48, 48, 48)");
        rightKeyboard.css("border-color", "rgb(48, 48, 48)");
    } else {
        leftKeyboard.css("border-color", "rgba(48, 48, 48, 0)");
        rightKeyboard.css("border-color", "rgba(48, 48, 48, 0)");
    }
}

function setSpaceOpacity(isVisible) {
    if (isVisible) {
        leftSpace.css("opacity", "1");
        rightSpace.css("opacity", "1");
    } else {
        leftSpace.css("opacity", "0");
        rightSpace.css("opacity", "0");
    }
}

function setKeyOpacity(isVisible) {
    if (isVisible) {
        keys.css("opacity", "1");
        setSpaceOpacity(true);
    } else {
        keys.css("opacity", "0");
        if (spaceVisible.prop('checked')) {
            setSpaceOpacity(true);
        } else {
            setSpaceOpacity(false);
        }
    }
}

function addRadioEvent() {
    $("#visual-mode input:radio[name=visual-mode]").on('change', (ev) => {
        let keys = $(".key");

        switch(ev.target.value) {
            case "visible":
                setKeyboardBGColor(true);
                setKeyboardBorderColor(true);
                setKeyOpacity(true);
                break;
            case "key-invisible":
                setKeyboardBGColor(true);
                setKeyboardBorderColor(true);
                setKeyOpacity(false);
                break;
            case "frame-only":
                setKeyboardBGColor(false);
                setKeyboardBorderColor(true);
                setKeyOpacity(false);
                break;
            case "invisible":
                setKeyboardBGColor(false);
                setKeyboardBorderColor(false);
                setKeyOpacity(false);
                break;
        }
    })
}

function addSpaceCheckEvent() {
    $("#spaceVisible").on('change', (ev) => {
        if ($("#visual-mode input:radio[name=visual-mode]:checked").val()==="visible") return;
        if (ev.target.checked) {
            setSpaceOpacity(true);
        } else {
            setSpaceOpacity(false);
        }
    })
}

export function addVisualEvent() {
    addRadioEvent();
    addSpaceCheckEvent();
}