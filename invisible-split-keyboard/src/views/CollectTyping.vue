<template>
  <h1>CollectTyping</h1>
  <setting-form />
  <background-text />
  <collect-keyboard />
</template>

<script>
import SettingForm from '../components/SettingForm.vue';
import BackgroundText from '../components/BackgroundText.vue';
import CollectKeyboard from '../components/Keyboard/CollectKeyboard.vue';
export default {
  components: { SettingForm, BackgroundText, CollectKeyboard },
  setup() {},
};
</script>
