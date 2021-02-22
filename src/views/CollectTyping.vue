<template>
  <post-setting-form />
  <div id="task-container">
    <task-sentence />
  </div>
  <background-text />
  <collect-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import { provideStore } from '../stores/typingStore';
import PostSettingForm from '../components/SettingForm/PostSettingForm.vue';
import TaskSentence from '../components/TaskSentence.vue';
import BackgroundText from '../components/BackgroundText.vue';
import CollectKeyboard from '../components/Keyboard/CollectKeyboard.vue';

export default defineComponent({
  components: {
    PostSettingForm,
    TaskSentence,
    BackgroundText,
    CollectKeyboard,
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
