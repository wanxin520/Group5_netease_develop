<script setup>
import { ref, watch, inject } from "vue"
import { Icon } from "@iconify/vue";
import { Howl, Howler } from "howler";
import { useRouter } from "vue-router";
import { usePlayStore } from "@/store";


const reload = inject("reload");
const playStore = usePlayStore()
const emit = defineEmits(["closePlayBar"])

// watch(playStore, () => {
//   console.log(playStore.getSongsUrl)
// })

// playStore.setPlayIndex(0)

const router = useRouter()

const songsUrl = ref(playStore.getSongsUrl)
const songsDetail = ref(playStore.getSongsDetail)
const playIndex = ref(playStore.playIndex)
console.log(songsUrl.value);
// console.log(songsDetail.value);
// console.log(playIndex.value);

// console.log(songsDetail.value.songs[playIndex.value].name);
console.log(songsUrl.value[playIndex.value].url);
// console.log(songsDetail.value.songs[playIndex.value].al.picUrl);
// console.log(songsDetail.value.songs[playIndex.value].ar[0].name);
// console.log(songsUrl.value[playIndex.value].fee);
console.log(songsUrl.value[playIndex.value].time);
// console.log(songsUrl.value[playIndex.value].level)
console.log(songsUrl.value.length);
// const props = defineProps({
//   songsUrlData: {},
//   songsDetailData: {}
// })
// // console.log(props.songsDetailData);
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
const musicPlayingData = ref({
    loadingStatus: true,
    playingStatus: false,
    playedTime: 0,
    progress: 0,
})
let getPlayedTimeInterval
// const music = new Howl({
//     src: songMessage.value.songFile,
//     loop: true,
//     rate: 1,
//     autoplay: false,
//     onload: () => {
//         console.log("歌曲加载完成");
//         musicPlayingData.value.loadingStatus = false
//         musicPlayingData.value.duration = music.duration()
//         musicPlayingData.value.volume = music.volume()
//         musicPlayingData.value.rate = music.rate()
//         musicPlayingData.value.loop = music.loop()
//         musicPlayingData.value.muted = music.mute()
//     },
//     onloaderror: () => {
//         console.log("加载失败");
//     },
//     onplay: () => {
//         console.log("开始播放");
//         getPlayedTimeInterval = setInterval(() => {
//             musicPlayingData.value.playedTime = music.seek() * 1000
//             // console.log(((musicPlayingData.value.playedTime / 1000) / musicPlayingData.value.duration) * 100)
//             musicPlayingData.value.progress = (musicPlayingData.value.playedTime / songMessage.value.songDuration) * 100
//         }, 1000)
//         musicPlayingData.value.playingStatus = true
//     },
//     onend: () => {
//         console.log("播放完毕");
//         musicPlayingData.value.playedTime = 0
//         clearInterval(getPlayedTimeInterval)
//         musicPlayingData.value.playingStatus = false
//         music.unload()
//     },
//     onpause: () => {
//         console.log("暂停播放");
//         musicPlayingData.value.playingStatus = false
//         clearInterval(getPlayedTimeInterval)
//     },
//     onstop: () => {
//         console.log("停止播放");
//     },
// })
// 监听播放列表中的数据变化
watch(musicPlayingData.value, () => {
    // console.log(musicPlayingData.value.progress);
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
const closePoup = () => {
    emit("closePlayBar", false)
}

</script>

<template>
    <div class="h-[100vh] flex flex-col items-center justify-between relative"
        :style="{ backgroundImage: `url(${songMessage.songPicUrl})` }"
        style="background-repeat: no-repeat; background-size: cover;">
        <div class=" absolute w-[100%] h-[100vh] bg-[#585858da]"></div>
        <div class="w-[100%] h-[100%] flex flex-col justify-between items-center z-40">
            <!-- top -->
            <div class="h-[12vh] w-[100%] flex justify-between items-center text-[#ffffff]">
                <Icon @click="closePoup" icon="iconamoon:arrow-down-2-light" width="1.6rem" height="1.6rem"
                    class="ml-3" />
                <Icon icon="hugeicons:share-04" width="1.2rem" height="1.2rem" class="mr-3" />
            </div>
            <RotateCDIMG :playingStatus="musicPlayingData.playingStatus" :songImg="songMessage.songPicUrl">
            </RotateCDIMG>
            <!-- 播放组件 -->
            <div class="w-[100%] flex flex-col items-center text-[#ffffff]">
                <div class=" flex w-[85%] justify-between items-center">
                    <div class="flex flex-col justify-center items-center ml-1">
                        <div class="flex justify-start items-center">
                            <div class="flex justify-center items-center font-bold">
                                {{ songMessage.songName }}
                            </div>
                            <div v-if="songMessage.isFee !== 0"
                                class="w-[1.5rem] h-[1rem] flex justify-center items-center text-[9px] rounded-[5px] text-[#ffffff] bg-[#ffffff46] ml-2">
                                VIP
                            </div>
                        </div>
                        <div class="flex justify-start items-center mt-2">
                            <div class="flex justify-center items-center text-[12px] text-[#adadad]">
                                {{ songMessage.artistName }}
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
                    <van-slider v-model="musicPlayingData.progress"
                        active-color="linear-gradient(to right, #a8e2f8, #c529ec)">
                        <template #button>
                            <div class="w-[0.5rem] h-[0.5rem] bg-[#ffffff] rounded-[50%]"></div>
                        </template>
                    </van-slider>
                    <div class="flex w-[100%] justify-between items-center text-[9px] mt-2">
                        <div class=" text-[#ffffff]">
                            <TimesHandler :times="musicPlayingData.playedTime"></TimesHandler>
                        </div>
                        <div class="text-[10px]">
                            极高
                        </div>
                        <div class=" text-[#ffffff]">
                            <TimesHandler :times="songMessage.songDuration"></TimesHandler>
                        </div>
                    </div>
                    <div class="w-[85%] m-auto text-[#ffffff] ">
                        <div class="h-[10vh] flex justify-around items-center">
                            <div>
                                <Icon icon="vaadin:random" width="1rem" height="1rem" />
                            </div>
                            <div @click="backSong" class="backicon">
                                <Icon icon="entypo:controller-next" width="1.5rem" height="1.5rem"
                                    style="color: #ffffff" />
                            </div>
                            <div>
                                <div v-if="musicPlayingData.loadingStatus"
                                    class="bg-[#888585] w-[3rem] h-[3rem] flex justify-center items-center rounded-[50%]">
                                    <van-button loading loading-type="spinner" size="small" color="#888585" />
                                </div>
                                <div v-else-if="!musicPlayingData.playingStatus" @click="music.play()">
                                    <van-icon @click="musicPlayingData.playingStatus = true" name="play-circle-o"
                                        color="#ffffff" size="3rem" />
                                </div>
                                <div v-else @click="music.pause()">
                                    <van-icon @click="musicPlayingData.playingStatus = false" name="pause-circle-o"
                                        color="#ffffff" size="3rem" />
                                </div>
                            </div>

                            <div @click="nextSong">
                                <Icon icon="entypo:controller-next" width="1.5em" height="1.5rem"
                                    style="color: #ffffff" />
                            </div>
                            <div @click="mute">
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
.backicon {
    transform: rotate(180deg);
}
</style>
