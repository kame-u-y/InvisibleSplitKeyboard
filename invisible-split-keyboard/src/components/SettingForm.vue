<template>
  <div>
    <label>user name: </label><input id="user-name" type="text" />
    <label id="task-count">1</label>
    <div id="visual-mode">
      <select name="keyboard-style">
        <option v-for="mode in modeList" :key="mode" :value="mode">{{
          mode
        }}</option>
      </select>
      <input type="checkbox" id="bg-text-visible" />bgTextVisible
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingForm',
  setup() {
    const modeList = [
      'eyes-on',
      'peripheral',
      'stk-peripheral',
      'borderless',
      'stk-borderless',
      'key-wired',
      'stk-key-wired',
      'key-invisible',
      'stk-keyinvisible',
      'frame-only',
      'stk-frame-only',
      'invisible',
    ];
    return { modeList };
  },
};
</script>
