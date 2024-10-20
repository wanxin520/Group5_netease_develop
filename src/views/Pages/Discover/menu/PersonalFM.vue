<script setup>
import { ref, watch, createApp } from "vue";
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { getPersonalFM } from "@/api/homemenu";
import { NoticeBar } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const app = createApp();
app.use(NoticeBar);
const FMData = ref();
const { data } = useRequest(() => getPersonalFM());
watch(data, () => {
  console.log(data.value);
  FMData.value = data.value.data;
});

//返回上一页
const goBack = () => {
  router.go(-1); // 或者使用 router.back();
};


</script>

<template>
  <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
    <div class="flex justify-center items-center">
      <div class="text-[#707070] text-[14px] font-bold"></div>
      <Icon
        icon="weui:back-filled"
        width="1.2rem"
        height="1.2rem"
        style="color: #666666"
        @click="goBack"
      />
    </div>
    <div class="w-full flex justify-center items-center">私人FM</div>
    <Icon
      icon="material-symbols:more-vert"
      class="text-[1.2rem] mr-1 text-[#707070]"
    />
    <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      description="描述信息"
    />
  </div>
  <div class="fm">
    <div class="flex row flex-wrap justify-center items-center">
      <div v-for="item in FMData" key="item.id">
        <div>
          <img
            class="rounded-[120px] w-[60vw] mt-2"
            :src="item.album.picUrl"
            alt=""
            style="box-shadow: 10px 20px 20px 10px gray"
          />
        </div>
        <div
          class="flex col flex-wrap justify-center text-[13px] text-[#4d4c4c]"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :touchable="false"
        :show-indicators="false"
      >
        <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
        <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
        <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
  </div>
</template>
<style scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.fm {
  background-image: url("http://p1.music.126.net/u3-76cloM5cma8zTVp4oBg==/109951168697245707.jpg");
}
</style>
