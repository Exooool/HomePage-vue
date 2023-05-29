<template>
  <div
    class="index-container"
    @contextmenu.prevent="rightClick"
    @mousedown="onMouseDown"
    @click="onBodyClick"
  >
    <div class="background-box" :class="focus ? 'focus' : ''">
      <!-- <video id="backVideo" autoplay loop muted></video> -->
      <img
        id="backImg"
        src="https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1672508644335-e2097539f42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
    </div>
    <div class="index-content">
      <!-- 搜索框 -->
      <div
        class="index-input-box"
        :class="focus ? 'focus' : ''"
        @click.stop="onInputClick"
        @contextmenu.stop="preventDefault"
      >
        <button
          class="engine-button"
          @focus="moreUrlBoxVisible = true"
          @blur="moreUrlBoxVisible = false"
        >
          <img :src="searchEngineList[searchEngineIndex].img" />
        </button>
        <input
          v-model="searchInputValue"
          type="text"
          @focus="onFocusInput"
          @keydown.enter="searchInputEnter"
        />
        <div class="more-url-box" :class="moreUrlBoxVisible ? 'show' : ''">
          <div
            v-for="(item, index) in searchEngineList"
            :key="index"
            class="more-url-item"
            @click="searchEngineChoose(index)"
          >
            <img :src="item.img" />
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="application-box" :class="focus ? 'vanish' : ''">
        <application
          v-for="(item, index) in apps"
          :key="index"
          :data="item"
          @posChange="autoSortApps"
          @posChanged="sortChangedApp"
        />
      </div>
    </div>
    <control-bar @contextmenu.stop="preventDefault" />
    <right-menu v-model:visible="rightMenuVisible" :position="rightMenuPos" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import Application from "@/components/application/index.vue";
import { resolveAppPos, initApps } from "@/utils/appUtils";
import ControlBar from "@/components/controlBar/index.vue";
import RightMenu from "@/components/menu/rightMenu.vue";
import { config } from "@/config/config";
import { useAppStore } from "@/stores";
import _ from "lodash";

export default defineComponent({
  components: {
    Application,
    RightMenu,
    ControlBar,
  },
  setup() {
    const backBoxRef = ref();
    const appStore = useAppStore();
    const state = reactive({
      searchEngineList: [
        {
          img: new URL(
            "@/assets/searchIcon/baidu.png",
            import.meta.url
          ).toString(),
          baseUrl: "https://www.baidu.com/s?wd=",
          title: "百度",
        },
        {
          img: new URL(
            "@/assets/searchIcon/google.png",
            import.meta.url
          ).toString(),
          baseUrl: "https://www.google.com/search?q=",
          title: "谷歌",
        },
      ] as { img: string; baseUrl: string; title: string }[],
      searchInputValue: "",
      searchEngineIndex: 0,
      focus: false,
      moreUrlBoxVisible: false,
      apps: [] as any[],
      rightMenuVisible: false,
      rightMenuPos: { x: 0, y: 0 },
    });

    const onFocusInput = () => {
      state.focus = true;
    };

    const onInputClick = () => {
      // console.log("input", e);
    };

    const onBodyClick = () => {
      // console.log("body", e);
      state.focus = false;
      state.rightMenuVisible = false;
    };

    /**
     * @description 获取搜索引擎点击的index
     * @param {number} index
     */
    const searchEngineChoose = (index: any) => {
      state.searchEngineIndex = index;
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

    // 搜索框回车键执行
    const searchInputEnter = () => {
      window.open(
        `${state.searchEngineList[state.searchEngineIndex].baseUrl}${
          state.searchInputValue
        }`,
        "blank"
      );
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
      onFocusInput,
      searchEngineChoose,
      onInputClick,
      onBodyClick,
      autoSortApps,
      sortChangedApp,
      rightClick,
      onMouseDown,
      preventDefault,
      searchInputEnter,
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

    // 输入框
    .index-input-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -240px);
      height: 50px;
      width: 260px;
      padding: 10px 15px 10px 50px;
      box-sizing: border-box;
      border-radius: 12px;
      position: absolute;
      background: rgba($color: #fff, $alpha: 0.65);
      transition: width 0.25s;
      z-index: 1;
      .engine-button {
        position: absolute;
        height: 50px;
        width: 50px;
        padding: 12px;
        left: 0;
        top: 0;
        cursor: pointer;
        img {
          height: 26px;
          width: 26px;
          object-fit: cover;
        }
      }

      input {
        height: 100%;
        width: 100%;
      }

      &.focus {
        width: 660px;
      }

      .more-url-box {
        position: absolute;
        display: flex;
        opacity: 0;
        left: 50%;
        top: calc(100% + 5px);
        transform: translateX(-50%) scale(0);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: rgba($color: #fff, $alpha: 0.65);
        backdrop-filter: blur(20px);
        transition: opacity 1s, transform 0.25s;

        &.show {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }
      }

      .more-url-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px 30px;
        width: 128px;
        box-sizing: border-box;
        border-radius: 8px;

        user-select: none;
        cursor: pointer;
        img {
          height: 26px;
          width: 26px;
        }

        .title {
          flex-grow: 1;
          display: block;
          margin-top: 5px;
        }

        &:hover {
          background-color: rgba($color: rgb(150, 150, 150), $alpha: 0.25);
        }
      }
    }

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
