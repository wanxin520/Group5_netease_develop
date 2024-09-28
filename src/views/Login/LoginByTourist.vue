<!-- 游客登录页面 -->

<script setup>
import { ref } from "vue";
import { LoginByTourist } from "@/api";
import CustomButton from "@/components/CustomButton.vue";
import localforage from "localforage";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { ElLoading } from "element-plus";

const route = useRoute();
const router = useRouter();

const login = () => {
  const loadingInstance = ElLoading.service(true);
  LoginByTourist().then((res) => {
    console.log(res);
    if (res.data.code === "200") {
      // 创建本地存储
      localforage
        .setItem("userInfo", res.data)
        .then((success) => {
          console.log(success);
          loadingInstance.close();
          console.log(route.query);
          route.query.originPath.indexOf("/login") !== -1
            ? router.replace({ name: "homepage" })
            : router.replace({ path: route.query.originPath });
        })
        .catch((err) => {
          console.log(err);
          loadingInstance.close();
        });
    }
  });
  window.location.href = "/homepage";
};
const toBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-between bg-[#fcfcfc]">
    <div class="w-[100%] h-[10vh] flex justify-between">
      <div
        @click="toBack"
        class="text-[2rem] flex justify-center items-center mx-2"
      >
        <Icon
          icon="iconamoon:arrow-left-2-light"
          width="2rem"
          style="color: gray"
        />
      </div>
    </div>
    <div class="flex w-[100%] h-[10vh] justify-center items-center">
      <img class="w-[12rem]" src="/public/logo.fill.svg" alt="" />
    </div>
    <div class="flex justify-center items-center">
      <CustomButton @click="login" class="w-[20rem] h-[8vh] bg-[#ff4141]"
        >游客登录</CustomButton
      >
    </div>
    <div
      class="w-[100%] h-[30vh]"
      style="
        background-image: url(/public/loginbg.png);
        background-repeat: no-repeat;
        background-size: cover;
      "
    ></div>
  </div>
</template>
<style scoped></style>
