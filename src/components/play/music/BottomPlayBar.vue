<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import { Icon } from "@iconify/vue";
import MusicPlayer from "./MusicPlayer.vue";
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { usePlayStore, useSourseStore, useUserStore, useSongUrlStore, useSongDetailStore } from "@/store";
import { useRouter } from "vue-router";
const playStore = usePlayStore()
const urlStore = useSongUrlStore()
const detailStore = useSongDetailStore()
const sourseStore = useSourseStore()
const userStore = useUserStore()
const router = useRouter()
const showBottomPlayBar = ref(false)
const audio = new Audio()
const { run: loadUrl, data: songsUrl } = useRequest(() => getSongsUrl({ "id": [sourseStore.getMusicSourseIds], "cookie": userStore.userInfo.cookie }), { manual: true })
const { run: loadDeatil, data: songsDetail } = useRequest(() => getSongsDetail({ "id": [sourseStore.getMusicSourseIds], "cookie": userStore.userInfo.cookie }), { manual: true })

watch(songsUrl, () => {
    console.log(songsUrl.value);
    urlStore.setSongsUrl(songsUrl.value.data)
    playStore.setPlayIndex(0)
})
watch(songsDetail, () => {
    detailStore.setSongsDetail(songsDetail.value)
    console.log(songsDetail.value);
})

const defaultIMG = ref("../../../../public/cd1.png")
const songMessage = ref({
    songName: detailStore.getSongsDetail.songs[playStore.playIndex] ? detailStore.getSongsDetail.songs[playStore.playIndex].name : null,
    artistName: detailStore.getSongsDetail.songs[playStore.playIndex] ? detailStore.getSongsDetail.songs[playStore.playIndex].ar[0].name : null,
    songPicUrl: detailStore.getSongsDetail.songs[playStore.playIndex] ? detailStore.getSongsDetail.songs[playStore.playIndex].al.picUrl : null,
    isFee: urlStore.getSongsUrl[playStore.playIndex] ? urlStore.getSongsUrl[playStore.playIndex].fee : null,
    songDuration: urlStore.getSongsUrl[playStore.playIndex] ? urlStore.getSongsUrl[playStore.playIndex].time : 0,
    songLevel: urlStore.getSongsUrl[playStore.playIndex] ? urlStore.getSongsUrl[playStore.playIndex].level : null,
    playListLength: urlStore.getSongsUrl.length ? urlStore.getSongsUrl.length : null

})
const musicPlayingData = ref({
    ready: true,
    playing: false,
    current: 0,
    progress: 0,
})

audio.src = urlStore.getSongsUrl[playStore.playIndex] ? urlStore.getSongsUrl[playStore.playIndex].url : null
watch(urlStore, () => {
    audio.src = urlStore.getSongsUrl[playStore.playIndex].url
    songMessage.value.isFee = urlStore.getSongsUrl[playStore.playIndex].fee
    songMessage.value.songDuration = urlStore.getSongsUrl[playStore.playIndex].time
    songMessage.value.songLevel = urlStore.getSongsUrl[playStore.playIndex].level
    songMessage.value.playListLength = urlStore.getSongsUrl.length
})
watch(detailStore, () => {
    console.log(detailStore.getSongsDetail);
    songMessage.value.songName = detailStore.getSongsDetail.songs[playStore.playIndex].name
    songMessage.value.artistName = detailStore.getSongsDetail.songs[playStore.playIndex].ar[0].name
    songMessage.value.songPicUrl = detailStore.getSongsDetail.songs[playStore.playIndex].al.picUrl
})

// 封装检测是否加载完成的函数
let checkReadyInterval
const checkDataReady = () => {
    clearInterval(checkReadyInterval)
    checkReadyInterval = setInterval(() => {
        audio.readyState == 4 || audio.readyState == 3
            ?
            [
                // 防止之前还有未播放完的音乐文件，需要将新获取到的音乐路径重新加载
                audio.load(),
                musicPlayingData.value.ready = true,
                clearInterval(checkReadyInterval),
                setTimeout(() => {
                    audio.play()
                }, 3000),
                musicPlayingData.value.playing = true
            ]
            : musicPlayingData.ready
        console.log(audio.readyState);
    }, 1000)
}
// 封装获取播放状态函数
let playstatuInterval
const getPlayStatus = () => {
    playstatuInterval = setInterval(() => {
        console.log(audio.paused)
        musicPlayingData.value.playing = audio.paused
        musicPlayingData.value.current = audio.currentTime * 1000
        // 获取歌曲进度
        songMessage.value.songDuration == 0 ? 0 : musicPlayingData.value.progress = (musicPlayingData.value.current / songMessage.value.songDuration) * 100
    }, 1000)
}
watch(sourseStore, () => {
    userStore.getLoginStatus
        ?
        [
            showToast("播放VIP歌曲需要先使用网易云账号登录"),
            router.push({ name: "phone" })
        ]
        :
        [
            loadUrl(),
            loadDeatil(),
            clearInterval(checkReadyInterval),
            checkDataReady(),
            clearInterval(playstatuInterval),
            getPlayStatus(),
            console.log("歌曲请求函数执行了"),
            setTimeout(() => {
                showBottomPlayBar.value = true
            }, 2000)
        ]

})

// 播放
const play = () => {
    audio.play()
}
const pause = () => {
    audio.pause()
}
// 上一曲
const backSong = () => {
    playStore.playIndex == 0
        ?
        [
            playStore.playIndex,
            showToast("已经是第一曲啦~")
        ]
        :
        [
            playStore.setPlayIndex(playStore.playIndex - 1),
            audio.pause(),
            console.log(playStore.getSongsUrl[playStore.playIndex].url),
            audio.src = playStore.getSongsUrl[playStore.playIndex].url,
            audio.play()
        ]
}

// 下一曲
const nextSong = () => {
    playStore.playIndex == songMessage.value.playListLength - 1
        ?
        [
            playStore.playIndex,
            showToast("已经是最后一曲啦~")
        ]
        :
        [
            playStore.setPlayIndex(playStore.playIndex + 1),
            audio.pause(),
            console.log(playStore.getSongsUrl[playStore.playIndex].url),
            audio.src = playStore.getSongsUrl[playStore.playIndex].url,
            audio.play()

        ]
}


const emit = defineEmits(["closePlayBar", "nextSong", "backSong"])
const showBottom = ref(false)
const closePoup = () => {
    showBottom.value = false
}
watch(playStore, () => {
    showBottomPlayBar.value = playStore.getShowPlayBar
})
onBeforeUnmount(() => {
    clearInterval(playstatuInterval)
})
</script>
<template>
    <div v-if="showBottomPlayBar" class="w-[100%] h-[3rem] bg-[#ffffff] flex justify-center items-center">
        <div class="w-[100%] h-[4rem] flex justify-start items-center">
            <div class="cdcard ml-3" :class="{ songimgRotate: !musicPlayingData.playing }" @click="showBottom = true">
                <img v-lazy="songMessage.songPicUrl ? songMessage.songPicUrl : defaultIMG" />
            </div>
            <div class="w-[80%] ml-2 flex justify-between items-center">
                <div @click="showBottom = true">
                    <span class="text-[#646464] text-[12px] font-bold">{{ songMessage.songName }}</span>
                    <span v-if="songMessage.songName" class="text-[#838383] text-[10px] font-serif ml-1 mr-1">-</span>
                    <span class="text-[#858484] text-[10px] font-serif">{{ songMessage.artistName }}</span>
                </div>
                <div class="flex justify-center items-center">
                    <div v-if="!musicPlayingData.ready"
                        class="bg-[#e7e7e7] w-[28px] h-[28px] flex justify-center items-center rounded-[50%] mr-5">
                        <van-loading type="spinner" size="14px" color="#616161" />
                    </div>
                    <div v-else class="w-[28px] h-[28px] mr-5 flex relative">
                        <van-circle v-model:current-rate="musicPlayingData.progress" :rate="100" :speed="100" size="28"
                            color="#a3a3a3" stroke-width="100" />
                        <div class="w-[100%] h-[100%] flex left-[22%] top-[20%] absolute text-[#838383]">
                            <Icon v-if="musicPlayingData.playing" @click="play" icon="basil:play-solid" width="1rem"
                                height="1rem" />
                            <Icon v-else icon="bi:pause-fill" @click="pause" width="1rem" height="1rem" />
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
            @backSong="backSong" @nextSong="nextSong" @play="play" @pause="pause">
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