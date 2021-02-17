<template>
  <div>
    <label>user name: </label><input id="user-name" type="text" />
    <label id="task-count">1</label>
    <div id="visual-mode">
      <select
        name="keyboard-style"
        @change="setKeyboardMode($event.target.value)"
      >
        <option v-for="mode in modeList" :key="mode" :value="mode">{{
          mode
        }}</option>
      </select>
      <input type="checkbox" id="bg-text-visible" />bgTextVisible
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from '../stores/collectTypingStore';

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const { setKeyboardMode } = useStore();
    const modeList = [
      'eyes-on',
      'peripheral',
      'stk-peripheral',
      'borderless',
      'stk-borderless',
      'key-wired',
      'stk-key-wired',
      'key-invisible',
      'stk-key-invisible',
      'frame-only',
      'stk-frame-only',
      'invisible',
    ];
    return { setKeyboardMode, modeList };
  },
});
</script>
