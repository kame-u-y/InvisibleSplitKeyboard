<template>
  <keyboard-template
    @startevent="handleTouchStart"
    @moveevent="handleTouchMove"
    @endevent="handleTouchEnd"
  />
</template>

<script>
import KeyboardTemplate from './KeyboardTemplate/KeyboardTemplate.vue';
import { useTypingEvent } from './modules/awesomeTypingEvents';

export default {
  components: { KeyboardTemplate },
  name: 'AwesomeKeyboard',
  setup() {
    const {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    } = useTypingEvent();

    return { handleTouchStart, handleTouchMove, handleTouchEnd };
  },
};
</script>
