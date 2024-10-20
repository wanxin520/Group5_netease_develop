<script setup>
import { ref, watch, reactive } from "vue"
import { useRequest } from "vue-request";
import { getPlaylistDetail } from "@/api/songIndex";
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
import SongListHandler from "./SongListHandler.vue";
import BottomPlayBar from "../play/music/BottomPlayBar.vue";


// 获取歌单搜索id
const route = useRoute()
const router = useRouter()
const allSourceIds = ref()
const { run, data, loading } = useRequest(() => getPlaylistDetail({
  id: route.query.id
}))
if (route.query.id) {
  run()
}
watch(data, () => {
  // console.log(allSourceIds.value);
})

// 监听屏幕滚动事件
const scrollDate = ref()
const bgimg = ref()
const scroll = () => {
  scrollDate.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  scrollDate.value > 150 ? bgimg.value = data.value.playlist.creator.backgroundUrl : bgimg.value = null
}
// 返回上一个页面
const toBack = () => {
  router.go(-1)
}
</script>
<template>
  <div v-if="!loading">
    <div class="w-[100%] flex flex-col justify-around"
      :style="{ backgroundImage: `url(${data.playlist.creator.backgroundUrl})` }"
      style="background-repeat: no-repeat; background-size: cover;">
      <!-- top -->
      <van-sticky @scroll="scroll">
        <div class="w-[100%] h-[10vh] flex justify-between items-center text-[#ffffff]"
          :style="{ backgroundImage: `url(${bgimg})` }">
          <div @click="toBack" class="flex  text-[15px] ">
            <Icon icon="iconamoon:arrow-left-2-light" width="1.5rem" />
            <div class="flex justify-center item-center"><span>歌单</span></div>
          </div>
          <div v-if="bgimg" class=" font-bold text-[14px] text-[#ffffff]">
            {{ data.playlist.name }}
          </div>
          <div class="flex justify-between items-center ">
            <div class="flex">
              <Icon icon="ic:twotone-search" width="1.5rem" class=" mx-2" />
              <Icon icon="material-symbols:more-vert" width="1.5rem" />
            </div>
          </div>
        </div>
      </van-sticky>
      <!-- banner -->
      <div class="flex w-[100%] items-start justify-start">
        <div class="mx-1 flex justify-center items-center rounded-[30px] relative">
          <img class="w-[6rem] h-[6rem] rounded-[1rem]" :src="data.playlist.coverImgUrl" alt="">
          <div class=" absolute text-[#ffffffd8] flex justify-center items-center self-start left-12 top-2 text-[8px]">
            <Icon icon="fluent:play-28-filled" />
            <div v-if="data.playlist.playCount > 100000000" class="ml-1">
              {{ data.playlist.playCount > 10000 ? (data.playlist.playCount / 100000000).toFixed(1) + "亿" :
              data.playlist.playCount }}
            </div>
            <div v-else-if="data.playlist.playCount > 10000" class="ml-1">
              {{ data.playlist.playCount > 10000 ? (data.playlist.playCount / 10000).toFixed(2) + "万" :
              data.playlist.playCount }}
            </div>
            <div v-else class="ml-1">
              {{ data.playlist.playCount }}
            </div>
          </div>
        </div>
        <div class="h-[100%] flex flex-col ml-2 justify-start items-start">
          <div class="text-[#ffffff] text-[14px] font-semibold mb-1">
            <span> {{ data.playlist.name }} </span>
          </div>
          <div class="w-[100%] flex justify-start items-center relative">
            <img class="flex justify-center items-center w-[1.6rem] h-[1.6rem] rounded-[50%]"
              :src="data.playlist.creator.avatarUrl" alt="">
            <img v-if="data.playlist.creator.avatarDetail"
              class="flex justify-center items-center w-[0.8rem] h-[0.8rem] rounded-[50%] absolute top-4 left-4"
              :src="(data.playlist.creator.avatarDetail.identityIconUrl)" alt="">
            <div class="h-[100%] flex justify-center items-center mx-2 text-[#d8d8d8] text-[10px] ">
              {{ data.playlist.creator.nickname }}</div>
            <div
              class=" flex justify-center items-center ml-1 w-[2rem] h-[1rem] rounded-[5px] text-[10px] text-[#ffffff] bg-[#ffffff31]">
              + 关注
            </div>
          </div>
          <div class="flex w-[100%] h-[3vh] justify-start mt-3">
            <div v-for="item in data.playlist.tags"
              class=" flex justify-center items-center w-[2rem] h-[1rem] rounded-[5px] text-[white] bg-[#ffffff38] text-[9px]">
              <div>{{ item }}</div>
              <Icon icon="weui:arrow-outlined" class="ml-[1px]" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-[100%] flex justify-start mt-5 items-center text-[#ffffff] font-mono text-[12px] ">
        <span class="flex justify-center items-center overflow-hidden text-ellipsis whitespace-nowrap ml-3">
          {{ data.playlist.description }}
        </span>
        <div>
          <Icon icon="weui:arrow-outlined" width="0.6rem" class="mr-3" />
        </div>
      </div>
      <div class="flex justify-around items-center mt-3 mb-5 text-[11px]">
        <div class="flex justify-center items-center w-[6rem] h-[2rem] rounded-[1rem] text-[#ffffff] bg-[#ffffff5b]">
          <Icon icon="mingcute:share-forward-fill" />
          <span v-if="data.playlist.shareCount > 10000" class=" mx-1">{{ (data.playlist.shareCount /
            10000).toFixed(1) + "万" }}</span>
          <span v-else class=" mx-1">{{ data.playlist.shareCount }}</span>
        </div>
        <div class="flex justify-center items-center w-[6rem] h-[2rem] rounded-[1rem] text-[#ffffff] bg-[#ffffff5e]"
          style="background-color: rgba(255, 255, 255,0.2);">
          <Icon icon="eva:message-circle-fill" />
          <span v-if="data.playlist.commentCount > 10000" class=" mx-1">{{ (data.playlist.commentCount /
            10000).toFixed(1) + "万" }}</span>
          <span v-else class=" mx-1">{{ data.playlist.commentCount }}</span>
        </div>
        <div class="flex justify-center items-center w-[6rem] h-[2rem] rounded-[1rem] text-[#ffffff] bg-[#ff4646]">
          <Icon icon="mingcute:new-folder-fill" />
          <span v-if="data.playlist.subscribedCount > 10000" class=" mx-1">{{ (data.playlist.subscribedCount /
            10000).toFixed(1) + "万" }}</span>
          <span v-else class=" mx-1">{{ data.playlist.subscribedCount }}</span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div>
      <SongListHandler :tracks="data.playlist.tracks" :trackIds="data.playlist.trackIds"></SongListHandler>
    </div>
    <van-sticky :offset-bottom="0" position="bottom">
      <BottomPlayBar></BottomPlayBar>
    </van-sticky>
  </div>
</template>
<style scoped></style>