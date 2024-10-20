<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router";
import { useRequest } from "vue-request";
import { getMVInfo, getMVURL, getMVDetailInfo } from "@/api/videoIndex";
import { getArtistDetail } from "@/api/userIndex";
import VideoPlayer from "./VideoPlayer.vue";

const route = useRoute();

const { data: MVInfo, loading: loadingMVInfo } = useRequest(() => getMVInfo({ mvid: route.query.sourceId }))
const { data: MVURL, loading: loadingMVURL } = useRequest(() => getMVURL({ mvid: route.query.sourceId }))
const { data: MVDetail, loading: loadingMVDetail } = useRequest(() => getMVDetailInfo({ mvid: route.query.sourceId }))

const { run, data: userInfo, loading: loadingUserDetail } = useRequest(() => getArtistDetail({ id: MVInfo.value.data.artistId }), { manual: true })

watch(MVInfo, () => {
    // console.log(MVInfo.value);
    run()
})
watch(MVURL, () => {
    // console.log(MVURL.value.data);
})
watch(userInfo, () => {
    // console.log(userInfo.value.data.artist);
})
watch(MVDetail, () => {
    // console.log(MVDetail.value);
})
</script>

<template>
    <div v-if="!loadingMVInfo && !loadingMVURL && !loadingUserDetail && !loadingMVDetail">
        <VideoPlayer :mvurl="MVURL.data.url" :mvinfo="MVInfo.data" :artistinfo="userInfo.data.artist" :mvdetail="MVDetail">

        </VideoPlayer>
    </div>
    <!-- <VideoPlayer>

    </VideoPlayer> -->
</template>
<style scoped></style>