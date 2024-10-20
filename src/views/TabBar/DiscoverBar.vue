<script setup>
import { watch, ref } from "vue";
import { getHomePageData } from "@/api";
import { useRequest } from "vue-request";
import TopSearch from "../Top/SearchBar.vue";
import BlockType from "@/views/Pages/Discover/children/BlockType.vue";
import Bottom from "../Bottom/Bottom.vue";
import Banner from "../Pages/Discover/children/Banner.vue";
import MenuPage from "../Pages/Discover/children/MenuPage.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import { usePlayStore,useUserStore } from "@/store";
const playStore = usePlayStore()

watch(playStore, () => {
    console.log("库里数据变了");
})
const userStore = useUserStore()
// useRequest传入的是一个返回Promise值的请求函数,data就是返回的数据
const { data: pageData } = useRequest(()=>getHomePageData(
    userStore.getLoginStatus ? {cookie:null} : {cookie: userStore.cookie}
))

</script>

<template>
    <div class="content mb-[80px]">
        <header>
            <TopSearch></TopSearch>
        </header>
        <div>
            <Banner></Banner>
            <MenuPage></MenuPage>
            <BlockType v-for="item in pageData" :data="item" :key="item.blockCode" class="min-h-[100%]"></BlockType>
            <div style="height: 50px;"></div>
        </div>
    </div>
    <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
        <BottomPlayBar></BottomPlayBar>
    </div>
    <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
        <Bottom></Bottom>
    </div>
</template>
<style scoped>
.content {
    background-image: linear-gradient(to bottom, rgba(255, 243, 255, 0.795), rgb(240, 252, 252));
}

.filter {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>