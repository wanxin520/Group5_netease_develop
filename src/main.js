import { createApp } from "vue";
import "@/style.css";
import "vant/lib/index.css";
// 导入vant(移动端组件库)组件
import Vant from 'vant';
import App from "@/App.vue";
import router from "./router";
import pinia from "./store";

import initErrorHandle from "@/utils/initErrorHandle";
initErrorHandle();


const app = createApp(App);
app.use(router)
app.use(Vant)
app.use(pinia)
app.mount("#app");