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

/* 
获取账号信息
说明 : 登录后调用此接口 ,可获取用户账号信息
接口地址 : /user/account
调用例子 : /user/account
*/
export const getUserAccount = async (data) => {
    const [error, res] = await to(request.post(`/user/account?timestamp=${Date.now()}&cookie=${data.cookie}`));
    if (error) return console.log("请求出错:" + error);
    return res.data;
};