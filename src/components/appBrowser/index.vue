<template>
  <div v-if="visible" class="app-browser-dialog-wrapper" @click.stop="onClose">
    <div class="app-browser-dialog" @click.stop>
      <div>
        <a-input-search
          v-model:value="searchInputValue"
          placeholder="搜索"
          size="large"
          style="width: 100%"
        />
      </div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane
          v-for="(classify, classifyIndex) in browserAppConfigs"
          :key="classifyIndex"
          :tab="classify.categoryName"
        >
          <div class="app-grid">
            <div class="app-box" v-for="(app, appIndex) in classify.list">
              <div
                v-if="app?.icon"
                class="app-box-icon"
                :style="{
                  background: resolveBackground(app),
                  color: app.color ?? 'black',
                }"
              >
                <img
                  v-if="app.iconType === 'img'"
                  :src="backDynamicUrl(app.icon)"
                />
                <iconify
                  v-else-if="app?.icon && app.iconType === 'icon'"
                  :icon="app.icon"
                  style="font-size: 42px"
                />
              </div>

              <div class="app-box-name">
                {{ app.title }}
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { browserAppConfigs } from "@/config/config";
import type { browserApp } from "@/types/app";
import _ from "lodash";
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const state = reactive({
      searchInputValue: "",
      activeKey: 0,
    });

    const backDynamicUrl = (icon: any) => {
      console.log(icon);
      return new URL(
        `../../assets/applicationIcon/${icon}.png`,
        import.meta.url
      ).href;
    };

    const resolveBackground = (app: browserApp): string => {
      if (_.isArray(app.background)) {
        return `linear-gradient(${app.backgroundAngle ?? "0deg"},${(
          app.background as string[]
        ).join(",")})`;
      } else {
        return app.background as string;
      }
    };

    const onClose = () => {
      emit("update:visible", false);
    };

    return {
      resolveBackground,
      ...toRefs(state),
      backDynamicUrl,
      browserAppConfigs,
      onClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-browser-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 580px;
  width: 580px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  backdrop-filter: blur(10px);

  &-wrapper {
    z-index: 999;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
    // background: rgba(0, 0, 0, 0.1);
  }

  .app-grid {
    display: flex;
    flex-wrap: wrap;
    .app-box {
      width: 100px;
      padding: 0 10px;
      &-icon {
        position: relative;
        height: 80px; 
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        overflow: hidden;
        background: rgb(231, 231, 231);
        & > img {
          height: 100%;
          width: 100%;
        }
      }

      &-name {
        margin-top: 5px;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
