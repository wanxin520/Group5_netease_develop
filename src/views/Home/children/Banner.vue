<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const isClicked = (id) => {
  console.log(id);
};
console.log(props.data);
</script>

<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in props.data" :key="item.bannerId">
        <div @click="isClicked(item.bannerId)">
          <img class="w-[100%]" :src="item.pic" alt="" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped></style>
