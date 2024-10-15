<script setup>
import Bottom from "../Bottom/Bottom.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import RecommendMV from "../Pages/MV/RecommendMV.vue";
</script>

<template>
  <div class="flex justify-center items-center h-full w-full bg-gray-100" >
    <h1>视频</h1>
  </div>
  <div>
    <RecommendMV></RecommendMV>
  </div>
  <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
    <BottomPlayBar></BottomPlayBar>
  </div>
  <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
    <Bottom></Bottom>
  </div>
</template>
<style scoped></style>