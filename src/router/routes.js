/**
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
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
      // 二维码登录
      { path: "qrcode", name: "qrcode", component: () => import("@/views/Login/LoginByQRCode.vue") },
      // 手机登录
      { path: "phone", name: "phone", component: () => import("@/views/Login/LoginByPhone.vue") },
      // 邮箱登录
      { path: "email", name: "email", component: () => import("@/views/Login/LoginByEmail.vue"), },
      // 游客登录
      { path: "tourist", name: "tourist", component: () => import("@/views/Login/LoginByTourist.vue") },
    ],
  },

  // HomePage页面
  {
    path: "/homepage",
    // 主页圆形图标菜单栏的子路由
    children: [
      // 主页
      { path: "", name: "homepage", component: () => import("@/views/Home/HomePage.vue") },
      // 每日推荐
      { path: "recommend", name: "recommend", component: () => import("@/views/Home/menu/Recommend.vue") },
      // 私人FM
      { path: "personalfm", name: "personalfm", component: () => import("@/views/Home/menu/PersonalFM.vue") },
      // 歌单
      { path: "personalized", name: "personalized", component: () => import("@/views/Home/menu/PersonaLized.vue") },
      // 排行榜
      { path: "toplist", name: "toplist", component: () => import("@/views/Home/menu/TopList.vue") },
      // 有声书
      { path: "radiostation", name: "radiostation", component: () => import("@/views/Home/menu/RadioStation.vue") },
      // 数字专辑
      { path: "albumList", name: "albumList", component: () => import("@/views/Home/menu/AlbumList.vue") },
      // 关注新歌
      { path: "concernartist", name: "concernartist", component: () => import("@/views/Home/menu/ConcernArtist.vue") },
      // 收藏家
      { path: "collector", name: "collector", component: () => import("@/views/Home/menu/Collector.vue") }
    ]

  },

  // 主页圆形图标菜单子路由
];
