<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { getSongsLyric } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { useUserStore } from "@/store";
import MusicPlayPage from "../play/music/MusicPlayPage.vue";
import { useRoute } from "vue-router";

const props = defineProps({
    id: {}
})
console.log(props.id);
const userStore = useUserStore()
const { data, loading } = useRequest(() => getSongsLyric({ "id": 66842, "cookie": userStore.userInfo.cookie }))

watch(data, () => {
    console.log(data.value);
})
</script>

<template>
    <div>


    </div>
</template>
<style scoped></style>