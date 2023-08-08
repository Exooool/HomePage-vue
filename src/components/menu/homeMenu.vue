<template>
  <div
    v-if="visible"
    class="mask"
    @click.stop="$emit('update:visible', false)"
  ></div>
  <div :class="['home-menu-box', visible ? 'visible' : '']">
    <div class="setting-container">
      <!-- 基本 -->
      <div :class="['setting-item', menuActive === 0 ? 'active' : '']">
        <div class="general-setting">
          <div
            v-for="(group, groupIndex) in generalSetting"
            :key="groupIndex"
            class="setting-group"
          >
            <span class="group-title">{{ group.groupTitle }}</span>
            <div
              v-for="(child, childIndex) in group.groupChildren"
              :key="childIndex"
              class="group-item"
            >
              <div class="item-title">{{ child.childTitle }}</div>
              <div class="item-input">
                <a-select
                  v-if="child.type === 'select'"
                  v-model:value="setting[child.value]"
                  style="width: 120px"
                >
                  <a-select-option
                    v-for="(item, index) in child.options"
                    :key="index"
                    :value="item.value"
                    >{{ item.label }}</a-select-option
                  >
                </a-select>

                <a-switch
                  v-if="child.type === 'switch'"
                  v-model:checked="setting[child.value]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 壁纸 -->
      <div :class="['setting-item', menuActive === 1 ? 'active' : '']">
        <div class="wallpaper-setting">
          <div v-for="item in 12" :key="item" class="img-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1673264933445-0112f3cdcb2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 搜索引擎 -->
      <div :class="['setting-item', menuActive === 2 ? 'active' : '']">
        <div class="search-setting">
          <a-checkbox-group v-model:value="setting.searchList">
            <label
              v-for="(searchItem, index) in serachSetting"
              :key="index"
              class="search-item"
            >
              <span class="title">{{ searchItem.label }}</span
              ><a-checkbox :value="searchItem.value" />
            </label>
          </a-checkbox-group>
        </div>
      </div>
      <!-- 消息通知 -->
      <div></div>
      <!-- 关于 -->
      <div></div>
    </div>
    <div class="menu-divider"></div>
    <div class="user-container">
      <div class="user-info">
        <div class="user-avatar">
          <i-system-uicons-user-male-circle
            style="font-size: 36px; color: white"
          />
          <img src="" alt="" />
        </div>
        <div class="user-name">未登录</div>
      </div>

      <div class="setting-tabs-wrapper">
        <div class="setting-tabs">
          <div
            v-for="(tab, tabIndex) in settingTabs"
            :key="tabIndex"
            :class="['tab-item', menuActive === tab.value ? 'active' : '']"
            @click="menuActive = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: () => true,
    },
  },
  emits: ["update:visible"],
  setup() {
    const state = reactive({
      menuActive: 0,
      setting: {
        bottomControl: 2,
        searchOpenWay: 1,
        searchAdvice: false,
        searchHistory: false,
        searchTab: false,
        searchSave: false,
        searchList: [],
      } as Record<string, any>,
    });

    const settingTabs = [
      { label: "基本", value: 0 },
      { label: "壁纸", value: 1 },
      { label: "搜索引擎", value: 2 },
      { label: "消息通知", value: 3 },
      { label: "关于", value: 4 },
    ];

    // 基本
    const generalSetting = [
      {
        groupTitle: "控制栏",
        groupChildren: [
          {
            childTitle: "底部控制栏",
            type: "select",
            value: "bottomControl",
            options: [
              {
                label: "自动隐藏",
                value: 1,
              },
              {
                label: "显示",
                value: 2,
              },
            ],
          },
        ],
      },
      {
        groupTitle: "图标",
        groupChildren: [
          {
            childTitle: "打开方式",
            type: "select",
            value: "searchOpenWay",
            options: [
              {
                label: "新建标签",
                value: 1,
              },
              {
                label: "当前标签",
                value: 2,
              },
            ],
          },
          {
            childTitle: "图标尺寸",
            type: "select",
            value: "searchOpenWay",
            options: [
              {
                label: "自动",
                value: 1,
              },
              {
                label: "大",
                value: 2,
              },
              {
                label: "中",
                value: 3,
              },
              {
                label: "小",
                value: 4,
              },
            ],
          },
          {
            childTitle: "隐藏添加图标",
            type: "switch",
            value: "searchAdvice",
          },
          {
            childTitle: "隐藏图标名称",
            type: "switch",
            value: "searchHistory",
          },
          {
            childTitle: "滚动触发翻页",
            type: "switch",
            value: "searchTab",
          },
          {
            childTitle: "使用系统默认字体",
            type: "switch",
            value: "searchSave",
          },
        ],
      },
      {
        groupTitle: "搜索",
        groupChildren: [
          {
            childTitle: "打开方式",
            type: "select",
            value: "searchOpenWay",
            options: [
              {
                label: "新建标签",
                value: 1,
              },
              {
                label: "当前标签",
                value: 2,
              },
            ],
          },
          {
            childTitle: "搜索建议",
            type: "switch",
            value: "searchAdvice",
          },
          {
            childTitle: "搜索历史",
            type: "switch",
            value: "searchHistory",
          },
          {
            childTitle: "Tab键切换搜索引擎",
            type: "switch",
            value: "searchTab",
          },
          {
            childTitle: "保留搜索框内容",
            type: "switch",
            value: "searchSave",
          },
        ],
      },
    ];

    const serachSetting = [
      {
        label: "百度",
        value: "baidu",
      },
      {
        label: "必应",
        value: "bing",
      },
      {
        label: "谷歌",
        value: "google",
      },
      {
        label: "360搜索",
        value: "360",
      },
    ];

    return {
      ...toRefs(state),
      generalSetting,
      serachSetting,
      settingTabs,
    };
  },
});
</script>

<style lang="scss" scoped>
.mask {
  pointer-events: all;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.35);
}
.home-menu-box {
  z-index: 1;
  position: absolute;
  pointer-events: all;
  bottom: 70px;
  left: 50%;
  height: 65vh;
  width: 65vw;
  display: flex;
  max-height: 600px;
  min-height: 500px;
  max-width: 720px;
  min-width: 560px;
  border-radius: 12px;
  background: rgba($color: #fff, $alpha: 0.85);
  backdrop-filter: blur(10px);
  transform-origin: left bottom;
  // transform: translate(-50%, calc(-100% - 12px)) scale(0.2);

  // transform: translate(-50%, calc(-100% - 12px));
  transform: translate(-50%, 12px) scale(0.2);
  transition: all 0.25s;
  opacity: 0;
  overflow: hidden;
  visibility: hidden;

  &.visible {
    transform: translateX(-50%);
    opacity: 1;
    visibility: visible;
  }

  .menu-divider {
    height: 100%;
    width: 1px;
    background: rgba($color: #000000, $alpha: 0.2);
  }

  .setting-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 28px 32px;
    &::-webkit-scrollbar {
      display: none;
    }

    .setting-item {
      // display: none;
      height: 0;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transform: translateX(-100%);
      transition: all 0.25s ease-in-out;
      &.active {
        height: auto;
        display: block;
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }

    .general-setting {
      .setting-group {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
        padding: 12px 0;
        .group-title {
          font-size: 18px;
          font-weight: bold;
        }
      }

      .group-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        .item-title {
          font-size: 14px;
        }
      }
    }

    .wallpaper-setting {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      .img-item {
        height: 120px;
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
        &:hover img {
          transform: scale(1.1);
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: all 0.2s;
          cursor: pointer;
        }
      }
    }

    .search-setting {
      display: flex;
      flex-direction: column;
      .search-item {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
        border-radius: 6px;
        &:hover {
          background: rgba($color: #000000, $alpha: 0.1);
        }
      }
    }

    @media screen and (min-width: 1050px) {
      .wallpaper-setting {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
  .user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    padding: 12px 0;
    .user-info {
      border-radius: 6px;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      padding: 6px 18px;
      &:hover {
        background: rgba($color: #fff, $alpha: 0.65);
      }
      .user-avatar {
        background: rgba($color: #000000, $alpha: 0.1);
        height: 36px;
        width: 36px;
        border-radius: 18px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .user-name {
        margin-left: 6px;
        font-size: 14px;
        color: rgba($color: #000000, $alpha: 0.8);
      }
    }

    .setting-tabs {
      &-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .tab-item {
        height: 36px;
        width: 120px;
        cursor: pointer;
        border-radius: 6px;
        line-height: 36px;
        padding: 0 8px;
        margin: 4px 0;
        font-size: 14px;
        transition: all 0.2s;

        &.active,
        &:hover {
          background: #fff;
        }
      }
    }
  }
}

:deep() {
  .ant-select:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  .ant-select-selection-item {
    text-align: right;
  }
}
</style>
