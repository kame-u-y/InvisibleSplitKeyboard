<template>
  <ul id="predicted-candidate-list">
    <li
      v-for="(cand, id) in predictedCandidates"
      :key="cand"
      :class="getCandidateClass(id)"
    >
      {{ cand }}
    </li>
  </ul>
</template>

<script>
import { useStore } from '../stores/typingStore';

export default {
  name: 'PredictedCandidates',
  setup() {
    const { predictedCandidates, selectedCandidateId } = useStore();
    const getCandidateClass = (id) => {
      return `candidate${id === selectedCandidateId.value ? ' selected' : ''}`;
    };
    return { predictedCandidates, selectedCandidateId, getCandidateClass };
  },
};
</script>

<style scoped>
#predicted-candidate-list {
  font-size: 0;
  height: 30px;
  padding-left: 0px;
}

.candidate {
  background-color: #ddd;
  display: inline-block;
  font-size: 15px;
  margin-right: 10px;
  line-height: 20px;
  padding: 0px 5px;
  margin-bottom: 5px;
}

.selected {
  background-color: #bbb;
}
</style>
