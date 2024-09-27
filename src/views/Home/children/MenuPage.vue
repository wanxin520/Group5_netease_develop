<script setup>
import { defineProps } from "vue";
import router from "@/router";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <van-swipe
      class="my-swipe"
      :stop-propagation:="false"
      :width="100"
      :height="100"
      :loop="false"
      :show-indicators="false"
    >
      <van-swipe-item
        @click="isClicked(index)"
        class="scroll_item"
        v-for="(item, index) in props.data"
        :key="item.name"
      >
        <div class="flex flex-col items-center">
          <img class="filter w-[3rem]" :src="item.iconUrl" alt="" />
        </div>
        <div class="text-[#818080] text-[14px] ml-6">
          {{ item.name }}
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
.van-swipe-item {
  width: 100%;
}
</style>
