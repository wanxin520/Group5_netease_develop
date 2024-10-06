<script setup>
import { ref } from "vue"
import Bottom from "../Bottom/Bottom.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";

</script>

<template>
  <div>
    <h1>关注</h1>
    <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
      <div class="flex ">
        <BottomPlayBar></BottomPlayBar>
        <Bottom></Bottom>
      </div>
    </footer>
  </div>
</template>
<style scoped></style>