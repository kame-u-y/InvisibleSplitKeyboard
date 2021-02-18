<template>
  <div>
    <label>user name: </label
    ><input
      id="user-name"
      type="text"
      @change="setUserName($event.target.value)"
    />
    <label id="task-count">{{ taskCount }}</label>
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
        id="bg-text-visible"
        type="checkbox"
        @change="setBgTextVisible($event.target.checked)"
      />bgTextVisible
    </div>
    <!-- <button @click="updateGivenText()" /> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from '../stores/collectTypingStore';

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const {
      taskCount,
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
      taskCount,
      setKeyboardMode,
      setBgTextVisible,
      setUserName,
      updateGivenText,
      modeList,
    };
  },
});
</script>
