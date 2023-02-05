import { createApp } from "vue";
import pinia from "./stores";

import App from "./App.vue";
import router from "./router";

// 引入vuestic
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import "@/styles/global.scss";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(createVuestic());

app.mount("#app");
