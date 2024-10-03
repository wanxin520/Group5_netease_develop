<script setup>
import { ref, watch } from "vue"
import { getPlaylistDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const isShow = ref(false)
const Data_SongDetail = ref("")

const { data } = useRequest(() => getPlaylistAllSongs({ id: "24381616" }))

watch(data, () => {
    console.log(data.value);
})

watch(data, () => {
    console.log(data.value);
})

</script>

<template>
    <div>
        <div v-if="isShow" class="w-[99vw] m-auto h-[50vh] bg-gradient-to-b"
            :style="{ backgroundImage: `url(${Data_ListDetail.creator.backgroundUrl})` }"
            style="background-repeat: no-repeat; background-size: cover;">
            <div>
                <!-- top -->
                <div class="w-[100%] h-[10vh] flex justify-between items-center ">
                    <div @click="toBack" class="w-[50%] text-[2rem] text-[white]">
                        <Icon icon="iconamoon:arrow-left-2-light" width="2rem" style="color: #ffffff" />
                    </div>
                    <div class="w-[55%] flex justify-between mr-3">
                        <div class="flex justify-center item-center text-[white]"><span>歌单</span></div>
                        <div class="flex">
                            <Icon icon="ic:twotone-search" width="1.8rem" class=" mx-2" style="color: white" />
                            <Icon icon="material-symbols:more-vert" width="1.8rem" class="text-[1.3rem] mr-3"
                                style="color: white" />
                        </div>
                    </div>
                </div>
                <!-- banner -->
                <div class=" mb-5">
                    <div class="flex w-[98vw] h-[25vh] items-center justify-start">
                        <div class="mx-1 flex justify-center items-center h-[100%] rounded-[30px]">
                            <img class="w-[12rem] rounded-[1rem]" :src="Data_ListDetail.coverImgUrl" alt="">
                        </div>
                        <div class="flex h-[80%] flex-col mx-3 justify-between items-center">
                            <div class="text-[white] text-[1.2rem]">
                                <span> {{ Data_ListDetail.name }} </span>
                            </div>
                            <div class="w-[100%] flex justify-start items-start">
                                <img class="flex justify-center items-center w-[2rem] rounded-[50%]"
                                    :src="Data_ListDetail.creator.avatarUrl" alt="">
                                <!-- <img class="flex justify-center items-center w-[2rem] rounded-[50%]" :src="Data_ListDetail.creator.avatarDetail.identityIconUrl" alt=""> -->
                                <div class="h-[100%] flex justify-center items-center mx-3 "
                                    style="color: rgba(255, 255, 255,0.6);">{{
                                        Data_ListDetail.creator.nickname }}</div>
                                <div class=" flex justify-center items-center w-[4rem] h-[100%] rounded-[1rem] text-[white]"
                                    style="background-color: rgba(255, 255, 255,0.2);">
                                    + 关注
                                </div>
                            </div>
                            <div class="flex w-[100%] h-[3vh] justify-start">
                                <div class=" flex justify-center items-center w-[3rem] h-[100%] rounded-[5px] text-[white] text-[0.6rem]"
                                    style="background-color: rgba(255, 255, 255,0.2);">{{ Data_ListDetail.tags[0] }} >
                                </div>
                                <div class=" flex mx-[1px] justify-center items-center w-[3rem] h-[100%] rounded-[5px] text-[white] text-[0.6rem]"
                                    style="background-color: rgba(255, 255, 255,0.2);">{{ Data_ListDetail.tags[1] }} >
                                </div>
                                <div class=" flex mx-[1px] justify-center items-center w-[3rem] h-[100%] rounded-[5px] text-[white] text-[0.6rem]"
                                    style="background-color: rgba(255, 255, 255,0.2);">{{ Data_ListDetail.tags[2] }} >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-[97%] m-auto h-[6vh] overflow-hidden text-ellipsis whitespace-nowrap text-[0.8rem]"
                        style="color: rgba(255, 255, 255,0.5);">
                        {{ Data_ListDetail.description }} >
                    </div>
                    <div class="flex justify-around items-center">
                        <div class="flex justify-center items-center w-[6rem] h-[6vh] rounded-[1rem]"
                            style="background-color: rgba(255, 255, 255,0.2);">
                            <Icon icon="mingcute:share-forward-fill" width="1.2rem" height="1.2rem"
                                style="color: #ffffff" />
                            <span class="text-[white] mx-1">7</span>
                        </div>
                        <div class="flex justify-center items-center w-[6rem] h-[6vh] rounded-[1rem]"
                            style="background-color: rgba(255, 255, 255,0.2);">
                            <Icon icon="eva:message-circle-fill" width="1.2rem" height="1.2rem"
                                style="color: #ffffff" />
                            <span class="text-[white] mx-1">1</span>
                        </div>
                        <div class="flex justify-center items-center w-[6rem] h-[6vh] rounded-[1rem]"
                            style="background-color: red;">
                            <Icon icon="mingcute:new-folder-fill" width="1.2rem" height="1.2rem"
                                style="color: #ffffff" />
                            <span class="text-[white] mx-1">2813</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- bottom -->
    <div v-if="isShow">
        <div class="w-[100%] h-[6vh] flex justify-between items-center"
            style="border-top-left-radius: 10px; border-top-right-radius: 10px;background-color: rgba(255, 255, 255,0.9);">
            <div class=" flex justify-around items-center">
                <Icon icon="ph:gift" width="1.2rem" style="color: #ff0000" />
                <div class=" text-[0.8rem] mx-3">vip5.5折！抢独家护福利包</div>
            </div>
            <div class="text-[0.8rem]">
                立即抢购 >
            </div>
        </div>

        <div class="w-[100%] h-[8vh] flex justify-between items-center "
            style="background-color: rgba(255, 255, 255,0.98);">
            <div class=" h-[5vh] flex justify-between items-center">
                <Icon class="mx-3" icon="icon-park-solid:play" width="1.2rem" height="1.2rem" style="color: #ff0000" />
                <div class="mx-3">播放全部</div>
                <div class="mx-1">({{ Data_SongDetail.length }})</div>
            </div>
            <div class="flex w-[13vw] mr-1 items-center justify-center ">
                <Icon class="mr-3" icon="hugeicons:download-01" width="1.8rem" />
                <Icon icon="solar:list-check-minimalistic-bold" width="1.8rem" />
            </div>
        </div>

        <div v-for="(item, index) in Data_SongDetail" :key="item.al.id"
            class="flex w-[100%] h-[10vh] justify-between bg-[white]"
            style="background-color: rgba(255, 255, 255,0.98);">
            <div class="flex justify-between items-center">
                <div class="w-[3.5rem] flex justify-center items-center  text-[#999999]">{{ index + 1 }}</div>

                <div class="flex flex-col overflow-hidden">
                    <!-- 歌曲名称 -->
                    <div class="w-[12rem] text-[1rem]  overflow-hidden text-ellipsis whitespace-nowrap text-[#2a3146]">
                        {{ item.name }}
                    </div>

                    <div class="flex h-[2vh] my-2">
                        <!-- 是否是付费歌曲 -->
                        <div class="w-[1.3rem] h-[0.9rem] flex justify-center items-center text-[0.5rem] rounded-[0.2rem] text-[#ee7975]"
                            style="border: 1px,solid #f8d7d7;" v-if="(item.fee == 1 || item.fee == 8)">VIP</div>

                        <!-- 是否是SQ歌曲 -->
                        <div class="w-[1.3rem] h-[0.9rem] flex justify-center items-center text-[0.5rem] rounded-[0.2rem] mx-1 text-[#ee7975]"
                            style="border: 1px,solid #f8d7d7;" v-if="(item.sq != 0)">SQ</div>

                        <!-- 专辑名称 --><!-- 歌手名称 -->
                        <div
                            class="w-[12rem] text-[0.7rem]  text-[#828793] mx-1  overflow-hidden text-ellipsis whitespace-nowrap">
                            <span>{{ item.ar[0].name }}</span> - <span>{{ item.al.name }}</span>
                        </div>

                    </div>

                </div>
            </div>
            <div class="flex justify-center items-center">
                <Icon v-if="(item.mv != 0)" icon="fluent:video-clip-16-regular" width="1.2rem" height="1.2rem"
                    style="color: #c9c9c9" />
                <Icon icon="material-symbols:more-vert" class="text-[1.3rem] mr-3" />
                <!-- <img :src="item.al.picUrl" alt=""> -->
            </div>
        </div>
    </div>
</template>
<style scoped></style>