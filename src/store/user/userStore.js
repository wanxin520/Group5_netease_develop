import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  // 类似于data
  state() {
    return {
      userInfo: null,
      anonimousUser:false,
    };
  },
  getters: {
    cookie(state) {
      return state.userInfo?.cookie;
    },
    getLoginStatus(state){
      return state.anonimousUser
    }
  },
  // 类似于methods
  actions: {
    // 设置储存userInfo的函数
    setUserInfo(data) {
      console.log(data);
      this.userInfo = data
    },
    setLoginStatus(isLogin){
      this.anonimousUser = isLogin
    }
  },
  persist: true,
});
