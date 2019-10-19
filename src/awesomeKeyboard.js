import * as re from "./module/RadioEvent/RadioEvent.js";
import * as hr from "./module/MyHttpRequest/MyHttpRequest.js";
// import * as input from "./module/InputFunction/InputFunction.js";
import * as wp from "./module/WordPrediction/WordPrediction.js";
import { getRandomWords } from "./module/GetRandomWords/GetRandomWords.js";

let tapDatas = [];
let isSpace = false;

function init() {
  document.getElementById("given-text").innerText = getRandomWords().join(" ");
}

function restrictScroll() {
  $("body").oss("overflow", "hidden");
}

function addButtonEvent() {
  const buttonEvent = () => {
    const user = $("#user-name").val();
    const keyboardType = $(
      "#visual-mode input:radio[name=visual-mode]:checked"
    ).val();
    const spaceVisual =
      $("#space-visible").prop("checked") | (keyboardType === "visible")
        ? "visible"
        : "invisible";
    const tapData = tapDatas.find(
      v =>
        v.user === user &&
        v.keyboard === keyboardType &&
        v.space === spaceVisual
    );

    if (tapData) {
      wp.createSpacialModel(tapData.data);
    } else {
      if (user === "") {
        console.log("user is not defined");
        return;
      }
      hr.getTapData(user, keyboardType, spaceVisual, data => {
        wp.createSpacialModel(data);
        data = wp.removeSMOutlier(data);
        wp.createSpacialModel(data);
        tapDatas.push({
          user: user,
          keyboard: keyboardType,
          space: spaceVisual,
          data: data
        });
        document.getElementById(
          "is-ok"
        ).innerText = `ok, ${keyboardType} ${spaceVisual}`;
      });
    }
  };
  const getDataButton = document.getElementById("get-tap-data");

  getDataButton.addEventListener("touchend", ev => {
    ev.preventDefault();
    buttonEvent();
  });
  getDataButton.addEventListener("click", ev => {
    buttonEvent();
  });
}

function addPredictedButtonEvent() {
  const buttons = document.getElementsByClassName("predicted-button");
  const predictEvent = value => {
    wp.pushedPredictedButton(value);
  };

  Array.from(buttons).filter(v => {
    v.addEventListener("touchend", ev => {
      preventDefault();
      predictEvent(v.innerText);
    });
    v.addEventListener("click", ev => {
      predictEvent(v.innerText);
    });
  });
}

function addTargetTapEvent() {
  const target = document.getElementById("target");
  const targetEvent = (x, y) => {
    if (isSpace) {
      isSpace = false;
      return;
    }
    wp.predictWord(x, y);
  };

  target.addEventListener(
    "touchend",
    ev => {
      ev.preventDefault();
      targetEvent(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    },
    { passive: false }
  );

  target.addEventListener("click", ev => {
    targetEvent(ev.pageX, ev.pageY);
  });
}

function addSpaceTapEvent() {
  const space = [
    document.getElementsByClassName("right-space")[0],
    document.getElementsByClassName("left-space")[0]
  ];
  const spaceEvent = () => {
    wp.nextProbability();
    isSpace = true;
  };
  Array.from(space).filter(v => {
    v.addEventListener("touchend", ev => {
      ev.preventDefault();
      spaceEvent();
    });
  });
  Array.from(space).filter(v => {
    v.addEventListener("click", ev => {
      spaceEvent();
    });
  });
}

function addEnterTapEvent() {
  const enter = document.getElementsByClassName("enter")[0];
  const enterEvent = () => {
    wp.initProbability();
    init();
  };
  enter.addEventListener("touchend", ev => {
    ev.preventDefault();
    enterEvent();
  });
  enter.addEventListener("click", ev => {
    enterEvent();
  });
}

init();
restrictScroll();
hr.initFirebase();
re.addVisualEvent();
addButtonEvent();
addTargetTapEvent();
addPredictedButtonEvent();
addSpaceTapEvent();
addEnterTapEvent();
