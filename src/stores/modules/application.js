import { defineStore } from "pinia";
import { resolveAppPos } from "@/utils/appUtils";

const useAppStore = defineStore("application", {
  state: () => ({
    apps: [],
  }),
  getters: {
    getApps: (state) => resolveAppPos(state.apps),
  },
  actions: {
    setApps(apps) {
      this.apps = apps;
    },
  },
});

export default useAppStore;
