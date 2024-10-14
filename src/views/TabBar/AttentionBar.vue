<script setup>
import { ref } from "vue"
import Bottom from "../Bottom/Bottom.vue";
import { usePlayStore,useSourseStore,useUserStore } from "@/store";
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { watch } from "vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";


const playStore = usePlayStore()
const userStore = useUserStore()
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

</script>

<template>
  <div>
    <h1 @click="login">关注</h1>
  </div>
  <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
    <BottomPlayBar></BottomPlayBar>
  </div>
  <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
    <Bottom></Bottom>
  </div>
</template>
<style scoped></style>