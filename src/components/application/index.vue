<template>
  <div
    :id="data?.id"
    ref="application"
    :class="['application-item', data?.size]"
    :style="`transform: translate(${data?.x}px,${data?.y}px)`"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <div class="application-content">
      <i v-if="data?.icon" class="application-icon">
        <img :src="backDynamicUrl(data.icon)" />
      </i>
      <Weather
        v-if="data?.type === 'component' && data.component === 'weather'"
      />
    </div>
    <div class="title">{{ data?.title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { adjustAppsPos, sortList } from "@/utils/appUtils";
import { useAppStore } from "@/stores";
import Weather from "./weather/weather.vue";
import _ from "lodash";
import type { app } from "@/types/app";

export default defineComponent({
  components: {
    Weather,
  },
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const application = ref();
    const appStore = useAppStore();
    const size = computed(() => {
      return props.data?.size ?? "small";
    });

    let clickStatus = true;

    // eslint-disable-next-line vue/no-setup-props-destructure
    const id = props.data?.id;
    var x = 0;
    var y = 0;
    var clientX = 0;
    var clientY = 0;
    var newApps: app[];
    const onMouseDown = (e: { clientX: number; clientY: number }) => {
      // 标记点击状态
      clickStatus = true;

      clientX = e.clientX;
      clientY = e.clientY;
      x =
        application.value.style.left === ""
          ? 0
          : parseInt(application.value.style.left.slice(0, -2));
      y =
        application.value.style.top === ""
          ? 0
          : parseInt(application.value.style.top.slice(0, -2));
      // 提高拖动元素层级
      application.value.style.zIndex = 10;
      application.value.style.transition = "none";
      window.addEventListener("mousemove", mousemove);
    };

    const mousemove = (event: { clientX: number; clientY: number }) => {
      // 标记点击状态
      clickStatus = false;

      const diffX = event.clientX - clientX;
      const diffY = event.clientY - clientY;
      const left = x + diffX;
      const top = y + diffY;
      application.value.style.left = left + "px";
      application.value.style.top = top + "px";
      // 调整
      const oldIndex = appStore.apps.findIndex((_) => _.id === id);
      const newIndex = adjustAppsPos(oldIndex, left, top);
      newApps = sortList(oldIndex, newIndex, appStore.apps);
      emit("posChange", { newApps, changeId: id });
      // _.throttle(() => {}, 500);
    };

    const onMouseUp = () => {
      if (clickStatus) onAppClick();

      if (!newApps) newApps = _.cloneDeep(appStore.getApps);

      emit("posChanged", { newApps, changeId: id });
      appStore.setApps(newApps);
      application.value.style.zIndex = 1;
      application.value.style.transition = "all 0.3s";
      application.value.style.left = "0px";
      application.value.style.top = "0px";
      window.removeEventListener("mousemove", mousemove);
    };

    const backDynamicUrl = (icon: any) => {
      console.log(icon);
      return new URL(
        `../../assets/applicationIcon/${icon}.png`,
        import.meta.url
      ).href;
    };

    const onAppClick = () => {
      const type = props.data?.type;
      switch (true) {
        case type === "website":
          window.open(props.data?.url, "_blank");
      }
    };

    return {
      size,
      application,
      onMouseDown,
      onMouseUp,
      backDynamicUrl,
      onAppClick,
    };
  },
});
</script>

<style lang="scss" scoped>
$base: ".application";
.application-item {
  position: absolute;
  transition: all 0.3s;
  left: 0;
  top: 0;
  user-select: none;
  z-index: 1;
  overflow: hidden;

  &:hover > .application-content {
    transform: translateY(-10px);
  }

  .application-content-style {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 8%);
    margin: 0 13px;
  }

  &.large {
    width: 240px;
    height: 240px;
    padding: 10px;
    box-sizing: border-box;

    .application-content {
      height: 194px;
      margin: 0 13px;
      transition: all 0.3s;
      // padding: 15px;
      cursor: pointer;
      @extend .application-content-style;
    }
  }

  &.small {
    width: 120px;
    height: 120px;
    padding: 10px;
    box-sizing: border-box;

    .application-content {
      width: 74px;
      height: 74px;
      margin: 0 13px;
      background-size: cover;
      background-position: 50%;
      background-color: hsla(0, 0%, 100%, 0.1);
      transition: all 0.3s;
      cursor: pointer;
      @extend .application-content-style;
    }
  }

  .title {
    cursor: pointer;
    text-align: center;
    color: #fff;
    height: 24px;
    padding-top: 5px;
    font-size: 13px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 2px 5px rgb(0 0 0 / 8%);
    font-weight: 450;
  }

  #{$base}-content {
    overflow: hidden;
  }

  #{$base}-icon {
    position: relative;
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      pointer-events: none;
    }
  }
}
</style>
