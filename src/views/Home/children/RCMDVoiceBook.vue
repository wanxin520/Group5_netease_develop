<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  data: {},
});
console.log(props.data.item[0].items[1]);
console.log(props.data.item);

const isChecked = (id) => {
  console.log(id);
  let query = { id: id };
  router.push({ name: "detail", query });
};
</script>

<template>
  <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
    <div class="flex justify-center items-center">
      <div class="text-[#707070] text-[14px] font-bold">
        {{ props.data.name }}
      </div>
      <Icon icon="weui:arrow-filled" width="1.2rem" height="1.2rem" style="color: #666666" />
    </div>
    <Icon @click="emit('clickMore')" icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
  </div>
  <div class="w-[100vw] flex justify-center items-center">
    <van-swipe :width="500" :height="120" :stop-propagation="false" :loop="false" :show-indicators="false" vertical>
      <van-swipe-item class="p-2" v-for="(item, index) in props.data.item" :key="index">
        <div class="flex items-center">
          <van-swipe :width="120" :height="200" :stop-propagation="false" :loop="false" :show-indicators="false">
            <van-swipe-item class="p-2" v-for="(inItem, inIndex) in props.data.item[index].items" :key="inItem">
              <div @click="isChecked(items)" class="flex flex-col items-center text-[#4d4c4c] text-[10px]">
                <img class="rounded-[20px] w-[5rem]" :src="inItem.coverUrl" alt="" />{{ inItem.title }}
                <!-- <div>{{ inItem.coverUrl }}</div> -->
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style scoped></style>
