<script setup>
import { getHomePageData } from "@/api";
import { useRequest } from "vue-request";
import BlockType from "./children/BlockType.vue";

// useRequest传入的是一个返回Promise值的请求函数,data就是返回的数据
const { data: pageData } = useRequest(getHomePageData)

</script>

<template>
    <div class="h-[100vh]">
        <div class="content">
            <BlockType v-for="item in pageData" :data="item" :key="item.blockCode" class="min-h-[100%]"></BlockType>
            <div style="height: 300px;"></div>
        </div>
    </div>
</template>
<style scoped>
.content {
    background-image: linear-gradient(to bottom, rgba(255, 243, 255, 0.795), rgb(240, 252, 252));
}

.filter {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>