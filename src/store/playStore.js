import { defineStore } from "pinia";

export const usePlayStore = defineStore("musicData", {
    state() {
        return {
            songsUrl: null,
            songsDetail: null,
            playIndex: 0,
            loadingStatus: true,
            playingStatus: false,
            playedTime: 0,
            progress: 0,
        }
    },
    getters: {
        // 获取需要播放的音乐的信息
        getSongsUrl(state) {
            return state.songsUrl
        },
        getSongsDetail(state) {
            return state.songsDetail
        },
        getPlayIndex(state) {
            return state.playIndex
        },
        // getloadingStatus(state) {
        //     return state.loadingStatus
        // },
        // getplayingStatus(state) {
        //     return state.playingStatus
        // },
        // getplayedTime(state) {
        //     return state.playedTime
        // },
        // getprogress(state) {
        //     return state.progress
        // },
    },
    actions: {
        // 设置需要播放学音乐的信息
        setSongsUrl(songsUrl) {
            this.songsUrl = songsUrl
        },
        setSongsDetail(songsDetail) {
            this.songsDetail = songsDetail
        },
        setPlayIndex(playIndex) {
            this.playIndex = playIndex
        },
        // setloadingStatus(loadingStatus) {
        //     this.playIndex = loadingStatus
        // },
        // setplayingStatus(playingStatus) {
        //     this.playIndex = playingStatus
        // },
        // setplayedTime(playedTime) {
        //     this.playIndex = playedTime
        // },
        // setprogress(progress) {
        //     this.playIndex = progress
        // },
    },
    // 开启数据持久化
    persist: true
});
