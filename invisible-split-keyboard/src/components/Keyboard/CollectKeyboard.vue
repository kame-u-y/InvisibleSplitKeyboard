<template>
  <div id="target">
    <div
      v-for="(rowList, side) in keyLayouts"
      :id="side + '-keyboard'"
      :key="side"
      :class="getKeyboardClass()"
    >
      <ul
        v-for="(keyList, rowName) in rowList"
        :id="rowName"
        :key="rowName"
        :class="side + '-row'"
      >
        <li
          v-for="key in keyList"
          :key="key"
          :class="getKeyClass(side, key)"
          :data-letter="getKeyValue(key)"
        >
          {{ getKeyValue(key) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { letterList } from '../../modules/KeyList/KeyList';
import collectTypingStore from '../../stores/collectTypingStore';

export default {
  name: 'CollectKeyboard',
  setup() {
    const keyLayouts = {
      left: {
        'left-top': ['q', 'w', 'e', 'r', 't'],
        'left-middle': ['a', 's', 'd', 'f', 'g'],
        'left-bottom': ['shift', 'z', 'x', 'c', 'v'],
        'left-special': ['left-symbol', 'language', 'mic', 'left-space'],
      },
      right: {
        'right-top': ['back', 'p', 'o', 'i', 'u', 'y'],
        'right-middle': ['enter', 'l', 'k', 'j', 'h'],
        'right-bottom': ['shift', 'period', 'comma', 'm', 'n', 'b'],
        'right-special': ['move-keyboard', 'right-symbol', 'right-space'],
      },
    };
    const collectStore = collectTypingStore();
    const keyboardMode = computed(() => collectStore.keyboardMode);

    const getKeyboardClass = () => {
      return `kbd-${keyboardMode.value}`;
    };
    const getKeyClass = (side, key) => {
      const sideClass = `${side}-key`;
      const valueClass = letterList.includes(key) ? 'letter' : key;
      const modeClass = letterList.includes(key)
        ? `key-${keyboardMode.value}`
        : '';
      return `${sideClass} ${valueClass} ${modeClass}`;
    };
    const getKeyValue = (key) => {
      return letterList.includes(key) ? key : '';
    };

    return {
      keyLayouts,
      keyboardMode,
      letterList,
      getKeyboardClass,
      getKeyClass,
      getKeyValue,
    };
  },
};
</script>

<style>
html {
  height: 100vh;
}

body {
  height: 100vh;
  background-color: white;
  margin: 0;
}

#target {
  --lt-padding-left: 2.5mm;
  --lm-padding-left: 9mm;
  --lb-padding-left: 2.5mm;
  --ls-padding-left: 2.5mm;
  --r-padding-right: 2.5mm;

  /* for ipad */
  /* --letter-width: 48.265px;
  --letter-height: 59.98px; */

  /* for alienware */
  --letter-width: 51.55px;
  --letter-height: 63px;

  --letter-font-size: 27px;
  --letter-padding: 5px 4px;

  --shift-width: 41.743px; /* */

  --l-symbol-width: 62.614px;
  --language-width: 34px;
  --mic-width: 34px;
  --l-space-width: 73px;

  --back-width: 41.743px; /* */
  --enter-width: 62.614px; /* */
  --move-keyboard-width: 41.743px; /* */
  --r-symbol-width: 98.6965px;
  --r-space-width: 98.6965px;
}

/********* keyboard outline *********/
#left-keyboard {
  float: left;
  background-color: rgb(0, 0, 0);
  padding: 4px;
  border-radius: 4px;
  border: solid 3px rgba(0, 0, 0, 0);
}

#right-keyboard {
  float: right;
  background-color: rgb(0, 0, 0);
  padding: 4px;
  border-radius: 4px;
  border: solid 3px rgba(0, 0, 0, 0);
}

/******* mode keyboard style ***********/
.kbd-eyes-on,
.kbd-peripheral {
  background-color: rgba(0, 0, 0, 1);
  opacity: 1;
  border-color: rgba(64, 64, 64, 0);
}

.kbd-stk-peripheral {
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 0);
}

.kbd-borderless {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-color: rgba(64, 64, 64, 0);
}

.kbd-stk-borderless {
  background-color: rgba(64, 64, 64, 1);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 0);
}

.kbd-key-wired {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  border-color: rgba(64, 64, 64, 1);
}

.kbd-stk-key-wired {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 1);
}

.kbd-key-invisible {
  background-color: rgba(0, 0, 0, 1);
  opacity: 1;
  border-color: rgba(64, 64, 64, 0);
}

.kbd-stk-key-invisible {
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 0);
}

.kbd-frame-only {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  border-color: rgba(64, 64, 64, 1);
}

.kbd-stk-frame-only {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 1);
}

.kbd-invisible {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  border-color: rgba(64, 64, 64, 0);
}

/******* keyboard row  ***********/
.left-row {
  list-style-type: none;
  height: var(--letter-height);
  margin: 0;
}

.right-row {
  list-style-type: none;
  height: var(--letter-height);
  margin: 0;
  padding-left: 0;
  padding-right: var(--r-padding-right);
}

#left-top {
  padding-left: var(--lt-padding-left);
}

#left-middle {
  padding-left: var(--lm-padding-left);
}

#left-bottom {
  padding-left: var(--lb-padding-left);
}

#left-special {
  padding-left: var(--ls-padding-left);
}

#right-special {
  padding-right: var(--rs-padding-right);
}

/******* key style  ***********/
.left-key,
.right-key {
  background-clip: content-box;
  background-color: rgb(64, 64, 64);
  color: white;
  font-family: Segoe UI, SegoeUI, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: var(--letter-font-size);
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--letter-height) - 10px);
  border-radius: 7px;
  box-sizing: border-box;
  border: solid 0px;
  margin: var(--letter-padding);
}

.left-key {
  float: left;
}

.right-key {
  float: right;
}

/******* key letter style  ***********/
.left-key.letter {
  width: calc(var(--letter-width) - 8px);
  border-collapse: collapse;
}

.right-key.letter,
.period,
.comma {
  width: calc(var(--letter-width) - 8px);
}

/******* mode letter style ***********/
.key-eyes-on,
.key-peripheral {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

.key-stk-peripheral {
  background-color: rgba(64, 64, 64, 1);
  opacity: 0.5;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

.key-borderless {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

.key-stk-borderless {
  background-color: rgba(64, 64, 64, 1);
  opacity: 0.5;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

.key-key-wired {
  background-color: rgba(64, 64, 64, 0);
  opacity: 1;
  border-width: 3px;
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
}

.key-stk-key-wired {
  background-color: rgba(64, 64, 64, 0);
  opacity: 0.5;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
}

.key-key-invisible {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

.key-stk-key-invisible {
  background-color: rgba(64, 64, 64, 1);
  opacity: 0.5;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

.key-frame-only {
  background-color: rgba(64, 64, 64, 0);
  opacity: 1;
  border-width: 3px;
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
}

.key-stk-frame-only {
  background-color: rgba(64, 64, 64, 0);
  opacity: 0.5;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
}

.key-invisible {
  background-color: rgba(64, 64, 64, 0);
  opacity: 0;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}

/******* key non-letter style  ***********/
.left-key:not(.letter),
.right-key:not(.letter) {
  opacity: 0;
}

.left-symbol {
  width: calc(var(--l-symbol-width) - 8px);
}

.language {
  width: calc(var(--language-width) - 8px);
}

.mic {
  width: calc(var(--mic-width) - 8px);
}

.left-space {
  width: calc(var(--l-space-width) - 8px);
  border: 1px solid #303030;
  box-sizing: border-box;
}

.back {
  width: calc(var(--back-width) - 8px);
}

.shift {
  width: calc(var(--shift-width) - 8px);
}

.enter {
  width: calc(var(--enter-width) - 8px);
}

.move-keyboard {
  width: calc(var(--move-keyboard-width) - 8px);
}

.right-symbol {
  width: calc(var(--r-symbol-width) - 8px);
}

.right-space {
  width: calc(var(--r-space-width) - 8px);
  border: solid 1px rgb(48, 48, 48);
  box-sizing: border-box;
}

/******************************/
/********* eyes-on, peripheral ********/
/******************************/
/* #target {
  --default-keyboard-alpha: 1;
  --
} */
/* left,right-keyboard*/
/* .defalut-keyboard {
  background-color: rgba(64, 64, 64, var(--default-keyboard-alpha));
  opacity: 1,
} */
</style>
