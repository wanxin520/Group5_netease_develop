<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import EventJsonHandler from "./EventJsonHandler.vue";
const props = defineProps({
    events: {}
})
// console.log(props.events);
</script>

<template>
    <div v-for="(item, index) in props.events"
        class="w-[100%] m-auto flex flex-col justify-around items-around overflow-hidden">
        <div class="flex justify-start items-startp-1 mt-5 ">
            <div class="flex justify-center">
                <img class="w-[3rem] h-[3rem] rounded-[50%]" :src="item.user.avatarUrl" alt="">
            </div>
            <div class="w-[19rem] flex flex-col justify-center items-start ml-3">
                <div class="flex justify-start items-center">
                    <div class="text-[10px] font-extrabold">{{ item.user.nickname }}</div>
                    <div class="ml-3">
                        <img v-if="item.user.vipType != 0" class="w-[2.6rem]"
                            src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"
                            alt="">
                        <img v-else class="w-[2.5rem]"
                            src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582187194/7a26/f253/f690/47da2b91bced041709bbcdb68cd0867f.png"
                            alt="">
                    </div>
                    <div class="text-[10px] ml-2 text-[#6e6d6d]">
                        <span v-if="item.type == 18">分享单曲</span>
                        <span v-else-if="item.type == 19">分享专辑</span>
                        <span v-else-if="item.type == 17 || item.type == 28">分享电台节目</span>
                        <span v-else-if="item.type == 22">转发</span>
                        <span v-else-if="item.type == 39">发布视频</span>
                        <span v-else-if="item.type == 35 || item.type == 13">分享歌单</span>
                        <span v-else-if="item.type == 24">分享专栏文章</span>
                        <span v-else-if="item.type == 41 || item.type == 21">分享视频</span>
                    </div>
                </div>
                <div class="text-[10px] mt-1 text-[#777676]">
                    <div v-if="((Date.now() - item.eventTime) / 60000) < 60">
                        {{ new Date(Date.now() - item.eventTime).getMinutes() }}分钟前
                    </div>
                    <div v-else>
                        {{ new Date(item.eventTime).getFullYear() }} 年
                        {{ new Date(item.eventTime).getMonth() }} 月
                        {{ new Date(item.eventTime).getDate() }} 日
                        {{ new Date(item.eventTime).getHours() > 10 ? new Date(item.eventTime).getHours() : "0"
                            + new Date(item.eventTime).getHours() }}:
                        {{ new Date(item.eventTime).getMinutes() > 10 ? new Date(item.eventTime).getMinutes() :
                            "0" + new Date(item.eventTime).getMinutes() }}:
                        {{ new Date(item.eventTime).getSeconds() }}
                    </div>
                </div>
                <div class="mt-2 container">
                    <EventJsonHandler :events="item" :eventType="item.type"></EventJsonHandler>
                </div>
                <div class="w-[100%] flex justify-between items-center mt-5 text-[10px]">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-between items-end ">
                            <Icon icon="fluent:share-20-filled" width="1.2rem" style="color: #adadad" />
                            <span>分享</span>
                        </div>
                        <div class="flex justify-between items-end ml-6">
                            <Icon icon="uil:comment-lines" width="1.2rem" style="color: #adadad" />
                            <span>评论</span>
                        </div>
                        <div class="flex justify-between items-end ml-6">
                            <Icon icon="bx:like" width="1.2rem" style="color: #adadad" />
                            <span class="ml-2">点赞</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-end ml-6 ">
                        <Icon icon="mingcute:more-2-line" width="1.2rem" style="color: #adadad" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>