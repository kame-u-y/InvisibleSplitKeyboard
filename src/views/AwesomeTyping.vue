<template>
  <load-setting-form />
  <div id="task-container">
    <task-sentence />
    <predicted-candidates />
  </div>
  <background-text />
  <awesome-keyboard />
  <visualized-tap-data />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/typingStore';
import LoadSettingForm from '../components/SettingForm/LoadSettingForm';
import TaskSentence from '../components/TaskSentence.vue';
import PredictedCandidates from '../components/PredictedCandidates.vue';
import BackgroundText from '../components/BackgroundText.vue';
import AwesomeKeyboard from '../components/Keyboard/AwesomeKeyboard';
import VisualizedTapData from '../components/VisualizedTapData';

export default defineComponent({
  components: {
    LoadSettingForm,
    TaskSentence,
    PredictedCandidates,
    BackgroundText,
    AwesomeKeyboard,
    VisualizedTapData,
  },
  setup() {
    provideStore();
  },
});
</script>

<style scoped>
#task-container {
  margin: auto;
  margin-left: 35%;
}
</style>
