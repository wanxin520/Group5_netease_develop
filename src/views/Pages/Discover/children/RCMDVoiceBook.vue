<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  data: {},
});
// console.log(props.data);

const emit = defineEmits(["transmitePlaylistId", "transmiteSongId", "transmiteVideoId"])
const getResourceId = (resourceId) => {
  console.log(resourceId);
}
</script>

<template>
  <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh] bg-[#ffffff]">
    <div class="flex justify-center items-center">
      <div class="text-[#707070] text-[14px] font-bold">
        {{ props.data.name }}
      </div>
      <Icon icon="weui:arrow-filled" width="1.2rem" height="1.2rem" style="color: #666666" />
    </div>
    <Icon icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
  </div>
  <div class="w-[100vw] flex justify-center items-center bg-[#ffffff]">
    <van-swipe :width="350" :height="290" :stop-propagation="false" :loop="false" loop="false" :show-indicators="false">
      <van-swipe-item class="p-2" v-for="(item, index) in props.data.item" :key="item.id">
        <div class="flex flex-col items-center">
          <van-swipe :width="305" :height="80" :loop="false" :show-indicators="false" vertical>
            <van-swipe-item @click="getResourceId(inItem.resourceId)" v-for="inItem in props.data.item[index].items"
              class="mt-2">
              <div class="h-[100%] flex justify-center items-center">
                <div class="h-[100%] flex justify-center items-center">
                  <img class="rounded-[20px] w-[4rem] p-1" :src="inItem.coverUrl" alt="">
                </div>
                <div class=" w-[80%] h-[100%] p-3 flex flex-col justify-center items-start">
                  <div class=" w-[90%] flex justify-start items-center text-[#4d4c4c] text-[12px] font-bold">
                    {{ inItem.title }}
                  </div>
                  <div class=" w-[100%]  flex justify-start items-center text-[#4d4c4c] text-[9px] mt-1">
                    <div
                      class=" flex justify-start items-center text-[#5d44e7] bg-[#d5d6d8] rounded-[2px] text-[6px] p-[2px] mr-1">
                      {{ inItem.label.text }}
                    </div>
                    <div class=" flex justify-start items-center text-[#4d4c4c] ">
                      {{ inItem.desc }}
                    </div>
                  </div>
                </div>
                <div v-if="inItem.score"
                  class="w-[2rem] flex justify-center items-center text-[#918e8e] text-[9px] font-bold">
                  <span>{{ inItem.score }}分</span>
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
