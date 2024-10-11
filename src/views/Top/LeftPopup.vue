<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { useRouter } from "vue-router";
import localforage from "localforage";
import { getLoginStatus, getUserPLCount } from "@/api/userIndex";
import { useUserStore,usePlayStore,useSongUrlStore,useSourseStore,useSongDetailStore } from "@/store";

const userInfo = ref()
const router = useRouter()
const userStore = useUserStore()
const playStore = usePlayStore()
const urlStore = useSongUrlStore()
const detailStore = useSongDetailStore()
const sourseStore = useSourseStore()
const MSGCount = ref()
const showLogout = ref(false)
const defaultAvatar = ref("http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg")
const defaultBGIMG = ref("http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg")
// 获取登录状态
const { data: loginStatus, loading } = useRequest(() => getLoginStatus({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))
// 获取消息数量
const { data: messageCount } = useRequest(() => getUserPLCount({ cookie: useUserStore().cookie }))

watch(messageCount, () => {
    // console.log(messageCount.value);
    MSGCount.value = messageCount.value.msg
})
watch(loginStatus, () => {
    // console.log(loginStatus.value);
    userInfo.value = loginStatus.value.profile
})
// 跳转至手机登录
const toLoginByPhone = () => {
    router.replace({ name: "phone" })
}

// 弹出层
const showLeft = ref(false);
const showPopup = () => {
    showLeft.value = true;
};

// 退出登录
const logout = (action) => new Promise((resolve, reject) => {
    // console.log(action);
    if (action === "cancel") {
        // action !== 'confirm'  拦截取消操作
        resolve(action !== 'confirm')
    }
    if (action === 'confirm') {
        setTimeout(() => {
            resolve(action === 'confirm');
            localforage.clear()
            useUserStore().userInfo = null
            // useSongDetailStore().setSongsDetail = null
            // useSongUrlStore().setSongsUrl = null
            // useUserStore().userInfo = null
            router.push({ name: "phone" })
            showToast("退出登录成功!")
        }, 1500);
    }
});




</script>

<template>
    <div>
        <van-badge :content="MSGCount" :show-zero="false" max="99">
            <Icon @click="showPopup" icon="ion:menu" width="1.5rem" style="color: #b5b5b5" />
        </van-badge>
        <!-- 左侧弹出 -->
        <van-popup v-model:show="showLeft" position="left" :style="{ width: '80%', height: '100%' }">
            <div v-if="loading" class="w-[100vw] h-[100vh] justify-center items-center">
                <van-loading type="spinner" size="24px" />
            </div>
            <div v-else class="w-[100%] h-[100%] bg-[#e7e7e7] flex flex-col justify-start items-center" ref="container">
                <div class="w-[100%] h-[10vh] flex justify-between items-center p-3 bg-[#ffffff]">
                    <div class="w-[70%] flex justify-start items-center">
                        <img class="w-[2rem] rounded-[50%]"
                            :src="(loginStatus.account.anonimousUser ? defaultAvatar : loginStatus.profile.avatarUrl)"
                            alt="">
                        <div @click="toLoginByPhone" v-if="loginStatus.account.anonimousUser"
                            class="text-[13px] font-semibold p-2 text-[#585757]">
                            立刻登录
                        </div>
                        <div v-else class="text-[13px] font-semibold p-2 text-[#585757]">{{ userInfo.nickname }}</div>
                        <div>
                            <Icon icon="weui:arrow-filled" width="1.2rem" height="1.2rem" style="color: #adadad" />
                        </div>
                    </div>
                    <div class="flex w-[20%] justify-end">
                        <van-icon name="scan" size="large" />
                    </div>
                </div>
                <van-cell-group class="w-[100%]">
                    <van-cell>
                        <div class="w-[100%] h-[15vh] flex flex-col justify-around items-center">
                            <div class="w-[100%] h-[100%] flex flex-col justify-center rounded-[1rem] bg-[#494949]">
                                <div class="w-[100%] flex flex-col justify-start">
                                    <div class="flex justify-between items-center p-2">
                                        <div class="w-[100%] justify-start items-center h-[1.2rem] flex ">
                                            <div v-if="loginStatus.account.vipType != 0"
                                                class="text-[#ebd1b4] text-[16px] font-bold mr-2"> 黑胶VIP·壹 </div>
                                            <div v-else class="text-[#ffffff] text-[16px] font-bold mr-2"> 开通黑胶VIP
                                            </div>
                                            <img v-if="loginStatus.account.vipType != 0" class="w-[2.6rem]"
                                                src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"
                                                alt="">
                                            <img v-else class="w-[2.5rem]"
                                                src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582187194/7a26/f253/f690/47da2b91bced041709bbcdb68cd0867f.png"
                                                alt="">
                                        </div>
                                        <div v-if="loginStatus.account.vipType != 0"
                                            class="w-[3rem] flex justify-center items-center bg-[#666565] rounded-[10px] text-[8px] text-[rgb(252,225,195)]">
                                            会员中心
                                        </div>
                                        <div v-else
                                            class="w-[3rem] flex justify-center items-center bg-[#666565] rounded-[10px] text-[8px] text-[rgb(255,255,255)]">
                                            开通会员
                                        </div>
                                    </div>
                                    <div class="w-[100%] flex justify-start">
                                        <div class="text-[8px] ml-2 text-[#ffffff]">黑胶vip享受20+项专属特权</div>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <div class="text-[8px] ml-2 text-[#ffffff]">三折起！热门会员买1得5</div>
                                    <div>
                                        <Icon icon="ph:gift-bold" width="1.2rem" class="text-[#ffffff] mr-5" />
                                    </div>
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
                        <van-badge :show-zero="false" :content="MSGCount" :offset="[15, 12]" position="top-left">
                            <van-cell title="我的消息" icon="envelop-o" is-link />
                        </van-badge>
                        <van-cell title="云贝中心" icon="location-o" is-link />
                        <van-cell title="徽章中心" icon="medal-o" is-link />
                        <van-cell title="装扮中心" icon="location-o" is-link />
                        <van-cell title="创作者中心" icon="manager-o" is-link />
                    </van-cell-group>
                </div>
                <div class="w-[100%] mt-2 flex justify-center items-center">
                    <van-cell-group class="w-[100%]" inset>
                        <van-cell title="切换账号" icon="exchange" is-link />
                        <van-cell @click="showLogout = true" v-if="!loginStatus.account.anonimousUser" title="退出登录"
                            icon="close" is-link />
                    </van-cell-group>
                </div>
            </div>
        </van-popup>
        <van-dialog v-model:show="showLogout" title="确定要退出以下账号？" :before-close="logout" show-cancel-button>
            <div class="w-[100%] h-[20vh] flex flex-col justify-around items-center">
                <img class="w-[4rem] rounded-[50%]"
                    :src="(loginStatus.account.anonimousUser ? defaultAvatar : loginStatus.profile.avatarUrl)" alt="">
                <div class="text-[13px] font-semibold p-2 text-[#585757]">{{ userInfo.nickname }}</div>
            </div>
        </van-dialog>
    </div>
</template>
<style scoped></style>