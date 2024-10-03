<script setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue";
const props = defineProps({
    events: {

    },
    eventType: {

    }
})
console.log(props.eventType);
console.log(props.events);


const eventDetail = ref(JSON.parse(props.events.json))
const transmitionEvent = ref()

console.log(eventDetail.value);
if (eventDetail.value.event) {
    // console.log(eventDetail.value.event.json);
    transmitionEvent.value = JSON.parse(eventDetail.value.event.json)
    console.log(transmitionEvent.value);
}



</script>
<!-- :style="{ width: `${eventDetail.resource.mlogBaseData.coverWidth}`, height: `${eventDetail.resource.mlogBaseData.coverHeight}`}" -->
<template>
    <div v-if="props.eventType == 18">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">
            <van-text-ellipsis rows="3" :content="eventDetail.msg" expand-text="展开" collapse-text="收起" :rows="4" />
        </div>
        <div class="flex justify-between items-center flex-wrap mt-2">
            <div v-for="item in events.pics" class="p-1">
                <img class="w-[8.5rem] h-[8.5rem] rounded-[10px]" :src="item.pcSquareUrl" alt="">
            </div>
        </div>
        <div class="w-[100%] h-[3.5rem] flex justify-start items-center bg-[#f0f0f0] rounded-[10px] mt-2 p-1">
            <img class="w-[3rem] rounded-[10px]" :src="eventDetail.song.album.blurPicUrl" alt="">
            <div class="ml-2 flex flex-col justify-between items-start">
                <div class="text-[10px] text-[#6e6e6e]">{{ eventDetail.song.name }}</div>
                <div class="text-[8px] text-[#4b4b4b] mt-1">{{ eventDetail.song.album.artists[0].name }}</div>
            </div>
        </div>
        <!-- 话题标签 -->
        <div v-if="events.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in events.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div v-else-if="props.eventType == 19">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg }}</div>
        <div class="w-[100%] h-[3.5rem] flex justify-start items-center bg-[#f0f0f0] rounded-[10px] mt-2 p-1">
            <img class="w-[3rem] rounded-[10px]" :src="eventDetail.album.blurPicUrl" alt="">
            <div class="ml-2 flex flex-col justify-between items-satrt">
                <div class="flex justify-start items-center ">
                    <div class="flex justify-center items-center text-[6px] w-[1rem] rounded-[3px] text-[#ff3535] mr-1"
                        style="border: 0.5px solid red;">歌单</div>
                    <div class="text-[10px] text-[#6e6e6e]">{{ eventDetail.album.name }}</div>
                </div>
                <div class="text-[8px] text-[#4b4b4b] mt-1">by {{ eventDetail.album.artist.name }}</div>
            </div>
        </div>
        <!-- 话题标签 -->
        <div v-if="events.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in events.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div v-else-if="props.eventType == 17 || props.eventType == 28 || props.eventType == 56">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg }}</div>
        <div class="w-[100%] h-[3.5rem] flex justify-start items-center bg-[#f0f0f0] rounded-[10px] mt-2 p-1">
            <img class="w-[3rem] rounded-[10px]" :src="eventDetail.resource.coverImgUrl" alt="">
            <div class="ml-2 flex flex-col justify-between items-satrt">
                <div class="flex justify-start items-center ">
                    <div class="w-[70%] text-[10px] text-[#6e6e6e] overflow-hidden text-ellipsis whitespace-nowrap">{{
                        eventDetail.resource.title }}</div>
                </div>
                <div class="text-[8px] text-[#4b4b4b] mt-1">by {{ eventDetail.resource.subTitle }}</div>
            </div>
        </div>
        <!-- 话题标签 -->
        <div v-if="events.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in events.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div v-else-if="props.eventType == 22">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg }}</div>
        <div class="w-[100%] flex flex-col justify-start items-start bg-[#f0f0f0] rounded-[10px] mt-2 p-1">
            <div class="text-[10px] text-[#5e5d5d]">
                <span class="text-[#589bff]">@{{ eventDetail.event.user.nickname }} : </span>
                <span>{{ transmitionEvent.msg }}</span>
            </div>
            <div class="flex justify-between items-center flex-wrap mt-2">
                <div v-for="item in eventDetail.event.pics" class="p-1">
                    <img class="w-[8.5rem] h-[8.5rem] rounded-[10px]" :src="item.pcSquareUrl" alt="">
                </div>
            </div>
            <div v-if="transmitionEvent.song"
                class="w-[100%] h-[3rem] flex justify-start items-center bg-[#ffffff] rounded-[10px] mt-2 p-1">
                <img class="w-[3rem] rounded-[10px]" :src="transmitionEvent.song.album.blurPicUrl" alt="">
                <div class="ml-2 flex flex-col justify-between items-start">
                    <div class="text-[10px] text-[#6e6e6e]">{{ transmitionEvent.song.album.name }}</div>
                    <div class="text-[8px] text-[#4b4b4b] mt-1">{{ transmitionEvent.song.album.artists[0].name }}</div>
                </div>
            </div>
        </div>
        <div v-if="eventDetail.event.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in eventDetail.event.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div v-else-if="props.eventType == 39 || props.eventType == 57">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg ? eventDetail.msg : "" }}</div>
        <div class="w-[100%] flex justify-start items-center rounded-[10px] mt-2 p-1 relative">
            <img class=" rounded-[10px]" :src="eventDetail.resource.mlogDetail.content.video.coverUrl" alt="">

            <div class="w-[100%] flex justify-center items-center absolute">
                <Icon icon="flowbite:play-solid" width="2.5rem" class="text-[#ffffffc4]" />
            </div>
            <div class="flex w-[100%] h-[100%] justify-between items-end text-[#ececec] text-[9px] p-3 absolute">
                <div class="flex justify-center items-center">
                    <Icon icon="lucide:play" class="mr-1" />
                    <span class="ml-1" v-if="eventDetail.resource.mlogDetail.playCount / 10000 > 0">{{
                        (eventDetail.resource.mlogDetail.playCount /
                            10000).toFixed(1)
                    }}万</span>
                    <span v-else>{{ eventDetail.resource.mlogDetail.playCount }}</span>
                </div>
                <div class="flex justify-center items-center mr-1">
                    <Icon icon="mingcute:time-line" class="mr-1" />
                    <span>{{ new
                        Date(eventDetail.resource.mlogDetail.content.video.duration).getMinutes() < 10 ? "0" + new
                            Date(eventDetail.resource.mlogDetail.content.video.duration).getMinutes() : new
                                Date(eventDetail.resource.mlogDetail.content.video.duration).getMinutes() }}</span>
                            <span>:</span>
                            <span>{{ new Date(eventDetail.resource.mlogDetail.content.video.duration).getSeconds() < 10
                                ? "0" + new
                                    Date(eventDetail.resource.mlogDetail.content.video.duration).getSeconds() : new
                                        Date(eventDetail.resource.mlogDetail.content.video.duration).getSeconds() }}</span>
                </div>
            </div>
        </div>
        <!-- 话题标签 -->
        <div v-if="events.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in events.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div v-else-if="props.eventType == 35 || props.eventType == 13">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg }}</div>
        <div class="w-[100%] h-[3.5rem] flex justify-start items-center bg-[#f0f0f0] rounded-[10px] mt-2 p-1">
            <img class="w-[3rem] rounded-[10px]" :src="eventDetail.playlist.coverImgUrl" alt="">
            <div class="ml-2 flex flex-col justify-between items-satrt">
                <div class="flex justify-start items-center ">
                    <div class="flex justify-center items-center text-[6px] w-[1rem] rounded-[3px] text-[#ff3535] mr-1"
                        style="border: 0.5px solid red;">歌单</div>
                    <div class="text-[10px] text-[#6e6e6e]">{{ eventDetail.playlist.name }}</div>
                </div>
                <div class="text-[8px] text-[#4b4b4b] mt-1">by {{ eventDetail.playlist.creator.nickname }}</div>
            </div>
        </div>
        <!-- 话题标签 -->
        <div v-if="events.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in events.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div v-else-if="props.eventType == 24">

    </div>
    <div v-else-if="props.eventType == 41 || props.eventType == 21">
        <div v-if="eventDetail.title">
        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg ? eventDetail.msg : "" }}</div>
        <div class="w-[100%] h-[15rem] flex justify-start items-center rounded-[10px] mt-2 p-1 relative">
            <img class="rounded-[10px]" :src="eventDetail.mv.imgurl" alt="">
            <div class="w-[100%] h-[100%] flex justify-start items-start absolute mt-8">
                <div class="flex flex-col justify-between ml-3">
                    <div class="flex justify-start items-center">
                        <span class="text-[6px] flex justify-center items-center rounded-[3px] w-[1rem] text-[#e6e6e6]"
                            style="border: 0.2px,solid white;">MV</span>
                        <div class="text-[14px] text-[#ffffff] ml-1 font-mono">{{ eventDetail.mv.name }}</div>
                    </div>
                    <div>
                        <div class="text-[9px] text-[#ffffff]">{{ eventDetail.mv.artist.name }}</div>
                    </div>
                </div>
            </div>
            <div class="w-[100%] h-[100%]  flex justify-center items-center absolute">
                <Icon icon="flowbite:play-solid" width="2.5rem" class="text-[#ffffffc4]" />
            </div>
            <div class="flex w-[100%] h-[100%] justify-between items-end text-[#ececec] text-[9px] p-3 absolute">
                <div class="flex justify-center items-center">
                    <Icon icon="lucide:play" />
                    <span class="ml-1" v-if="eventDetail.mv.playCount / 10000 > 0">{{ (eventDetail.mv.playCount /
                        10000).toFixed(1)
                        }}万</span>
                    <span v-else>{{ eventDetail.mv.playCount }}</span>
                </div>
                <div class="flex justify-center items-center mr-1">
                    <Icon icon="mingcute:time-line" />
                    <span class="ml-1">{{ new Date(eventDetail.mv.duration).getMinutes() < 10 ? "0" + new
                        Date(eventDetail.mv.duration).getMinutes() : new Date(eventDetail.mv.duration).getMinutes()
                            }}</span>
                            <span>:</span>
                            <span>{{ new Date(eventDetail.mv.duration).getSeconds() < 10 ? "0" + new
                                Date(eventDetail.mv.duration).getSeconds() : new
                                    Date(eventDetail.mv.duration).getSeconds() }}</span>
                </div>
            </div>
        </div>
        <!-- 话题标签 -->
        <div v-if="events.bottomActivityInfos" class="w-[100%] flex mt-3">
            <div v-for="item in events.bottomActivityInfos"
                class="text-[#7a7979] bg-[#f0f0f0] p-0.5 ml-3 rounded-[5px]">
                <div class="text-[8px]">#{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>