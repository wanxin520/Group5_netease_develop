<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import MusicPlayer from "./MusicPlayer.vue";
import { songMessage, musicPlayingData, audio, play, pause, backSong, nextSong } from "./tool/playerHandler";
const emit = defineEmits(["closePlayBar", "nextSong", "backSong"])
const showBottom = ref(false)
const closePoup = () => {
    showBottom.value = false
}
</script>
<template>
    <div class="w-[100%] h-[3rem] bg-[#ffffff] flex justify-center items-center">
        <div class="w-[100%] h-[4rem] flex justify-start items-center">
            <div class="cdcard ml-3" :class="{ songimgRotate: musicPlayingData.playing }" @click="showBottom = true">
                <img class="" :src="songMessage.songPicUrl" alt="">
            </div>
            <div class="w-[80%] ml-2 flex justify-between items-center">
                <div @click="showBottom = true">
                    <span class="text-[#646464] text-[12px] font-bold">{{ songMessage.songName }}</span><span
                        class="text-[#838383] text-[10px] font-serif ml-1 mr-1">-</span><span
                        class="text-[#858484] text-[10px] font-serif">{{ songMessage.artistName }}</span>
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
                            <Icon v-if="!musicPlayingData.playing" @click="play" icon="basil:play-solid" width="1rem"
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