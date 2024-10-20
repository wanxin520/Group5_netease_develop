/**
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 * @注意 ：此页面的路由配置请勿改动
 */

export default [
  { path: "/", redirect: "/home/discover" },
  {
    path: "/home",
    component: () => import("@/views/HomePage.vue"),
    children: [
      // tabBar路由
      // 主页
      {
        path: "discover",
        // 主页圆形图标菜单栏的子路由
        children: [
          {
            path: "",
            name: "discover",
            component: () => import("@/views/TabBar/DiscoverBar.vue"),
          },
          // 主页
          // 每日推荐
          {
            path: "recommend",
            name: "recommend",
            component: () =>
              import("@/views/Pages/Discover/menu/Recommend.vue"),
          },
          // 私人FM
          {
            path: "personalfm",
            name: "personalfm",
            component: () =>
              import("@/views/Pages/Discover/menu/PersonalFM.vue"),
          },
          // 歌单
          {
            path: "personalized",
            name: "personalized",
            component: () =>
              import("@/views/Pages/Discover/menu/PersonaLized.vue"),
          },
          // 排行榜
          {
            path: "toplist",
            name: "toplist",
            component: () => import("@/views/Pages/Discover/menu/TopList.vue"),
          },
          // 有声书
          {
            path: "radiostation",
            name: "radiostation",
            component: () =>
              import("@/views/Pages/Discover/menu/RadioStation.vue"),
          },
          // 数字专辑
          {
            path: "albumList",
            name: "albumList",
            component: () =>
              import("@/views/Pages/Discover/menu/AlbumList.vue"),
          },
          // 关注新歌
          {
            path: "concernartist",
            name: "concernartist",
            component: () =>
              import("@/views/Pages/Discover/menu/ConcernArtist.vue"),
          },
          // 收藏家
          {
            path: "collector",
            name: "collector",
            component: () =>
              import("@/views/Pages/Discover/menu/Collector.vue"),
          },
          // 歌房
          {
            path: "musicroom",
            name: "musicroom",
            component: () =>
              import("@/views/Pages/Discover/menu/MusicRoom.vue"),
          },
          // 个人资料
          {
            path: "/datum",
            name: "GetUserDatum",
            component: () =>
              import("@/components/userInformation/get/GetUserDatum.vue"),
          },
        ],
      },
<<<<<<< HEAD
      {
        path: "podcast",
        name: "podcast",
        component: () => import("@/views/TabBar/MVBar.vue"),
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("@/views/TabBar/PersonalBar.vue"),
      },
      {
        path: "attention",
        name: "attention",
        component: () => import("@/views/TabBar/AttentionBar.vue"),
      },
      {
        path: "dynamic",
        name: "dynamic",
        component: () => import("@/views/TabBar/DynamicBar.vue"),
      },
=======
      { path: "mv", name: "mv", component: () => import("@/views/TabBar/MVBar.vue") },
      { path: "personal", name: "personal", component: () => import("@/views/TabBar/PersonalBar.vue") },
      { path: "attention", name: "attention", component: () => import("@/views/TabBar/AttentionBar.vue") },
      { path: "dynamic", name: "dynamic", component: () => import("@/views/TabBar/DynamicBar.vue") },
>>>>>>> feature/61
      // 歌单详情路由
      {
        path: "listdetail",
        name: "listdetail",
        component: () =>
          import("@/components/playListInfomation/SongListDetail.vue"),
      },

      // 歌单所有歌曲路由
      {
        path: "listallsongs",
        name: "listallsongs",
<<<<<<< HEAD
        component: () =>
          import("@/components/playListInfomation/getPlaylistAllSongs.vue"),
=======
        component: () => import("@/components/playListInfomation/GetPlaylistAllSongs.vue"),
      },
      // 获取视频详情路由
      {
        path: "videodetail",
        name: "videodetail",
        component: () => import("@/components/play/video/GetVideoData.vue"),
>>>>>>> feature/61
      },
    ],
  },
  // 登录路由
  {
    path: "/login",
    redirect: "/login/tourist",
    children: [
      // 二维码登录
      {
        path: "qrcode",
        name: "qrcode",
        component: () => import("@/views/Pages/Login/LoginByQRCode.vue"),
      },
      // 手机登录
      {
        path: "phone",
        name: "phone",
        component: () => import("@/views/Pages/Login/LoginByPhone.vue"),
      },
      // 邮箱登录
      {
        path: "email",
        name: "email",
        component: () => import("@/views/Pages/Login/LoginByEmail.vue"),
      },
      // 游客登录
      {
        path: "tourist",
        name: "tourist",
        component: () => import("@/views/Pages/Login/LoginByTourist.vue"),
      },
    ],
  },

  // 音乐详情页面（播放页面）
  // {
  //   path: "/musicdetail",
  //   name: "musicdetail",
  //   component: () => import("@/components/musicInfo/getMusicDetail.vue"),
  // },
];
