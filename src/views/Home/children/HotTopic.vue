<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  data: {},
});
const getResourceId = (resourceId) => {
  console.log(resourceId);
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
    <van-swipe :width="350" :height="150" :stop-propagation="false" :loop="false" loop="false" :show-indicators="false"
      vertical>
      <van-swipe-item class="p-2" v-for="(item, index) in props.data.creatives" :key="item.id">
        <div class="flex ">
          <van-swipe :width="330" :height="150" :loop="false" :show-indicators="false">
            <van-swipe-item @click="getResourceId(inItem.resourceId)"
              v-for="(inItem, inIndex) in props.data.creatives[index].resources">
              <div class="h-[80%] w-[95%] flex justify-around items-center rounded-[20px] bg-[#f7bfaa]">

                <div class="w-[80%] h-[100%] p-1 flex flex-col justify-around items-start">

                  <div class="flex justify-start items-center text-[#4d4c4c] text-[12px] font-bold">
                    <img class="rounded-[20px] w-[2rem] p-1" :src="inItem.uiElement.mainTitle.titleImgUrl" alt="" />
                    <div class="text-[#ffffff] font-bold text-[15px] overflow-hidden line-clamp-1">{{
                      inItem.uiElement.mainTitle.title }}</div>
                  </div>
                  <van-tag color="rgb(255, 156, 131)" text-color="#ff2121">{{
                    inItem.uiElement.subTitle.title}}</van-tag>
                  <div class=" flex flex-col justify-between items-center">
                    <div class="w-[100%] p-1 flex justify-start items-center">
                      <img class="w-[1.5rem] rounded-[50%]" :src="inItem.resourceExtInfo.user.avatarUrl" alt="">
                      <van-text-ellipsis class="text-[12px] mx-2 text-[#000000]"
                        :content="inItem.resourceExtInfo.user.nickname" />
                    </div>
                    <van-text-ellipsis class="text-[10px] mx-1 p-1 text-[#583c3c]"
                      :content="inItem.resourceExtInfo.eventMsg" rows="2" />
                  </div>

                </div>
                <div class="h-[100%] flex flex-col justify-between p-4 items-center">
                  <img class="rounded-[20px] w-[4.5rem]" :src="inItem.uiElement.image.imageUrl" alt="" />
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style scoped>
</style>
