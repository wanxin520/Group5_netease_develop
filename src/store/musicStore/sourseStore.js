import { defineStore } from "pinia";

export const useSourseStore = defineStore("sourse", {
    state() {
        return {
            musicSourseIds: null,
        };
    },
    // 定义派生数据
    getters: {
        getMusicSourseIds(state) {
            return state.musicSourseIds
        }
    },
    actions: {
        setMusicSourseIds(sourseIds) {
            this.musicSourseIds = sourseIds
        }
    },
    // 开启数据持久化
    persist: true
});
