<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
    <div class="flex flex-col justify-end ">
        <van-tabbar inactive-color="gray" active-color="#ee0a24" route>
            <van-tabbar-item replace to="/home/discover">
                <div class="flex flex-col justify-end items-center">
                    <Icon icon="ri:netease-cloud-music-fill" width="1.6rem" />
                    <div class="flex flex-col justify-around items-center text-[9.7px] h-[1.3rem]">
                        <span>发现</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/podcast">
                <div class="flex flex-col justify-end items-center">
                    <Icon icon="mynaui:radio" width="1.6rem" />
                    <div class="flex flex-col justify-around items-center text-[9.7px] h-[1.3rem]">
                        <span>播客</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/attention">
                <div class="flex flex-col justify-end items-center">
                    <Icon icon="icon-park-outline:personal-collection" width="1.5rem" />
                    <div class="flex flex-col justify-around items-center text-[9.7px] h-[1.3rem]">
                        <span>关注</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/dynamic">
                <div class="flex flex-col justify-end items-center">
                    <Icon icon="hugeicons:message-multiple-01" width="1.5rem" />
                    <div class="flex flex-col justify-around items-center text-[9.7px] h-[1.3rem]">
                        <span>动态</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/personal">
                <div class="flex flex-col justify-end items-center">
                    <Icon icon="mingcute:music-line" width="1.6rem" />
                    <div class="flex flex-col justify-around items-center text-[9.7px] h-[1.3rem]">
                        <span>我的</span>
                    </div>
                </div>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style scoped></style>