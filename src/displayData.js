import * as re from "./module/RadioEvent/RadioEvent.js";
import * as hr from "./module/MyHttpRequest/MyHttpRequest.js";
import * as input from "./module/InputFunction/InputFunction.js";
import * as wp from "./module/WordPrediction/WordPrediction.js";

let tapDatas = [];

function init() {
  document.getElementById("dot-container").innerHTML = "";
  document.getElementById("circle-container").innerHTML = "";
}

function addButtonEvent() {
  const buttonEvent = () => {
    init();
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
      input.displayTapData(tapData.data);
      wp.drawCircle();
    } else {
      if (user === "") {
        console.log("user is not defined");
        return;
      }
      hr.getTapData(user, keyboardType, spaceVisual, data => {
        // input.displayTapData(data);
        wp.createSpacialModel(data);
        console.log(data);
        data = wp.removeSMOutlier(data);
        wp.createSpacialModel(data);
        input.displayTapData(data);
        wp.drawCircle();
        tapDatas.push({
          user: user,
          keyboard: keyboardType,
          space: spaceVisual,
          data: data
        });
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

function addTargetTapEvent() {
  const target = document.getElementById("target");
  const targetEvent = (x, y) => {
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

function addEnterTapEvent() {
  const enter = document.getElementsByClassName("enter")[0];
  const enterEvent = () => {
    wp.initProbability();
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
hr.initFirebase();
re.addVisualEvent();
addButtonEvent();
addTargetTapEvent();
addEnterTapEvent();
