<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { getLoginStatus } from "@/api";
import { useUserStore } from "@/store";

const userInfo = ref()

const userStore = useUserStore()
// 获取登录状态
const { data: loginStatus, loading } = useRequest(() => getLoginStatus({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))

watch(loginStatus, () => {
    // console.log(loginStatus.value);
    userInfo.value = loginStatus.value.profile
})

// 弹出层
const showLeft = ref(false);
const showPopup = () => {
    showLeft.value = true;
};

</script>

<template>
    <div>
        <van-badge :content="200" max="99">
            <Icon @click="showPopup" icon="ion:menu" width="1.5rem" style="color: #b5b5b5" />
        </van-badge>
        <!-- 左侧弹出 -->
        <van-popup v-model:show="showLeft" position="left" :style="{ width: '80%', height: '100%' }">
            <van-loading v-if="loading" type="spinner" size="24px" />
            <div v-else class="w-[100%] h-[100%] bg-[#e7e7e7] flex flex-col justify-start items-center" ref="container">

                <div class="w-[100%] h-[10vh] flex justify-between items-center p-3 bg-[#ffffff]">
                    <div class="w-[70%] flex justify-start items-center">
                        <img class="w-[2rem] rounded-[50%]" :src="userInfo.avatarUrl" alt="">
                        <div class="text-[14px] font-bold p-2">{{ userInfo.nickname }}</div>
                    </div>
                    <div class="flex w-[20%] justify-end">
                        <van-icon name="scan" size="large" />
                    </div>
                </div>
                <van-cell-group class="w-[100%]">
                    <van-cell>
                        <div class="w-[100%] h-[15vh] flex flex-col justify-around items-center">
                            <div class="w-[100%] h-[100%] flex flex-col justify-center rounded-[1rem] bg-[#494949]">
                                <div class="w-[100%] flex flex-col justify-start"
                                    style="border-bottom: 1px solid gray;">
                                    <div class="flex justify-between p-1 items-center">
                                        <div class="text-[14px] p-1">会员已过期</div>
                                        <div class="bg-[#ffffff] rounded-[10px] text-[8px]">
                                            ￥0.88续费
                                        </div>
                                    </div>
                                    <div class="w-[100%] flex justify-start">
                                        <div class="text-[8px]">黑胶vip享受20+项专属特权</div>
                                    </div>
                                </div>
                                <div class="flex justify-between p-1">
                                    <div class="text-[8px]">三折起！热门会员买1得5</div>
                                    <div>礼</div>
                                </div>
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>
                <div class="w-[100%] mt-5 flex justify-center items-center">
                    <van-cell-group class="w-[100%]" inset>
                        <van-cell title="免费听VIP歌曲" icon="location-o" is-link />
                    </van-cell-group>
                </div>
                <div class="w-[100%] mt-2 flex justify-center items-center">
                    <van-cell-group class="w-[100%]" inset>
                        <van-cell title="我的消息" icon="envelop-o" is-link />
                        <van-cell title="云贝中心" icon="location-o" is-link />
                        <van-cell title="徽章中心" icon="medal-o" is-link />
                        <van-cell title="装扮中心" icon="location-o" is-link />
                        <van-cell title="创作者中心" icon="manager-o" is-link />
                    </van-cell-group>
                </div>
                <div class="w-[100%] mt-2 flex justify-center items-center">
                    <van-cell-group class="w-[100%]" inset>
                        <van-cell title="切换账号" icon="exchange" is-link />
                        <van-cell title="退出登录" icon="close" is-link />
                    </van-cell-group>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<style scoped></style>