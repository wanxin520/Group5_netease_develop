<script setup>
import { ref } from "vue"
const props = defineProps({
    eventJson: {
        
    }
})
// console.log(props.eventJson);
const eventDetail = ref(JSON.parse(props.eventJson))

console.log(eventDetail.value);
</script>

<template>
    <div>
        <div v-if="eventDetail.title">

        </div>
        <div class="text-[10px] p-1">{{ eventDetail.msg }}</div>
        <div class="w-[100%] h-[3.5rem] flex justify-start items-center bg-[#f0f0f0] rounded-[10px] mt-2 p-1">
            <img class="w-[3rem] rounded-[10px]" :src="eventDetail.song.album.blurPicUrl" alt="">
            <div class="ml-2 flex flex-col justify-between items-start">
                <div class="text-[12px]">{{ eventDetail.song.name }}</div>
                <div class="text-[8px] text-[#4b4b4b]">{{ eventDetail.song.album.artists[0].name }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>