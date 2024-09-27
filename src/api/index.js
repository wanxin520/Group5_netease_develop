/**
 * @注意 :
 *  在开发过程中，此文件的 模块导入 以及 方法命名在 非必要情况下不要改动
 * 
 *  如若需要改动请在微信群里进行说明
 * 
*/
import to from "await-to-js";
import request from "./request";

// 使用async和await的语法糖的写法 async和await就是Promise的语法糖
// 使用to函数实现捕获请求的过程中会出现的错误

// 轮播图,圆形图标的请求地址
export const getHomePageData = async () => {
  const [error, res] = await to(request.get("/homepage/block/page"));
  if (error) return console.log("请求出错！");
  // console.log(res);
  return res.data.data.blocks;
};

// 手机登录接口
export const loginByPhone = async (data) => {
  const [error, res] = await to(request.post("//login/cellphone"), data);
  if (error) return console.log("请求出错！");
  return res.data;
}