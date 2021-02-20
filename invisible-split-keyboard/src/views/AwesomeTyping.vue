<template>
  <awesome-setting-form />
  <div id="task-container">
    <awesome-task-sentence />
    <predicted-candidates />
  </div>
  <background-text />
  <awesome-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/typingStore';
import AwesomeSettingForm from '../components/SettingForm/AwesomeSettingForm';
import AwesomeTaskSentence from '../components/TaskSentence/AwesomeTaskSentence.vue';
import PredictedCandidates from '../components/PredictedCandidates.vue';
import BackgroundText from '../components/BackgroundText.vue';
import AwesomeKeyboard from '../components/Keyboard/AwesomeKeyboard';

export default defineComponent({
  components: {
    AwesomeSettingForm,
    AwesomeTaskSentence,
    PredictedCandidates,
    BackgroundText,
    AwesomeKeyboard,
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
