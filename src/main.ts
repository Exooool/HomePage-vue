import { createApp } from "vue";
import pinia from "./stores";

import App from "./App.vue";
import router from "./router";

import "@/styles/global.scss";

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(createVuestic());

app.mount("#app");
