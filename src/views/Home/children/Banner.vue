<script setup>
import { ref, watch } from "vue"
import { useRequest } from "vue-request";
import { getBannerImage, getUserAccount } from "@/api/userIndex";
import { useUserStore } from "@/store";


const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const isClicked = (id) => {
  console.log(id);
};
// console.log(props.data);

const Banners = ref()
const userStore = useUserStore()
const { data: banner } = useRequest(() => getBannerImage({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))
watch(banner, () => {
  // console.log(banner.value.banners);
  setTimeout(() => {
    Banners.value = banner.value.banners
  }, 2000)
})
</script>

<template>
  <div class="h-[22vh]">
    <div v-if="Banners" class="w-[96%] m-auto my-[10px]">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in Banners" :key="item.bannerId">
          <div @click="isClicked(item.bannerId)">
            <img class="w-[100%] rounded-[1.1rem]" :src="item.imageUrl" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-else class="w-[96%] m-auto my-[10px]">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in props.data" :key="item.bannerId">
          <div @click="isClicked(item.bannerId)">
            <img class="w-[100%] rounded-[1.1rem]" :src="item.pic" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>


</template>

<style scoped></style>
