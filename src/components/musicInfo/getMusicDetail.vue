<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { useUserStore, usePlayStore } from "@/store";
import { useRoute } from "vue-router";
import BottomPlayBar from "../play/music/BottomPlayBar.vue";

const route = useRoute()
const songsUrlData = ref()
const songsDetailData = ref()
const userStore = useUserStore()
const playStore = usePlayStore()
const { data: songsUrl, loading: url } = useRequest(() => getSongsUrl({ "id": [25906124, 1331819951, 534542079, 28285910], "cookie": userStore.userInfo.cookie }))
const { data: songsDetail, loading: detail } = useRequest(() => getSongsDetail({ "id": [25906124, 1331819951, 534542079, 28285910], "cookie": userStore.userInfo.cookie }))


watch(songsUrl, () => {
    // console.log(songsUrl.value);
    songsUrlData.value = songsUrl.value.data
    playStore.setSongsUrl(songsUrl.value.data)
})
watch(songsDetail, () => {
    // console.log(songsDetail.value);
    songsDetailData.value = songsDetail.value
    playStore.setSongsDetail(songsDetail.value)
})
</script>

<template>
    <div>
        <BottomPlayBar></BottomPlayBar>
    </div>
</template>
<style scoped></style>