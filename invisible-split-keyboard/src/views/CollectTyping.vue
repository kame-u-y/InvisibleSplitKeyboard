<template>
  <h1>CollectTyping</h1>
  <setting-form />
  <background-text />
  <collect-keyboard />
</template>

<script>
import { defineComponent } from 'vue';
import SettingForm from '../components/SettingForm.vue';
import BackgroundText from '../components/BackgroundText.vue';
import CollectKeyboard from '../components/Keyboard/CollectKeyboard.vue';
import { provideStore } from '../stores/collectTypingStore';

export default defineComponent({
  components: { SettingForm, BackgroundText, CollectKeyboard },
  setup() {
    provideStore();
  },
});
</script>
