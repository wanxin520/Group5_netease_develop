<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

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
  <div class="w-[100vw] flex justify-center items-center">
    <van-swipe :width="150" :height="200" :stop-propagation="false" :loop="false" :show-indicators="false">
      <van-swipe-item class="p-2" v-for="item in props.data.children" :key="item.id">
        <div @click="isChecked(item.id)" class="h-[100%] flex flex-col justify-around items-center">
          <img class="rounded-[20px]  w-[10rem] h-[8.8rem]" :src="item.imageUrl" alt="" />
          <van-text-ellipsis :content="item.title" class="text-[12px]" rows="1" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style scoped></style>