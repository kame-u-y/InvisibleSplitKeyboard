<template>
  <setting-form />
  <task-sentence />
  <background-text />
  <collect-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/collectTypingStore';
import SettingForm from '../components/SettingForm.vue';
import BackgroundText from '../components/BackgroundText.vue';
import CollectKeyboard from '../components/Keyboard/CollectKeyboard.vue';
import TaskSentence from '../components/TaskSentence.vue';

export default defineComponent({
  components: { SettingForm, BackgroundText, CollectKeyboard, TaskSentence },
  setup() {
    provideStore();
  },
});
</script>
