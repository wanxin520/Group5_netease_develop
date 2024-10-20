<script setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue";
import Bottom from "../Bottom/Bottom.vue";
import Attention from "@/views/Pages/Attention/Attention.vue";
import Recommend from "@/views/Pages/Attention/Recommend.vue";
import Fanses from "@/views/Pages/Attention/Fanses.vue";
import { useSourseStore, useUserStore } from "@/store";
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { watch } from "vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";


const userStore = useUserStore()
const active = ref("0")
const sourseStore = useSourseStore()
const { run: loadUrl, data: songsUrl } = useRequest(() => getSongsUrl({ "id": [sourseStore.getMusicSourseIds], "cookie": userStore.userInfo.cookie }), { manual: true })

const login = () => {
  loadUrl()
  // getSongsUrl({ "id": [sourseStore.getMusicSourseIds], "cookie": userStore.userInfo.cookie })
  console.log("请求了");
}
watch(songsUrl, () => {
  console.log(songsUrl.value);
})

const checkPage = (index) => {
  active.value = index
  // console.log(index);
}
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-start items-center">
    <div class="flex justify-between items-center w-[100%] h-[10vh] p-2">
      <div>
        <Icon icon="material-symbols:arrow-back" width="1.5rem" height="1.5rem" />
      </div>
      <div class="w-[50%]">
        <van-tabs v-model:active="active" animated line-width="20" line-height="3" title-active-color="#000000"
          color="#f33a3a" title-inactive-color="#999999" @change="checkPage">
          <van-tab title="推荐"></van-tab>
          <van-tab title="关注"></van-tab>
          <van-tab title="粉丝"></van-tab>
        </van-tabs>
      </div>
      <div>
        <Icon icon="bitcoin-icons:search-filled" width="1.5rem" height="1.5rem" />
      </div>
    </div>
    <div class="w-[100%]">
      <Recommend v-if="active == 0"></Recommend>
      <Attention v-else-if="active == 1"></Attention>
      <Fanses v-else-if="active == 2"></Fanses>
    </div>
  </div>
  <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
    <BottomPlayBar></BottomPlayBar>
  </div>
  <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
    <Bottom></Bottom>
  </div>
</template>
<style scoped></style>