<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  data: {},
});

const emit = defineEmits(["transmitePlaylistId", "transmiteSongId", "transmiteVideoId"])
const isChecked = (id) => {
  console.log(id);
  let query = { id: id };
  router.push({ name: "detail", query });
};
</script>

<template>
  <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
    <div class="flex justify-center items-center">
      <div class="text-[#707070] text-[14px] font-bold">
        {{ props.data.name }}
      </div>
      <Icon icon="weui:arrow-filled" width="1.2rem" height="1.2rem" style="color: #666666" />
    </div>
    <Icon icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
  </div>
  <div class="w-[100vw] h-[30vh] flex justify-center items-center">
    <van-swipe :width="300" :height="180" :stop-propagation="false" :loop="false" :show-indicators="false">
      <van-swipe-item class="p-2" v-for="item in props.data.children" :key="item.id">
        <div @click="isChecked(item.id)" class="flex flex-col items-center">
          <div class="relative">
            <div
              class="absolute w-[100%] h-[26px] flex justify-center items-center text-[#ffffff] text-[13px] top-[80%] bg-[#1d137a] overflow-hidden text-ellipsis whitespace-nowrap rounded-b-[10px]">
              {{ item.title }}
            </div>
            <img class="rounded-[10px] h-[8rem]" :src="item.imageUrl" alt="" />
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped></style>
