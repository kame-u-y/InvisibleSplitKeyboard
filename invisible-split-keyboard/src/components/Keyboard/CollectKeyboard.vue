<template>
  <keyboard-template
    @startevent="handleTouchStart"
    @moveevent="handleTouchMove"
    @endevent="handleTouchEnd"
  />
</template>

<script>
import KeyboardTemplate from './KeyboardTemplate/KeyboardTemplate.vue';
import { useTypingEvent } from './modules/TypingEvents';

export default {
  components: { KeyboardTemplate },
  name: 'CollectKeyboard',
  setup() {
    const {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    } = useTypingEvent();

    return {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
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
  --footer-bottom: 0px;

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

  user-select: none;
  position: fixed;
  width: 100vw;
  bottom: var(--footer-bottom);
  background-color: rgba(255, 255, 255, 0);
  padding-bottom: 30px;
  padding-top: 150px;
}

/********* keyboard outline *********/
.left-keyboard {
  float: left;
  background-color: rgb(0, 0, 0);
  padding: 4px;
  border-radius: 4px;
  border: solid 3px rgba(0, 0, 0, 0);
}

.right-keyboard {
  float: right;
  background-color: rgb(0, 0, 0);
  padding: 4px;
  border-radius: 4px;
  border: solid 3px rgba(0, 0, 0, 0);
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

.left-top {
  padding-left: var(--lt-padding-left);
}

.left-middle {
  padding-left: var(--lm-padding-left);
}

.left-bottom {
  padding-left: var(--lb-padding-left);
}

.left-special {
  padding-left: var(--ls-padding-left);
}

.right-special {
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
  font-size: 27px;
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

/******* mode style ***********/
.kbd-eyes-on,
.kbd-peripheral {
  background-color: rgba(0, 0, 0, 1);
  opacity: 1;
  border-color: rgba(64, 64, 64, 0);
}
.key-eyes-on,
.key-peripheral {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-stk-peripheral {
  background-color: rgb(0, 0, 0);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 0);
}
.key-stk-peripheral {
  background-color: rgb(64, 64, 64);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-borderless {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-color: rgba(64, 64, 64, 0);
}
.key-borderless {
  background-color: rgba(64, 64, 64, 1);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-stk-borderless {
  background-color: rgb(64, 64, 64);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 0);
}
.key-stk-borderless {
  background-color: rgb(64, 64, 64);
  opacity: 1;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-key-wired {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  border-color: rgba(64, 64, 64, 1);
}
.key-key-wired {
  background-color: rgba(64, 64, 64, 0);
  opacity: 1;
  border-width: 3px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-stk-key-wired {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 1);
}
.key-stk-key-wired {
  background-color: rgba(64, 64, 64, 0);
  opacity: 1;
  border-width: 3px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-key-invisible {
  background-color: rgba(0, 0, 0, 1);
  opacity: 1;
  border-color: rgba(64, 64, 64, 0);
}
.key-key-invisible {
  background-color: rgba(64, 64, 64, 1);
  opacity: 0;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-stk-key-invisible {
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 0);
}
.key-stk-key-invisible {
  background-color: rgba(64, 64, 64, 1);
  opacity: 0;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 7px;
}
/** */
.kbd-frame-only {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  border-color: rgba(64, 64, 64, 1);
}
.key-frame-only {
  background-color: rgba(64, 64, 64, 0);
  opacity: 0;
  border-width: 3px;
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
}
/** */
.kbd-stk-frame-only {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0.5;
  border-color: rgba(64, 64, 64, 1);
}
.key-stk-frame-only {
  background-color: rgba(64, 64, 64, 0);
  opacity: 0;
  border-width: 0px;
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
}
/** */
.kbd-invisible {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  border-color: rgba(64, 64, 64, 0);
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
</style>
