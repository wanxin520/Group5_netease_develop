<script setup>
import { watch } from "vue";
import { getRankList, getRankListDetail } from "@/api";
import { useRequest } from "vue-request";

const { data: rankListData } = useRequest(() => getRankList());
const { data: rankListDtaileData } = useRequest(() => getRankListDetail());

watch(rankListData, () => {
  console.log(rankListData.value.list);
});

watch(rankListDtaileData, () => {
  console.log("rankListDtaileData", rankListDtaileData.value.list);
});
</script>

<template>
  <div class="w-[100vw] bg-[#f8f9fd]">
    <div
      class="rounded-[10px] mx-auto w-[95vw] flex flex-col justify-start gap-4 p-2 bg-white shadow-md my-5"
    >
      <div class="flex justify-between items-center py-0">
        <h3 class="font-bold text-[16px]">
          {{ rankListDtaileData.list[0].name }}
        </h3>
        <p class="float-right text-[13px] text-gray-400">
          {{ rankListDtaileData.list[0].updateFrequency }}
        </p>
      </div>
      <div class="flex py-0 mt-[-10px]">
        <div class="mt-1 w-[50px] h-[50px]">
          <img
            class="w-[50px] h-[50px] rounded-[5px]"
            :src="rankListDtaileData.list[0].coverImgUrl"
            alt=""
          />
        </div>
        <div class="ml-5 truncate flex items-center">
          <ol class="list-decimal">
            <span class="text-green-500 text-[12px] ml-auto float-right"
              >New</span
            >

            <li class=" flex items-center">
              
              <span class="text-[12px] font-serif ...text-clip overflow-hidden">
                1{{ rankListDtaileData.list[0].tracks[0]?.first }}-{{
                  rankListDtaileData.list[0].tracks[0]?.second
                }}</span
              >
            </li>
            <span class="text-green-500 text-[12px] ml-auto float-right"
              >New</span
            >
            <li class="w-[65vw] flex items-center">
             
              <span class="text-[12px] font-serif ... text-clip overflow-hidden"
                >2{{ rankListDtaileData.list[0].tracks[1]?.first }}-{{
                  rankListDtaileData.list[0].tracks[1]?.second
                }}</span
              >
            </li>
            <span class="text-green-500 text-[12px] ml-auto float-right"
              >New</span
            >
            <li class="w-[65vw] flex items-center">
              <span class="text-[12px] font-serif ... text-clip overflow-hidden"
                >3{{ rankListDtaileData.list[0].tracks[2]?.first }}-{{
                  rankListDtaileData.list[0].tracks[2]?.second
                }}</span
              >
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div
      class="mx-auto w-[95vw] flex flex-col justify-start gap-4 p-2 bg-white rounded-[10px] shadow-md my-5"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-[16px]">
          {{ rankListDtaileData.list[1].name }}
        </h3>
        <p class="float-right text-[13px] text-gray-400">
          {{ rankListDtaileData.list[1].updateFrequency }}
        </p>
      </div>
      <div class="flex py-0 mt-[-10px]">
        <div class="mt-1 w-[50px] h-[50px]">
          <img
            class="w-[50px] h-[50px] rounded-[5px]"
            :src="rankListDtaileData.list[1].coverImgUrl"
            alt=""
          />
        </div>
        <div class="ml-5 truncate w-[65vw] flex items-center">
          <ol class="list-none">
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >1.{{ rankListDtaileData.list[1].tracks[0]?.first }}-{{
                  rankListDtaileData.list[1].tracks[0]?.second
                }}</span
              >
            </li>
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >2.{{ rankListDtaileData.list[1].tracks[1]?.first }}-{{
                  rankListDtaileData.list[1].tracks[1]?.second
                }}</span
              >
            </li>
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >3.{{ rankListDtaileData.list[1].tracks[2]?.first }}-{{
                  rankListDtaileData.list[1].tracks[2]?.second
                }}</span
              >
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div
      class="mx-auto w-[95vw] flex flex-col justify-start bg-white gap-4 p-2 rounded-[10px] shadow-md my-5"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-[16px]">
          {{ rankListDtaileData.list[2].name }}
        </h3>
        <p class="float-right text-[13px] text-gray-400">
          {{ rankListDtaileData.list[2].updateFrequency }}
        </p>
      </div>
      <div class="flex py-0 mt-[-10px]">
        <div class="mt-1 w-[50px] h-[50px]">
          <img
            class="w-[50px] h-[50px] rounded-[5px]"
            :src="rankListDtaileData.list[2].coverImgUrl"
            alt=""
          />
        </div>
        <div class="ml-5 truncate w-[65vw] flex items-center">
          <ol class="list-none">
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >1.{{ rankListDtaileData.list[2].tracks[0]?.first }}-{{
                  rankListDtaileData.list[2].tracks[0]?.second
                }}</span
              >
            </li>
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >2.{{ rankListDtaileData.list[2].tracks[1]?.first }}-{{
                  rankListDtaileData.list[2].tracks[1]?.second
                }}</span
              >
            </li>
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >3.{{ rankListDtaileData.list[2].tracks[2]?.first }}-{{
                  rankListDtaileData.list[2].tracks[2]?.second
                }}</span
              >
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div
      class="mx-auto w-[95vw] flex flex-col justify-start bg-white gap-4 p-2 rounded-[10px] shadow-md my-5"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-[16px]">
          {{ rankListDtaileData.list[3].name }}
        </h3>
        <p class="float-right text-[13px] text-gray-400">
          {{ rankListDtaileData.list[3].updateFrequency }}
        </p>
      </div>
      <div class="flex py-0 mt-[-10px]">
        <div class="mt-1 w-[50px] h-[50px] rounded-[5px]">
          <img
            class="w-[50px] h-[50px] rounded-[5px]"
            :src="rankListDtaileData.list[3].coverImgUrl"
            alt=""
          />
        </div>
        <div class="ml-5 truncate w-[65vw] flex items-center">
          <ol class="list-none">
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >1.{{ rankListDtaileData.list[3].tracks[0]?.first }}-{{
                  rankListDtaileData.list[3].tracks[0]?.second
                }}</span
              >
            </li>
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >2.{{ rankListDtaileData.list[3].tracks[1]?.first }}-{{
                  rankListDtaileData.list[3].tracks[1]?.second
                }}</span
              >
            </li>
            <li class="flex items-center">
              <span
                class="text-[12px] font-serif ... w-[60vw] text-clip overflow-hidden"
                >3.{{ rankListDtaileData.list[3].tracks[2]?.first }}-{{
                  rankListDtaileData.list[3].tracks[2]?.second
                }}</span
              >
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="w-[100%] h-[10vh] flex justify-between items-center flex-wrap">
    <div v-for="item in rankListData.list" :key="item">
      <div class="w-[7.5rem] h-[7.5rem] flex justify-center items-center p-1">
        <img class="rounded-[6px]" :src="item.coverImgUrl" alt="" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
