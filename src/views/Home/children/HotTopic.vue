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
    <Icon @click="emit('clickMore')" icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
  </div>
  <div class="w-[100vw] flex justify-center items-center">
    <van-swipe :width="350" :height="150" :stop-propagation="false" :loop="false" loop="false" :show-indicators="false"
      vertical>
      <van-swipe-item class="p-2" v-for="(item, index) in props.data.creatives" :key="item.id">
        <div class="flex ">
          <van-swipe :width="320" :height="150" :loop="false" :show-indicators="false">
            <van-swipe-item @click="getResourceId(inItem.resourceId)"
              v-for="(inItem, inIndex) in props.data.creatives[index].resources">
              <div class="h-[80%] w-[95%] flex justify-around items-center rounded-[20px]"
                style="background-image: linear-gradient(to bottom, rgb(216, 219, 167), rgb(161, 225, 255))">

                <div class="w-[80%] h-[100%] p-1 flex flex-col justify-around items-start">

                  <div class="flex justify-start items-center text-[#4d4c4c] text-[12px] font-bold">
                    <img class="rounded-[20px] w-[2rem] p-1" :src="inItem.uiElement.mainTitle.titleImgUrl" alt="" />
                    <div class="text-[#ffffff] font-bold text-[15px] overflow-hidden line-clamp-1">{{
                      inItem.uiElement.mainTitle.title }}</div>
                  </div>

                  <div class=" flex justify-between items-center">
                    <div class="w-[45%] flex flex-col justify-around items-center">
                      <img class="w-[1.5rem] rounded-[50%]" :src="inItem.resourceExtInfo.user.avatarUrl" alt="">
                      <div
                        class="flex justify-center items-center text-[8px] my-[5px] text-[#a59b9b] font-bold overflow-hidden line-clamp-1">
                        {{
                          inItem.resourceExtInfo.user.nickname
                        }}</div>
                    </div>
                    <p class="w-[55%] h-[76%] flex justify-center items-center text-[10px] text-[#a59b9b] font-bold">
                      {{
                        inItem.resourceExtInfo.eventMsg }}</p>
                  </div>

                </div>
                <div class="h-[100%] flex flex-col justify-between p-4 items-center">
                  <div class="text-[10px] text-[#ff2121] font-bold"> {{ inItem.uiElement.subTitle.title }}</div>
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
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
