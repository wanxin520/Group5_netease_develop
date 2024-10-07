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
  const query = { id: id };
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
    <van-swipe :width="350" :height="300" :stop-propagation="false" :loop="false" :show-indicators="false">
      <van-swipe-item class="p-2" v-for="(item, index) in props.data.extInfo" :key="item.id">
        <div class="w-[100%] h-[100%] flex justify-between items-center bg rounded-[2rem]"
          style="box-shadow: 2px 5px 5px gray">
          <div class="flex p-3 relative">
            <img class="w-[9rem] rounded-[2rem]" :src="item.mlogBaseData.video.frameUrl" alt="" />
            <div class=" absolute top-[43%] left-[40%]">
              <Icon icon="fluent:play-24-filled" width="1.8rem" style="color: #858585" />
            </div>
          </div>

          <div class="flex flex-col justify-around w-[70%] h-[100%] p-3">
            <div class="text-[#ffffff] font-semibold">
              <div v-if="item.mlogBaseData.originalTitle">
                {{ item.mlogBaseData.originalTitle }}
              </div>
              <div v-else-if="item.mlogBaseData.text">
                {{ item.mlogBaseData.text }}
              </div>
              <div v-else>{{ item.mlogBaseData.desc }}</div>
            </div>

            <div class="flex justify-start items-center">
              <div>
                <img class="w-[2.5rem] rounded-[50%]" :src="item.userProfile.avatarUrl" alt="" />
              </div>
              <div class="text-[#747474] text-[12px] font-bold mx-1">
                {{ item.userProfile.nickname }}
              </div>
            </div>
            <div class="h-[30%] flex justify-between items-center text-[#636363] font-">
              <div class="h-[100%] flex flex-col justify-between items-center">
                <div>
                  <Icon icon="uis:comment-dots" width="1.8rem" style="color: #ffffff" />
                </div>
                <div>
                  {{ item.mlogExtVO.commentCount }}
                </div>
              </div>
              <div class="h-[100%] flex flex-col justify-between items-center">
                <div>
                  <Icon icon="icon-park-solid:like" width="1.8rem" style="color: #ff0000" />
                </div>
                <div v-if="item.mlogExtVO.likedCount > 10000">
                  {{ (item.mlogExtVO.playCount / 10000).toFixed(1) }}W
                </div>
                <div v-else-if="item.mlogExtVO.likedCount > 1000">
                  {{ (item.mlogExtVO.likedCount / 10000).toFixed(2) }}W
                </div>
                <div v-else>
                  {{ item.mlogExtVO.likedCount }}
                </div>
              </div>
              <div class="h-[100%] flex flex-col justify-between items-center">
                <div>
                  <Icon icon="fluent:play-24-filled" width="1.8rem" style="color: #858585" />
                </div>
                <div v-if="item.mlogExtVO.playCount > 10000">
                  {{ (item.mlogExtVO.playCount / 10000).toFixed(1) }}W
                </div>
                <div v-else-if="item.mlogExtVO.playCount > 1000">
                  {{ (item.mlogExtVO.playCount / 10000).toFixed(2) }}W
                </div>
                <div v-else>
                  {{ item.mlogExtVO.playCount }}
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
  background-image: linear-gradient(to bottom,
      rgb(252, 160, 160),
      rgb(240, 234, 208) 80%);
}
</style>
