<script setup>
import Bottom from "../Bottom/Bottom.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
</script>

<template>
  <div>
    <h1>视频</h1>
  </div>
  <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
    <BottomPlayBar></BottomPlayBar>
  </div>
  <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
    <Bottom></Bottom>
  </div>
</template>
<style scoped></style>