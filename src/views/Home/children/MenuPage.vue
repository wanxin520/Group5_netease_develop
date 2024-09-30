<script setup>
import { defineProps } from "vue";
import router from "@/router";

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="m-auto">
        <div class="w-[100vw] flex justify-center items-center">
            <van-swipe class="my-swipe" :width="90" :height="80" :stop-propagation="false" :loop="false"
                :show-indicators="false">
                <van-swipe-item @click="isClicked(index)" v-for="(item, index) in props.data" :key="item.name">
                    <div class="flex flex-col items-center">
                        <div class="">
                            <img class="filter w-[2.6rem]" :src="item.iconUrl" alt="">
                        </div>
                        <div class="text-[#4d4c4c] text-[11px]">
                            {{ item.name }}
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<style scoped>
.filter {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}

.van-swipe-item {
    width: 100%;
}
</style>
