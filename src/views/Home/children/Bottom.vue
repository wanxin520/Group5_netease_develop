<script setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue";
const active = ref(0);
const onChange = (index) => showToast(`标签 ${index}`);

</script>

<template>
    <div class="flex flex-col justify-end">
        <van-tabbar v-model="active" fixed @change="onChange" inactive-color="gray" active-color="#ee0a24">
            <van-tabbar-item>
                <div class="flex flex-col items-center">
                    <Icon icon="ri:netease-cloud-music-fill" width="1.6rem" />
                    <div>
                        <span>发现</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item>
                <div class="flex flex-col justify-center items-center">
                    <Icon icon="mynaui:radio" width="1.6rem" />
                    <div>
                        <span>播客</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item>
                <div class="flex flex-col justify-center items-center">
                    <Icon icon="mingcute:music-line" width="1.6rem" />
                    <div class="flex flex-col justify-around items-center">
                        <span>我的</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item>
                <div class="flex flex-col justify-center items-center">
                    <Icon icon="icon-park-outline:people-safe-one" width="1.6rem" />
                    <div>
                        <span>关注</span>
                    </div>
                </div>
            </van-tabbar-item>
            <van-tabbar-item>
                <div class="flex flex-col justify-center items-center">
                    <Icon icon="hugeicons:message-multiple-01" width="1.6rem" />
                    <div>
                        <span>社区</span>
                    </div>
                </div>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style scoped></style>