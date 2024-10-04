<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { Howl, Howler } from "howler";
import { useRouter } from "vue-router";
import getMusicLyric from "./getMusicLyric.vue";



const router = useRouter()
const props = defineProps({
    songsUrlData: {},
    songsDetailData: {}
})
console.log(props.songsDetailData);
const musicPlayingData = ref({
    songFile: "",
    playingStatus: false,
    duration: 0,
    playedTime: 0,
    playedProgress: 0,
    volume: 1,
    muted: false,
    loop: false,
    rate: 1,
})
let getPlayedTimeInterval
const music = new Howl({
    loop: true,
    rate: 1,
    autoplay: false,
    src: [props.songsUrlData[0].url],
    onload: () => {
        console.log("歌曲加载完成")
        musicPlayingData.value.duration = music.duration()
        musicPlayingData.value.volume = music.volume()
        musicPlayingData.value.rate = music.rate()
        musicPlayingData.value.loop = music.loop()
        musicPlayingData.value.muted = music.mute()
    },
    onplay: () => {
        console.log("开始播放");
        getPlayedTimeInterval = setInterval(() => {
            musicPlayingData.value.playedTime = music.seek() * 1000
            // console.log(((musicPlayingData.value.playedTime / 1000) / musicPlayingData.value.duration) * 100)
            musicPlayingData.value.playedProgress = ((musicPlayingData.value.playedTime / 1000) / musicPlayingData.value.duration) * 100
        }, 1000)
        musicPlayingData.value.playingStatus = true
    },
    onend: () => {
        console.log("播放完毕");
        musicPlayingData.value.playedTime = 0
        clearInterval(getPlayedTimeInterval)
        musicPlayingData.value.playingStatus = false
    },
    onpause: () => {
        console.log("暂停播放");
        musicPlayingData.value.playingStatus = false
        clearInterval(getPlayedTimeInterval)
    },
    onstop: () => {
        console.log("停止播放");
    },
    onmute: () => {
        console.log("静音、取消静音");
        musicPlayingData.value.muted = !music.mute()
    },
    onvolume: () => {
        console.log("改变音量");
        musicPlayingData.value.volume = music.volume()
    },
    onrate: () => {
        console.log("改变速率");
        musicPlayingData.value.rate = music.rate()
    },
})
</script>

<template>
    <div class="h-[100vh] flex flex-col items-center justify-between relative"
        style="background-repeat: no-repeat; background-size: cover;"
        :style="{ backgroundImage: `url(${props.songsDetailData.songs[0].al.picUrl})` }">
        <div class=" absolute w-[100%] h-[100vh] bg-[#272727f5]"></div>
        <div class="w-[100%] h-[100%] flex flex-col justify-between items-center z-40">
            <!-- top -->
            <div class="h-[12vh] w-[100%] flex justify-between items-center text-[#ffffff]">
                <Icon @click="router.go(-1)" icon="iconamoon:arrow-down-2-light" width="1.6rem" height="1.6rem"
                    class="ml-3" />
                <Icon icon="hugeicons:share-04" width="1.2rem" height="1.2rem" class="mr-3" />
            </div>
            <div class="cdcard" :class="{ songimgRotate: musicPlayingData.playingStatus }">
                <img class="" :src="props.songsDetailData.songs[0].al.picUrl" alt="">
            </div>
            <!-- 播放组件 -->
            <div class="w-[100%] flex flex-col items-center text-[#ffffff]">
                <div class=" flex w-[85%] justify-between items-center">
                    <div class="flex flex-col justify-center items-center ml-1">
                        <div class="flex justify-start items-center">
                            <div class="flex justify-center items-center font-bold">
                                {{ props.songsDetailData.songs[0].name }}
                            </div>
                            <div v-if="props.songsDetailData.songs[0].fee !== 0"
                                class="w-[1.5rem] h-[1rem] flex justify-center items-center text-[9px] rounded-[5px] text-[#ffffff] bg-[#ffffff46] ml-2">
                                VIP
                            </div>
                        </div>
                        <div class="flex justify-start items-center mt-2">
                            <div class="flex justify-center items-center text-[12px] text-[#adadad]">
                                {{ props.songsDetailData.songs[0].ar[0].name }}
                            </div>
                            <div
                                class="w-[1.5rem] h-[1rem] flex justify-center items-center text-[9px] rounded-[5px] text-[#ffffff] bg-[#ffffff28] ml-2">
                                关注
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center text-[#ffffff]">
                        <Icon icon="icon-park-solid:like" width="1.6rem" height="1.6rem" class="mr-9" />
                        <Icon icon="uil:comment-dots" width="1.6rem" height="1.6rem" class="mr-1" />
                    </div>
                </div>
                <div class="w-[85%] m-auto mt-5 text-[#ffffff]">
                    <van-progress :percentage="musicPlayingData.playedProgress" pivot-text="&nbsp" :show-pivot="true"
                        text-color="#ffffff" pivot-color="#ffffff" style="--van-progress-pivot-font-size:3px"
                        stroke-width="2" color="linear-gradient(to right, #be99ff, #7232dd)" />
                    <div class="flex w-[100%] justify-between items-center text-[9px] mt-2">
                        <div class=" text-[#ffffff]">
                            <span>{{ new Date(musicPlayingData.playedTime).getMinutes() < 10 ? "0" + new
                                Date(musicPlayingData.playedTime).getMinutes() : new
                                    Date(musicPlayingData.playedTime).getMinutes() }}</span>
                                    <span>:</span>
                                    <span>{{ new Date(musicPlayingData.playedTime).getSeconds() < 10 ? "0" + new
                                        Date(musicPlayingData.playedTime).getSeconds() : new
                                            Date(musicPlayingData.playedTime).getSeconds() }} </span>
                        </div>
                        <div class="text-[10px]">
                            极高
                        </div>
                        <div class=" text-[#ffffff]">
                            <span>{{ new Date(props.songsUrlData[0].time).getMinutes() < 10 ? "0" + new
                                Date(props.songsUrlData[0].time).getMinutes() : new
                                    Date(props.songsUrlData[0].time).getMinutes() }}</span>
                                    <span>:</span>
                                    <span>{{ new Date(props.songsUrlData[0].time).getSeconds() < 10 ? "0" + new
                                        Date(props.songsUrlData[0].time).getSeconds() : new
                                            Date(props.songsUrlData[0].time).getSeconds() }} </span>
                        </div>
                    </div>
                    <div class="w-[85%] m-auto text-[#ffffff] ">
                        <div class="h-[10vh] flex justify-around items-center">
                            <div>
                                <Icon icon="vaadin:random" width="1rem" height="1rem" />
                            </div>
                            <div>
                                <Icon icon="ph:skip-back-circle-light" width="2rem" height="2rem"
                                    style="color: #ffffff" />
                            </div>
                            <div>
                                <div v-if="!musicPlayingData.playingStatus" @click="music.play()">
                                    <van-icon @click="musicPlayingData.playingStatus = true" name="play-circle-o"
                                        color="#ffffff" size="3rem" />
                                </div>
                                <div v-else @click="music.pause()">
                                    <van-icon @click="musicPlayingData.playingStatus = false" name="pause-circle-o"
                                        color="#ffffff" size="3rem" />
                                </div>
                            </div>

                            <div class="nexticon">
                                <Icon icon="ph:skip-back-circle-light" width="2rem" height="2rem"
                                    style="color: #ffffff" />
                            </div>
                            <div>
                                <Icon icon="iconamoon:playlist-fill" width="1.4rem" height="1.4rem" />
                            </div>
                        </div>
                    </div>
                    <div class="w-[100%] flex justify-evenly mb-6 mt-3 text-[#ffffff]">
                        <Icon icon="fluent:phone-desktop-48-regular" width="1.5rem" height="1.5rem" />
                        <Icon icon="material-symbols-light:download-for-offline-outline" width="1.6rem"
                            height="1.6rem" />
                        <Icon icon="proicons:more" width="1.6rem" height="1.6rem" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.cdcard {
    display: flex;
    border-radius: 50%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    background-image: url(/public/coverall.png);
    width: 206px;
    height: 206px;
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
    width: 130px;
    height: 130px;
    border-radius: 100px;
}

.nexticon {
    transform: rotate(180deg);
}
</style>
