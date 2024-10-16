<!-- <script setup>
// import { ref } from "vue";
import { getCollector, getCollectorList } from "@/api";
import { useRequest } from "vue-request";
import { watch } from "vue";

const { data: CollectorData } = useRequest(() => getCollector());
const { data: CollectorDataList } = useRequest(() => getCollectorList());
watch(CollectorData, () => {
  console.log(CollectorData);
});
watch(CollectorData, () => {
  console.log(CollectorDataList);
});
</script>

<template>
  <div v-for="item in CollectorData" :key="item">
    <div>{{ item._rawValue.data[0] }}</div>
  </div>
  <div v-for="item1 in CollectorDataList" :key="item1"></div>
</template>
<style scoped></style> -->
