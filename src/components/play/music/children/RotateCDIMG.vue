<script setup>
import { ref, watch } from "vue"
const songImg = ref()
const playingStatus = ref(false)
const props = defineProps({
    songImg: {},
    playingStatus: {}
})
songImg.value = props.songImg
playingStatus.value = props.playingStatus
watch(props, () => {
    // console.log("传过来的数据更新了");
    songImg.value = props.songImg
    playingStatus.value = props.playingStatus
})

</script>

<template>
    <div class="cdcard" :class="{ songimgRotate: playingStatus }">
        <img class="" :src="songImg ? songImg : `../../../../public/cd1.png`">
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
</style>