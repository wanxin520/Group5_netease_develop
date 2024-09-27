/**
 * @注意 ：此页面的路由配置请勿改动
*/

import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  next();
});

export default router;
