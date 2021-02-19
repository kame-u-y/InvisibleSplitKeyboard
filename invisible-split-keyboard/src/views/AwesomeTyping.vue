<template>
  <h1>AwesomeTyping</h1>
  <setting-form />
  <task-sentence />
  <background-text />
  <awesome-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/typingStore';
import BackgroundText from '../components/BackgroundText.vue';
import AwesomeKeyboard from '../components/Keyboard/AwesomeKeyboard';
import SettingForm from '../components/SettingForm.vue';
import TaskSentence from '../components/TaskSentence.vue';
export default defineComponent({
  components: { SettingForm, TaskSentence, BackgroundText, AwesomeKeyboard },
  setup() {
    provideStore();
  },
});
</script>
