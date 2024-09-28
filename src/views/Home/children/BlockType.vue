<script setup>
import { computed, defineProps } from "vue";
import Banner from "@/views/Home/children/Banner.vue";
import MenuPage from "@/views/Home/children/MenuPage.vue";
import MGCPlayList from "./MGCPlayList.vue";
import RCMDPlayList from "./RCMDPlayList.vue";
import OfficialPlayList from "./OfficialPlayList.vue";
import BroadCast from "./BroadCast.vue";
import YunCunProduced from "./YunCunProduced.vue";
import RCMDStyle from "./RCMDStyle.vue";

const blockTypeComponentMap = {
  HOMEPAGE_BANNER: Banner, // 轮播图
  HOMEPAGE_BLOCK_OLD_DRAGON_BALL: MenuPage, // 圆形图标
  HOMEPAGE_BLOCK_PLAYLIST_RCMD: RCMDPlayList, //  推荐歌单
  HOMEPAGE_BLOCK_STYLE_RCMD: RCMDStyle, // 为你定制精选歌曲
  HOMEPAGE_BLOCK_MGC_PLAYLIST: MGCPlayList, //网易云音乐的雷达歌单
  HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: OfficialPlayList, //专属场景歌单
  HOMEPAGE_BLOCK_YUNCUN_PRODUCED: YunCunProduced, // 云村出品
  HOMEPAGE_PODCAST24: BroadCast, // 广播
  // HOMEPAGE_BLOCK_NEW_HOT_COMMENT: HotComment, // 热评歌曲
};
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
// console.log(props.data);

const propsData = computed(() => {
  switch (props.data.blockCode) {
    // 首页圆形图标菜单
    case "HOMEPAGE_BLOCK_OLD_DRAGON_BALL":
      return props.data.creatives[0].resources.map((item) => ({
        name: item.uiElement.mainTitle.title,
        iconUrl: item.uiElement.image.imageUrl,
      }));
    // 轮播图
    case "HOMEPAGE_BANNER":
      return props.data.extInfo.banners;
    // 推荐歌单
    case "HOMEPAGE_BLOCK_PLAYLIST_RCMD":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          id: item.resources[0].resourceId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          id: item.creativeId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          highQuality: item.resources[0].resourceExtInfo.highQuality,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          specialType: item.resources[0].resourceExtInfo.specialType,
        })),
      };
    // 为你定制精选歌曲
    case "HOMEPAGE_BLOCK_STYLE_RCMD":
      // console.log(props.data)
      return {
        name: props.data.uiElement.subTitle.title,
        creatives: props.data.creatives,
      };

    // 网易云音乐的雷达歌单
    case "HOMEPAGE_BLOCK_MGC_PLAYLIST":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          id: item.resources[0].resourceId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          id: item.creativeId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          highQuality: item.resources[0].resourceExtInfo.highQuality,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          specialType: item.resources[0].resourceExtInfo.specialType,
        })),
      };
    // 专属场景歌单
    case "HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          id: item.resources[0].resourceId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          id: item.creativeId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          highQuality: item.resources[0].resourceExtInfo.highQuality,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          specialType: item.resources[0].resourceExtInfo.specialType,
        })),
      };
    // 云村出品
    case "HOMEPAGE_BLOCK_YUNCUN_PRODUCED":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          id: item.resources[0].resourceId,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
      };
    // 24小时广播
    case "HOMEPAGE_PODCAST24":
      // console.log(props.data);
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives[0].resources.map((item) => ({
          imageUrl: item.uiElement.image.imageUrl,
          title: item.uiElement.mainTitle.title,
        })),
      };
    default:
      return null;
  }
  return [];
});
console.log(props.data);
</script>

<template>
  <div>
    <component
      :is="blockTypeComponentMap[props.data.blockCode]"
      :data="propsData"
    ></component>
  </div>
</template>
