<template>
  <div class="weather-fullscreen-cover">
    <div class="weather-fullscreen-dialog"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // todo
    return {};
  },
});
</script>

<style lang="scss" scoped>
.weather-fullscreen {
  &-cover {
    z-index: 100;
    top: 0;
    left: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: 0.46);
  }
}
</style>
