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
const getVideoId = (videoKey) => {
  console.log(videoKey);
}
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
    <van-swipe :width="350" :height="80" :stop-propagation="false" :loop="false" :show-indicators="false" vertical>
      <van-swipe-item class="p-1" @click="getVideoId(item.mlogBaseData.video.videoKey)"
        v-for="(item, index) in props.data.extInfo" :key="item.id">
        <div class="w-[100%] flex justify-start items-center rounded-[2rem]">
          <div class="flex justify-center items-center"
            :style="`background-image: url(${item.mlogBaseData.video.frameUrl}); background-size: cover; width: 6rem; height: 4rem; border-radius: 10px;`">
            <Icon icon="iconoir:play-solid" width="1.3rem" class="text-[#f1f1f1de]" />
          </div>
          <div class="ml-3">
            <div class="text-[#5e5757] text-[9px] font-semibold ">
              <div v-if="item.mlogBaseData.originalTitle">
                {{ item.mlogBaseData.originalTitle }}
              </div>
              <div v-else-if="item.mlogBaseData.text">
                {{ item.mlogBaseData.text }}
              </div>
              <div v-else>{{ item.mlogBaseData.desc }}</div>
            </div>

            <div class="flex justify-start items-center mt-1">
              <div>
                <img class="w-[1rem] rounded-[50%]" :src="item.userProfile.avatarUrl" alt="" />
              </div>
              <div class="text-[#747474] text-[8px] mx-1">
                {{ item.userProfile.nickname }}
              </div>
            </div>
            <div class="flex justify-start items-center mt-1 text-[#636363] text-[8px]">
              <span>
                {{ new Date(item.mlogBaseData.video.duration).getMinutes() < 10 ? "0" + new
                  Date(item.mlogBaseData.video.duration).getMinutes() : new
                  Date(item.mlogBaseData.video.duration).getMinutes() }}:{{ new
                  Date(item.mlogBaseData.video.duration).getSeconds() < 10 ? "0" + new
                  Date(item.mlogBaseData.video.duration).getSeconds() : new
                  Date(item.mlogBaseData.video.duration).getSeconds() }} </span>
                  <span>，</span>
                  <div v-if="item.mlogExtVO.playCount > 10000">
                    {{ (item.mlogExtVO.playCount / 10000).toFixed(1) }}万
                  </div>
                  <div v-else-if="item.mlogExtVO.playCount > 1000">
                    {{ (item.mlogExtVO.playCount / 10000).toFixed(2) }}万
                  </div>
                  <div v-else>
                    {{ item.mlogExtVO.playCount }}
                  </div>
                  <span>次播放，</span>
                  <div v-if="item.mlogExtVO.likedCount > 10000">
                    {{ (item.mlogExtVO.likedCount / 10000).toFixed(1) }}万
                  </div>
                  <div v-else-if="item.mlogExtVO.likedCount > 1000">
                    {{ (item.mlogExtVO.likedCount / 10000).toFixed(2) }}万
                  </div>
                  <div v-else>
                    {{ item.mlogExtVO.likedCount }}
                  </div>
                  <span>人喜欢，</span>
                  <div v-if="item.mlogExtVO.commentCount > 10000">
                    {{ (item.mlogExtVO.commentCount / 10000).toFixed(1) }}万
                  </div>
                  <div v-else-if="item.mlogExtVO.commentCount > 1000">
                    {{ (item.mlogExtVO.commentCount / 10000).toFixed(2) }}万
                  </div>
                  <div v-else>
                    {{ item.mlogExtVO.commentCount }}
                  </div>
                  <span>人评论</span>
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
