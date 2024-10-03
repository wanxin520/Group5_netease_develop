<script setup>
import { computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import MGCPlayList from "./MGCPlayList.vue";
import RCMDPlayList from "./RCMDPlayList.vue";
import OfficialPlayList from "./OfficialPlayList.vue";
import HotComment from "./HotComment.vue";
import BroadCast from "./BroadCast.vue";
import YunCunProduced from "./YunCunProduced.vue";
import RCMDStyle from "./RCMDStyle.vue";
import RCMDVoiceList from "./RCMDVoiceList.vue";
import NewAlumbNewSong from "./NewAlumbNewSong.vue";
import HotTopic from "./HotTopic.vue";
import MusicMlog from "./MusicMlog.vue";
import VideoPlayList from "./VideoPlayList.vue";
import MusicCalender from "./MusicCalender.vue";
import RCMDVoiceBook from "./RCMDVoiceBook.vue";


const blockTypeComponentMap = {
  HOMEPAGE_BLOCK_PLAYLIST_RCMD: RCMDPlayList, //  推荐歌单
  HOMEPAGE_BLOCK_STYLE_RCMD: RCMDStyle, // 为你定制精选歌曲
  HOMEPAGE_BLOCK_MGC_PLAYLIST: MGCPlayList, //网易云音乐的雷达歌单
  HOMEPAGE_VOICELIST_RCMD: RCMDVoiceList,  // 热门播客
  HOMEPAGE_BLOCK_HOT_TOPIC: HotTopic, //  热门话题
  HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: NewAlumbNewSong, // 新歌新碟
  HOMEPAGE_BLOCK_NEW_HOT_COMMENT: HotComment, // 热评歌曲
  HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: OfficialPlayList, //专属场景歌单
  HOMEPAGE_BLOCK_VIDEO_PLAYLIST: VideoPlayList, // 视频合辑
  HOMEPAGE_BLOCK_YUNCUN_PRODUCED: YunCunProduced, // 云村出品
  HOMEPAGE_MUSIC_CALENDAR: MusicCalender, // 音乐日历
  HOMEPAGE_MUSIC_MLOG: MusicMlog, // 精选音乐视频
  HOMEPAGE_PODCAST24: BroadCast, // 广播
  HOMEPAGE_VOICEBOOK_RCMD: RCMDVoiceBook, // 有声书
};
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
const route = useRoute()
const router = useRouter()
// 路由传参
const pushSearchId = (id) => {
  // 获取歌单的id和索引
  let query = { id: id }
  router.push({ name: "detail", query })
}

// 给子组件绑定自定义监听事件
const emit = defineEmits(["transmitePlaylistId", "transmiteSongId", "transmiteVideoId"])
const getPlaylistDetail = (id) => {
  // 获取歌单的id和索引
  let query = { id: id }
  router.push({ name: "listdetail", query })
}
const getSongDetail = (id) => {
  // 获取歌曲的id和索引
  // let query = { id: id }
  // router.push({ name: "detail", query })
}
const getVideoDetail = (id) => {
  // 获取视频的id和索引
  // let query = { id: id }
  // router.push({ name: "detail", query })
}

// console.log(props.data);

const propsData = computed(() => {
  switch (props.data.blockCode) {
    // 推荐歌单
    case "HOMEPAGE_BLOCK_PLAYLIST_RCMD":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          resourceId: item.resources[0].resourceId,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          creativeId: item.creativeId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          highQuality: item.resources[0].resourceExtInfo.highQuality,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          specialType: item.resources[0].resourceExtInfo.specialType,
        })),
      };
    // 为你定制精选歌曲
    case "HOMEPAGE_BLOCK_STYLE_RCMD":
      return {
        name: props.data.uiElement.subTitle.title,
        creatives: props.data.creatives,
      };
    // 网易云音乐的雷达歌单
    case "HOMEPAGE_BLOCK_MGC_PLAYLIST":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          resourceId: item.resources[0].resourceId,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          creativeId: item.creativeId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          highQuality: item.resources[0].resourceExtInfo.highQuality,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          specialType: item.resources[0].resourceExtInfo.specialType,
        })),
      };
    // 新歌新碟
    case "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG":
      return {
        name: props.data.uiElement.subTitle.title,
        creatives: props.data.creatives
      };
    // 专属场景歌单
    case "HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          resourceId: item.resources[0].resourceId,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          creativeId: item.creativeId,
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
    // 热门播客
    case "HOMEPAGE_VOICELIST_RCMD":
      return {
        name: props.data.creatives[0].uiElement.mainTitle.title,
        creatives: props.data.creatives
      };
    // 热评歌曲
    case "HOMEPAGE_BLOCK_NEW_HOT_COMMENT":
      // console.log(props.data);
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          resourceId: item.resources[0].resourceId,
          creativeId: item.creativeId,
          users: item.resources[0].resourceExtInfo.users,
          titleDesc: item.resources[0].uiElement.mainTitle.titleDesc,
          songData: item.resources[0].resourceExtInfo.songData,
          algReason: item.algReason,
          likedCount: item.resources[0].likedCount,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          replyCount: item.resources[0].replyCount
        })),
      };
    // 音乐日历
    case "HOMEPAGE_MUSIC_CALENDAR":
      // console.log(props.data);
      return {
        name: props.data.uiElement.subTitle.title,
        creatives: props.data.creatives
      };
    //  热门话题
    case "HOMEPAGE_BLOCK_HOT_TOPIC":
      return {
        name: props.data.uiElement.subTitle.title,
        creatives: props.data.creatives,
      };
    // 视频合辑
    case "HOMEPAGE_BLOCK_VIDEO_PLAYLIST":
      return {
        name: props.data.uiElement.subTitle.title,
        children: props.data.creatives.map((item) => ({
          resourceId: item.resources[0].resourceId,
          imageUrl: item.resources[0].uiElement.image.imageUrl,
          title: item.resources[0].uiElement.mainTitle.title,
        })),
        resourceExtInfo: props.data.creatives.map((item) => ({
          creativeId: item.creativeId,
          playCount: item.resources[0].resourceExtInfo.playCount,
          highQuality: item.resources[0].resourceExtInfo.highQuality,
          hasListened: item.resources[0].resourceExtInfo.hasListened,
          specialType: item.resources[0].resourceExtInfo.specialType,
        })),
      };
    // 有声书
    case "HOMEPAGE_VOICEBOOK_RCMD":
      return {
        name: props.data.dslData.home_old_common_title_n0ti5cy3af.title,
        item: props.data.dslData.items,
      };
    // 精选音乐视频
    case "HOMEPAGE_MUSIC_MLOG":
      return {
        name: props.data.uiElement.subTitle.title,
        extInfo: props.data.extInfo.map((item) => ({
          id: item.id,
          mlogBaseData: item.resource.mlogBaseData,
          userProfile: item.resource.userProfile,
          mlogExtVO: item.resource.mlogExtVO,
          shareUrl: item.resource.shareUrl
        })),
      };

    default:
      return null;
  }

  return [];
});
</script>

<template>
  <div>
    <component :is="blockTypeComponentMap[props.data.blockCode]" :data="propsData" @transmiteSongId="getSongDetail"
      @transmiteVideoId="getVideoDetail" @transmitePlaylistId="getPlaylistDetail"></component>
  </div>
</template>
