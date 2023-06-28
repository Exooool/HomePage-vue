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
    <div
      ref="indexContentRef"
      class="index-content"
      @mousedown="indexContentMouseDown"
    >
      <!-- 搜索框 -->
      <search-input v-model:focus="inputFocus" />
      <div
        ref="swiperListRef"
        class="application-swiper-list"
        :style="`transform: translateX(${
          -swiperClientWidth * swpierIndex
        }px);transition: all 0.3s`"
      >
        <div
          class="application-box"
          :class="[inputFocus ? 'vanish' : '', appFocus ? 'focus' : '']"
        >
          <application
            v-for="(item, index) in apps"
            :key="index"
            :data="item"
            @dragMove="dragMove"
            @dragDown="dragDown"
            @posChange="autoSortApps"
            @posChanged="sortChangedApp"
          />
        </div>
      </div>
    </div>
    <control-bar :visible="!inputFocus" @contextmenu.stop="preventDefault" />
    <right-menu v-model:visible="rightMenuVisible" :position="rightMenuPos" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  computed,
} from "vue";
import Application from "@/components/application/index.vue";
import SearchInput from "@/components/searchInput/index.vue";
import { resolveAppPos, initApps } from "@/utils/appUtils";
import ControlBar from "@/components/controlBar/index.vue";
import RightMenu from "@/components/menu/rightMenu.vue";
import { config } from "@/config/config";
import { useAppStore, useSettingStore } from "@/stores";
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
    const swiperListRef = ref();
    const indexContentRef = ref();
    const appStore = useAppStore();
    const settingStore = useSettingStore();
    const { setMainSwiperIndex } = settingStore;
    const swpierIndex = computed(() => settingStore.mainSwiperIndex);
    const state = reactive({
      inputFocus: false,
      appFocus: false,
      apps: [] as any[],
      rightMenuVisible: false,
      rightMenuPos: { x: 0, y: 0 },
      swiperX: 0,
      swiperList: [{}, {}],
      swiperClientWidth: 0,
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

    // app位置结束改变后执行
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

    const dragMove = () => (state.appFocus = true);

    const dragDown = () => (state.appFocus = false);

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

    // 控制轮播图的左右滑动
    let clientX = 0;
    let diffX = 0;

    const indexContentMouseDown = (e: MouseEvent) => {
      clientX = e.clientX;
      swiperListRef.value.style.transition = "none";
      window.addEventListener("mousemove", indexContentMouseMove);
      window.addEventListener("mouseup", indexContentMouseUp);
    };

    const indexContentMouseMove = (e: MouseEvent) => {
      diffX = e.clientX - clientX;
      state.swiperX = -state.swiperClientWidth * swpierIndex.value + diffX;

      swiperListRef.value.style.transform = `translateX(${state.swiperX}px)`;
    };

    const indexContentMouseUp = () => {
      if (diffX > 100 && swpierIndex.value > 0) {
        setMainSwiperIndex(swpierIndex.value - 1);
      } else if (
        diffX < -100 &&
        swpierIndex.value < state.swiperList.length - 1
      ) {
        setMainSwiperIndex(swpierIndex.value + 1);
      }

      swiperListRef.value.style.transition = "all 0.3s";
      swiperListRef.value.style.transform = `translateX(${
        -state.swiperClientWidth * swpierIndex.value
      }px)`;
      window.removeEventListener("mousemove", indexContentMouseMove);
    };

    onMounted(() => {
      if (appStore.apps.length === 0) {
        appStore.setApps(initApps(_.cloneDeep(config.defaultApps)));
        console.log(appStore.getApps);
      }
      state.apps = appStore.getApps;

      // 获取轮播图父级宽度
      state.swiperClientWidth = indexContentRef.value.clientWidth;
    });

    return {
      ...toRefs(state),
      backBoxRef,
      swiperListRef,
      indexContentRef,
      appStore,
      dragMove,
      dragDown,
      onBodyClick,
      autoSortApps,
      sortChangedApp,
      rightClick,
      onMouseDown,
      preventDefault,
      indexContentMouseDown,
      swpierIndex,
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

    .application-swiper-list {
      height: 100%;
      width: 100%;
    }

    .application-box {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 480px;
      width: 960px;
      border-radius: 12px;
      transform: translate(-50%, calc(-50% + 100px));

      &.vanish {
        transition: all 0.2s;
        opacity: 0;
        z-index: -1;
      }

      &.focus {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
}
</style>
