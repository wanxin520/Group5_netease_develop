<script setup>
import { ref, watch, watchEffect } from "vue"
import { Icon } from "@iconify/vue";
const songMessage = ref()
const defaultIMG = ref("../../../../public/cd1.png")
const musicPlayingData = ref()
const props = defineProps({
  songMessage: {},
  musicPlayingData: {}
})
songMessage.value = props.songMessage
musicPlayingData.value = props.musicPlayingData

const emit = defineEmits(["closePlayBar", "nextSong", "backSong", "play", "pause"])
const closePoup = () => {
  emit("closePlayBar", false)
}

</script>

<template>
  <div class="h-[100vh] flex flex-col items-center justify-between relative"
    :style="{ backgroundImage: `url(${songMessage.songPicUrl ? songMessage.songPicUrl : defaultIMG})` }"
    style="background-repeat: no-repeat; background-size: cover;">
    <div class=" absolute w-[100%] h-[100vh] bg-[#585858da]"></div>
    <div class="w-[100%] h-[100%] flex flex-col justify-between items-center z-40">
      <div class="h-[12vh] w-[100%] flex justify-between items-center text-[#ffffff]">
        <Icon @click="closePoup" icon="iconamoon:arrow-down-2-light" width="1.6rem" height="1.6rem" class="ml-3" />
        <Icon icon="hugeicons:share-04" width="1.2rem" height="1.2rem" class="mr-3" />
      </div>
      <RotateCDIMG :playingStatus="musicPlayingData.playing == true" :songImg="songMessage.songPicUrl"> </RotateCDIMG>
      <div class="w-[100%] flex flex-col items-center text-[#ffffff]">
        <div class=" flex w-[85%] justify-between items-center">
          <div v-if="!songMessage.artistName & !songMessage.songPicUrl">
            暂无数据
          </div>
          <div v-else class="flex flex-col justify-center items-center ml-1">
            <div class="flex justify-start items-center">
              <div class="flex justify-center items-center font-bold">
                {{ songMessage.songName }}
              </div>
              <div v-if="songMessage.isFee !== 0"
                class="w-[1.5rem] h-[1rem] flex justify-center items-center text-[9px] rounded-[5px] text-[#ffffff] bg-[#ffffff46] ml-2">
                VIP
              </div>
            </div>
            <div class="flex justify-start items-center mt-2">
              <div class="flex justify-center items-center text-[12px] text-[#adadad]">
                {{ songMessage.artistName }}
              </div>
              <div
                class="w-[1.5rem] h-[1rem] flex justify-center items-center text-[9px] rounded-[5px] text-[#ffffff] bg-[#ffffff28] ml-2">
                关注
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center text-[#ffffff]">
            <Icon icon="icon-park-solid:like" width="1.6rem" height="1.6rem" class="mr-9" />
            <Icon icon="uil:comment-dots" width="1.6rem" height="1.6rem" class="mr-1" />
          </div>
        </div>
        <div class="w-[85%] m-auto mt-5 text-[#ffffff]">
          <van-slider v-model="musicPlayingData.progress" active-color="linear-gradient(to right, #a8e2f8, #c529ec)">
            <template #button>
              <div class="w-[0.5rem] h-[0.5rem] bg-[#ffffff] rounded-[50%]"></div>
            </template>
          </van-slider>
          <div class="flex w-[100%] justify-between items-center text-[9px] mt-2">
            <div class=" text-[#ffffff]">
              <TimesHandler :times="musicPlayingData.current"></TimesHandler>
            </div>
            <div class="text-[10px]">
              极高
            </div>
            <div class=" text-[#ffffff]">
              <TimesHandler :times="songMessage.songDuration"></TimesHandler>
            </div>
          </div>
          <div class="w-[85%] m-auto text-[#ffffff] ">
            <div class="h-[10vh] flex justify-around items-center">
              <div>
                <Icon icon="vaadin:random" width="1rem" height="1rem" />
              </div>
              <div @click="emit(`backSong`)" class="backicon">
                <Icon icon="entypo:controller-next" width="1.5rem" height="1.5rem" style="color: #ffffff" />
              </div>
              <div>
                <div v-if="!musicPlayingData.ready"
                  class="bg-[#888585] w-[3rem] h-[3rem] flex justify-center items-center rounded-[50%]">
                  <van-button loading loading-type="spinner" size="small" color="#888585" />
                </div>
                <div v-else-if="musicPlayingData.playing == false" @click="emit(`play`)">
                  <van-icon @click="musicPlayingData.playing = true" name="play-circle-o" color="#ffffff" size="3rem" />
                </div>
                <div v-else @click="emit(`pause`)">
                  <van-icon @click="musicPlayingData.playing = false" name="pause-circle-o" color="#ffffff"
                    size="3rem" />
                </div>
              </div>

              <div @click="emit(`nextSong`)">
                <Icon icon="entypo:controller-next" width="1.5em" height="1.5rem" style="color: #ffffff" />
              </div>
              <div>
                <Icon icon="iconamoon:playlist-fill" width="1.4rem" height="1.4rem" />
              </div>
            </div>
          </div>
          <div class="w-[100%] flex justify-evenly mb-6 mt-3 text-[#ffffff]">
            <Icon icon="fluent:phone-desktop-48-regular" width="1.5rem" height="1.5rem" />
            <Icon icon="material-symbols-light:download-for-offline-outline" width="1.6rem" height="1.6rem" />
            <Icon icon="proicons:more" width="1.6rem" height="1.6rem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.backicon {
  transform: rotate(180deg);
}
</style>
