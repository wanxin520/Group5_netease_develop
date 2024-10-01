<script setup>
import { loginByPhone, sendValidCode } from "@/api";
import { Icon } from "@iconify/vue";
import localforage from "localforage";
import to from "await-to-js";
import { ref, watch } from "vue"
import { useUserStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "vue-request";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const checked = ref(false)
const showInputValidCode = ref(false)
const showBottom = ref(false)

const userInfo = ref({
  phone: "",
  captcha: ""
})
const { run: login, data: resolveLoginData } = useRequest(() =>
  loginByPhone({ "phone": userInfo.value.phone, "captcha": userInfo.value.captcha }), { manual: true })
watch(resolveLoginData, async () => {
  // 登陆成功之后将返回的用户数据以及登录cookie储存在userStore里面
  userStore.setUserInfo(resolveLoginData.value)
  // console.log(resolveLoginData.value.token);
  const [error] = await to(localforage.setItem("userInfo", resolveLoginData.value))
  if (error) return showToast("数据存储失败")
  router.push({ name: "discover" })
})
// 当需要手动发送请求的时候，需要使manual的值为true，并调用们方法执行
// 获取验证码
const { run: getValidCode, data: resolveValidCode, loading } = useRequest(() => sendValidCode({ "phone": userInfo.value.phone }), { manual: true })
watch(resolveValidCode, () => {
  // console.log(resolveValidCode.value);
  showInputValidCode.value = true
  showToast("验证码发送成功！")
})
const showAreYouOk = () => {
  showToast("你行不行啊？")
}
</script>

<template>
  <div class="container flex flex-col justify-around items-center">
    <div class="flex self-start p-2">
      <van-icon name="arrow-left" />
    </div>
    <div class="h-[40%] flex justify-center items-center">
      <Icon icon="simple-icons:neteasecloudmusic" width="4.6rem" style="color: #ff0000" />
    </div>
    <div v-if="!showInputValidCode">
      <div class="h-[8rem] flex flex-col justify-between items-center">
        <van-cell-group class="w-[18rem]" inset>
          <van-field v-model="userInfo.phone" label="+86" size="large" maxlength="11" label-width="30"
            placeholder="请输入手机号" />
        </van-cell-group>
        <van-button class="w-[18rem]" v-if="loading" loading color="rgb(255, 55, 55)" round loading-type="spinner"
          loading-text="正在发送..." />
        <van-button @click="getValidCode" :disabled="!(userInfo.phone.length > 10 && checked == true)" v-else
          class="w-[18rem]" color="rgb(255, 55, 55)" round text="验证码登录" />
      </div>
      <div class="flex flex-col justify-center items-center mt-3">
        <van-radio-group v-model="checked" shape="square">
          <van-radio class="text-[10px]" name="1" checked-color="rgb(154, 156, 158)" icon-size="10px">
            <span>我已阅读并同意</span><span class="text-[#4986e2] text-[12px]">《服务条款》、《隐私政策》</span>
          </van-radio>
        </van-radio-group>
        <span class="text-[#4986e2] text-[12px]">《中国移动认证服务协议》</span>
      </div>
    </div>
    <div v-else class="flex flex-col justify-start items-center">
      <div class="w-[18rem] text-[10px] flex justify-between items-center p-4">
        <span>已发送至 {{ userInfo.phone }}</span>
        <span @click="showAreYouOk" class="text-[#519dff]">没收到验证码？</span>
      </div>
      <van-field class="rounded-[30px]" v-model="userInfo.captcha" placeholder="请输入短信验证码">
        <template #button>
          <span @click="getValidCode" class="text-[10px]">重新获取</span>
        </template>
      </van-field>
      <div @click="login" class="mt-5 h-[4rem] w-[4rem] rounded-[50%] bg-[#ffffff] flex justify-center items-center">
        <Icon icon="ion:enter-outline" width="1.6rem" height="1.6rem" class="text-[#000000]" />
      </div>
    </div>
    <div @click="showBottom = !showBottom" class="h-[10%] text-[11px] text-[#999999]">
      使用其他方式登录
    </div>
    <!-- 底部弹出层 -->
    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '20%' }">
      <van-list>
        <van-cell center to="qrcode">
          <div class="w-[100%] flex justify-center items-center ">
            <van-icon name="scan" />
            <div class="ml-4">二维码登录</div>
          </div>
        </van-cell>
        <van-cell center to="email">
          <div class="w-[100%] flex justify-center items-center ">
            <van-icon name="envelop-o" />
            <div class="ml-4">邮箱登录</div>
          </div>
        </van-cell>
        <van-cell center to="tourist">
          <div class="w-[100%] flex justify-center items-center ">
            <van-icon name="user-o" />
            <div class="ml-4">游客登录</div>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
  </div>


</template>
<style scoped>
.container {
  height: 100vh;
  background-image: linear-gradient(to bottom, rgb(255, 208, 208), rgb(241, 241, 241) 60%);
}
</style>