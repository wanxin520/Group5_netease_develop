<script setup>
import { ref } from "vue"
import { usePlayStore,useSourseStore,useUserStore } from "@/store";
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { watch } from "vue";


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
</template>
<style scoped></style>