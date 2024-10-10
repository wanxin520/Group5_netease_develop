import { defineStore } from "pinia";

export const usePlayStore = defineStore("musicData", {
    state() {
        return {
            showPlayBar: false,
            songsUrl: null,
            songsDetail: null,
            playIndex: 0,
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
        getShowPlayBar(state) {
            return state.showPlayBar
        },

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
        setShowPlayBar(showPlayBar) {
            this.showPlayBar = showPlayBar
        },
    },
    // 开启数据持久化
    persist: true
});
