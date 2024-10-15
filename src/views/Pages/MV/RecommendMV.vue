<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getRecommendMV } from "@/api/videoIndex";
import { Icon } from "@iconify/vue";

import { useRequest } from "vue-request";

const router = useRouter();
const MVData = ref();
const { data } = useRequest(() => getRecommendMV());
watch(data, () => {
  console.log(data.value);
  MVData.value = data.value.result;
  console.log(data.value.data);
});

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
</script>

<template>
  <!-- <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
    <div class="flex justify-center items-center">
      <div class="text-[#707070] text-[14px] font-bold"></div>
      <Icon
        icon="weui:back-filled"
        width="1.2rem"
        height="1.2rem"
        style="color: #666666"
      />
    </div>
    <div class="w-full flex justify-center items-center">推荐MV</div>
    <Icon
      icon="material-symbols:more-vert"
      class="text-[1.2rem] mr-1 text-[#707070]"
    />
  </div> -->
  <div class="flex-2 flex-col justify-center items-center w-[100vw] ml-[-1rem]">
    <div v-for="(item, index) in MVData" key="item.id">
      <div class="flex justify-start items-center w-[100vw] ml-2">
        <div class="flex justify-start items-center w-[100vw] ml-2">
          <Icon icon="iconoir:play-solid" width="1rem" style="color: #ffffff" />
          <img class="rounded-[10px] w-[34vw] mt-2" :src="item.picUrl" alt="" />
          <div class="text-[#fbfbfb] text-[9px] ml-[-40px] mt-14">
            {{ formatDuration(item.duration) }}
          </div>
          <div
            class="text-[#1c1b1b] font-bold-600 text-[8px] ml-[-33px] mt-[-9vw] bg-white rounded-[2px]"
          >
            <span>百万播放</span>
          </div>
        </div>

        <div class="flex justify-start items-center w-[100vw]">
          <div
            class="flex flex-col flex-center justify-end text-[9px] text-[#3c3b3b] ml-[-15px] mt-[-4px]
            "
          ><div
                class="flex col justify-start text-[8px] mt-[1px] ml-[-16.4rem] text-[#e31a1a] border-[1px] border-[#e31a1a] rounded-[2px] w-[1rem] h-[0.5rem]"
              >
                <span class="text-center mt-[-2.7px] pl-0.5">mv</span>
              </div>
            <div
              class="flex row justify-start text-[10px] text-[#0b0b0b] ml-[-16px] mt-2"
            >
              {{ item.copywriter }}
              
            </div>
            <div
              class="flex row justify-start text-[8px] text-[#666363] ml-[-15px]"
            >
              <span>作者： {{ item.artistName }}</span>
            </div>
            <div
              class="flex row justify-start text-[8px] text-[#666363] ml-[-15px]"
            >
              <span>视频：{{ item.name }}</span>
            </div>
            <div
              class="flex row justify-start text-[8px] text-[#666363] ml-[-15px] mt-1.5"
            >
              <!-- <Icon
              icon="lets-icons:video"
              /> -->
              <div
                class="flex row justify-start text-[8px] text-[#666363] ml-1 mt-[-2px]"
              >
                {{ `${(item.playCount / 10000).toFixed(2)}万播放` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
