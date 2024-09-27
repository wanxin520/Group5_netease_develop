<script setup>
import { computed, defineProps } from "vue";
import Banner from "@/views/Home/children/Banner.vue";
import MenuPage from "@/views/Home/children/MenuPage.vue";


const blockTypeComponentMap = {
  HOMEPAGE_BANNER: Banner, // 轮播图
  HOMEPAGE_BLOCK_OLD_DRAGON_BALL: MenuPage, // 圆形图标
};
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
// console.log(props.data);

const propsData = computed(() => {
  switch (props.data.blockCode) {
    // 首页圆形图标菜单
    case "HOMEPAGE_BLOCK_OLD_DRAGON_BALL":
      return props.data.creatives[0].resources.map((item) => ({
        name: item.uiElement.mainTitle.title,
        iconUrl: item.uiElement.image.imageUrl,
      }));
    // 轮播图
    case "HOMEPAGE_BANNER":
      return props.data.extInfo.banners
    default:
      return null;
  }
  return [];
});
// console.log(props.data);
</script>

<template>
  <div>
    <component :is="blockTypeComponentMap[props.data.blockCode]" :data="propsData"></component>
  </div>
</template>
