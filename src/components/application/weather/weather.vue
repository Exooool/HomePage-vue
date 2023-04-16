<template>
  <div class="weather__cell">
    <div class="position">罗湖</div>
    <div class="tempreture">14℃</div>
    <div class="description">
      <div class="title">晴</div>
      <div class="details">最低11℃ 最高19℃</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import WeatherBox from "./weather";

export default defineComponent({
  setup() {
    const state = reactive({});

    const fullScreen = () => {
      WeatherBox({});
    };
    return {
      ...toRefs(state),
      fullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.weather__cell {
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-image: linear-gradient(
    0deg,
    rgb(56, 127, 220) 0%,
    rgb(6, 81, 172) 100%
  );
  .position {
    font-size: 18px;
  }

  .tempreture {
    font-size: 32px;
  }

  .description {
    .title {
      margin-bottom: 10px;
    }
  }
}
</style>
