<script setup>
import { Icon } from "@iconify/vue";
import Bottom from "../Home/bottom/Bottom.vue";
import GetUserAcount from "@/components/userInformation/get/GetUserAcount.vue";
import LeftPopup from "../Home/top/LeftPopup.vue";

</script>

<template>
  <div class="h-[100vh] flex flex-col justify-start">
    <main>
      <GetUserAcount>
        <template #topbar>
          <div class="w-[100%] h-[3rem] flex justify-between items-center">
            <div class="ml-2">
              <LeftPopup></LeftPopup>
            </div>
            <div class="w-[6rem] flex justify-around items-center">
              <Icon icon="majesticons:search-line" width="1.6rem" height="1.6rem" style="color: #9c9c9c" />
              <Icon icon="ant-design:more-outlined" width="1.6rem" height="1.6rem" style="color: #9c9c9c"></Icon>
            </div>
          </div>
        </template>
        <template #bottombar>
          <div class="w-[100%] flex justify-around items-center text-[#ffffff] text-[10px] mb-5">
            <div class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
              <div><van-icon name="underway-o" /></div>
              <div>最近</div>
            </div>
            <div class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
              <div>
                <Icon icon="icon-park-outline:buy" width="1rem" />
              </div>
              <div>最近</div>
            </div>
            <div class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
              <div>
                <Icon icon="mdi:cloud-upload" width="1rem" />
              </div>
              <div>最近</div>
            </div>
            <div class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
              <div>
                <Icon icon="mingcute:folder-download-line" width="1rem" />
              </div>
              <div>本地</div>
            </div>
            <div class="w-[2rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
              <Icon icon="icon-park-solid:more-app" />
            </div>
          </div>
        </template>

      </GetUserAcount>
    </main>
    <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </footer>
  </div>
</template>
<style scoped></style>