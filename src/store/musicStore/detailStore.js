import { defineStore } from "pinia";

export const useSongDetailStore = defineStore("songdetail", {
    state() {
        return {
            songsDetail: null,
        }
    },
    getters: {
        // 获取需要播放的音乐的信息
        getSongsDetail(state) {
            return state.songsDetail
        },

    },
    actions: {
        // 设置需要播放学音乐的信息
        setSongsDetail(songsDetail) {
            this.songsDetail = songsDetail
        },
    },
    // 开启数据持久化
    persist: true
});
