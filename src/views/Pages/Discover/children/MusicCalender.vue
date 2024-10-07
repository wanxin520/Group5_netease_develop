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
        <van-swipe :stop-propagation="false" :loop="false" :show-indicators="false">
            <van-swipe-item v-for="(item, index) in props.data.creatives" :key="item.id">
                <div class="flex flex-col items-center">
                    <van-swipe :width="250" :stop-propagation="false" :loop="false" :show-indicators="false">
                        <van-swipe-item @click="getResourceId(inItem.resourceExtInfo.songData.id)"
                            v-for="inItem in props.data.creatives[index].resources" :key="inItem.id" class="p-2">
                            <div class="flex flex-col items-center">
                                <div>
                                    <img class="rounded-[20px]  w-[10rem] h-[8.8rem]"
                                        :src="inItem.uiElement.image.imageUrl" alt="" />
                                </div>

                                <div class="w-[80%] my-3 flex justify-center items-center text-[#4d4c4c] text-[13px]">
                                    {{ inItem.uiElement.mainTitle.title }}
                                </div>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<style scoped></style>
