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
    ready: true,
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
    // musicPlayingData.value.ready = true
    // console.log(songMessage.value)
    // console.log(playStore.getSongsDetail)
})

export const audio = new Audio(playStore.getSongsUrl[playStore.playIndex].url)
// 检查歌曲是否加载完成
let checkReady = setInterval(() => {
    audio.readyState == 4 || audio.readyState == 3
        ?
        [
            musicPlayingData.value.ready = false,
            clearInterval(checkReady)
        ]
        : musicPlayingData.ready
    console.log(audio.readyState);
}, 1000)
let currentInterval
// 播放
export const play = () => {
    currentInterval = setInterval(() => {
        musicPlayingData.value.current = audio.currentTime * 1000
        console.log(musicPlayingData.value.current);
    }, 1000)
    audio.play()
}
export const pause = () => {
    clearInterval(currentInterval)
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
            console.log(playStore.getSongsUrl[playStore.playIndex].url),
            audio.src = playStore.getSongsUrl[playStore.playIndex].url,
            audio.play()
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
            console.log(playStore.getSongsUrl[playStore.playIndex].url),
            audio.src = playStore.getSongsUrl[playStore.playIndex].url,
            audio.play()

        ]
}


























/* 
volume: 非只读，获取或者修改当前音频对象的音量值，它的值的范围在0–1之间。

src: 非只读，获取或者修改音频的资源来源，如果刚刚使用 "createElement"创建该标签的话，src就是必要之选，没有src就不可能有音频资源。

preload: 非只读，修改或返回当前标签的预加载的属性值。值为auto/none/metadata

autoplay: 非只读，修改或返回当前标签的是否自动播放的属性值。值为true/false

paused: 判断当前音频是否暂停

currentTime: 获取当前音频的播放进度，以秒为单位，小数点后保留六位小数，是制作自己的播放器的进度条的重要组成部分。

duration: 返回当前音频的总长度。以秒为单位。

ended: 判断当前的音频是否播放完成。值为true/false

loop: 非只读，修改或返回当前音频是否要在结束的时候从头开始播放，值为true/false

currentSrc: 返回当前音频的资源地址，是只读的

muted: 非只读修改或返回当前音频是否静音，值为true/false

controls: 非只读，判断或修改是否使用浏览器原生控件，值为true/false

playbackRate: 非只读，修改或返回当前音频播放速度。但**只有 Chrome 和 Safari 支持该特性。**1为原速，1以下减速，1以上加速。

readyState: 判断当前音频的就绪状态。它由数字来表示状态。0表示没有关于音频是否就绪的信息(资源找不到)，1表示有音频的元数据（音频大小，长短），2表示当前播放数据可用，但是没有足够数据播放下一帧(卡顿)，3表示当前和至少下一帧数据是可用的，4表示可用数据足以满足播放。

defaultMuted: 非只读，设置或返回当前音频是否默认是否静音，值为true/false

defaultPlaybackRate: 非只读，设置或返回音频默认播放速度。

error: 如果音频有播放错误，则返回错误对象MediaError ，如果没有错，它的值就是null，以下为正常的错误格式

MediaError: {
    code: ERRORCODE,
    message: "xxxxx"
}
它有四种错误代码（上面的code）: 错误码为1表示用户主动停止对音频信息的请求，错误码为2表示下载时发生错误，网络环境不好或者丢包率过高或其他通信问题，错误码为3表示视频文件解码的时候发生错误，错误码为4表示资源找不到或者当前浏览器不支持音频。

mediaGroup: 它需要后期被赋值，属性设置或返回音频所属的媒体组合的名称。媒体分组允许两个或更多音频元素保持同步。

audio.mediaGroup = "aGroup"
audio2.mediaGroup = "aGroup"

networkState: 只读属性，表示音频当前的网络状态，它有四个状态码，0表示音频尚未初始化，1表示是活动的且已选取资源，但并未使用网络，是本地资源，2表示浏览器正在下载数据，3表示未找到音频资源

textTracks: 返回表示可用文本轨道的 TextTrackList 对象。这里在以后有机会会细讲

played: 返回表示音频已播放部分的 TimeRanges 对象。

seekable: 返回表示音频可寻址部分的 TimeRanges 对象。
seeking: 判断用户是否在寻址（是否在滑动进度条）

buffered: 返回表示音频已缓冲部分的 TimeRanges 对象。


// 拿到audio标签
    var audioTag=document.getElementById("audioTag");
    //currentTime:获取当前播放时间，单位是秒s，可读可写
    console.log(audioTag.currentTime);
    //duration:音频总时长，单位是秒s，注意在load()方法之前,duration的值是NaN，只读
    console.log(audioTag.duration);
    //volume:音量，返还当前音量，最小是0，最大是1。可读可写
    audioTag.volumn+=0.1;
    //playbackRate:播放速率,返还播放速度，值是速度的倍率门最大播放速度根据内核的不同而有所不同，正常来说2倍够用了。可读可写
    audioTag.playbackRate=2;
    //play():播放音频,由于autoplay()被取消以后，有的同学可能会想在window.onload里面用play(),但是不行哦，会报错。现在强制要求用户与页面互动之后才能播放音频文件哦~
    audioTag.play();
    //pause():暂停正在播放的音乐
    audioTag.pause();
    //load():设置preload的属性值
    audioTag.load("none");


loadstart:开始加载；
durationchange:时长改变；
loadedmetadata:源数据加载完毕；
loadeddata:数据开始加载；
progress:加载中；
canplay:音频可以播放的状态；
canplaythrough:可以播放整个音频，音频播放加载完全完成了；

播放事件:
timeupdate:时间更新，指的是currentTime,最频繁的是“每250毫秒触发一次”;
waiting:等待中，由于没有数据而导致展厅时播放；
playing:播放中，从waiting状态转换到可以播放的状态时触发；
play:播放，play()方法被调用时触发；
pause:暂停，pause()方法被调用时触发；
ended:结束，音频播放完毕后触发；
volumechange:音量改变;



*/