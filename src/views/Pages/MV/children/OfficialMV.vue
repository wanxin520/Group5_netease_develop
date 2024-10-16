<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { getOfficialMV } from "@/api/videoIndex";
import { useRequest } from "vue-request";

const { data, loading } = useRequest(() => getOfficialMV());
watch(data, () => {
    // console.log(data.value);
});
const getSourceId = (sourceId) => {
    console.log(sourceId);
};
</script>

<template>
    <div v-if="!loading" class="w-[100vw] flex justify-center items-center mt-2">
        <van-swipe :width="350" :height="80" :stop-propagation="false" :loop="false" :show-indicators="false" vertical>
            <van-swipe-item class="p-1" @click="getSourceId(item.id)" v-for="(item, index) in data.data" :key="item.id">
                <div class="w-[100%] flex justify-start items-center rounded-[2rem]">
                    <div class="w-[6rem] h-[4rem] flex justify-center items-center"
                        :style="`background-image: url(${item.cover}); background-size: cover; border-radius: 10px;`">
                        <Icon icon="iconoir:play-solid" width="1.3rem" class="text-[#f1f1f1de]" />
                    </div>
                    <div class="ml-3 w-[60%]">
                        <div
                            class="w-[100%] text-[#323232] text-[12px] font-bold overflow-hidden text-ellipsis whitespace-nowrap ">
                            {{ item.name }}
                        </div>
                        <div class="flex justify-start text-[10px] items-center  font-mono mt-1">
                            {{ item.artists[0].name }}
                        </div>
                        <div class="flex justify-start items-center mt-1 text-[#636363] text-[8px]">
                            <span>
                                {{ new Date(item.duration).getMinutes() < 10 ? "0" + new
                                    Date(item.duration).getMinutes() : new Date(item.duration).getMinutes() }}:{{ new
                                        Date(item.duration).getSeconds() < 10 ? "0" + new Date(item.duration).getSeconds() :
                                        new Date(item.duration).getSeconds() }} </span>
                                    <span>，</span>
                                    <div v-if="item.playCount > 10000">
                                        {{ (item.playCount / 10000).toFixed(1) }}万
                                    </div>
                                    <div v-else-if="item.playCount > 1000">
                                        {{ (item.playCount / 10000).toFixed(2) }}万
                                    </div>
                                    <div v-else>
                                        {{ item.playCount }}
                                    </div>
                                    <span>次播放</span>
                        </div>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<style scoped></style>
