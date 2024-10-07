<script setup>
import { ref } from "vue"
import Bottom from "../Bottom/Bottom.vue";
import { usePlayStore } from "@/store";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import { loadDate } from "@/components/play/music/tool/loadHandler";

// loadDate([25906124, 1331819951, 534542079, 28285910])

const playStore = usePlayStore()
// setTimeout(()=>{
// playStore.setPlayIndex(0)
// },1000)
// 
</script>

<template>
  <div>
    <h1>关注</h1>
    <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
      <BottomPlayBar></BottomPlayBar>
    </div>
    <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </footer>
  </div>
</template>
<style scoped></style>