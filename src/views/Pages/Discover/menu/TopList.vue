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
  <div
    class="flex flex-col justify-start gap-4 p-4 bg-orange-400 rounded-lg shadow-md w-full h-full md:w-1/2 lg:w-1/3 my-5"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-[25px]">
        {{ rankListDtaileData.list[0].name }}
      </h3>
      <p class="float-right">
        {{ rankListDtaileData.list[0].updateFrequency }}
      </p>
    </div>
    <div class="flex">
      <div class="mt-3 w-[120px] h-[120px]">
        <img :src="rankListDtaileData.list[0].coverImgUrl" alt="" />
      </div>
      <div class="ml-5">
        <ol class="list-none">
          <li class="flex items-center">
            <span class="text-[16px]"
              >1.{{ rankListDtaileData.list[0].tracks[0]?.first }}-{{
                rankListDtaileData.list[0].tracks[0]?.second
              }}</span
            >
            <span class="text-green-500 ml-auto">New</span>
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
              >2.{{ rankListDtaileData.list[0].tracks[1]?.first }}-{{
                rankListDtaileData.list[0].tracks[1]?.second
              }}</span
            >
            <span class="text-green-500 ml-auto">New</span>
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
              >3.{{ rankListDtaileData.list[0].tracks[2]?.first }}-{{
                rankListDtaileData.list[0].tracks[2]?.second
              }}</span
            >
            <span class="text-green-500 ml-auto">New</span>
          </li>
        </ol>
      </div>
    </div>
  </div>

  <div
    class="flex flex-col justify-start gap-4 p-4 bg-orange-400 rounded-lg shadow-md w-full h-full md:w-1/2 lg:w-1/3 my-5"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-[25px]">
        {{ rankListDtaileData.list[1].name }}
      </h3>
      <p class="float-right">
        {{ rankListDtaileData.list[1].updateFrequency }}
      </p>
    </div>
    <div class="flex">
      <div class="mt-3 w-[120px] h-[120px]">
        <img :src="rankListDtaileData.list[1].coverImgUrl" alt="" />
      </div>
      <div class="ml-5">
        <ol class="list-none">
          <li class="flex items-center">
            <span class="text-[16px]"
              >1.{{ rankListDtaileData.list[1].tracks[0]?.first }}-{{
                rankListDtaileData.list[1].tracks[0]?.second
              }}</span
            >
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
              >2.{{ rankListDtaileData.list[1].tracks[1]?.first }}-{{
                rankListDtaileData.list[1].tracks[1]?.second
              }}</span
            >
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
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
    class="flex flex-col justify-start bg-orange-400 gap-4 p-4 rounded-lg shadow-md w-full h-full md:w-1/2 lg:w-1/3 my-5"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-[25px]">
        {{ rankListDtaileData.list[2].name }}
      </h3>
      <p class="float-right">
        {{ rankListDtaileData.list[2].updateFrequency }}
      </p>
    </div>
    <div class="flex">
      <div class="mt-3 w-[120px] h-[120px]">
        <img :src="rankListDtaileData.list[2].coverImgUrl" alt="" />
      </div>
      <div class="ml-5">
        <ol class="list-none">
          <li class="flex items-center">
            <span class="text-[16px]"
              >1.{{ rankListDtaileData.list[2].tracks[0]?.first }}-{{
                rankListDtaileData.list[2].tracks[0]?.second
              }}</span
            >
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
              >2.{{ rankListDtaileData.list[2].tracks[1]?.first }}-{{
                rankListDtaileData.list[2].tracks[1]?.second
              }}</span
            >
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
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
    class="flex flex-col justify-start bg-orange-400 gap-4 p-4 rounded-lg shadow-md w-full h-full md:w-1/2 lg:w-1/3 my-5"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-[25px]">
        {{ rankListDtaileData.list[3].name }}
      </h3>
      <p class="float-right">
        {{ rankListDtaileData.list[3].updateFrequency }}
      </p>
    </div>
    <div class="flex">
      <div class="mt-3 w-[120px] h-[120px]">
        <img :src="rankListDtaileData.list[3].coverImgUrl" alt="" />
      </div>
      <div class="ml-5">
        <ol class="list-none">
          <li class="flex items-center">
            <span class="text-[16px]"
              >1.{{ rankListDtaileData.list[3].tracks[0]?.first }}-{{
                rankListDtaileData.list[3].tracks[0]?.second
              }}</span
            >
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
              >2.{{ rankListDtaileData.list[3].tracks[1]?.first }}-{{
                rankListDtaileData.list[3].tracks[1]?.second
              }}</span
            >
          </li>
          <li class="flex items-center">
            <span class="text-[16px]"
              >3.{{ rankListDtaileData.list[3].tracks[2]?.first }}-{{
                rankListDtaileData.list[3].tracks[2]?.second
              }}</span
            >
          </li>
        </ol>
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
