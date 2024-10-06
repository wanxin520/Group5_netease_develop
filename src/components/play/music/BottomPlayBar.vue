<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { Howl, Howler } from "howler";
import { useRouter } from "vue-router";
import { usePlayStore } from "@/store";
import MusicPlayer from "./MusicPlayer.vue";
const router = useRouter()
const playStore = usePlayStore()
const emit = defineEmits(["closePlayBar", "nextSong", "backSong"])
const songsUrl = ref(playStore.getSongsUrl)
const songsDetail = ref(playStore.getSongsDetail)
const playIndex = ref(playStore.playIndex)
console.log(songsUrl.value);
console.log(songsUrl.value.length);
playStore.setPlayIndex(0)

const songMessage = ref({
    songFile: songsUrl.value[playIndex.value].url,
    songName: songsDetail.value.songs[playIndex.value].name,
    artistName: songsDetail.value.songs[playIndex.value].ar[0].name,
    songPicUrl: songsDetail.value.songs[playIndex.value].al.picUrl,
    isFee: songsUrl.value[playIndex.value].fee,
    songDuration: songsUrl.value[playIndex.value].time,
    songLevel: songsUrl.value[playIndex.value].level,
    playListLength: songsUrl.value.length
})
console.log(songsUrl.value[playIndex.value].url);
const musicPlayingData = ref({
    loadingStatus: true,
    playingStatus: false,
    playedTime: 0,
    progress: 0,
})
let getPlayedTimeInterval
console.log(songsUrl.value[playIndex.value].url);
const music = new Howl({
    src: songsUrl.value[playIndex.value].url,
    loop: true,
    rate: 1,
    autoplay: false,
    onload: () => {
        console.log("歌曲加载完成");
        musicPlayingData.value.loadingStatus = false
        musicPlayingData.value.duration = music.duration()
        musicPlayingData.value.volume = music.volume()
        musicPlayingData.value.rate = music.rate()
        musicPlayingData.value.loop = music.loop()
        musicPlayingData.value.muted = music.mute()
    },
    onloaderror: () => {
        console.log("加载失败");
    },
    onplay: () => {
        console.log("开始播放");
        getPlayedTimeInterval = setInterval(() => {
            musicPlayingData.value.playedTime = music.seek() * 1000
            // console.log(((musicPlayingData.value.playedTime / 1000) / musicPlayingData.value.duration) * 100)
            musicPlayingData.value.progress = (musicPlayingData.value.playedTime / songMessage.value.songDuration) * 100
        }, 1000)
        musicPlayingData.value.playingStatus = true
    },
    onend: () => {
        console.log("播放完毕");
        musicPlayingData.value.playedTime = 0
        clearInterval(getPlayedTimeInterval)
        musicPlayingData.value.playingStatus = false
        music.unload()
    },
    onpause: () => {
        console.log("暂停播放");
        musicPlayingData.value.playingStatus = false
        clearInterval(getPlayedTimeInterval)
    },
    onstop: () => {
        console.log("停止播放");
    },
})
// 上一曲
const backSong = () => {
    playStore.playIndex == 0
        ?
        [
            playIndex.value,
            showToast("已经是第一曲啦~")
        ]
        :
        [
            playStore.setPlayIndex(playIndex.value - 1),
            location.reload()
        ]
    music.unload()
    music.load()
}

// 下一曲
const nextSong = () => {
    playStore.playIndex == songMessage.value.playListLength - 1
        ?
        [
            playIndex.value,
            showToast("已经是最后一曲啦~")
        ]
        :
        [
            playStore.setPlayIndex(playIndex.value + 1),
            location.reload()
        ]
    music.unload()
    music.load()
}
const showBottom = ref(false)
const closePoup = () => {
    showBottom.value = false
}

</script>
<template>
    <div class="w-[100%] h-[3rem] bg-[#ffffff] flex justify-center items-center">
        <div class="w-[100%] h-[4rem] flex justify-start items-center">
            <div class="cdcard ml-3" :class="{ songimgRotate: musicPlayingData.playingStatus }"
                @click="showBottom = true">
                <img class="" :src="songMessage.songPicUrl" alt="">
            </div>
            <div class="w-[80%] ml-2 flex justify-between items-center">
                <div @click="showBottom = true">
                    <span class="text-[#646464] text-[12px] font-bold">{{ songMessage.songName }}</span><span
                        class="text-[#838383] text-[10px] font-serif ml-1 mr-1">-</span><span
                        class="text-[#858484] text-[10px] font-serif">{{ songMessage.artistName }}</span>
                </div>
                <div class="flex justify-center items-center">
                    <div v-if="musicPlayingData.loadingStatus"
                        class="bg-[#e7e7e7] w-[28px] h-[28px] flex justify-center items-center rounded-[50%] mr-5">
                        <van-loading type="spinner" size="14px" color="#616161" />
                    </div>
                    <div v-else class="w-[28px] h-[28px] mr-5 flex relative">
                        <van-circle v-model:current-rate="currentRate" :rate="360" :speed="100" size="28" :text="text"
                            color="#a3a3a3" stroke-width="100" />
                        <div class="w-[100%] h-[100%] flex left-[22%] top-[20%] absolute text-[#838383]">
                            <Icon v-if="musicPlayingData.playingStatus" icon="basil:play-solid" width="1rem"
                                height="1rem" />
                            <Icon v-else icon="bi:pause-fill" width="1rem" height="1rem" />
                        </div>
                    </div>
                    <Icon icon="iconamoon:playlist-fill" width="1.4rem" height="1.4rem" class="text-[#535353] mr-3" />
                </div>
            </div>
        </div>
    </div>
    <!-- 底部弹出播放器 -->
    <van-popup teleport="#app" v-model:show="showBottom" duration="0.5" :close-on-click-overlay="true"
        close-icon-position="top-left" position="bottom" :style="{ height: '100%' }">
        <MusicPlayer :songMessage="songMessage" :musicPlayingData="musicPlayingData" @closePlayBar="closePoup"
            @backSong="backSong" @nextSong="nextSong">
        </MusicPlayer>
    </van-popup>
</template>
<style scoped lang="less">
.cdcard {
    display: flex;
    border-radius: 50%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    width: 2.5rem;
    height: 2.5rem;
    background-repeat: no-repeat;
    background-position: -140px -580px;
}

.songimgRotate {
    animation-name: rotate;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}

img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100px;
}
</style>