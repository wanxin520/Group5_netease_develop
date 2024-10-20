<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/store";
import { useRequest } from "vue-request";
import { getDynamicMessage } from "@/api/userIndex";
import DynamicList from "@/components/dynamic/DynamicList.vue";

const userStore = useUserStore()
const eventList = ref()

const { data, loading } = useRequest(() => getDynamicMessage({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))
watch(data, () => {
    // console.log(data.value);
    eventList.value = data.value.event
})
</script>

<template>
    <div v-if="!loading">
        <DynamicList :events="eventList"></DynamicList>
    </div>
</template>
<style scoped></style>