<!-- 手机密码和验证码登录页面 -->

<script setup>
import { loginByPhone } from "@/api";
import { ref } from "vue"
import {Icon} from "@iconify/vue";
/* const pageData = ref([]);
  loginByPhone()
  .then((res) => {
    console.log(res);
}) */

</script>

<template>
  <div class=" bg-red-600 w-[100vw] h-[100vh]">
    <div>
      <p class=" text-white ml-[5vw]">9.17</p>
    </div>
    <Icon icon="ri:netease-cloud-music-fill"  style="color: white" class=" text-[20vw] m-auto mt-[50vw]" />
    <div class=" mt-[60vw]  text-center w-50vw h-30vw">
     <button class="button text-red-600 bg-white">手机号登录</button><br>
    <button class="button text-white bg-red-600">立即体验</button> 
    </div>
    <div class=" flex justify-around w-[80vw] m-auto mt-[5vw]">
     
      <div class=" icon"> <Icon icon="mage:we-chat"  style="color: white"  class=" text-[10vw] m-auto mt-[3vw]"/></div>
      <div class=" icon"> <Icon icon="mage:we-chat"  style="color: white"  class=" text-[10vw] m-auto mt-[3vw]"/></div>
      <div class=" icon"> <Icon icon="mage:we-chat"  style="color: white"  class=" text-[10vw] m-auto mt-[3vw]"/></div>
      <div class=" icon"> <Icon icon="mage:we-chat"  style="color: white"  class=" text-[10vw] m-auto mt-[3vw] "/></div>
    </div><br>
    <div class="flex text-center text-[3vw] m-auto w-[80vw]">
         <input type="radio" class=" w-[5vw] h-[5vw] input"> 
         <p>同意</p>  
         <a href="" class=" text-white">《用户协议》</a>
         <a href="" class=" text-white">《隐私政策》</a>
         <a href="" class=" text-white">《儿童隐私政策》</a>
    </div>

  </div>

</template>
<style scoped>
.input{
  border-radius: 0px;
}
.button{
width: 80vw;
height: 15vw;
border: 1px white solid;
border-radius: 20vw;
margin-top: 5vw;
font-size: 25px;
font-weight: 600;
}
.icon{
width:15vw ;
height: 15vw;
border-radius: 15vw;
border: 1px solid white;
text-align: center;
}
</style>
