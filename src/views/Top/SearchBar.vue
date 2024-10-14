<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import MenuPopup from "./children/MenuPopup.vue"

const showSearchPage = ref(false)
const value = ref('')
</script>

<template>
  <van-sticky>
    <header class="w-[100vw] h-[10vh] bg-[#ffffff]">
      <div class="w-[100vw] h-[10vh] flex m-auto justify-between" style="align-items: center">
        <MenuPopup></MenuPopup>
        <div class="w-[80%] flex justify-between item-center shadow rounded-[20px]"
          style="align-items: center; border: red 10px">
          <Icon icon="ic:twotone-search" width="1.4rem" class="mx-2" style="color: gray" />
          <van-cell-group inset @click="showSearchPage = true">
            <van-field v-model="value" input-align="center" :placeholder="value" />
          </van-cell-group>
          <Icon icon="lucide:scan-line" width="1.4rem" class="mr-2" style="color: gray" />
        </div>
        <Icon icon="iconamoon:microphone-light" width="1.5rem" height="1.5rem" style="color: gray" />
      </div>
    </header>
  </van-sticky>
  <!-- 右右侧弹出搜索页面 -->
  <van-popup v-model:show="showSearchPage" position="right" :style="{ width: '100vw', height: '100%' }">
    <div>

    </div>
    <Icon @click="showSearchPage = false" icon="ri:arrow-left-s-line" width="1.5rem" height="1.5rem" />
  </van-popup>
</template>
<style scoped></style>
