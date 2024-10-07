<script setup>
import Bottom from "../Bottom/Bottom.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";

</script>

<template>
  <div>
    <h1>播客</h1>
    <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
      <BottomPlayBar></BottomPlayBar>
    </div>
    <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </footer>
  </div>
</template>
<style scoped></style>