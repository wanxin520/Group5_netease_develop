<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import Bottom from "../Bottom/Bottom.vue";
import Recommend from "@/views/Pages/Dynamic/Recommend.vue";
import Attention from "@/views/Pages/Dynamic/Attention.vue";
import LeftPopup from "../Top/children/MenuPopup.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";

const active = ref("0")
const checkPage = (index) => {
  active.value = index
  // console.log(index);
}
</script>

<template>
  <div class="flex flex-col w-[100%] h-[100%]">
    <van-sticky>
      <div class="w-[100%] h-[10vh] flex justify-between items-center bg-[#ffffff]">
        <div class="ml-2">
          <LeftPopup></LeftPopup>
        </div>
        <div class="w-[30%]">
          <van-tabs v-model:active="active" animated line-width="20" line-height="3" title-active-color="#000000"
            color="#f33a3a" title-inactive-color="#999999" @change="checkPage">
            <van-tab title="推荐"></van-tab>
            <van-tab title="关注"></van-tab>
          </van-tabs>
        </div>
        <Icon icon="carbon:add-filled" width="1.5rem" height="1.5rem" class="mr-2" style="color: #ff0000" />
      </div>
    </van-sticky>
    <div class="w-[100%]">
      <Recommend v-if="active == 0"></Recommend>
      <Attention v-else-if="active == 1"></Attention>
    </div>
    <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
      <BottomPlayBar></BottomPlayBar>
    </div>
    <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </div>
  </div>

</template>
<style scoped></style>