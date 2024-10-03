<script setup>
import { ref, watch } from "vue"
import { useRequest } from "vue-request";
import { getPlaylistDetail } from "@/api/songIndex";
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
import SongListHandler from "./SongListHandler.vue";

const { data, loading } = useRequest(() => getPlaylistDetail({ id: "24381616" }))

watch(data, () => {
  console.log(data.value.playlist);
})

</script>
<template>
  <div>
    <div v-if="!loading" class="w-[100%] flex flex-col justify-around"
      :style="{ backgroundImage: `url(${data.playlist.creator.backgroundUrl})` }"
      style="background-repeat: no-repeat; background-size: cover;">
      <!-- top -->
      <div class="w-[100%] h-[10vh] flex justify-between items-center text-[#ffffff] ">
        <div @click="toBack" class="flex  text-[15px] ">
          <Icon icon="iconamoon:arrow-left-2-light" width="1.5rem" />
          <div class="flex justify-center item-center"><span>歌单</span></div>
        </div>
        <div class="flex justify-between items-center ">
          <div class="flex">
            <Icon icon="ic:twotone-search" width="1.5rem" class=" mx-2" />
            <Icon icon="material-symbols:more-vert" width="1.5rem" />
          </div>
        </div>
      </div>
      <!-- banner -->
      <div class="flex w-[100%] items-start justify-start">
        <div class="mx-1 flex justify-center items-center rounded-[30px] relative">
          <img class="w-[6rem] h-[6rem] rounded-[1rem]" :src="data.playlist.coverImgUrl" alt="">
          <div class=" absolute text-[#ffffffd8] flex justify-center items-center self-start left-12 top-2 text-[10px]">
            <Icon icon="fluent:play-28-filled" />
            <div class="ml-1">
              {{ data.playlist.playCount }}
            </div>
          </div>
        </div>
        <div class="h-[100%] flex flex-col ml-2 justify-start items-start">
          <div class="text-[#ffffff] text-[14px] font-semibold mb-1">
            <span> {{ data.playlist.name }} </span>
          </div>
          <div class="w-[100%] flex justify-start items-center">
            <img class="flex justify-center items-center w-[1.6rem] h-[1.6rem] rounded-[50%]"
              :src="data.playlist.creator.avatarUrl" alt="">

            <img v-if="data.playlist.creator.avatarDetail"
              class="flex justify-center items-center w-[2rem] rounded-[50%]"
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
      <div class="flex justify-around items-center mt-3 mb-5">
        <div class="flex justify-center items-center w-[6rem] h-[2rem] rounded-[1rem] text-[#ffffff] bg-[#ffffff5b]">
          <Icon icon="mingcute:share-forward-fill" />
          <span class=" mx-1">{{ data.playlist.shareCount }}</span>
        </div>
        <div class="flex justify-center items-center w-[6rem] h-[2rem] rounded-[1rem] text-[#ffffff] bg-[#ffffff5e]"
          style="background-color: rgba(255, 255, 255,0.2);">
          <Icon icon="eva:message-circle-fill" />
          <span class="mx-1">{{ data.playlist.commentCount }}</span>
        </div>
        <div class="flex justify-center items-center w-[6rem] h-[2rem] rounded-[1rem] text-[#ffffff] bg-[#ff4646]">
          <Icon icon="mingcute:new-folder-fill" />
          <span class=" mx-1">{{ data.playlist.subscribedCount }}</span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div>
      <SongListHandler></SongListHandler>
    </div>
  </div>
</template>
<style scoped></style>