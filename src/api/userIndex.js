/**
 * @注意 :
 *  在开发过程中，此文件的 模块导入 以及 方法命名在 非必要情况下不要改动
 *
 *  如若需要改动请在微信群里进行说明
 *
 */

import to from "await-to-js";
import request from "./request";

// banner
/* 
说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
可选参数 :
type:资源类型,对应以下类型,默认为 0 即 PC
0: pc
1: android
2: iphone
3: ipad
接口地址 : /banner
调用例子 : /banner, /banner?type=2
*/
export const getBannerImage = async (data) => {
    const [error, res] = await to(request.post(`/banner?timestamp=${data.timestamp}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

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
    const [error, res] = await to(request.post(`/user/event?uid=${data.uid}`));
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