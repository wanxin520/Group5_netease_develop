<!-- 获取账号信息
说明 : 登录后调用此接口 ,可获取用户账号信息
接口地址 : /user/account
调用例子 : /user/account -->

<script setup>
import { ref } from 'vue'
import GetUserDetail from "./GetUserDetail.vue"
import { useRouter } from "vue-router";

const router = useRouter()
const props = defineProps({
    data: Object,
    require: true
})
// console.log(props.data);

const defaultAvatar = ref("http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg")
const defaultBGIMG = ref("http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg")
const scrollDate = ref()
const bgc = ref()
const scroll = () => {
    scrollDate.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    scrollDate.value > 150 ? bgc.value = `rgba(255, 255, 255,${(scrollDate.value - 150) / 100})` : bgc.value = `rgba(255, 255, 255,0)`
}

// 跳转至手机登录
const toLoginByPhone = () => {
    router.replace({ name: "phone" })
}
</script>

<template>
    <div class="h-[45vh]">
        <div v-if="!props.data.profile" class="w-[100%] h-[100%] flex flex-col justify-around items-center">
            <div>你还未登录，请先登录</div>
            <div class="text-[#6a60fd]" @click="toLoginByPhone">点此登录</div>
        </div>
        <div v-else class="h-[100%] flex flex-col justify-between items-center"
            :style="{ backgroundImage: `url(${data.profile.backgroundUrl ? data.profile.backgroundUrl : defaultBGIMG})` }">
            <div class="w-[100%]">
                <van-sticky @scroll="scroll">
                    <div :style="{ backgroundColor: `${bgc}` }">
                        <slot name="topbar"></slot>
                    </div>
                </van-sticky>
            </div>
            <div class="w-[100%] flex flex-col justify-around items-center ">
                <div class="w-[100%] flex justify-center">
                    <img class="w-[5rem] h-[5rem] rounded-[50%]" :src="(data.profile.avatarUrl ? data.profile.avatarUrl : defaultAvatar)" alt="">
                </div>
            </div>
            <div class="w-[100%]">
                <getUserDetail :uid="data.account.id"></getUserDetail>
            </div>
            <div class="w-[100%]">
                <slot name="bottombar"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped></style>