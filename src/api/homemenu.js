/**
 * @注意 :
 *  在开发过程中，此文件的 模块导入 以及 方法命名在 非必要情况下不要改动
 *
 *  如若需要改动请在微信群里进行说明
 *
 */
import to from "await-to-js";
import request from "./request";
import { useUserStore } from "@/store";
const userStore = useUserStore()


// 获取每日推荐歌单
/* 
说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
接口地址 : /recommend/resource
调用例子 : /recommend/resource
*/
export const getRecommendList = async (data) => {
    const [error, res] = await to(request.post(`/recommend/resource?&cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 获取每日推荐歌曲
/* 
说明: 调用此接口, 可获得每日推荐歌曲(需要登录)
接口地址: /recommend/songs
调用例子: /recommend/songs
*/
export const getRecommendSongs = async () => {
    const [error, res] = await to(request.post(`/recommend/songs?cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
推荐 mv
说明 : 调用此接口 , 可获取推荐 mv
接口地址 : /personalized/mv
调用例子 : /personalized/mv
*/
export const getPersonalizedMV = async () => {
    const [error, res] = await to(request.post(`/personalized/mv?cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
推荐歌单
说明 : 调用此接口 , 可获取推荐歌单
可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
接口地址 : /personalized
调用例子 : /personalized?limit=1
*/
export const getPersonalizedPlayList = async () => {
    const [error, res] = await to(request.post(`/personalized?cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
推荐新音乐
说明 : 调用此接口 , 可获取推荐新音乐
可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
接口地址 : /personalized/newsong
调用例子 : /personalized/newsong
*/
export const getPersonalizedNewSongs = async () => {
    const [error, res] = await to(request.post(`/personalized/newsong?cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
推荐电台
说明 : 调用此接口 , 可获取推荐电台
接口地址 : /personalized/djprogram
调用例子 : /personalized/djprogram
*/
export const getPersonalizedDjProgram = async () => {
    const [error, res] = await to(request.post(`/personalized/djprogram?cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
推荐节目
说明 : 调用此接口 , 可获取推荐电台
接口地址 : /program/recommend
可选参数 :
limit: 取出数量 , 默认为 10
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*10, 其中 10 为 limit 的值 , 默认 为 0
调用例子 : /program/recommend?limit=5 
*/
export const getPersonalizedProgram = async (data) => {
    const [error, res] = await to(request.post(`/personalized/program?cookie=${userStore.userInfo.cookie}`), data);
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 歌单(网友精选碟)
/* 
说明: 调用此接口, 可获取网友精选碟歌单
可选参数: order: 可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'
cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从歌单分类接口获取(/playlist/catlist)
limit: 取出歌单数量, 默认为 50
offset: 偏移数量, 用于分页, 如 : (评论页数 - 1) * 50, 其中 50 为 limit 的值
接口地址: /top/playlist
调用例子: /top/playlist ? limit = 10 & order=new
*/
export const getTopPlayList = async (data) => {
    const [error, res] = await to(request.post("/top/playlist"), data);
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 精品歌单标签列表
/* 
说明 : 调用此接口 , 可获取精品歌单标签列表
接口地址 : /playlist/highquality/tags
调用例子 : /playlist/highquality/tags 
*/
export const getHighqualityTag = async (data) => {
    const [error, res] = await to(
        request.post("/playlist/highquality/tags"),
        data
    );
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 获取精品歌单
/* 
说明 : 调用此接口 , 可获取精品歌单
可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
limit: 取出歌单数量 , 默认为 50
before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
接口地址 : /top/playlist/highquality
调用例子 : /top/playlist/highquality?before=1503639064232&limit=3
*/
export const getHighqualityPlayList = async (data) => {
    const [error, res] = await to(
        request.post("/top/playlist/highquality"),
        data
    );
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

// 相关歌单推荐
/* 
说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 https://music.163.com/#/playlist?id=1)
必选参数 : id : 歌单 id
接口地址 : /related/playlist
调用例子 : /related/playlist?id=1
*/
export const getRelatedPlaylist = async (data) => {
    const [error, res] = await to(request.post("/related/playlist"), data);
    if (error) return console.log("请求出错:" + error);
    return res.data;
};



// 私人 FM
/* 
说明 : 私人 FM( 需要登录 )
接口地址 : /personal_fm
调用例子 : /personal_fm
*/
export const getPersonalFM = async (data) => {
    const [error, res] = await to(request.post("/personal_fm"), data);
    if (error) return console.log("请求出错:" + error);
    return res.data;
};





// 所有榜单
/*
说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
调用例子 : /toplist
*/
export const getRankList = async (data) => {
    const [error, res] = await to(request.post("/toplist"), data);
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
排行榜详情
说明: 请使用歌单详情接口,传入排行榜 id 获取排行榜详情数据(排行榜也是歌单的一种)
必选参数 : id : 歌单 id
可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
接口地址 : /playlist/detail
调用例子 : /playlist/detail?id=24381616
*/
export const getTopListDetail = async (data) => {
    const [error, res] = await to(request.post(`/playlist/detail?id=${data.id}&cookie=${userStore.userInfo.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};



// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// 接口地址 : /toplist/detail
// 调用例子 : /toplist/detail
export const getRankListDetail = async (data) => {
    const [error, res] = await to(request.post("/toplist/detail"), data);
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

