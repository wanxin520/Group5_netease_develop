<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});
// console.log(props.data);

const router = useRouter()

const isClicked = (name) => {
    switch (name) {
        case "每日推荐":
            router.push({ name: "recommend" })
            break
        case "私人FM":
            router.push({ name: "personalfm" })
            break
        case "歌单":
            router.push({ name: "personalized" })
            break
        case "排行榜":
            router.push({ name: "toplist" })
            break
        case "有声书":
            router.push({ name: "radiostation" })
            break
        case "数字专辑":
            router.push({ name: "albumList" })
            break
        case "关注新歌":
            router.push({ name: "concernartist" })
            break
        case "收藏家":
            router.push({ name: "collector" })

        default:
            break
    }
}


</script>

<template>
    <div class="m-auto">
        <div class="w-[100vw] flex justify-center items-center">
            <van-swipe class="my-swipe" :width="80" :height="80" :stop-propagation="false" :loop="false"
                :show-indicators="false">
                <van-swipe-item @click="isClicked(item.name)" v-for="(item, index) in props.data" :key="item.name">
                    <div class="flex flex-col items-center">
                        <div class="">
                            <img class="filter w-[2.6rem]" :src="item.iconUrl" alt="">
                        </div>
                        <div class="text-[#4d4c4c] text-[11px]">
                            {{ item.name }}
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<style scoped>
.filter {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}

.van-swipe-item {
    width: 100%;
}
</style>
