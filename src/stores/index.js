import { createPinia } from "pinia";
import useAppStore from "./modules/application";

const pinia = createPinia();

export { useAppStore };
export default pinia;
