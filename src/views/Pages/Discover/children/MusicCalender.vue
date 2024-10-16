<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
    data: {},
});

// console.log(props.data);

const emit = defineEmits(["transmitePlaylistId", "transmiteSongId", "transmiteVideoId"])
function clickMore() {
    console.log("音乐日历更多被点击");
}
</script>

<template>
    <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
        <div class="flex justify-center items-center">
            <div class="text-[#707070] text-[14px] font-bold">
                {{ props.data.name }}
            </div>
            <Icon icon="weui:arrow-filled" width="1.2rem" height="1.2rem" style="color: #666666" />
        </div>
        <Icon @click="clickMore" icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
    </div>
    <div>
        <van-swipe :height="100" :stop-propagation="false" :loop="false" :show-indicators="false" vertical>
            <van-swipe-item v-for="(item, index) in props.data.creatives" :key="item.id">
                <!-- <div class="w-[100%] h-[100%] flex flex-col justify-start items-start"> -->
                <van-swipe :height="100" :stop-propagation="false" :loop="false" :show-indicators="false">
                    <van-swipe-item @click="getResourceId(inItem.resourceExtInfo.songData.id)"
                        v-for="inItem in props.data.creatives[index].resources" :key="inItem.id" class="p-2">
                        <div class=" w-[100%] h-[100%] flex justify-start items-center">
                            <div class="w-[25%] h-[100%]">
                                <img class=" w-[5rem] h-[5rem] rounded-[20px]" :src="inItem.uiElement.image.imageUrl"
                                    alt="" />
                            </div>
                            <div class="w-[75%] h-[100%] flex flex-col justify-center items-start ml-2 ">
                                <div class=" my-3 flex justify-start items-center text-[#4f4f4f] text-[13px] font-bold">
                                    {{ inItem.uiElement.mainTitle.title }}
                                </div>
                                <div class="flex justify-start items-center text-[#707070] text-[10px]">
                                    <!-- <span>开始日期：</span> -->
                                    <span>{{ new Date(inItem.resourceExtInfo.startTime).getFullYear() }}年{{ new
                                        Date(inItem.resourceExtInfo.startTime).getMonth() + 1 }}月{{ new
                                            Date(inItem.resourceExtInfo.startTime).getDate() }}日

                                    </span>
                                    <!-- <span>
                                        {{ new Date(inItem.resourceExtInfo.startTime).getMinutes() < 10 ? "0" + new
                                            Date(inItem.resourceExtInfo.startTime).getMinutes() : new
                                                Date(inItem.resourceExtInfo.startTime).getMinutes() }}:{{ new
                                                Date(inItem.resourceExtInfo.startTime).getSeconds() < 10 ? "0" + new
                                                    Date(inItem.resourceExtInfo.startTime).getSeconds() : new
                                                        Date(inItem.resourceExtInfo.startTime).getSeconds() }} 
                                    </span> -->
                                </div>
                                <!-- <div class="flex justify-start items-center text-[#707070] text-[8px]">
                                    <span>结束日期：</span>
                                    <span>{{ new Date(inItem.resourceExtInfo.endTime).getFullYear() }}年{{ new
                                        Date(inItem.resourceExtInfo.endTime).getMonth() + 1 }}月{{ new
                                            Date(inItem.resourceExtInfo.endTime).getDate() }}日</span>
                                    <span>
                                        {{ new Date(inItem.resourceExtInfo.endTime).getMinutes() < 10 ? "0" + new
                                            Date(inItem.resourceExtInfo.endTime).getMinutes() : new
                                                Date(inItem.resourceExtInfo.endTime).getMinutes() }}:{{ new
                                                Date(inItem.resourceExtInfo.endTime).getSeconds() < 10 ? "0" + new
                                                    Date(inItem.resourceExtInfo.endTime).getSeconds() : new
                                                        Date(inItem.resourceExtInfo.endTime).getSeconds() }} </span>
                                </div> -->
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <!-- </div> -->
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<style scoped></style>
