<script setup>
  import { Icon } from "@iconify/vue";

const props = defineProps({
  data: {},
});
function clickMore(){
  console.log("雷达歌单更多被点击");
  
}

const isChecked = (id,title) => {
  console.log(id+title);
};
</script>

<template>
   <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
    <div class="flex justify-center items-center">
      <div class="text-[#707070] text-[14px] font-bold">
        {{ props.data.name }}
      </div>
      <Icon
        icon="weui:arrow-filled"
        width="1.2rem"
        height="1.2rem"
        style="color: #666666"
      />
    </div>
    <Icon
      @click="clickMore"
      icon="material-symbols:more-vert"
      class="text-[1.2rem] mr-1 text-[#707070]"
    />
  </div>
  <div class="w-[100vw] flex justify-center items-center">
    <van-swipe
      :width="150"
      :stop-propagation="false"
      :loop="false"
      :show-indicators="false"
    >
      <van-swipe-item
        class="p-2"
        v-for="item in props.data.children"
        :key="item.id"
      >
        <div @click="isChecked(item.id,item.title)" class="flex flex-col items-center">
          <div>
            <div
              class="w-[4rem] h-[2rem] absolute flex justify-center items-center top-[6%] left-[50%] z-1 bg-[#ffffff1b] rounded-[30%] font-bold text-[white] text-[0.6rem]"
            ></div>
            <img class="rounded-[20px]" :src="item.imageUrl" alt="" />
          </div>
           <div
            class="w-[80%] my-3 flex justify-center items-center text-[#4d4c4c] text-[13px]"
          >
            {{ item.title }}
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style scoped>

</style>