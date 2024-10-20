<script setup>
import { ref } from "vue"
const emit = defineEmits(["closePlayBar", "nextSong", "backSong", "closePlayingList"])


</script>

<template>
    <div @click="emit('closePlayingList')">
        关闭
    </div>
</template>
<style scoped></style>