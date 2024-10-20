<script setup>
import { ref, watch, onBeforeUnmount } from "vue"
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const props = defineProps({
    mvurl: {},
    mvinfo: {},
    artistinfo: {},
    mvdetail: {}
})

const router = useRouter()
const video = ref()
const videoStatus = ref({
    isPlaying: false,
    duration: props.mvinfo.duration,
    currentTime: 0,
    progress: 0,
})
// 检测播放状态
let getPlayStatusInterval
const checkPlayStatus = () => {
    getPlayStatusInterval = setInterval(() => {
        // console.log(video.value.paused)
        video.value.paused ?
            [
                videoStatus.value.isPlaying = false
            ] :
            [
                videoStatus.value.isPlaying = true
            ]
    }, 1000)
}
// 获取播放进度
let getCurrentTimeInterval
const getPlayProgress = () => {
    getCurrentTimeInterval = setInterval(() => {
        // console.log(video.value.currentTime);
        videoStatus.value.currentTime = video.value.currentTime
        videoStatus.value.progress = (video.value.currentTime / video.value.duration) * 100
    }, 1000)
}

const onChange = (val) => {
    video.value.currentTime = val * video.value.duration / 100
    videoStatus.value.currentTime = video.value.currentTime
}
const play = () => {
    clearInterval(getPlayStatusInterval)
    checkPlayStatus()
    // console.log(videoStatus.value.isPlaying)
    videoStatus.value.isPlaying == true
        ?
        [video.value.pause(), clearInterval(getCurrentTimeInterval), videoStatus.value.isPlaying = false]
        :
        [video.value.play(), getPlayProgress(), videoStatus.value.isPlaying = true]
}

onBeforeUnmount(() => {
    clearInterval(getPlayStatusInterval)
    clearInterval(getCurrentTimeInterval)
})

// console.log(props.mvurl);
// console.log(props.mvinfo);
// console.log(props.artistinfo);
// console.log(props.mvdetail);

</script>

<template>
    <div class="w-[100vw] h-[100vh] flex justify-center items-center bg-[#1f1f1f] relative">
        <div class="w-[100%] h-[100%] flex justify-center items-center relative">
            <!-- <div v-if="!videoStatus.isPlaying" class="w-[100%] h-[30vh]">
                <img class="w-[100%] h-[100%]" :src="props.mvinfo.cover" alt="">
            </div> -->
            <video ref="video" width="100%" height="40vh" :src="props.mvurl"></video>
            <div v-if="!videoStatus.isPlaying" class="absolute flex text-[#ffffff]">
                <Icon icon="fa6-solid:play" width="3rem" height="3rem" />
            </div>
        </div>
        <div class="w-[100%] h-[100%] absolute top-0 left-0 flex flex-col justify-between items-center text-[#ffffff]">
            <!-- 顶部 -->
            <div class="w-[100%] flex justify-between items-center p-2 mt-2">
                <div @click="router.go(-1)">
                    <Icon icon="ic:round-arrow-back" width="1.5rem" height="1.5rem" />
                </div>
                <div class="flex justify-center items-center">
                    <div class="mr-3">
                        <Icon icon="icon-park-outline:reduce" width="1.5rem" height="1.5rem" />
                    </div>
                    <div>
                        <Icon icon="fluent:more-vertical-16-regular" width="1.5rem" height="1.5rem" />
                    </div>
                </div>
            </div>
            <div @click="play" class="w-[100%] h-[100%] flex justify-center items-center"></div>
            <!-- 底部 -->
            <div class="w-[100%] flex flex-col justify-between items-center text-[12px]">
                <div @click="play" class="w-[100%] h-[100%] flex justify-between items-end p-1">
                    <div class="flex flex-col justify-between items-start ml-1">
                        <div class="flex justify-start items-center">
                            <img class="w-[2.5rem] h-[2.5rem] rounded-[50%]" :src="props.artistinfo.avatar" alt="">
                            <div class="ml-2 text-[14px]">{{ props.mvinfo.artistName }}</div>
                            <div
                                class="flex justify-center items-center ml-2 w-[3.5rem] p-1 text-[12px] bg-[#ff1f1f] rounded-[13px]">
                                +关注</div>
                        </div>
                        <div class="w-[100%] mt-1">
                            <van-text-ellipsis style="--van-text-ellipsis-action-color:var(--van-text-ellipsis-action-color)" rows="1"
                                :content="props.mvinfo.desc" expand-text="展开" collapse-text="收起" />
                        </div>
                        <div class="mt-2">
                            {{ props.mvinfo.publishTime }}
                        </div>
                    </div>
                    <div class="flex flex-col justify-between items-center text-[10px]">
                        <div class="w-[2rem] flex flex-col justify-between items-center mt-2">
                            <Icon icon="iconamoon:like-fill" width="2rem" height="2rem" />
                            <div v-if="props.mvdetail.likedCount >= 10000" class="mt-2">{{
                                (props.mvdetail.likedCount / 10000).toFixed(1) + "万" }}</div>
                            <div v-else>{{ props.mvdetail.likedCount }}</div>
                        </div>
                        <div class="w-[2rem] flex flex-col justify-between items-center mt-2">
                            <Icon icon="uis:comment-dots" width="2rem" height="2rem" />
                            <div v-if="props.mvdetail.commentCount >= 10000" class="mt-2">{{
                                (props.mvdetail.commentCount / 10000).toFixed(1) + "万" }}</div>
                            <div v-else>{{ props.mvdetail.commentCount }}</div>
                        </div>
                        <div class="w-[2rem] flex flex-col justify-between items-center mt-2">
                            <Icon icon="majesticons:share" width="2rem" height="2rem" />
                            <div v-if="props.mvdetail.shareCount >= 10000" class="mt-2">{{
                                (props.mvdetail.shareCount / 10000).toFixed(1) + "万" }}</div>
                            <div v-else>{{ props.mvdetail.shareCount }}</div>
                        </div>
                        <div class="w-[2rem] flex flex-col justify-between items-center mt-2">
                            <Icon icon="fluent:collections-20-filled" width="2rem" height="2rem" />
                            <div class="mt-2">收藏</div>
                        </div>
                    </div>
                </div>
                <div class="w-[100%] flex justify-between items-center">
                    <div class="flex justify-start items-center ml-3">
                        <Icon icon="clarity:music-note-solid" width="1rem" height="1rem" />
                        <div class="ml-2">
                            <span>{{ props.mvinfo.name }}</span>
                            <span>-</span>
                            <span>{{ props.mvinfo.artistName }}</span>
                        </div>
                        <Icon class="ml-6" icon="icon-park-outline:like" width="1rem" height="1rem" />
                    </div>
                    <div
                        class="w-[3.1rem] h-[3.1rem] flex justify-center items-center bg-[#272727] rounded-[50%] mr-[5px]">
                        <img class="w-[2.1rem] h-[2.1rem] rounded-[50%]" :src="props.mvinfo.cover" alt="">
                    </div>
                </div>
                <div class="w-[95%] flex justify-center items-center mt-2">
                    <van-slider v-model="videoStatus.progress" button-size="15" @change="onChange" />
                </div>
                <div class="w-[100%] h-[3rem] flex justify-center items-center mt-2 mb-4">
                    <input
                        class="w-[99%] h-[100%] bg-[#252525] text-[#ffffff] border-[none] rounded-[5px] pl-[10px] pr-[10px] outline-[none]"
                        type="text" placeholder="爱评论的人都是可爱的人哦~">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>