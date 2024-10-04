eslint-disable vue/require-v-for-key
<script setup>
import { ref } from "vue";
import { getTopPlayList } from "@/api";

const top = ref();
getTopPlayList()
  .then((res) => {
    console.log("res:", res);
    top.value = res.playlists;
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<template>
  <div class="gallery-container">
    <div class="w-full flex justify-center items-center text-xl">歌单</div>

    <div class="images">
      <div class="image-item" v-for="item in top" :key="item">
        <img class="rounded-[20px]" :src="item.coverImgUrl" alt="" />
        <div
          class="w-[80%] my-3 flex justify-center items-center text-[#4d4c4c] text-[13px]"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  gap: 16px; /* 根据需要调整间隔 */
  margin: auto;
}

.images {
  display: flex;
  flex-wrap: wrap;
  margin: -8px; /* 负间隔来紧凑布局 */
}

.image-item {
  flex: 1 0 calc(50% - 16px); /* 减去间隔宽度， */
  margin: 8px; /* 根据需要调整间隔 */
}

.image {
  width: 80%;
  height: auto;
  display: block; /* 防止底部出现空隙 */
  border-radius: 8px; /* 圆角边框 */
}
</style>
