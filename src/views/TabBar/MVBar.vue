<script setup>
import { ref } from "vue";
import MenuPopup from "@/views/Top/children/MenuPopup.vue";
import SearchPopup from "@/views/Top/children/SearchPopup.vue";
import { Icon } from "@iconify/vue";
import Bottom from "../Bottom/Bottom.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import MVPage from "@/views/Pages/MV/MVPage.vue";

const showSearchPage = ref(false);
const showDefaltKeywords = ref("");
const emit = defineEmits(["closeSearchPopup"])

const closeSearchPopup = () => {
  showSearchPage.value = false
}

</script>

<template>
  <van-sticky>
    <header class="w-[100vw] h-[10vh] flex justify-between items-center bg-[#ffffff] ">
      <div class="w-[100vw] h-[3rem] flex m-auto justify-between" style="align-items: center">
        <MenuPopup></MenuPopup>
        <div @click="showSearchPage = true" class="w-[80%] flex justify-between items-center shadow rounded-[20px]"
          style=" border: red 10px">
          <Icon icon="ic:twotone-search" width="1.2rem" class="mx-2" style="color: gray" />
          <div class="h-[30px] text-[12px] flex justify-center items-center text-[#b3b1b1]">
            {{ showDefaltKeywords }}
          </div>
        </div>
        <div class="mr-2 text-[12px]">
          <span>搜索</span>
        </div>
      </div>
    </header>
  </van-sticky>
  <MVPage></MVPage>
  <!-- 右侧弹出搜索页面 -->
  <van-popup v-model:show="showSearchPage" position="right" :style="{ width: '100vw', height: '100%' }">
    <SearchPopup :defaultKeywords="showDefaltKeywords" :searchType="1014" @closeSearchPopup="closeSearchPopup">
    </SearchPopup>
  </van-popup>
  <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
    <BottomPlayBar></BottomPlayBar>
  </div>
  <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
    <Bottom></Bottom>
  </div>
</template>
<style scoped></style>