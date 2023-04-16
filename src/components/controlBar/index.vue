<template>
  <div class="controlbar-wrapper">
    <div
      v-if="menuVisible"
      class="mask"
      @click.stop="menuVisible = false"
    ></div>
    <home-menu v-model:visible="menuVisible" />
    <div class="controlbar-content">
      <div
        class="controlbar-function-button"
        @click="switchMenu"
        :style="[menuVisible ? 'background: white' : '']"
      >
        <i-system-uicons-panel-sectioned
          style="font-size: 18px; stroke-width: 2px"
        />
      </div>
      <div class="controlbar-divider"></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import HomeMenu from "../menu/homeMenu.vue";

export default defineComponent({
  components: {
    HomeMenu,
  },
  setup() {
    const state = reactive({
      menuVisible: false,
    });

    const switchMenu = () => {
      state.menuVisible = !state.menuVisible;
    };

    return {
      ...toRefs(state),
      switchMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  height: 100vh;
  width: calc(100vw + 320px);
  top: 0;
  left: 0;
  transform: translate(calc((-100vw + 320px) / 2), calc(-100% + 58px));
  // background: rgba($color: #d9ddde, $alpha: 0.35);
}
.controlbar-wrapper {
  position: fixed;
  left: 50%;
  bottom: 6px;
  transform: translateX(-50%);
  height: 52px;
  width: 60vw;
  max-width: 860px;
  min-width: 320px;

  .controlbar-content {
    height: 100%;
    border-radius: 16px;
    border: 1px solid #d9ddde;
    background: rgba($color: #d9ddde, $alpha: 0.65);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    padding: 0 6px;
  }

  .controlbar-function-button {
    height: 34px;
    width: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #d9ddde, $alpha: 0.35);
    border-radius: 17px;
    // border: 1px #d9ddde solid;
    cursor: pointer;
  }

  .controlbar-divider {
    height: 22px;
    width: 2px;
    background: rgba($color: #d9ddde, $alpha: 0.65);
    margin: 0 12px;
  }
}
</style>
