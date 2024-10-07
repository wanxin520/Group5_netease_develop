import { watch } from "vue"
import { getSongsUrl, getSongsDetail } from "@/api/songIndex";
import { useRequest } from "vue-request";
import { useUserStore, usePlayStore } from "@/store";

const userStore = useUserStore()
const playStore = usePlayStore()

export const loadDate = (ids) => {
    console.log("请求函数执行了");
    const { data: songsUrl} = useRequest(() => getSongsUrl({ "id": [ids], "cookie": userStore.userInfo.cookie }))
    const { data: songsDetail} = useRequest(() => getSongsDetail({ "id": [ids], "cookie": userStore.userInfo.cookie }))
    watch(songsUrl, () => {
        playStore.setSongsUrl(songsUrl.value.data)
    })
    watch(songsDetail, () => {
        playStore.setSongsDetail(songsDetail.value)
        console.log(songsDetail.value);
    })
}
