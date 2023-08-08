import { defineStore } from "pinia";
import { resolveAppPos } from "@/utils/appUtils";
import type { app } from "@/types/app";

const useAppStore = defineStore("application", {
  state: () => ({
    apps: [] as app[],
    categrories: [],
  }),
  getters: {
    getApps: (state) => resolveAppPos(state.apps),
    getCategrories: (state) => state.categrories,
  },
  actions: {
    setApps(apps: app[]) {
      this.apps = apps;
    },
    delApp(appId: string) {
      const appIndex = this.apps.findIndex((app) => app.id === appId);
      this.apps.slice(appIndex, 1);
    },
  },
});

export default useAppStore;
