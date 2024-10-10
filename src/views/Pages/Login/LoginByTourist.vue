<!-- 游客登录页面 -->

<script setup>
import { ref, watch } from "vue";
import { loginByTourist } from "@/api";
import localforage from "localforage";
import { useUserStore } from "@/store";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "vue-request";
import to from "await-to-js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore()

const isClicked = ref(false)

// 当需要手动发送请求的时候，需要使manual的值为true，并调用们方法执行
// 发起登录请求
const { run: login, data, loading } = useRequest(() => loginByTourist(), { manual: true })
watch(data, async () => {
  if (data.value.code !== 200) {
    showToast(data.message)
  } else {
    showToast("登录成功！")
  }
  // console.log(data.value);
  // 登陆成功之后将返回的用户数据以及登录cookie储存在userStore里面
  userStore.setUserInfo(data.value)
  // console.log(userStore.userInfo.cookie);
  // 同时还将用户数据储存在localForeage里面
  const [error] = await to(localforage.setItem("userInfo", data.value))
  if (error) return showToast("数据存储失败")
  showToast("登录成功,正在前往首页")
  userStore.setLoginStatus(true)
  router.replace({ name: "discover" })
})
const loginByPhone = () => {
  router.push({ name: "phone" });
};
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-around bg-[#fcfcfc] content">
    <div class="h-[40%] flex justify-center items-center">
      <div class=" bg-[#ff0000] rounded-[50%]">
        <!-- <Icon icon="ri:netease-cloud-music-fill" width="5.6rem" height="5.6rem" /> -->
        <Icon icon="simple-icons:neteasecloudmusic" width="4.6rem" height="4.6rem" class="text-[#ffffff]" />
      </div>
    </div>
    <div class="">
      <div @click="loginByPhone" class="h-[4rem] flex flex-col justify-between items-center">
        <van-button class="w-[18rem]" color="rgb(255, 0, 0)" round text="手机号登录" />
      </div>
      <div @click="login" v-if="!loading" class="h-[4rem] flex flex-col justify-between items-center">
        <van-button class="w-[18rem]" color="rgb(255, 55, 55)" plain round text="立即体验" />
      </div>
      <div v-else class="h-[4rem] flex flex-col justify-between items-center">
        <van-button class="w-[18rem]" color="rgb(255, 55, 55)" :loading="loading" plain round text="正在使用游客登录" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  height: 100vh;
  background-image: linear-gradient(to bottom, rgb(255, 168, 168), rgb(255, 255, 255));
}
</style>
