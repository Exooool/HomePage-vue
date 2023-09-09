<template>
  <div class="controlbar-wrapper">
    <div class="controlbar-content-wrapper">
      <div class="controlbar-content">
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
      </div>
    </div>
    <home-menu v-model:visible="menuVisible" />
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
  emits: ["clickAdd"],
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
.controlbar-wrapper {
  z-index: 1;
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  .controlbar-content-wrapper {
    position: absolute;
    pointer-events: all;
    right: 24px;
    bottom: 12px;
    height: 52px;
    transition: all 0.8s;
    opacity: 1;
  }

  .controlbar-content {
    height: 100%;
    border-radius: 16px;
    // border: 1px solid #d9ddde;
    // background: rgba($color: #d9ddde, $alpha: 0.65);
    // backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    padding: 0 6px;
    transition: all 0.2s ease-in-out;
    opacity: 1;
    visibility: visible;
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
