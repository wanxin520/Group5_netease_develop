<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import MenuPopup from "./children/MenuPopup.vue"
import SearchPopup from "./children/SearchPopup.vue";
import { useRequest } from "vue-request";
import { cloudsearchDefault } from "@/api/searchIndex";

const showSearchPage = ref(false)
const showDefaltKeywords = ref()
const emit = defineEmits(["closeSearchPopup"])
const closeSearchPopup = () => {
  showSearchPage.value = false
}
const { data: defaultKeywords } = useRequest(() => cloudsearchDefault())
watch(defaultKeywords, () => {
  // console.log(defaultKeywords.value);
  showDefaltKeywords.value = defaultKeywords.value.data.showKeyword
})

</script>

<template>
  <van-sticky>
    <header class="w-[100vw] h-[10vh] bg-[#ffffff] flex ">
      <div class="w-[100vw] h-[3rem] flex m-auto justify-between" style="align-items: center">
        <MenuPopup></MenuPopup>
        <div @click="showSearchPage = true" class="w-[80%] flex justify-between items-center shadow rounded-[20px]"
          style=" border: red 10px">
          <Icon icon="ic:twotone-search" width="1.2rem" class="mx-2" style="color: gray" />
          <div class="h-[30px] text-[12px] flex justify-center items-center text-[#b3b1b1]">
            {{ showDefaltKeywords }}
          </div>
          <Icon icon="lucide:scan-line" width="1.2rem" class="mr-2" style="color: gray" />
        </div>
        <Icon icon="iconamoon:microphone-light" width="1.5rem" height="1.5rem" style="color: gray" />
      </div>
    </header>
  </van-sticky>
  <!-- 右右侧弹出搜索页面 -->
  <van-popup v-model:show="showSearchPage" position="right" :style="{ width: '100vw', height: '100%' }">
    <SearchPopup :defaultKeywords="showDefaltKeywords" @closeSearchPopup="closeSearchPopup">
    </SearchPopup>
  </van-popup>
</template>
<style scoped></style>
