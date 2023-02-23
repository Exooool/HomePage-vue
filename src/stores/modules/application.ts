import { defineStore } from "pinia";
import { resolveAppPos } from "@/utils/appUtils";
import type { app } from "@/types/app";

const useAppStore = defineStore("application", {
  state: () => ({
    apps: [] as app[],
  }),
  getters: {
    getApps: (state) => resolveAppPos(state.apps),
  },
  actions: {
    setApps(apps: app[]) {
      this.apps = apps;
    },
  },
});

export default useAppStore;
