import { defineStore } from "pinia";

export const usePlayStore = defineStore("musicData", {
    state() {
        return {
            showPlayBar: false,
            playIndex: 0,
        }
    },
    getters: {
        getPlayIndex(state) {
            return state.playIndex
        },
        getShowPlayBar(state) {
            return state.showPlayBar
        },

    },
    actions: {
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
