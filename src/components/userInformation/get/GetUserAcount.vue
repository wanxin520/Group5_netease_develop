<!-- 获取账号信息
说明 : 登录后调用此接口 ,可获取用户账号信息
接口地址 : /user/account
调用例子 : /user/account -->

<script setup>
import { ref, watch } from "vue"
import { useRequest } from 'vue-request';
import { getUserAccount, getUserDetail } from '@/api/userIndex';
import { useUserStore } from "@/store";
import GetUserDetail from "./GetUserDetail.vue"

const userStore = useUserStore()
const { data: userAccount, loading } = useRequest(() => getUserAccount({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))

// watch(userAccount, () => {
//     console.log(userAccount.value);
// })
</script>

<template>
    <div v-if="!loading" class="h-[45vh]">
        <div class="h-[100%] flex flex-col justify-between items-center"
            :style="{ backgroundImage: `url(${userAccount.profile.backgroundUrl})` }">
            <div class="w-[100%]">
                <slot name="topbar"></slot>
            </div>
            <div class="w-[100%] flex flex-col justify-around items-center ">
                <div class="w-[100%] flex justify-center">
                    <img class="w-[5rem] h-[5rem] rounded-[50%]" :src="userAccount.profile.avatarUrl" alt="">
                </div>
            </div>
            <div class="w-[100%]">
                <getUserDetail :account="userAccount.account"></getUserDetail>
            </div>
            <div class="w-[100%]">
                <slot name="bottombar"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped></style>