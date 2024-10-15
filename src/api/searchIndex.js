import to from "await-to-js";
import request from "./request";
import { useUserStore } from "@/store";
const userStore = useUserStore()
const params = new URLSearchParams()
params.append("cookie", userStore.userInfo.cookie)
params.append("timestamp", Date.now())

// 搜索
/* 
说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
接口地址 : /search 或者 /cloudsearch(更全)
调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
*/
export const cloudSearch = async (data) => {
    const [error, res] = await to(request.post(`/cloudsearch?keywords=${data.keywords}&type=1`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
}

// 默认搜索关键词
/* 
说明 : 调用此接口 , 可获取默认搜索关键词
接口地址 : /search/default
*/
export const cloudsearchDefault = async () => {
    const [error, res] = await to(request.get("/search/default"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 热搜列表(简略)
/* 
说明 : 调用此接口,可获取热门搜索列表
接口地址 : /search/hot
调用例子 : /search/hot
*/
export const getSearchHot = async (data) => {
    const [error, res] = await to(request.get("/search/hot"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 热搜列表(详细)
/* 
说明 : 调用此接口,可获取热门搜索列表
接口地址 : /search/hot/detail
调用例子 : /search/hot/detail
*/
export const getSearchHotDetail = async (data) => {
    const [error, res] = await to(request.get("/search/hot/detail"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 搜索建议
/* 
说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
必选参数 : keywords : 关键词
可选参数 : type : 如果传 'mobile' 则返回移动端数据
接口地址 : /search/suggest
调用例子 : /search/suggest?keywords=海阔天空 /search/suggest?keywords=海阔天空&type=mobile
*/
export const searchSuggest = async (data) => {
    const [error, res] = await to(request.post("/search/suggest"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 搜索多重匹配
/* 
说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
必选参数 : keywords : 关键词
接口地址 : /search/multimatch
调用例子 : /search/multimatch?keywords=海阔天空
*/
export const searchMultimatch = async (data) => {
    const [error, res] = await to(request.post("/search/multimatch"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 歌手排行  /toplist/artist
export const getArtistTopList = async () => {
    const [error, res] = await to(request.get("/toplist/artist"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// mv排行  /top/mv
export const getMVTopList = async () => {
    const [error, res] = await to(request.get("/top/mv"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
// 电台排行 /dj/program/toplist
export const getDJProgramTopList = async () => {
    const [error, res] = await to(request.get("/dj/program/toplist"));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
// 热门歌手 /top/artists
// 曲风列表  /style/list

