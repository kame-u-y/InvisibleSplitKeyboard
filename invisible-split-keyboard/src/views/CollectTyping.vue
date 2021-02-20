<template>
  <collect-setting-form />
  <div id="task-container">
    <task-sentence />
  </div>
  <background-text />
  <collect-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/typingStore';
import CollectSettingForm from '../components/SettingForm/CollectSettingForm';
import TaskSentence from '../components/TaskSentence/TaskSentence.vue';
import BackgroundText from '../components/BackgroundText.vue';
import CollectKeyboard from '../components/Keyboard/CollectKeyboard.vue';

export default defineComponent({
  components: {
    CollectSettingForm,
    BackgroundText,
    CollectKeyboard,
    TaskSentence,
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
