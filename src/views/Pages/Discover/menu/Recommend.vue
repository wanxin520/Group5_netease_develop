<script setup>
  import { ref, watch} from "vue"
import { getRecommendList,getRecommendSongs} from "@/api";
import { useRequest } from "vue-request";

const ListData = ref()
const PageData = ref()

const {data:recommendListData} =useRequest(getRecommendSongs)
const {data:recommendPageData,loading} =useRequest(getRecommendList)

watch(recommendListData,() =>{
console.log(recommendListData.value.data.dailySongs);
ListData.value = recommendListData.value.data.dailySongs

})
watch(recommendPageData,()=>{
    PageData.value = recommendPageData.value.recommend
    console.log(recommendPageData.value.recommend);

})
const getuserId= (userId) => {
  console.log(userId);
};
const getavatarImgId = (avatarImgId) => {
  console.log(avatarImgId);
};
const getBackgroundId = (backgroundImgId) => {
  console.log(backgroundImgId);
};
const getListDataId = (ListDataId) => {
    console.log(ListDataId);
    
}
/* const recommendData ={
  name:recommendPageData.value.recommend[0].name,
  picUrl:recommendPageData.value.recommend[0].picUrl,
  playcount:recommendPageData.value.recommend[0].playcount,  
  userId:recommendPageData.value.recommend[0].creator.userId,
  avatarUrl:recommendPageData.value.recommend[0].creator.avatarUrl,
  backgroundUrl:recommendPageData.value.recommend[0].creator.backgroundUrl,
  backgroundImgId:recommendPageData.value.recommend[0].creator.backgroundImgId,
  avatarImgIdStr:recommendPageData.value.recommend[0].creator.avatarImgIdStr,
  avatarImgId:recommendPageData.value.recommend[0].creator.avatarImgId


  
} */
</script>

<template>
   <div class="flex m-auto p-2 justify-between items-center w-[100vw] h-[6vh]">
        <div class="flex justify-center items-center">
            <Icon icon="weui:arrow-filled" width="1.2rem" height="1.2rem" style="color: #666666" />
        </div>
        <Icon @click="clickMore" icon="material-symbols:more-vert" class="text-[1.2rem] mr-1 text-[#707070]" />
    </div>
    <div>
     <div v-if="!loading">
        <van-swipe :stop-propagation="false" :loop="false" :show-indicators="false">
            <van-swipe-item v-for="(item) in PageData" :key="item">
                <div class="flex flex-col items-center">
                   <span><h1>{{ item.copywriter }}</h1></span>
                            <div class="flex flex-col items-center">
                                <div class=" flex justify-between w-[100vw]">
                                    <img class="rounded-[20px]  w-[30vw] h-[30vw]"
                                        :src="item.picUrl" alt=""  @click="getuserId(item.userId)"/>
                                        <img class="rounded-[20px]  w-[30vw] h-[30vw]"
                                        :src="item.creator.avatarUrl" alt=""  @click="getavatarImgId(item.creator.avatarImgId)"/>
                                        <img class="rounded-[20px]  w-[30vw] h-[30vw]"
                                        :src="item.creator.backgroundUrl" alt="" @click="getBackgroundId(item.creator.backgroundImgId)"/>
                                </div>
                                
                                <div class="w-[100%] my-3 flex justify-around items-center text-[#4d4c4c] text-[13px]">
                                   <p class=" w-[30vw] text-center">{{ item.name}}</p> 
                                   <p class=" w-[30vw] text-center">{{ item.creator.nickname}}</p> 
                                  <p class=" w-[30vw] text-center">{{ item.creator.signature}}</p>  
                                </div>
                            </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
    
    </div> 
    <div v-for="(item, index) in ListData" :key="item.id" class="flex w-[100%] h-[10vh] justify-between bg-[white]"
        style="background-color: rgba(255, 255, 255,0.98);" @click="getListDataId(item.id)">
        <div @click="getSongId(item.id)" class="flex justify-between items-center">
            <div class="w-[3.5rem] flex justify-center items-center text-[14px] text-[#999999]">{{ index + 1 }}</div>
          <div style="width: 40px;height: 40px; ">
                <img :src="item.al.picUrl" alt="" style="border-radius: 10px;" >
            </div>  
            <div class="flex flex-col overflow-hidden ml-[5px]">
                <!-- 歌曲名称 -->
                 
                <div
                    class="w-[12rem] text-[10px] font-sans overflow-hidden text-ellipsis whitespace-nowrap text-[#000000]">
                    {{ item.name }}
                </div>
                <div class="flex h-[2vh] my-2"> 
                    <!-- 是否是超清母带音质歌曲 -->
                    <!-- <div v-if="item.hr"
                        class="w-[2rem] h-[0.7rem] flex justify-center items-center text-[6px] rounded-[5px] text-[#ffad50] mr-1"
                        style="border: 1px solid #ffad50;">超清母带</div> -->
                    <!-- 是否是SQ歌曲 -->
                    <div v-if="item.sq"
                        class="w-[1rem] h-[0.7rem] flex justify-center items-center text-[6px] rounded-[5px] text-[#ff4b45] mr-1"
                        style="border: 1px solid #ff4b45;">SQ</div>
                    <!-- 是否是VIP歌曲 -->
                    <div class="w-[1rem] h-[0.7rem] flex justify-center items-center text-[6px] rounded-[5px] text-[#ff4943] mr-1"
                        style="border: 1px solid #ff4943;" v-if="(item.fee == 1)">VIP</div>
                    <!-- 专辑名称 --><!-- 歌手名称 -->
                    <div class="w-[12rem] text-[8px]  text-[#828793]  overflow-hidden text-ellipsis whitespace-nowrap">
                        <span>{{ item.ar[0].name }}</span> - <span>{{ item.al.name }}</span>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-center items-center text-[#8d8d8d] text-[18px]">
            <Icon @click="getVedioId(item.videoInfo.video.vid)" v-if="(item.mv != 0)"
                icon="fluent:video-clip-16-regular" class="mr-5" />
            <Icon icon="material-symbols:more-vert" class=" mr-3" />
        </div>
    </div>
</template>
<style scoped>


</style>