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
      <span class="form-item">
        <button @click="handleLoadClick">Load Data</button>
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
      <span class="form-item">
        <input
          type="checkbox"
          @change="setDataVisible($event.target.checked)"
        />visualized-data
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from '../../stores/typingStore';

export default defineComponent({
  name: 'SettingForm',
  setup() {
    const {
      taskCount,
      setKeyboardMode,
      setBgTextVisible,
      setUserName,
      updateGivenText,
      loadTapData,
      setCurrentDataInfo,
      setDataVisible,
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
    const loadStatusLabel = ref('');
    const handleLoadClick = () => {
      const isLoaded = loadTapData();
      if (isLoaded) {
        loadStatusLabel.value = 'load success';
      }
    };
    return {
      taskCount,
      setKeyboardMode,
      setBgTextVisible,
      setUserName,
      updateGivenText,
      modeList,
      setCurrentDataInfo,
      loadStatusLabel,
      handleLoadClick,
      setDataVisible,
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
