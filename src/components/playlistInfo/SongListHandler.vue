<script setup>
import { ref, reactive, onMounted } from "vue"
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { usePlayStore, useSourseStore } from "@/store";
import { watch } from "vue";

const playStore = usePlayStore()
const sourseStore = useSourseStore()
// console.log(sourseStore.getMusicSourseIds);

watch(sourseStore, () => {
    console.log("数据更新了");
    // console.log(sourseStore.getMusicSourseIds);
    playStore.getMusicSourseIds

})
const props = defineProps({
    tracks: {},
    trackIds: {}
})
let ids = new Array()
props.trackIds.map((item) => {
    ids.push(item.id)
})
const playAllSongs = () => {
    // console.log(ids)
    sourseStore.setMusicSourseIds(ids)
}
const router = useRouter()
// 获取歌曲id
const getSongId = (songId) => {
    // console.log(songId);
    sourseStore.setMusicSourseIds(songId)
}
// 获取视频id
const getVedioId = (vedioId) => {
    console.log(vedioId);
}
</script>

<template>
    <!-- <div class="w-[100%] h-[6vh] flex justify-between items-center"
        style="border-top-left-radius: 10px; border-top-right-radius: 10px;background-color: rgba(255, 255, 255,0.9);">
        <div class=" flex justify-around items-center">
            <Icon icon="ph:gift" width="1.2rem" style="color: #ff0000" />
            <div class=" text-[0.8rem] mx-3">vip5.5折！抢独家护福利包</div>
        </div>
        <div class="text-[0.8rem]">
            立即抢购 >
        </div>
    </div> -->
    <van-sticky offset-top="66.77">
        <div class="w-[100%] h-[8vh] flex justify-between items-center"
            style="background-color: rgba(255, 255, 255,0.98);">
            <div @click="playAllSongs" class=" h-[5vh] flex justify-between items-center">
                <Icon class="ml-2" icon="icon-park-solid:play" width="1.2rem" height="1.2rem" style="color: #ff0000" />
                <div class="ml-2 text-[#000000] text-[12px] font-semibold">播放全部</div>
                <div class="mx-1 text-[9px] text-[#8f8f8f]">({{ props.tracks.length }})</div>
            </div>
            <div class="flex mr-2 items-center justify-center text-[#616161] ">
                <Icon icon="quill:download" width="1.2rem" class="mr-4" />
                <Icon icon="solar:list-check-minimalistic-bold" width="1.2rem" />
            </div>
        </div>
    </van-sticky>
    <div v-for="(item, index) in props.tracks" :key="item.id" class="flex w-[100%] h-[10vh] justify-between bg-[white]"
        style="background-color: rgba(255, 255, 255,0.98);">
        <div @click="getSongId(item.id)" class="flex justify-between items-center">
            <div class="w-[3.5rem] flex justify-center items-center text-[14px] text-[#999999]">{{ index + 1 }}</div>
            <div class="flex flex-col overflow-hidden">
                <!-- 歌曲名称 -->
                <div
                    class="w-[12rem] text-[10px] font-sans overflow-hidden text-ellipsis whitespace-nowrap text-[#000000]">
                    {{ item.name }}
                </div>
                <div class="flex h-[2vh] my-2">
                    <!-- 是否是超清母带音质歌曲 -->
                    <!-- <div v-if="item.hr"
                        class="w-[2rem] h-[0.7rem] flex justify-center items-center text-[6px] rounded-[5px] text-[#ffad50] mr-1"
                        style="border: 1px solid #ffad50;">超清母带</div> -->
                    <!-- 是否是SQ歌曲 -->
                    <div v-if="item.sq"
                        class="w-[1rem] h-[0.7rem] flex justify-center items-center text-[6px] rounded-[5px] text-[#ff4b45] mr-1"
                        style="border: 1px solid #ff4b45;">SQ</div>
                    <!-- 是否是VIP歌曲 -->
                    <div class="w-[1rem] h-[0.7rem] flex justify-center items-center text-[6px] rounded-[5px] text-[#ff4943] mr-1"
                        style="border: 1px solid #ff4943;" v-if="(item.fee == 1)">VIP</div>
                    <!-- 专辑名称 --><!-- 歌手名称 -->
                    <div class="w-[12rem] text-[8px]  text-[#828793]  overflow-hidden text-ellipsis whitespace-nowrap">
                        <span>{{ item.ar[0].name }}</span> - <span>{{ item.al.name }}</span>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-center items-center text-[#8d8d8d] text-[18px]">
            <Icon @click="getVedioId(item.videoInfo.video.vid)" v-if="(item.mv != 0)"
                icon="fluent:video-clip-16-regular" class="mr-5" />
            <Icon icon="material-symbols:more-vert" class=" mr-3" />
        </div>
    </div>
</template>
<style scoped></style>