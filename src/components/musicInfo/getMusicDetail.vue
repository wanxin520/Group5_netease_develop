<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { getSongsUrl,getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { useUserStore } from "@/store";
import MusicPlayPage from "./MusicPlayPage.vue";


const songsUrlData = ref()
const songsDetailData = ref()

const userStore = useUserStore()
const { data:songsUrl, loading:url } = useRequest(() => getSongsUrl({ "id": "5192500", "cookie": userStore.userInfo.cookie }))
const { data:songsDetail,loading:detail } = useRequest(() => getSongsDetail({ "id": "5192500", "cookie": userStore.userInfo.cookie }))


watch(songsUrl, () => {
    // console.log(songsUrl.value);
    songsUrlData.value = songsUrl.value.data
    // console.log(songsData.value);
})
watch(songsDetail, () => {
    // console.log(songsDetail.value);
    songsDetailData.value = songsDetail.value
    // console.log(songsData.value);
})


</script>

<template>
    <div v-if="!url & !detail">
        <MusicPlayPage :songsUrlData="songsUrlData" :songsDetailData="songsDetailData"></MusicPlayPage>
    </div>
</template>
<style scoped></style>