<template>
  <div
    :class="['menu-box', visible ? 'menu-box_visible' : '']"
    :style="[`left: ${position?.x}px`, `top: ${position?.y}px`]"
    @click.stop
  >
    <div v-if="!appId">
      <div class="menu-item">网站导航</div>
      <div class="menu-item">小组件</div>
      <div class="menu-item">壁纸</div>
      <div class="menu-item">设置</div>
    </div>
    <div v-else class="menu-item" @click="delApp(appId)">删除</div>
    <div class="menu-divider"></div>
    <div class="menu-item">编辑主屏幕</div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from "@/stores";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    appId: {
      type: String,
      default: () => {},
    },
    position: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const state = reactive({});
    const appStore = useAppStore();

    const closeMenu = () => emit("update:visible", false);

    const delApp = (appId: string) => {
      appStore.delApp(appId);
      closeMenu();
    };
    return {
      ...toRefs(state),
      delApp,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-box {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  background: rgba($color: #fff, $alpha: 0.85);
  backdrop-filter: blur(4px);
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  z-index: 1999;
  transition: opacity 0.25s;

  &_visible {
    visibility: visible;
    opacity: 1;
  }
  .menu-divider {
    height: 1px;
    width: 100%;
    background: rgba($color: #000, $alpha: 0.1);
    margin: 6px 0;
  }
  .menu-item {
    border-radius: 6px;
    display: flex;
    align-items: center;
    height: 32px;
    width: 120px;
    padding: 6px;
    cursor: pointer;
    &:hover {
      background: rgba($color: #000, $alpha: 0.1);
    }
  }
}
</style>
