<script setup>
import { getUserPLCount } from "@/api/userIndex";
import { ref,watch } from "vue"
import { useRequest } from "vue-request";
import { useUserStore } from "@/store";

// 获取消息数量
const { data:messageCount, loading } = useRequest(() => getUserPLCount({cookie: useUserStore().cookie}))

watch(messageCount,()=>{
 console.log(messageCount.value);
})

</script>

<template>
    <div>


    </div>
</template>
<style scoped></style>