/**
 * @注意 ：此页面的路由配置请勿改动
*/

import { createWebHistory, createRouter } from "vue-router";
import localforage from "localforage";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to.fullPath);
  // 如果还没有登录就跳转至登录页面
  if (to.fullPath.startsWith("/homepage")){
    next()
  }else if (!to.fullPath.startsWith("/login")) {
    localforage.getItem("userInfo")
      .then((data) => {
        data.cookie ? next() : next(`/login/phone?originPath=${to.fullPath}`)
      })
      .catch((err) => {
        console.log(err)
        next(`/login/phone?originPath=${to.fullPath}`)
      })
  } else {
    next()
  }
})
export default router;
