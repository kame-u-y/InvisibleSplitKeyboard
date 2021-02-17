<template>
  <div>
    <label>user name: </label
    ><input
      id="user-name"
      type="text"
      @change="setUserName($event.target.value)"
    />
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
      <input
        type="checkbox"
        id="bg-text-visible"
        @change="setBgTextVisible($event.target.checked)"
      />bgTextVisible
    </div>
    <button @click="updateGivenText()" value="hogehoge" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from '../stores/collectTypingStore';

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const {
      setKeyboardMode,
      setBgTextVisible,
      setUserName,
      updateGivenText,
    } = useStore();
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
    return {
      setKeyboardMode,
      setBgTextVisible,
      setUserName,
      updateGivenText,
      modeList,
    };
  },
});
</script>
