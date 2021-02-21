<template>
  <div id="visualized-tapdata" :class="getVisibleClass()">
    <div id="dot-container">
      <template v-for="dataList in getTapData()">
        <p
          v-for="(data, id) in dataList"
          :key="id"
          class="dot"
          :style="getDotStyle()"
        />
      </template>
    </div>
    <div id="circle-container">
      <div
        v-for="(data, letter) in gaussianData"
        :key="letter"
        class="circle"
        :style="getCircleStyle(data, letter)"
      />
    </div>
  </div>
</template>

<script>
import { rowLetterList } from '../modules/keyList';
import { useStore } from '../stores/typingStore';

export default {
  name: 'VisualizedTapData',
  setup() {
    const {
      isSetCurrentInfo,
      getCurrentTapData,
      gaussianData,
      targetLeft,
      targetTop,
      dataVisible,
    } = useStore();

    const getVisibleClass = () => {
      return `tapdata-${dataVisible.value ? 'visible' : 'invisible'}`;
    };

    const getTapData = () => {
      if (isSetCurrentInfo()) {
        return getCurrentTapData();
      }
    };

    const getHue = (letter) => {
      if (rowLetterList[0].indexOf(letter) !== -1)
        return rowLetterList[0].indexOf(letter) * 30;
      if (rowLetterList[1].indexOf(letter) !== -1)
        return 180 + rowLetterList[1].indexOf(letter) * 30;
      if (rowLetterList[2].indexOf(letter) !== -1)
        return rowLetterList[2].indexOf(letter) * 30;
    };
    const getDotStyle = (letter, x, y) => {
      return {
        backgroundColor: `hsl(${getHue(letter)}, 50%, 50%)`,
        left: `${x}px`,
        top: `${y}px`,
      };
    };
    const getCircleStyle = (data, letter) => {
      const width = data.x.sigma * 3 * 2;
      const height = data.y.sigma * 3 * 2;
      const left = targetLeft.value + data.x.average;
      const top = targetTop.value + data.y.average;
      return {
        backgroundColor: `hsla(${getHue(letter)}, 100%, 80%, 0.1)`,
        border: `solid 1px hsla(${getHue(letter)}, 50%, 50%)`,
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      };
    };

    return {
      getVisibleClass,
      getCurrentTapData,
      gaussianData,
      getTapData,
      getDotStyle,
      getCircleStyle,
    };
  },
};
</script>

<style scoped>
#visualized-tapdata {
  pointer-events: none;
}

.tapdata-visible {
  opacity: 1;
}

.tapdata-invisible {
  opacity: 0;
}

.dot {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
}

.circle {
  position: absolute;
  margin: 0;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
}
</style>
