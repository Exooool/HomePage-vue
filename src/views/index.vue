<template>
  <div class="index-container" @contextmenu.prevent @click="onBodyClick">
    <div class="background-box" :class="focus ? 'focus' : ''">
      <!-- <video id="backVideo" autoplay loop muted></video> -->
      <img
        id="backImg"
        src="https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1672508644335-e2097539f42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
    </div>
    <div class="index-content">
      <div
        class="index-input-box"
        :class="focus ? 'focus' : ''"
        @click.stop="onInputClick"
      >
        <button
          class="engine-button"
          @focus="moreUrlBoxVisible = true"
          @blur="moreUrlBoxVisible = false"
        >
          <img :src="searchEngineList[searchEngineIndex].img" />
        </button>
        <input type="text" @focus="onFocusInput" />
        <div class="more-url-box" :class="moreUrlBoxVisible ? 'show' : ''">
          <div
            v-for="(item, index) in searchEngineList"
            class="more-url-item"
            @click="searchEngineChoose(index)"
          >
            <img :src="item.img" />
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="application-box">
        <application
          v-for="(item, index) in apps"
          :key="index"
          :data="item"
          @posChange="autoSortApps"
          @posChanged="sortChangedApp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  computed,
  onMounted,
} from "vue";
import Application from "@/components/application/index.vue";
import { resolveAppPos, initApps } from "@/utils/appUtils";
import { config } from "@/config/config";
import { useAppStore } from "@/stores";
import _ from "lodash";

export default defineComponent({
  components: {
    Application,
  },
  setup() {
    const backBoxRef = ref();
    const appStore = useAppStore();
    const state = reactive({
      searchEngineList: [
        {
          img: new URL("@/assets/searchIcon/baidu.png", import.meta.url),
          baseUrl: "https://www.baidu.com/",
          title: "百度",
        },
        {
          img: new URL("@/assets/searchIcon/google.png", import.meta.url),
          baseUrl: "https://www.google.com/",
          title: "谷歌",
        },
      ],
      searchEngineIndex: 0,
      focus: false,
      moreUrlBoxVisible: false,
      apps: [],
    });

    const onFocusInput = () => {
      state.focus = true;
    };

    const onInputClick = (e) => {
      // console.log("input", e);
    };

    const onBodyClick = (e) => {
      // console.log("body", e);
      state.focus = false;
    };

    /**
     * @description 获取搜索引擎点击的index
     * @param {number} index
     */
    const searchEngineChoose = (index) => {
      state.searchEngineIndex = index;
    };

    /**
     *
     * @param {Array} newApps
     */
    const autoSortApps = ({ newApps, changeId }) => {
      const resolvedApps = resolveAppPos(newApps);
      resolvedApps.forEach((app) => {
        if (app.id !== changeId) {
          const appDom = document.getElementById(app.id);
          appDom.style.transform = `translate(${app.x}px,${app.y}px)`;
        }
      });
    };

    /**
     * 
     * @param {*} param0 
     */
    const sortChangedApp = ({ newApps, changeId }) => {
      // console.log('changed')
      const resolvedApps = resolveAppPos(newApps);
      resolvedApps.forEach((app) => {
        if (app.id === changeId) {
          const appDom = document.getElementById(app.id);
          appDom.style.transform = `translate(${app.x}px,${app.y}px)`;
        }
      });
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
      border-radius: 4px;
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
        width: 460px;
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
    }
  }
}
</style>
