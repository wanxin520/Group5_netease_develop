<script setup>
import { loginByPhone, sendValidCode } from "@/api";
import { Icon } from "@iconify/vue";
import localforage from "localforage";
import { ref, watch, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "vue-request";
import { showToast } from "vant";

const route = useRoute()
const router = useRouter()
const isShowPswwordLogin = ref(true)
const userInfo = ref({
  phone: "",
  password: "",
  captcha: ""
})

const { run: login, data: resolveLoginData } = useRequest(() =>
  !userInfo.value.captcha
    ?
    loginByPhone({ "phone": userInfo.value.phone, "password": userInfo.value.password })
    // console.log("密码登录")
    :
    loginByPhone({ "phone": userInfo.value.phone, "captcha": userInfo.value.captcha })
  // console.log("验证码登录")
  , { manual: true })

watch(resolveLoginData, async () => {
  const [error] = await to(localforage.setItem("userInfo", resolveLoginData.value.data))
  if (error) return showToast("数据存储失败")
  // 创建本地存储
  console.log(success);
  router.replace({ name: "homepage" })
})

// 当需要手动发送请求的时候，需要使manual的值为true，并调用们方法执行
// 获取验证码
const { run: getValidCode, data: resolveValidCode, loading } = useRequest(() => sendValidCode({ "phone": userInfo.value.phone }), { manual: true })
watch(resolveValidCode, () => {
  console.log(resolveValidCode.value);
  if (resolveValidCode.value.data.code !== 200) {
    showToast(resolveValidCode.value.data.message)
  } else {
    showToast("验证码发送成功！")
  }
})

// 扫码登录
const toLoginByQRCode = () => {
  router.push({ name: 'qrcode', query: { originPath: route.query.originPath } })
}
// 邮箱登录
const toLoginByEmail = () => {
  router.push({ name: 'email', query: { originPath: route.query.originPath } })
}
// 游客登录
const toLoginByTourist = () => {
  router.push({ name: 'tourist', query: { originPath: route.query.originPath } })
}
// 返回上个页面
const toBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-between relative bg-[#fcfcfc]">
    <div class="w-[100%] h-[10vh] flex justify-between">
      <div @click="toBack" class="text-[2rem]  flex justify-center items-center mx-2">
        <Icon icon="iconamoon:arrow-left-2-light" width="2rem" style="color: gray" />
      </div>
    </div>
    <div class="flex w-[100%] h-[13vh] justify-center items-center ">
      <img class="w-[12rem]" src="/public/logo.fill.svg" alt="">
    </div>
    <div class="w-[100%] h-[60vh] justify-around items-center flex flex-col">
      <div class="w-[80%] mx-auto flex justify-center items-center">
        <input class="w-[20rem] h-[3.5rem] bg-[#f5dfda] text-center rounded-[20px]" placeholder="请输入手机号"
          v-model="userInfo.phone"></input>
      </div>
      <div class="w-[80%] mx-auto flex justify-center items-center">
        <input class="w-[20rem] h-[3.5rem] bg-[#f5dfda] text-center rounded-[20px]" v-if="isShowPswwordLogin"
          placeholder="请输入密码" v-model="userInfo.password"></input>
        <div v-else class="flex justify-between items-center w-[20rem]">
          <input class="w-[60%] h-[3.5rem] bg-[#f5dfda] text-center rounded-[20px]" placeholder="请输入验证码"
            v-model="userInfo.captcha"></input>
          <van-button v-if="loading" class="w-[35%] h-[100%] bg-[#59b4ff] text-[13px]" loading type="primary"
            loading-type="spinner" />
          <van-button v-else="!loading" class="w-[35%] h-[100%] bg-[#59b4ff] text-[13px]" @click="getValidCode"
            type="primary" loading-type="spinner" text="发送验证码" />
        </div>
      </div>
      <div class="flex h-[1vh] w-[18rem] text-[12px] justify-between items-center mx-auto">
        <div class="text-[#3f3f3f]" @click="isShowPswwordLogin = !isShowPswwordLogin">验证码登录</div>
        <div class="text-[#6fe9ff]">没有账号？去注册</div>
      </div>
      <div class="w-[18rem] h-[40px]">
        <van-button type="danger" class="w-[100%] h-[100%] bg-[#ff2222]" @click="login"> 登录 </van-button>
      </div>
      <div class="w-[25rem] h-[40px] flex justify-evenly ">
        <div class="flex justify-center items-center text-[#838383] mx-4" @click="toLoginByQRCode">
          <Icon class="mr-2" icon="mingcute:scan-line" width="1.2rem" height="1.2rem" style="color: #40d4ca" />
          <div class="text-[13px]">扫码登录</div>
        </div>
        <div class="flex justify-center items-center text-[#838383] mx-4" @click="toLoginByEmail">
          <Icon class="mr-2" icon="clarity:email-line" width="1.2rem" height="1.2rem" style="color: #40d4ca" />
          <div class="text-[13px]">邮箱登录</div>
        </div>
        <div class="flex justify-center items-center text-[#838383] mx-4" @click="toLoginByTourist">
          <Icon class="mr-2" icon="ic:outline-people" width="1.2rem" height="1.2rem" style="color: #40d4ca" />
          <span class="text-[13px]">游客登录</span>
        </div>
      </div>
    </div>
    <div class="w-[100%] h-[30vh]"
      style="background-image: url(/public/loginbg.png); background-repeat: no-repeat; background-size: cover;"></div>
  </div>
</template>
<style scoped></style>