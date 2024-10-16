<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  data: {},
});
const emit = defineEmits(["transmitePlaylistId", "transmiteSongId", "transmiteVideoId"])
// console.log(props.data.resourceExtInfo[0].playCount);
// console.log(props.data.children);
const isChecked = (id) => {
  console.log(id);
  // let query = { id: id };
  // router.push({ name: "detail", query });
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
  <div class=" w-[100vw] flex justify-center items-center">
    <van-swipe :width="300" :height="140" :stop-propagation="false" :loop="false" :show-indicators="false">
      <van-swipe-item class="p-2" v-for="(item, index) in props.data.children" :key="item.resourceId">
        <!-- :style="{ backgroundImage: `linear-gradient(to bottom, rgb(${index * 30 + 100}, ${index * 30 + 100}, ${index * 30 + 198}), rgb(${index * 30 + 128}, ${index * 30 + 100}, ${index * 30 + 160}))`}" -->
        <div @click="isChecked(item.resourceId)" class="h-[100%] flex flex-col items-start  rounded-[10px] bg">
          <div class="w-[100%] flex justify-start items-center ml-2 mt-1">
            <div class="flex justify-center items-center text-[#ffffff] text-[14px] font-bold p-1">
              {{ item.songData.name }}
            </div>
            <!-- <Icon icon="bi:play-fill" width="1.2rem" height="1.2rem" style="color: #787878" /> -->
          </div>
          <div class="w-[100%] flex justify-start items-start">
            <div class="w-[80%] flex">
              <div class="h-[100%] w-[100%]  flex flex-col justify-start items-start ml-1 ">
                <div class="text-[11px] text-[#555454] font-bold "><span>{{ item.users[0].nickname }}：</span></div>
                <van-text-ellipsis class="text-[10px] font-serif mt-2 text-[#864848]" :rows="3"
                  :content="item.titleDesc" />
              </div>
            </div>
            <div class="flex flex-col w-[35%] h-[100%] justify-between items-center">
              <div
                class=" flex justify-center items-center text-[#4584e2] text-[8px] bg-[#f7f7f7] rounded-[5px] mt-1 p-0.5 ">
                {{ item.algReason }}
              </div>
              <div class=" w-[100%] h-[5rem] flex justify-around items-center">
                <div class="flex flex-col justify-center items-center">
                  <Icon icon="icon-park-solid:like" width="1rem" height="1rem" style="color: #ff0000" />
                  <div class="text-[#ff3636] text-[10px]">
                    {{ item.likedCount }}
                  </div>
                </div>
                <div class="flex flex-col justify-center items-center text-[#585151] ">
                  <Icon icon="fluent:replay-24-filled" width="1rem" height="1rem" />
                  <div class="text-[10px]">
                    {{ item.replyCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style scoped>
.bg {
  background-image: linear-gradient(to bottom, rgb(235, 151, 42), rgb(238, 238, 238));
}
</style>
