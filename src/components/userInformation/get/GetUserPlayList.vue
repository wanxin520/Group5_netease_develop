<!-- 
获取用户歌单
说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单

必选参数 : uid : 用户 id

可选参数 :

limit : 返回数量 , 默认为 30

offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

接口地址 : /user/playlist

调用例子 : /user/playlist?uid=32953014 
-->
<script setup>
import { ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import { useRequest } from "vue-request";
import { getUserPlayList } from "@/api/userIndex";
import { useRouter } from "vue-router";

const props = defineProps({
    data: {
        type: Object
    }
})
// console.log(props.data);
const router = useRouter()
const { data: songList, loading } = useRequest(() => getUserPlayList({ "timestamp": Date.now(), "uid": props.data.account.id }))

watch(songList, () => {
    // console.log(songList.value.playlist);
})

const getPlayListId = (playListId) => {
    console.log(playListId);
    let query = { id: playListId }
    router.push({ name: "listdetail", query })
}

</script>

<template>
    <div v-if="!loading" class="mt-5 w-[100%]">
        <div v-for="(item, index) in songList.playlist" class="w-[100%]">
            <div @click="getPlayListId(item.id)" class="flex justify-center items-center p-1">
                <div>
                    <img class="w-[3.5rem] rounded-[8px]" :src="item.coverImgUrl" alt="">
                </div>
                <div class="w-[80%]">
                    <van-cell center :title="item.name" :label="`${item.trackCount}首 · ${item.playCount}次播放`">
                        <template #right-icon>
                            <Icon icon="mingcute:more-2-line" width="1.5rem" style="color: #adadad" />
                        </template>
                    </van-cell>
                </div>
            </div>
        </div>
    </div>


</template>
<style scoped></style>
