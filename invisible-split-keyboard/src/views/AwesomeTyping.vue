<template>
  <load-setting-form />
  <div id="task-container">
    <awesome-task-sentence />
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
import AwesomeTaskSentence from '../components/TaskSentence/AwesomeTaskSentence.vue';
import PredictedCandidates from '../components/PredictedCandidates.vue';
import BackgroundText from '../components/BackgroundText.vue';
import AwesomeKeyboard from '../components/Keyboard/AwesomeKeyboard';
import VisualizedTapData from '../components/VisualizedTapData';

export default defineComponent({
  components: {
    LoadSettingForm,
    AwesomeTaskSentence,
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
  margin-left: 40%;
}
</style>
