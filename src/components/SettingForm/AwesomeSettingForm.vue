<template>
  <default-setting-form />
  <button @click="handleLoadClick">Load Data</button>
  <label id="is-loaded">{{ loadStatusLabel }}</label>
  <button @click="setCurrentDataInfo()" />
  <label>visualize data: </label>
  <input type="checkbox" @change="setDataVisible($event.target.checked)" />
</template>

<script>
import { ref } from 'vue';
import { useStore } from '../../stores/typingStore';
import DefaultSettingForm from './DefaultSettingForm/DefaultSettingForm.vue';

export default {
  components: { DefaultSettingForm },
  setup() {
    const { loadTapData, setCurrentDataInfo, setDataVisible } = useStore();
    const loadStatusLabel = ref('');
    const handleLoadClick = () => {
      const isLoaded = loadTapData();
      if (isLoaded) {
        loadStatusLabel.value = 'load success';
      }
    };
    return {
      setCurrentDataInfo,
      loadStatusLabel,
      handleLoadClick,
      setDataVisible,
    };
  },
};
</script>
