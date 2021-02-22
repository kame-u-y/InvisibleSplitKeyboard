<template>
  <div>
    <div class="form-row">
      <span class="form-item">
        <label>user: </label>
        <input
          id="user-name"
          type="text"
          @change="setUserName($event.target.value)"
        />
      </span>
      <span class="form-item">
        <label>keyboard: </label>
        <select
          name="keyboard-style"
          @change="setKeyboardMode($event.target.value)"
        >
          <option v-for="mode in modeList" :key="mode" :value="mode">{{
            mode
          }}</option>
        </select>
      </span>
    </div>
    <div class="form-row">
      <span class="form-item">
        <label id="task-count">task-count:{{ taskCount }}</label>
      </span>
      <span class="form-item">
        <input
          id="bg-text-visible"
          type="checkbox"
          @change="setBgTextVisible($event.target.checked)"
        />background
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from '../../stores/typingStore';

export default defineComponent({
  name: 'PostSettingForm',
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

<style scoped>
.form-row {
  margin-top: 10px;
}
.form-item {
  margin: 0 5px;
}
</style>
