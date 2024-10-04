<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { getUserEvent } from "@/api/userIndex";
import EventJsonHandler from "../../dynamic/EventJsonHandler.vue";
import { useRouter } from "vue-router";
import DynamicList from "@/components/dynamic/DynamicList.vue";

const router = useRouter()
const props = defineProps({
    data: { type: Object }
})
// console.log(props.data);
const { data: eventList, loading } = useRequest(() => getUserEvent({ "timestamp": Date.now(), "uid": props.data.account.id }))
watch(eventList, () => {
    // console.log(eventList.value);
})
</script>

<template>
    <div v-if="!loading" class="mt-1 w-[100%]">
        <div v-if="eventList.events.length == 0" class="w-[100%] h-[30vh] flex flex-col justify-center items-center">
            <div class="flex justify-center items-center text-[14px] text-[#979797]">
                <Icon icon="mingcute:music-line" />
                <span class="ml-1">分享你喜欢的音乐吧</span>
            </div>
            <div class="mt-4 text-[12px] font-semibold text-[#5c5b5b] w-[4rem] h-[1.7rem] flex justify-center items-center bg-[#ffffff] rounded-[20px] p-1"
                style="border: 1px solid gray;">
                去分享
            </div>
        </div>
        <div v-else>
            <DynamicList :events="eventList.events"></DynamicList>
        </div>
        <div v-if="eventList">
        </div>
        <div v-else>
            <h1>这里空空如也</h1>
        </div>
    </div>

</template>
<style scoped></style>