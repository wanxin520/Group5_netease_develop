<!-- 手机密码和验证码登录页面 -->

<script setup>
import { loginByPhone } from "@/api";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";

const submit = ref (false)
const main = ref (true)
const phone = ref("")
const password = ref("")
function click(){
  if(submit.value === false){
    submit.value = true
    main.value = false
  }
}
function onSubmit(){
  if(phone.value.length<11){
    alert("请输入正确的手机号")
  };
  if(password.value === ""){
    alert("密码不能为空")
  }else{
      console.log(phone,password);
      const { data: phonePageData } = useRequest(loginByPhone);
      console.log(phonePageData);
  }


}


</script>

<template>
  <div class="bg-red-600 w-[100vw]" v-if="main">
    <div>
      <p class="text-white ml-[5vw] text-[5vw]">9.17</p>
    </div>
    <Icon
      icon="ri:netease-cloud-music-fill"
      style="color: white"
      class="text-[20vw] m-auto mt-[50vw]"
    />
    <div class="mt-[60vw] text-center w-50vw h-30vw">
      <button class="button text-red-600 bg-white" @click="click">手机号登录</button><br />
      <button class="button text-white bg-red-600">立即体验</button>
    </div>
    <div class="flex justify-around w-[80vw] m-auto mt-[5vw]">
      <div class="icon">
        <Icon
          icon="mage:we-chat"
          style="color: white"
          class="text-[10vw] m-auto mt-[3vw]"
        />
      </div>
      <div class="icon">
        <Icon
          icon="mingcute:qq-fill"
          style="color: white"
          class="text-[10vw] m-auto mt-[3vw]"
        />
      </div>
      <div class="icon">
        <Icon
          icon="ri:weibo-fill"
          style="color: white"
          class="text-[10vw] m-auto mt-[3vw]"
        />
      </div>
      <div class="icon">
        <Icon
          icon="ri:netease-cloud-music-fill"
          style="color: white"
          class="text-[10vw] m-auto mt-[3vw]"
        />
      </div>
    </div>
    <br />
    <div class="flex text-center text-[3vw] ml-[15vw] w-[80vw]">
      <van-radio-group v-model="checked" shape="square">
        <van-radio class="w-[5vw] h-[5vw] mt-[-1px]"></van-radio>
      </van-radio-group>
      <p>同意</p>
      <a href="" class="text-white">《用户协议》</a>
      <a href="" class="text-white">《隐私政策》</a>
      <a href="" class="text-white">《儿童隐私政策》</a>
    </div>
  </div>

  <div class="bg-red-600 w-[100vw] h-[100vh]"  v-if="submit">
    <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="phone"
      name="手机号码"
      label="手机号码"
      placeholder="请输入手机号码"
      :rules="[{ required: true, message: '请填写手机号码' }]"
      
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

</div>
</template>
<style scoped>
.button {
  width: 80vw;
  height: 15vw;
  border: 1px white solid;
  border-radius: 20vw;
  margin-top: 5vw;
  font-size: 25px;
  font-weight: 600;
}
.icon {
  width: 15vw;
  height: 15vw;
  border-radius: 15vw;
  border: 1px solid white;
  text-align: center;
}
</style>
