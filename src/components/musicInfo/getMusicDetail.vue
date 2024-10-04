<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { useUserStore } from "@/store";
import MusicPlayPage from "./MusicPlayPage.vue";
import { useRoute } from "vue-router";


const route = useRoute()
const songsUrlData = ref()
const songsDetailData = ref()
const userStore = useUserStore()
const { data: songsUrl, loading: url } = useRequest(() => getSongsUrl({ "id": route.query.id, "cookie": userStore.userInfo.cookie }))
const { data: songsDetail, loading: detail } = useRequest(() => getSongsDetail({ "id": route.query.id, "cookie": userStore.userInfo.cookie }))


watch(songsUrl, () => {
    songsUrlData.value = songsUrl.value.data
})
watch(songsDetail, () => {
    songsDetailData.value = songsDetail.value
})
</script>

<template>
    <div v-if="!url & !detail">
        <MusicPlayPage :songsUrlData="songsUrlData" :songsDetailData="songsDetailData"></MusicPlayPage>
    </div>
</template>
<style scoped></style>