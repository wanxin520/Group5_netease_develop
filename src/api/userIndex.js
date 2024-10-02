/**
 * @注意 :
 *  在开发过程中，此文件的 模块导入 以及 方法命名在 非必要情况下不要改动
 *
 *  如若需要改动请在微信群里进行说明
 *
 */

import to from "await-to-js";
import request from "./request";

/* 
国家编码列表
说明 : 调用此接口,可获取国家编码列表
接口地址 : /countries/code/list
*/
export const getCountriesCodeList = async (data) => {
    const [error, res] = await to(request.post(`/countries/code/list`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};

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
国家编码列表
说明 : 调用此接口,可获取国家编码列表
接口地址 : /countries/code/list
*/

/* 
国家编码列表
说明: 调用此接口, 可获取国家编码列表
接口地址: /countries/code / list 
*/


/* 
国家编码列表
说明 : 调用此接口,可获取国家编码列表
接口地址 : /countries/code/list
*/