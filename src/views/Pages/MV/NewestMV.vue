<script setup>
 import { ref , watch} from "vue";
import { getNewestMv } from "@/api/videoIndex";
import { useRequest } from "vue-request";
// import { watch } from "less";

const NewestMVData = ref("")
const NewestMVTilte = ref("")
const { data: NewestMv} = useRequest(getNewestMv);
watch(NewestMv,() => {
  console.log(NewestMv.value);
  NewestMVData.value = NewestMv.value.data
  NewestMVTilte.value= NewestMv.value.data[0].alias[0]}); 
const getuserId= (userId) => {
  console.log(userId);
};
</script>

<template>
    <div> <h1>最新mv</h1></div>
    <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
        <div class="flex justify-center items-center text-center">
            <h1 class=" text-center text-[8vw]">{{ NewestMVTilte }}</h1>
        </div>
        <Icon @click="clickMore" icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
    </div>
     <div v-if="!loading">
        <van-swipe :stop-propagation="false" :loop="false" :show-indicators="false" vertical="true" height="100vh" class="mt-[10vw]" touchable="true" > 
            <van-swipe-item v-for="(item) in NewestMVData" :key="item">
                <div class="flex flex-col items-center">
                            <div class="flex flex-col items-center">
                                <div class=" flex justify-between w-[100vw]">
                                    <img class="rounded-[20px]  w-[40vw] h-[25vw]"
                                        :src="item.cover" alt=""  @click="getuserId(item.id)" id=""/>
                                </div>
                                
                                <div class="w-[100%] my-3 flex justify-around items-center text-[#4d4c4c] text-[13px]">
                                   <p class=" w-[20vw] text-center">{{ item.name}}</p> 
                                   <p class=" w-[30vw] text-center mt-[-45vw] mr-[15vw] ">{{ item.artistName}}</p> 
                                </div>
                            </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<style scoped>

</style>
