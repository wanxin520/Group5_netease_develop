import { ref, watch } from "vue"
import { usePlayStore } from "@/store";

const playStore = usePlayStore()
export const songMessage = ref({
    songFile: playStore.getSongsUrl[playStore.playIndex].url,
    songName: playStore.getSongsDetail.songs[playStore.playIndex].name,
    artistName: playStore.getSongsDetail.songs[playStore.playIndex].ar[0].name,
    songPicUrl: playStore.getSongsDetail.songs[playStore.playIndex].al.picUrl,
    isFee: playStore.getSongsUrl[playStore.playIndex].fee,
    songDuration: playStore.getSongsUrl[playStore.playIndex].time,
    songLevel: playStore.getSongsUrl[playStore.playIndex].level,
    playListLength: playStore.getSongsUrl.length
})
export const musicPlayingData = ref({
    ready: false,
    playing: false,
    current: 0,
    progress: 0,
})
watch(playStore, () => {
    // console.log("store数据变化了");
    songMessage.value.songFile = playStore.getSongsUrl[playStore.playIndex].url
    songMessage.value.songName = playStore.getSongsDetail.songs[playStore.playIndex].name
    songMessage.value.artistName = playStore.getSongsDetail.songs[playStore.playIndex].ar[0].name
    songMessage.value.songPicUrl = playStore.getSongsDetail.songs[playStore.playIndex].al.picUrl
    songMessage.value.isFee = playStore.getSongsUrl[playStore.playIndex].fee
    songMessage.value.songDuration = playStore.getSongsUrl[playStore.playIndex].time
    songMessage.value.songLevel = playStore.getSongsUrl[playStore.playIndex].level
    songMessage.value.playListLength = playStore.getSongsUrl.length
    musicPlayingData.value.ready = true
})

export const audio = new Audio(playStore.getSongsUrl[playStore.playIndex].url)
// 检查歌曲是否加载完成
let checkReady = setInterval(() => {
    audio.readyState == 4 || audio.readyState == 3
        ?
        [
            musicPlayingData.value.ready = true,
            clearInterval(checkReady)
        ]
        : musicPlayingData.ready = false
    // console.log(audio.readyState);
}, 1000)
let currentInterval
// 播放
export const play = () => {
    currentInterval = setInterval(() => {
        musicPlayingData.value.current = audio.currentTime * 1000
        musicPlayingData.value.progress = ((audio.currentTime * 1000) / songMessage.value.songDuration) * 100
    }, 500)
    musicPlayingData.value.playing = true
    audio.play()
}
// 暂停
export const pause = () => {
    clearInterval(currentInterval)
    musicPlayingData.value.playing = false
    audio.pause()
}
// 上一曲
export const backSong = () => {
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
            // console.log(playStore.getSongsUrl[playStore.playIndex].url),
            audio.src = playStore.getSongsUrl[playStore.playIndex].url,
            musicPlayingData.value.ready == true ? [audio.play()] : musicPlayingData.value.ready = false
        ]
}

// 下一曲
export const nextSong = () => {
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
            // console.log(playStore.getSongsUrl[playStore.playIndex].url),
            audio.src = playStore.getSongsUrl[playStore.playIndex].url,
            musicPlayingData.value.ready == true ? [audio.play()] : musicPlayingData.value.ready = false
        ]
}