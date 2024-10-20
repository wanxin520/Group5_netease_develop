<!-- 
获取用户信息 , 歌单，收藏，mv, dj 数量
说明 : 登录后调用此接口 , 可以获取用户信息
接口地址 : /user/subcount
调用例子 : /user/subcount 
-->

<script setup>
import { ref, watch } from 'vue'
import { useRequest } from "vue-request";
import { getUserSubcount } from "@/api/userIndex";
import { useUserStore } from "@/store";

const userStore = useUserStore()
const { data, loading } = useRequest(() => getUserSubcount({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))

watch(data, () => {
    console.log(data.value);
})
</script>

<template>
    <div>


    </div>
</template>
<style scoped></style>