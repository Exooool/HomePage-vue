import type { app } from "@/types/app";
import _ from "lodash";
// 生成唯一ID
function generateRandom() {
  return Math.random().toString(16).slice(2);
}

/**
 * @description 为每一个app添加id
 * @param {Array} apps
 * @returns
 */
export const initApps = (apps: app[]) => {
  return apps.map((app) => {
    return {
      ...app,
      id: generateRandom(),
    };
  });
};

/**
 * @description 解析每个app位置所在
 * @param {Array} apps
 */
export const resolveAppPos = (apps: app[]) => {
  // app宽高
  const appMainHeight = 480;
  const appMainWidth = 960;
  const appAttr = {
    small: 120,
    large: 240,
  };

  const flagList: boolean[] = [];
  const resolvedApps = apps.map((app) => {
    let index = 0;

    while (flagList[index]) {
      ++index;
    }
    let rows = Math.trunc(index / 8);
    if (app.size === "small") {
      flagList[index] = true;
    } else if (app.size === "large") {
      flagList[index] = true;
      flagList[index + 1] = true;
      flagList[index + 8] = true;
      flagList[index + 9] = true;
    }

    return {
      ...app,
      x: (index % 8) * 120,
      y: rows * 120,
    };
  });

  return resolvedApps;
};

/**
 * @description 处理app移动后的位置
 * @param {number} index
 * @param {number} left
 * @param {number} top
 * @returns index
 */
export const adjustAppsPos = (index: number, left: number, top: number) => {
  const leftIndex = Math.trunc(left / 120);
  const topIndex = Math.trunc(top / 120) * 8;
  return index + leftIndex + topIndex;
};

/**
 *
 * @param {number} oldIndex
 * @param {number} newIndex
 * @param {Array} list
 */
export const sortList = (oldIndex: number, newIndex: number, list: any[]) => {
  const cloneList = _.cloneDeep(list);
  if (oldIndex > newIndex) {
    const sortObj = cloneList.splice(oldIndex, 1);
    const beforeList = cloneList.slice(0, newIndex);
    const afterList = cloneList.slice(newIndex);
    return beforeList.concat(sortObj).concat(afterList);
  } else if (oldIndex < newIndex) {
    const sortObj = cloneList.splice(oldIndex, 1);
    const beforeList = cloneList.slice(0, newIndex - 1);
    const afterList = cloneList.slice(newIndex - 1);
    return beforeList.concat(sortObj).concat(afterList);
  } else {
    return cloneList;
  }
};
