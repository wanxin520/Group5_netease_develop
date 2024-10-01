<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import Bottom from "../Home/bottom/Bottom.vue";
import { getUserAccount } from "@/api/userIndex";
import { useUserStore } from "@/store";
import LeftPopup from "../Home/top/LeftPopup.vue";

const userStore = useUserStore()
const userAccount = ref()
const userProfile = ref()
const { data, loading } = useRequest(() => getUserAccount({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))
watch(data, () => {
  console.log(data.value.profile);
  console.log(data.value.account);
  userProfile.value = data.value.profile
  userAccount.value = data.value.account
})
</script>

<template>
  <div class="h-[100vh] flex flex-col justify-start">
    <div v-if="!loading" class="h-[50%]" :style="{ backgroundImage: `url(${userProfile.backgroundUrl})` }">
      <div class="w-[100%] flex justify-between items-center p-2 mt-3">
        <div class="ml-2">
          <LeftPopup></LeftPopup>
        </div>
        <div class="w-[6rem] flex justify-around items-center">
          <Icon icon="majesticons:search-line" width="1.6rem" height="1.6rem" style="color: #9c9c9c" />
          <Icon icon="ant-design:more-outlined" width="1.6rem" height="1.6rem" style="color: #9c9c9c"></Icon>
        </div>
      </div>
      <div class="w-[100%] h-[40%] flex flex-col justify-center items-center">
        <div class="w-[100%] flex justify-center">
          <img class="w-[5rem] h-[5rem] rounded-[50%]" :src="userProfile.avatarUrl" alt="">
        </div>
        <div>
          <div class="text-[#ffffff] text-[14px] font-bold">{{ userProfile.nickname }}</div>
          <div class="text-[#ffffff] text-[14px] font-bold">村龄{{ ((Date.now() - userProfile.createTime)/31536000000).toFixed(0) }}年</div>
        </div>
      </div>
    </div>




    <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </footer>
  </div>
</template>
<style scoped></style>