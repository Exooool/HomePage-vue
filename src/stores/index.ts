import { createPinia } from "pinia";
import useAppStore from "./modules/application";
import useSettingStore from "./modules/setting";

const pinia = createPinia();

export { useAppStore, useSettingStore };
export default pinia;
