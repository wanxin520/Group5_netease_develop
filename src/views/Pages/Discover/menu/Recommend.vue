<script setup>
  import { ref } from "vue"
import { getRecommendList } from "@/api";
import { useRequest } from "vue-request";


const {data:recommendPageData} =useRequest(getRecommendList)
console.log(recommendPageData);

</script>

<template>
  <div>
    <h1>每日推荐页面</h1>

  </div>
</template>
<style scoped>


</style>