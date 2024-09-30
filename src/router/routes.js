/**
 * @注意 ：此页面的路由配置请勿改动
 */

export default [
  { path: "/", redirect: "/homepage" },
  // 登录路由
  {
    path: "/login",
    name: "login",
    children: [
      { path: "/login", redirect: "/login/phone" },
      {
        path: "qrcode",
        name: "qrcode",
        component: () => import("@/views/login/LoginByQRCode.vue"),
      },
      {
        path: "phone",
        name: "phone",
        component: () => import("@/views/login/LoginByPhone.vue"),
      },
      {
        path: "email",
        name: "email",
        component: () => import("@/views/login/LoginByEmail.vue"),
      },
      {
        path: "tourist",
        name: "tourist",
        component: () => import("@/views/login/LoginByTourist.vue"),
      },
    ],
  },
  // 主页
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("@/views/Home/HomePage.vue"),
  },
];
