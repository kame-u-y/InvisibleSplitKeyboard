<template>
  <awesome-setting-form />
  <task-sentence />
  <background-text />
  <awesome-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/typingStore';
import AwesomeSettingForm from '../components/SettingForm/AwesomeSettingForm';
import TaskSentence from '../components/TaskSentence.vue';
import BackgroundText from '../components/BackgroundText.vue';
import AwesomeKeyboard from '../components/Keyboard/AwesomeKeyboard';

export default defineComponent({
  components: {
    AwesomeSettingForm,
    TaskSentence,
    BackgroundText,
    AwesomeKeyboard,
  },
  setup() {
    provideStore();
  },
});
</script>
