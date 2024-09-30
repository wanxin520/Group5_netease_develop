import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  // 类似于data
  state() {
    return {
      userInfo: null,
    };
  },
  getters: {
    cookie(state) {
      return state.userInfo?.cookie;
    },
  },
  // 类似于methods
  actions: {
    // 设置储存userInfo的函数
    setUserInfo(data) {
      this.userInfo = data
    }
  },
  persist: true,
});
