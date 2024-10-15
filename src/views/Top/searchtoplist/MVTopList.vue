<script setup>
import { ref, watch } from "vue"
import { useRequest } from "vue-request";

import { getMVTopList } from "@/api/searchIndex";


const { data, loading } = useRequest(() => getMVTopList())

watch(data, () => {
    // console.log(data.value);
})

</script>

<template>
    <div>
        <div v-if="!loading" class="w-[100%] flex flex-col justify-center items-center">
            <van-cell>
                <template #title>
                    <div class="w-[100%] flex justify-start items-center">
                        <div>视频榜</div>
                        <div>播放</div>
                    </div>
                </template>
            </van-cell>
            <div class="w-[100%]">
                <van-cell v-for="(item, index) in data.data.slice(0, 12)" :border="false" :key="item">
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <div class="w-[100%] h-[2rem] flex justify-start items-center">
                            <div class="w-[1rem] text-[#909090]"
                                :style="index + 1 < 4 ? [{ color: 'red', fontSize: '16px' }] : []">
                                {{ index + 1 }}
                            </div>
                            <div class="ml-3 text-[10px]"
                                :style="index + 1 < 4 ? [{ color: 'black', fontSize: '11px', fontWeight: '600' }] : []">
                                {{ item.name }}
                            </div>
                        </div>

                    </template>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template v-if="item.cover" #right-icon>
                        <div class="flex justify-center items-center">
                            <img class="w-[2rem] h-[2rem] rounded-[5px]" :src="item.cover" alt="">
                        </div>
                    </template>
                </van-cell>
            </div>
        </div>
    </div>
</template>
<style scoped></style>