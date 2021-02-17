<template>
  <div id="task-container">
    <pre id="given-box">
        <span id="given-text">{{ givenText }}</span>
    </pre>
    <pre id="input-box">
        <span id="input-text">{{ inputText }}</span>
    </pre>
  </div>
</template>

<script>
import { useStore } from '../stores/collectTypingStore';

export default {
  name: 'TaskSentence',
  setup() {
    const { givenText, inputText } = useStore();

    return { givenText, inputText };
  },
};
</script>

<style scoped>
#task-container {
  margin: auto;
  margin-left: 40%;
}

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

#input-text,
#predicted-letter {
  border-right: solid 3px #ddd;
  font-size: 17px;
}
</style>
