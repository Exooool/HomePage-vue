import { defineStore } from "pinia";

const useSettingStore = defineStore("setting", {
  state: () => ({
    mainSwiperIndex: 0,
  }),
  getters: {
    getMainSwiperIndex: (state) => state.mainSwiperIndex,
  },
  actions: {
    setMainSwiperIndex(index: number) {
      this.mainSwiperIndex = index;
    },
  },
});

export default useSettingStore;
