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
// const params = new URLSearchParams()
// params.append("cookie", userStore.userInfo.cookie)
// params.append("timestamp", Date.now())
// 获取登录状态
/* 
说明 : 调用此接口,可获取登录状态
接口地址 : /login/status
*/
export const getLoginStatus = async (data) => {
    const [error, res] = await to(request.post(`/login/status?timestamp=${Date.now()}&cookie=${data.cookie}`));
    if (error) {
        if (error.data.data.code == 200) {
            return error.data.data
        } else {
            return console.log("请求出错！")
        }
    }
    return res.data;
};

/* 
获取账号信息
说明 : 登录后调用此接口 ,可获取用户账号信息
接口地址 : /user/account
调用例子 : /user/account
*/
export const getUserAccount = async (data) => {
    const [error, res] = await to(request.post(`/user/account?timestamp=${data.timestamp}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
/* 
获取用户详情
说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
必选参数 : uid : 用户 id
接口地址 : /user/detail
调用例子 : /user/detail?uid=32953014
*/
export const getUserDetail = async (data) => {
    const [error, res] = await to(request.post(`/user/detail?uid=${data.uid}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/*  
获取用户信息 , 歌单，收藏，mv, dj 数量
说明 : 登录后调用此接口 , 可以获取用户信息
接口地址 : /user/subcount
调用例子 : /user/subcount
*/
export const getUserSubcount = async (data) => {
    const [error, res] = await to(request.post(`user/subcount?timestamp=${data.timestamp}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/*  
获取用户等级信息
说明 : 登录后调用此接口 , 可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,对应 https://music.163.com/#/user/level
接口地址 : /user/level
调用例子 : /user/level
*/
export const getUserLevel = async (data) => {
    const [error, res] = await to(request.post(`/user/account?timestamp=${data.timestamp}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取用户歌单
说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
必选参数 : uid : 用户 id
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
接口地址 : /user/playlist
调用例子 : /user/playlist?uid=32953014
*/
export const getUserPlayList = async (data) => {
    const [error, res] = await to(request.post(`/user/playlist?uid=${data.uid}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取用户动态
说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户动态
必选参数 : uid : 用户 id
可选参数 : limit : 返回数量 , 默认为 30
lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
接口地址 : /user/event
调用例子 : /user/event?uid=32953014 /user/event?uid=32953014&limit=1&lasttime=1558011138743
返回结果的type参数对应:
18 分享单曲
19 分享专辑
17、28 分享电台节目
22 转发
39 发布视频
35、13 分享歌单
24 分享专栏文章
41、21 分享视频
*/
export const getUserEvent = async (data) => {
    const [error, res] = await to(request.post(`/user/event?uid=${data.uid}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取用户关注列表
说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户关注列表
必选参数 : uid : 用户 id
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
接口地址 : /user/follows
调用例子 : /user/follows?uid=32953014
*/
export const getUserFollowsList = async (data) => {
    const [error, res] = await to(request.post(`/user/follows?uid=${data.uid}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取用户粉丝列表
说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户粉丝列表
必选参数 : uid : 用户 id
可选参数 : limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
接口地址 : /user/followeds
调用例子 : /user/followeds?uid=32953014 /user/followeds?uid=416608258&limit=1 /user/followeds?uid=416608258&limit=1&offset=1
*/
export const getUserFollowedsList = async (data) => {
    const [error, res] = await to(request.post(`/user/followeds?uid=${data.uid}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};



/* 
私信和通知接口
说明 : 登录后调用此接口,可获取私信和通知数量信息
接口地址 : /pl/count
调用例子 : /pl/count
*/
export const getUserPLCount = async (data) => {
    const [error, res] = await to(request.post(`/pl/count?timestamp=${data.timestamp}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取动态消息
说明 : 调用此接口 , 可获取各种动态 , 对应网页版网易云，朋友界面里的各种动态消息 ，如分享的视频，音乐，照片等！
必选参数 : pagesize : 每页数据,默认 20
lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
接口地址 : /event
调用例子 : /event?pagesize=30&lasttime=1556740526369
*/
export const getDynamicMessage = async (data) => {
    const [error, res] = await to(request.post(`/event?pagesize=80&lasttime=-1&timestamp=${data.timestamp}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取歌手详情
说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
必选参数 : id: 歌手 id
接口地址 : /artist/detail
调用例子 : /artist/detail?id=11972054 (Billie Eilish)
*/
export const getArtistDetail = async (data) => {
    const [error, res] = await to(request.post(`/artist/detail?id=${data.id}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
获取用户播放记录
说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
必选参数 : uid : 用户 id
可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
接口地址 : /user/record
调用例子 : /user/record?uid=32953014&type=1
*/
export const getUserRecord = async (data) => {
    const [error, res] = await to(request.post(`/user/record?uid=${data.id}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
/* 
当前账号关注的用户/歌手
说明 : 调用此接口, 可获得当前账号关注的用户/歌手
可选参数 : size : 返回数量 , 默认为 30
cursor : 返回数据的 cursor, 默认为 0 , 传入上一次返回结果的 cursor,将会返回下一页的数据
scene : 场景, 0 表示所有关注, 1 表示关注的歌手, 2 表示关注的用户, 默认为 0
接口地址 : /user/follow/mixed
调用例子 : /user/follow/mixed?scene=1
*/
export const getUserFollowMixed = async (data) => {
    const [error, res] = await to(request.post(`/user/follow/mixed?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
最近播放-歌曲
说明 : 调用此接口 , 可获得最近播放-歌曲
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/song
调用例子 : /record/recent/song?limit=1
*/
export const getUserRecentSongs = async (data) => {
    const [error, res] = await to(request.post(`/record/recent/song?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
最近播放-视频
说明 : 调用此接口 , 可获得最近播放-视频
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/video
调用例子 : /record/recent/video?limit=1
*/
export const getUserRecentVideos = async (data) => {
    const [error, res] = await to(request.post(`/record/recent/video?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
/* 
最近播放-声音
说明 : 调用此接口 , 可获得最近播放-声音
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/voice
调用例子 : /record/recent/voice?limit=1
*/
export const getUserRecentVoices = async (data) => {
    const [error, res] = await to(request.post(`/record/recent/voice?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
/* 
最近播放-歌单
说明 : 调用此接口 , 可获得最近播放-歌单
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/playlist
调用例子 : /record/recent/playlist?limit=1
*/
export const getUserRecentPlaylists = async (data) => {
    const [error, res] = await to(request.post(`/record/recent/playlist?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};
/* 
最近播放-专辑
说明 : 调用此接口 , 可获得最近播放-专辑
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/album
调用例子 : /record/recent/album?limit=1
*/
export const getUserRecentAlbums = async (data) => {
    const [error, res] = await to(request.post(`/record/recent/album?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

/* 
最近播放-播客
说明 : 调用此接口 , 可获得最近播放-播客
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/dj
调用例子 : /record/recent/dj?limit=1
 */
export const getUserRecentDjs = async (data) => {
    const [error, res] = await to(request.post(`/record/recent/dj?cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};