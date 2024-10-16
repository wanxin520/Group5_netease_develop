<script setup>
import { ref } from "vue"
import AllMV from "./children/AllMV.vue"
import EAAMV from "./children/EAAMV.vue"
import GATMV from "./children/GATMV.vue"
import InlandMV from "./children/InlandMV.vue"
import JapaneseMV from "./children/JapaneseMV.vue"
import KoreaMV from "./children/KoreaMV.vue"
import NewestMV from "./children/NewestMV.vue"
import RecommendMV from "./children/RecommendMV.vue"
import OfficialMV from "./children/OfficialMV.vue"

const active = ref(0)
</script>

<template>
    <div>
        <van-tabs v-model:active="active" offset-top="0px" sticky animated color="red" title-inactive-color="gray"
            line-width="10">
            <van-tab title="全部">
                <AllMV></AllMV>
            </van-tab>
            <van-tab title="最新">
                <NewestMV></NewestMV>
            </van-tab>
            <van-tab title="推荐">
                <RecommendMV></RecommendMV>
            </van-tab>
            <van-tab title="网易出品">
                <OfficialMV></OfficialMV>
            </van-tab>
            <van-tab title="内地">
                <InlandMV></InlandMV>
            </van-tab>
            <van-tab title="港台">
                <GATMV></GATMV>
            </van-tab>
            <van-tab title="欧美">
                <EAAMV></EAAMV>
            </van-tab>
            <van-tab title="日本">
                <JapaneseMV></JapaneseMV>
            </van-tab>
            <van-tab title="韩国">
                <KoreaMV></KoreaMV>
            </van-tab>
        </van-tabs>
    </div>
</template>
<style scoped></style>