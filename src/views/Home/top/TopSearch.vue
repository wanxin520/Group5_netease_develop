<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import LeftPopup from "./LeftPopup.vue";


const value = ref('搜你想听的')
</script>

<template>
  <header class="w-[100vw] h-[10vh] bg-[#ffffff]">
    <div class="w-[100vw] h-[10vh] flex m-auto justify-between" style="align-items: center">
      <LeftPopup></LeftPopup>
      <div class="w-[80%] flex justify-between item-center shadow rounded-[20px]"
        style="align-items: center; border: red 10px">
        <Icon icon="ic:twotone-search" width="1.4rem" class="mx-2" style="color: gray" />
        <van-cell-group inset>
          <van-field v-model="value" input-align="center" :placeholder="value" />
        </van-cell-group>
        <Icon icon="lucide:scan-line" width="1.4rem" class="mr-2" style="color: gray" />
      </div>
      <Icon icon="iconamoon:microphone-light" width="1.5rem" height="1.5rem" style="color: gray" />
    </div>
  </header>
</template>
<style scoped>
</style>
