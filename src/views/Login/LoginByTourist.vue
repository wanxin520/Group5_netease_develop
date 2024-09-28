<!-- 游客登录页面 -->

<script setup>
import { ref, watch } from "vue";
import { loginByTourist } from "@/api";
import localforage from "localforage";
import { useUserStore } from "@/store";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "vue-request";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore()

const isClicked = ref(false)

// 当需要手动发送请求的时候，需要使manual的值为true，并调用们方法执行
// 发起登录请求
const { run: login, data, loading } = useRequest(() => loginByTourist(), { manual: true })
watch(data, () => {
  if (data.value.code !== 200) {
    showToast(data.message)
  } else {
    showToast("登录成功！")
  }
  // console.log(data.value);
  // 登陆成功之后将返回的用户数据以及登录cookie储存在userStore里面
  userStore.setUserInfo(data.value)
  console.log(userStore.userInfo.cookie);
  // 同时还将用户数据储存在localForeage里面
  localforage.setItem("userInfo", data.value)
  // localforage.getItem("userInfo")
  // .then((res)=>{
  //     console.log(res);
  // })
})

const toBack = () => {
  router.push({ name: "phone" });
};
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-between bg-[#fcfcfc] content">
    <div class="w-[100%] h-[10vh] flex justify-between">
      <div @click="toBack" class="text-[13px] flex justify-center items-center mx-2">
        <Icon icon="iconamoon:arrow-left-2-light" width="2rem" class="text-[#ffffff]" />
        <span class="text-[#ffffff]">返回手机登录</span>
      </div>
    </div>
    <div class="flex w-[100%] h-[10vh] justify-center items-center">
      <img class="w-[12rem]" src="/public/logo.fill.svg" alt="" />
    </div>
    <div class="flex justify-center items-center">
      <van-button @click="login" v-if="!loading" class="w-[16rem]" type="warning"
        color="linear-gradient(to right, #ff6034, #ee0a24)">游客登录</van-button>
      <van-button v-else class="w-[16rem]" loading=" isLoding" loading-type="spinner" disabled="isClecked"
        color="linear-gradient(to right, #ff6034, #ee0a24)" loading-text=" 正在登录..." />
    </div>
    <div class="w-[100%] h-[30vh]" style="
        background-image: url(/public/loginbg.png);
        opacity: 0.6;
        background-repeat: no-repeat;
        background-size: cover;
      "></div>
  </div>
</template>
<style scoped>
.content {
  background-image: linear-gradient(to bottom, #f58a8a 10%, rgb(255, 255, 255) 60%);
}
</style>
