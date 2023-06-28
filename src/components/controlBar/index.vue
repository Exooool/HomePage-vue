<template>
  <div class="controlbar-wrapper">
    <div
      v-if="menuVisible"
      class="mask"
      @click.stop="menuVisible = false"
    ></div>
    <home-menu v-model:visible="menuVisible" />
    <div :class="['controlbar-content', visible ? '' : 'vanish']">
      <div
        class="controlbar-function-button"
        @click="switchMenu"
        :style="[menuVisible ? 'background: white' : '']"
      >
        <iconify
          icon="system-uicons:panel-sectioned"
          style="font-size: 18px; stroke-width: 2px"
        />
      </div>
      <div class="controlbar-divider"></div>
      <div class="controlbar-app-classifies">
        <div
          :class="[
            'classify-item',
            settingStore.mainSwiperIndex === classifyIndex ? 'active' : '',
          ]"
          v-for="(classify, classifyIndex) in classifyList"
          :key="classify.id"
          @click="classifyMenuClick(classifyIndex)"
        >
          <iconify :icon="classify.classifyIcon" style="font-size: 28px" />
          <span class="classify-name">{{ classify.classifyName }}</span>
        </div>
      </div>
      <div class="classify-add">
        <iconify icon="gala:add" style="font-size: 28px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useSettingStore } from "@/stores";
import HomeMenu from "../menu/homeMenu.vue";

export default defineComponent({
  components: {
    HomeMenu,
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  setup() {
    const settingStore = useSettingStore();
    const state = reactive({
      menuVisible: false,
      classifyList: [
        {
          id: 1,
          classifyName: "主页",
          classifyIcon: "basil:home-outline",
        },
        {
          id: 2,
          classifyName: "设计",
          classifyIcon: "basil:app-store-outline",
        },
        {
          id: 3,
          classifyName: "开发",
          classifyIcon: "basil:desktop-outline",
        },
        {
          id: 4,
          classifyName: "影视",
          classifyIcon: "basil:youtube-outline",
        },
      ],
    });

    const switchMenu = () => {
      state.menuVisible = !state.menuVisible;
    };

    const classifyMenuClick = (index: number) => {
      settingStore.setMainSwiperIndex(index);
    };

    return {
      ...toRefs(state),
      switchMenu,
      settingStore,
      classifyMenuClick,
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
    transition: all 0.2s ease-in-out;
    opacity: 1;
    visibility: visible;

    &.vanish {
      opacity: 0;
      visibility: hidden;
    }
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

  .controlbar-app-classifies {
    width: calc(100% - 112px);
    display: flex;
    justify-content: center;

    .classify-item {
      margin: 6px;
      height: 42px;
      width: 42px;
      border-radius: 12px;
      transition: all 0.2s;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .classify-name {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s;
        transform: scale(0);
        top: 0;
        color: white;
        font-size: 12px;
      }

      &.active,
      &:hover {
        background: rgba(217, 221, 222, 0.25);
        .classify-name {
          opacity: 1;
          visibility: visible;
          transform: scale(1) translateY(calc(-100% - 10px));
        }
      }
    }
  }

  .classify-add {
    height: 46px;
    width: 46px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
