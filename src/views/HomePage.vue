<script setup>
import { ref, watch } from "vue"
import { RouterView } from "vue-router";
import Bottom from "./Bottom/Bottom.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";

</script>

<template>
    <div>
        <div class="mb-[100px]">
            <RouterView></RouterView>
        </div>
        <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
            <BottomPlayBar></BottomPlayBar>
        </div>
        <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
            <Bottom></Bottom>
        </footer>
    </div>
</template>
<style scoped></style>