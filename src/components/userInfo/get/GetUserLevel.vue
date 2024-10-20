<!-- 
获取用户等级信息
说明 : 登录后调用此接口 , 可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,对应 https://music.163.com/#/user/level
接口地址 : /user/level
调用例子 : /user/level
-->

<script setup>
import { ref, watch } from 'vue'
import { useRequest } from "vue-request";
import { getUserLevel } from "@/api/userIndex";
import { useUserStore } from "@/store";

const userStore = useUserStore()
const { data, loading } = useRequest(() => getUserLevel({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))

watch(data, () => {
    console.log(data.value);
})
</script>

<template>
    <div>


    </div>
</template>
<style scoped></style>