<script setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue";

</script>

<template>
    <header class="w-[100vw] h-[15vh]">
        <div class="w-[100vw] h-[15vh] flex m-auto justify-between bg-[#ede6f8]" style="align-items: center;">
            <Icon icon="gg:details-more" width="1.5rem" height="2rem" style="color: gray" />
            <div class="w-[80%] h-[45%] flex justify-between item-center shadow rounded-[20px]
         bg-gradient-to-r from-[#d6d5f5] to-[#ead4e9]" style="align-items: center;border:red 10px">
                <Icon icon="ic:twotone-search" width="1.4rem" class=" mx-2" style="color: gray" />
                <input :placeholder="searchHolder" v-model="searchIpt" type="text"
                    class="flex w-[80%] h-[100%] outline-none text-[0.9rem]"
                    style="background-color: rgba(0, 0, 0, 0);text-align: center;">
                <Icon icon="lucide:scan-line" width="1.4rem" class="mr-2" style="color: gray" />
            </div>
            <Icon icon="iconamoon:microphone-light" width="1.5rem" height="1.5rem" style="color: gray" />
        </div>
    </header>
</template>
<style scoped>
header {
    background-image: linear-gradient(to right bottom, rgb(213, 150, 255), rgb(245, 229, 255));
}
</style>