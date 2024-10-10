import { defineStore } from "pinia";

export const useSongUrlStore = defineStore("songurl", {
    state() {
        return {
            songsUrl: null,
        }
    },
    getters: {
        // 获取需要播放的音乐的信息
        getSongsUrl(state) {
            return state.songsUrl
        },
    },
    actions: {
        // 设置需要播放学音乐的信息
        setSongsUrl(songsUrl) {
            this.songsUrl = songsUrl
        },
    },
    // 开启数据持久化
    persist: true
});
