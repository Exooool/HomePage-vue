<template>
  <div
    class="index-container"
    @contextmenu.prevent="rightClick"
    @mousedown="onMouseDown"
    @click="onBodyClick"
  >
    <div class="background-box" :class="inputFocus ? 'focus' : ''">
      <!-- <video id="backVideo" autoplay loop muted></video> -->
      <img
        id="backImg"
        src="https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1672508644335-e2097539f42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
    </div>
    <div class="index-content">
      <!-- 搜索框 -->
      <search-input v-model:focus="inputFocus" />
      <div class="application-box" :class="inputFocus ? 'vanish' : ''">
        <application
          v-for="(item, index) in apps"
          :key="index"
          :data="item"
          @posChange="autoSortApps"
          @posChanged="sortChangedApp"
        />
      </div>
    </div>
    <control-bar :visible="!inputFocus" @contextmenu.stop="preventDefault" />
    <right-menu v-model:visible="rightMenuVisible" :position="rightMenuPos" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import Application from "@/components/application/index.vue";
import SearchInput from "@/components/searchInput/index.vue";
import { resolveAppPos, initApps } from "@/utils/appUtils";
import ControlBar from "@/components/controlBar/index.vue";
import RightMenu from "@/components/menu/rightMenu.vue";
import { config } from "@/config/config";
import { useAppStore } from "@/stores";
import _ from "lodash";

export default defineComponent({
  components: {
    SearchInput,
    Application,
    RightMenu,
    ControlBar,
  },
  setup() {
    const backBoxRef = ref();
    const appStore = useAppStore();
    const state = reactive({
      inputFocus: false,
      apps: [] as any[],
      rightMenuVisible: false,
      rightMenuPos: { x: 0, y: 0 },
    });

    const onBodyClick = () => {
      // console.log("body", e);
      state.inputFocus = false;
      state.rightMenuVisible = false;
    };

    /**
     *
     * @param {Array} newApps
     */
    const autoSortApps = ({ newApps, changeId }: Record<string, any>) => {
      const resolvedApps = resolveAppPos(newApps);
      resolvedApps.forEach((app) => {
        if (app.id !== changeId) {
          const appDom = document.getElementById(app.id);
          appDom!.style.transform = `translate(${app.x}px,${app.y}px)`;
        }
      });
    };

    /**
     *
     * @param {*} param0
     */
    const sortChangedApp = ({ newApps, changeId }: any) => {
      // console.log('changed')
      const resolvedApps = resolveAppPos(newApps);
      resolvedApps.forEach((app) => {
        if (app.id === changeId) {
          const appDom = document.getElementById(app.id);
          appDom!.style.transform = `translate(${app.x}px,${app.y}px)`;
        }
      });
    };

    const rightClick = (e: MouseEvent) => {
      state.rightMenuPos = {
        x: e.x,
        y: e.y,
      };
      state.rightMenuVisible = true;
    };

    const preventDefault = (e: MouseEvent) => {
      e.preventDefault();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 2) {
        state.rightMenuVisible = false;
      }
    };

    onMounted(() => {
      if (appStore.apps.length === 0) {
        appStore.setApps(initApps(_.cloneDeep(config.defaultApps)));
        console.log(appStore.getApps);
      }
      state.apps = appStore.getApps;
    });

    return {
      ...toRefs(state),
      backBoxRef,
      appStore,
      onBodyClick,
      autoSortApps,
      sortChangedApp,
      rightClick,
      onMouseDown,
      preventDefault,
    };
  },
});
</script>

<style lang="scss" scoped>
.index-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  // 背景
  .background-box {
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: -1;
    #backImg {
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: opacity 1s, transform 0.25s, filter 0.25s;
    }

    #backVideo {
      position: absolute;
    }

    &.focus > #backImg {
      filter: blur(10px);
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .index-content {
    position: relative;
    height: 100vh;
    width: 100vw;

    .application-box {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 480px;
      width: 960px;
      transform: translate(-50%, calc(-50% + 100px));

      &.vanish {
        transition: all 0.2s;
        opacity: 0;
        z-index: -1;
      }
    }
  }
}
</style>
