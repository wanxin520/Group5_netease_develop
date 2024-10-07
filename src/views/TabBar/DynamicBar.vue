<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import Bottom from "../Bottom/Bottom.vue";
import { useUserStore } from "@/store";
import { useRequest } from "vue-request";
import { getDynamicMessage } from "@/api/userIndex";
import LeftPopup from "../Top/LeftPopup.vue";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import DynamicList from "@/components/dynamic/DynamicList.vue";

const userStore = useUserStore()

const eventList = ref()
const active = ref()
const { data, loading } = useRequest(() => getDynamicMessage({ "timestamp": Date.now(), "cookie": userStore.userInfo.cookie }))
watch(data, () => {
  // console.log(data.value);
  eventList.value = data.value.event
})
</script>

<template>
  <div>
    <van-sticky>
      <div class="w-[100%] h-[3rem] flex justify-between items-center bg-[#ffffff]">
        <div class="ml-2">
          <LeftPopup></LeftPopup>
        </div>
        <div class="w-[50vw]">
          <van-tabs sticky line-width="10" v-model:active="active" animated>
            <van-tab title="关注">

            </van-tab>
            <van-tab title="广场">

            </van-tab>
            <van-tab title="历史">

            </van-tab>
          </van-tabs>
        </div>
        <Icon icon="carbon:add-filled" width="1.5rem" height="1.5rem" class="mr-2" style="color: #ff0000" />
      </div>
    </van-sticky>
    <DynamicList :events="eventList"></DynamicList>
    <div class="fixed bottom-[50px] left-0 right-0 z-index-1008">
      <BottomPlayBar></BottomPlayBar>
    </div>
    <footer class="fixed bottom-0 left-0 right-0 z-index-1008">
      <Bottom></Bottom>
    </footer>
  </div>

</template>
<style scoped></style>