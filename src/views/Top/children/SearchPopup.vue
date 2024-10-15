<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { cloudSearch } from "@/api/searchIndex";
import { useSourseStore } from "@/store";
import BottomPlayBar from "@/components/play/music/BottomPlayBar.vue";
import HotSearchToplist from "../searchtoplist/HotSearchToplist.vue";
import ArtistsTopList from "../searchtoplist/ArtistsTopList.vue";
import MVTopList from "../searchtoplist/MVTopList.vue";
import DJProgramTopList from "../searchtoplist/DJProgramTopList.vue";
import { useRouter } from "vue-router";

const props = defineProps({
    defaultKeywords: {}
})
const router = useRouter()
const emit = defineEmits(["closeSearchPopup"])
const sourseStore = useSourseStore()
const searchKeywords = ref("")
const showResultDetail = ref(false)
const { run, data: searchResult, loading } = useRequest(() => cloudSearch({ keywords: searchKeywords.value }), { manual: true })

watch(searchKeywords, () => {
    searchKeywords.value.trim().length == 0 ? [] : run()
})

watch(searchResult, () => {
    // console.log(searchResult.value);
})

// 
const toResultPage = () => {
    showResultDetail.value = true
}

const getSourseId = (sourseId) => {
    // console.log(sourseId);
    sourseStore.setMusicSourseIds(sourseId)
}

</script>

<template>
    <div class="bg-[#f1f1f1]">
        <van-sticky>
            <div class=" h-[3.5rem] bg-[white] flex justify-between items-center">
                <Icon @click="emit('closeSearchPopup')" icon="ri:arrow-left-s-line" width="1.3rem" height="1.3rem"
                    class="text-[#646464] ml-2" />
                <div class="w-[80%]">
                    <van-search v-model="searchKeywords" shape="round" autofocus clearable
                        :placeholder="props.defaultKeywords" />
                </div>
                <div @click="toResultPage" class="mr-3 text-[13px] text-[#646464]">搜索</div>
            </div>
        </van-sticky>
        <div class="mt-3">
            <div v-if="searchKeywords.trim().length !== 0">
                <div v-if="!showResultDetail">
                    <van-cell @click="toResultPage" v-if="!loading"
                        v-for="(item, index) in searchResult.result.songs.slice(0, 13)">
                        <!-- 使用 title 插槽来自定义标题 -->
                        <template #title>
                            <van-icon name="search" class="search-icon" />
                            <span class="custom-title ml-3">{{ item.name }}</span>
                        </template>
                    </van-cell>
                </div>
                <div v-else>
                    <div v-for="(item, index) in searchResult.result.songs" @click="getSourseId(item.id)"
                        :key="item.al.id" class="flex w-[100%] h-[10vh] justify-between bg-[white]"
                        style="background-color: rgba(255, 255, 255,0.98);">
                        <div class="flex justify-between items-center">
                            <div class="w-[3.5rem] flex justify-center items-center  text-[#999999]">
                                <img class="w-[2.5rem] h-[2.5rem] rounded-[0.5rem]" :src="item.al.picUrl" alt="">
                            </div>
                            <div class="flex flex-col overflow-hidden">
                                <!-- 歌曲名称 -->
                                <div
                                    class="w-[12rem] text-[0.8rem]  overflow-hidden text-ellipsis whitespace-nowrap text-[#2a3146]">
                                    {{ item.name }}
                                </div>

                                <div class="flex h-[2vh] my-2">
                                    <!-- 是否是付费歌曲 -->
                                    <div class="w-[1.3rem] h-[0.9rem] flex justify-center items-center text-[0.5rem] rounded-[0.2rem] text-[#ee7975]"
                                        style="border: 1px,solid #f8d7d7;" v-if="(item.fee == 1 || item.fee == 8)">VIP
                                    </div>

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
                            <Icon v-if="(item.mv != 0)" icon="fluent:video-clip-16-regular" width="1.2rem"
                                height="1.2rem" style="color: #c9c9c9" />
                            <Icon icon="material-symbols:more-vert" class="text-[1.3rem] mr-3" />
                            <!-- <img :src="item.al.picUrl" alt=""> -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="mt-3">
                <van-swipe :loop="false" :width="300" :show-indicators="false">
                    <van-swipe-item>
                        <HotSearchToplist></HotSearchToplist>
                    </van-swipe-item>
                    <van-swipe-item class="ml-5">
                        <ArtistsTopList></ArtistsTopList>
                    </van-swipe-item>
                    <van-swipe-item class="ml-5">
                        <MVTopList></MVTopList>
                    </van-swipe-item>
                    <van-swipe-item class="ml-5">
                        <DJProgramTopList></DJProgramTopList>
                    </van-swipe-item>
                    <van-swipe-item class="ml-5">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>
<style scoped></style>