<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { getUserDetail} from "@/api/userIndex";
import { useRouter } from "vue-router";

const router = useRouter()
const props = defineProps({
    uid:{},
    anonimousUser:{}
})
const { run,data: userDetail, loading } = useRequest(() => getUserDetail({ "timestamp": Date.now(), "uid": props.uid }),{manual:true})
if(!props.anonimousUser){
    run()
}
// watch(userDetail, () => {
//     console.log(userDetail.value);
// })
// 跳转至手机登录
const toLoginByPhone = () => {
    router.replace({ name: "phone" })
}

</script>

<template>
    <div class="w-[100%] h-[18vh] flex flex-col justify-between ">
        <div v-if="anonimousUser"
        @click="toLoginByPhone"
            class="w-[100%] justify-center items-center mt-5 h-[1.2rem] flex text-[#ffffff] text-[16px] ">
            <div class=" font-bold mr-2">
                立即登录
            </div>
            <Icon icon="weui:arrow-filled" class="text-[1.5rem]"/>
        </div>
        <div v-else-if="!loading" class="w-[100%] flex flex-col justify-between items-center">
            <!-- 昵称 和 vip -->
            <div class="w-[100%] justify-center items-center mt-5 h-[1.2rem] flex ">
                <div class="text-[#ffffff] text-[16px] font-bold mr-2">{{ userDetail.profile.nickname }}</div>
                <img v-if="userDetail.profile.vipType != 0" class="w-[2.6rem]"
                    src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"
                    alt="">
                <img v-else class="w-[2.5rem]"
                    src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582187194/7a26/f253/f690/47da2b91bced041709bbcdb68cd0867f.png"
                    alt="">
            </div>
            <!-- 徽章，账号年龄 -->
            <div class="flex w-[100%] justify-center items-center mt-2">
                <div class="text-[#c5c5c5] text-[9px] ">
                    <van-icon name="award-o" /> <span>1枚徽章</span> ·
                </div>
                <div class="text-[#c5c5c5] text-[9px] ml-1">村龄 {{ (userDetail.createDays /
                    365).toFixed(0) }} 年</div>
            </div>
            <!-- 关注，粉丝等 -->
            <div class=" flex text-[#c5c5c5] text-[9px] w-[100%] justify-center items-center mt-2">
                <div class="mr-4"><span class=" text-[#ffffff] text-[12px]">{{ userDetail.profile.follows
                        }}</span> 关注
                </div>
                <div class="mr-4"><span class=" text-[#ffffff] text-[12px]">{{ userDetail.profile.followeds
                        }}</span> 粉丝
                </div>
                <div class="mr-4"><span class=" text-[#ffffff] text-[12px]">Lv.{{ userDetail.level }}</span>
                    等级</div>
                <div class="mr-4"><span class=" text-[#ffffff] text-[12px]">{{ userDetail.listenSongs
                        }} <span class="text-[10px]">首</span></span> 听歌</div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>