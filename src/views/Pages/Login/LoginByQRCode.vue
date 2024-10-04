<script setup>
import { Icon } from "@iconify/vue";
import { getQRCodeKey, createQRCodeIMG, checkQRLoginIsSuccessful } from "@/api";
import localforage from "localforage";
import { ref, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "vue-request";
import { useUserStore } from "@/store";
import axios from "axios";

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const isScanedCode = ref()
const timestamp = Date.now()
const QRIMG = ref()

// 获取二维码 key
const { run: getUnikey, data: unikey } = useRequest(() => getQRCodeKey({ "timestamp": timestamp }), { manual: true })
// 生成二维码unikey
const { run: getQRIMG, data: qrimg, loading } = useRequest(() => createQRCodeIMG({ "qrimg": "true", "key": unikey.value.data.unikey, "timestamp": timestamp }), { manual: true })
watch(unikey, () => {
  setTimeout(() => {
    getQRIMG()
  }, 1000)
})
watch(qrimg, () => {
  QRIMG.value = qrimg.value.data.qrimg
  // 检测二维码扫码状态
  const checkStatusTimer = setInterval(() => {
    axios.post(`https://neteasecloudmusicapi-main-api.vercel.app/login/qr/check?key=${unikey.value.data.unikey}&timestamp=${Date.now()}`)
      .then((res) => {
        // console.log(unikey.value.data.unikey);
        console.log(res.data.code);
        isScanedCode.value = res.data.code
        if (res.data.code == 800) {
          console.log('二维码已过期,请重新获取')
          clearInterval(checkStatusTimer)
          return
        }
        if (res.data.code === 802) return console.log("正在确认授权");
        if (res.data.code === 803) {
          // 这一步会返回cookie
          clearInterval(checkStatusTimer)
          // 登陆成功之后将返回的用户数据以及登录cookie储存在userStore里面
          userStore.setUserInfo(res.data)
          // console.log(userStore.userInfo.cookie);
          // 同时还将用户数据储存在localForeage里面
          localforage.setItem("userInfo", res.data)
            .then((res) => {
              // console.log(res);
              showToast("登录成功,正在前往首页")
              setTimeout(() => {
                router.push({ name: "discover" })
              }, 1500)
            })
            .catch(() => {
              showToast("登录失败!")
            })
        }
      })
  }, 1000)
})

// 初始化
onMounted(() => {
  getUnikey()
})
// 刷新
const reFresh = () => {
  getUnikey()
}

// 手机登录
const loginByPhone = () => {
  router.push({ name: "phone" });
};
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-between bg-[#fcfcfc]">
    <div class="w-[100%] h-[10vh] flex justify-between">
      <div @click="loginByPhone" class="text-[2rem]  flex justify-center items-center mx-2">
        <Icon icon="iconamoon:arrow-left-2-light" width="2rem" style="color: gray" />
      </div>
    </div>
    <div class="flex w-[100%] h-[10vh] justify-center items-center ">
      <img class="w-[12rem]" src="/public/logo.fill.svg" alt="">
    </div>
    <div class="w-[100%] h-[30vh] flex justify-center items-center">
      <div v-if="qrimg" class="w-[100%] h-[100%] flex justify-center items-center relative">
        <img :src="QRIMG" alt="">
        <div v-if="(isScanedCode == 800)" @click="reFresh"
          class="absolute flex justify-center items-center text-[14px] text-[#000000] bg-[#e0e0e0d7] w-[12rem] h-[12rem] ">
          二维码已过期，点击刷新</div>
        <div v-if="(isScanedCode == 802)"
          class="absolute flex justify-center items-center text-[14px] text-[#000000] bg-[#e0e0e0d7] w-[12rem] h-[12rem] ">
          已扫码，请确认登录</div>
        <div v-if="(isScanedCode == 803)"
          class="absolute flex justify-center items-center text-[14px] text-[#000000] bg-[#e0e0e0d7] w-[12rem] h-[12rem] ">
          登录成功，正在跳转至首页</div>
      </div>
      <div v-else><span>正在刷新二维码图片...</span></div>
    </div>
    <div class="w-[100%] h-[10vh] flex justify-center items-center">
      <div class="text-[12px]">请使用 <span class="text-[#59b4ff]">网易云音乐App</span> 扫码登录</div>
    </div>
    <div class="w-[100%] h-[30vh]"
      style="background-image: url(/public/loginbg.png); background-repeat: no-repeat; background-size: cover;">
    </div>
  </div>

</template>
<style scoped></style>