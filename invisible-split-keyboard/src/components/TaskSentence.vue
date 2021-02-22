<template>
  <pre id="given-box">
        <span id="given-text">{{ givenText }}</span>
    </pre>
  <pre id="input-box">
        <span id="input-text">{{ inputText }}</span>
    </pre>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from '../stores/typingStore';

export default {
  name: 'TaskSentence',
  setup() {
    const { givenText, inputText, updateGivenText } = useStore();

    onMounted(() => {
      updateGivenText();
    });

    return { givenText, inputText };
  },
};
</script>

<style scoped>
#given-box {
  height: 30px;
}

#task-number {
  margin: 5px 0px;
}

#given-text {
  margin: 5px 0px;
  font-size: 17px;
}

#input-box {
  height: 20px;
  margin: 10px 0px;
}

#input-text {
  border-right: solid 3px #ddd;
  font-size: 17px;
}
</style>
