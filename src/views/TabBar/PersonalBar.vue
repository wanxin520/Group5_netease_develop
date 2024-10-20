<script setup>
import { Icon } from "@iconify/vue";
import Bottom from "../Bottom/Bottom.vue";
import GetUserAcount from "@/components/userInfo/get/GetUserAcount.vue";
import LeftPopup from "../Top/children/MenuPopup.vue";
import GetUserPlayList from "@/components/userInfo/get/GetUserPlayList.vue";
import { ref, watch, reactive, onMounted, onUnmounted } from "vue"
import { useRequest } from 'vue-request';
import { getUserAccount } from '@/api/userIndex';
import { useUserStore } from "@/store";
import GetUserDynamic from "@/components/userInfo/get/GetUserDynamic.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore()
const router = useRouter()
const { data, loading } = useRequest(() => getUserAccount({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))
watch(data, () => {
  // console.log(data.value);
})
const checked = ref(2)
</script>

<template>
  <div class="h-[100vh] flex flex-col justify-start">
    <main v-if="!loading">
      <div>
        <!-- 上面的主页 -->
        <div>
          <GetUserAcount :data="data">
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
                <div @click="router.push({ name: 'recently' })"
                  class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
                  <div><van-icon name="underway-o" /></div>
                  <div>最近</div>
                </div>
                <div @click="router.push({ name: 'local' })"
                  class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
                  <div>
                    <Icon icon="mingcute:folder-download-line" width="1rem" />
                  </div>
                  <div>本地</div>
                </div>
                <div @click="router.push({ name: 'netdisk' })"
                  class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
                  <div>
                    <Icon icon="mdi:cloud-upload" width="1rem" />
                  </div>
                  <div>网盘</div>
                </div>
                <div @click="router.push({ name: 'shoped' })"
                  class="w-[4rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
                  <div>
                    <Icon icon="icon-park-outline:buy" width="1rem" />
                  </div>
                  <div>已购</div>
                </div>
                <div @click="router.push({name:'more'})"
                  class="w-[2rem] h-[2rem] flex justify-evenly items-center bg-[#ffffff2f] rounded-[10px]">
                  <Icon icon="icon-park-solid:more-app" />
                </div>
              </div>
            </template>
          </GetUserAcount>
        </div>
        <!-- 下面的详细信息 -->
        <div class="mb-20">
          <div>
            <van-tabs v-model:active="checked" offset-top="48px" sticky animated color="red" title-inactive-color="gray"
              line-width="10">
              <van-tab title="音乐">
                <GetUserPlayList :data="data"></GetUserPlayList>
              </van-tab>
              <van-tab title="播客">播客</van-tab>
              <van-tab title="动态">
                <GetUserDynamic :data="data"></GetUserDynamic>
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>
    </main>
    <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
      <BottomPlayBar></BottomPlayBar>
    </div>
    <div class="fixed bottom-[0px] left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </div>
  </div>
</template>
<style scoped></style>