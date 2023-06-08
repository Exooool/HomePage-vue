<template>
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
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    focus: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  setup(props, { emit }) {
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
      inputFocus: false,
      moreUrlBoxVisible: false,
    });

    /**
     * @description 获取搜索引擎点击的index
     * @param {number} index
     */
    const searchEngineChoose = (index: any) => {
      state.searchEngineIndex = index;
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

    const onInputClick = () => {
      // console.log("input", e);
    };

    const preventDefault = (e: MouseEvent) => {
      e.preventDefault();
    };

    const onFocusInput = () => {
      state.inputFocus = true;
      emit("update:focus", true);
    };

    return {
      ...toRefs(state),
      searchEngineChoose,
      searchInputEnter,
      onInputClick,
      onFocusInput,
      preventDefault,
    };
  },
});
</script>

<style lang="scss" scoped>
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
</style>
